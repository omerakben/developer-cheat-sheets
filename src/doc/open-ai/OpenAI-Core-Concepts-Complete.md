# OpenAI API Core Concepts - Complete Guide

## Table of Contents

1. [Core Concepts Overview](#core-concepts-overview)
2. [Developer Quickstart](#developer-quickstart)
3. [Text Generation](#text-generation)
4. [Audio and Speech](#audio-and-speech)
5. [Images and Vision](#images-and-vision)
6. [Function Calling](#function-calling)
7. [Structured Outputs](#structured-outputs)
8. [Model Selection](#model-selection)
9. [Embeddings](#embeddings)
10. [Pricing and Usage](#pricing-and-usage)
11. [Migration Guidance](#migration-guidance)

---

# Core Concepts Overview

Learn the fundamental concepts for working with the OpenAI API.

This comprehensive guide covers all essential concepts for working with the OpenAI API, including getting started, text generation, audio and speech, images and vision, function calling, structured outputs, models, pricing, and migration guidance. Whether you're new to AI development or looking to integrate OpenAI's latest capabilities, this guide provides the foundation you need.

## What You'll Learn

- **API Fundamentals**: Authentication, SDKs, and basic usage patterns
- **Core Features**: Text generation, image analysis, audio processing, and structured outputs
- **Advanced Capabilities**: Function calling, tool integration, and multimodal interactions
- **Model Selection**: Choose the right model for your specific use case
- **Best Practices**: Prompt engineering, cost optimization, and production considerations
- **Migration Paths**: Moving from legacy APIs to current recommended approaches

---

# Developer Quickstart

Take your first steps with the OpenAI API.

The OpenAI API provides a simple interface to state-of-the-art AI models for text generation, natural language processing, computer vision, and more. Get started by creating an API Key and running your first API call. Discover how to generate text, analyze images, build agents, and more.

## Create and Export an API Key

**[Create an API Key](https://platform.openai.com/api-keys)**

Before you begin, create an API key in the dashboard, which you'll use to securely access the API. Store the key in a safe location, like a `.zshrc` file or another text file on your computer. Once you've generated an API key, export it as an environment variable in your terminal.

### macOS / Linux

Export an environment variable on macOS or Linux systems:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

### Windows

Export an environment variable in PowerShell:

```bash
setx OPENAI_API_KEY "your_api_key_here"
```

OpenAI SDKs are configured to automatically read your API key from the system environment.

## Install the OpenAI SDK and Run an API Call

### JavaScript

To use the OpenAI API in server-side JavaScript environments like Node.js, Deno, or Bun, you can use the official [OpenAI SDK for TypeScript and JavaScript](https://github.com/openai/openai-node).

**Installation:**

```bash
npm install openai
```

**Basic Usage:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);
```

Execute with `node example.mjs` and you should see the output of your API request.

**[Learn more on GitHub](https://github.com/openai/openai-node)**

### Python

**Installation:**

```bash
pip install openai
```

**Basic Usage:**

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input="Write a one-sentence bedtime story about a unicorn."
)

print(response.output_text)
```

Execute with `python example.py` and you should see the output of your API request.

**[Learn more on GitHub](https://github.com/openai/openai-python)**

### .NET

In collaboration with Microsoft, OpenAI provides an officially supported API client for C#.

**Installation:**

```text
dotnet add package OpenAI
```

**Basic Usage:**

```csharp
using System;
using System.Threading.Tasks;
using OpenAI;

class Program
{
    static async Task Main()
    {
        var client = new OpenAIClient(
            Environment.GetEnvironmentVariable("OPENAI_API_KEY")
        );

        var response = await client.Responses.CreateAsync(new ResponseCreateRequest
        {
            Model = "gpt-5",
            Input = "Say 'this is a test.'"
        });

        Console.WriteLine($"[ASSISTANT]: {response.OutputText}");
    }
}
```

**[Learn more on GitHub](https://github.com/openai/openai-dotnet)**

### Java

**Installation (Maven):**

```xml
<dependency>
    <groupId>com.openai</groupId>
    <artifactId>openai-java</artifactId>
    <version>4.0.0</version>
</dependency>
```

**Basic Usage:**

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;

public class Main {
    public static void main(String[] args) {
        OpenAIClient client = OpenAIOkHttpClient.fromEnv();

        ResponseCreateParams params = ResponseCreateParams.builder()
            .input("Say this is a test")
            .model("gpt-5")
            .build();

        Response response = client.responses().create(params);
        System.out.println(response.outputText());
    }
}
```

**[Learn more on GitHub](https://github.com/openai/openai-java)**

### Go

**Installation:**

```golang
import (
    "github.com/openai/openai-go" // imported as openai
)
```

**Basic Usage:**

```golang
package main

import (
    "context"
    "fmt"
    "github.com/openai/openai-go/v3"
    "github.com/openai/openai-go/v3/option"
)

func main() {
    client := openai.NewClient(
        option.WithAPIKey("My API Key"), // or set OPENAI_API_KEY in your env
    )

    response, err := client.Responses.Create(context.Background(), openai.ResponseCreateParams{
        Model: openai.F("gpt-5"),
        Input: openai.F("Say this is a test"),
    })

    if err != nil {
        panic(err)
    }

    fmt.Println(response.OutputText)
}
```

**[Learn more on GitHub](https://github.com/openai/openai-go)**

---

# Text Generation

Learn how to prompt a model to generate text.

With the OpenAI API, you can use a large language model to generate text from a prompt, as you might using ChatGPT. Models can generate almost any kind of text response—like code, mathematical equations, structured JSON data, or human-like prose.

Here's a simple example using the Responses API, our recommended API for all new projects.

## Generate Text from a Simple Prompt

### JavaScript

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);
```

### Python

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input="Write a one-sentence bedtime story about a unicorn."
)

print(response.output_text)
```

### C #

```csharp
using OpenAI.Responses;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
OpenAIResponseClient client = new(model: "gpt-5", apiKey: key);

OpenAIResponse response = client.CreateResponse(
    "Write a one-sentence bedtime story about a unicorn."
);

Console.WriteLine(response.GetOutputText());
```

### cURL

```bash
curl "https://api.openai.com/v1/responses" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-5",
        "input": "Write a one-sentence bedtime story about a unicorn."
    }'
```

## Understanding the Response Structure

The model's response contains an `output` array with various items. Here's an example:

```json
[
    {
        "id": "msg_67b73f697ba4819183a15cc17d011509",
        "type": "message",
        "role": "assistant",
        "content": [
            {
                "type": "output_text",
                "text": "Under the soft glow of the moon, Luna the unicorn danced through fields of twinkling stardust, leaving trails of dreams for every child asleep.",
                "annotations": []
            }
        ]
    }
]
```

**Important:** The `output` array often has more than one item! It can contain tool calls, reasoning tokens, and other items. Don't assume the text output is always at `output[0].content[0].text`.

Our official SDKs include an `output_text` property for convenience, which aggregates all text outputs into a single string.

## Prompt Engineering

**Prompt engineering** is the process of writing effective instructions for a model to consistently generate content that meets your requirements.

### Key Principles

1. **Be specific and clear**: Provide detailed instructions about what you want
2. **Use examples**: Show the model what good output looks like
3. **Set context**: Give relevant background information
4. **Test and iterate**: Refine your prompts based on results

### Message Roles and Instruction Following

You can provide instructions with different levels of authority using the `instructions` parameter and **message roles**.

#### Generate text with instructions

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    instructions: "Talk like a pirate.",
    input: "Are semicolons optional in JavaScript?",
});

console.log(response.output_text);
```

#### Generate text with different message roles

```javascript
const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
        {
            role: "developer",
            content: "Talk like a pirate."
        },
        {
            role: "user",
            content: "Are semicolons optional in JavaScript?",
        },
    ],
});
```

### Message Role Hierarchy

| Role          | Authority | Description                                                          |
| ------------- | --------- | -------------------------------------------------------------------- |
| **developer** | Highest   | Instructions from the app developer, prioritized above user messages |
| **user**      | Medium    | Instructions from end users, prioritized behind developer messages   |
| **assistant** | Lowest    | Messages generated by the model                                      |

Think of `developer` messages as function definitions and `user` messages as the arguments to those functions.

## Reusable Prompts

Create reusable prompts in the OpenAI dashboard with placeholders, then use them in API requests.

### String Variables

```javascript
const response = await client.responses.create({
    model: "gpt-5",
    prompt: {
        id: "pmpt_abc123",
        version: "2",
        variables: {
            customer_name: "Jane Doe",
            product: "40oz juice box"
        }
    }
});
```

### Variables with File Input

```javascript
// Upload a file first
const file = await client.files.create({
    file: fs.createReadStream("document.pdf"),
    purpose: "user_data",
});

const response = await client.responses.create({
    model: "gpt-5",
    prompt: {
        id: "pmpt_abc123",
        variables: {
            topic: "Analysis Topic",
            reference_pdf: {
                type: "input_file",
                file_id: file.id,
            },
        },
    },
});
```

## Choosing Models and APIs

- **Reasoning models** (like o3 and GPT-5) work better with the Responses API
- **Chat models** can work with both APIs but Responses API is recommended
- **Pin to specific model snapshots** for production consistency
- **Build evaluations** to measure prompt performance over time

---

# Audio and Speech

Learn how to use OpenAI's audio capabilities for speech-to-text, text-to-speech, and multimodal interactions.

OpenAI provides several audio-related capabilities through different APIs and models, enabling you to build applications that can listen, understand, and speak.

## Audio Transcription (Speech-to-Text)

Convert audio files into text using the Whisper model.

### Basic Transcription

**JavaScript:**

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

const transcription = await client.audio.transcriptions.create({
    file: fs.createReadStream("path/to/audio.mp3"),
    model: "whisper-1",
});

console.log(transcription.text);
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

with open("path/to/audio.mp3", "rb") as audio_file:
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )

print(transcription.text)
```

### Advanced Transcription Options

```javascript
const transcription = await client.audio.transcriptions.create({
    file: fs.createReadStream("path/to/audio.mp3"),
    model: "whisper-1",
    language: "en", // Specify language for better accuracy
    prompt: "This audio contains technical terms about AI and machine learning.", // Context hint
    response_format: "verbose_json", // Get timestamps and confidence scores
    temperature: 0.2, // Lower temperature for more consistent transcription
});

console.log(transcription.segments); // Detailed segment information
```

## Text-to-Speech (TTS)

Generate natural-sounding speech from text.

### Basic Text-to-Speech

**JavaScript:**

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

const speech = await client.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Hello! Welcome to OpenAI's text-to-speech API.",
});

// Save to file
const buffer = Buffer.from(await speech.arrayBuffer());
fs.writeFileSync("speech.mp3", buffer);
```

**Python:**

```python
from openai import OpenAI
from pathlib import Path

client = OpenAI()

response = client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input="Hello! Welcome to OpenAI's text-to-speech API."
)

# Save to file
response.stream_to_file("speech.mp3")
```

### Available Voices

| Voice       | Description            | Best For             |
| ----------- | ---------------------- | -------------------- |
| **alloy**   | Balanced and natural   | General purpose      |
| **echo**    | Clear and articulate   | Professional content |
| **fable**   | Warm and expressive    | Storytelling         |
| **onyx**    | Deep and authoritative | Announcements        |
| **nova**    | Bright and engaging    | Marketing            |
| **shimmer** | Soft and gentle        | Meditative content   |

### TTS Models

- **tts-1**: Standard quality, lower latency, more cost-effective
- **tts-1-hd**: Higher quality, higher latency, more expensive

## Realtime Audio Processing

For real-time audio interactions, use the Realtime API for low-latency speech-to-speech conversations.

### Basic Realtime Setup

**JavaScript (WebRTC):**

```javascript
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";

const agent = new RealtimeAgent({
    name: "Assistant",
    instructions: "You are a helpful voice assistant.",
});

const session = new RealtimeSession(agent);

// Connect with automatic audio I/O
await session.connect({
    apiKey: process.env.OPENAI_API_KEY,
});

// The session will now handle voice input/output automatically
```

**Python (WebSocket):**

```python
import asyncio
import websockets
import json

async def realtime_audio():
    uri = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview"
    headers = {"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"}

    async with websockets.connect(uri, extra_headers=headers) as websocket:
        # Configure session
        await websocket.send(json.dumps({
            "type": "session.update",
            "session": {
                "modalities": ["text", "audio"],
                "instructions": "You are a helpful voice assistant.",
                "voice": "alloy"
            }
        }))

        # Handle audio streaming
        async for message in websocket:
            event = json.loads(message)
            print(f"Received: {event['type']}")

asyncio.run(realtime_audio())
```

## Audio Analysis in Responses API

Analyze audio content using multimodal models in the Responses API.

### Audio File Analysis

**JavaScript:**

```javascript
const response = await client.responses.create({
    model: "gpt-4o",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "Transcribe this audio and summarize the key points."
                },
                {
                    type: "input_audio",
                    audio_url: "path/to/audio.mp3"
                }
            ]
        }
    ]
});

console.log(response.output_text);
```

**Python:**

```python
response = client.responses.create(
    model="gpt-4o",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Transcribe this audio and summarize the key points."
                },
                {
                    "type": "input_audio",
                    "audio_url": "path/to/audio.mp3"
                }
            ]
        }
    ]
)

print(response.output_text)
```

## Best Practices

### For Transcription

- **Use appropriate language codes** for better accuracy
- **Provide context prompts** for domain-specific terminology
- **Consider chunking long audio files** for better performance
- **Use verbose_json format** when you need timestamps

### For Text-to-Speech

- **Choose voices that match your content tone**
- **Break up very long texts** into smaller chunks
- **Use SSML tags** for fine-grained control over pronunciation
- **Test different voices** with your specific content

### For Realtime Audio

- **Use WebRTC for client-side applications** (browsers, mobile)
- **Use WebSockets for server-side applications**
- **Implement proper error handling** for network issues
- **Consider latency requirements** when choosing transport methods

---

# Images and Vision

Learn how to analyze, generate, and work with images using OpenAI's vision and image generation capabilities.

OpenAI provides powerful image capabilities through vision models that can analyze and understand images, and image generation models that can create new images from text descriptions.

## Image Analysis with Vision Models

Analyze images using multimodal models like GPT-4o and GPT-4o-mini.

### Analyze an Image from URL

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-4o",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "What's happening in this image? Describe it in detail."
                },
                {
                    type: "input_image",
                    image_url: "https://example.com/image.jpg"
                }
            ]
        }
    ]
});

console.log(response.output_text);
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-4o",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "What's happening in this image? Describe it in detail."
                },
                {
                    "type": "input_image",
                    "image_url": "https://example.com/image.jpg"
                }
            ]
        }
    ]
)

