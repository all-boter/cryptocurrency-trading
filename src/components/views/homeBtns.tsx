"use client";

import { googleAuthUrl } from "@/common/constants";
import { Button } from "../ui/button";

export function HomeBtns() {
  const onLoginWGoogle = () => {
    window.open(googleAuthUrl)
  }

  return (
    <div className="flex gap-4">
      <Button 
        onClick={() => onLoginWGoogle()}
        className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
      >
        Login with Google
      </Button>
    </div>
  )
}
