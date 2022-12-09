import * as React from "react";
import { toast } from "react-toastify";

export const codeToVideo = async (
  filename: string,
  code: string,
  signal: AbortSignal
): Promise<string> => {
  // POST to localhost 5000 with the file name and the code
  // return the file name
  try {
    const response = await fetch(
      "https://6jmr50bfgf.execute-api.us-east-1.amazonaws.com/stage/",
      {
        signal,
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
    return data.videoUrl;
  } catch (e) {
    // abort triggers "AbortError"
    console.log(e);
    console.log(JSON.stringify(e))
    toast(<div>😵😵😵<br/>There was an error generating the video! It's likely that our server is fried!</div>, {
      position: "top-center",
    })
    return "";
  }
};
