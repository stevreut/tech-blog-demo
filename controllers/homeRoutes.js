const router = require('express').Router();
const { Project, User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    const blogPostData = await BlogPost.findAll({
      order: [
        ['creationDate', 'DESC'],
        ['title', 'ASC']
      ]
    });

    // // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    let blogPosts = blogPostData.map((post) => post.get({plain: true}));
    blogPosts.forEach((post) => {
      post.formattedDate = dayjs(post.creationDate).format('MM/DD/YYYY');
    });

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  try {
    console.log('get home pb post id = "' + req.params.id + '"');
    const blogPostData = await BlogPost.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: {
                  exclude: ['password', 'email']
                },
                required: false
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: {
                          exclude: ['password', 'email']
                        },
                    }
                ],
                required: false
            }
        ]
    });
    if (!blogPostData) {
      res.status(404).json({ message: 'no post retrieved' });
    } else {
      let blogPosts = blogPostData.map((post) => post.get({plain: true}));
      res.render('blogpost', {
        blogPosts, 
        logged_in: req.session.logged_in 
      });
      // res.status(200).json(blogPostData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
