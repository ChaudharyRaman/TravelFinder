import { Document } from "mongoose";

export interface IRecommendation {
  userId: Document;
  ininerary: [
    {
      location: string;
      duration: number;
      distance: number;
      budget: number;
    }
  ];
}
export interface InputRecommendation {
  location: string;
  interests: string[];
  budget: string;
}

export interface OutputRecommendations {
  trips: Trip[];
}
export interface Trip {
  trip_name: string;
  description: string;
  locations: LocationDetails[];
}
export interface LocationDetails {
  location_name: string;
  description: string;
  rating: string;
  reviews: string;
  price: string;
  category: string;
  location_address: string;
}

