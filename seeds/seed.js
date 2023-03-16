const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  // Synchronize the Sequelize ORM with the database
  await sequelize.sync({ force: true });

  // Create users and return them in an array
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create blogs and associate them with a random user
  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Create comments and associate them with the corresponding blog
  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  for (const comment of comments) {
    await Blog.update(
      { comment_id: comment.id },
      { where: { id: comment.blog_id } }
    );
  }

  // Exit the process
  process.exit(0);
};

// Call the seedDatabase function to populate the database with seed data
seedDatabase();
