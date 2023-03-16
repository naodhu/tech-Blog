// Handler function for submitting a comment
const commentFormHandler = async function(event) {
    event.preventDefault();
    
    // Get the ID of the blog post being commented on and the comment description
    const blog_id = document.querySelector('.new-comment-form').dataset.blogid;
    const comment_description = document.querySelector('#comment_description').value.trim();
    
    // If the comment description is not empty, send a POST request to create a new comment
    if (comment_description) {
      console.log("testing post for comments")
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          blog_id,
          comment_description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Reload the page to show the newly added comment
      console.log("post for comments complete")
      document.location.reload();
    }
  };
  
  // Add an event listener for the comment submission form
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', commentFormHandler);
  