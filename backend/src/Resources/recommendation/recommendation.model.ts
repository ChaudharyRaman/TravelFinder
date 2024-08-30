import { Schema, model } from "mongoose";
import { IRecommendation } from "./recommendation.interface";

const RecommendationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itinerary: [
      {
        location: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        distance: {
          type: Number,
          required: true,
        },
        budget: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IRecommendation>("Recommendation", RecommendationSchema);
