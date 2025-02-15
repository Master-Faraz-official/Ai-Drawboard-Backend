import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prompt } from "../constants.js";
import ApiError from "../utils/ApiError.js";

const analyzeImage = async (imagePath, context = "No context provided by the user") => {
    try {
        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

        // Upload the image to Google AI
        const uploadResult = await fileManager.uploadFile(imagePath, {
            mimeType: "image/jpeg",
            displayName: "Uploaded Image",
        });

        if (!uploadResult?.file?.uri) {
            throw new ApiError(500, "Image upload failed");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Construct the prompt
        const prompt = `${Prompt} \n And here is the context of the image provided by the user: ${context}.`;

        // Send request to Gemini
        const result = await model.generateContent([
            prompt,
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                },
            },
        ]);

        if (!result?.response) {
            throw new ApiError(500, "No response received from the AI model");
        }

        // Extract and clean up response text
        let rawResponse = result.response.text().trim();
        let answers = [];

        try {
            rawResponse = rawResponse.replace(/^```json/, "").replace(/```$/, "").trim();
            answers = JSON.parse(rawResponse);
        } catch (error) {
            throw new ApiError(500, "Error parsing AI response");
        }

        return answers;
    } catch (error) {
        throw new ApiError(500, `Error analyzing image: ${error.message}`);
    }
};

export default analyzeImage;
