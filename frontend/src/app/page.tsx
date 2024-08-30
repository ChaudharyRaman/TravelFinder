"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /dashboard page
    router.replace("/dashboard");
  }, [router]);

  return null; // Render nothing as we are redirecting
}
