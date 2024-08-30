import { OutputRecommendations } from "@/interface/recommendation.interface";
import React from "react";
import LocationModal from "./location-modal";
import Image from "next/image";
interface UserRecommendSectionProps {
  recommendations: OutputRecommendations;
}
const UserRecommendSection = ({
  recommendations,
}: UserRecommendSectionProps) => {
  return (
    <section className="bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          User-Based Recommendations
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.trips.map((recommendation, index) => (
            <div className="bg-white rounded-lg shadow-lg p-6" key={index}>
              <Image
                src={"/location.svg"}
                alt={"Destination " + index}
                width={400}
                height={300}
                className="rounded-lg mb-4"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <h3 className="text-xl font-bold mb-2">
                {recommendation.trip_name}
              </h3>
              <p className="text-gray-700 mb-4">{recommendation.description}</p>
              <LocationModal tripDetails={recommendation}>
                <button className="bg-[#5E3BEE] hover:bg-[#9B6AFF] text-white font-medium py-2 px-4 rounded-md">
                  Learn More
                </button>
              </LocationModal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRecommendSection;