print(response.output_text)
```

### Analyze a Local Image File

**JavaScript:**

```javascript
import fs from "fs";

// Upload the image first
const file = await client.files.create({
    file: fs.createReadStream("path/to/image.jpg"),
    purpose: "vision"
});

const response = await client.responses.create({
    model: "gpt-4o",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "Analyze this image and extract any text you see."
                },
                {
                    type: "input_file",
                    file_id: file.id
                }
            ]
        }
    ]
});
```

### Base64 Image Input

**JavaScript:**

```javascript
import fs from "fs";

// Convert image to base64
const imageBuffer = fs.readFileSync("path/to/image.jpg");
const base64Image = imageBuffer.toString('base64');

const response = await client.responses.create({
    model: "gpt-4o",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "What objects can you identify in this image?"
                },
                {
                    type: "input_image",
                    image_url: `data:image/jpeg;base64,${base64Image}`
                }
            ]
        }
    ]
});
```

## Image Generation with DALL-E

Generate images from text descriptions using DALL-E models.

### Basic Image Generation

**JavaScript:**

```javascript
const response = await client.images.generate({
    model: "dall-e-3",
    prompt: "A serene lake surrounded by autumn trees, digital art style",
    size: "1024x1024",
    quality: "standard",
    n: 1,
});

console.log(response.data[0].url);
```

**Python:**

```python
response = client.images.generate(
    model="dall-e-3",
    prompt="A serene lake surrounded by autumn trees, digital art style",
    size="1024x1024",
    quality="standard",
    n=1,
)

print(response.data[0].url)
```

### Advanced Image Generation Options

**JavaScript:**

```javascript
const response = await client.images.generate({
    model: "dall-e-3",
    prompt: "A futuristic cityscape with flying cars and neon lights, cyberpunk style, highly detailed",
    size: "1792x1024", // Wide format
    quality: "hd", // Higher quality
    style: "vivid", // More vivid colors
    n: 1,
    response_format: "b64_json" // Get base64 instead of URL
});

// Save the base64 image
const base64Data = response.data[0].b64_json;
const buffer = Buffer.from(base64Data, 'base64');
fs.writeFileSync('generated_image.png', buffer);
```

### Image Generation with Responses API

For more integrated workflows, use image generation as a tool within the Responses API:

**JavaScript:**

```javascript
const response = await client.responses.create({
    model: "gpt-4o",
    input: "Create an image of a cozy coffee shop interior and then describe what makes it inviting.",
    tools: [{ type: "image_generation" }]
});

// The response will contain both the generated image and description
console.log(response.output_text);

// Extract generated images
const imageData = response.output
    .filter(output => output.type === "image_generation_call")
    .map(output => output.result);
```

## Image Editing and Variations

### Image Editing (Inpainting)

**JavaScript:**

```javascript
const response = await client.images.edit({
    model: "dall-e-2",
    image: fs.createReadStream("original.png"),
    mask: fs.createReadStream("mask.png"), // White areas will be edited
    prompt: "Add a red sports car in the parking lot",
    n: 1,
    size: "1024x1024"
});

console.log(response.data[0].url);
```

### Image Variations

**JavaScript:**

```javascript
const response = await client.images.createVariation({
    model: "dall-e-2",
    image: fs.createReadStream("original.png"),
    n: 3, // Create 3 variations
    size: "1024x1024"
});

response.data.forEach((variation, index) => {
    console.log(`Variation ${index + 1}: ${variation.url}`);
});
```

## Vision Model Capabilities

### Text Extraction (OCR)

```javascript
const response = await client.responses.create({
    model: "gpt-4o",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "Extract all the text from this image and format it as markdown."
                },
                {
                    type: "input_image",
                    image_url: "https://example.com/document.jpg"
                }
            ]
        }
    ]
});
```

### Object Detection and Counting

```javascript
const response = await client.responses.create({
    model: "gpt-4o",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "Count how many people are in this image and describe what each person is doing."
                },
                {
                    type: "input_image",
                    image_url: "https://example.com/crowd.jpg"
                }
            ]
        }
    ]
});
```

### Chart and Graph Analysis

```javascript
const response = await client.responses.create({
    model: "gpt-4o",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "Analyze this chart and explain the trends you see. What insights can you derive?"
                },
                {
                    type: "input_image",
                    image_url: "https://example.com/chart.png"
                }
            ]
        }
    ]
});
```

## Best Practices

### For Image Analysis

- **Use clear, high-resolution images** for better accuracy
- **Be specific in your prompts** about what you want to analyze
- **Consider image orientation and cropping** for optimal results
- **Use appropriate models** (GPT-4o for general vision, GPT-4o-mini for lighter tasks)

### For Image Generation

- **Write detailed, descriptive prompts** for better results
- **Specify style, mood, and composition** in your prompts
- **Use DALL-E 3 for higher quality** and better prompt following
- **Consider aspect ratios** that match your intended use case
- **Iterate on prompts** to refine results

### Technical Considerations

- **Image size limits**: 20MB for vision models
- **Supported formats**: PNG, JPEG, WEBP, GIF
- **Cost optimization**: Use appropriate quality settings
- **Rate limits**: Be mindful of API rate limits for batch processing

---

# Function Calling

Learn how to extend model capabilities by defining custom functions that models can call.

Function calling allows models to interact with external APIs, databases, and tools by calling functions you define. This enables models to perform actions beyond text generation, such as retrieving real-time data, updating systems, or triggering workflows.

## Basic Function Calling

Define functions that the model can call when needed to complete a task.

### Simple Function Example

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Define the function
const functions = [{
    type: "function",
    function: {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA"
                },
                unit: {
                    type: "string",
                    enum: ["celsius", "fahrenheit"]
                }
            },
            required: ["location"]
        }
    }
}];

const response = await client.responses.create({
    model: "gpt-4o",
    input: "What's the weather like in Boston today?",
    tools: functions
});

console.log(response.output);
```

