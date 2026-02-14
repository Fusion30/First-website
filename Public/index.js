// Frontend homepage: fetch latest blogs and render them on page load.

import { fetchBlogs } from "/shared/blogsApi.js";

const blogContainer = document.getElementById("blog-container");

function renderBlogs(blogs) {
    blogContainer.innerHTML = "";

    // Server already returns latest-to-oldest; render in that order.
    for (const blog of blogs) {
        const blogElement = document.createElement("div");
        blogElement.classList.add("blog");
        blogElement.innerHTML = `
            <h2>${blog.heading}</h2>
            <p>${blog.content}</p>
        `;
        blogContainer.appendChild(blogElement);
    }
}

(async () => {
    try {
        const blogs = await fetchBlogs();
        renderBlogs(blogs);
    } catch (err) {
        console.error(err);
    }
})();