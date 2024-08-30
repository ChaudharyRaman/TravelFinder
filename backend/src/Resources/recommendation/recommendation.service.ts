import {
  InputRecommendation,
  OutputRecommendations,
} from "./recommendation.interface";
import { generateRecommendation } from "../../utils/geminiHelper";

class RecommendationService {
  public getRecommendation = async (
    input: InputRecommendation
  ): Promise<OutputRecommendations> => {
    const genRecommendation = await generateRecommendation(input);
    const jsonRecommendation = JSON.parse(genRecommendation);
    return jsonRecommendation as OutputRecommendations;
  };
}

export default RecommendationService;
