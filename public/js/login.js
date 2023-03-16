// Define loginFormHandler function to handle form submission
const loginFormHandler = async (event) => {
    event.preventDefault();
    
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    // Check if both username and password are not empty
    if (username && password) {
    // Send a POST request to the API endpoint with username and password as the request body
    const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    });
    // Check if the response is ok (status 200-299)
if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace('/profile');
  } else {
    // Display an error message if the response status is not ok
    alert(response.statusText);
  }
}
};

// Add an event listener to the login form submit button to call loginFormHandler on form submission
document
.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);