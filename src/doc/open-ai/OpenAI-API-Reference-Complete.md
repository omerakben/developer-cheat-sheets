# OpenAI API Reference - Complete Guide

## Table of Contents

1. [API Reference Overview](#api-reference-overview)
2. [Authentication and Setup](#authentication-and-setup)
3. [Responses API](#responses-api)
4. [Conversations API](#conversations-api)
5. [Videos API](#videos-api)
6. [Streaming Events](#streaming-events)
7. [Webhook Events](#webhook-events)
8. [Audio API](#audio-api)
9. [Images API](#images-api)
10. [Embeddings API](#embeddings-api)
11. [ChatKit Beta](#chatkit-beta)
12. [Evaluations API](#evaluations-api)
13. [Fine-tuning API](#fine-tuning-api)
14. [Graders API](#graders-api)
15. [Batch API](#batch-api)
16. [Files API](#files-api)
17. [Uploads API](#uploads-api)
18. [Models API](#models-api)
19. [Moderations API](#moderations-api)
20. [Vector Stores API](#vector-stores-api)
21. [Containers API](#containers-api)
22. [Realtime API](#realtime-api)

---

# API Reference Overview

Complete reference for the OpenAI platform APIs.

This API reference describes the RESTful, streaming, and realtime APIs you can use to interact with the OpenAI platform. REST APIs are usable via HTTP in any environment that supports HTTP requests. Language-specific SDKs are listed on the libraries page.

## API Categories

- **Core APIs**: Responses, Conversations, Audio, Images, Embeddings
- **Advanced Features**: Videos, Fine-tuning, Evaluations, Batch processing
- **Developer Tools**: Moderations, Vector stores, File management
- **Real-time Features**: Streaming, Webhooks, Realtime API
- **Integration Tools**: ChatKit, Containers, MCP servers

## Base URL

All API endpoints use the base URL: `https://api.openai.com/v1/`

## Response Format

The OpenAI API uses JSON for requests and responses. All timestamps are returned in Unix time format.

---

# Authentication and Setup

Secure API access using API keys and organization settings.

## API Key Authentication

The OpenAI API uses API keys for authentication. Create, manage, and learn more about API keys in your organization settings.

**Important:** Your API key is a secret! Do not share it with others or expose it in any client-side code (browsers, apps). API keys should be securely loaded from an environment variable or key management service on the server.

### Basic Authentication

API keys should be provided via HTTP Bearer authentication:

```bash
Authorization: Bearer OPENAI_API_KEY
```

### Organization and Project Headers

If you belong to multiple organizations or access projects through a legacy user API key, pass headers to specify which organization and project to use:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Organization: org-SypLp0dHByhVoYSjP5t8Idd2" \
  -H "OpenAI-Project: $PROJECT_ID"
```

Usage from these API requests counts as usage for the specified organization and project. Organization IDs can be found on your organization settings page. Project IDs can be found on your general settings page by selecting the specific project.

## Debugging Requests

HTTP response headers contain useful debugging information:

### API Meta Information

- `openai-organization`: The organization associated with the request
- `openai-processing-ms`: Time taken processing your API request
- `openai-version`: REST API version used for this request
- `x-request-id`: Unique identifier for this API request (used in troubleshooting)

### Rate Limiting Information

- `x-ratelimit-limit-requests`
- `x-ratelimit-limit-tokens`
- `x-ratelimit-remaining-requests`
- `x-ratelimit-remaining-tokens`
- `x-ratelimit-reset-requests`
- `x-ratelimit-reset-tokens`

OpenAI recommends logging request IDs in production deployments for more efficient troubleshooting with support.

## Backward Compatibility

OpenAI is committed to providing stability by avoiding breaking changes in major API versions. This includes:

- The REST API (currently v1)
- First-party SDKs (semantic versioning)
- Model families (like gpt-4o or o4-mini)

### Backwards-Compatible Changes

- Adding new resources (URLs) to the REST API and SDKs
- Adding new optional API parameters
- Adding new properties to JSON response objects
- Changing the order of properties in JSON responses
- Changing the length or format of opaque strings
- Adding new event types (streaming or Realtime API)

---

# Responses API

OpenAI's most advanced interface for generating model responses.

The Responses API supports text and image inputs with text outputs, creates stateful interactions using previous responses as input, and extends model capabilities with built-in tools for file search, web search, computer use, and more.

## Create a Model Response

**POST** `https://api.openai.com/v1/responses`

Creates a model response with text or image inputs to generate text or JSON outputs.

### Request Parameters

| Parameter              | Type          | Description                                          |
| ---------------------- | ------------- | ---------------------------------------------------- |
| `background`           | boolean       | Whether to run the model response in the background  |
| `conversation`         | string/object | The conversation this response belongs to            |
| `include`              | array         | Additional output data to include in response        |
| `input`                | string/array  | Text, image, or file inputs to the model             |
| `instructions`         | string        | System (developer) message inserted into context     |
| `max_output_tokens`    | integer       | Upper bound for tokens generated                     |
| `max_tool_calls`       | integer       | Maximum total calls to built-in tools                |
| `metadata`             | map           | Key-value pairs attached to the object               |
| `model`                | string        | Model ID (e.g., gpt-4o, o3)                          |
| `parallel_tool_calls`  | boolean       | Allow parallel tool calls                            |
| `previous_response_id` | string        | ID of previous response for multi-turn conversations |
| `prompt`               | object        | Reference to prompt template and variables           |
| `reasoning`            | object        | Configuration for reasoning models                   |
| `tools`                | array         | Tools the model may call                             |
| `stream`               | boolean       | Stream response data using server-sent events        |

### Basic Text Generation

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4.1",
    "input": "Tell me a three sentence bedtime story about a unicorn."
  }'
```

### Image Input Analysis

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
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
            "image_url": "https://example.com/image.jpg"
          }
        ]
      }
    ]
  }'
```

### Function Calling

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "input": "What is the weather like in Boston today?",
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_current_weather",
          "description": "Get current weather for a location",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "City and state, e.g. San Francisco, CA"
              }
            },
            "required": ["location"]
          }
        }
      }
    ]
  }'
```

### Web Search Tool

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5",
    "tools": [{"type": "web_search"}],
    "input": "What was a positive news story from today?"
  }'
```

## Response Management

### Get a Model Response

**GET** `https://api.openai.com/v1/responses/{response_id}`

Retrieves a model response with the given ID.

### Delete a Model Response

**DELETE** `https://api.openai.com/v1/responses/{response_id}`

Deletes a model response with the given ID.

### Cancel a Response

**POST** `https://api.openai.com/v1/responses/{response_id}/cancel`

Cancels a model response (only for background responses).

### List Input Items

**GET** `https://api.openai.com/v1/responses/{response_id}/input_items`

Returns a list of input items for a given response.

## Response Object Structure

```json
{
  "id": "resp_67ccd2bed1ec8190b14f964abc0542670bb6a6b452d3795b",
  "object": "response",
  "created_at": 1741476542,
  "status": "completed",
  "model": "gpt-4.1-2025-04-14",
  "output": [
    {
      "type": "message",
      "id": "msg_67ccd2bf17f0819081ff3bb2cf6508e60bb6a6b452d3795b",
      "status": "completed",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "In a peaceful grove beneath a silver moon...",
          "annotations": []
        }
      ]
    }
  ],
  "usage": {
    "input_tokens": 36,
    "output_tokens": 87,
    "total_tokens": 123
  }
}
```

---

# Conversations API

Create and manage conversations to store conversation state across Response API calls.

## Create a Conversation

**POST** `https://api.openai.com/v1/conversations`

Create a conversation with optional initial items.

```bash
curl https://api.openai.com/v1/conversations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "metadata": {"topic": "demo"},
    "items": [
      {
        "type": "message",
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'
```

## Conversation Management

### Retrieve a Conversation

**GET** `https://api.openai.com/v1/conversations/{conversation_id}`

### Update a Conversation

**POST** `https://api.openai.com/v1/conversations/{conversation_id}`

Update conversation metadata.

### Delete a Conversation

**DELETE** `https://api.openai.com/v1/conversations/{conversation_id}`

Delete a conversation (items are not deleted).

## Conversation Items

### List Items

**GET** `https://api.openai.com/v1/conversations/{conversation_id}/items`

List all items for a conversation.

### Create Items

**POST** `https://api.openai.com/v1/conversations/{conversation_id}/items`

Create items in a conversation (up to 20 at once).

```bash
curl https://api.openai.com/v1/conversations/conv_123/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "items": [
      {
        "type": "message",
        "role": "user",
        "content": [{"type": "input_text", "text": "Hello!"}]
      }
    ]
  }'
```

### Retrieve an Item

**GET** `https://api.openai.com/v1/conversations/{conversation_id}/items/{item_id}`

### Delete an Item

**DELETE** `https://api.openai.com/v1/conversations/{conversation_id}/items/{item_id}`

---

# Videos API

Generate and manage videos using text prompts.

## Create Video

**POST** `https://api.openai.com/v1/videos`

Create a video from a text prompt.

```bash
curl https://api.openai.com/v1/videos \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "model=sora-2" \
  -F "prompt=A calico cat playing a piano on stage"
```

### Request Parameters

| Parameter         | Type   | Description                              |
| ----------------- | ------ | ---------------------------------------- |
| `prompt`          | string | Text prompt describing the video         |
| `input_reference` | file   | Optional image or video reference        |
| `model`           | string | Video generation model (default: sora-2) |
| `seconds`         | string | Clip duration in seconds (default: 4)    |
| `size`            | string | Output resolution (default: 720x1280)    |

## Video Management

### Remix Video

**POST** `https://api.openai.com/v1/videos/{video_id}/remix`

Create a remix of an existing video.

```bash
curl -X POST https://api.openai.com/v1/videos/video_123/remix \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Extend the scene with the cat taking a bow to the cheering audience"
  }'
```

### List Videos

**GET** `https://api.openai.com/v1/videos`

### Retrieve Video

**GET** `https://api.openai.com/v1/videos/{video_id}`

### Delete Video

**DELETE** `https://api.openai.com/v1/videos/{video_id}`

### Retrieve Video Content

**GET** `https://api.openai.com/v1/videos/{video_id}/content`

Download the rendered video content.

## Video Job Object

```json
{
  "id": "video_123",
  "object": "video",
  "model": "sora-2",
  "status": "completed",
  "progress": 100,
  "created_at": 1712697600,
  "completed_at": 1712698200,
  "size": "1024x1808",
  "seconds": "8",
  "quality": "standard"
}
```

---

# Streaming Events

Server-sent events for real-time response streaming.

When you create a Response with `stream: true`, the server emits events as the response is generated.

## Core Response Events

### response.created

Emitted when a response is created.

```json
{
  "type": "response.created",
  "response": {
    "id": "resp_67ccfcdd16748190a91872c75d38539e09e4d4aac714747c",
    "status": "in_progress",
    "model": "gpt-4o-2024-08-06"
  },
  "sequence_number": 1
}
```

### response.completed

Emitted when the model response is complete.

### response.failed

Emitted when a response fails.

### response.incomplete

Emitted when a response finishes as incomplete.

## Output Events

### response.output_item.added

Emitted when a new output item is added.

### response.output_item.done

Emitted when an output item is marked done.

### response.output_text.delta

Emitted for incremental text updates.

```json
{
  "type": "response.output_text.delta",
  "item_id": "msg_123",
  "output_index": 0,
  "content_index": 0,
  "delta": "In",
  "sequence_number": 1
}
```

### response.output_text.done

Emitted when text content is finalized.

## Tool Call Events

### response.function_call_arguments.delta

Emitted for partial function call arguments.

### response.function_call_arguments.done

Emitted when function call arguments are finalized.

### response.web_search_call.in_progress

Emitted when a web search call is initiated.

### response.web_search_call.completed

Emitted when a web search call is completed.

### response.file_search_call.searching

Emitted when a file search is currently searching.

### response.code_interpreter_call.interpreting

Emitted when code interpreter is executing code.

## Reasoning Events

### response.reasoning_summary_text.delta

Emitted for reasoning summary text updates.

### response.reasoning_text.delta

Emitted for reasoning content updates.

## Image Generation Events

### response.image_generation_call.generating

Emitted when image generation is in progress.

### response.image_generation_call.partial_image

Emitted when partial image is available.

### response.image_generation_call.completed

Emitted when image generation is complete.

---

# Webhook Events

HTTP requests sent by OpenAI when certain events occur.

Webhooks notify your application about events like response completion, batch processing, and fine-tuning job status changes.

## Response Events

### response.completed

Sent when a background response has been completed.

```json
{
  "id": "evt_abc123",
  "type": "response.completed",
  "created_at": 1719168000,
  "data": {
    "id": "resp_abc123"
  }
}
```

### response.cancelled

Sent when a background response has been cancelled.

### response.failed

Sent when a background response has failed.

### response.incomplete

Sent when a background response has been interrupted.

## Batch Events

### batch.completed

Sent when a batch API request has been completed.

### batch.cancelled

Sent when a batch API request has been cancelled.

### batch.failed

Sent when a batch API request has failed.

### batch.expired

Sent when a batch API request has expired.

## Fine-tuning Events

### fine_tuning.job.succeeded

Sent when a fine-tuning job has succeeded.

### fine_tuning.job.failed

Sent when a fine-tuning job has failed.

### fine_tuning.job.cancelled

Sent when a fine-tuning job has been cancelled.

## Evaluation Events

### eval.run.succeeded

Sent when an evaluation run has succeeded.

### eval.run.failed

Sent when an evaluation run has failed.

### eval.run.canceled

Sent when an evaluation run has been canceled.

## Realtime Events

### realtime.call.incoming

Sent when Realtime API receives an incoming SIP call.

---

# Audio API

Convert speech to text and text to speech.

## Create Transcription

**POST** `https://api.openai.com/v1/audio/transcriptions`

Transcribe audio into the input language.

```bash
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/audio.mp3" \
  -F model="whisper-1"
```

### Parameters

| Parameter         | Type   | Description                              |
| ----------------- | ------ | ---------------------------------------- |
| `file`            | file   | Audio file to transcribe                 |
| `model`           | string | Model to use (whisper-1)                 |
| `language`        | string | Language of input audio                  |
| `prompt`          | string | Optional text to guide the model's style |
| `response_format` | string | Format of transcript output              |
| `temperature`     | number | Sampling temperature (0 to 1)            |

## Create Translation

**POST** `https://api.openai.com/v1/audio/translations`

Translate audio into English.

## Create Speech

**POST** `https://api.openai.com/v1/audio/speech`

Generate audio from input text.

```bash
curl https://api.openai.com/v1/audio/speech \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "The quick brown fox jumped over the lazy dog.",
    "voice": "alloy"
  }' \
  --output speech.mp3
```

### Parameters

| Parameter         | Type   | Description                                            |
| ----------------- | ------ | ------------------------------------------------------ |
| `model`           | string | TTS model (tts-1 or tts-1-hd)                          |
| `input`           | string | Text to generate audio for                             |
| `voice`           | string | Voice to use (alloy, echo, fable, onyx, nova, shimmer) |
| `response_format` | string | Audio format (mp3, opus, aac, flac)                    |
| `speed`           | number | Speed of generated audio (0.25 to 4.0)                 |

---

# Images API

Generate, edit, and create variations of images.

## Create Image

**POST** `https://api.openai.com/v1/images/generations`

Generate an image from a text prompt.

```bash
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A cute baby sea otter",
    "n": 1,
    "size": "1024x1024"
  }'
```

### Parameters

| Parameter         | Type    | Description                                |
| ----------------- | ------- | ------------------------------------------ |
| `prompt`          | string  | Text description of desired image          |
| `model`           | string  | Model to use (dall-e-2, dall-e-3)          |
| `n`               | integer | Number of images to generate (1-10)        |
| `quality`         | string  | Quality of image (standard, hd)            |
| `response_format` | string  | Format of response (url, b64_json)         |
| `size`            | string  | Size of generated images                   |
| `style`           | string  | Style of generated images (vivid, natural) |
| `user`            | string  | Unique identifier for end-user             |

## Create Image Edit

**POST** `https://api.openai.com/v1/images/edits`

Edit an image with a mask and prompt.

```bash
curl https://api.openai.com/v1/images/edits \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F image="@otter.png" \
  -F mask="@mask.png" \
  -F prompt="A cute baby sea otter wearing a beret" \
  -F n=2 \
  -F size="1024x1024"
```

## Create Image Variation

**POST** `https://api.openai.com/v1/images/variations`

Create variations of an existing image.

```bash
curl https://api.openai.com/v1/images/variations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F image="@otter.png" \
  -F n=2 \
  -F size="1024x1024"
```

## Image Response Object

```json
{
  "created": 1589478378,
  "data": [
    {
      "url": "https://...",
      "revised_prompt": "A cute baby sea otter..."
    }
  ]
}
```

---

# Embeddings API

Create vector representations of text for similarity search and clustering.

## Create Embeddings

**POST** `https://api.openai.com/v1/embeddings`

Get a vector representation of a given input.

```bash
curl https://api.openai.com/v1/embeddings \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "The food was delicious and the waiter...",
    "model": "text-embedding-3-small"
  }'
```

### Parameters

| Parameter         | Type         | Description                                 |
| ----------------- | ------------ | ------------------------------------------- |
| `input`           | string/array | Input text(s) to embed                      |
| `model`           | string       | Embedding model ID                          |
| `encoding_format` | string       | Format to return embeddings (float, base64) |
| `dimensions`      | integer      | Number of dimensions in output embeddings   |
| `user`            | string       | Unique identifier for end-user              |

### Available Models

- **text-embedding-3-large**: 3072 dimensions, highest accuracy
- **text-embedding-3-small**: 1536 dimensions, good performance
- **text-embedding-ada-002**: 1536 dimensions, legacy model

## Embedding Response Object

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        0.0023064255,
        -0.009327292,
        // ... (3072 dimensions total for text-embedding-3-large)
      ],
      "index": 0
    }
  ],
  "model": "text-embedding-3-large",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

---

# ChatKit Beta

Embed conversational AI directly into your applications.

ChatKit provides pre-built UI components for integrating OpenAI's conversational AI capabilities into web applications with minimal setup.

## Getting Started

Include ChatKit in your application:

```html
<script src="https://cdn.jsdelivr.net/npm/@openai/chatkit@latest/dist/chatkit.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@openai/chatkit@latest/dist/chatkit.css">
```

## Basic Usage

```javascript
import { ChatKit } from '@openai/chatkit';

const chatkit = new ChatKit({
  apiKey: 'your-api-key',
  model: 'gpt-4o',
  container: '#chat-container'
});

chatkit.render();
```

## Configuration Options

```javascript
const chatkit = new ChatKit({
  apiKey: 'your-api-key',
  model: 'gpt-4o',
  container: '#chat-container',
  theme: {
    primaryColor: '#007bff',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Inter, sans-serif'
  },
  placeholder: 'Ask me anything...',
  maxHeight: '500px',
  tools: ['web_search', 'file_search'],
  onMessage: (message) => {
    console.log('New message:', message);
  }
});
```

## Advanced Features

### Custom Instructions

```javascript
chatkit.setInstructions('You are a helpful customer service assistant.');
```

### File Uploads

```javascript
chatkit.enableFileUpload({
  maxFileSize: '10MB',
  allowedTypes: ['image/*', '.pdf', '.txt']
});
```

### Tool Integration

```javascript
chatkit.addTool({
  type: 'function',
  function: {
    name: 'get_weather',
    description: 'Get current weather',
    parameters: {
      type: 'object',
      properties: {
        location: { type: 'string' }
      }
    }
  }
});
```

---

# Evaluations API

Create and manage evaluations to test model performance.

## Create Evaluation

**POST** `https://api.openai.com/v1/evals`

Create a new evaluation to test model performance.

```bash
curl https://api.openai.com/v1/evals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "name": "Customer Support Quality Test",
    "description": "Evaluate chatbot responses for customer support scenarios",
    "testing_criteria": [
      {
        "name": "Helpfulness",
        "description": "How helpful is the response to the user"
      },
      {
        "name": "Accuracy",
        "description": "Is the information provided accurate"
      }
    ]
  }'
```

## Run Evaluation

**POST** `https://api.openai.com/v1/evals/{eval_id}/runs`

Execute an evaluation run.

```bash
curl https://api.openai.com/v1/evals/eval_123/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "data_source": "file-abc123"
  }'
```

## Evaluation Management

### List Evaluations

**GET** `https://api.openai.com/v1/evals`

### Retrieve Evaluation

**GET** `https://api.openai.com/v1/evals/{eval_id}`

### Update Evaluation

**POST** `https://api.openai.com/v1/evals/{eval_id}`

### Delete Evaluation

**DELETE** `https://api.openai.com/v1/evals/{eval_id}`

## Evaluation Runs

### List Runs

**GET** `https://api.openai.com/v1/evals/{eval_id}/runs`

### Retrieve Run

**GET** `https://api.openai.com/v1/evals/{eval_id}/runs/{run_id}`

### Cancel Run

**POST** `https://api.openai.com/v1/evals/{eval_id}/runs/{run_id}/cancel`

---

# Fine-tuning API

Customize models for your specific use case.

## Create Fine-tuning Job

**POST** `https://api.openai.com/v1/fine_tuning/jobs`

Create a fine-tuning job to customize a model with your training data.

```bash
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-BK7bzQj3FfZFXr7DbL6xJwfo",
    "model": "gpt-4o-mini"
  }'
```

### Parameters

| Parameter         | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `model`           | string | Name of model to fine-tune              |
| `training_file`   | string | ID of uploaded training file            |
| `validation_file` | string | ID of uploaded validation file          |
| `method`          | object | Fine-tuning method configuration        |
| `hyperparameters` | object | Training hyperparameters                |
| `suffix`          | string | Custom suffix for fine-tuned model name |
| `integrations`    | array  | External integrations to enable         |

## Fine-tuning Job Management

### List Fine-tuning Jobs

**GET** `https://api.openai.com/v1/fine_tuning/jobs`

```bash
curl https://api.openai.com/v1/fine_tuning/jobs?limit=10 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Retrieve Fine-tuning Job

**GET** `https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}`

### Cancel Fine-tuning Job

**POST** `https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel`

### List Fine-tuning Events

**GET** `https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/events`

Get status updates for a fine-tuning job.

### List Checkpoints

**GET** `https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints`

List checkpoints for a fine-tuning job.

## Fine-tuning Job Object

```json
{
  "object": "fine_tuning.job",
  "id": "ftjob-abc123",
  "model": "gpt-4o-mini-2024-07-18",
  "created_at": 1721764800,
  "fine_tuned_model": "ft:gpt-4o-mini:org:suffix:abc123",
  "status": "succeeded",
  "training_file": "file-abc123",
  "validation_file": null,
  "result_files": ["file-xyz789"],
  "trained_tokens": 5768,
  "method": {
    "type": "supervised",
    "supervised": {
      "hyperparameters": {
        "n_epochs": 4,
        "batch_size": 1,
        "learning_rate_multiplier": 1.0
      }
    }
  }
}
```

---

# Graders API

Evaluate and score model outputs automatically.

## Create Grader

**POST** `https://api.openai.com/v1/graders`

Create a grader to evaluate model responses.

```bash
curl https://api.openai.com/v1/graders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "name": "Response Quality Grader",
    "instructions": "Grade responses on helpfulness, accuracy, and clarity",
    "grading_model": "gpt-4o"
  }'
```

## Grade Response

**POST** `https://api.openai.com/v1/graders/{grader_id}/grade`

Grade a response using the specified grader.

```bash
curl https://api.openai.com/v1/graders/grader_123/grade \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "input": "What is the capital of France?",
    "output": "The capital of France is Paris.",
    "expected_output": "Paris is the capital of France."
  }'
```

## Grader Management

### List Graders

**GET** `https://api.openai.com/v1/graders`

### Retrieve Grader

**GET** `https://api.openai.com/v1/graders/{grader_id}`

### Update Grader

**POST** `https://api.openai.com/v1/graders/{grader_id}`

### Delete Grader

**DELETE** `https://api.openai.com/v1/graders/{grader_id}`

---

# Batch API

Process multiple API requests efficiently with asynchronous batch processing.

## Create Batch

**POST** `https://api.openai.com/v1/batches`

Create a batch of API requests for asynchronous processing.

```bash
curl https://api.openai.com/v1/batches \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "input_file_id": "file-abc123",
    "endpoint": "/v1/responses",
    "completion_window": "24h"
  }'
```

### Parameters

| Parameter           | Type   | Description                             |
| ------------------- | ------ | --------------------------------------- |
| `input_file_id`     | string | ID of uploaded JSONL file with requests |
| `endpoint`          | string | API endpoint for batch requests         |
| `completion_window` | string | Time frame for batch completion         |
| `metadata`          | map    | Optional metadata for the batch         |

### Input File Format

Each line in the JSONL file should contain a batch request:

```json
{"custom_id": "request-1", "method": "POST", "url": "/v1/responses", "body": {"model": "gpt-4o", "input": "Hello world"}}
{"custom_id": "request-2", "method": "POST", "url": "/v1/responses", "body": {"model": "gpt-4o", "input": "How are you?"}}
```

## Batch Management

### List Batches

**GET** `https://api.openai.com/v1/batches`

### Retrieve Batch

**GET** `https://api.openai.com/v1/batches/{batch_id}`

### Cancel Batch

**POST** `https://api.openai.com/v1/batches/{batch_id}/cancel`

## Batch Object

```json
{
  "id": "batch_abc123",
  "object": "batch",
  "endpoint": "/v1/responses",
  "status": "completed",
  "input_file_id": "file-abc123",
  "output_file_id": "file-xyz789",
  "error_file_id": null,
  "created_at": 1714508499,
  "in_progress_at": 1714508501,
  "expires_at": 1714536634,
  "completed_at": 1714508648,
  "failed_at": null,
  "request_counts": {
    "total": 100,
    "completed": 95,
    "failed": 5
  }
}
```

---

# Files API

Upload and manage files for use with other API endpoints.

## Upload File

**POST** `https://api.openai.com/v1/files`

Upload a file for use with various API endpoints.

```bash
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="assistants" \
  -F file="@mydata.jsonl"
```

### Parameters

| Parameter | Type   | Description                                            |
| --------- | ------ | ------------------------------------------------------ |
| `file`    | file   | File to upload                                         |
| `purpose` | string | Purpose of file (assistants, fine-tune, batch, vision) |

### Supported File Types

- **Text**: .txt, .md, .json, .jsonl, .csv
- **Documents**: .pdf, .docx, .pptx
- **Images**: .png, .jpg, .gif, .webp
- **Audio**: .mp3, .wav, .m4a, .flac
- **Code**: .py, .js, .html, .css, .java, .c, .cpp, .php, .rb, .go, .rs

## File Management

### List Files

**GET** `https://api.openai.com/v1/files`

```bash
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Retrieve File

**GET** `https://api.openai.com/v1/files/{file_id}`

### Delete File

**DELETE** `https://api.openai.com/v1/files/{file_id}`

### Retrieve File Content

**GET** `https://api.openai.com/v1/files/{file_id}/content`

Download file content.

## File Object

```json
{
  "id": "file-abc123",
  "object": "file",
  "bytes": 120000,
  "created_at": 1677610602,
  "filename": "salesOverview.pdf",
  "purpose": "assistants",
  "status": "processed",
  "status_details": null
}
```

---

# Uploads API

Upload large files in multiple parts for better reliability.

## Create Upload

**POST** `https://api.openai.com/v1/uploads`

Initiate a multipart upload for large files.

```bash
curl https://api.openai.com/v1/uploads \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "training_examples.jsonl",
    "purpose": "fine-tune",
    "bytes": 2147483648,
    "mime_type": "text/jsonl"
  }'
```

## Add Upload Part

**POST** `https://api.openai.com/v1/uploads/{upload_id}/parts`

Upload a part of the file.

```bash
curl https://api.openai.com/v1/uploads/upload_abc123/parts \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F data="@chunk1.part"
```

## Complete Upload

**POST** `https://api.openai.com/v1/uploads/{upload_id}/complete`

Complete the multipart upload.

```bash
curl https://api.openai.com/v1/uploads/upload_abc123/complete \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "part_ids": ["part_def456", "part_ghi789"]
  }'
```

## Cancel Upload

**POST** `https://api.openai.com/v1/uploads/{upload_id}/cancel`

---

# Models API

List and retrieve information about available models.

## List Models

**GET** `https://api.openai.com/v1/models`

List all available models.

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Retrieve Model

**GET** `https://api.openai.com/v1/models/{model}`

Get details about a specific model.

```bash
curl https://api.openai.com/v1/models/gpt-4o \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete Fine-tuned Model

**DELETE** `https://api.openai.com/v1/models/{model}`

Delete a fine-tuned model.

## Model Object

```json
{
  "id": "gpt-4o-2024-08-06",
  "object": "model",
  "created": 1686935002,
  "owned_by": "openai",
  "capabilities": {
    "text_generation": true,
    "image_analysis": true,
    "function_calling": true,
    "streaming": true
  }
}
```

---

# Moderations API

Classify text for policy violations.

## Create Moderation

**POST** `https://api.openai.com/v1/moderations`

Check if text complies with OpenAI's usage policies.

```bash
curl https://api.openai.com/v1/moderations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "input": "Sample text to check for policy violations.",
    "model": "text-moderation-latest"
  }'
```

### Parameters

| Parameter | Type         | Description                                                       |
| --------- | ------------ | ----------------------------------------------------------------- |
| `input`   | string/array | Text input(s) to classify                                         |
| `model`   | string       | Moderation model (text-moderation-latest, text-moderation-stable) |

## Moderation Response

```json
{
  "id": "modr-abc123",
  "model": "text-moderation-007",
  "results": [
    {
      "flagged": false,
      "categories": {
        "sexual": false,
        "hate": false,
        "harassment": false,
        "self-harm": false,
        "sexual/minors": false,
        "hate/threatening": false,
        "violence/graphic": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "harassment/threatening": false,
        "violence": false
      },
      "category_scores": {
        "sexual": 0.000014,
        "hate": 0.000005,
        "harassment": 0.000041,
        "self-harm": 0.000003,
        "sexual/minors": 0.000001,
        "hate/threatening": 0.000001,
        "violence/graphic": 0.000006,
        "self-harm/intent": 0.000001,
        "self-harm/instructions": 0.000001,
        "harassment/threatening": 0.000002,
        "violence": 0.000014
      }
    }
  ]
}
```

---

# Vector Stores API

Store and search vectors for retrieval augmented generation (RAG).

## Create Vector Store

**POST** `https://api.openai.com/v1/vector_stores`

Create a vector store for file search.

```bash
curl https://api.openai.com/v1/vector_stores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "name": "Product Documentation",
    "file_ids": ["file-abc123", "file-def456"]
  }'
```

## Vector Store Management

### List Vector Stores

**GET** `https://api.openai.com/v1/vector_stores`

### Retrieve Vector Store

**GET** `https://api.openai.com/v1/vector_stores/{vector_store_id}`

### Update Vector Store

**POST** `https://api.openai.com/v1/vector_stores/{vector_store_id}`

### Delete Vector Store

**DELETE** `https://api.openai.com/v1/vector_stores/{vector_store_id}`

## Vector Store Files

### Create Vector Store File

**POST** `https://api.openai.com/v1/vector_stores/{vector_store_id}/files`

Add a file to a vector store.

### List Vector Store Files

**GET** `https://api.openai.com/v1/vector_stores/{vector_store_id}/files`

### Retrieve Vector Store File

**GET** `https://api.openai.com/v1/vector_stores/{vector_store_id}/files/{file_id}`

### Delete Vector Store File

**DELETE** `https://api.openai.com/v1/vector_stores/{vector_store_id}/files/{file_id}`

## Vector Store Batches

### Create Vector Store File Batch

**POST** `https://api.openai.com/v1/vector_stores/{vector_store_id}/file_batches`

Add multiple files to a vector store in a batch.

```bash
curl https://api.openai.com/v1/vector_stores/vs_abc123/file_batches \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "file_ids": ["file-abc123", "file-def456", "file-ghi789"]
  }'
```

---

# Containers API

Create and manage sandboxed environments for code execution.

## Create Container

**POST** `https://api.openai.com/v1/containers`

Create a new container for code interpreter.

```bash
curl https://api.openai.com/v1/containers \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "data-analysis-container"
  }'
```

## Container Management

### List Containers

**GET** `https://api.openai.com/v1/containers`

### Retrieve Container

**GET** `https://api.openai.com/v1/containers/{container_id}`

### Delete Container

**DELETE** `https://api.openai.com/v1/containers/{container_id}`

## Container Files

### Create Container File

**POST** `https://api.openai.com/v1/containers/{container_id}/files`

Upload a file to a container.

```bash
curl https://api.openai.com/v1/containers/cntr_abc123/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F file="@data.csv"
```

### List Container Files

**GET** `https://api.openai.com/v1/containers/{container_id}/files`

### Retrieve Container File Content

**GET** `https://api.openai.com/v1/containers/{container_id}/files/{file_id}/content`

Download file content from container.

### Delete Container File

**DELETE** `https://api.openai.com/v1/containers/{container_id}/files/{file_id}`

## Container Object

```json
{
  "id": "cntr_abc123",
  "object": "container",
  "name": "data-analysis-container",
  "created_at": 1714508499,
  "last_active_at": 1714508640,
  "status": "active",
  "expires_at": 1714594840
}
```

---

# Realtime API

Build low-latency, conversational AI applications with WebSocket and WebRTC connections.

## WebSocket Connection

Connect to the Realtime API using WebSocket for server-to-server communication.

```javascript
const WebSocket = require('ws');

const ws = new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview', {
  headers: {
    'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
    'OpenAI-Beta': 'realtime=v1'
  }
});

ws.on('open', () => {
  console.log('Connected to Realtime API');

  // Configure session
  ws.send(JSON.stringify({
    type: 'session.update',
    session: {
      modalities: ['text', 'audio'],
      instructions: 'You are a helpful assistant.',
      voice: 'alloy',
      input_audio_format: 'pcm16',
      output_audio_format: 'pcm16',
      input_audio_transcription: { model: 'whisper-1' }
    }
  }));
});

ws.on('message', (data) => {
  const event = JSON.parse(data.toString());
  console.log('Received:', event.type);

  switch (event.type) {
    case 'session.created':
      console.log('Session created');
      break;
    case 'response.audio.delta':
      // Handle audio data
      console.log('Audio delta received');
      break;
    case 'response.text.delta':
      // Handle text data
      console.log('Text delta:', event.delta);
      break;
  }
});
```

## WebRTC Connection

Use WebRTC for client-side applications with ultra-low latency.

```javascript
// Client-side WebRTC connection
const rtcConnection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// Get ephemeral token
const tokenResponse = await fetch('https://api.openai.com/v1/realtime/sessions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4o-realtime-preview',
    voice: 'alloy'
  })
});

const { client_secret } = await tokenResponse.json();

// Set remote description
await rtcConnection.setRemoteDescription({
  type: 'offer',
  sdp: client_secret.sdp
});

// Create answer
const answer = await rtcConnection.createAnswer();
await rtcConnection.setLocalDescription(answer);
```

## Session Configuration

Configure session parameters for the Realtime API:

```json
{
  "type": "session.update",
  "session": {
    "modalities": ["text", "audio"],
    "instructions": "You are a helpful assistant. Speak clearly and concisely.",
    "voice": "alloy",
    "input_audio_format": "pcm16",
    "output_audio_format": "pcm16",
    "input_audio_transcription": {
      "model": "whisper-1"
    },
    "turn_detection": {
      "type": "server_vad",
      "threshold": 0.5,
      "prefix_padding_ms": 300,
      "silence_duration_ms": 500
    },
    "tools": [
      {
        "type": "function",
        "name": "get_weather",
        "description": "Get the current weather",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {"type": "string"}
          }
        }
      }
    ],
    "tool_choice": "auto",
    "temperature": 0.8,
    "max_response_output_tokens": "inf"
  }
}
```

## Realtime Events

### Client Events

Events you can send to the Realtime API:

- **session.update**: Update session configuration
- **input_audio_buffer.append**: Add audio data to input buffer
- **input_audio_buffer.commit**: Commit audio buffer for processing
- **input_audio_buffer.clear**: Clear the audio input buffer
- **conversation.item.create**: Add item to conversation
- **response.create**: Trigger a response generation
- **response.cancel**: Cancel in-progress response

### Server Events

Events the Realtime API sends to you:

- **session.created**: Session has been created
- **session.updated**: Session configuration updated
- **input_audio_buffer.speech_started**: Speech detected
- **input_audio_buffer.speech_stopped**: Speech ended
- **conversation.item.created**: New conversation item
- **response.created**: Response generation started
- **response.audio.delta**: Audio response chunk
- **response.text.delta**: Text response chunk
- **response.done**: Response generation completed
- **error**: An error occurred

## Audio Handling

### Input Audio

Send audio data to the Realtime API:

```javascript
// PCM16 audio data at 24kHz sample rate
const audioData = new Int16Array(/* audio samples */);
const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData.buffer)));

ws.send(JSON.stringify({
  type: 'input_audio_buffer.append',
  audio: base64Audio
}));

// Commit when done speaking
ws.send(JSON.stringify({
  type: 'input_audio_buffer.commit'
}));
```

### Output Audio

Handle audio responses:

```javascript
ws.on('message', (data) => {
  const event = JSON.parse(data.toString());

  if (event.type === 'response.audio.delta') {
    // Decode base64 audio
    const audioBytes = atob(event.delta);
    const audioArray = new Int16Array(audioBytes.length);

    for (let i = 0; i < audioBytes.length; i++) {
      audioArray[i] = audioBytes.charCodeAt(i);
    }

    // Play audio (implementation depends on your audio system)
    playAudio(audioArray);
  }
});
```

## Function Calling

The Realtime API supports function calling for interactive experiences:

```javascript
// Define function in session
const sessionConfig = {
  tools: [
    {
      type: 'function',
      name: 'set_memory',
      description: 'Store information in memory',
      parameters: {
        type: 'object',
        properties: {
          key: { type: 'string' },
          value: { type: 'string' }
        }
      }
    }
  ]
};

// Handle function calls
ws.on('message', (data) => {
  const event = JSON.parse(data.toString());

  if (event.type === 'response.function_call_arguments.done') {
    const { call_id, name, arguments: args } = event;

    // Execute function
    const result = executeFunction(name, JSON.parse(args));

    // Send result back
    ws.send(JSON.stringify({
      type: 'conversation.item.create',
      item: {
        type: 'function_call_output',
        call_id: call_id,
        output: JSON.stringify(result)
      }
    }));
  }
});
```

## Error Handling

Handle errors and connection issues:

```javascript
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.on('close', (code, reason) => {
  console.log(`Connection closed: ${code} ${reason}`);

  // Implement reconnection logic
  if (code !== 1000) {
    setTimeout(() => {
      console.log('Attempting to reconnect...');
      connectToRealtime();
    }, 5000);
  }
});

// Handle specific error events
ws.on('message', (data) => {
  const event = JSON.parse(data.toString());

  if (event.type === 'error') {
    console.error('API error:', event.error);

    switch (event.error.type) {
      case 'invalid_request_error':
        console.error('Invalid request:', event.error.message);
        break;
      case 'server_error':
        console.error('Server error:', event.error.message);
        break;
    }
  }
});
```

---

## Conclusion

This comprehensive OpenAI API Reference provides detailed documentation for all available endpoints, parameters, and response formats across the entire OpenAI platform. Whether you're building simple text generation applications or complex multimodal AI systems, this reference serves as your complete guide to integrating OpenAI's capabilities.

### Key Takeaways

- **Comprehensive Coverage**: Every API endpoint with detailed parameters and examples
- **Authentication and Security**: Proper API key management and organization settings
- **Multi-format Support**: REST APIs, WebSocket, and WebRTC connections
- **Advanced Features**: Streaming, function calling, fine-tuning, and batch processing
- **Developer Tools**: File management, evaluations, moderation, and debugging

### Best Practices

1. **Security**: Never expose API keys in client-side code
2. **Error Handling**: Implement robust error handling and retry logic
3. **Rate Limiting**: Monitor and respect API rate limits
4. **Debugging**: Use request IDs for troubleshooting
5. **Performance**: Use appropriate models and batch processing where applicable

### Next Steps

- **Explore the SDKs**: Use official libraries for your programming language
- **Try Examples**: Test with the provided code samples
- **Build Applications**: Start with simple use cases and expand
- **Monitor Usage**: Track costs and performance metrics
- **Stay Updated**: Follow the changelog for API updates

This reference documentation is your one-stop resource for building powerful applications with OpenAI's APIs. From basic text generation to advanced real-time conversational AI, you now have all the information needed to leverage the full potential of OpenAI's technology platform.

For the latest updates and additional resources, visit the [OpenAI Developer Platform](https://platform.openai.com/docs).
