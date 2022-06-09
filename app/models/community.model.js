const { Schema } = require("mongoose");

module.exports = (mongoose) => {
    const Community = mongoose.model(
        "communities",
        mongoose.Schema(
            {
                communities_name: String,
                join: Boolean
            },
            { timestamps: true }
        )
    )
    
    return Community;
}