// Shared client helper used by both Admin and Public pages.
// Keeps the API call in one place so only rendering is page-specific.

/**
 * Fetches the latest blogs from the server.
 * Server currently returns the latest 5 rows.
 */
export async function fetchBlogs() {
  const res = await fetch("/blogs");

  if (!res.ok) {
    // Include status text so it is obvious in the console.
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }

  // Expected shape: a bare JSON array: [{ id, heading, content }, ...]
  const blogs = await res.json();
  return Array.isArray(blogs) ? blogs : [];
}
