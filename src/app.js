import express from "express";
import analyzeRouter from "./routes/analyze.routes.js";

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log("global Middleware running")
    next()
})

app.get('/', (req, res) => {
    res.send('home route')
})

app.use("/drawboard",analyzeRouter)

export default app
