const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: "DevVerse User"
    },
    avatar: {
        type: String,
        default: "http://www.gravatar.com/avatar/?d=mp"
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
                default: "DevVerse User"
            },
            avatar: {
                type: String,
                default: "http://www.gravatar.com/avatar/?d=mp"
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ],
            dislikes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ],
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post',PostSchema);