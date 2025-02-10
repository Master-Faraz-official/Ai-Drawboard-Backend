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
        const prompt = `
        You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them. 
        
        Note: Use the BODMAS rule for solving mathematical expressions. BODMAS stands for the Priority Order: Brackets, Orders (i.e., exponents and roots), Division and Multiplication (from left to right), Addition and Subtraction (from left to right). 
        Brackets have the highest priority, followed by Orders, then Division and Multiplication, and lastly Addition and Subtraction.
        
        For example:
        Q. 2 + 3 * 4
        (3 * 4) => 12, 2 + 12 = 14.
        Q. 2 + 3 + 5 * 4 - 8 / 2
         8 / 2 => 4, 5 * 4 => 20, 2 + 3 => 5, 5 + 20 => 25, 25 - 4 => 21.
        
        YOU CAN HAVE FIVE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE, AND ONLY ONE CASE SHALL APPLY EVERY TIME:
        Following are the cases:
        
        1. Analyzing Graphical Math problems, which are word problems represented in drawing form, such as cars colliding, trigonometric problems, problems on the Pythagorean theorem like finding the hypotenuse, base or height based on where question mark is present, etc.: 
           - These will have a drawing representing some scenario and accompanying information with the image. 
           - PAY CLOSE ATTENTION TO DIFFERENT COLORS FOR THESE PROBLEMS.
           - You need to return the answer in the format of a ARRAY OF OBJECT [{"expr": "given expression", "result": "calculated answer"}].
        
        2. You will be given an equation or expression in the image, and you need to solve it and return the answers in ARRAY OF OBJECT format .

        3.  You will be given an image where you need to add, subtract, Multiply or Divide based on the heading or prompt given in the image. Return the answer in the format of a ARRAY OF OBJECT. example if the Image heading or prompt says Tax deduction then [{"expr": "Total Tax Deduction", "result": "calculated answer"}]. 

        4.  When it says convert the currency you have to convert the currency based on the given exchange rate. Example if it says convert 100 USD to INR and the exchange rate is 1 USD = 75 INR then you have to convert 100 USD to INR and return the answer in the format of a ARRAY OF OBJECT [{"expr": "100 USD to INR", "result": "calculated answer"}].

        5.  If i provide the list of items and their prices and ask you to calculate the total price of the items then you have to calculate the total price of the items and return the answer in the format of a ARRAY OF OBJECT [{"expr": "Total Price of the items", "result": "calculated answer"}].


        6. Simple mathematical expressions like 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.: 
           - In this case, solve and return the answer in the format of a ARRAY OF OBJECT [{"expr": "given expression", "result": "calculated answer"}].
        
        7. Set of Equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.: 
           - In this case, solve for the given variable, and the format should be a COMMA-SEPARATED ARRAY OF OBJECTS, with obj 1 as {"expr": "x", "result": 2, "assign": true} and obj 2 as {"expr": "y", "result": 5, "assign": true}. 
           - This example assumes x was calculated as 2, and y as 5. Include as many dicts as there are variables.
        
        8. Assigning values to variables like x = 4, y = 5, z = 6, etc.: 
           - In this case, assign values to variables and return another key in the object called {"assign": true}, keeping the variable as "expr" and the value as "result" in the original dictionary. 
           - RETURN AS A ARRAY OF OBJECTS.

        Analyze the equation or expression in this image and return the answer according to the given rules and the answer must be in the format of ARRAY OF OBJECTS.
        
        Make sure to use extra backslashes for escape characters like \\f -> \\\\f, \\n -> \\\\n, etc. 
        
        Here is a dictionary of user-assigned variables. If the given expression has any of these variables, use its actual value from this Object accordingly.
        
        DO NOT USE BACKTICKS OR MARKDOWN FORMATTING. 
        
        And here is the context of image provided by the user, Based on this context you have to solve the problem : ${context}.

        PROPERLY QUOTE THE KEYS AND VALUES IN THE DICTIONARY FOR EASIER PARSING WITH JSON.parse().
        `;

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
