import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prompt } from "../constants.js";

const analyzeImage = async (imagePath, context = "no context provided by the user") => {
    try {
        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

        // Upload the image to Google AI
        const uploadResult = await fileManager.uploadFile(imagePath, {
            mimeType: "image/jpeg",
            displayName: "Uploaded Image",
        });

        // console.log(`✅ Uploaded file: ${uploadResult.file.displayName}`);
        // console.log(`📌 File URI: ${uploadResult.file.uri}`);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prompt with context
        const prompt = `${Prompt} \n And here is the context of image provided by the user, Based on this context you have to solve the problem : ${context}.`

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


        // Extract and clean up response text
        let rawResponse = result.response.text().trim();
        let answers = [];

        try {
            // Remove triple backticks and JSON tags if present
            rawResponse = rawResponse.replace(/^```json/, "").replace(/```$/, "").trim();
            answers = JSON.parse(rawResponse);
        } catch (error) {
            console.error("❌ Error parsing response:", error);
        }

        // console.log("🤖 Gemini Response:", answers);
        return answers;
    } catch (error) {
        console.error("❌ Error analyzing image:", error);
    }
}

export default analyzeImage;