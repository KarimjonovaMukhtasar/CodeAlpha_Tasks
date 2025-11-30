import pool from "../config/db.js"
import * as bcrypt from "bcrypt"

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.validatedData
        const hashedPassword = await bcrypt.hash(password, 10)
        const { rows } = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hashedPassword])
        return res.status(201).json({ success: true, message: `REGISTERED SUCCESSFULLY`, user: rows[0] })
    } catch (error) {
        console.error(error.message)
        return next(error)
    }
}