### Function Implementation

When the model calls a function, you need to implement the actual logic:

**JavaScript:**

```javascript
// Function implementations
async function getCurrentWeather(location, unit = "fahrenheit") {
    // Call your weather API here
    const weatherData = await fetch(`https://weather-api.com/current?location=${location}&unit=${unit}`);
    const data = await weatherData.json();

    return {
        location: location,
        temperature: data.temperature,
        condition: data.condition,
        unit: unit
    };
}

// Handle function calls in the response
const response = await client.responses.create({
    model: "gpt-4o",
    input: "What's the weather like in Boston today?",
    tools: functions
});

// Check if the model made function calls
const functionCalls = response.output.filter(item => item.type === "function_call");

for (const call of functionCalls) {
    if (call.function.name === "get_current_weather") {
        const args = JSON.parse(call.function.arguments);
        const weatherResult = await getCurrentWeather(args.location, args.unit);

        // Send the result back to the model
        const followUp = await client.responses.create({
            model: "gpt-4o",
            previous_response_id: response.id,
            input: [{
                role: "function",
                name: "get_current_weather",
                content: JSON.stringify(weatherResult)
            }]
        });

        console.log(followUp.output_text);
    }
}
```

### Python Function Example

**Python:**

```python
from openai import OpenAI
import json

client = OpenAI()

# Define function
functions = [{
    "type": "function",
    "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA",
                },
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["location"],
        },
    }
}]

response = client.responses.create(
    model="gpt-4o",
    input="What's the weather like in Paris today?",
    tools=functions
)

# Handle function calls
for item in response.output:
    if item.type == "function_call":
        if item.function.name == "get_current_weather":
            args = json.loads(item.function.arguments)
            # Implement your weather function here
            weather_result = get_current_weather(args["location"], args.get("unit", "fahrenheit"))

            # Continue the conversation with the function result
            follow_up = client.responses.create(
                model="gpt-4o",
                previous_response_id=response.id,
                input=[{
                    "role": "function",
                    "name": "get_current_weather",
                    "content": json.dumps(weather_result)
                }]
            )

            print(follow_up.output_text)
