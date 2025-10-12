# OpenAI Developer Quick Start - Complete Guide

## Table of Contents

1. [Developer Quickstart Overview](#developer-quickstart-overview)
2. [Create and Export an API Key](#create-and-export-an-api-key)
3. [Install OpenAI SDK and Run API Calls](#install-openai-sdk-and-run-api-calls)
4. [Analyze Images and Files](#analyze-images-and-files)
5. [Extend Models with Tools](#extend-models-with-tools)
6. [Stream Responses and Build Realtime Apps](#stream-responses-and-build-realtime-apps)
7. [Build Agents](#build-agents)
8. [Libraries and SDKs](#libraries-and-sdks)
9. [Pricing Overview](#pricing-overview)
10. [Using GPT-5](#using-gpt-5)

---

# Developer Quickstart Overview

Take your first steps with the OpenAI API.

The OpenAI API provides a simple interface to state-of-the-art AI models for text generation, natural language processing, computer vision, and more. Get started by creating an API Key and running your first API call. Discover how to generate text, analyze images, build agents, and more.

## What You'll Learn

- **API Setup**: Create and configure your API key
- **Multi-language Support**: Use official SDKs for JavaScript, Python, .NET, Java, and Go
- **Core Features**: Text generation, image analysis, file processing
- **Advanced Capabilities**: Tools, streaming, agents, and realtime applications
- **Model Selection**: Choose the right model for your use case
- **Cost Optimization**: Understand pricing and make informed decisions

---

# Create and Export an API Key

Before you begin, create an API key in the dashboard, which you'll use to securely access the API. Store the key in a safe location, like a `.zshrc` file or another text file on your computer. Once you've generated an API key, export it as an environment variable in your terminal.

**[Create an API Key](https://platform.openai.com/api-keys)**

## macOS / Linux

Export an environment variable on macOS or Linux systems:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

## Windows

Export an environment variable in PowerShell:

```bash
setx OPENAI_API_KEY "your_api_key_here"
```

OpenAI SDKs are configured to automatically read your API key from the system environment.

---

# Install OpenAI SDK and Run API Calls

## JavaScript

To use the OpenAI API in server-side JavaScript environments like Node.js, Deno, or Bun, you can use the official [OpenAI SDK for TypeScript and JavaScript](https://github.com/openai/openai-node).

### Installation

Install the OpenAI SDK with npm:

```bash
npm install openai
```

### Basic Usage

With the OpenAI SDK installed, create a file called `example.mjs` and copy the example code into it:

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);
```

Execute the code with `node example.mjs` (or the equivalent command for Deno or Bun). In a few moments, you should see the output of your API request.

**[Learn more on GitHub](https://github.com/openai/openai-node)**

## Python

To use the OpenAI API in Python, you can use the official [OpenAI SDK for Python](https://github.com/openai/openai-python).

### Installation

Install the OpenAI SDK with pip:

```bash
pip install openai
```

### Basic Usage

With the OpenAI SDK installed, create a file called `example.py` and copy the example code into it:

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input="Write a one-sentence bedtime story about a unicorn."
)

print(response.output_text)
```

Execute the code with `python example.py`. In a few moments, you should see the output of your API request.

**[Learn more on GitHub](https://github.com/openai/openai-python)**

## .NET

In collaboration with Microsoft, OpenAI provides an officially supported API client for C#. You can install it with the .NET CLI from [NuGet](https://www.nuget.org/).

### Installation

```text
dotnet add package OpenAI
```

### Basic Usage

A simple API request to the [Responses API](/docs/api-reference/responses) would look like this:

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

## Java

OpenAI provides an API helper for the Java programming language, currently in beta.

### Installation

You can include the Maven dependency using the following configuration:

```xml
<dependency>
    <groupId>com.openai</groupId>
    <artifactId>openai-java</artifactId>
    <version>4.0.0</version>
</dependency>
```

### Basic Usage

A simple API request to [Responses API](/docs/api-reference/responses) would look like this:

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;

public class Main {
    public static void main(String[] args) {
        // Create client from environment variables
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

## Go

OpenAI provides an API helper for the Go programming language, currently in beta.

### Installation

You can import the library using the code below:

```golang
import (
    "github.com/openai/openai-go" // imported as openai
)
```

### Basic Usage

A simple API request to the [Responses API](/docs/api-reference/responses) would look like this:

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

    resp, err := client.Responses.New(context.TODO(), openai.ResponseNewParams{
        Model: openai.F("gpt-5"),
        Input: openai.F("Say this is a test"),
    })

    if err != nil {
        panic(err.Error())
    }

    fmt.Println(resp.OutputText)
}
```

**[Learn more on GitHub](https://github.com/openai/openai-go)**

---

# Analyze Images and Files

Send image URLs, uploaded files, or PDF documents directly to the model to extract text, classify content, or detect visual elements.

## Image URL Analysis

Analyze the content of an image:

### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "What is in this image?",
                },
                {
                    type: "input_image",
                    image_url: "https://openai-documentation.vercel.app/images/cat_and_otter.png",
                },
            ],
        },
    ],
});

console.log(response.output_text);
```

### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "What teams are playing in this image?",
                },
                {
                    "type": "input_image",
                    "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3b/LeBron_James_Layup_%28Cleveland_vs_Brooklyn_2018%29.jpg"
                }
            ]
        }
    ]
)

print(response.output_text)
```

### cURL

```bash
curl "https://api.openai.com/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5",
    "input": [
      {
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": "What is in this image?"
          },
          {
            "type": "input_image",
            "image_url": "https://openai-documentation.vercel.app/images/cat_and_otter.png"
          }
        ]
      }
    ]
  }'
```

## File URL Processing

Use a file URL as input:

### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "Analyze the letter and provide a summary of the key points.",
                },
                {
                    type: "input_file",
                    file_url: "https://www.berkshirehathaway.com/letters/2024ltr.pdf",
                },
            ],
        },
    ],
});

console.log(response.output_text);
```

### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Analyze the letter and provide a summary of the key points.",
                },
                {
                    "type": "input_file",
                    "file_url": "https://www.berkshirehathaway.com/letters/2024ltr.pdf",
                },
            ],
        },
    ]
)

