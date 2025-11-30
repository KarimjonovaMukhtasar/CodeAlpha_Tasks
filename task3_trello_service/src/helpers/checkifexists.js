import pool from "../config/db.js"

export async function checkifexists(table, column, value) {
  const allowedTableNames = ["boards", "users", "columns", "tasks"]
  if (!allowedTableNames.includes(table)) {
    return res.status(404).json({ success: false, message: `NOT FOUND SUCH A TABLE NAME!` })
  }
  const query = `SELECT 1 FROM ${table} WHERE ${column} = $1 LIMIT 1`
  const result = await pool.query(query, [value])
  return result.rows.length > 0
}
