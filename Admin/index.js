const form = document.querySelector("#blog-form");

// Shared API helper used by both Admin and Frontend.
import { fetchBlogs } from "/shared/blogsApi.js";

// Container where the latest blogs will be rendered in the Admin page.
const blogsContainer = document.querySelector("#blogs-container");

function renderBlogs(blogs) {
    // Clear existing content so page reloads don't duplicate.
    blogsContainer.innerHTML = "";

    for (const blog of blogs) {
        const blogElement = document.createElement("div");
        blogElement.classList.add("blog");
        blogElement.innerHTML = `
            <h2>${blog.heading}</h2>
            <p>${blog.content}</p>
        `;
        blogsContainer.appendChild(blogElement);
    }
}

// Fetch + render on page load.
(async () => {
    try {
        const blogs = await fetchBlogs();
        renderBlogs(blogs);
    } catch (err) {
        console.error(err);
    }
})();

//uploading blog to database
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form)
    const res = await fetch("/admin/upload", {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    console.log(data)
    form.reset()

    // Re-fetch and re-render blogs to show the new one.
    try {
        const blogs = await fetchBlogs();
        renderBlogs(blogs);
    } catch (err) {
        console.error(err);
    }
})

