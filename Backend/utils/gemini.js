// import "dotenv/config";

// const getOpenAIAPIResponse = async(message) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         return data.choices[0].message.content; //reply
//     } catch(err) {
//         console.log(err);
//     }
// }

// export default getOpenAIAPIResponse;




import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const getGeminiAPIResponse = async(message) => {
    try {
        const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = client.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const response = await model.generateContent(message);
        const text = response.response.text();
        
        return text; // reply
    } catch(err) {
        console.error("Gemini API Error:", err);
        throw err;
    }
}

export default getGeminiAPIResponse;