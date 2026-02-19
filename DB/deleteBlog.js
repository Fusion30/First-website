import { getDBConnection } from "./dbConnection.js";

export async function deleteBlog(req, res) {
    //id is string. Here its converted and checked for finitude
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Invalid blog id" });
  }

    const db = await getDBConnection();
    try {
        const result = await db.run("DELETE FROM blogs WHERE id = ?", [id]);

        if (!result?.changes) {
        return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({ deleted: true, id });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting blog" });
    } finally {
        await db.close();
    }
}
