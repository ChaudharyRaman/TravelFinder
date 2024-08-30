export interface InputRecommendation {
  location: string;
  interests: string[];
  budget: string;
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
  location_description: string;
  location_rating: string;
  location_reviews: string;
  location_price: string;
  location_category: string;
  location_address: string;
}
