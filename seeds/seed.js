const sequelize = require('../config/connection');
const { User, Project, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  const blogPosts = await BlogPost.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