print(response.output_text)
```

## Upload File Processing

Upload a file and use it as input:

### JavaScript

```javascript
import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI();

const file = await client.files.create({
    file: fs.createReadStream("draconomicon.pdf"),
    purpose: "user_data",
});

const response = await client.responses.create({
    model: "gpt-5",
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_file",
                    file_id: file.id,
                },
                {
                    type: "input_text",
                    text: "What is the first dragon in the book?",
                },
            ],
        },
    ],
});

console.log(response.output_text);
```

### Python

```python
from openai import OpenAI

client = OpenAI()

file = client.files.create(
    file=open("draconomicon.pdf", "rb"),
    purpose="user_data"
)

response = client.responses.create(
    model="gpt-5",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_file",
                    "file_id": file.id,
                },
                {
                    "type": "input_text",
                    "text": "What is the first dragon in the book?",
                },
            ]
        }
    ]
)

print(response.output_text)
```

---

# Extend Models with Tools

Give the model access to external data and functions by attaching tools. Use built-in tools like web search or file search, or define your own for calling APIs, running code, or integrating with third-party systems.

## Web Search

Use web search in a response:

### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5",
    tools: [
        { type: "web_search" },
    ],
    input: "What was a positive news story from today?",
});

console.log(response.output_text);
```

### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    tools=[{"type": "web_search"}],
    input="What was a positive news story from today?"
)

print(response.output_text)
```

## File Search

Search your files in a response:

### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-4.1",
    input="What is deep research by OpenAI?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": ["<vector_store_id>"]
    }]
)

print(response)
```

### JavaScript

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-4.1",
    input: "What is deep research by OpenAI?",
    tools: [
        {
            type: "file_search",
            vector_store_ids: ["<vector_store_id>"],
        },
    ],
});

