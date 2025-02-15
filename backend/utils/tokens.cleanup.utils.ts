import schedule from "node-schedule";
import Token from "../models/token.model";

// Schedule job to run every day at midnight (00:00)
schedule.scheduleJob("0 0 * * *", async () => {
  try {
    await Token.deleteMany({
      expiresAt: { $lt: new Date() }, // $lt operator in MongoDB for "less than"
    });
    console.log("✅ Expired tokens deleted (Daily Cleanup)");
  } catch (error) {
    console.error("❌ Error deleting expired tokens:", error);
  }
});
