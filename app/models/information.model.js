const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Information = mongoose.model(
        "information",
        mongoose.Schema(
            {
                title: String,
                body: String,
                source: String,
                event_date: String,
                event_time: String,
                location: String
            },
            { timestamps: true }
        )
    )
    
    return Information;
}