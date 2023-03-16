// Import necessary dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Blog model by extending the Sequelize Model class
class Blog extends Model {}

// Define the Blog model's attributes and options
Blog.init(
{
// Define the id column as an integer, primary key, and auto-incrementing
id: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},
// Define the blog_title column as a string and not nullable
blog_title: {
type: DataTypes.STRING,
allowNull: false,
},
// Define the description column as a string
description: {
type: DataTypes.STRING,
},
// Define the date_created column as a date, not nullable, and default to the current date and time
date_created: {
type: DataTypes.DATE,
allowNull: false,
defaultValue: DataTypes.NOW,
},
// Define the user_id column as an integer and a foreign key that references the id column in the user table
user_id: {
type: DataTypes.INTEGER,
references: {
model: 'user',
key: 'id',
},
},
},
// Define the model's options, including the sequelize instance, and specify table name, field names and whether to include timestamps
{
sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'blog',
}
);

// Export the Blog model for use in other files
module.exports = Blog;