console.log(response);
```

## Function Calling

Call your own function:

### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const tools = [
    {
        type: "function",
        name: "get_weather",
        description: "Get current temperature for a given location.",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "City and country e.g. Bogotá, Colombia",
                },
            },
            required: ["location"],
            additionalProperties: false,
        },
        strict: true,
    },
];

const response = await client.responses.create({
    model: "gpt-5",
    input: [
        { role: "user", content: "What is the weather like in Paris today?" },
    ],
    tools,
});

console.log(response.output[0].to_json());
```

### Python

```python
from openai import OpenAI

client = OpenAI()

tools = [
    {
        "type": "function",
        "name": "get_weather",
        "description": "Get current temperature for a given location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and country e.g. Bogotá, Colombia",
                }
            },
            "required": ["location"],
            "additionalProperties": False,
        },
        "strict": True,
    },
]

response = client.responses.create(
    model="gpt-5",
    input=[
        {"role": "user", "content": "What is the weather like in Paris today?"},
    ],
    tools=tools,
)

print(response.output[0].to_json())
```

## Remote MCP

Call a remote MCP server:

### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const resp = await client.responses.create({
    model: "gpt-5",
    tools: [
        {
            type: "mcp",
            server_label: "dmcp",
            server_description: "A Dungeons and Dragons MCP server to assist with dice rolling.",
            server_url: "https://dmcp-server.deno.dev/sse",
            require_approval: "never",
        },
    ],
    input: "Roll 2d4+1",
});

console.log(resp.output_text);
```

### Python

```python
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="gpt-5",
    tools=[
        {
            "type": "mcp",
            "server_label": "dmcp",
            "server_description": "A Dungeons and Dragons MCP server to assist with dice rolling.",
            "server_url": "https://dmcp-server.deno.dev/sse",
            "require_approval": "never",
        },
    ],
    input="Roll 2d4+1",
)

print(resp.output_text)
```

---

# Stream Responses and Build Realtime Apps

Use server-sent streaming events to show results as they're generated, or the Realtime API for interactive voice and multimodal apps.

## Stream Server-Sent Events

### JavaScript

```javascript
import { OpenAI } from "openai";

const client = new OpenAI();

const stream = await client.responses.create({
    model: "gpt-5",
    input: [
        {
            role: "user",
            content: "Say 'double bubble bath' ten times fast.",
        },
    ],
    stream: true,
});

for await (const event of stream) {
    console.log(event);
}
```

### Python

```python
from openai import OpenAI

client = OpenAI()

stream = client.responses.create(
    model="gpt-5",
    input=[
        {
            "role": "user",
            "content": "Say 'double bubble bath' ten times fast.",
        },
    ],
    stream=True,
)

for event in stream:
    print(event)
```

### C #

```csharp
using OpenAI.Responses;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
OpenAIResponseClient client = new(model: "gpt-5", apiKey: key);

var responses = client.CreateResponseStreamingAsync([
    ResponseItem.CreateUserMessageItem([
        ResponseContentPart.CreateInputTextPart("Say 'double bubble bath' ten times fast."),
    ]),
]);

await foreach (var response in responses)
{
    if (response is StreamingResponseOutputTextDeltaUpdate delta)
    {
        Console.Write(delta.Delta);
    }
}
```

---

# Build Agents

Use the OpenAI platform to build agents capable of taking action—like controlling computers—on behalf of your users. Use the Agents SDK for Python or TypeScript to create orchestration logic on the backend.

## Language Triage Agent

### JavaScript

```javascript
import { Agent, run } from '@openai/agents';

const spanishAgent = new Agent({
    name: 'Spanish agent',
    instructions: 'You only speak Spanish.',
});

const englishAgent = new Agent({
    name: 'English agent',
    instructions: 'You only speak English',
});

const triageAgent = new Agent({
    name: 'Triage agent',
    instructions: 'Handoff to the appropriate agent based on the language of the request.',
    handoffs: [spanishAgent, englishAgent],
});

const result = await run(triageAgent, 'Hola, ¿cómo estás?');
console.log(result.finalOutput);
```

### Python

```python
from agents import Agent, Runner
import asyncio

spanish_agent = Agent(
    name="Spanish agent",
    instructions="You only speak Spanish.",
)

english_agent = Agent(
    name="English agent",
    instructions="You only speak English",
)

