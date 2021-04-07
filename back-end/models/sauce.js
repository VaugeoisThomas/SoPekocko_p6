const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true, maxlenght: 20},
    manufacturer: {type: String, required: true, maxlenght: 20},
    description: {type: String, required: true, maxlenght: 200},
    mainPepper: {type: String , required: true, maxlenght: 20},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLiked: {type: [String], default: []},
    usersDisliked: {type: [String], default: []},
});

module.exports = mongoose.model('Sauce', sauceSchema)