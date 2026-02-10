const form = document.querySelector("#blog-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form)
    const res = await fetch("/admin/upload", {
        method: "POST",
        body: formData
    })
    
})