triage_agent = Agent(
    name="Triage agent",
    instructions="Handoff to the appropriate agent based on the language of the request.",
    handoffs=[spanish_agent, english_agent],
)

async def main():
    result = await Runner.run(triage_agent, input="Hola, ¿cómo estás?")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
```

---

# Libraries and SDKs

Set up your development environment to use the OpenAI API with an SDK in your preferred language.

## Official SDKs

### JavaScript

- **Repository**: [OpenAI SDK for TypeScript and JavaScript](https://github.com/openai/openai-node)
- **Installation**: `npm install openai`
- **Support**: Node.js, Deno, Bun

### Python

- **Repository**: [OpenAI SDK for Python](https://github.com/openai/openai-python)
- **Installation**: `pip install openai`
- **Support**: Python 3.7+

### .NET

- **Repository**: [OpenAI .NET SDK](https://github.com/openai/openai-dotnet)
- **Installation**: `dotnet add package OpenAI`
- **Support**: .NET Framework, .NET Core

### Java

- **Repository**: [OpenAI Java SDK](https://github.com/openai/openai-java)
- **Installation**: Maven dependency
- **Support**: Java 8+

### Go

- **Repository**: [OpenAI Go SDK](https://github.com/openai/openai-go)
- **Installation**: `go get github.com/openai/openai-go`
- **Support**: Go 1.18+

## Azure OpenAI Libraries

Microsoft's Azure team maintains libraries that are compatible with both the OpenAI API and Azure OpenAI services:

- [Azure OpenAI client library for .NET](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/openai/Azure.AI.OpenAI)
- [Azure OpenAI client library for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai)
- [Azure OpenAI client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/openai/azure-ai-openai)
- [Azure OpenAI client library for Go](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/ai/azopenai)

## Community Libraries

The libraries below are built and maintained by the broader developer community. **Use them at your own risk!**

### C# / .NET

- [Betalgo.OpenAI](https://github.com/betalgo/openai) by [Betalgo](https://github.com/betalgo)
- [OpenAI-API-dotnet](https://github.com/OkGoDoIt/OpenAI-API-dotnet) by [OkGoDoIt](https://github.com/OkGoDoIt)
- [OpenAI-DotNet](https://github.com/RageAgainstThePixel/OpenAI-DotNet) by [RageAgainstThePixel](https://github.com/RageAgainstThePixel)

### Python

- [chronology](https://github.com/OthersideAI/chronology) by [OthersideAI](https://www.othersideai.com/)

### Node.js

- [openai-api](https://www.npmjs.com/package/openai-api) by [Njerschow](https://github.com/Njerschow)
- [openai-api-node](https://www.npmjs.com/package/openai-api-node) by [erlapso](https://github.com/erlapso)
- [gpt-x](https://www.npmjs.com/package/gpt-x) by [ceifa](https://github.com/ceifa)

### Other Languages

- **C++**: [liboai](https://github.com/D7EAD/liboai) by [D7EAD](https://github.com/D7EAD)
- **Rust**: [async-openai](https://github.com/64bit/async-openai) by [64bit](https://github.com/64bit)
- **Swift**: [OpenAI](https://github.com/MacPaw/OpenAI/) by [MacPaw](https://github.com/MacPaw)
- **Ruby**: [ruby-openai](https://github.com/alexrudall/ruby-openai) by [alexrudall](https://github.com/alexrudall)

## Other OpenAI Repositories

- [tiktoken](https://github.com/openai/tiktoken) - counting tokens
- [simple-evals](https://github.com/openai/simple-evals) - simple evaluation library
- [mle-bench](https://github.com/openai/mle-bench) - library to evaluate machine learning engineer agents
- [gym](https://github.com/openai/gym) - reinforcement learning library
- [swarm](https://github.com/openai/swarm) - educational orchestration repository

---

# Pricing Overview

## Text Tokens

Prices per 1M tokens.

### Standard Tier

| Model        | Input | Cached Input | Output |
| ------------ | ----- | ------------ | ------ |
| gpt-5        | $1.25 | $0.125       | $10.00 |
| gpt-5-mini   | $0.25 | $0.025       | $2.00  |
| gpt-5-nano   | $0.05 | $0.005       | $0.40  |
| gpt-4.1      | $2.00 | $0.50        | $8.00  |
| gpt-4.1-mini | $0.40 | $0.10        | $1.60  |
| gpt-4o       | $2.50 | $1.25        | $10.00 |
| gpt-4o-mini  | $0.15 | $0.075       | $0.60  |

### Batch Processing (50% savings)

| Model      | Input  | Cached Input | Output |
| ---------- | ------ | ------------ | ------ |
| gpt-5      | $0.625 | $0.0625      | $5.00  |
| gpt-5-mini | $0.125 | $0.0125      | $1.00  |
| gpt-5-nano | $0.025 | $0.0025      | $0.20  |

### Reasoning Models

| Model   | Input  | Cached Input | Output |
| ------- | ------ | ------------ | ------ |
| o3      | $2.00  | $0.50        | $8.00  |
| o4-mini | $1.10  | $0.275       | $4.40  |
| o1      | $15.00 | $7.50        | $60.00 |
| o1-mini | $1.10  | $0.55        | $4.40  |

## Built-in Tools

| Tool                  | Cost                                      |
| --------------------- | ----------------------------------------- |
| Code Interpreter      | $0.03 / container                         |
| File search storage   | $0.10 / GB per day (1GB free)             |
| File search tool call | $2.50 / 1k calls                          |
| Web search            | $10.00 / 1k calls + search content tokens |

## Other Services

### Image Generation

| Model    | Quality  | 1024x1024 | 1024x1536 | 1536x1024 |
| -------- | -------- | --------- | --------- | --------- |
| DALL·E 3 | Standard | $0.04     | $0.08     | $0.08     |
| DALL·E 3 | HD       | $0.08     | $0.12     | $0.12     |
| DALL·E 2 | Standard | $0.016    | $0.018    | $0.02     |

### Audio

| Model   | Use case          | Cost                   |
| ------- | ----------------- | ---------------------- |
| Whisper | Transcription     | $0.006 / minute        |
| TTS     | Speech generation | $15.00 / 1M characters |
| TTS HD  | Speech generation | $30.00 / 1M characters |

### Embeddings

| Model                  | Cost  | Batch Cost |
| ---------------------- | ----- | ---------- |
| text-embedding-3-small | $0.02 | $0.01      |
| text-embedding-3-large | $0.13 | $0.065     |

---

# Using GPT-5

Learn best practices, features, and migration guidance for GPT-5.

GPT-5 is our most intelligent model yet, trained to be especially proficient in:

- Code generation, bug fixing, and refactoring
- Instruction following
- Long context and tool calling

## Quickstart

### Faster Responses

By default, GPT-5 produces a medium length chain of thought before responding to a prompt. For faster, lower-latency responses, use low reasoning effort and low text verbosity.

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const result = await openai.responses.create({
    model: "gpt-5",
    input: "Write a haiku about code.",
    reasoning: { effort: "low" },
    text: { verbosity: "low" },
});

console.log(result.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

result = client.responses.create(
    model="gpt-5",
    input="Write a haiku about code.",
    reasoning={ "effort": "low" },
    text={ "verbosity": "low" },
)

print(result.output_text)
```

