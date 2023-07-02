import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { generatePrompt } from "./functions";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req) {
  const { prompt } = await req.json();
  const generatedPrompt = generatePrompt(JSON.parse(prompt));
  console.log(generatedPrompt);
  // try {
  //   let models = await fetch("https://api.openai.com/v1/models", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //     },
  //   });
  //   models = await models.json();
  //   const names = models.data.map((model) => model.id);
  //   console.log(names);
  // } catch (err) {
  //   console.log(err.message);
  // }
  // Ask OpenAI for a streaming completion given the prompt
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   stream: true,
  //   temperature: 0.9,
  //   max_tokens: 4000,
  //   prompt: generatedPrompt,
  // });

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: generatedPrompt,
      },
    ],
    max_tokens: 8000,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