```

## Advanced Function Calling

### Multiple Functions

You can define multiple functions for the model to choose from:

**JavaScript:**

```javascript
const tools = [
    {
        type: "function",
        function: {
            name: "get_weather",
            description: "Get current weather for a location",
            parameters: {
                type: "object",
                properties: {
                    location: { type: "string", description: "City name" }
                },
                required: ["location"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "search_restaurants",
            description: "Find restaurants in a given location",
            parameters: {
                type: "object",
                properties: {
                    location: { type: "string", description: "City name" },
                    cuisine: { type: "string", description: "Type of cuisine" },
                    price_range: {
                        type: "string",
                        enum: ["$", "$$", "$$$", "$$$$"],
                        description: "Price range"
                    }
                },
                required: ["location"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "book_reservation",
            description: "Book a restaurant reservation",
            parameters: {
                type: "object",
                properties: {
                    restaurant_id: { type: "string" },
                    date: { type: "string", format: "date" },
                    time: { type: "string", format: "time" },
                    party_size: { type: "integer", minimum: 1 }
                },
                required: ["restaurant_id", "date", "time", "party_size"]
            }
        }
    }
];

const response = await client.responses.create({
    model: "gpt-4o",
    input: "I want to find a good Italian restaurant in New York for dinner tomorrow at 7 PM for 4 people, and book a reservation.",
    tools: tools
});
```

### Controlling Function Usage

Control when and how functions are called:

**JavaScript:**

```javascript
// Force the model to use a specific function
const response = await client.responses.create({
    model: "gpt-4o",
    input: "What's the weather in Seattle?",
    tools: functions,
    tool_choice: { type: "function", function: { name: "get_current_weather" } }
});

// Require the model to call at least one function
const response2 = await client.responses.create({
    model: "gpt-4o",
    input: "Help me with weather and restaurants in Boston",
    tools: functions,
    tool_choice: "required"
});

// Prevent function calls
const response3 = await client.responses.create({
    model: "gpt-4o",
    input: "Tell me about the history of Boston",
    tools: functions,
    tool_choice: "none"
});
```

## Structured Parameters and Strict Mode

Use strict mode for reliable parameter parsing:

**JavaScript:**

```javascript
const strictFunction = {
    type: "function",
    function: {
        name: "create_user_profile",
        description: "Create a new user profile",
        parameters: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Full name of the user"
                },
                email: {
                    type: "string",
                    format: "email",
                    description: "Valid email address"
                },
                age: {
                    type: "integer",
                    minimum: 13,
                    maximum: 120,
                    description: "User's age"
                },
                preferences: {
                    type: "object",
                    properties: {
                        newsletter: { type: "boolean" },
                        notifications: { type: "boolean" }
                    },
                    required: ["newsletter", "notifications"],
                    additionalProperties: false
                }
            },
            required: ["name", "email", "age", "preferences"],
            additionalProperties: false
        },
        strict: true
    }
};
```

## Function Calling Patterns

### Database Operations

**JavaScript:**

```javascript
const databaseFunctions = [
    {
        type: "function",
        function: {
            name: "search_products",
            description: "Search for products in the database",
            parameters: {
                type: "object",
                properties: {
                    query: { type: "string", description: "Search query" },
                    category: { type: "string", description: "Product category" },
                    price_min: { type: "number", description: "Minimum price" },
                    price_max: { type: "number", description: "Maximum price" },
                    limit: { type: "integer", default: 10, maximum: 50 }
                },
                required: ["query"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "get_product_details",
            description: "Get detailed information about a specific product",
            parameters: {
                type: "object",
                properties: {
                    product_id: { type: "string", description: "Product ID" }
                },
                required: ["product_id"]
            }
        }
    }
];
```

### API Integration

**JavaScript:**

```javascript
const apiFunctions = [
    {
        type: "function",
        function: {
            name: "send_email",
            description: "Send an email using the email service",
            parameters: {
                type: "object",
                properties: {
                    to: { type: "string", format: "email" },
                    subject: { type: "string" },
                    body: { type: "string" },
                    priority: {
                        type: "string",
                        enum: ["low", "normal", "high"],
                        default: "normal"
                    }
                },
                required: ["to", "subject", "body"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "create_calendar_event",
            description: "Create a new calendar event",
            parameters: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    start_time: { type: "string", format: "date-time" },
                    end_time: { type: "string", format: "date-time" },
                    attendees: {
                        type: "array",
                        items: { type: "string", format: "email" }
                    }
                },
                required: ["title", "start_time", "end_time"]
            }
        }
    }
];
```

## Best Practices

### Function Design

- **Write clear descriptions**: Help the model understand when to use each function
- **Use descriptive parameter names**: Make parameters self-documenting
- **Validate inputs**: Always validate function parameters before execution
- **Handle errors gracefully**: Return meaningful error messages

### Parameter Schema

- **Use appropriate types**: String, number, boolean, array, object
- **Add validation**: Min/max values, enums, format constraints
- **Make required fields explicit**: Use the "required" array
- **Use strict mode** for critical functions requiring exact parameter formats

### Security Considerations

- **Validate all inputs**: Never trust function parameters without validation
- **Implement authorization**: Check if the user can perform the requested action
- **Use allowlists**: Only allow calling approved functions
- **Log function calls**: Monitor for suspicious or unexpected usage

### Error Handling

- **Return structured errors**: Use consistent error response formats
- **Provide helpful messages**: Help the model understand what went wrong
- **Handle timeouts**: Implement appropriate timeout handling
- **Retry logic**: Add retry mechanisms for transient failures

---

# Structured Outputs

Ensure model outputs conform to specific JSON schemas for reliable data extraction and API integration.

Structured Outputs is a feature that ensures the model will always generate responses that adhere to your supplied JSON Schema, so you don't need to worry about the model generating malformed JSON or missing required fields.

## Basic Structured Outputs

Define a JSON schema and get guaranteed conformant responses.

### Simple Schema Example

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Define the schema
const schema = {
    type: "object",
    properties: {
        name: { type: "string" },
        age: { type: "integer" },
        email: { type: "string", format: "email" },
        is_member: { type: "boolean" }
    },
    required: ["name", "age", "email", "is_member"],
    additionalProperties: false
};

const response = await client.responses.create({
    model: "gpt-4o",
    input: "Extract the user information: John Smith, 32 years old, john@example.com, premium member",
    response_format: {
        type: "json_schema",
        json_schema: {
            name: "user_info",
            schema: schema,
            strict: true
        }
    }
});

// The response is guaranteed to match the schema
const userData = JSON.parse(response.output_text);
console.log(userData);
// { name: "John Smith", age: 32, email: "john@example.com", is_member: true }
```

**Python:**

```python
from openai import OpenAI
import json

client = OpenAI()

schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer"},
        "email": {"type": "string", "format": "email"},
        "is_member": {"type": "boolean"}
    },
    "required": ["name", "age", "email", "is_member"],
    "additionalProperties": False
}

response = client.responses.create(
    model="gpt-4o",
    input="Extract the user information: John Smith, 32 years old, john@example.com, premium member",
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "user_info",
            "schema": schema,
            "strict": True
        }
    }
)

user_data = json.loads(response.output_text)
print(user_data)
```

## Complex Schema Examples

### Nested Objects and Arrays

**JavaScript:**

```javascript
const complexSchema = {
    type: "object",
    properties: {
        order_id: { type: "string" },
        customer: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string", format: "email" },
                address: {
                    type: "object",
                    properties: {
                        street: { type: "string" },
                        city: { type: "string" },
                        zip_code: { type: "string" },
                        country: { type: "string" }
                    },
                    required: ["street", "city", "zip_code", "country"],
                    additionalProperties: false
                }
            },
            required: ["name", "email", "address"],
            additionalProperties: false
        },
        items: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    product_id: { type: "string" },
                    name: { type: "string" },
                    quantity: { type: "integer", minimum: 1 },
                    price: { type: "number", minimum: 0 }
                },
                required: ["product_id", "name", "quantity", "price"],
                additionalProperties: false
            }
        },
        total_amount: { type: "number", minimum: 0 },
        order_date: { type: "string", format: "date-time" }
    },
    required: ["order_id", "customer", "items", "total_amount", "order_date"],
    additionalProperties: false
};

const response = await client.responses.create({
    model: "gpt-4o",
    input: `Parse this order information:
    Order #12345 for Sarah Johnson (sarah@email.com)
    Address: 123 Main St, New York, NY 10001, USA
    Items: 2x Laptop ($999 each), 1x Mouse ($25)
    Order placed on 2024-01-15 at 10:30 AM EST`,
    response_format: {
        type: "json_schema",
        json_schema: {
            name: "order_data",
            schema: complexSchema,
            strict: true
        }
    }
});
```

### Enumerated Values

**JavaScript:**

```javascript
const statusSchema = {
    type: "object",
    properties: {
        ticket_id: { type: "string" },
        status: {
            type: "string",
            enum: ["open", "in_progress", "pending_review", "resolved", "closed"]
        },
        priority: {
            type: "string",
            enum: ["low", "medium", "high", "critical"]
        },
        category: {
            type: "string",
            enum: ["bug", "feature_request", "support", "documentation"]
        },
        assigned_to: { type: "string" },
        estimated_hours: { type: "integer", minimum: 0 },
        tags: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true
        }
    },
    required: ["ticket_id", "status", "priority", "category"],
    additionalProperties: false
};
```

## Data Extraction Use Cases

### Contact Information Extraction

**JavaScript:**

```javascript
const contactSchema = {
    type: "object",
    properties: {
        contacts: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    title: { type: "string" },
                    company: { type: "string" },
                    email: { type: "string", format: "email" },
                    phone: { type: "string" },
                    linkedin: { type: "string", format: "uri" }
                },
                required: ["name"],
                additionalProperties: false
            }
        }
    },
    required: ["contacts"],
    additionalProperties: false
};

const response = await client.responses.create({
    model: "gpt-4o",
    input: `Extract contact information from this business card text:

    Dr. Emily Chen
    Senior Data Scientist
    TechCorp Industries
    emily.chen@techcorp.com
    +1 (555) 123-4567
    linkedin.com/in/emilychen
    `,
    response_format: {
        type: "json_schema",
        json_schema: {
            name: "contact_extraction",
            schema: contactSchema,
            strict: true
        }
    }
});
```

### Document Analysis

**JavaScript:**

```javascript
const documentSchema = {
    type: "object",
    properties: {
        document_type: {
            type: "string",
            enum: ["invoice", "receipt", "contract", "report", "letter", "other"]
        },
        key_information: {
            type: "object",
            properties: {
                date: { type: "string", format: "date" },
                amount: { type: "number" },
                currency: { type: "string" },
                parties_involved: {
                    type: "array",
                    items: { type: "string" }
                },
                summary: { type: "string" }
            },
            additionalProperties: false
        },
        action_items: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    task: { type: "string" },
                    due_date: { type: "string", format: "date" },
                    responsible_party: { type: "string" },
                    priority: {
                        type: "string",
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["task"],
                additionalProperties: false
            }
        }
    },
    required: ["document_type", "key_information"],
    additionalProperties: false
};
```

## Function Calling with Structured Outputs

Combine function calling with structured outputs for reliable parameter extraction.

**JavaScript:**

```javascript
const structuredFunction = {
    type: "function",
    function: {
        name: "create_calendar_event",
        description: "Create a calendar event with structured parameters",
        parameters: {
            type: "object",
            properties: {
                title: { type: "string" },
                description: { type: "string" },
                start_time: { type: "string", format: "date-time" },
                end_time: { type: "string", format: "date-time" },
                attendees: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            email: { type: "string", format: "email" },
                            name: { type: "string" },
                            required: { type: "boolean" }
                        },
                        required: ["email", "name"],
                        additionalProperties: false
                    }
                },
                location: { type: "string" },
                reminder_minutes: {
                    type: "integer",
                    minimum: 0,
                    maximum: 10080  // max 1 week
                }
            },
            required: ["title", "start_time", "end_time"],
            additionalProperties: false
        },
        strict: true
    }
};

const response = await client.responses.create({
    model: "gpt-4o",
    input: "Schedule a team meeting for next Monday at 2 PM for 1 hour. Invite john@company.com and sarah@company.com. Set reminder for 15 minutes before.",
    tools: [structuredFunction]
});
```

## Validation and Error Handling

### Schema Validation

**JavaScript:**

```javascript
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

function validateStructuredOutput(data, schema) {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        console.error("Validation errors:", validate.errors);
        return false;
    }

    return true;
}

// Use with API response
const response = await client.responses.create({
    model: "gpt-4o",
    input: "Extract user data...",
    response_format: {
        type: "json_schema",
        json_schema: {
            name: "user_data",
            schema: userSchema,
            strict: true
        }
    }
});

const parsed = JSON.parse(response.output_text);
if (validateStructuredOutput(parsed, userSchema)) {
    console.log("Valid structured output:", parsed);
} else {
    console.error("Invalid output received");
}
```

## Best Practices

### Schema Design

- **Keep schemas focused**: Design schemas for specific use cases
- **Use appropriate types**: Choose the most restrictive type that fits your needs
- **Add format validation**: Use format specifiers for emails, dates, URLs
- **Set constraints**: Use minimum/maximum, enums, and patterns where appropriate

### Performance Optimization

- **Use strict mode**: Enables better optimization and guarantees
- **Avoid deep nesting**: Keep object hierarchies reasonable
- **Limit array sizes**: Set maxItems where appropriate
- **Cache schemas**: Reuse schema definitions across requests

### Error Prevention

- **Test with edge cases**: Validate schemas with unusual inputs
- **Handle parsing errors**: Always wrap JSON.parse in try-catch
- **Validate outputs**: Use schema validation libraries for extra safety
- **Provide clear examples**: Include example outputs in your prompts

### Common Patterns

- **Data extraction**: Pull structured data from unstructured text
- **API response formatting**: Ensure consistent API response formats
- **Configuration parsing**: Extract settings and preferences
- **Report generation**: Structure analysis results consistently

---

# Model Selection

Learn how to choose the right OpenAI model for your specific use case and requirements.

OpenAI offers various models optimized for different tasks, capabilities, and cost considerations. Understanding the strengths and use cases of each model helps you make informed decisions for your applications.

## Model Categories

### Reasoning Models

These models use enhanced reasoning capabilities and are ideal for complex problem-solving tasks.

| Model       | Best For                                              | Key Features                                     |
| ----------- | ----------------------------------------------------- | ------------------------------------------------ |
| **o3**      | Complex reasoning, research, advanced problem-solving | Highest reasoning capability, extensive planning |
| **o4-mini** | Cost-effective reasoning tasks                        | Balanced reasoning and cost efficiency           |
| **o1**      | Deep analysis, mathematical problems, coding          | Strong logical reasoning                         |
| **o1-mini** | Lighter reasoning tasks                               | Faster reasoning at lower cost                   |

### Chat Models

General-purpose models optimized for conversational interactions and text generation.

| Model            | Best For                                      | Key Features                                 |
| ---------------- | --------------------------------------------- | -------------------------------------------- |
| **GPT-5**        | Advanced reasoning, complex tasks, multimodal | Latest generation with enhanced capabilities |
| **GPT-5-mini**   | Cost-effective general use                    | Balanced performance and cost                |
| **GPT-5-nano**   | High-throughput, simple tasks                 | Fastest, most cost-effective                 |
| **GPT-4.1**      | Complex tasks, long context                   | High capability, extensive context           |
| **GPT-4.1-mini** | Everyday tasks, faster responses              | Good balance of speed and capability         |
| **GPT-4o**       | Multimodal tasks, vision, audio               | Native multimodal processing                 |
| **GPT-4o-mini**  | Lightweight multimodal tasks                  | Cost-effective multimodal                    |

### Specialized Models

| Model        | Best For                        | Capabilities                      |
| ------------ | ------------------------------- | --------------------------------- |
| **DALL-E 3** | High-quality image generation   | Advanced image creation from text |
| **DALL-E 2** | Cost-effective image generation | Good quality image generation     |
| **Whisper**  | Audio transcription             | Speech-to-text conversion         |
| **TTS**      | Text-to-speech                  | Natural voice synthesis           |

## Model Selection Guide

### For Text Generation

**Simple Tasks:**

- **GPT-5-nano**: Quick responses, simple Q&A, basic content
- **GPT-4o-mini**: Lightweight tasks with multimodal needs

**Complex Tasks:**

- **GPT-5**: Advanced reasoning, complex analysis, coding
- **GPT-4.1**: Long documents, detailed analysis
- **o3**: Research, mathematical proofs, complex reasoning

**Balanced Needs:**

- **GPT-5-mini**: General purpose with good capability/cost ratio
- **GPT-4.1-mini**: Faster responses for moderate complexity

### For Multimodal Applications

**Vision Tasks:**

- **GPT-4o**: Image analysis, OCR, visual understanding
- **GPT-4o-mini**: Cost-effective vision tasks

**Audio Tasks:**

- **GPT-4o**: Audio analysis and understanding
- **Whisper**: Dedicated transcription
- **TTS models**: Voice synthesis

### For Reasoning and Analysis

**Mathematical/Scientific:**

- **o3**: Advanced mathematics, scientific reasoning
- **o1**: Complex calculations, proofs
- **GPT-5**: General analytical tasks

**Code and Programming:**

- **GPT-5**: Advanced coding, architecture design
- **o3**: Complex algorithms, debugging
- **GPT-4.1**: Code review, refactoring

## Cost Optimization Strategies

### Model Selection for Budget

**High Volume, Simple Tasks:**

```javascript
// Use nano for high-throughput, simple tasks
const response = await client.responses.create({
    model: "gpt-5-nano",
    text: { verbosity: "low" },
    input: "Classify this email as spam or not spam: ..."
});
```

**Balanced Performance:**

```javascript
// Use mini models for good balance
const response = await client.responses.create({
    model: "gpt-5-mini",
    reasoning: { effort: "low" },
    input: "Summarize this article: ..."
});
```

**Complex Analysis:**

```javascript
// Use full models only when needed
const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "high" },
    input: "Analyze this complex business scenario: ..."
});
```

### Batch Processing

For non-time-sensitive tasks, use batch processing for 50% cost savings:

```javascript
const batch = await client.batches.create({
    input_file_id: "file-abc123",
    endpoint: "/v1/responses",
    completion_window: "24h"
});

console.log("Batch ID:", batch.id);
```

## Performance Considerations

### Latency Optimization

**Fastest Response:**

```javascript
const response = await client.responses.create({
    model: "gpt-5-nano",
    text: { verbosity: "low" },
    reasoning: { effort: "minimal" },
    input: "Quick question: ..."
});
```

**Balanced Speed/Quality:**

```javascript
const response = await client.responses.create({
    model: "gpt-5-mini",
    reasoning: { effort: "low" },
    input: "Moderate complexity task: ..."
});
```

### Quality Optimization

**Maximum Quality:**

```javascript
const response = await client.responses.create({
    model: "o3",
    reasoning: { effort: "high" },
    input: "Complex reasoning task: ..."
});
```

**Balanced Quality/Cost:**

```javascript
const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "medium" },
    input: "Standard analysis task: ..."
});
```

## Context and Token Limits

### Context Windows

| Model   | Context Window | Best For                          |
| ------- | -------------- | --------------------------------- |
| GPT-5   | 128K tokens    | Long documents, extensive context |
| GPT-4.1 | 128K tokens    | Large document analysis           |
| GPT-4o  | 128K tokens    | Multimodal content with context   |
| o3      | Variable       | Complex reasoning with context    |

### Managing Long Context

**For very long documents:**

```javascript
// Use models with large context windows
const response = await client.responses.create({
    model: "gpt-4.1",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_file",
                    file_id: "file-longdocument"
                },
                {
                    type: "input_text",
                    text: "Analyze this entire document and provide insights."
                }
            ]
        }
    ]
});
```

## API Compatibility

### Responses API (Recommended)

All current models work with the Responses API:

```javascript
const response = await client.responses.create({
    model: "gpt-5", // Any current model
    input: "Your prompt here"
});
```

### Chat Completions API (Legacy)

For compatibility with existing code:

```javascript
const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
        { role: "user", content: "Your message here" }
    ]
});
```

## Model Updates and Versioning

### Pinning Model Versions

For production stability, pin to specific model versions:

```javascript
const response = await client.responses.create({
    model: "gpt-5-2025-08-07", // Specific version
    input: "Your prompt here"
});
```

### Model Snapshots

| Model   | Latest Snapshot    | Recommended Use         |
| ------- | ------------------ | ----------------------- |
| gpt-5   | gpt-5-2025-08-07   | Production applications |
| gpt-4.1 | gpt-4.1-2024-11-20 | Stable deployments      |
| gpt-4o  | gpt-4o-2024-11-20  | Multimodal applications |

## Migration Recommendations

### From Legacy Models

**GPT-3.5 → GPT-5-nano:**

```javascript
// Old
const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello" }]
});

// New
const response = await client.responses.create({
    model: "gpt-5-nano",
    input: "Hello"
});
```

**GPT-4 → GPT-5:**

```javascript
// Old
const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Complex task" }]
});

// New
const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "medium" },
    input: "Complex task"
});
```

## Best Practices

### Model Selection Checklist

1. **Define your use case**: Simple, complex, multimodal, reasoning?
2. **Consider cost constraints**: High volume or budget-sensitive?
3. **Evaluate latency requirements**: Real-time or batch processing?
4. **Assess quality needs**: Good enough or highest quality?
5. **Check context requirements**: Short prompts or long documents?

### Testing and Evaluation

```javascript
// Test multiple models for your use case
const models = ["gpt-5-nano", "gpt-5-mini", "gpt-5"];
const results = [];

for (const model of models) {
    const response = await client.responses.create({
        model: model,
        input: "Your test prompt here"
    });

    results.push({
        model,
        output: response.output_text,
        latency: response.usage.total_time_ms,
        cost: calculateCost(response.usage)
    });
}

// Compare results to choose optimal model
console.table(results);
```

---

# Embeddings

Learn how to use embeddings to represent text as vectors for semantic search, clustering, and similarity analysis.

Embeddings are numerical representations of text that capture semantic meaning, enabling you to perform tasks like semantic search, clustering, classification, and similarity comparisons. OpenAI's embedding models convert text into high-dimensional vectors that can be used in machine learning applications.

## Basic Embeddings Usage

### Generate Embeddings for Text

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: "The quick brown fox jumps over the lazy dog",
    encoding_format: "float"
});

const embedding = response.data[0].embedding;
console.log("Embedding dimensions:", embedding.length);
console.log("First 10 dimensions:", embedding.slice(0, 10));
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

response = client.embeddings.create(
    model="text-embedding-3-large",
    input="The quick brown fox jumps over the lazy dog",
    encoding_format="float"
)

embedding = response.data[0].embedding
print(f"Embedding dimensions: {len(embedding)}")
print(f"First 10 dimensions: {embedding[:10]}")
```

### Batch Embeddings

Generate embeddings for multiple texts at once:

**JavaScript:**

```javascript
const texts = [
    "OpenAI develops artificial intelligence systems",
    "Machine learning is a subset of AI",
    "Natural language processing enables computers to understand text",
    "Deep learning uses neural networks with multiple layers"
];

const response = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: texts,
    encoding_format: "float"
});

