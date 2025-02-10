import express from "express";

const app = express()

app.use((req, res, next) => {
    console.log("global Middleware running")
    next()
})

app.get('/', (req, res) => {
    res.send('home route')
})

export default app
