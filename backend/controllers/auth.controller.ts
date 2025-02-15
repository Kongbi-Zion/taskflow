import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResetCode } from "../utils/email.util";
import User from "../models/user.model";
import Token from "../models/token.model";

class UserController {
  /**
   * @desc Get all users
   * @route GET /users
   */
  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find({}, { password: 0 }); // Excluding password field
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving users", error: err });
    }
  }

  /**
   * @desc Sign Up
   * @route POST /auth/signup
   */
  public static async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });

      const newUser = await user.save();
      console.log("newUser: ", newUser);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Registration failed", error });
    }
  }

  /**
   * @desc Sign In
   * @route POST /auth/signin
   */
  public static async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        message: "Login successful",
        user: {
          username: user.username,
          email: user.email,
          token,
          id: user._id,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error });
    }
  }

  /**
   * @desc Forgot Password - Send Reset Code
   * @route POST /auth/forgot-password
   */
  public static async forgotPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 5 mins

      await Token.deleteMany({ userId: user._id, type: "reset" });
      const token = new Token({
        userId: user._id,
        token: resetCode,
        type: "reset",
        expiresAt,
      });

      await token.save();
      await sendResetCode(email, resetCode);
      res.status(200).json({ message: "Reset code sent to email" });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ message: "Error sending reset code", error });
    }
  }

  /**
   * @desc Reset Password
   * @route POST /auth/reset-password
   */
  public static async resetPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email, resetCode, newPassword } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ message: "Invalid request" });
        return;
      }

      const token = await Token.findOne({
        userId: user._id,
        token: resetCode,
        type: "reset",
      });

      if (!token || token.expiresAt < new Date()) {
        await Token.deleteOne({ _id: token?._id });
        res.status(400).json({ message: "Invalid or expired reset code" });
        return;
      }

      console.log("yesss", user);

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      await Token.deleteOne({ _id: token?._id });

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ message: "Password reset failed", error });
    }
  }

  /**
   * @desc Update User
   * @route PUT /users/:id
   * @access Private (Authenticated users only)
   */
  public static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id, username } = req.body;
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      if (username) user.username = username;
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "User updated successfully",
        user: {
          username: user.username,
          email: user.email,
          token,
          id: user._id,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }
}

export default UserController;
