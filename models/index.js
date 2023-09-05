const User = require('./User');
const Project = require('./Project');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

BlogPost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blogpost_id'
})

module.exports = { User, Project, BlogPost, Comment };
