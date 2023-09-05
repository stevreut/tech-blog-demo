const router = require('express').Router();

const { BlogPost, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
        include: [
            {
                model: User,
                required: false
            },
            {
                model: Comment,
                include: [
                    {
                        model: User
                    }
                ],
                required: false
            }
        ]
    });
    if (!blogPostData) {
      res.status(400).json({ message: 'no posts retrieved' });
    } else {
      res.status(200).json(blogPostData);
    }
  } catch (err) {
    res.status(401).json(err);
  };
}); 

module.exports = router;
