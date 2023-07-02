"use server";
// import fs from "fs";
// import util from "util";
const textToSpeech = require("@google-cloud/text-to-speech");

// // Set the runtime to edge for best performance
// export const runtime = "edge";

export async function POST(req) {
  const client = new textToSpeech.TextToSpeechClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
  });
  const { story, language } = await req.json();
  // const outputFile = "output.mp3";

  let languageCode = "en-US";
  let name = "en-US-Wavenet-F";

  console.log("language", language);

  if (language === "spanish") {
    languageCode = "es-ES";
    name = "es-ES-Standard-A";
  } else if (language === "french") {
    languageCode = "fr-FR";
    name = "fr-FR-Standard-A";
  } else if (language === "russian") {
    languageCode = "ru-RU";
    name = "ru-RU-Standard-D";
  }

  const request = {
    input: { text: story },
    voice: { languageCode, name },
    audioConfig: { audioEncoding: "MP3", peakingRate: 0.8 },
  };
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile(outputFile, response.audioContent, "binary");
  // console.log(`Audio content written to file: ${outputFile}`);

  // Respond with the stream

  return new Response(response.audioContent, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
