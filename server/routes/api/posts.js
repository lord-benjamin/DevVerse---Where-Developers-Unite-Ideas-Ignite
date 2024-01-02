const express = require("express");
const {check,validationResult} = require("express-validator");
const auth = require('../../middleware/auth');
const router = express.Router();

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');


// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post('/',[auth,[
    check('text',"The main content of post is required.").not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await User.findById(req.user.id).select('-password');

        const profile = await Profile.findOne({user: req.user.id});
        if(!profile){
            return res.status(400).json({msg:"Create a profile to post something."})
        }

        const newPost = new Post({
            title: req.body.title,
            image: req.body.image,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        
        //Increment post count
        profile.totalPosts++;

        await profile.save();

        res.json(post);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route    GET api/posts
// @desc     View all posts
// @access   Private
router.get('/',auth,async(req,res)=>{
    try{
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    GET api/posts/:post_id
// @desc     View post by post id
// @access   Private
router.get('/:post_id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        if(!post){
            return res.status(404).json({msg: "Post does not exist!"});
        }

        res.json(post);
    }
    catch(err){
        console.error(err.message);

        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post does not exist!"});
        }

        res.status(500).send('Server Error')
    }
})

// @route    DELETE api/posts/:post_id
// @desc     Delete post
// @access   Private
router.delete('/:post_id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        if(!post){
            return res.status(404).json({msg: "Post already deleted!"});
        }

        //Check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: "User not authorized."});
        }

        await post.deleteOne();

        //Decrement post count
        const profile = await Profile.findOne({user: req.user.id});
        profile.totalPosts--;
        
        await profile.save();

        res.json({msg: "Post deleted!"});
    }
    catch(err){
        console.error(err.message);

        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post does not exist!"});
        }

        res.status(500).send('Server Error')
    }
})

// @route    DELETE api/posts
// @desc     Delete all posts
// @access   Private
router.delete('/',auth,async(req,res)=>{
    try{
        // const posts = await Post.find({user: req.user.id});
        
        // if(!posts){
        //     return res.status(404).json({msg:'No posts found'});
        // }
        
        //Remove posts
        await Post.deleteMany({user: req.user.id});
        
        //Decrement post count 0
        const profile = await Profile.findOne({user: req.user.id});
        profile.totalPosts = 0;

        await profile.save();

        res.json({msg: "Deleted all posts!"});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// @route    PUT api/posts/:post_id/like
// @desc     Like a post
// @access   Private
router.put('/:post_id/like',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: "Post already liked."});
        }

        //Remove dislike before adding like
        if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0){
            const removeIndex = post.dislikes.findIndex(dislike => dislike.user.toString() === req.user.id);
            post.dislikes.splice(removeIndex,1);
        }

        post.likes.unshift({user: req.user.id});

        await post.save();

        res.json(post.likes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    PUT api/posts/:post_id/unlike
// @desc     Unlike a post
// @access   Private
router.put('/:post_id/unlike',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: "Post has not been liked yet!"});
        }

        const removeIndex = post.likes.findIndex(like => like.user.toString() === req.user.id);
        post.likes.splice(removeIndex,1);

        await post.save();

        res.json(post.likes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    PUT api/posts/:post_id/dislike
// @desc     Dislike a post
// @access   Private
router.put('/:post_id/dislike',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Check if the post has already been disliked
        if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: "Post already disliked."});
        }

        //Remove like before adding dislike
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            const removeIndex = post.likes.findIndex(like => like.user.toString() === req.user.id);
            post.likes.splice(removeIndex,1);
        }

        post.dislikes.unshift({user: req.user.id});

        await post.save();

        res.json(post.dislikes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    PUT api/posts/:post_id/undislike
// @desc     Undislike a post
// @access   Private
router.put('/:post_id/undislike',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Check if the post has already been disliked
        if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: "Post has not been disliked yet!"});
        }

        const removeIndex = post.dislikes.findIndex(dislike => dislike.user.toString() === req.user.id);
        post.dislikes.splice(removeIndex,1);

        await post.save();

        res.json(post.dislikes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    POST api/posts/:post_id/comment
// @desc     Add comment
// @access   Private
router.post('/:post_id/comment',[auth,[
    check('text',"The comment box is empty!").not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route    DELETE api/posts/:post_id/comment/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/:post_id/comment/:comment_id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Make sure comment exists
        if(!comment){
            return res.status(404).json({msg: "Comment does not exist!"});
        }

        //Check user
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: "User not authorized."});
        }

        const removeIndex = post.comments.findIndex(comment => comment.user.toString() === req.user.id);
        post.comments.splice(removeIndex,1);

        await post.save();

        res.json(post.comments);
    }
    catch(err){
        console.error(err.message);

        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: "Comment does not exist!"});
        }

        res.status(500).send('Server Error')
    }
})

// @route    PUT api/posts/:post_id/comment/:comment_id/like
// @desc     Like a comment
// @access   Private
router.put('/:post_id/comment/:comment_id/like',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Check if the comment has already been liked
        if(comment.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: "Comment already liked."});
        }

        //Remove dislike before adding like
        if(comment.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0){
            const removeIndex = comment.dislikes.findIndex(dislike => dislike.user.toString() === req.user.id);
            comment.dislikes.splice(removeIndex,1);
        }

        comment.likes.unshift({user: req.user.id});

        await post.save();

        res.json(comment.likes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    PUT api/posts/:post_id/comment/:comment_id/unlike
// @desc     Unlike a comment
// @access   Private
router.put('/:post_id/comment/:comment_id/unlike',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Check if the comment has already been liked
        if(comment.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: "Comment has not been liked yet."});
        }

        const removeIndex = comment.likes.findIndex(like => like.user.toString() === req.user.id);
        comment.likes.splice(removeIndex,1);

        await post.save();

        res.json(comment.likes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    PUT api/posts/:post_id/comment/:comment_id/dislike
// @desc     Dislike a comment
// @access   Private
router.put('/:post_id/comment/:comment_id/dislike',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Check if the comment has already been disliked
        if(comment.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: "Comment already disliked."});
        }

        //Remove like before adding dislike
        if(comment.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            const removeIndex = comment.likes.findIndex(like => like.user.toString() === req.user.id);
            comment.likes.splice(removeIndex,1);
        }

        comment.dislikes.unshift({user: req.user.id});

        await post.save();

        res.json(comment.dislikes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route    PUT api/posts/:post_id/comment/:comment_id/undislike
// @desc     Undislike a comment
// @access   Private
router.put('/:post_id/comment/:comment_id/undislike',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);

        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Check if the comment has already been disliked
        if(comment.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: "Comment has not been disliked yet."});
        }

        const removeIndex = comment.dislikes.findIndex(dislike => dislike.user.toString() === req.user.id);
        comment.dislikes.splice(removeIndex,1);

        await post.save();

        res.json(comment.dislikes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router