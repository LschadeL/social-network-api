const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ]
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought"
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

const User = model("user", userSchema);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

module.exports = User;