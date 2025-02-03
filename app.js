import 'dotenv/config';
import path from "path";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;

async function analyzeImage(filePath) {
    try {
        const fileManager = new GoogleAIFileManager(API_KEY);

        // Detect file type dynamically
        const fileExtension = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };

        const mimeType = mimeTypes[fileExtension] || "application/octet-stream";

        // Upload the image
        const uploadResult = await fileManager.uploadFile(filePath, {
            mimeType: mimeType,
            displayName: path.basename(filePath),
        });

        console.log(`✅ Uploaded file: ${uploadResult.file.displayName}`);
        console.log(`📌 File URI: ${uploadResult.file.uri}`);

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate response
        const result = await model.generateContent([
            "Tell me about this image.",
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                },
            },
        ]);

        console.log("🤖 Gemini Response:", result.response.text());
        return result.response.text();
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// Example usage
analyzeImage("/home/faraz/Pictures/itachi.jpg");
