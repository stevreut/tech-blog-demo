const router = require('express').Router();

const { BlogPost, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
        include: [
            {
                model: User
            },
            {
                model: BlogPost
            }
        ]
    });
    if (!commentData) {
      res.status(400).json({ message: 'no comments retrieved' });
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(401).json(err);
  };
}); 

router.get('/:id', async (req, res) => {
  try {
    console.log('get post id = "' + req.params.id + '"');
    const commentData = await Comment.findByPk(req.params.id, {
        include: [
            {
                model: User
            },
            {
                model: BlogPost
            }
        ]
    });
    if (!commentData) {
      res.status(404).json({ message: 'no comment retrieved' });
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(400).json(err);
  };
}); 

router.post('/', async (req, res) => {
  try {
    const { blogpost_id, user_id, content } = req.body;
    if (!(blogpost_id && user_id && content)) {
      res.status(400).json({ message: 'missing blogpost_id, user_id, or content' })
    } else {
      const creationDate = new Date();
      const commentObj = {
        blogpost_id: blogpost_id,
        user_id: user_id,
        creationDate: creationDate,
        content: content
      }
      const commentData = await Comment.create(commentObj);
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(400).message(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const commentUpdateResult = await Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!commentUpdateResult[0]) {
      res.status(404).json({message: 'no such comment id'});
    } else {
      res.status(200).json(commentUpdateResult);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!commentData) {
      res.status(404).json({ message: 'No such comment id' });
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
