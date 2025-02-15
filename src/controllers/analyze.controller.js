import analyzeImage from "../utils/imageAnalyzer.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const analyzeController = asyncHandler(async (req, res) => {
    const { imagePath, context } = req.body;
    
    if (!imagePath) {
        // throw new ApiError(400, "Image path is required")
        return res.status(400).json(new ApiError(400, "Image path is required"));
    }

    try {
        const result = await analyzeImage(imagePath, context);
        res.status(200).json(new ApiResponse(200, { result },))
        // return new ApiResponse(200, { result },)
        // res.json(result);
    } catch (error) {
        res.status(500).json(new ApiError(500, `Error while analyzing drawboard :: ${error?.message}`))
        // res.status(500).json({ error: "Error analyzing the image" });
    }
}
)
export default analyzeController;