const embeddings = response.data.map(item => item.embedding);
console.log(`Generated ${embeddings.length} embeddings`);
```

**Python:**

```python
texts = [
    "OpenAI develops artificial intelligence systems",
    "Machine learning is a subset of AI",
    "Natural language processing enables computers to understand text",
    "Deep learning uses neural networks with multiple layers"
]

response = client.embeddings.create(
    model="text-embedding-3-large",
    input=texts,
    encoding_format="float"
)

embeddings = [item.embedding for item in response.data]
print(f"Generated {len(embeddings)} embeddings")
```

## Embedding Models

### Available Models

| Model                      | Dimensions | Max Input Tokens | Use Case                             |
| -------------------------- | ---------- | ---------------- | ------------------------------------ |
| **text-embedding-3-large** | 3072       | 8192             | Highest accuracy, complex tasks      |
| **text-embedding-3-small** | 1536       | 8192             | Good balance of cost and performance |
| **text-embedding-ada-002** | 1536       | 8192             | Legacy model, lower cost             |

### Dimensionality Reduction

Reduce embedding dimensions for storage efficiency:

**JavaScript:**

```javascript
const response = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: "Sample text for embedding",
    encoding_format: "float",
    dimensions: 1536 // Reduce from 3072 to 1536
});

const reducedEmbedding = response.data[0].embedding;
console.log("Reduced dimensions:", reducedEmbedding.length);
```

## Semantic Search Implementation

### Basic Semantic Search

**JavaScript:**

```javascript
// Helper function to calculate cosine similarity
function cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

// Document corpus
const documents = [
    "Python is a high-level programming language",
    "JavaScript is used for web development",
    "Machine learning algorithms require data",
    "Natural language processing analyzes text",
    "Databases store and retrieve information"
];

// Generate embeddings for all documents
const docResponse = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: documents
});

const docEmbeddings = docResponse.data.map(item => item.embedding);

// Search function
async function semanticSearch(query, topK = 3) {
    // Generate embedding for query
    const queryResponse = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: query
    });

    const queryEmbedding = queryResponse.data[0].embedding;

    // Calculate similarities
    const similarities = docEmbeddings.map((docEmb, index) => ({
        document: documents[index],
        similarity: cosineSimilarity(queryEmbedding, docEmb),
        index
    }));

    // Sort by similarity and return top results
    return similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
}

