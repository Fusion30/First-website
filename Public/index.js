const res = await fetch("/blogs")
const blogs = await res.json()
const blogContainer = document.getElementById("blog-container")

//----- Display blogs on the page load ------
//----- Latest to old -----
for (const blog of blogs) {
    const blogElement = document.createElement("div")
    blogElement.classList.add("blog")
    blogElement.innerHTML = `
    <h2>${blog.heading}</h2>
    <p>${blog.content}</p>
    ` 
    blogContainer.prepend(blogElement)
}