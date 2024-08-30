"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const Router = useRouter();
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-white">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Your Next Adventure
                  </h1>
                  <p className="max-w-[600px] text-white/80 md:text-xl">
                    Find the perfect destination for your next trip with our
                    personalized travel recommendations.
                  </p>
                </div>
                <div className="flex gap-5 mt-20 my-10">
                  <Button
                    className="bg-[#8e2de2] text-white hover:bg-[#a24ef4] flex-1"
                    onClick={() => {
                      Router.push("/user-recommend");
                    }}
                  >
                    Get Personalized Recommendation
                  </Button>
                  <Button
                    className="bg-[#4a00e0] text-white hover:bg-[#6b1fdd] flex-1"
                    onClick={() => {
                      Router.push("/ai-recommend");
                    }}
                  >
                    Get AI Recommendation
                  </Button>
                </div>
              </div>
              <Image
                src="/travel3.jpg"
                alt="Travel Destination"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#f0f0f0] px-3 py-1 text-sm text-[#8e2de2] font-medium">
                  AI-Powered Recommendations
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#333]">
                  Personalized Travel Suggestions
                </h2>
                <p className="max-w-[900px] text-[#666] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our advanced AI algorithms analyze your preferences and budget
                  to provide tailored travel recommendations just for you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#333]">
                        Exotic Getaways
                      </h3>
                      <p className="text-[#666]">
                        Discover hidden gems and off-the-beaten-path
                        destinations.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#333]">
                        Luxury Retreats
                      </h3>
                      <p className="text-[#666]">
                        Indulge in 5-star accommodations and world-class
                        amenities.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#333]">
                        Adventure Seekers
                      </h3>
                      <p className="text-[#666]">
                        Explore thrilling activities and adrenaline-fueled
                        experiences.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="/travel5.jpg"
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f0f0]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#e0e0e0] px-3 py-1 text-sm text-[#8e2de2] font-medium">
                  Featured Destinations
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#333]">
                  Explore the World with Us
                </h2>
                <p className="max-w-[900px] text-[#666] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From tropical beaches to snow-capped mountains, our
                  recommendations cover a wide range of destinations to suit
                  every traveler&apos;s taste.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <img
                  src="/bali.jpg"
                  width="550"
                  height="310"
                  alt="Destination 1"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#333]">
                    Bali, Indonesia
                  </h3>
                  <p className="text-[#666]">
                    Discover the beauty of Bali&apos;s beaches, temples, and vibrant
                    culture.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <img
                  src="/greece.jfif"
                  width="550"
                  height="310"
                  alt="Destination 2"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#333]">
                    Santorini, Greece
                  </h3>
                  <p className="text-[#666]">
                    Explore the iconic white-washed buildings and stunning
                    sunsets of Santorini.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <img
                  src="/peru.jfif"
                  width="550"
                  height="310"
                  alt="Destination 3"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#333]">
                    Machu Picchu, Peru
                  </h3>
                  <p className="text-[#666]">
                    Explore the ancient Inca ruins and breathtaking mountain
                    landscapes of Machu Picchu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]">
        <p className="text-xs text-white">TravelFinder.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs text-white hover:underline underline-offset-4"
            prefetch={false}
          >
            Made By
          </Link>
          <Link
            href="#"
            className="text-xs text-white hover:underline underline-offset-4"
            prefetch={false}
          >
            Raman Chaudhary
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function PlaneIcon(props: any) {
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
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}
