const express = require('express');
const router = express.Router();
const multer = require('multer');
const {UserController, PostController, CommentController, LikeController, FollowController} = require("../controllers");
const authenticateToken = require("../middleware/auth");

const uploadDestination = 'uploads';

const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

// Роуты пользователя
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', authenticateToken, UserController.current);
router.get('/users/:id', authenticateToken, UserController.getUserById);
router.put('/users/:id', authenticateToken, upload.single('avatar'), UserController.updateUser);

// Роуты постов
router.post('/posts', authenticateToken, PostController.createPost);
router.get('/posts', authenticateToken, PostController.getAllPosts);
router.get('/posts/:id', authenticateToken, PostController.getPostById);
router.delete('/posts/:id', authenticateToken, PostController.deletePost);
// router.delete('/posts/cleanup-posts', authenticateToken, PostController.cleanupPosts);

// Роуты коммент
router.post('/comments', authenticateToken, CommentController.createComment);
router.delete('/comments/:id', authenticateToken, CommentController.deleteComment);

// Роуты лайков
router.post('/likes', authenticateToken, LikeController.likePost);
router.delete('/likes/:id', authenticateToken, LikeController.unlikePost);
// router.delete('/likes/cleanup-likes', authenticateToken, LikeController.cleanupLikes);

// Роуты подписки
router.post('/follow', authenticateToken, FollowController.followUser);
router.delete('/unfollow/:id', authenticateToken, FollowController.unfollowUser);


module.exports = router;