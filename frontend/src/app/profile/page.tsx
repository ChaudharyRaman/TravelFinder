"use client";
import React, { useContext, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
import { UserContext } from "@/context/ContextProvider";
import { Loader } from "@/components/component/loader";

export default function Profile() {
  const { user, setFetch, fetch } = useContext(UserContext);
  useEffect(() => {
    if (!user) {
      setFetch(!fetch);
    }
  }, []);

  if (!user) {
    return <Loader />;
  }
  console.log(user);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 text-white">
      <Navbar />
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 flex flex-col items-center">
        <div className="bg-white/10 rounded-lg p-8 shadow-lg w-full max-w-md text-white">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-2xl font-bold">{user.user.name ?? "NA"}</h2>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Email:</span>
              <span>{user.user.email ?? ""} </span>
            </div>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-8 shadow-lg w-full max-w-md mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Travel Preferences
          </h2>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="favorite-location" className="text-gray-300">
                Favorite Location
              </Label>
              <Input
                id="favorite-location"
                type="text"
                placeholder="Enter your favorite location"
                className="bg-white/20 border-transparent text-white"
                value={
                  Array.isArray(user.user.userPreferences?.locations) &&
                  user.user.userPreferences?.locations.length > 0
                    ? user.user.userPreferences.location[0]
                    : user.user.userPreferences?.location || ""
                }
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interests" className="text-white-300">
                Interests
              </Label>
              <div className="flex flex-col gap-2">
                {user?.user?.userPreferences?.interests.map(
                  (interest, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Checkbox id={index} checked className="text-white" />
                      <Label htmlFor={interest} className="text-white">
                        {interest}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="budget" className="text-gray-300">
                Budget
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="Enter your budget"
                className="bg-white/20 border-transparent text-white"
                value={user.user.userPreferences?.budget ?? ""}
                disabled
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
