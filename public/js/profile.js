// Handler function for the new blog form submission
const newFormHandler = async (event) => {
    event.preventDefault();
  
    // Get the values of the blog title and description inputs
    const blog_title = document.querySelector('#blog-blog_title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
  
    // Check if both fields have a value
    if (blog_title && description) {
      // Send a POST request to the server with the blog title and description
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ blog_title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // If the response is OK, redirect to the profile page
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        // If the response is not OK, display an error message
        alert('Failed to create blog');
      }
    }
  };
  
  // Handler function for the delete blog button click
  const delButtonHandler = async (event) => {
    // Check if the clicked element has a data-id attribute
    if (event.target.hasAttribute('data-id')) {
      // Get the ID of the blog to be deleted from the data-id attribute
      const id = event.target.getAttribute('data-id');
  
      // Send a DELETE request to the server with the blog ID
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      // If the response is OK, redirect to the profile page
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        // If the response is not OK, display an error message
        alert('Failed to delete blog');
      }
    }
  };
  
  // Add an event listener to the new blog form for form submission
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  
  // Add an event listener to the blog list for delete button clicks
  document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);
  