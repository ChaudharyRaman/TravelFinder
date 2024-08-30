"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trip } from "@/interface/recommendation.interface";
interface LocationModalProps {
  children: React.ReactNode;
  tripDetails: Trip;
}

export default function LocationModal({
  children,
  tripDetails,
}: LocationModalProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleWishlist = async () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[800px] p-6 sm:p-8 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div />
          <Button
            variant="ghost"
            size="icon"
            className={`${
              isFavorited
                ? "text-pink-500 hover:text-pink-600"
                : "text-muted-foreground hover:text-muted"
            }`}
            onClick={handleWishlist}
          >
            <HeartIcon className="w-6 h-6" />
            <span className="sr-only">Favorite</span>
          </Button>
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Discover Our Top Destinations
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Browse our curated selection of premier travel locations.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 mt-6">
          {tripDetails.locations.map((location, index) => (
            <div className="flex gap-6" key={index}>
              <Card className="flex-1 bg-gradient-to-r from-[#0077b6] to-[#00a0dc] text-white pt-5">
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <MapPinIcon className="w-8 h-8 text-white" />
                    <div>
                      <h3 className="text-lg font-bold">
                        {location.location_name ?? "N/A"}
                      </h3>
                      <p className="text-white/80">
                        {location.location_description ?? "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5 fill-white" />
                    <span className="font-medium">
                      {location.location_reviews ?? "N/A"}
                    </span>
                    <span className="text-white/80">
                      {location.location_reviews
                        ? `(${location.location_reviews.length} reviews)`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-5 h-5 text-white" />
                    <span className="font-medium">
                      {location.location_price}
                    </span>
                    {/* <span className="text-white/80">per night</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <TagIcon className="w-5 h-5 text-white" />
                    <span className="font-medium">
                      {location.location_category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-white" />
                    <span className="text-white/80">
                      {location.location_address ?? "N/A"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DollarSignIcon(props: any) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HeartIcon(props: any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MapIcon(props: any) {
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
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}

function MapPinIcon(props: any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StarIcon(props: any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TagIcon(props: any) {
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
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}