// Perform search
const results = await semanticSearch("programming languages", 2);
console.log("Search results:", results);
```

**Python:**

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Document corpus
documents = [
    "Python is a high-level programming language",
    "JavaScript is used for web development",
    "Machine learning algorithms require data",
    "Natural language processing analyzes text",
    "Databases store and retrieve information"
]

# Generate embeddings for all documents
doc_response = client.embeddings.create(
    model="text-embedding-3-small",
    input=documents
)

doc_embeddings = np.array([item.embedding for item in doc_response.data])

def semantic_search(query, top_k=3):
    # Generate embedding for query
    query_response = client.embeddings.create(
        model="text-embedding-3-small",
        input=query
    )

    query_embedding = np.array([query_response.data[0].embedding])

    # Calculate similarities
    similarities = cosine_similarity(query_embedding, doc_embeddings)[0]

    # Get top results
    top_indices = similarities.argsort()[-top_k:][::-1]

    results = []
    for idx in top_indices:
        results.append({
            'document': documents[idx],
            'similarity': similarities[idx],
            'index': idx
        })

    return results

# Perform search
results = semantic_search("programming languages", 2)
for result in results:
    print(f"Score: {result['similarity']:.4f} - {result['document']}")
```

## Advanced Use Cases

### Text Clustering

Group similar documents using embeddings:

**Python:**

```python
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

# Generate embeddings for a larger document set
documents = [
    # Technology documents
    "Artificial intelligence and machine learning",
    "Deep neural networks and algorithms",
    "Software development with Python",
    "Web development using JavaScript",

    # Food documents
    "Italian pasta recipes and cooking",
    "Healthy meal planning and nutrition",
    "Baking bread and desserts",
    "International cuisine and flavors",

    # Sports documents
    "Football strategies and tactics",
    "Basketball training and skills",
    "Olympic swimming competitions",
    "Tennis tournaments and rankings"
]

# Get embeddings
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=documents
)

embeddings = np.array([item.embedding for item in response.data])

# Perform clustering
kmeans = KMeans(n_clusters=3, random_state=42)
cluster_labels = kmeans.fit_predict(embeddings)

# Visualize clusters using PCA
pca = PCA(n_components=2)
embeddings_2d = pca.fit_transform(embeddings)

plt.figure(figsize=(12, 8))
colors = ['red', 'blue', 'green']
for i, doc in enumerate(documents):
    plt.scatter(embeddings_2d[i, 0], embeddings_2d[i, 1],
                c=colors[cluster_labels[i]], s=100)
    plt.annotate(doc[:30] + "...", (embeddings_2d[i, 0], embeddings_2d[i, 1]),
                 xytext=(5, 5), textcoords='offset points', fontsize=8)

plt.title("Document Clustering using Embeddings")
plt.xlabel("PCA Component 1")
plt.ylabel("PCA Component 2")
plt.show()

# Print clusters
for cluster_id in range(3):
    print(f"\nCluster {cluster_id}:")
    for i, doc in enumerate(documents):
        if cluster_labels[i] == cluster_id:
            print(f"  - {doc}")
```

### Classification with Embeddings

Use embeddings as features for text classification:

**Python:**

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Sample training data
training_texts = [
    ("This movie was fantastic and entertaining", "positive"),
    ("The film was boring and poorly made", "negative"),
    ("Amazing story with great acting", "positive"),
    ("Waste of time, terrible plot", "negative"),
    ("Loved every minute of it", "positive"),
    ("Could not wait for it to end", "negative"),
    ("Brilliant cinematography and direction", "positive"),
    ("Poor dialogue and weak characters", "negative")
]

texts, labels = zip(*training_texts)

# Generate embeddings
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=list(texts)
)

X = np.array([item.embedding for item in response.data])
y = np.array(labels)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train classifier
classifier = LogisticRegression()
classifier.fit(X_train, y_train)

# Make predictions
predictions = classifier.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy: {accuracy:.4f}")
print("\nClassification Report:")
print(classification_report(y_test, predictions))

# Test on new examples
new_texts = [
    "The movie was absolutely wonderful",
    "I hated this film completely"
]

new_response = client.embeddings.create(
    model="text-embedding-3-small",
    input=new_texts
)

new_embeddings = np.array([item.embedding for item in new_response.data])
new_predictions = classifier.predict(new_embeddings)

for text, prediction in zip(new_texts, new_predictions):
    print(f"'{text}' -> {prediction}")
```

### Recommendation System

Build content recommendations using embeddings:

**JavaScript:**

```javascript
// Product/content database
const products = [
    { id: 1, name: "Wireless Headphones", description: "High-quality Bluetooth headphones with noise cancellation" },
    { id: 2, name: "Smart Watch", description: "Fitness tracking watch with heart rate monitor" },
    { id: 3, name: "Laptop Stand", description: "Ergonomic adjustable laptop stand for better posture" },
    { id: 4, name: "USB-C Hub", description: "Multi-port USB-C hub with HDMI and ethernet" },
    { id: 5, name: "Wireless Mouse", description: "Ergonomic wireless mouse with precision tracking" }
];

// Generate embeddings for all products
const productDescriptions = products.map(p => p.description);
const productResponse = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: productDescriptions
});

const productEmbeddings = productResponse.data.map(item => item.embedding);

// Recommendation function
async function getRecommendations(userQuery, topK = 3) {
    // Generate embedding for user query
    const queryResponse = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: userQuery
    });

    const queryEmbedding = queryResponse.data[0].embedding;

    // Calculate similarities with all products
    const recommendations = products.map((product, index) => ({
        ...product,
        similarity: cosineSimilarity(queryEmbedding, productEmbeddings[index])
    }));

    // Sort by similarity and return top recommendations
    return recommendations
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
}

// Get recommendations
const recs = await getRecommendations("I need something for my home office setup", 3);
console.log("Recommendations:");
recs.forEach(rec => {
    console.log(`${rec.name} (${(rec.similarity * 100).toFixed(1)}% match)`);
    console.log(`  ${rec.description}\n`);
});
```

## Best Practices

### Performance Optimization

**Batch Processing:**

```javascript
// Process multiple texts efficiently
const batchSize = 100;
const allTexts = [...]; // Your large array of texts

const allEmbeddings = [];
for (let i = 0; i < allTexts.length; i += batchSize) {
    const batch = allTexts.slice(i, i + batchSize);
    const response = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: batch
    });

    allEmbeddings.push(...response.data.map(item => item.embedding));

    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
}
```

**Caching Embeddings:**

```javascript
const embeddingCache = new Map();

async function getCachedEmbedding(text) {
    if (embeddingCache.has(text)) {
        return embeddingCache.get(text);
    }

    const response = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: text
    });

    const embedding = response.data[0].embedding;
    embeddingCache.set(text, embedding);
    return embedding;
}
```

### Storage and Indexing

**Vector Database Integration:**

```javascript
// Example with Pinecone (pseudo-code)
import { PineconeClient } from '@pinecone-database/pinecone';

const pinecone = new PineconeClient();
await pinecone.init({ apiKey: 'your-api-key' });

const index = pinecone.Index('your-index');

// Store embeddings
await index.upsert({
    upsertRequest: {
        vectors: [
            {
                id: 'doc-1',
                values: embedding,
                metadata: { text: 'original text', category: 'tech' }
            }
        ]
    }
});

// Search similar vectors
const queryResponse = await index.query({
    queryRequest: {
        vector: queryEmbedding,
        topK: 10,
        includeMetadata: true
    }
});
```

### Cost Optimization

**Choose Appropriate Models:**

- Use `text-embedding-3-small` for cost-effective applications
- Use `text-embedding-3-large` when accuracy is critical
- Reduce dimensions when full precision isn't needed

**Batch Requests:**

- Process multiple texts in single API calls
- Cache frequently used embeddings
- Use async processing for large datasets

---

# Pricing and Usage

Understand OpenAI API pricing, manage costs, and optimize usage for your applications.

OpenAI pricing is based on token usage across different models and services. Understanding the pricing structure helps you optimize costs and choose the right models for your budget and performance requirements.

## Token-Based Pricing

### Text Models - Standard Tier

Prices per 1M tokens:

| Model            | Input Tokens | Cached Input | Output Tokens |
| ---------------- | ------------ | ------------ | ------------- |
| **GPT-5**        | $1.25        | $0.125       | $10.00        |
| **GPT-5-mini**   | $0.25        | $0.025       | $2.00         |
| **GPT-5-nano**   | $0.05        | $0.005       | $0.40         |
| **GPT-4.1**      | $2.00        | $0.50        | $8.00         |
| **GPT-4.1-mini** | $0.40        | $0.10        | $1.60         |
| **GPT-4o**       | $2.50        | $1.25        | $10.00        |
| **GPT-4o-mini**  | $0.15        | $0.075       | $0.60         |

### Reasoning Models

| Model       | Input Tokens | Cached Input | Output Tokens |
| ----------- | ------------ | ------------ | ------------- |
| **o3**      | $2.00        | $0.50        | $8.00         |
| **o4-mini** | $1.10        | $0.275       | $4.40         |
| **o1**      | $15.00       | $7.50        | $60.00        |
| **o1-mini** | $1.10        | $0.55        | $4.40         |

### Batch Processing (50% Discount)

Perfect for non-time-sensitive tasks:

| Model          | Input Tokens | Cached Input | Output Tokens |
| -------------- | ------------ | ------------ | ------------- |
| **GPT-5**      | $0.625       | $0.0625      | $5.00         |
| **GPT-5-mini** | $0.125       | $0.0125      | $1.00         |
| **GPT-5-nano** | $0.025       | $0.0025      | $0.20         |

## Cost Calculation Examples

### Basic Text Generation

**JavaScript:**

```javascript
// Example cost calculation for a simple request
const response = await client.responses.create({
    model: "gpt-5-mini",
    input: "Write a 500-word article about renewable energy."
});