### Coding and Agentic Tasks

GPT-5 is great at reasoning through complex tasks. **For complex tasks like coding and multi-step planning, use high reasoning effort.**

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const result = await openai.responses.create({
    model: "gpt-5",
    input: "Find the null pointer exception: ...your code here...",
    reasoning: { effort: "high" },
});

console.log(result.output_text);
```

```python
from openai import OpenAI

client = OpenAI()

result = client.responses.create(
    model="gpt-5",
    input="Find the null pointer exception: ...your code here...",
    reasoning={ "effort": "high" },
)

print(result.output_text)
```

## Meet the Models

There are three models in the GPT-5 series:

| Variant    | Best for                                                                             |
| ---------- | ------------------------------------------------------------------------------------ |
| gpt-5      | Complex reasoning, broad world knowledge, and code-heavy or multi-step agentic tasks |
| gpt-5-mini | Cost-optimized reasoning and chat; balances speed, cost, and capability              |
| gpt-5-nano | High-throughput tasks, especially simple instruction-following or classification     |

## New API Features

### Minimal Reasoning Effort

The `reasoning.effort` parameter controls how many reasoning tokens the model generates. The new `minimal` setting produces very few reasoning tokens for the fastest possible time-to-first-token.

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-5",
    input: "How much gold would it take to coat the Statue of Liberty in a 1mm layer?",
    reasoning: {
        effort: "minimal"
    }
});

console.log(response);
```

