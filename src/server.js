import 'dotenv/config'
import app from "./app.js";
import connectDB from "./database/db.js";

const PORT = process.env.PORT;

// Connect to Database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});