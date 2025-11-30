import { terminate } from "../terminate/terminate.js"
import { Router } from "express"

const TerminateRouter = Router()
TerminateRouter.get("/", async (req, res) => {
    try {
        const result = await terminate()
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

export default TerminateRouter