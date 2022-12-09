import { Handler } from "@netlify/functions";
import { Event } from "@netlify/functions/dist/function/event";
import { resolveSystemContext } from "./utils/resolveSystemContext";
import { validateBodyParams } from "./utils/validateBodyParams";

const handler: Handler = async (event: Event) => {
  const [systemContext, systemContextErr] = resolveSystemContext(event);
  if (systemContextErr !== null) {
    return {
      statusCode: 400,
      body: JSON.stringify(systemContextErr),
    };
  }

  if (event.body === null) {
    return {
      statusCode: 400,
      body: "event.body is null",
    };
  }

  const json = JSON.parse(event.body);

  const validationErr = validateBodyParams(json, ["filename", "code"]);
  if (validationErr !== null) {
    return {
      statusCode: 400,
      body: JSON.stringify(validationErr),
    };
  }

  const response = await fetch(
    "https://ler2xyky6k.execute-api.us-east-1.amazonaws.com/stage/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: json.filename,
        code: json.code,
        saveToBucket: true,
        apiKey: process.env.API_KEY,
      }),
    }
  );
  const responseJson = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ videoUrl: responseJson.videoUrl }),
  };
};

export { handler };
