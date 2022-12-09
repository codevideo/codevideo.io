import * as React from "react";
import { toast } from "react-toastify";
import { netlifyPost } from "../api/netlifyPost";

export const codeToVideo = async (
  filename: string,
  code: string,
  setVideoUrl: (videoUrl: string) => void
): Promise<void> => {
  // POST to localhost 5000 with the file name and the code
  // return the file name
  try {
    // await netlifyPost<{ videoUrl: string }, { filename: string; code: string }>(
    //   "/codeToVideo",
    //   (data) => {
    //     setVideoUrl(data.videoUrl);
    //   },
    //   (e) => {
    //     console.log(e);
    //     toast(
    //       <div>
    //         😵😵😵
    //         <br />
    //         There was an error generating the video! It's likely that our server
    //         is fried!
    //       </div>,
    //       {
    //         position: "top-center",
    //       }
    //     );
    //     setVideoUrl("");
    //   },
    //   { filename, code }
    // );
    const response = await fetch(
      "https://54b7w7df4hs45jkhqo7sjizqeu0ldsbg.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename,
          code: code,
          saveToBucket: true,
        }),
      }
    );
    const data = await response.json();
    console.log("returned data is: ", data)
    setVideoUrl(data.videoUrl);
  } catch (e) {
    // abort triggers "AbortError"
  }
};
