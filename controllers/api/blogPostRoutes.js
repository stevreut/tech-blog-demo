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
    if (!(title && user_id && content)) {
      res.status(400).json({ message: 'missing title, user_id, or content' })
    } else {
      const creationDate = new Date();
      const blogPostObj = {
        title: title,
        user_id: user_id,
        creationDate: creationDate,
        content: content
      }
      const blogPostData = await BlogPost.create(blogPostObj);
      res.status(200).json(blogPostData);
    }
  } catch (err) {
    res.status(400).message(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const blogUpdResult = await BlogPost.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!blogUpdResult[0]) {
      res.status(404).json({message: 'no such blogpost id'});
    } else {
      res.status(200).json(blogUpdResult);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!blogPostData) {
      res.status(404).json({ message: 'No such blogpost id' });
    } else {
      res.status(200).json(blogPostData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
