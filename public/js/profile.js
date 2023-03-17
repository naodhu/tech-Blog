const newFormHandler = async (event) => {
  try {
    event.preventDefault();

    const blog_title = document.querySelector("#blog-blog_title").value.trim();
    const description = document.querySelector("#blog-desc").value.trim();

    if (!blog_title || !description) {
      throw new Error("Both fields are required.");
    }

    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ blog_title, description }),
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
    alert("Failed to create blog.");
  }
};

const delButtonHandler = async (event) => {
  try {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");

      const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        const { message } = await response.json();
        throw new Error(message);
      }
    }
  } catch (err) {
    console.error(err);
    alert("Failed to delete blog.");
  }
};

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);
document
  .querySelector(".blog-list")
  .addEventListener("click", delButtonHandler);
