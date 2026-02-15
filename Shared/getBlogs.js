// Both Admin and Frontend call this shared API helper to fetch blogs from the server,
//Keeping fetching logic in one place.
export async function getBlogs() {
  const res = await fetch("/blogs");

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }
  // Expected shape: a bare JSON array: [{ id, heading, content }, ...]
  const blogs = await res.json();
  return Array.isArray(blogs) ? blogs : [];
}
