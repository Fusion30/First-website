import { getBlogs } from "/shared/getBlogs.js";

const blogContainer = document.getElementById("blog-container");

function renderBlogs(blogs) {
    blogContainer.innerHTML = "";

    // Server already returns latest-to-oldest; render in that order.
    for (const blog of blogs) {
        const blogElement = document.createElement("div");
        blogElement.classList.add("blog");
        
        const heading = document.createElement("h2");
        heading.textContent = blog.heading;
        blogElement.appendChild(heading);

        const p = document.createElement("p");
        p.textContent = blog.content;
        blogElement.appendChild(p);

        blogContainer.appendChild(blogElement);
    }
}
// Fetch + render on page load.
(async () => {
    try {
        const blogs = await getBlogs();
        renderBlogs(blogs);
    } catch (err) {
        console.error(err);
    }
})();