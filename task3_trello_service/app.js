import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import MainRouter from "./src/router/index.js"
import { errorHandler } from "./src/middleware/errorHandler.js"

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use((req, res, next) => {
  next();
});

app.use("/", MainRouter)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`THE SERVER IS RUNNING SUCCESSFULLY ON PORT ${PORT}`)
})

