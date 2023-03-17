const commentFormHandler = async (event) => {
  event.preventDefault();

  const form = event.target;
  const blog_id = form.dataset.blogid;
  const comment_description = form
    .querySelector("#comment_description")
    .value.trim();

  if (comment_description) {
    try {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ blog_id, comment_description }),
        headers: { "Content-Type": "application/json" },
      });

      // Reload the page to show the newly added comment
      document.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error submitting comment.");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
