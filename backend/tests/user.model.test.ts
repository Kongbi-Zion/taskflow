import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../models/user.model";

describe("User Model Test", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany(); // Clean up after each test
  });

  test("Should create and save a user successfully", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "securepassword",
    };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });

  test("Should fail to create a user without required fields", async () => {
    const user = new User({});
    let err: any;

    try {
      await user.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors?.username).toBeDefined();
    expect(err.errors?.email).toBeDefined();
    expect(err.errors?.password).toBeDefined();
  });

  test("Should enforce unique email constraint", async () => {
    expect.assertions(2); // Ensure both assertions are executed

    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "securepassword",
    };

    await new User(userData).save(); // Save first user

    try {
      await new User(userData).save(); // Attempt duplicate email
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.code).toBe(11000); // MongoDB duplicate key error
    }
  });
});
