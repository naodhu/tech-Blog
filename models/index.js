// Import required models
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

// Define model associations
User.hasMany(Blog, {
  foreignKey: "user_id", // Set foreign key to user_id
  onDelete: "CASCADE", // Set onDelete action to CASCADE
});

Blog.belongsTo(User, {
  foreignKey: "user_id", // Set foreign key to user_id
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id", // Set foreign key to blog_id
});

Comment.belongsTo(User, {
  foreignKey: "user_id", // Set foreign key to user_id
});

// Export all models
module.exports = { User, Blog, Comment };
