# Model-View-Controller (MVC) Challenge: Tech Blog
This repository contains the codebase for the Tech Blog, a web application built using the Model-View-Controller (MVC) architectural pattern. The Tech Blog is a platform for users to create, read, update, and delete blog posts on various topics related to technology.

The Tech Blog is built using a combination of technologies including Node.js, Express.js, Handlebars.js, and MySQL. The application uses sessions to authenticate and authorize users to perform CRUD operations on blog posts.

## Table of Contents
* Installation
* Usage
* Contributing
* License

## screenshots
<img width="1680" alt="Screen Shot 2023-03-17 at 00 10 27 am" src="https://user-images.githubusercontent.com/113915529/225627257-4233caf0-b939-41ec-be50-3c3e6ecdada0.png">
<img width="1731" alt="Screen Shot 2023-03-17 at 00 10 32 am" src="https://user-images.githubusercontent.com/113915529/225627287-f30af140-fb23-42bc-b749-a80bc455f5a3.png">
<img width="1677" alt="Screen Shot 2023-03-17 at 00 10 54 am" src="https://user-images.githubusercontent.com/113915529/225627319-c50618dd-6393-4adb-b3af-c2c13b4fc2b0.png">
<img width="1690" alt="Screen Shot 2023-03-17 at 00 11 12 am" src="https://user-images.githubusercontent.com/113915529/225627359-14d47e4b-ff0f-45e4-90d1-f0439868667d.png">



## Installation
To install the Tech Blog application, follow the steps below:

1. Clone this repository to your local machine using git clone https://github.com/your-username/tech-blog.git.
2. Install the required dependencies by running npm install in the root directory of the project.
3. Set up the database schema by running the SQL scripts in the db directory.
4. Create a .env file in the root directory of the project and add the following environment variables:

```
makefile
Copy code
DB_NAME=tech_blog_db
DB_USER=root
DB_PASSWORD=your_password_here
SESSION_SECRET=your_session_secret_here

```
5. Start the application by running npm start in the root directory of the project.

## Usage

Once the application is installed and running, you can access the Tech Blog by navigating to http://localhost:3001 in your web browser.

Users can sign up for an account or log in if they already have one. Once logged in, users can create new blog posts, edit existing posts, delete posts, and comment on posts.

The Tech Blog also includes a dashboard where users can view their own posts and edit or delete them.

## Contributing
Contributions to the Tech Blog are welcome! If you would like to contribute to the project, please follow the steps below:

* Fork the repository to your own GitHub account.
* Create a new branch for your feature or bug fix.
* Write tests for your changes (if applicable).
* Implement your changes and make sure all tests pass.
* Submit a pull request to the main repository.

## License
This project is licensed under the MIT license. See the LICENSE file for more details.
