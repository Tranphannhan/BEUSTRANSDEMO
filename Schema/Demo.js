const mongoose = require("mongoose");
const Location_Schema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    speed: Number,
    status: String,
    updatedAt: String

}, { collection: "Location" });
module.exports = mongoose.model("Location", Location_Schema);