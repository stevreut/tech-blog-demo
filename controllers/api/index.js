const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
