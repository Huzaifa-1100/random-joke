"use client";

// Import necessary hooks from React
import { useState, useEffect } from "react";

// Import custom Button component for the UI directory
import { Button } from "./ui/button";
import Image from "next/image";

// Define a TypeScript interface forfor the joke response
interface JokeResponse {
  setup: string;
  punchline: string;
}

// Default export of the RandomeJokeComponent function
export default function RandomeJokeComponent() {
  // state hook for managing the current joke
  const [joke, setJoke] = useState<string>("");

  // Effect hook to fetch a joke when the component mounts
  useEffect(() => {
    fetchRandomJoke();
  }, []);
  //   Async function to fetch a joke when the component
  async function fetchRandomJoke(): Promise<void> {
    try {
      // Make a GET request to the joke API
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      // Update state with the fetched joke
      setJoke(`${data.setup}... ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error); // Log any errors
      // Set an error message if the fetch fails
      setJoke("Failed to fetch joke. Please try again later.");
    }
  }
  // JSX return statement rendering the random Joke UI
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Adding background gif */}
      <Image src={"/funny.gif"} alt="|background" width={500} height={500} 
      className="relative object-cover h-screen" />

      {/* Center the joke card within the screen */}
      <div className="absolute bg-white flex flex-col items-center justify-center bg-opacity-50 rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header with title */}
        <h1 className="text-3xl font-bold mb-4 text-[#333] uppercase">Random Joke</h1>
        {/* Dispaly the joke or a loading message */}
        <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-[#555] text-lg">
          {joke || "Loading..."}
        </div>
        {/* Button to fetch a new joke  */}
        <Button
          onClick={fetchRandomJoke}
          className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          😂 Get New Joke 😂
        </Button>
      </div>
    </div>
  );
}
