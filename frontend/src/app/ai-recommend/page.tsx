"use client";
import { useState } from "react";
import { Loader } from "@/components/component/loader";
import axios from "axios";
import UserRecommendSection from "@/components/component/userRecommendSection";
import { OutputRecommendations } from "@/interface/recommendation.interface";
import Navbar from "@/components/ui/Navbar";
import toast from "react-hot-toast";

export default function AiRecommend() {
  const [recommendations, setRecommendations] =
    useState<OutputRecommendations>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", // Optional: Smooth scrolling
      });
    }, 500);

    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recommend`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data) {
        setRecommendations(data);
      } else {
        console.log("No data found");
        toast.error("Failed to get recommendations");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to get recommendations");
    } finally {
      setIsLoading(false);
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
                <button
                  className="bg-[#5E3BEE] hover:bg-[#9B6AFF] text-white font-medium py-2 px-2 rounded-md mt-4 w-full"
                  onClick={handleSubmit}
                >
                  Get Recommendations
                </button>
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
