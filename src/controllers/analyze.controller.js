import analyzeImage from "../utils/imageAnalyzer.js";


const analyzeController = async (req, res) => {
    const { imagePath, context } = req.body;
    console.log(imagePath)
    console.log(context)

    if (!imagePath) {
        return res.status(400).json({ error: "Image path is required" });
    }

    try {
        const result = await analyzeImage(imagePath, context);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error analyzing the image" });
    }
}

export default analyzeController;