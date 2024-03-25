let express = require("express");
let router = express.Router();

//required model for CRUD oprations
let Post = require("../models/post");

//global auth check for users
let authCheck = require('../authCheck');

/* GET: /post/index => show main post page */
router.get("/", async (req, res) => {
  // using model to fetch all Post data from MongoDB and soring it by date
  let posts = await Post.find().sort({ date: -1 });

  // load view and pass  data to it for displaying
  res.render("post/index", {
    title: "Posts",
    posts: posts,
    user: req.user,
  });
});

/* GET: /post/detail/223 => display selected post */
router.get("/detail/:_id", async (req, res) => {
  // checking
  console.log(req.params._id);
  let post = await Post.findById(req.params._id);

  //console.log(post);
  res.render("post/detail", {
    title: "Post",
    post: post,
  });
});

/* GET: /post/create => display new post form */
router.get("/create", authCheck, (req, res) => {
  res.render("post/create", {
    title: "Create New Post",
  });
});

/* POST: /post/create => saving new post */
router.post("/create", authCheck, async (req, res) => {
  // using mongoose model to save new post to db
  await Post.create(req.body);

  // redirecting to posts
  res.redirect("/posts");
});

/*GET: /post/edit/123 => display post to be edited */
router.get("/edit/:_id", authCheck, async (req, res) => {
  let post = await Post.findById(req.params._id);

  res.render("post/edit", {
    title: "Edit Post",
    post: post,
    user: req.user,
  });
});

/*POST: /post/123 => update the edited post to the existing post*/
router.post("/edit/:_id", authCheck,  async (req, res) => {
  await Post.findByIdAndUpdate(req.params._id, req.body);
  res.redirect("/posts");
});

/* GET: /post/delete/234 => delete the selected post and redirect*/
router.get("/delete/:_id",authCheck, async (req, res) => {
  // get the file with matching id
  let post = await Post.findById(req.params._id);

  // user check for auth
  if (req.user.username !== post.username) {
    res.redirect("/auth/unauthorized");
    return;
  } else {
    await post.deleteOne({ _id: post._id });

    // redirect to posts
    res.redirect("/posts");
  }
});
// make public
module.exports = router;
