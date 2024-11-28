"use client";

import { googleAuthUrl } from "@/common/constants";
import { Button } from "../ui/button";

export function HomeBtns() {

  const onLoginWGoogle = () => {

    window.open(googleAuthUrl)
    // console.log('%c=','color:red',googleAuthUrl)
  }

  return <div>
    {/* <Button>
      loginWGitHub
    </Button> */}
    <Button onClick={() => onLoginWGoogle()}>
      loginWGoogle
    </Button>
  </div>
}