// Typical usage might be:
// Input: ~50 tokens ($0.025/1M * 50/1M = $0.00000125)
// Output: ~650 tokens ($2.00/1M * 650/1M = $0.0013)
// Total: ~$0.00130125

console.log("Usage:", response.usage);
console.log("Input tokens:", response.usage.input_tokens);
console.log("Output tokens:", response.usage.output_tokens);
```

### Cost Optimization Strategies

**Choose the Right Model:**

```javascript
// For simple tasks, use nano
const simpleTask = await client.responses.create({
    model: "gpt-5-nano", // $0.05 input, $0.40 output per 1M tokens
    text: { verbosity: "low" },
    input: "Classify this email: ..."
});

// For complex tasks, use appropriate reasoning
const complexTask = await client.responses.create({
    model: "gpt-5", // $1.25 input, $10.00 output per 1M tokens
    reasoning: { effort: "medium" },
    input: "Analyze this complex business scenario: ..."
});
```

## Built-in Tools Pricing

| Tool                      | Cost                                 |
| ------------------------- | ------------------------------------ |
| **Code Interpreter**      | $0.03 per container                  |
| **File Search (storage)** | $0.10 per GB per day (1GB free)      |
| **File Search (queries)** | $2.50 per 1k calls                   |
| **Web Search**            | $10.00 per 1k calls + content tokens |

### Tool Cost Examples

**Code Interpreter:**

```javascript
const response = await client.responses.create({
    model: "gpt-5",
    tools: [{
        type: "code_interpreter",
        container: { type: "auto" }
    }],
    input: "Analyze this data and create a visualization: [data]"
});

// Cost = model tokens + $0.03 container fee
```

**Web Search:**

```javascript
const response = await client.responses.create({
    model: "gpt-5",
    tools: [{ type: "web_search" }],
    input: "What are the latest developments in AI?"
});

// Cost = model tokens + $0.01 per search + tokens for retrieved content
```

## Image and Audio Services

### Image Generation

| Model        | Quality  | Resolution | Price |
| ------------ | -------- | ---------- | ----- |
| **DALL-E 3** | Standard | 1024×1024  | $0.04 |
| **DALL-E 3** | Standard | 1024×1536  | $0.08 |
| **DALL-E 3** | HD       | 1024×1024  | $0.08 |
| **DALL-E 3** | HD       | 1024×1536  | $0.12 |

### Audio Services

| Service               | Model    | Price                    |
| --------------------- | -------- | ------------------------ |
| **Transcription**     | Whisper  | $0.006 per minute        |
| **Text-to-Speech**    | TTS-1    | $15.00 per 1M characters |
| **Text-to-Speech HD** | TTS-1-HD | $30.00 per 1M characters |

### Embeddings

| Model                      | Price per 1M tokens | Batch Price |
| -------------------------- | ------------------- | ----------- |
| **text-embedding-3-small** | $0.02               | $0.01       |
| **text-embedding-3-large** | $0.13               | $0.065      |

## Usage Tracking and Monitoring

### Track Usage in Code

**JavaScript:**

```javascript
let totalCost = 0;
let totalTokens = 0;

async function makeTrackedRequest(input, model = "gpt-5-mini") {
    const response = await client.responses.create({
        model: model,
        input: input
    });

    // Calculate cost (example for gpt-5-mini)
    const inputCost = (response.usage.input_tokens / 1_000_000) * 0.25;
    const outputCost = (response.usage.output_tokens / 1_000_000) * 2.00;
    const requestCost = inputCost + outputCost;

    totalCost += requestCost;
    totalTokens += response.usage.total_tokens;

    console.log(`Request cost: $${requestCost.toFixed(6)}`);
    console.log(`Total cost: $${totalCost.toFixed(6)}`);
    console.log(`Total tokens: ${totalTokens}`);

    return response;
}

// Usage
const response = await makeTrackedRequest("Explain quantum computing");
```

### Set Usage Limits

**Python:**

```python
import openai
from datetime import datetime

class UsageTracker:
    def __init__(self, daily_limit=10.0):  # $10 daily limit
        self.daily_limit = daily_limit
        self.daily_usage = 0.0
        self.current_date = datetime.now().date()

    def reset_if_new_day(self):
        today = datetime.now().date()
        if today != self.current_date:
            self.daily_usage = 0.0
            self.current_date = today

    def check_and_update_usage(self, cost):
        self.reset_if_new_day()

        if self.daily_usage + cost > self.daily_limit:
            raise Exception(f"Daily usage limit exceeded! Current: ${self.daily_usage:.4f}, Limit: ${self.daily_limit}")

        self.daily_usage += cost
        return True

# Usage
tracker = UsageTracker(daily_limit=20.0)

def make_request_with_limit(input_text, model="gpt-5-mini"):
    # Estimate cost before making request
    estimated_cost = estimate_cost(input_text, model)
    tracker.check_and_update_usage(estimated_cost)

    response = client.responses.create(
        model=model,
        input=input_text
    )

    # Update with actual cost
    actual_cost = calculate_actual_cost(response.usage, model)
    tracker.daily_usage += (actual_cost - estimated_cost)

    return response
```

## Cost Optimization Best Practices

### Model Selection Strategy

**Progressive Complexity:**

```javascript
async function smartModelSelection(input, complexity = "auto") {
    // Estimate complexity
    const wordCount = input.split(" ").length;
    const hasComplexKeywords = /analyze|complex|detailed|comprehensive/.test(input.toLowerCase());

    let model;
    if (complexity === "auto") {
        if (wordCount < 20 && !hasComplexKeywords) {
            model = "gpt-5-nano"; // Cheapest for simple tasks
        } else if (wordCount < 100 && !hasComplexKeywords) {
            model = "gpt-5-mini"; // Balanced
        } else {
            model = "gpt-5"; // Full capability
        }
    } else {
        model = complexity;
    }

    return client.responses.create({
        model: model,
        input: input,
        reasoning: { effort: wordCount > 100 ? "medium" : "low" }
    });
}

// Usage examples
await smartModelSelection("What is 2+2?"); // Uses nano
await smartModelSelection("Summarize this article: [long text]"); // Uses mini
await smartModelSelection("Analyze complex business scenario..."); // Uses gpt-5
```

### Caching Strategy

**JavaScript:**

```javascript
class ResponseCache {
    constructor(maxAge = 3600000) { // 1 hour default
        this.cache = new Map();
        this.maxAge = maxAge;
    }

    generateKey(input, model, options = {}) {
        return JSON.stringify({ input, model, options });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.maxAge) {
            this.cache.delete(key);
            return null;
        }

        return item.response;
    }

    set(key, response) {
        this.cache.set(key, {
            response,
            timestamp: Date.now()
        });
    }
}

const responseCache = new ResponseCache();

async function cachedRequest(input, model = "gpt-5-mini") {
    const cacheKey = responseCache.generateKey(input, model);

    // Check cache first
    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse) {
        console.log("Using cached response - $0.00 cost");
        return cachedResponse;
    }

    // Make API request
    const response = await client.responses.create({
        model: model,
        input: input
    });

    // Cache the response
    responseCache.set(cacheKey, response);

    return response;
}
```

### Batch Processing for Cost Savings

**JavaScript:**

```javascript
async function batchProcess(tasks) {
    // Prepare batch file
    const batchRequests = tasks.map((task, index) => ({
        custom_id: `request-${index}`,
        method: "POST",
        url: "/v1/responses",
        body: {
            model: "gpt-5-mini",
            input: task.input
        }
    }));

    // Create batch file
    const batchFile = await client.files.create({
        file: new Blob([batchRequests.map(req => JSON.stringify(req)).join('\n')]),
        purpose: "batch"
    });

    // Create batch job (50% discount)
    const batch = await client.batches.create({
        input_file_id: batchFile.id,
        endpoint: "/v1/responses",
        completion_window: "24h"
    });

    console.log(`Batch created: ${batch.id}`);
    console.log("Expected 50% cost savings compared to real-time requests");

    return batch;
}

// Usage for non-urgent tasks
const tasks = [
    { input: "Summarize this article: ..." },
    { input: "Translate this text: ..." },
    { input: "Generate tags for: ..." }
];

const batch = await batchProcess(tasks);
```

## Billing and Account Management

### Understanding Your Bill

**Key metrics to track:**

- **Token usage** by model
- **API call frequency**
- **Tool usage** (code interpreter, web search, etc.)
- **Storage costs** (file search, vector stores)
- **Batch vs real-time usage**

### Cost Alerts and Budgets

Set up monitoring in your application:

**Python:**

```python
def check_monthly_budget(current_usage, monthly_budget=100.0):
    usage_percentage = (current_usage / monthly_budget) * 100

    if usage_percentage >= 90:
        send_alert(f"WARNING: 90% of monthly budget used (${current_usage:.2f}/${monthly_budget:.2f})")
    elif usage_percentage >= 75:
        send_alert(f"NOTICE: 75% of monthly budget used (${current_usage:.2f}/${monthly_budget:.2f})")

    return usage_percentage

