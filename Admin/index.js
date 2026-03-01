import { getBlogs } from "/shared/getBlogs.js";// Shared API helper used by both Admin and Frontend.

const form = document.querySelector("#blog-form");
const blogsContainer = document.querySelector("#blogs-container");

function renderBlogs(blogs) {
    // Clear existing content before re-rendering.
    blogsContainer.innerHTML = "";

    for (const blog of blogs) {
        const blogElement = document.createElement("div");
        blogElement.classList.add("blog");
        blogElement.innerHTML = `
                    <h2>${blog.heading}</h2>
                    <div class="blog-content">${blog.content}</div>
                    <button type="button" class="delete-blog" data-id="${blog.id}">Delete</button>
                    `;
        blogsContainer.appendChild(blogElement);
    }
}

async function fetchAndRenderBlogs() {
    try {
        const blogs = await getBlogs();
        renderBlogs(blogs);
    } catch (err) {
        console.error(err);
    }
}
fetchAndRenderBlogs();// Fetch + render on page load.

//====  Listening for delete button clicks ====
blogsContainer.addEventListener("click", async (e) => {
     /*
     Event Delegation:
     
     e.target refers to the actual element that originated the event (the deepest
     thing you clicked). If you click on text inside a button, e.target might be an
     inner element (like a span), not the button itself.
     
     This is different from e.currentTarget, which refers to the element that the
     listener is attached to (in this case, blogsContainer).
     
     .closest("button.delete-blog") finds the nearest <button> with class
     "delete-blog" (or returns null if the click wasn't on a delete control).
    */
   
    const button = e.target.closest("button.delete-blog");
    if (!button) return
    const id = button.dataset.id
    if (!id) return
    if (!confirm("Delete this blog?")) return

    try {
        const res = await fetch(`/blogs/${encodeURIComponent(id)}`, {
            method: "DELETE",
        });
        //fetch handles only network errors. For HTTP errors (like 404,500), it resolves successfully, but res.ok will be false.
        //Just good error handling
        if (!res.ok) {
            let message = `Failed to delete blog: ${res.status} ${res.statusText}`;
            try {
                const data = await res.json();
                if (data?.message) message = data.message;
            } catch {
                // ignore non-JSON responses
            }
            alert(message);
            return;
        }
        await fetchAndRenderBlogs();
    } catch (err) {
        console.error(err);
        alert("Network error while deleting blog");
    }
});

//=== uploading blog to database ===
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form)
    const res = await fetch("/admin/upload", {
        method: "POST",
        body: formData
    })
    if (!res.ok) {
        const data = await res.json()
        alert(data?.message || "Error uploading blog")
        return
    }
    const data = await res.json()
    form.reset()
    await fetchAndRenderBlogs()
})

