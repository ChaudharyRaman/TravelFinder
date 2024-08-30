import path from "path";
import * as fs from "fs";
import Handlebars from "handlebars";
import { InputRecommendation } from "../../Resources/recommendation/recommendation.interface";

/**
 * This function generates the prompt text using the Handlebars template
 * @param geminiData - InputRecommendation
 * @returns - string Prompt
 */
const promptText = (geminiData: InputRecommendation) => {
  console.log(__dirname);
  // const templatePath = path.join(__dirname, "userDataRecommendation.hbs");
  const templatePath = path.join(__dirname, "inputTravelPlan.hbs");
  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(templateSource);
  const prompt = template({
    location: geminiData.location,
    interests: geminiData.interests,
    budget: geminiData.budget,
  });

  return prompt;
};

export { promptText };
