const loginFormHandler = async (event) => {
  event.preventDefault();

  const form = event.target;
  const username = form.querySelector("#username-login").value.trim();
  const password = form.querySelector("#password-login").value.trim();

  if (username && password) {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        const { message } = await response.json();
        throw new Error(message);
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
