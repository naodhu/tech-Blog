// Handler function for the signup form submission
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Get the values of the username and password inputs
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    // Check if both fields have a value
    if (username && password) {
      // Send a POST request to the server with the username and password
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the response is OK, redirect to the profile page
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        // If the response is not OK, display an error message with the status text
        alert(response.statusText);
      }
    }
  };
  
  // Add an event listener to the signup form for form submission
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  