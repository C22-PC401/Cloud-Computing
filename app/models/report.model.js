const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Report = mongoose.model(
        "report",
        mongoose.Schema(
            {
                name: String,
                birth: String,
                phone: Number,
                address: String,
                accident_date: String,
                harrasment_type: String,
                location: String,
                description: String
            },
            { timestamps: true }
        )
    )
    
    return Report;
}