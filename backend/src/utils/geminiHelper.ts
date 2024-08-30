import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { promptText } from "./handlebars/handleBarsHandler";
import { InputRecommendation } from "../Resources/recommendation/recommendation.interface";

/**
 * 
 * @param geminiData - InputRecommendation
 * @returns - Stringify JSON Recommendation (String)
 */
const generateRecommendation = async (geminiData: InputRecommendation) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API ?? "");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          trips: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                trip_name: {
                  type: SchemaType.STRING,
                },
                description: {
                  type: SchemaType.STRING,
                },
                locations: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      location_name: {
                        type: SchemaType.STRING,
                      },
                      location_description: {
                        type: SchemaType.STRING,
                      },
                      location_rating: {
                        type: SchemaType.STRING,
                      },
                      location_reviews: {
                        type: SchemaType.STRING,
                      },
                      location_price: {
                        type: SchemaType.STRING,
                      },
                      location_category: {
                        type: SchemaType.STRING,
                      },
                      location_address: {
                        type: SchemaType.STRING,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const prompt = promptText(geminiData);
  const result = await model.generateContent(prompt);
  const response = result.response;

  const text = await response.text();
  return text;
};

export { generateRecommendation };
