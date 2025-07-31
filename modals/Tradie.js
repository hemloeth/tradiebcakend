const mongoose = require('mongoose');

const TradieSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    businessName: { type: String, required: true },
    PrimaryTrade: { type: String, required: true },
    Experience: { type: String, required: true },
    ABN: { type: String, required: true },
    ServiceAreas: { type: [String], required: true },
    BusinessDescription: { type: String, required: true },
    role: {
        type: [String],
        enum: ["homeowner", "tradie"],
        default: ["tradie"]
    }
})

const Tradie = mongoose.model("Tradie", TradieSchema);
module.exports = Tradie;