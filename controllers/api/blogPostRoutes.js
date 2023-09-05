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

router.get('/:id', async (req, res) => {
  try {
    console.log('get post id = "' + req.params.id + '"');
    const blogPostData = await BlogPost.findByPk(req.params.id, {
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
      res.status(404).json({ message: 'no post retrieved' });
    } else {
      res.status(200).json(blogPostData);
    }
  } catch (err) {
    res.status(400).json(err);
  };
}); 

router.post('/', async (req, res) => {
  try {
    const { title, user_id, content } = req.body;
    const creationDate = new Date();
    const blogPostObj = {
      title: title,
      user_id: user_id,
      creationDate: creationDate,
      content: content
    }
    const blogPostData = await BlogPost.create(blogPostObj);
    res.status(200).json(blogPostObj);
  } catch (err) {
    res.status(400).message(err);
  }

})


module.exports = router;
