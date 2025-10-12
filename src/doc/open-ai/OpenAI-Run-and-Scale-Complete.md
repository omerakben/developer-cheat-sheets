# OpenAI Run and Scale - Complete Guide

## Table of Contents

1. [Production Deployment Overview](#production-deployment-overview)
2. [Conversation State Management](#conversation-state-management)
3. [Background Processing](#background-processing)
4. [Streaming API Responses](#streaming-api-responses)
5. [Webhook Integration](#webhook-integration)
6. [File Input Processing](#file-input-processing)
7. [Advanced Prompting](#advanced-prompting)
8. [Prompt Caching](#prompt-caching)
9. [Prompt Engineering](#prompt-engineering)
10. [Reasoning Best Practices](#reasoning-best-practices)
11. [Reasoning Models](#reasoning-models)

---

# Production Deployment Overview

Learn how to deploy, scale, and optimize OpenAI API applications for production use.

This comprehensive guide covers everything you need to successfully deploy and scale OpenAI API applications in production environments. From conversation state management to advanced performance optimization, you'll learn best practices for building robust, scalable AI applications.

## What You'll Learn

- **Production Architecture**: Scalable patterns for AI application deployment
- **State Management**: Handle conversation context and multi-turn interactions
- **Performance Optimization**: Background processing, streaming, and caching
- **Integration Patterns**: Webhooks, file processing, and real-time updates
- **Cost Optimization**: Efficient prompting and resource management
- **Monitoring & Debugging**: Track performance and troubleshoot issues

## Key Production Considerations

Before deploying your OpenAI API application to production, consider these critical factors:

### Scalability

- **Rate limiting**: Plan for API rate limits and implement proper backoff strategies
- **Load balancing**: Distribute requests across multiple instances
- **Caching**: Implement prompt caching and response caching where appropriate
- **Database design**: Optimize for conversation storage and retrieval

### Security

- **API key management**: Secure storage and rotation of API keys
- **Data privacy**: Handle user data according to privacy requirements
- **Input validation**: Sanitize and validate all user inputs
- **Access controls**: Implement proper authentication and authorization

### Monitoring

- **Performance metrics**: Track latency, throughput, and error rates
- **Cost tracking**: Monitor token usage and API costs
- **Error handling**: Implement comprehensive error logging and alerting
- **Health checks**: Monitor system health and availability

---

# Conversation State Management

Learn how to manage conversation state during multi-turn model interactions.

OpenAI provides several approaches to manage conversation state, which is essential for preserving information across multiple messages or turns in a conversation. Choose the right approach based on your application's needs.

## Manual Conversation Management

While each text generation request is independent and stateless, you can implement **multi-turn conversations** by providing additional messages as parameters to your text generation request.

### Basic Multi-turn Example

**JavaScript:**

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-4o-mini",
  input: [
    { role: "user", content: "knock knock." },
    { role: "assistant", content: "Who's there?" },
    { role: "user", content: "Orange." },
  ],
});

console.log(response.output_text);
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-4o-mini",
    input=[
        {"role": "user", "content": "knock knock."},
        {"role": "assistant", "content": "Who's there?"},
        {"role": "user", "content": "Orange."},
    ],
)

print(response.output_text)
```

### Building Conversation History

To manually share context across generated responses, include the model's previous response output as input, and append that input to your next request.

**JavaScript:**

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

let history = [
  {
    role: "user",
    content: "tell me a joke",
  },
];

const response = await openai.responses.create({
  model: "gpt-4o-mini",
  input: history,
  store: true,
});

console.log(response.output_text);

// Add the response to the history
history = [
  ...history,
  ...response.output.map((el) => {
    // Remove the id for proper formatting
    delete el.id;
    return el;
  }),
];

history.push({
  role: "user",
  content: "tell me another",
});

const secondResponse = await openai.responses.create({
  model: "gpt-4o-mini",
  input: history,
  store: true,
});

console.log(secondResponse.output_text);
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

history = [
    {
        "role": "user",
        "content": "tell me a joke"
    }
]

response = client.responses.create(
    model="gpt-4o-mini",
    input=history,
    store=False
)

print(response.output_text)

# Add the response to the conversation
history += [{"role": el.role, "content": el.content} for el in response.output]
history.append({ "role": "user", "content": "tell me another" })

second_response = client.responses.create(
    model="gpt-4o-mini",
    input=history,
    store=False
)

print(second_response.output_text)
```

## Using the Conversations API

The [Conversations API](/docs/api-reference/conversations/create) works with the [Responses API](/docs/api-reference/responses/create) to persist conversation state as a long-running object with its own durable identifier.

### Creating and Using Conversations

**Python:**

```python
# Create a conversation
conversation = openai.conversations.create()

# Use the conversation in responses
response = openai.responses.create(
    model="gpt-4.1",
    input=[{"role": "user", "content": "What are the 5 Ds of dodgeball?"}],
    conversation="conv_689667905b048191b4740501625afd940c7533ace33a2dab"
)
```

### Previous Response ID Pattern

Another way to manage conversation state is to share context across generated responses with the `previous_response_id` parameter. This parameter lets you chain responses and create a threaded conversation.

**JavaScript:**

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-4o-mini",
  input: "tell me a joke",
  store: true,
});

console.log(response.output_text);

const secondResponse = await openai.responses.create({
  model: "gpt-4o-mini",
  previous_response_id: response.id,
  input: [{"role": "user", "content": "explain why this is funny."}],
  store: true,
});

console.log(secondResponse.output_text);
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-4o-mini",
    input="tell me a joke",
)

print(response.output_text)

second_response = client.responses.create(
    model="gpt-4o-mini",
    previous_response_id=response.id,
    input=[{"role": "user", "content": "explain why this is funny."}],
)

print(second_response.output_text)
```

## Data Retention for Model Responses

- **Response objects** are saved for 30 days by default
- **Conversation objects and items** are not subject to the 30 day TTL
- Any response attached to a conversation will have its items persisted with no 30 day TTL
- You can disable storage by setting `store` to `false` when creating a Response

## Managing the Context Window

The **context window** is the maximum number of tokens that can be used in a single request. This includes input, output, and reasoning tokens.

### Context Window Considerations

- **Output tokens**: Generated by the model in response to a prompt
- **Context window**: Total tokens for both input and output (and reasoning for some models)
- **Token limits**: Each model has different limits (e.g., `gpt-4o-2024-08-06` has 128k tokens)

### Best Practices

- Use the [tokenizer tool](/tokenizer) to estimate token usage
- Structure prompts with static content at the beginning
- Monitor token usage to avoid truncated outputs
- Consider model context windows when designing conversation flows

---

# Background Processing

Run long-running tasks asynchronously in the background.

Background mode enables you to execute long-running tasks on models like o3 and o1-pro reliably, without having to worry about timeouts or other connectivity issues. This is essential for complex reasoning tasks that may take several minutes to complete.

## Creating Background Responses

To start response generation in the background, make an API request with `background` set to `true`:

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const resp = await client.responses.create({
  model: "o3",
  input: "Write a very long novel about otters in space.",
  background: true,
});

console.log(resp.status);
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="o3",
    input="Write a very long novel about otters in space.",
    background=True,
)

print(resp.status)
```

**cURL:**

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "o3",
    "input": "Write a very long novel about otters in space.",
    "background": true
  }'
```

## Polling Background Responses

To check the status of background requests, use the GET endpoint for Responses. Keep polling while the request is in the `queued` or `in_progress` state.

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

let resp = await client.responses.create({
  model: "o3",
  input: "Write a very long novel about otters in space.",
  background: true,
});

while (resp.status === "queued" || resp.status === "in_progress") {
  console.log("Current status: " + resp.status);
  await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
  resp = await client.responses.retrieve(resp.id);
}

console.log("Final status: " + resp.status + "\nOutput:\n" + resp.output_text);
```

**Python:**

```python
from openai import OpenAI
from time import sleep

client = OpenAI()

resp = client.responses.create(
    model="o3",
    input="Write a very long novel about otters in space.",
    background=True,
)

while resp.status in {"queued", "in_progress"}:
    print(f"Current status: {resp.status}")
    sleep(2)  # wait 2 seconds
    resp = client.responses.retrieve(resp.id)

print(f"Final status: {resp.status}\nOutput:\n{resp.output_text}")
```

## Cancelling Background Responses

You can cancel an in-flight response:

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const resp = await client.responses.cancel("resp_123");
console.log(resp.status);
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

resp = client.responses.cancel("resp_123")
print(resp.status)
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/responses/resp_123/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Streaming Background Responses

You can create a background Response and start streaming events from it right away. This is helpful if you expect the client to drop the stream and want the option of picking it back up later.

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const stream = await client.responses.create({
  model: "o3",
  input: "Write a very long novel about otters in space.",
  background: true,
  stream: true,
});

let cursor = null;
for await (const event of stream) {
  console.log(event);
  cursor = event.sequence_number;
}

// If the connection drops, you can resume streaming from the last cursor
// const resumedStream = await client.responses.stream(resp.id, { starting_after: cursor });
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Fire off an async response but also start streaming immediately
stream = client.responses.create(
    model="o3",
    input="Write a very long novel about otters in space.",
    background=True,
    stream=True,
)

cursor = None
for event in stream:
    print(event)
    cursor = event.sequence_number

# If your connection drops, the response continues running and you can reconnect:
# SDK support for resuming the stream is coming soon.
# for event in client.responses.stream(resp.id, starting_after=cursor):
#     print(event)
```

## Background Processing Limitations

1. Background sampling requires `store=true`; stateless requests are rejected
2. To cancel a synchronous response, terminate the connection
3. You can only start a new stream from a background response if you created it with `stream=true`

---

# Streaming API Responses

Learn how to stream model responses from the OpenAI API using server-sent events.

By default, when you make a request to the OpenAI API, the entire model output is generated before being sent back in a single HTTP response. Streaming responses lets you start processing the beginning of the model's output while it continues generating the full response.

## Enable Streaming

To start streaming responses, set `stream=True` in your request to the Responses endpoint:

**JavaScript:**

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

**Python:**

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

**C#:**

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

## Streaming Events

The Responses API uses semantic events for streaming. Each event is typed with a predefined schema, so you can listen for events you care about.

### Common Event Types

```typescript
type StreamingEvent =
  | ResponseCreatedEvent
  | ResponseInProgressEvent
  | ResponseFailedEvent
  | ResponseCompletedEvent
  | ResponseOutputItemAdded
  | ResponseOutputItemDone
  | ResponseContentPartAdded
  | ResponseContentPartDone
  | ResponseOutputTextDelta
  | ResponseOutputTextAnnotationAdded
  | ResponseTextDone
  | ResponseRefusalDelta
  | ResponseRefusalDone
  | ResponseFunctionCallArgumentsDelta
  | ResponseFunctionCallArgumentsDone
  | ResponseFileSearchCallInProgress
  | ResponseFileSearchCallSearching
  | ResponseFileSearchCallCompleted
  | ResponseCodeInterpreterInProgress
  | ResponseCodeInterpreterCallCodeDelta
  | ResponseCodeInterpreterCallCodeDone
  | ResponseCodeInterpreterCallInterpreting
  | ResponseCodeInterpreterCallCompleted
  | Error
```

## Processing Streaming Events

Common events to listen for when streaming text:

- `response.created`
- `response.output_text.delta`
- `response.completed`
- `error`

**JavaScript Example:**

```javascript
const stream = await client.responses.create({
  model: "gpt-5",
  input: "Tell me a story about a robot.",
  stream: true,
});

for await (const event of stream) {
  switch (event.type) {
    case 'response.created':
      console.log('Response started');
      break;
    case 'response.output_text.delta':
      process.stdout.write(event.delta);
      break;
    case 'response.completed':
      console.log('\nResponse completed');
      break;
    case 'error':
      console.error('Error:', event.error);
      break;
  }
}
```

## Advanced Streaming Use Cases

### Streaming Function Calls

When streaming function calls, listen for function-specific events:

```javascript
for await (const event of stream) {
  if (event.type === 'response.function_call_arguments.delta') {
    console.log('Function call arguments:', event.delta);
  } else if (event.type === 'response.function_call_arguments.done') {
    console.log('Function call completed:', event.function);
  }
}
```

### Streaming Structured Output

For structured outputs, you can stream the JSON as it's being generated:

```javascript
for await (const event of stream) {
  if (event.type === 'response.output_text.delta') {
    // Handle structured JSON delta
    console.log('JSON delta:', event.delta);
  }
}
```

## Moderation Risk

Note that streaming the model's output in a production application makes it more difficult to moderate the content of the completions, as partial completions may be more difficult to evaluate. This may have implications for approved usage.

---

# Webhook Integration

Use webhooks to receive real-time updates from the OpenAI API.

OpenAI webhooks allow you to receive real-time notifications about events in the API, such as when a batch completes, a background response is generated, or a fine-tuning job finishes. Webhooks are delivered to an HTTP endpoint you control, following the [Standard Webhooks specification](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md).

## Setting Up Webhooks

### Creating Webhook Endpoints

To start receiving webhook requests on your server, log in to the dashboard and [open the webhook settings page](/settings/project/webhooks). Webhooks are configured per-project.

Click the "Create" button to create a new webhook endpoint. You will configure:

- A name for the endpoint (for your reference)
- A public URL to a server you control
- One or more event types to subscribe to

After creating a new webhook, you'll receive a signing secret to use for server-side verification of incoming webhook requests.

## Basic Webhook Server

**Python with Flask:**

```python
import os
from openai import OpenAI, InvalidWebhookSignatureError
from flask import Flask, request, Response

app = Flask(__name__)
client = OpenAI(webhook_secret=os.environ["OPENAI_WEBHOOK_SECRET"])

@app.route("/webhook", methods=["POST"])
def webhook():
    try:
        # with webhook_secret set above, unwrap will raise an error if the
        # signature is invalid
        event = client.webhooks.unwrap(request.data, request.headers)

        if event.type == "response.completed":
            response_id = event.data.id
            response = client.responses.retrieve(response_id)
            print("Response output:", response.output_text)

        return Response(status=200)
    except InvalidWebhookSignatureError as e:
        print("Invalid signature", e)
        return Response("Invalid signature", status=400)

if __name__ == "__main__":
    app.run(port=8000)
```

**JavaScript with Express:**

```javascript
import OpenAI from "openai";
import express from "express";

const app = express();
const client = new OpenAI({ webhookSecret: process.env.OPENAI_WEBHOOK_SECRET });

// Don't use express.json() because signature verification needs the raw text body
app.use(express.text({ type: "application/json" }));

app.post("/webhook", async (req, res) => {
  try {
    const event = await client.webhooks.unwrap(req.body, req.headers);

    if (event.type === "response.completed") {
      const response_id = event.data.id;
      const response = await client.responses.retrieve(response_id);
      const output_text = response.output
        .filter((item) => item.type === "message")
        .flatMap((item) => item.content)
        .filter((contentItem) => contentItem.type === "output_text")
        .map((contentItem) => contentItem.text)
        .join("");

      console.log("Response output:", output_text);
    }

    res.status(200).send();
  } catch (error) {
    if (error instanceof OpenAI.InvalidWebhookSignatureError) {
      console.error("Invalid signature", error);
      res.status(400).send("Invalid signature");
    } else {
      throw error;
    }
  }
});

app.listen(8000, () => {
  console.log("Webhook server is running on port 8000");
});
```

## Webhook Events

### Response Events

- `response.completed`: Sent when a background response has been completed
- `response.cancelled`: Sent when a background response has been cancelled
- `response.failed`: Sent when a background response has failed
- `response.incomplete`: Sent when a background response has been interrupted

### Batch Events

- `batch.completed`: Sent when a batch API request has been completed
- `batch.cancelled`: Sent when a batch API request has been cancelled
- `batch.failed`: Sent when a batch API request has failed
- `batch.expired`: Sent when a batch API request has expired

### Fine-tuning Events

- `fine_tuning.job.succeeded`: Sent when a fine-tuning job has succeeded
- `fine_tuning.job.failed`: Sent when a fine-tuning job has failed
- `fine_tuning.job.cancelled`: Sent when a fine-tuning job has been cancelled

## Handling Webhook Requests

When an event happens that you're subscribed to, your webhook URL will receive an HTTP POST request with these headers:

```text
POST https://yourserver.com/webhook
user-agent: OpenAI/1.0 (+https://platform.openai.com/docs/webhooks)
content-type: application/json
webhook-id: wh_685342e6c53c8190a1be43f081506c52
webhook-timestamp: 1750287078
webhook-signature: v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4=

{
  "object": "event",
  "id": "evt_685343a1381c819085d44c354e1b330e",
  "type": "response.completed",
  "created_at": 1750287018,
  "data": { "id": "resp_abc123" }
}
```

### Response Requirements

Your endpoint should:

- Respond quickly with a successful (`2xx`) status code
- Offload non-trivial processing to background workers
- Return within a few seconds to avoid timeouts

If the endpoint doesn't return a successful status code or doesn't respond quickly, the webhook request will be retried with exponential backoff for up to 72 hours.

## Verifying Webhook Signatures

Always verify that incoming requests are from OpenAI using the signing secret:

**With OpenAI SDK:**

```python
client = OpenAI()
webhook_secret = os.environ["OPENAI_WEBHOOK_SECRET"]

# will raise if the signature is invalid
event = client.webhooks.unwrap(request.data, request.headers, secret=webhook_secret)
```

**With Standard Webhooks Libraries:**

```rust
use standardwebhooks::Webhook;

let webhook_secret = std::env::var("OPENAI_WEBHOOK_SECRET").expect("OPENAI_WEBHOOK_SECRET not set");
let wh = Webhook::new(webhook_secret);
wh.verify(webhook_payload, webhook_headers).expect("Webhook verification failed");
```

## Testing Webhooks Locally

For local development, you can use:

- [ngrok](https://ngrok.com/) to expose your localhost server on a public URL
- Cloud development environments like [Replit](https://replit.com/), [GitHub Codespaces](https://github.com/features/codespaces), or [Cloudflare Workers](https://workers.cloudflare.com/)

---

# File Input Processing

Learn how to use PDF files and other file formats as inputs to the OpenAI API.

OpenAI models with vision capabilities can accept PDF files as input, enabling you to analyze documents, extract information, and generate responses based on both text and visual content from files.

## How File Processing Works

To help models understand PDF content, OpenAI puts both the extracted text and an image of each page into the model's context. The model can then use both the text and the images to generate a response.

## File URLs

You can upload PDF file inputs by linking external URLs:

**JavaScript:**

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

**Python:**

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

## Uploading Files

Upload a PDF using the [Files API](/docs/api-reference/files), then reference its file ID:

**JavaScript:**

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

**Python:**

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

## Base64-encoded Files

You can also send PDF file inputs as Base64-encoded data:

**JavaScript:**

```javascript
import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI();

const data = fs.readFileSync("draconomicon.pdf");
const base64String = data.toString("base64");

const response = await client.responses.create({
  model: "gpt-5",
  input: [
    {
      role: "user",
      content: [
        {
          type: "input_file",
          filename: "draconomicon.pdf",
          file_data: `data:application/pdf;base64,${base64String}`,
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

**Python:**

```python
import base64
from openai import OpenAI

client = OpenAI()

with open("draconomicon.pdf", "rb") as f:
    data = f.read()
    base64_string = base64.b64encode(data).decode("utf-8")

response = client.responses.create(
    model="gpt-5",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_file",
                    "filename": "draconomicon.pdf",
                    "file_data": f"data:application/pdf;base64,{base64_string}",
                },
                {
                    "type": "input_text",
                    "text": "What is the first dragon in the book?",
                },
            ],
        },
    ]
)

print(response.output_text)
```

## Usage Considerations

### Token Usage

- Both extracted text and page images count toward token usage
- Consider pricing implications for large PDF files
- Monitor token consumption for cost optimization

### File Size Limitations

- Each file must be less than 10 MB
- Total content limit across all files in a single request is 32 MB
- Plan accordingly for large document processing

### Supported Models

- Only models that support both text and image inputs can accept PDF files
- Examples: gpt-4o, gpt-4o-mini, o1
- Check model features in the [models documentation](/docs/models)

### File Upload Purpose

- Upload files with `user_data` purpose for model inputs
- Other purposes available in the [Files API reference](/docs/api-reference/files/create)

---

# Advanced Prompting

Learn how to create effective prompts for production applications.

**Prompting** is the process of providing input to a model. The quality of your output often depends on how well you're able to prompt the model. This section covers advanced prompting techniques for production use.

## Prompts in the API

OpenAI provides a long-lived prompt object with versioning and templating shared by all users in a project. This design lets you manage, test, and reuse prompts across your team.

### Creating Reusable Prompts

1. **Start a prompt** in the [Playground](/playground)
2. **Add prompt variables** using `{{variable}}` syntax
3. **Use the prompt** in your API calls with `prompt_id`
4. **Create new versions** for iteration
5. **Roll back** if needed

**Example API usage:**

```bash
curl -s -X POST "https://api.openai.com/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "prompt": {
      "prompt_id": "pmpt_123",
      "variables": {
        "city": "San Francisco"
      }
    }
  }'
```

## Message Roles and Instructions

You can provide instructions with different levels of authority using the `instructions` parameter or **message roles**.

### Using Instructions Parameter

**JavaScript:**

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

### Using Message Roles

**JavaScript:**

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

## Prompt Template with Variables

**String Variables:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

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

console.log(response.output_text);
```

**File Input Variables:**

```javascript
import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI();

// Upload a PDF we will reference in the prompt variables
const file = await client.files.create({
  file: fs.createReadStream("draconomicon.pdf"),
  purpose: "user_data",
});

const response = await client.responses.create({
  model: "gpt-5",
  prompt: {
    id: "pmpt_abc123",
    variables: {
      topic: "Dragons",
      reference_pdf: {
        type: "input_file",
        file_id: file.id,
      },
    },
  },
});

console.log(response.output_text);
```

## Message Formatting with Markdown and XML

Use Markdown headers and XML tags to structure prompts:

```text
# Identity
You are a coding assistant that helps enforce the use of snake case
variables in JavaScript code, and writing code that will run in
Internet Explorer version 6.

# Instructions
* When defining variables, use snake case names (e.g. my_variable)
  instead of camel case names (e.g. myVariable).
* To support old browsers, declare variables using the older
  "var" keyword.
* Do not give responses with Markdown formatting, just return
  the code as requested.

# Examples
<user_query>
How do I declare a string variable for a first name?
</user_query>

<assistant_response>
var first_name = "Anna";
</assistant_response>
```

## Few-shot Learning

Few-shot learning lets you steer a model by including input/output examples in the prompt:

```text
# Identity
You are a helpful assistant that labels short product reviews as
Positive, Negative, or Neutral.

# Instructions
* Only output a single word in your response with no additional formatting
  or commentary.
* Your response should only be one of the words "Positive", "Negative", or
  "Neutral" depending on the sentiment of the product review.

# Examples
<product_review id="example-1">
I absolutely love this headphones --- sound quality is amazing!
</product_review>

<assistant_response id="example-1">
Positive
</assistant_response>

<product_review id="example-2">
Battery life is okay, but the ear pads feel cheap.
</product_review>

<assistant_response id="example-2">
Neutral
</assistant_response>

<product_review id="example-3">
Terrible customer service, I'll never buy from them again.
</product_review>

<assistant_response id="example-3">
Negative
</assistant_response>
```

## Including Relevant Context

Add additional context information the model can use to generate responses:

- **Proprietary data**: Information outside the model's training data
- **Specific resources**: Constrain responses to particular datasets
- **Retrieval-augmented generation (RAG)**: Query vector databases and include results

### Context Window Planning

- Models have different context window sizes (100k to 1M tokens)
- Use the [tokenizer tool](/tokenizer) to estimate token usage
- Structure prompts with static content at the beginning for [prompt caching](/docs/guides/prompt-caching)

## Model-Specific Prompting

### GPT-5 Models

GPT-5 models benefit from precise instructions:

- Define the agent's role clearly
- Provide structured tool use examples
- Require thorough testing for correctness
- Set Markdown standards for clean output

### Reasoning Models

Reasoning models work better with high-level guidance:

- Avoid chain-of-thought prompts (they reason internally)
- Use delimiters for clarity
- Try zero-shot first, then few-shot if needed
- Provide specific guidelines and constraints
- Be very specific about end goals

---

# Prompt Caching

Reduce latency and cost with prompt caching.

Prompt caching can reduce latency by up to 80% and input token costs by up to 90%. It works automatically on all your API requests with no additional fees.

## How Prompt Caching Works

1. **Cache Routing**: Requests are routed based on a hash of the prompt prefix
2. **Cache Lookup**: System checks if the prompt prefix exists in cache
3. **Cache Hit**: Uses cached result for faster response and lower cost
4. **Cache Miss**: Processes full prompt and caches for future requests

## Structuring Prompts for Caching

Cache hits are only possible for exact prefix matches. To maximize benefits:

- **Place static content first**: Instructions and examples at the beginning
- **Put variable content last**: User-specific information at the end
- **Use consistent ordering**: Maintain the same structure across requests

![Prompt Caching visualization](https://openaidevs.retool.com/api/file/8593d9bb-4edb-4eb6-bed9-62bfb98db5ee)

## Requirements and Features

- **Minimum length**: 1024 tokens or more
- **Cache increments**: 128-token increments (1024, 1152, 1280, etc.)
- **Cache duration**: 5-10 minutes of inactivity (up to 1 hour off-peak)
- **Automatic billing**: Cached tokens are billed at reduced rates

### Usage Response

```json
{
  "usage": {
    "prompt_tokens": 2006,
    "completion_tokens": 300,
    "total_tokens": 2306,
    "prompt_tokens_details": {
      "cached_tokens": 1920
    }
  }
}
```

## What Can Be Cached

- **Messages**: Complete messages array with system, user, and assistant interactions
- **Images**: Images in user messages (links or base64-encoded)
- **Tool use**: Both messages array and available tools
- **Structured outputs**: JSON schema serves as prefix to system message

## Best Practices

### Prompt Structure

```javascript
// Good: Static content first, dynamic content last
const response = await client.responses.create({
  model: "gpt-4o",
  input: [
    {
      role: "developer",
      content: staticInstructions  // This gets cached
    },
    {
      role: "user",
      content: `${staticContext}\n\nUser query: ${dynamicUserInput}`  // Only user query changes
    }
  ]
});
```

### Using prompt_cache_key

```javascript
const response = await client.responses.create({
  model: "gpt-4o",
  prompt_cache_key: "customer-service-v1",  // Consistent key for related requests
  input: [...],
});
```

### Cache Performance Monitoring

Track cache effectiveness:

- Monitor `cached_tokens` in response usage
- Measure latency improvements
- Calculate cost savings
- Adjust prompt structure based on cache hit rates

## Frequently Asked Questions

**Q: Is cached data shared between organizations?**
A: No, prompt caches are not shared between organizations.

**Q: Does caching affect the response output?**
A: No, cached prompts produce identical outputs to non-cached requests.

**Q: Can I manually clear the cache?**
A: No, caches are automatically cleared after periods of inactivity.

**Q: Do cached prompts count toward rate limits?**
A: Yes, cached requests still count toward TPM rate limits.

---

# Prompt Engineering

Enhance results with prompt engineering strategies.

Prompt engineering is the process of writing effective instructions for a model to consistently generate content that meets your requirements. This section covers advanced strategies for production applications.

## Choosing the Right Model

Consider these factors when selecting a model:

- **[Reasoning models](/docs/guides/reasoning)**: Excel at complex tasks and multi-step planning
- **GPT models**: Fast, cost-efficient, benefit from explicit instructions
- **Model size**: Balance intelligence, speed, and cost

When in doubt, [`gpt-4.1`](/docs/models/gpt-4.1) offers solid intelligence, speed, and cost effectiveness.

## Basic Text Generation

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5",
  input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);
```

### Understanding the Response Structure

The model's response contains an `output` array with various items:

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

**Important**: The `output` array often has more than one item! Don't assume text is at `output[0].content[0].text`.

## Advanced Prompting Techniques

### 1. Identity and Instructions

Structure your developer messages with:

```text
# Identity
You are a helpful coding assistant specialized in Python development.

# Instructions
* Write clean, well-documented code
* Follow PEP 8 style guidelines
* Include error handling where appropriate
* Provide brief explanations for complex logic

# Examples
<user_query>
Create a function to validate email addresses
</user_query>

<assistant_response>
import re

def validate_email(email):
    """
    Validate email address using regex pattern.

    Args:
        email (str): Email address to validate

    Returns:
        bool: True if valid, False otherwise
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None
</assistant_response>
```

### 2. Few-Shot Learning

Provide 3-5 diverse examples showing the pattern:

```javascript
const response = await client.responses.create({
  model: "gpt-4o",
  instructions: `You are a sentiment classifier. Classify text as Positive, Negative, or Neutral.

Examples:
- "I love this product!" → Positive
- "This is terrible quality" → Negative
- "It's okay, nothing special" → Neutral`,
  input: "The service was decent but could be better"
});
```

### 3. Chain of Thought (for GPT models)

Guide GPT models through step-by-step reasoning:

```javascript
const response = await client.responses.create({
  model: "gpt-4.1",
  instructions: "Think step by step to solve math problems.",
  input: "If a train travels 120 miles in 2 hours, then travels 180 miles in 3 hours, what's the average speed?"
});
```

### 4. Role-Based Instructions

Use different message roles for different authority levels:

```javascript
const response = await client.responses.create({
  model: "gpt-5",
  input: [
    {
      role: "developer",
      content: "You are a professional editor. Maintain formal tone and correct grammar."
    },
    {
      role: "user",
      content: "Please edit this text: 'Me and john went to store yesterday.'"
    }
  ]
});
```

## Model-Specific Strategies

### GPT-5 Prompting

GPT-5 is highly steerable and responds well to precise instructions:

**For Coding:**

```text
You are a world-class software engineer. Follow these principles:

1. Write clean, maintainable code
2. Use appropriate design patterns
3. Include comprehensive error handling
4. Provide clear documentation
5. Test your implementations

When building web applications, prefer:
- Tailwind CSS for styling
- Modern JavaScript (ES6+)
- Semantic HTML structure
- Responsive design patterns
```

**For Front-end Development:**

```text
You are an expert front-end developer. Create a responsive web application with:

Principles:
- Mobile-first design approach
- Accessible components (ARIA labels, semantic HTML)
- Clean, modern visual hierarchy
- Consistent spacing and typography

Tech Stack:
- Vanilla HTML/CSS/JavaScript (avoid frameworks unless requested)
- Tailwind CSS for styling
- Lucide icons for interface elements
- CSS Grid and Flexbox for layouts
```

### Reasoning Model Prompting

Reasoning models work better with high-level guidance:

```javascript
const response = await client.responses.create({
  model: "o3",
  reasoning: { effort: "medium" },
  input: "Analyze the potential risks and benefits of implementing a four-day work week in a technology company. Consider employee satisfaction, productivity, costs, and competitive advantages."
});
```

**Best practices for reasoning models:**

- Avoid "think step by step" prompts
- Provide high-level goals rather than detailed steps
- Use delimiters for complex inputs
- Be specific about success criteria
- Let the model determine the reasoning approach

## Production Prompting Patterns

### Template System

Create reusable prompt templates:

```javascript
class PromptTemplate {
  constructor(template) {
    this.template = template;
  }

  render(variables) {
    let prompt = this.template;
    Object.entries(variables).forEach(([key, value]) => {
      prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return prompt;
  }
}

const customerServiceTemplate = new PromptTemplate(`
# Identity
You are a helpful customer service representative for {{company_name}}.

# Instructions
- Be polite and professional
- Resolve issues when possible
- Escalate complex problems to human agents
- Follow company policies strictly

# Customer Context
Customer: {{customer_name}}
Issue: {{issue_type}}
History: {{customer_history}}

# Current Request
{{customer_message}}
`);

const prompt = customerServiceTemplate.render({
  company_name: "TechCorp",
  customer_name: "John Doe",
  issue_type: "Billing",
  customer_history: "Premium customer for 2 years",
  customer_message: "I was charged twice for my subscription"
});
```

### A/B Testing Prompts

Test different prompt versions:

```javascript
const promptVersions = {
  v1: {
    instructions: "You are a helpful assistant. Be concise and direct.",
    temperature: 0.3
  },
  v2: {
    instructions: "You are a friendly assistant. Be conversational and engaging.",
    temperature: 0.7
  }
};

async function testPrompt(version, userInput) {
  const config = promptVersions[version];
  return await client.responses.create({
    model: "gpt-4.1",
    instructions: config.instructions,
    input: userInput
  });
}
```

### Error Handling and Fallbacks

Implement robust error handling:

```javascript
async function robustPrompting(input, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await client.responses.create({
        model: "gpt-4.1",
        instructions: "You are a helpful assistant.",
        input: input,
        max_output_tokens: 1000
      });

      // Validate response quality
      if (response.output_text.length < 10) {
        throw new Error("Response too short");
      }

      return response;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        // Fallback to simpler prompt or different model
        return await client.responses.create({
          model: "gpt-4o-mini",
          input: `Please provide a simple answer to: ${input}`
        });
      }
    }
  }
}
```

## Evaluation and Improvement

### Building Evaluation Systems

```javascript
async function evaluatePrompt(prompt, testCases) {
  const results = [];

  for (const testCase of testCases) {
    const response = await client.responses.create({
      model: "gpt-4.1",
      instructions: prompt,
      input: testCase.input
    });

    // Simple scoring based on expected output
    const score = calculateSimilarity(response.output_text, testCase.expected);

    results.push({
      input: testCase.input,
      expected: testCase.expected,
      actual: response.output_text,
      score: score
    });
  }

  const averageScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
  return { averageScore, results };
}
```

### Iterative Improvement

1. **Baseline**: Start with simple, clear instructions
2. **Measure**: Use evaluation metrics for your specific use case
3. **Analyze**: Identify failure patterns in outputs
4. **Refine**: Adjust instructions, examples, or structure
5. **Test**: Validate improvements with evaluation suite
6. **Deploy**: Roll out improved prompts gradually

---

# Reasoning Best Practices

Learn when to use reasoning models and how they compare to GPT models.

OpenAI offers two types of models: [reasoning models](/docs/models#o4-mini) (o3 and o4-mini) and [GPT models](/docs/models#gpt-4.1) (like GPT-4.1). These model families behave differently and excel at different tasks.

## Reasoning Models vs. GPT Models

### Model Characteristics

**Reasoning Models ("The Planners")**

- Trained to think longer and harder about complex tasks
- Effective at strategizing and planning solutions
- Excel at making decisions with ambiguous information
- High accuracy and precision for expert-level domains
- Ideal for math, science, engineering, financial services, legal services

**GPT Models ("The Workhorses")**

- Lower-latency, more cost-efficient
- Designed for straightforward execution
- Handle explicitly defined tasks well
- Better when speed and cost are priorities

### How to Choose

Consider what's most important for your use case:

- **Speed and cost** → GPT models are faster and cost less
- **Executing well-defined tasks** → GPT models handle explicit tasks well
- **Accuracy and reliability** → Reasoning models are reliable decision makers
- **Complex problem-solving** → Reasoning models work through ambiguity and complexity

Most AI workflows use both models—reasoning models for agentic planning and decision-making, GPT models for task execution.

![GPT models pair well with o-series models](https://cdn.openai.com/API/docs/images/customer-service-example.png)

## When to Use Reasoning Models

### 1. Navigating Ambiguous Tasks

Reasoning models excel at taking limited information and understanding user intent:

> "o1's reasoning capabilities enable our multi-agent platform Matrix to produce exhaustive, well-formatted, and detailed responses when processing complex documents. For example, o1 enabled Matrix to easily identify baskets available under the restricted payments capacity in a credit agreement, with a basic prompt."
>
> —[Hebbia](https://www.hebbia.com/), AI knowledge platform for legal and finance

### 2. Finding a Needle in a Haystack

Great at understanding large amounts of unstructured information and pulling out relevant details:

> "To analyze a company's acquisition, o1 reviewed dozens of company documents—like contracts and leases—to find any tricky conditions that might affect the deal. The model identified a crucial 'change of control' provision in the footnotes: if the company was sold, it would have to pay off a $75 million loan immediately."
>
> —[Endex](https://endex.ai/), AI financial intelligence platform

### 3. Finding Relationships Across Large Datasets

Excellent at reasoning over complex documents and drawing parallels between documents:

> "Tax research requires synthesizing multiple documents to produce a final, cogent answer. We swapped GPT-4o for o1 and found that o1 was much better at reasoning over the interplay between documents to reach logical conclusions. We saw a 4x improvement in end-to-end performance."
>
> —[Blue J](https://www.bluej.com/), AI platform for tax research

### 4. Multistep Agentic Planning

Critical for agentic planning and strategy development:

> "We use o1 as the planner in our agent infrastructure, letting it orchestrate other models in the workflow. We find o1 is really good at selecting data types and breaking down big questions into smaller chunks, enabling other models to focus on execution."
>
> —[Argon AI](https://argon-ai.com/), AI knowledge platform

## Prompting Reasoning Models

### Best Practices

- **Avoid chain-of-thought prompts**: Models perform reasoning internally
- **Use delimiters for clarity**: Use markdown, XML tags, and section titles
- **Try zero shot first**: Often don't need few-shot examples
- **Provide specific guidelines**: Explicitly outline constraints
- **Be specific about end goals**: Give specific parameters for success
- **Enable markdown formatting**: Include "Formatting re-enabled" on first line

### Example Reasoning Prompt

```javascript
const response = await client.responses.create({
  model: "o3",
  reasoning: { effort: "high" },
  input: `
Analyze the financial implications of a company switching from annual to monthly billing cycles.

Consider:
- Cash flow impact
- Customer acquisition and retention
- Operational costs
- Revenue predictability
- Competitive positioning

Provide a comprehensive analysis with specific recommendations for implementation.
  `
});
```

## Cost and Performance Optimization

### Managing Reasoning Costs

With `o3` and `o4-mini` models, reasoning items are handled differently:

- **Previous models** (`o1`, `o3-mini`, `o1-mini`): Reasoning items always ignored in follow-up requests
- **Current models** (`o3`, `o4-mini`): Some reasoning items near function calls are included for better performance

### Recommendations

**For Best Results:**

```javascript
// Use Responses API with store=true and include reasoning items
const response = await client.responses.create({
  model: "o3",
  store: true,
  previous_response_id: previous_response.id,  // Includes reasoning context
  input: "Follow up question..."
});
```

**For Advanced Use Cases:**

- Include reasoning items between latest function call and previous user message
- This prevents model from restarting reasoning, improving performance and reducing token usage

**Chat Completions API:**

- Reasoning items never included in context
- Results in slightly degraded performance and higher token usage for complex agentic cases

## Production Integration Patterns

### Hybrid Model Architecture

```javascript
class AIWorkflow {
  constructor() {
    this.plannerModel = "o3";
    this.executorModel = "gpt-4.1";
  }

  async executeTask(userQuery) {
    // Step 1: Use reasoning model for planning
    const plan = await this.createPlan(userQuery);

    // Step 2: Use GPT model for execution
    const results = [];
    for (const step of plan.steps) {
      const result = await this.executeStep(step);
      results.push(result);
    }

    return this.compileFinalResult(results);
  }

  async createPlan(query) {
    return await client.responses.create({
      model: this.plannerModel,
      reasoning: { effort: "medium" },
      input: `
        Create a detailed execution plan for this request: ${query}

        Break down into specific, actionable steps that can be executed by other models.
        For each step, specify:
        - The exact task to perform
        - Required inputs
        - Expected outputs
        - Success criteria
      `
    });
  }

  async executeStep(step) {
    return await client.responses.create({
      model: this.executorModel,
      instructions: "You are an efficient task executor. Follow instructions precisely.",
      input: step.description
    });
  }
}
```

### Decision-Making System

```javascript
async function makeComplexDecision(context, options) {
  const decision = await client.responses.create({
    model: "o3",
    reasoning: { effort: "high" },
    input: `
      Context: ${context}

      Available options:
      ${options.map((opt, i) => `${i+1}. ${opt}`).join('\n')}

      Analyze each option considering:
      - Potential risks and benefits
      - Long-term implications
      - Resource requirements
      - Probability of success

      Recommend the best option with detailed justification.
    `
  });

  return decision;
}
```

---

# Reasoning Models

Explore advanced reasoning and problem-solving models.

**Reasoning models** like [GPT-5](/docs/models/gpt-5) are LLMs trained with reinforcement learning to perform reasoning. They think before they answer, producing a long internal chain of thought before responding to the user.

## Model Capabilities

Reasoning models excel at:

- **Complex problem solving**: Multi-step mathematical and logical problems
- **Coding**: Advanced algorithms, debugging, and architecture design
- **Scientific reasoning**: Research, analysis, and hypothesis formation
- **Multi-step planning**: Agentic workflows and strategic planning
- **Decision making**: Analysis of complex scenarios with multiple variables

## Available Models

| Model          | Size   | Speed    | Cost   | Best For                        |
| -------------- | ------ | -------- | ------ | ------------------------------- |
| **gpt-5**      | Large  | Slower   | Higher | Complex analysis, broad domains |
| **gpt-5-mini** | Medium | Moderate | Medium | Balanced performance and cost   |
| **gpt-5-nano** | Small  | Faster   | Lower  | Simple reasoning tasks          |

## Getting Started

### Basic Usage

**JavaScript:**

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5",
  reasoning: { effort: "medium" },
  input: [
    {
      role: "user",
      content: "Write a bash script that takes a matrix represented as a string with format '[1,2],[3,4],[5,6]' and prints the transpose in the same format.",
    },
  ],
});

console.log(response.output_text);
```

**Python:**

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    reasoning={"effort": "medium"},
    input=[
        {
            "role": "user",
            "content": "Write a bash script that takes a matrix represented as a string with format '[1,2],[3,4],[5,6]' and prints the transpose in the same format."
        }
    ]
)

print(response.output_text)
```

### Reasoning Effort Levels

The `reasoning.effort` parameter controls how many reasoning tokens the model generates:

- **`low`**: Favors speed and economical token usage
- **`medium`**: Balance between speed and reasoning accuracy (default)
- **`high`**: Favors more complete reasoning and thorough analysis

## How Reasoning Works

### Reasoning Tokens

Reasoning models introduce **reasoning tokens** in addition to input and output tokens:

1. **Input tokens**: Your prompt and context
2. **Reasoning tokens**: Internal "thinking" (not visible via API)
3. **Output tokens**: The visible response

![Reasoning tokens aren't retained in context](https://cdn.openai.com/API/docs/images/context-window.png)

### Token Usage and Billing

```json
{
  "usage": {
    "input_tokens": 75,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 1186,
    "output_tokens_details": {
      "reasoning_tokens": 1024
    },
    "total_tokens": 1261
  }
}
```

- Reasoning tokens are billed as [output tokens](https://openai.com/api/pricing)
- They occupy space in the context window but are discarded after generation
- Use `max_output_tokens` to limit total token generation (reasoning + output)

## Advanced Features

### Reasoning Summaries

View a summary of the model's reasoning process:

**JavaScript:**

```javascript
const response = await openai.responses.create({
  model: "gpt-5",
  input: "What is the capital of France?",
  reasoning: {
    effort: "low",
    summary: "auto",
  },
});

console.log(response.output);
```

### Response Structure with Summary

```json
[
  {
    "id": "rs_6876cf02e0bc8192b74af0fb64b715ff06fa2fcced15a5ac",
    "type": "reasoning",
    "summary": [
      {
        "type": "summary_text",
        "text": "**Answering a simple question**\n\nI'm looking at a straightforward question: the capital of France is Paris. It's a well-known fact, and I want to keep it brief and to the point."
      }
    ]
  },
  {
    "id": "msg_6876cf054f58819284ecc1058131305506fa2fcced15a5ac",
    "type": "message",
    "role": "assistant",
    "content": [
      {
        "type": "output_text",
        "text": "The capital of France is Paris."
      }
    ]
  }
]
```

### Summary Options

- **`auto`**: Most detailed summarizer available for the model
- **`detailed`**: Comprehensive reasoning breakdown
- **`concise`**: Brief summary of reasoning process

## Practical Examples

### Code Refactoring

**JavaScript:**

```javascript
const prompt = `
Instructions:
- Given the React component below, change it so that nonfiction books have red text.
- Return only the code in your reply
- Do not include any additional formatting, such as markdown code blocks
- For formatting, use four space tabs, and do not allow any lines of code to exceed 80 columns

const books = [
  { title: 'Dune', category: 'fiction', id: 1 },
  { title: 'Frankenstein', category: 'fiction', id: 2 },
  { title: 'Moneyball', category: 'nonfiction', id: 3 },
];

export default function BookList() {
  const listItems = books.map(book =>
    <li>
      {book.title}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
`.trim();

const response = await openai.responses.create({
  model: "gpt-5",
  input: [{ role: "user", content: prompt }],
});

console.log(response.output_text);
```

### Project Planning

**Python:**

```python
prompt = """
I want to build a Python app that takes user questions and looks them up in a database where they are mapped to answers. If there is close match, it retrieves the matched answer. If there isn't, it asks the user to provide an answer and stores the question/answer pair in the database. Make a plan for the directory structure you'll need, then return each file in full. Only supply your reasoning at the beginning and end, not throughout the code.
"""

response = client.responses.create(
    model="gpt-5",
    input=[{"role": "user", "content": prompt}]
)

print(response.output_text)
```

### Scientific Research

**JavaScript:**

```javascript
const prompt = `
What are three compounds we should consider investigating to advance research into new antibiotics? Why should we consider them?
`;

const response = await openai.responses.create({
  model: "gpt-5",
  input: [{ role: "user", content: prompt }],
});

console.log(response.output_text);
```

## Production Considerations

### Context Window Management

- Ensure enough space for reasoning tokens (can be thousands)
- Monitor token usage in the `usage` object
- Plan for variable reasoning token consumption

### Cost Control

```javascript
// Limit total tokens generated
const response = await client.responses.create({
  model: "gpt-5",
  reasoning: { effort: "low" },
  max_output_tokens: 2000,  // Includes reasoning + output tokens
  input: "Analyze this complex problem..."
});
```

### Model Selection Strategy

```javascript
function selectReasoningModel(taskComplexity) {
  if (taskComplexity === 'simple') {
    return { model: 'gpt-5-nano', effort: 'low' };
  } else if (taskComplexity === 'moderate') {
    return { model: 'gpt-5-mini', effort: 'medium' };
  } else {
    return { model: 'gpt-5', effort: 'high' };
  }
}

const config = selectReasoningModel(analyzeComplexity(userQuery));
const response = await client.responses.create({
  model: config.model,
  reasoning: { effort: config.effort },
  input: userQuery
});
```

### Error Handling

```javascript
async function robustReasoning(input, maxRetries = 2) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await client.responses.create({
        model: "gpt-5",
        reasoning: { effort: "medium" },
        input: input,
        max_output_tokens: 4000
      });

      // Validate reasoning quality
      if (response.usage.output_tokens_details.reasoning_tokens < 50) {
        console.warn("Low reasoning token usage, may indicate insufficient thinking");
      }

      return response;
    } catch (error) {
      if (error.message.includes("context_length_exceeded")) {
        // Retry with lower effort or shorter input
        return await client.responses.create({
          model: "gpt-5",
          reasoning: { effort: "low" },
          input: input.substring(0, input.length / 2),
          max_output_tokens: 2000
        });
      }

      if (attempt === maxRetries) throw error;
    }
  }
}
```

## Integration Patterns

### Reasoning + Execution Pipeline

```javascript
class ReasoningPipeline {
  async solve(problem) {
    // Step 1: Deep reasoning about the problem
    const analysis = await client.responses.create({
      model: "gpt-5",
      reasoning: { effort: "high", summary: "detailed" },
      input: `Analyze this problem and create a detailed solution plan: ${problem}`
    });

    // Step 2: Execute the plan with fast model
    const execution = await client.responses.create({
      model: "gpt-4.1",
      instructions: "Follow the plan exactly as specified.",
      input: `Plan: ${analysis.output_text}\n\nExecute this plan step by step.`
    });

    return {
      reasoning: analysis.output.find(item => item.type === 'reasoning')?.summary,
      solution: execution.output_text
    };
  }
}
```

---

## Conclusion

This comprehensive Run and Scale guide provides everything you need to successfully deploy and scale OpenAI API applications in production. From basic conversation management to advanced reasoning model integration, you now have the tools and knowledge to build robust, scalable AI applications.

### Key Takeaways

- **State Management**: Choose between manual history tracking, Conversations API, or previous_response_id based on your needs
- **Performance Optimization**: Use background processing, streaming, and prompt caching for better user experience
- **Production Patterns**: Implement proper webhooks, file processing, and monitoring for reliable operations
- **Model Selection**: Combine reasoning models for planning with GPT models for execution
- **Cost Management**: Use appropriate effort levels, caching, and model selection strategies

### Next Steps

1. **Start with basics**: Implement conversation state management for your use case
2. **Add optimization**: Integrate streaming and caching for better performance
3. **Scale up**: Implement background processing and webhooks for production reliability
4. **Advanced features**: Explore reasoning models and complex agentic workflows
5. **Monitor and optimize**: Track performance metrics and continuously improve

### Production Readiness Checklist

- [ ] **Authentication**: Secure API key management and rotation
- [ ] **Error Handling**: Comprehensive error logging and recovery
- [ ] **Rate Limiting**: Proper backoff strategies and request queuing
- [ ] **Monitoring**: Performance metrics, cost tracking, and alerting
- [ ] **Scaling**: Load balancing and horizontal scaling strategies
- [ ] **Security**: Input validation and data privacy measures
- [ ] **Testing**: Evaluation systems and A/B testing frameworks

The OpenAI ecosystem is constantly evolving with new features and capabilities. This guide serves as your foundation for building production-ready applications that can scale and adapt as your needs grow.

For additional support and resources, visit the [OpenAI Developer Platform](https://platform.openai.com/docs) and join the [OpenAI Developer Community](https://community.openai.com/).
