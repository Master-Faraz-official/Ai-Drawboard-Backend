import 'dotenv/config';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;



async function analyzeImage(imagePath, context = "no context provided by the user") {
    try {
        const fileManager = new GoogleAIFileManager(API_KEY);

        // Upload the image to Google AI
        const uploadResult = await fileManager.uploadFile(imagePath, {
            mimeType: "image/jpeg",
            displayName: "Uploaded Image",
        });

        console.log(`✅ Uploaded file: ${uploadResult.file.displayName}`);
        console.log(`📌 File URI: ${uploadResult.file.uri}`);

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Define the analysis prompt


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

        console.log("\n\n");

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

        console.log("🤖 Gemini Response:", answers);
        return answers;
    } catch (error) {
        console.error("❌ Error analyzing image:", error);
    }
}

// Run the function with the specified image and context

// analyzeImage("/home/faraz/Pictures/gemini/tree.jpeg");

analyzeImage("/home/faraz/Pictures/gemini/tree.jpeg", "Find the length of the shadow casted by the tree on the ground using pythagorous theorem");
