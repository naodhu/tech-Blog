// Define an async function to handle user logout
const logout = async () => {
    // Send a POST request to the logout API endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // If the response is OK, redirect to the home page
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  // Add an event listener to the logout button that calls the logout function when clicked
  document.querySelector('#logout').addEventListener('click', logout);
  