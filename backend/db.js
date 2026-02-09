require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    username: {type:String, required:true, unique:true}
});

const blogSchema = new Schema({
    title: {type:String, required:true},
    text: {type:String, required:true},
    song: {
        name: String,
        artist: String,
        image: String,
        url: String
    },
    author: {type:Schema.Types.ObjectId, ref:'User', required:true},
    createdAt: {type:Date, default:Date.now}
});

const Comment = mongoose.model('Comment', new Schema({
    post: {type:Schema.Types.ObjectId, ref:'Blog'},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    text: {type:String, required:true},
    createdAt: {type:Date, default:Date.now}
}));

const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

module.exports = {User, Blog, Comment};