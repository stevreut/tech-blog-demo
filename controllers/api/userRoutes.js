const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    if (!userData) {
      res.status(400).json({ message: 'no users retrieved' });
    } else if (userData.length < 1) {
      res.status(400).json({ message: 'no users on file' });  // TODO
    } else {
      console.log('date from get all = ', userData[0]);
      const creDate = userData[0].creationDate;
      console.log('date = ', creDate);
      console.log('json date = ' + JSON.stringify(creDate));
      console.log('zone = ' + creDate.getTimezoneOffset());
      console.log('month (adj) = ' + (creDate.getMonth()+1));
      console.log('day of mon = ' + creDate.getDate());
      console.log('hour = ' + creDate.getHours());
      console.log('mins = ' + creDate.getMinutes());
      res.status(200).json(userData);
    }
  } catch (err) {
    res.status(401).json(err);
  };
}); 

router.post('/', async (req, res) => {
  try {
    console.log('attempting new user on = ', req.body);
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      res.status(400).json({message: 'missing name, email, or password'});
    }
    const newUser = {
      name: name,
      email: email,
      password: password,
      creationDate: new Date()
    }
    const userData = await User.create(newUser);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log('user add past session stuff');
      console.log('new user added = ', userData);
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log('err on user add = ', JSON.stringify(err));
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
