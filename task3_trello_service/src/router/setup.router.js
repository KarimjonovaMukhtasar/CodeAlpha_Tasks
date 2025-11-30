import { setup } from "../setup/setup.js"
import { Router } from "express"

const SetupRouter = Router()
SetupRouter.get("/", async (req, res) => {
    try {
        const result = await setup()
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

export default SetupRouter