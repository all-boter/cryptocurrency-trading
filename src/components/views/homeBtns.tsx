"use client";

import { googleAuthUrl, TOKEN_FIELD } from "@/common/constants";
import { Button } from "../ui/button";
import Cookies from 'js-cookie';
import { isJwtExpired } from "@/common";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function HomeBtns() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get(TOKEN_FIELD);
    const exp = Cookies.get('exp');
    if (token && exp) {
      setIsAuthenticated(isJwtExpired(Number(exp)));
    }
    setIsLoading(false);
  }, []);

  const onLoginWGoogle = () => {
    window.location.href = googleAuthUrl;
  };

  const onLaunch = () => {
    router.push('/dashboard');
  };

  if (isLoading) {
    return null
  }

  return (
    <div className="flex gap-4">
      {isAuthenticated ? (
        <Button
          onClick={onLaunch}
          className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
        >
          Launch App
        </Button>
      ) : (
        <Button
          onClick={onLoginWGoogle}
          className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
        >
          Login with Google
        </Button>
      )}
    </div>
  );
}
