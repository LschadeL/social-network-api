const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate
        },
        userName: {
            type: String
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

const Thought = model("thought", thoughtSchema);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

function formatDate(createdAt) {
    return createdAt.toLocaleString();
}

module.exports = Thought;