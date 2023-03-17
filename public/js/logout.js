const logout = async () => {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const { message } = await response.json();
      throw new Error(message);
    }
  } catch (err) {
    console.error(err);
    alert("Error logging out.");
  }
};

document.querySelector("#logout").addEventListener("click", logout);
