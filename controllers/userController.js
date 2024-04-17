const { User, Thought } = require('../models');

const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.find().populate("friends").populate("thoughts");
            
            res.status(200).json(users);
        } catch (err) {
          return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.id,
            }).select("-__v").populate("friends").populate("thoughts");
    
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.status(200).json(user);
        } catch (err) {
          return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json(newUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({
                _id: req.params.id,
            });

            if (!deletedUser) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.status(200).json({
                message: "User deleted successfully"
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true,
                    new: true
                }
            );

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true,
                    new: true
                }).populate("friends");

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {
                    friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json({
                message: "Friend removed from list"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = userController;