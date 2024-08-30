"use client";
import Link from "next/link";
import { useState } from "react";
import { Loader } from "@/components/component/loader";
import axios from "axios";
import UserRecommendSection from "@/components/component/userRecommendSection";
import {
  InputRecommendation,
  OutputRecommendations,
} from "@/interface/recommendation.interface";
import Navbar from "@/components/ui/Navbar";

export default function userrecommend() {
  const [formData, setFormData] = useState<InputRecommendation>({
    location: "",
    interests: [],
    budget: "",
  });
  const [recommendations, setRecommendations] =
    useState<OutputRecommendations>();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedInterests = checked
          ? [...prevData.interests, value]
          : prevData.interests.filter((interest) => interest !== value);
        return { ...prevData, interests: updatedInterests };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recommend`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data) {
        setRecommendations(data);
        setFormData({
          location: "",
          interests: [],
          budget: "",
        });
        setIsLoading(false);
      } else {
        console.log("No data found");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh_-_theme(spacing.16))]">
        <header className="bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white py-8 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Discover Your Next Adventure
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  Get personalized travel recommendations tailored to your
                  interests and budget.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-lg shadow-lg p-6 md:p-8"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#5E3BEE] focus:border-[#5E3BEE] bg-gray-100 text-gray-900"
                        placeholder="Enter a city or country"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="interests"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Interests
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["nature", "culture", "food", "adventure"].map(
                          (interest) => (
                            <div className="flex items-center" key={interest}>
                              <input
                                type="checkbox"
                                id={interest}
                                name="interests"
                                value={interest}
                                checked={formData.interests.includes(interest)}
                                onChange={handleChange}
                                className="h-4 w-4 text-[#5E3BEE] focus:ring-[#5E3BEE] border-gray-300 rounded bg-gray-100"
                                aria-label={interest}
                              />
                              <label
                                htmlFor={interest}
                                className="ml-2 text-sm font-medium text-gray-900"
                              >
                                {interest.charAt(0).toUpperCase() +
                                  interest.slice(1)}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#5E3BEE] focus:border-[#5E3BEE] bg-gray-100 text-gray-900"
                      >
                        <option value="">Select a budget</option>
                        <option value="low">Low ($1,000 - $3,000)</option>
                        <option value="medium">Medium ($3,000 - $6,000)</option>
                        <option value="high">High ($6,000+)</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#5E3BEE] hover:bg-[#9B6AFF] text-white font-medium py-2 px-4 rounded-md mt-4 w-full"
                  >
                    Get Recommendations
                  </button>
                </form>
              </div>
              <div>
                <img
                  src="/travel4.jpg"
                  alt="Travel Destination"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </header>
        {(isLoading && <Loader />) ||
          (!isLoading && recommendations && (
            <UserRecommendSection recommendations={recommendations} />
          ))}
      </div>
    </div>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