# Implement usage tracking
monthly_usage = get_current_month_usage()
budget_status = check_monthly_budget(monthly_usage, 150.0)
```

## Enterprise and Volume Discounts

For high-volume usage:

- **Enterprise pricing** available for large deployments
- **Volume discounts** for consistent high usage
- **Custom pricing** for specific use cases
- **Priority support** and SLA options

Contact OpenAI sales for enterprise pricing discussions when you reach consistent monthly usage above $1,000.

---

# Migration Guidance

Learn how to migrate from legacy APIs and models to current recommended approaches.

As OpenAI continuously improves its API and model offerings, it's important to stay current with the latest recommendations. This guide helps you migrate from older patterns to current best practices.

## Chat Completions to Responses API

The Responses API is now the recommended approach for all new projects. It provides better support for reasoning models, improved streaming, and more flexible input/output formats.

### Basic Migration

**Old (Chat Completions):**

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
        { role: "user", content: "Explain quantum computing" }
    ]
});

console.log(response.choices[0].message.content);
```

**New (Responses API):**

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-4o",
    input: "Explain quantum computing"
});

console.log(response.output_text);
```

### System Messages Migration

**Old:**

```javascript
const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
        { role: "system", content: "You are a helpful coding assistant." },
        { role: "user", content: "Write a Python function to sort a list" }
    ]
});
```

**New:**

```javascript
const response = await client.responses.create({
    model: "gpt-4o",
    instructions: "You are a helpful coding assistant.",
    input: "Write a Python function to sort a list"
});

// Or using message roles
const response = await client.responses.create({
    model: "gpt-4o",
    input: [
        { role: "developer", content: "You are a helpful coding assistant." },
        { role: "user", content: "Write a Python function to sort a list" }
    ]
});
```

### Conversation History Migration

**Old:**

```javascript
const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "What's the weather like?" },
    { role: "assistant", content: "I'd need your location to check the weather." },
    { role: "user", content: "I'm in San Francisco" }
];

const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: messages
});
```

**New:**

```javascript
// First turn
const firstResponse = await client.responses.create({
    model: "gpt-4o",
    instructions: "You are a helpful assistant.",
    input: "What's the weather like?"
});

// Continue conversation
const secondResponse = await client.responses.create({
    model: "gpt-4o",
    previous_response_id: firstResponse.id,
    input: "I'm in San Francisco"
});
```

## Function Calling Migration

Function calling syntax is largely compatible, but the Responses API provides enhanced capabilities.

**Old:**

```javascript
const functions = [{
    name: "get_weather",
    description: "Get current weather",
    parameters: {
        type: "object",
        properties: {
            location: { type: "string" }
        }
    }
}];

const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "Weather in Boston?" }],
    functions: functions
});
```

**New:**

```javascript
const tools = [{
    type: "function",
    function: {
        name: "get_weather",
        description: "Get current weather",
        parameters: {
            type: "object",
            properties: {
                location: { type: "string" }
            }
        }
    }
}];

const response = await client.responses.create({
    model: "gpt-4o",
    input: "Weather in Boston?",
    tools: tools
});
```

## Model Migration Paths

### From GPT-3.5 to Modern Models

**GPT-3.5-turbo → GPT-5-nano:**

```javascript
// Old
const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Summarize this text" }]
});

// New - similar capability, better performance
const response = await client.responses.create({
    model: "gpt-5-nano",
    text: { verbosity: "low" },
    input: "Summarize this text"
});
```

### From GPT-4 to GPT-5

**GPT-4 → GPT-5:**

```javascript
// Old
const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Complex analysis task" }],
    temperature: 0.7
});

// New - better reasoning, no temperature parameter
const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "medium" },
    input: "Complex analysis task"
});
```

### Reasoning Model Migration

**From text models to reasoning models:**

```javascript
// For complex reasoning tasks, migrate to o3 or GPT-5
const response = await client.responses.create({
    model: "o3", // or "gpt-5"
    reasoning: { effort: "high" },
    input: "Solve this complex mathematical proof: ..."
});
```

## Parameter Changes and New Features

### Temperature and Top-P Replacement

**Old parameters (not supported in GPT-5):**

```javascript
// These parameters don't work with GPT-5
const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [...],
    temperature: 0.7,
    top_p: 0.9
});
```

**New control mechanisms:**

```javascript
const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "medium" }, // Controls reasoning depth
    text: { verbosity: "medium" },   // Controls output length
    input: "Your prompt here"
});
```

### Streaming Migration

**Old streaming:**

```javascript
const stream = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "Tell me a story" }],
    stream: true
});

for await (const chunk of stream) {
    if (chunk.choices[0]?.delta?.content) {
        process.stdout.write(chunk.choices[0].delta.content);
    }
}
```

**New streaming:**

```javascript
const stream = await client.responses.create({
    model: "gpt-5",
    input: "Tell me a story",
    stream: true
});

for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
        process.stdout.write(event.delta);
    }
}
```

## Legacy Model Support

### Models Being Deprecated

| Legacy Model     | Replacement | Migration Notes                |
| ---------------- | ----------- | ------------------------------ |
| gpt-3.5-turbo    | gpt-5-nano  | Better performance, lower cost |
| gpt-4-turbo      | gpt-4.1     | Improved capabilities          |
| text-davinci-003 | gpt-5-mini  | Completions → Chat/Responses   |
| code-davinci-002 | gpt-5       | Better coding capabilities     |

### Pinning Model Versions

**Pin to specific snapshots for production:**

```javascript
const response = await client.responses.create({
    model: "gpt-5-2025-08-07", // Specific version
    input: "Your production prompt"
});
```

## Gradual Migration Strategy

### Phase 1: Parallel Testing

Run both old and new APIs side by side:

```javascript
async function compareAPIs(input) {
    // Old API
    const oldResponse = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: input }]
    });

    // New API
    const newResponse = await client.responses.create({
        model: "gpt-4o",
        input: input
    });

    return {
        old: oldResponse.choices[0].message.content,
        new: newResponse.output_text,
        oldTokens: oldResponse.usage.total_tokens,
        newTokens: newResponse.usage.total_tokens
    };
}

// Test with your common use cases
const comparison = await compareAPIs("Explain machine learning");
console.log("Comparison results:", comparison);
```

### Phase 2: Feature Flags

Use feature flags to gradually roll out the new API:

```javascript
const USE_NEW_API = process.env.USE_RESPONSES_API === "true";

async function generateText(input) {
    if (USE_NEW_API) {
        const response = await client.responses.create({
            model: "gpt-5",
            input: input
        });
        return response.output_text;
    } else {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: input }]
        });
        return response.choices[0].message.content;
    }
}
```

### Phase 3: Complete Migration

Once testing is complete, fully migrate to the new patterns:

```javascript
// Clean, modern implementation
async function generateResponse(input, options = {}) {
    const response = await client.responses.create({
        model: options.model || "gpt-5",
        reasoning: options.reasoning || { effort: "medium" },
        instructions: options.instructions,
        input: input,
        tools: options.tools,
        stream: options.stream
    });

    return options.stream ? response : response.output_text;
}
```

## Migration Checklist

### Pre-Migration

- [ ] Audit current API usage patterns
- [ ] Identify all Chat Completions API calls
- [ ] List all models currently in use
- [ ] Document expected behavior for critical use cases

### During Migration

- [ ] Update SDK to latest version
- [ ] Replace Chat Completions calls with Responses API
- [ ] Update model names to current versions
- [ ] Replace temperature/top_p with reasoning/verbosity controls
- [ ] Update streaming event handlers
- [ ] Test function calling with new syntax

### Post-Migration

- [ ] Monitor token usage and costs
- [ ] Validate output quality matches expectations
- [ ] Update error handling for new response formats
- [ ] Pin model versions for production stability
- [ ] Update documentation and team training

## Error Handling Updates

**Old error patterns:**

```javascript
try {
    const response = await client.chat.completions.create({...});
} catch (error) {
    if (error.response?.status === 429) {
        // Rate limit handling
    }
}
```

**New error patterns:**

```javascript
try {
    const response = await client.responses.create({...});
} catch (error) {
    if (error.status === 429) {
        // Rate limit handling - same patterns apply
    }

    // Handle new error types specific to Responses API
    if (error.code === "invalid_reasoning_effort") {
        // Handle reasoning-specific errors
    }
}
```

## Benefits of Migration

### Performance Improvements

- **Faster responses** with optimized models
- **Better reasoning** capabilities
- **Improved streaming** experience
- **Lower latency** for simple tasks

### Cost Optimization

- **More granular model selection** (nano, mini, full)
- **Batch processing** discounts
- **Cached input** pricing
- **Better token efficiency**

### Enhanced Capabilities

- **Multimodal inputs** (images, audio, files)
- **Structured outputs** with guaranteed schemas
- **Advanced tool calling**
- **Reasoning transparency** in compatible models

---

## Conclusion

This comprehensive Core Concepts guide provides everything you need to understand and effectively use the OpenAI API. From basic setup and authentication to advanced features like structured outputs and reasoning models, you now have the foundation to build sophisticated AI-powered applications.

### Key Takeaways

- **Start with the Responses API** for all new projects
- **Choose models based on your specific needs** - nano for simple tasks, full models for complex reasoning
- **Leverage multimodal capabilities** for richer applications
- **Use structured outputs** for reliable data extraction
- **Optimize costs** through smart model selection and batch processing
- **Plan migration paths** from legacy APIs to current best practices

### Next Steps

1. **Experiment with the API**: Try different models and features with your use cases
2. **Build evaluation systems**: Test model performance on your specific tasks
3. **Implement cost monitoring**: Track usage and optimize for your budget
4. **Stay updated**: Follow OpenAI announcements for new features and models
5. **Join the community**: Connect with other developers and share learnings

The OpenAI API ecosystem is constantly evolving, bringing new capabilities and improvements. This guide serves as your comprehensive reference as you build, deploy, and scale AI applications that leverage the full power of OpenAI's technology stack.

For additional support, detailed API references, and the latest updates, visit the [OpenAI Developer Documentation](https://platform.openai.com/docs) and join the [OpenAI Developer Community](https://community.openai.com/).