### Verbosity Control

Verbosity determines how many output tokens are generated. Lowering the number of tokens reduces overall latency.

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-5",
    input: "What is the answer to the ultimate question of life, the universe, and everything?",
    text: {
        verbosity: "low"
    }
});

console.log(response);
```

### Custom Tools

With GPT-5, we're introducing custom tools, which lets models send any raw text as tool call input:

```json
{
    "type": "custom",
    "name": "code_exec",
    "description": "Executes arbitrary python code"
}
```

### Allowed Tools

The `allowed_tools` parameter lets you pass N tool definitions but restrict the model to only M (< N) of them:

```json
{
    "tool_choice": {
        "type": "allowed_tools",
        "mode": "auto",
        "tools": [
            { "type": "function", "name": "get_weather" },
            { "type": "function", "name": "search_docs" }
        ]
    }
}
```

## Migration Guidance

### From Other Models to GPT-5

- **o3**: `gpt-5` with `medium` or `high` reasoning is a great replacement
- **gpt-4.1**: `gpt-5` with `minimal` or `low` reasoning is a strong alternative
- **o4-mini or gpt-4.1-mini**: `gpt-5-mini` with prompt tuning is a great replacement
- **gpt-4.1-nano**: `gpt-5-nano` with prompt tuning is a great replacement

### GPT-5 Parameter Compatibility

⚠️ **Important**: The following parameters are **not supported** when using GPT-5 models:

- `temperature`
- `top_p`
- `logprobs`

### Instead, use GPT-5-specific controls

- **Reasoning depth**: `reasoning: { effort: "minimal" | "low" | "medium" | "high" }`
- **Output verbosity**: `text: { verbosity: "low" | "medium" | "high" }`
- **Output length**: `max_output_tokens`

## Best Practices

1. **Use the prompt optimizer**: Try the [prompt optimizer](http://platform.openai.com/chat/edit?optimize=true) to automatically update your prompts for GPT-5
2. **Start with appropriate reasoning levels**: Use `minimal` for fast responses, `high` for complex tasks
3. **Leverage new features**: Take advantage of custom tools and allowed tools for better control
4. **Pass reasoning between turns**: Use `previous_response_id` to maintain conversation context

## Further Reading

- [GPT-5 Prompting Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide)
- [GPT-5 Frontend Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_frontend)
- [GPT-5 New Features Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_new_params_and_tools)

---

## Conclusion

This comprehensive quick start guide provides everything you need to begin building with the OpenAI API. From basic setup and first API calls to advanced features like agents and realtime applications, you now have the foundation to create powerful AI-powered applications.

### Key Takeaways

- **Start Simple**: Begin with basic text generation and gradually explore advanced features
- **Choose the Right Model**: Select models based on your specific use case and performance requirements
- **Optimize for Cost**: Use appropriate tiers and models to balance performance and cost
- **Leverage Tools**: Extend model capabilities with built-in and custom tools
- **Build Incrementally**: Start with simple applications and add complexity as needed

### Next Steps

1. **Explore the API Reference**: Dive deeper into specific endpoints and parameters
2. **Try Different Models**: Experiment with various models to find the best fit
3. **Build Something**: Start with a simple project and iterate
4. **Join the Community**: Connect with other developers in the OpenAI community
5. **Stay Updated**: Follow OpenAI's updates and new feature releases

The OpenAI API opens up endless possibilities for creating intelligent applications. Whether you're building chatbots, content generators, data analyzers, or complex agents, this guide provides the foundation you need to get started and succeed.

For additional support and advanced topics, explore the comprehensive documentation, join the community forums, and check out the extensive cookbook of examples and tutorials.
