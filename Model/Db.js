
const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://tranphannhan:oLVT47GDg2GMj9mb@cluster0.av1kh.mongodb.net/Ustrans?retryWrites=true&w=majority&appName=Cluster0')
    console.log("✅ Kết nối Server MXH Thành Công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
  }
}

module.exports = connectDB;