# OpenAI REST API - Complete Reference Guide

## Table of Contents

1. [REST API Overview](#rest-api-overview)
2. [Authentication and Setup](#authentication-and-setup)
3. [Base URL and Endpoints](#base-url-and-endpoints)
4. [Assistants API](#assistants-api)
5. [Audio API](#audio-api)
6. [Batch API](#batch-api)
7. [Chat Completions API](#chat-completions-api)
8. [Completions API](#completions-api)
9. [Containers API](#containers-api)
10. [Conversations API](#conversations-api)
11. [Embeddings API](#embeddings-api)
12. [Evaluations API](#evaluations-api)
13. [Files API](#files-api)
14. [Fine-tuning API](#fine-tuning-api)
15. [Images API](#images-api)
16. [Models API](#models-api)
17. [Moderation API](#moderation-api)
18. [Organization Management API](#organization-management-api)

---

# REST API Overview

Comprehensive reference for the OpenAI REST API endpoints and functionality.

The OpenAI REST API provides programmatic access to OpenAI's suite of AI models and services through HTTP requests. This complete reference guide covers all available endpoints, request/response formats, authentication methods, and practical examples for integrating OpenAI's capabilities into your applications.

## What You'll Learn

- **API Fundamentals**: Authentication, base URLs, and request structure
- **Core Services**: Text generation, image creation, audio processing, and embeddings
- **Advanced Features**: Fine-tuning, batch processing, assistants, and evaluations
- **Management Tools**: File handling, model management, and organization controls
- **Integration Patterns**: Best practices for production usage and error handling
- **Code Examples**: Python, JavaScript, and cURL implementations for all endpoints

## API Categories

### Core AI Services

- **Assistants**: Create and manage AI assistants with specific capabilities
- **Chat Completions**: Generate conversational AI responses
- **Audio**: Speech-to-text, text-to-speech, and translations
- **Images**: Generate, edit, and create variations of images
- **Embeddings**: Create vector representations of text

### Development Tools

- **Fine-tuning**: Train custom models on your data
- **Batch Processing**: Handle large-scale requests efficiently
- **Evaluations**: Test and validate model performance
- **Moderation**: Content safety and compliance checking

### Infrastructure

- **Files**: Upload and manage documents and datasets
- **Models**: Access and manage available AI models
- **Containers**: Isolated execution environments
- **Organization**: User management and billing controls

---

# Authentication and Setup

Secure access to OpenAI's APIs using API keys and proper configuration.

## API Key Authentication

All OpenAI API requests require authentication using API keys. Your API key identifies your account and tracks usage for billing purposes.

**Important Security Notes:**

- Never share your API key or expose it in client-side code
- Store API keys securely using environment variables or key management services
- Rotate keys regularly for enhanced security
- Use organization and project headers to control access scope

### Creating an API Key

1. Visit the [OpenAI API Keys page](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Choose appropriate permissions and restrictions
4. Store the key securely - it won't be shown again

### Authentication Methods

#### Bearer Token (Recommended)

Include your API key in the Authorization header:

```bash
Authorization: Bearer OPENAI_API_KEY
```

#### Environment Variable Setup

**macOS/Linux:**

```bash
export OPENAI_API_KEY="your_api_key_here"
```

**Windows PowerShell:**

```bash
$env:OPENAI_API_KEY="your_api_key_here"
```

### Organization and Project Headers

For multi-organization or legacy API key access, specify organization and project:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Organization: org-SypLp0dHByhVoYSjP5t8Idd2" \
  -H "OpenAI-Project: $PROJECT_ID"
```

### Request Debugging Headers

OpenAI includes helpful debugging information in response headers:

#### API Meta Information

- `openai-organization`: Associated organization
- `openai-processing-ms`: Request processing time
- `openai-version`: API version used
- `x-request-id`: Unique request identifier

#### Rate Limiting Information

- `x-ratelimit-limit-requests`: Request rate limit
- `x-ratelimit-limit-tokens`: Token rate limit
- `x-ratelimit-remaining-requests`: Remaining requests
- `x-ratelimit-remaining-tokens`: Remaining tokens

---

# Base URL and Endpoints

Foundation URLs and endpoint structure for OpenAI API access.

## Base URL

All OpenAI API endpoints use the following base URL:

| URL                         | Description                            |
| --------------------------- | -------------------------------------- |
| `https://api.openai.com/v1` | Primary API base URL for all endpoints |

## Request Format

- **Protocol**: HTTPS only
- **Content-Type**: `application/json` (for JSON requests)
- **Content-Type**: `multipart/form-data` (for file uploads)
- **Authentication**: Bearer token in Authorization header

## Response Format

- **Format**: JSON
- **Timestamps**: Unix time format
- **Encoding**: UTF-8
- **Status Codes**: Standard HTTP status codes

## Common Parameters

Most list endpoints support these pagination parameters:

| Parameter | Type    | Description                                     |
| --------- | ------- | ----------------------------------------------- |
| `limit`   | integer | Number of objects to return (1-100, default 20) |
| `order`   | string  | Sort order: `asc` or `desc`                     |
| `after`   | string  | Cursor for pagination (object ID)               |
| `before`  | string  | Cursor for reverse pagination (object ID)       |

---

# Assistants API

Create and manage AI assistants with specific capabilities and tools.

The Assistants API allows you to build AI assistants with custom instructions, knowledge bases, and tool integrations. Assistants can maintain conversation context, access uploaded files, and use various tools like code interpreter and function calling.

## Key Features

- **Custom Instructions**: Define assistant behavior and personality
- **Tool Integration**: Code interpreter, file search, and function calling
- **File Management**: Upload and reference documents in conversations
- **Conversation Threads**: Maintain context across multiple interactions
- **Run Management**: Control and monitor assistant executions

## List Assistants

Retrieve all assistants in your organization.

### Endpoint

```
GET /assistants
```

### Parameters

| Parameter | Type    | Required | Description                           |
| --------- | ------- | -------- | ------------------------------------- |
| `limit`   | integer | No       | Objects to return (1-100, default 20) |
| `order`   | string  | No       | Sort by `created_at`: `asc` or `desc` |
| `after`   | string  | No       | Pagination cursor for next page       |
| `before`  | string  | No       | Pagination cursor for previous page   |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

assistants = client.beta.assistants.list(
    order="desc",
    limit=20
)

for assistant in assistants.data:
    print(f"Assistant: {assistant.name} - {assistant.id}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const assistants = await client.beta.assistants.list({
    order: "desc",
    limit: 20
});

assistants.data.forEach(assistant => {
    console.log(`Assistant: ${assistant.name} - ${assistant.id}`);
});
```

#### cURL

```bash
curl https://api.openai.com/v1/assistants \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -G \
  -d limit=20 \
  -d order=desc
```

### Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "asst_abc123",
      "object": "assistant",
      "created_at": 1699009709,
      "name": "Data Analyst Assistant",
      "description": "Helps analyze datasets and create visualizations",
      "model": "gpt-4-turbo",
      "instructions": "You are a helpful data analyst...",
      "tools": [
        { "type": "code_interpreter" },
        { "type": "file_search" }
      ]
    }
  ],
  "first_id": "asst_abc123",
  "last_id": "asst_xyz789",
  "has_more": false
}
```

## Create Assistant

Build a new assistant with custom instructions and capabilities.

### Endpoint

```
POST /assistants
```

### Request Body Parameters

| Parameter        | Type   | Required | Description                                               |
| ---------------- | ------ | -------- | --------------------------------------------------------- |
| `model`          | string | Yes      | Model to use (e.g., `gpt-4-turbo`)                        |
| `name`           | string | No       | Assistant name (max 256 characters)                       |
| `description`    | string | No       | Assistant description (max 512 characters)                |
| `instructions`   | string | No       | System instructions (max 256,000 characters)              |
| `tools`          | array  | No       | Available tools (code_interpreter, file_search, function) |
| `tool_resources` | object | No       | Tool-specific resources and configurations                |
| `metadata`       | object | No       | Custom metadata (16 key-value pairs max)                  |
| `temperature`    | number | No       | Sampling temperature (0-2, default 1)                     |
| `top_p`          | number | No       | Nucleus sampling parameter (0-1, default 1)               |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

assistant = client.beta.assistants.create(
    name="Code Review Assistant",
    description="Reviews code and suggests improvements",
    model="gpt-4-turbo",
    instructions="""You are an expert code reviewer. Analyze code for:
    - Best practices and patterns
    - Potential bugs and security issues
    - Performance optimizations
    - Documentation improvements
    Always provide specific, actionable feedback.""",
    tools=[
        {"type": "code_interpreter"},
        {"type": "file_search"}
    ],
    metadata={
        "version": "1.0",
        "category": "development"
    }
)

print(f"Created assistant: {assistant.id}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const assistant = await client.beta.assistants.create({
    name: "Code Review Assistant",
    description: "Reviews code and suggests improvements",
    model: "gpt-4-turbo",
    instructions: `You are an expert code reviewer. Analyze code for:
    - Best practices and patterns
    - Potential bugs and security issues
    - Performance optimizations
    - Documentation improvements
    Always provide specific, actionable feedback.`,
    tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
    ],
    metadata: {
        version: "1.0",
        category: "development"
    }
});

console.log(`Created assistant: ${assistant.id}`);
```

#### cURL

```bash
curl https://api.openai.com/v1/assistants \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Code Review Assistant",
    "description": "Reviews code and suggests improvements",
    "model": "gpt-4-turbo",
    "instructions": "You are an expert code reviewer...",
    "tools": [
      {"type": "code_interpreter"},
      {"type": "file_search"}
    ],
    "metadata": {
      "version": "1.0",
      "category": "development"
    }
  }'
```

### Response

```json
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1699009709,
  "name": "Code Review Assistant",
  "description": "Reviews code and suggests improvements",
  "model": "gpt-4-turbo",
  "instructions": "You are an expert code reviewer...",
  "tools": [
    { "type": "code_interpreter" },
    { "type": "file_search" }
  ],
  "metadata": {
    "version": "1.0",
    "category": "development"
  },
  "top_p": 1.0,
  "temperature": 1.0,
  "response_format": "auto"
}
```

## GET /assistants/{assistant_id}

Retrieve assistant

Retrieves an assistant.

### Parameters

| Name         | Type   | Required | Description                          |
| ------------ | ------ | -------- | ------------------------------------ |
| assistant_id | string | True     | The ID of the assistant to retrieve. |

### Responses

#### 200

OK

[AssistantObject](#assistantobject)

## POST /assistants/{assistant_id}

Modify assistant

Modifies an assistant.

### Parameters

| Name         | Type   | Required | Description                        |
| ------------ | ------ | -------- | ---------------------------------- |
| assistant_id | string | True     | The ID of the assistant to modify. |

### Request Body

[ModifyAssistantRequest](#modifyassistantrequest)

### Responses

#### 200

OK

[AssistantObject](#assistantobject)

## DELETE /assistants/{assistant_id}

Delete assistant

Delete an assistant.

### Parameters

| Name         | Type   | Required | Description                        |
| ------------ | ------ | -------- | ---------------------------------- |
| assistant_id | string | True     | The ID of the assistant to delete. |

### Responses

#### 200

OK

[DeleteAssistantResponse](#deleteassistantresponse)

---

# Audio API

Convert between text and audio with speech-to-text and text-to-speech capabilities.

The Audio API provides powerful speech processing capabilities including transcription, translation, and speech synthesis. Convert spoken audio to text, translate audio to English, or generate natural-sounding speech from text input.

## Key Features

- **Speech to Text**: Transcribe audio in multiple languages with high accuracy
- **Translation**: Convert foreign language audio directly to English text
- **Text to Speech**: Generate natural-sounding audio from text with multiple voices
- **Multiple Formats**: Support for various audio file formats (MP3, WAV, FLAC, etc.)
- **Real-time Processing**: Fast processing for interactive applications

## Create Speech

Generate audio from text input using natural-sounding voices.

### Endpoint

```
POST /audio/speech
```

### Request Parameters

| Parameter         | Type   | Required | Description                                                  |
| ----------------- | ------ | -------- | ------------------------------------------------------------ |
| `model`           | string | Yes      | TTS model (`tts-1` or `tts-1-hd` for higher quality)         |
| `input`           | string | Yes      | Text to convert to audio (max 4096 characters)               |
| `voice`           | string | Yes      | Voice: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`   |
| `response_format` | string | No       | Format: `mp3` (default), `opus`, `aac`, `flac`, `wav`, `pcm` |
| `speed`           | number | No       | Playback speed (0.25 to 4.0, default 1.0)                    |

### Example Requests

#### Python

```python
from openai import OpenAI
from pathlib import Path

client = OpenAI()

speech_file_path = Path(__file__).parent / "speech.mp3"
response = client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input="Today is a wonderful day to build something people love!"
)

response.stream_to_file(speech_file_path)
```

#### JavaScript

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

const mp3 = await client.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!"
});

const buffer = Buffer.from(await mp3.arrayBuffer());
fs.writeFileSync("speech.mp3", buffer);
```

#### cURL

```bash
curl https://api.openai.com/v1/audio/speech \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "Today is a wonderful day to build something people love!",
    "voice": "alloy"
  }' \
  --output speech.mp3
```

## Create Transcription

Transcribe audio files into text in the original language.

### Endpoint

```
POST /audio/transcriptions
```

### Request Parameters

| Parameter                   | Type   | Required | Description                                                    |
| --------------------------- | ------ | -------- | -------------------------------------------------------------- |
| `file`                      | file   | Yes      | Audio file (flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm)   |
| `model`                     | string | Yes      | Model to use (`whisper-1`)                                     |
| `language`                  | string | No       | Language code (improves accuracy, e.g., `en`, `fr`, `de`)      |
| `prompt`                    | string | No       | Text to guide the model's style (up to 244 tokens)             |
| `response_format`           | string | No       | Format: `json` (default), `text`, `srt`, `verbose_json`, `vtt` |
| `temperature`               | number | No       | Sampling temperature (0 to 1, default 0)                       |
| `timestamp_granularities[]` | array  | No       | Timestamp granularities: `word`, `segment`                     |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

audio_file = open("/path/to/file/audio.mp3", "rb")
transcription = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file,
    response_format="text"
)

print(transcription)
```

#### JavaScript

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

const transcription = await client.audio.transcriptions.create({
    file: fs.createReadStream("/path/to/file/audio.mp3"),
    model: "whisper-1"
});

console.log(transcription.text);
```

#### cURL

```bash
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F file="@/path/to/file/audio.mp3" \
  -F model="whisper-1"
```

### Response Formats

#### JSON Response

```json
{
  "text": "Imagine the wildest idea that you've ever had, and you're curious about how it might scale to something that's a 100, a 1,000 times bigger."
}
```

#### Verbose JSON Response

```json
{
  "task": "transcribe",
  "language": "english",
  "duration": 8.470000267028809,
  "text": "The beach was a popular spot on a hot summer day. People were swimming, sunbathing, and playing beach volleyball.",
  "words": [
    {
      "word": "The",
      "start": 0.0,
      "end": 0.23999999463558197
    },
    {
      "word": "beach",
      "start": 0.23999999463558197,
      "end": 0.52
    }
  ]
}
```

## Create Translation

Translate audio files from any language into English text.

### Endpoint

```
POST /audio/translations
```

### Request Parameters

| Parameter         | Type   | Required | Description                                                    |
| ----------------- | ------ | -------- | -------------------------------------------------------------- |
| `file`            | file   | Yes      | Audio file to translate                                        |
| `model`           | string | Yes      | Model to use (`whisper-1`)                                     |
| `prompt`          | string | No       | Text to guide the model's style                                |
| `response_format` | string | No       | Format: `json` (default), `text`, `srt`, `verbose_json`, `vtt` |
| `temperature`     | number | No       | Sampling temperature (0 to 1)                                  |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

audio_file = open("/path/to/file/german.mp3", "rb")
translation = client.audio.translations.create(
    model="whisper-1",
    file=audio_file
)

print(translation.text)
```

#### JavaScript

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

const translation = await client.audio.translations.create({
    file: fs.createReadStream("/path/to/file/german.mp3"),
    model: "whisper-1"
});

console.log(translation.text);
```

#### cURL

```bash
curl https://api.openai.com/v1/audio/translations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F file="@/path/to/file/german.mp3" \
  -F model="whisper-1"
```

---

# Batch API

Process large volumes of API requests efficiently with batch processing.

The Batch API allows you to send asynchronous groups of requests with 50% lower costs, separate rate limits, and a clear 24-hour turnaround time. It's ideal for processing large datasets that don't require immediate results.

## Key Features

- **Cost Effective**: 50% discount compared to synchronous API calls
- **High Volume**: Process up to 50,000 requests per batch
- **Separate Limits**: Independent rate limits from real-time API usage
- **Reliable Processing**: 24-hour completion window with status tracking
- **Multiple Endpoints**: Support for chat completions, embeddings, and more

## Create Batch

Submit a batch of requests for asynchronous processing.

### Endpoint

```
POST /batches
```

### Request Parameters

| Parameter           | Type   | Required | Description                                                                |
| ------------------- | ------ | -------- | -------------------------------------------------------------------------- |
| `input_file_id`     | string | Yes      | ID of uploaded JSONL file containing requests                              |
| `endpoint`          | string | Yes      | API endpoint (`/v1/chat/completions`, `/v1/embeddings`, `/v1/completions`) |
| `completion_window` | string | Yes      | Processing timeframe (currently only `24h`)                                |
| `metadata`          | object | No       | Custom metadata (up to 16 key-value pairs)                                 |

### Batch File Format

Upload a JSONL file where each line contains:

```json
{
    "custom_id": "request-1",
    "method": "POST",
    "url": "/v1/chat/completions",
    "body": {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hello world"}],
        "max_tokens": 1000
    }
}
```

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

# First upload the batch file
batch_input_file = client.files.create(
    file=open("batch_requests.jsonl", "rb"),
    purpose="batch"
)

# Create the batch
batch_input_file_id = batch_input_file.id

batch = client.batches.create(
    input_file_id=batch_input_file_id,
    endpoint="/v1/chat/completions",
    completion_window="24h",
    metadata={
        "description": "Customer feedback analysis batch",
        "batch_type": "analysis"
    }
)

print(f"Batch created: {batch.id}")
print(f"Status: {batch.status}")
```

#### JavaScript

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

// Upload batch file
const batchInputFile = await client.files.create({
    file: fs.createReadStream("batch_requests.jsonl"),
    purpose: "batch"
});

// Create batch
const batch = await client.batches.create({
    input_file_id: batchInputFile.id,
    endpoint: "/v1/chat/completions",
    completion_window: "24h",
    metadata: {
        description: "Customer feedback analysis batch",
        batch_type: "analysis"
    }
});

console.log(`Batch created: ${batch.id}`);
console.log(`Status: ${batch.status}`);
```

#### cURL

```bash
# Upload batch file
BATCH_FILE_ID=$(curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="batch" \
  -F file="@batch_requests.jsonl" \
  | jq -r '.id')

# Create batch
curl https://api.openai.com/v1/batches \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "input_file_id": "'$BATCH_FILE_ID'",
    "endpoint": "/v1/chat/completions",
    "completion_window": "24h",
    "metadata": {
      "description": "Customer feedback analysis batch"
    }
  }'
```

### Response

```json
{
  "id": "batch_abc123",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "errors": null,
  "input_file_id": "file-abc123",
  "completion_window": "24h",
  "status": "validating",
  "output_file_id": null,
  "error_file_id": null,
  "created_at": 1699061776,
  "in_progress_at": null,
  "expires_at": 1699148176,
  "finalizing_at": null,
  "completed_at": null,
  "failed_at": null,
  "expired_at": null,
  "cancelling_at": null,
  "cancelled_at": null,
  "request_counts": {
    "total": 100,
    "completed": 0,
    "failed": 0
  },
  "metadata": {
    "description": "Customer feedback analysis batch",
    "batch_type": "analysis"
  }
}
```

## List Batches

Retrieve all batches for your organization.

### Endpoint

```
GET /batches
```

### Parameters

| Parameter | Type    | Required | Description                                     |
| --------- | ------- | -------- | ----------------------------------------------- |
| `after`   | string  | No       | Pagination cursor for next page                 |
| `limit`   | integer | No       | Number of batches to return (1-100, default 20) |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

batches = client.batches.list(limit=10)

for batch in batches.data:
    print(f"Batch {batch.id}: {batch.status}")
    print(f"  Requests: {batch.request_counts.total}")
    print(f"  Completed: {batch.request_counts.completed}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const batches = await client.batches.list({ limit: 10 });

batches.data.forEach(batch => {
    console.log(`Batch ${batch.id}: ${batch.status}`);
    console.log(`  Requests: ${batch.request_counts.total}`);
    console.log(`  Completed: ${batch.request_counts.completed}`);
});
```

#### cURL

```bash
curl https://api.openai.com/v1/batches \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=10
```

## Retrieve Batch

Get details for a specific batch by ID.

### Endpoint

```
GET /batches/{batch_id}
```

### Parameters

| Parameter  | Type   | Required | Description                     |
| ---------- | ------ | -------- | ------------------------------- |
| `batch_id` | string | Yes      | The ID of the batch to retrieve |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

batch = client.batches.retrieve("batch_abc123")

print(f"Status: {batch.status}")
print(f"Total requests: {batch.request_counts.total}")
print(f"Completed: {batch.request_counts.completed}")
print(f"Failed: {batch.request_counts.failed}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const batch = await client.batches.retrieve("batch_abc123");

console.log(`Status: ${batch.status}`);
console.log(`Total requests: ${batch.request_counts.total}`);
console.log(`Completed: ${batch.request_counts.completed}`);
```

#### cURL

```bash
curl https://api.openai.com/v1/batches/batch_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Cancel Batch

Cancel an in-progress batch operation.

### Endpoint

```
POST /batches/{batch_id}/cancel
```

### Parameters

| Parameter  | Type   | Required | Description                   |
| ---------- | ------ | -------- | ----------------------------- |
| `batch_id` | string | Yes      | The ID of the batch to cancel |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

batch = client.batches.cancel("batch_abc123")
print(f"Batch status: {batch.status}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const batch = await client.batches.cancel("batch_abc123");
console.log(`Batch status: ${batch.status}`);
```

#### cURL

```bash
curl -X POST https://api.openai.com/v1/batches/batch_abc123/cancel \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

# Chat Completions API

Generate conversational AI responses using OpenAI's chat models.

The Chat Completions API is OpenAI's primary interface for conversational AI applications. It enables you to build chatbots, virtual assistants, and interactive applications that can understand context and generate human-like responses.

## Key Features

- **Multi-turn Conversations**: Maintain context across multiple message exchanges
- **Function Calling**: Enable models to call external functions and APIs
- **Vision Support**: Process and analyze images alongside text
- **Streaming**: Real-time response generation for better user experience
- **Message Roles**: System, user, and assistant message types for structured conversations
- **Model Flexibility**: Support for various models including GPT-4, GPT-3.5, and reasoning models

## Create Chat Completion

Generate a model response for a given chat conversation.

**💡 Starting a new project?** Consider using the [Responses API](https://platform.openai.com/docs/api-reference/responses) to take advantage of the latest OpenAI platform features.

### Endpoint

```
POST /chat/completions
```

### Key Parameters

| Parameter       | Type    | Required | Description                                   |
| --------------- | ------- | -------- | --------------------------------------------- |
| `model`         | string  | Yes      | Model to use (e.g., `gpt-4`, `gpt-3.5-turbo`) |
| `messages`      | array   | Yes      | List of messages comprising the conversation  |
| `max_tokens`    | integer | No       | Maximum tokens to generate                    |
| `temperature`   | number  | No       | Sampling temperature (0-2, default 1)         |
| `stream`        | boolean | No       | Enable streaming responses                    |
| `functions`     | array   | No       | Functions the model may call                  |
| `function_call` | object  | No       | Control function calling behavior             |

### Message Format

Each message in the conversation should have:

| Field           | Type         | Required | Description                                  |
| --------------- | ------------ | -------- | -------------------------------------------- |
| `role`          | string       | Yes      | `system`, `user`, `assistant`, or `function` |
| `content`       | string/array | Yes      | Message content (text or multimodal)         |
| `name`          | string       | No       | Name of the function or user                 |
| `function_call` | object       | No       | Function call made by assistant              |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant that explains complex topics simply."
        },
        {
            "role": "user",
            "content": "Explain quantum computing in simple terms"
        }
    ],
    max_tokens=500,
    temperature=0.7
)

print(response.choices[0].message.content)
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
        {
            role: "system",
            content: "You are a helpful assistant that explains complex topics simply."
        },
        {
            role: "user",
            content: "Explain quantum computing in simple terms"
        }
    ],
    max_tokens: 500,
    temperature: 0.7
});

console.log(response.choices[0].message.content);
```

#### cURL

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant that explains complex topics simply."
      },
      {
        "role": "user",
        "content": "Explain quantum computing in simple terms"
      }
    ],
    "max_tokens": 500,
    "temperature": 0.7
  }'
```

### Streaming Responses

Enable real-time response generation:

#### Python

```python
from openai import OpenAI

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Write a short story about AI"}
    ],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const stream = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
        { role: "user", content: "Write a short story about AI" }
    ],
    stream: true
});

for await (const chunk of stream) {
    if (chunk.choices[0]?.delta?.content) {
        process.stdout.write(chunk.choices[0].delta.content);
    }
}
```

### Function Calling

Enable the model to call external functions:

#### Python

```python
from openai import OpenAI
import json

def get_weather(location):
    """Get weather information for a location"""
    return f"It's sunny and 75°F in {location}"

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "What's the weather like in San Francisco?"}
    ],
    functions=[
        {
            "name": "get_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA"
                    }
                },
                "required": ["location"]
            }
        }
    ],
    function_call="auto"
)

# Handle function calls
message = response.choices[0].message

if message.function_call:
    function_name = message.function_call.name
    arguments = json.loads(message.function_call.arguments)

    if function_name == "get_weather":
        result = get_weather(arguments["location"])

        # Send function result back to model
        second_response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": "What's the weather like in San Francisco?"},
                message,
                {"role": "function", "name": "get_weather", "content": result}
            ]
        )

        print(second_response.choices[0].message.content)
```

### Response Format

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1699896916,
  "model": "gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Quantum computing is like having a super-powerful calculator that works in a completely different way from regular computers..."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 56,
    "completion_tokens": 31,
    "total_tokens": 87
  },
  "system_fingerprint": "fp_44709d6fcb"
}
```

## List Chat Completions

Retrieve stored chat completions (requires `store: true` parameter).

### Endpoint

```
GET /chat/completions
```

### Parameters

| Parameter  | Type    | Required | Description                               |
| ---------- | ------- | -------- | ----------------------------------------- |
| `model`    | string  | No       | Filter by model used                      |
| `metadata` | object  | No       | Filter by metadata keys                   |
| `after`    | string  | No       | Pagination cursor                         |
| `limit`    | integer | No       | Number of completions (1-100, default 20) |
| `order`    | string  | No       | Sort order: `asc` or `desc`               |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

completions = client.chat.completions.list(
    model="gpt-4",
    limit=10,
    order="desc"
)

for completion in completions.data:
    print(f"ID: {completion.id}")
    print(f"Created: {completion.created_at}")
    print(f"Model: {completion.model}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const completions = await client.chat.completions.list({
    model: "gpt-4",
    limit: 10,
    order: "desc"
});

completions.data.forEach(completion => {
    console.log(`ID: ${completion.id}`);
    console.log(`Created: ${completion.created_at}`);
    console.log(`Model: ${completion.model}`);
});
```

#### cURL

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d model=gpt-4 \
  -d limit=10 \
  -d order=desc
```

## Retrieve Chat Completion

Get a specific stored chat completion by ID.

### Endpoint

```
GET /chat/completions/{completion_id}
```

### Parameters

| Parameter       | Type   | Required | Description                               |
| --------------- | ------ | -------- | ----------------------------------------- |
| `completion_id` | string | Yes      | The ID of the chat completion to retrieve |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

completion = client.chat.completions.retrieve("chatcmpl-abc123")

print(f"ID: {completion.id}")
print(f"Model: {completion.model}")
print(f"Created: {completion.created_at}")
print(f"Content: {completion.choices[0].message.content}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const completion = await client.chat.completions.retrieve("chatcmpl-abc123");

console.log(`ID: ${completion.id}`);
console.log(`Model: ${completion.model}`);
console.log(`Content: ${completion.choices[0].message.content}`);
```

#### cURL

```bash
curl https://api.openai.com/v1/chat/completions/chatcmpl-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Update Chat Completion

Modify metadata of a stored chat completion.

### Endpoint

```
POST /chat/completions/{completion_id}
```

### Parameters

| Parameter       | Type   | Required | Description                             |
| --------------- | ------ | -------- | --------------------------------------- |
| `completion_id` | string | Yes      | The ID of the chat completion to update |

### Request Body

| Parameter  | Type   | Required | Description                                          |
| ---------- | ------ | -------- | ---------------------------------------------------- |
| `metadata` | object | No       | Custom metadata to update (up to 16 key-value pairs) |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

completion = client.chat.completions.update(
    "chatcmpl-abc123",
    metadata={
        "category": "customer_support",
        "rating": "excellent",
        "resolved": "true"
    }
)

print(f"Updated completion: {completion.id}")
print(f"New metadata: {completion.metadata}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const completion = await client.chat.completions.update("chatcmpl-abc123", {
    metadata: {
        category: "customer_support",
        rating: "excellent",
        resolved: "true"
    }
});

console.log(`Updated completion: ${completion.id}`);
console.log(`New metadata: ${completion.metadata}`);
```

#### cURL

```bash
curl -X POST https://api.openai.com/v1/chat/completions/chatcmpl-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "metadata": {
      "category": "customer_support",
      "rating": "excellent",
      "resolved": "true"
    }
  }'
```

## Delete Chat Completion

Remove a stored chat completion.

### Endpoint

```
DELETE /chat/completions/{completion_id}
```

### Parameters

| Parameter       | Type   | Required | Description                             |
| --------------- | ------ | -------- | --------------------------------------- |
| `completion_id` | string | Yes      | The ID of the chat completion to delete |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.delete("chatcmpl-abc123")
print(f"Deleted: {response.deleted}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.chat.completions.delete("chatcmpl-abc123");
console.log(`Deleted: ${response.deleted}`);
```

#### cURL

```bash
curl -X DELETE https://api.openai.com/v1/chat/completions/chatcmpl-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Get Chat Messages

Retrieve messages from a stored chat completion.

### Endpoint

```
GET /chat/completions/{completion_id}/messages
```

### Parameters

| Parameter       | Type    | Required | Description                                 |
| --------------- | ------- | -------- | ------------------------------------------- |
| `completion_id` | string  | Yes      | The ID of the chat completion               |
| `after`         | string  | No       | Pagination cursor                           |
| `limit`         | integer | No       | Number of messages (default 20)             |
| `order`         | string  | No       | Sort order: `asc` or `desc` (default `asc`) |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

messages = client.chat.completions.messages.list(
    completion_id="chatcmpl-abc123",
    limit=10
)

for message in messages.data:
    print(f"Role: {message.role}")
    print(f"Content: {message.content}")
    print("---")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const messages = await client.chat.completions.messages.list({
    completion_id: "chatcmpl-abc123",
    limit: 10
});

messages.data.forEach(message => {
    console.log(`Role: ${message.role}`);
    console.log(`Content: ${message.content}`);
    console.log("---");
});
```

#### cURL

```bash
curl https://api.openai.com/v1/chat/completions/chatcmpl-abc123/messages \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=10
```

---

# Completions API

Generate text using the legacy completions interface (consider using Chat Completions for new projects).

The Completions API provides a simple interface for text generation using a prompt-completion pattern. While this API is still supported, we recommend using the [Chat Completions API](#chat-completions-api) for most new applications as it provides better results and more features.

## Create Completion

Generate a completion for a given text prompt.

### Endpoint

```
POST /completions
```

### Key Parameters

| Parameter     | Type         | Required | Description                                   |
| ------------- | ------------ | -------- | --------------------------------------------- |
| `model`       | string       | Yes      | Model to use (e.g., `gpt-3.5-turbo-instruct`) |
| `prompt`      | string/array | Yes      | Text prompt(s) to generate completions for    |
| `max_tokens`  | integer      | No       | Maximum tokens to generate                    |
| `temperature` | number       | No       | Sampling temperature (0-2, default 1)         |
| `top_p`       | number       | No       | Nucleus sampling parameter                    |
| `stop`        | string/array | No       | Stop sequences                                |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt="Write a tagline for an ice cream shop:",
    max_tokens=50,
    temperature=0.7
)

print(response.choices[0].text.strip())
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: "Write a tagline for an ice cream shop:",
    max_tokens: 50,
    temperature: 0.7
});

console.log(response.choices[0].text.trim());
```

#### cURL

```bash
curl https://api.openai.com/v1/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo-instruct",
    "prompt": "Write a tagline for an ice cream shop:",
    "max_tokens": 50,
    "temperature": 0.7
  }'
```

### Response Format

```json
{
  "id": "cmpl-abc123",
  "object": "text_completion",
  "created": 1699896916,
  "model": "gpt-3.5-turbo-instruct",
  "choices": [
    {
      "text": "\n\n\"Sweet treats and frozen delights - your happiness is our scoop!\"",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 15,
    "total_tokens": 25
  }
}
```

---

# Containers API

Manage isolated execution environments for code interpreter and other tools.

Containers provide secure, isolated environments for running code and processing files. They are used by tools like the Code Interpreter to execute Python code safely and manage file operations.

## Key Features

- **Isolation**: Secure sandboxed environments for code execution
- **File Management**: Upload, create, and manage files within containers
- **Persistence**: Containers maintain state across multiple operations
- **Resource Management**: Controlled CPU and memory allocation
- **Tool Integration**: Used by Code Interpreter and other OpenAI tools

## List Containers

Retrieve all containers in your organization.

### Endpoint

```
GET /containers
```

### Parameters

| Parameter | Type    | Required | Description                                        |
| --------- | ------- | -------- | -------------------------------------------------- |
| `limit`   | integer | No       | Number of containers to return (1-100, default 20) |
| `order`   | string  | No       | Sort order: `asc` or `desc`                        |
| `after`   | string  | No       | Pagination cursor                                  |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

containers = client.containers.list(
    limit=10,
    order="desc"
)

for container in containers.data:
    print(f"Container: {container.id}")
    print(f"Name: {container.name}")
    print(f"Created: {container.created_at}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const containers = await client.containers.list({
    limit: 10,
    order: "desc"
});

containers.data.forEach(container => {
    console.log(`Container: ${container.id}`);
    console.log(`Name: ${container.name}`);
    console.log(`Created: ${container.created_at}`);
});
```

#### cURL

```bash
curl https://api.openai.com/v1/containers \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=10 \
  -d order=desc
```

## Create Container

Create a new isolated container environment.

### Endpoint

```
POST /containers
```

### Request Parameters

| Parameter  | Type   | Required | Description                         |
| ---------- | ------ | -------- | ----------------------------------- |
| `name`     | string | No       | Container name (for identification) |
| `metadata` | object | No       | Custom metadata                     |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

container = client.containers.create(
    name="data-analysis-env",
    metadata={
        "project": "quarterly-report",
        "department": "finance"
    }
)

print(f"Created container: {container.id}")
print(f"Name: {container.name}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const container = await client.containers.create({
    name: "data-analysis-env",
    metadata: {
        project: "quarterly-report",
        department: "finance"
    }
});

console.log(`Created container: ${container.id}`);
console.log(`Name: ${container.name}`);
```

#### cURL

```bash
curl https://api.openai.com/v1/containers \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "data-analysis-env",
    "metadata": {
      "project": "quarterly-report",
      "department": "finance"
    }
  }'
```

## Retrieve Container

Get details for a specific container.

### Endpoint

```
GET /containers/{container_id}
```

### Parameters

| Parameter      | Type   | Required | Description                         |
| -------------- | ------ | -------- | ----------------------------------- |
| `container_id` | string | Yes      | The ID of the container to retrieve |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

container = client.containers.retrieve("cont_abc123")

print(f"Container ID: {container.id}")
print(f"Name: {container.name}")
print(f"Status: {container.status}")
print(f"Created: {container.created_at}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const container = await client.containers.retrieve("cont_abc123");

console.log(`Container ID: ${container.id}`);
console.log(`Name: ${container.name}`);
console.log(`Status: ${container.status}`);
console.log(`Created: ${container.created_at}`);
```

#### cURL

```bash
curl https://api.openai.com/v1/containers/cont_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete Container

Remove a container and all its associated files.

### Endpoint

```
DELETE /containers/{container_id}
```

### Parameters

| Parameter      | Type   | Required | Description                       |
| -------------- | ------ | -------- | --------------------------------- |
| `container_id` | string | Yes      | The ID of the container to delete |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.containers.delete("cont_abc123")
print(f"Container deleted: {response.deleted}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.containers.delete("cont_abc123");
console.log(`Container deleted: ${response.deleted}`);
```

#### cURL

```bash
curl -X DELETE https://api.openai.com/v1/containers/cont_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Container File Management

Manage files within container environments for processing and code execution.

### Upload File to Container

Add a file to a container environment.

#### Endpoint

```
POST /containers/{container_id}/files
```

#### Parameters

| Parameter      | Type   | Required | Description      |
| -------------- | ------ | -------- | ---------------- |
| `container_id` | string | Yes      | The container ID |
| `file`         | file   | Yes      | File to upload   |
| `purpose`      | string | No       | File purpose     |

#### Example Requests

##### Python

```python
from openai import OpenAI

client = OpenAI()

with open("data.csv", "rb") as file:
    container_file = client.containers.files.create(
        container_id="cont_abc123",
        file=file,
        purpose="analysis"
    )

print(f"Uploaded file: {container_file.id}")
print(f"Filename: {container_file.filename}")
```

##### JavaScript

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

const containerFile = await client.containers.files.create({
    container_id: "cont_abc123",
    file: fs.createReadStream("data.csv"),
    purpose: "analysis"
});

console.log(`Uploaded file: ${containerFile.id}`);
console.log(`Filename: ${containerFile.filename}`);
```

##### cURL

```bash
curl https://api.openai.com/v1/containers/cont_abc123/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="analysis" \
  -F file="@data.csv"
```

### List Container Files

Get all files in a container.

#### Endpoint

```
GET /containers/{container_id}/files
```

#### Parameters

| Parameter      | Type    | Required | Description                                   |
| -------------- | ------- | -------- | --------------------------------------------- |
| `container_id` | string  | Yes      | The container ID                              |
| `limit`        | integer | No       | Number of files to return (1-100, default 20) |
| `order`        | string  | No       | Sort order: `asc` or `desc`                   |
| `after`        | string  | No       | Pagination cursor                             |

#### Example Requests

##### Python

```python
from openai import OpenAI

client = OpenAI()

files = client.containers.files.list(
    container_id="cont_abc123",
    limit=10
)

for file in files.data:
    print(f"File: {file.filename}")
    print(f"ID: {file.id}")
    print(f"Size: {file.bytes} bytes")
    print("---")
```

##### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const files = await client.containers.files.list({
    container_id: "cont_abc123",
    limit: 10
});

files.data.forEach(file => {
    console.log(`File: ${file.filename}`);
    console.log(`ID: ${file.id}`);
    console.log(`Size: ${file.bytes} bytes`);
    console.log("---");
});
```

##### cURL

```bash
curl https://api.openai.com/v1/containers/cont_abc123/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=10
```

### Retrieve Container File

Get details for a specific file in a container.

#### Endpoint

```
GET /containers/{container_id}/files/{file_id}
```

#### Parameters

| Parameter      | Type   | Required | Description      |
| -------------- | ------ | -------- | ---------------- |
| `container_id` | string | Yes      | The container ID |
| `file_id`      | string | Yes      | The file ID      |

#### Example Requests

##### Python

```python
from openai import OpenAI

client = OpenAI()

file = client.containers.files.retrieve(
    container_id="cont_abc123",
    file_id="file_abc123"
)

print(f"Filename: {file.filename}")
print(f"Size: {file.bytes} bytes")
print(f"Purpose: {file.purpose}")
```

##### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const file = await client.containers.files.retrieve({
    container_id: "cont_abc123",
    file_id: "file_abc123"
});

console.log(`Filename: ${file.filename}`);
console.log(`Size: ${file.bytes} bytes`);
console.log(`Purpose: ${file.purpose}`);
```

##### cURL

```bash
curl https://api.openai.com/v1/containers/cont_abc123/files/file_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Delete Container File

Remove a file from a container.

#### Endpoint

```
DELETE /containers/{container_id}/files/{file_id}
```

#### Parameters

| Parameter      | Type   | Required | Description      |
| -------------- | ------ | -------- | ---------------- |
| `container_id` | string | Yes      | The container ID |
| `file_id`      | string | Yes      | The file ID      |

#### Example Requests

##### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.containers.files.delete(
    container_id="cont_abc123",
    file_id="file_abc123"
)

print(f"File deleted: {response.deleted}")
```

##### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.containers.files.delete({
    container_id: "cont_abc123",
    file_id: "file_abc123"
});

console.log(`File deleted: ${response.deleted}`);
```

##### cURL

```bash
curl -X DELETE https://api.openai.com/v1/containers/cont_abc123/files/file_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Retrieve Container File Content

Get the actual content/data of a file stored in a container.

#### Endpoint

```
GET /containers/{container_id}/files/{file_id}/content
```

#### Parameters

| Parameter      | Type   | Required | Description      |
| -------------- | ------ | -------- | ---------------- |
| `container_id` | string | Yes      | The container ID |
| `file_id`      | string | Yes      | The file ID      |

#### Example Requests

##### Python

```python
from openai import OpenAI

client = OpenAI()

content = client.containers.files.content(
    container_id="cont_abc123",
    file_id="file_abc123"
)

# Content is returned as bytes
with open("downloaded_file.csv", "wb") as f:
    f.write(content)

print("File content downloaded successfully")
```

##### JavaScript

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

const content = await client.containers.files.content({
    container_id: "cont_abc123",
    file_id: "file_abc123"
});

// Save content to file
fs.writeFileSync("downloaded_file.csv", content);
console.log("File content downloaded successfully");
```

##### cURL

```bash
curl https://api.openai.com/v1/containers/cont_abc123/files/file_abc123/content \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  --output downloaded_file.csv
```

---

# Conversations API

Manage multi-turn conversations and interaction contexts with AI models.

The Conversations API provides a powerful way to manage conversational contexts, maintain conversation state, and handle complex multi-turn interactions. It's particularly useful for building applications that need to maintain conversation history and context across multiple API calls.

## Key Features

- **Conversation Management**: Create and manage persistent conversation contexts
- **Item Operations**: Add messages, function calls, and tool outputs to conversations
- **Rich Content Support**: Handle text, images, and multimodal content
- **Tool Integration**: Support for web search, code interpreter, and custom functions
- **Flexible Retrieval**: Query conversation items with filtering and pagination
- **State Preservation**: Maintain conversation context across sessions

## Create Conversation Items

Add new items (messages, tool calls, etc.) to an existing conversation.

### Endpoint

```
POST /conversations/{conversation_id}/items
```

### Parameters

| Parameter         | Type   | Required | Description                                |
| ----------------- | ------ | -------- | ------------------------------------------ |
| `conversation_id` | string | Yes      | The ID of the conversation to add items to |
| `include`         | array  | No       | Additional fields to include in response   |

### Request Body

| Parameter | Type  | Required | Description                       |
| --------- | ----- | -------- | --------------------------------- |
| `items`   | array | Yes      | Items to add (up to 20 at a time) |

### Item Types

Conversations support various item types:

- **Messages**: User or assistant text/multimodal content
- **Tool Calls**: Function calls, code execution, file search, etc.
- **Tool Outputs**: Results from tool executions
- **Reasoning**: Internal model reasoning steps

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

# Add a user message to conversation
response = client.conversations.items.create(
    conversation_id="conv_abc123",
    items=[
        {
            "type": "message",
            "message": {
                "role": "user",
                "content": "Analyze this dataset and create visualizations"
            }
        }
    ]
)

print(f"Added {len(response.data)} items to conversation")

# Add message with image
response = client.conversations.items.create(
    conversation_id="conv_abc123",
    items=[
        {
            "type": "message",
            "message": {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "What's in this image?"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://example.com/image.jpg"
                        }
                    }
                ]
            }
        }
    ]
)
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Add a user message to conversation
const response = await client.conversations.items.create({
    conversation_id: "conv_abc123",
    items: [
        {
            type: "message",
            message: {
                role: "user",
                content: "Analyze this dataset and create visualizations"
            }
        }
    ]
});

console.log(`Added ${response.data.length} items to conversation`);

// Add multimodal message
const multimodalResponse = await client.conversations.items.create({
    conversation_id: "conv_abc123",
    items: [
        {
            type: "message",
            message: {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "What's in this image?"
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: "https://example.com/image.jpg"
                        }
                    }
                ]
            }
        }
    ]
});
```

#### cURL

```bash
curl https://api.openai.com/v1/conversations/conv_abc123/items \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "type": "message",
        "message": {
          "role": "user",
          "content": "Analyze this dataset and create visualizations"
        }
      }
    ]
  }'
```

## List Conversation Items

Retrieve all items from a conversation with pagination and filtering options.

### Endpoint

```
GET /conversations/{conversation_id}/items
```

### Parameters

| Parameter         | Type    | Required | Description                                   |
| ----------------- | ------- | -------- | --------------------------------------------- |
| `conversation_id` | string  | Yes      | The ID of the conversation                    |
| `limit`           | integer | No       | Number of items to return (1-100, default 20) |
| `order`           | string  | No       | Sort order: `asc` or `desc` (default `desc`)  |
| `after`           | string  | No       | Item ID to paginate after                     |
| `include`         | array   | No       | Additional data to include in response        |

### Include Options

The `include` parameter supports these values:

- `web_search_call.action.sources`: Web search sources
- `code_interpreter_call.outputs`: Code execution outputs
- `computer_call_output.output.image_url`: Computer action images
- `file_search_call.results`: File search results
- `message.input_image.image_url`: Input message images
- `message.output_text.logprobs`: Assistant message log probabilities
- `reasoning.encrypted_content`: Encrypted reasoning tokens

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

# List conversation items
items = client.conversations.items.list(
    conversation_id="conv_abc123",
    limit=20,
    order="desc",
    include=[
        "message.output_text.logprobs",
        "code_interpreter_call.outputs"
    ]
)

for item in items.data:
    print(f"Item ID: {item.id}")
    print(f"Type: {item.type}")
    if item.type == "message":
        print(f"Role: {item.message.role}")
        print(f"Content: {item.message.content}")
    print("---")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const items = await client.conversations.items.list({
    conversation_id: "conv_abc123",
    limit: 20,
    order: "desc",
    include: [
        "message.output_text.logprobs",
        "code_interpreter_call.outputs"
    ]
});

items.data.forEach(item => {
    console.log(`Item ID: ${item.id}`);
    console.log(`Type: ${item.type}`);
    if (item.type === "message") {
        console.log(`Role: ${item.message.role}`);
        console.log(`Content: ${item.message.content}`);
    }
    console.log("---");
});
```

#### cURL

```bash
curl "https://api.openai.com/v1/conversations/conv_abc123/items?limit=20&order=desc&include=message.output_text.logprobs" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Retrieve Conversation Item

Get a specific item from a conversation by ID.

### Endpoint

```
GET /conversations/{conversation_id}/items/{item_id}
```

### Parameters

| Parameter         | Type   | Required | Description                                    |
| ----------------- | ------ | -------- | ---------------------------------------------- |
| `conversation_id` | string | Yes      | The ID of the conversation                     |
| `item_id`         | string | Yes      | The ID of the item to retrieve                 |
| `include`         | array  | No       | Additional data to include (see options above) |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

item = client.conversations.items.retrieve(
    conversation_id="conv_abc123",
    item_id="item_abc123",
    include=["message.output_text.logprobs"]
)

print(f"Item Type: {item.type}")
if item.type == "message":
    print(f"Role: {item.message.role}")
    print(f"Content: {item.message.content}")
elif item.type == "tool_call":
    print(f"Tool: {item.tool_call.type}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const item = await client.conversations.items.retrieve({
    conversation_id: "conv_abc123",
    item_id: "item_abc123",
    include: ["message.output_text.logprobs"]
});

console.log(`Item Type: ${item.type}`);
if (item.type === "message") {
    console.log(`Role: ${item.message.role}`);
    console.log(`Content: ${item.message.content}`);
} else if (item.type === "tool_call") {
    console.log(`Tool: ${item.tool_call.type}`);
}
```

#### cURL

```bash
curl "https://api.openai.com/v1/conversations/conv_abc123/items/item_abc123?include=message.output_text.logprobs" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete Conversation Item

Remove a specific item from a conversation.

### Endpoint

```
DELETE /conversations/{conversation_id}/items/{item_id}
```

### Parameters

| Parameter         | Type   | Required | Description                  |
| ----------------- | ------ | -------- | ---------------------------- |
| `conversation_id` | string | Yes      | The ID of the conversation   |
| `item_id`         | string | Yes      | The ID of the item to delete |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

response = client.conversations.items.delete(
    conversation_id="conv_abc123",
    item_id="item_abc123"
)

print(f"Item deleted: {response.deleted}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.conversations.items.delete({
    conversation_id: "conv_abc123",
    item_id: "item_abc123"
});

console.log(`Item deleted: ${response.deleted}`);
```

#### cURL

```bash
curl -X DELETE https://api.openai.com/v1/conversations/conv_abc123/items/item_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

# Embeddings API

Generate vector representations of text for semantic search and similarity analysis.

The Embeddings API converts text into high-dimensional vectors that capture semantic meaning. These embeddings are essential for building search systems, recommendation engines, clustering applications, and other AI features that require understanding text similarity.

## Key Features

- **Semantic Understanding**: Capture meaning and context beyond keyword matching
- **High Dimensionality**: Rich vector representations for complex relationships
- **Batch Processing**: Efficient handling of multiple text inputs
- **Multiple Models**: Choose from different embedding models for various use cases
- **Cost Effective**: Efficient pricing for large-scale applications
- **Wide Applications**: Search, recommendations, clustering, classification, and more

## Create Embeddings

Generate embeddings for input text or multiple text inputs.

### Endpoint

```
POST /embeddings
```

### Request Parameters

| Parameter         | Type         | Required | Description                                                                                    |
| ----------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------- |
| `model`           | string       | Yes      | Embedding model (`text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`) |
| `input`           | string/array | Yes      | Text to embed (string or array of strings, up to 8192 tokens each)                             |
| `encoding_format` | string       | No       | Format: `float` (default) or `base64`                                                          |
| `dimensions`      | integer      | No       | Number of dimensions (only for `text-embedding-3-small` and `text-embedding-3-large`)          |
| `user`            | string       | No       | User identifier for monitoring and abuse detection                                             |

### Model Selection Guide

| Model                    | Max Tokens | Dimensions     | Use Case                        |
| ------------------------ | ---------- | -------------- | ------------------------------- |
| `text-embedding-3-small` | 8192       | 1536 (default) | Cost-effective, general purpose |
| `text-embedding-3-large` | 8192       | 3072 (default) | Higher accuracy, complex tasks  |
| `text-embedding-ada-002` | 8192       | 1536           | Legacy model, still effective   |

### Example Requests

#### Python

```python
from openai import OpenAI

client = OpenAI()

# Single text embedding
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="The quick brown fox jumps over the lazy dog"
)

embedding = response.data[0].embedding
print(f"Embedding dimension: {len(embedding)}")
print(f"First few values: {embedding[:5]}")

# Multiple texts
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=[
        "Document 1: Introduction to machine learning",
        "Document 2: Advanced neural networks",
        "Document 3: Natural language processing"
    ]
)

for i, data in enumerate(response.data):
    print(f"Document {i+1} embedding length: {len(data.embedding)}")
```

#### JavaScript

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Single text embedding
const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: "The quick brown fox jumps over the lazy dog"
});

const embedding = response.data[0].embedding;
console.log(`Embedding dimension: ${embedding.length}`);
console.log(`First few values: ${embedding.slice(0, 5)}`);

// Multiple texts
const batchResponse = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: [
        "Document 1: Introduction to machine learning",
        "Document 2: Advanced neural networks",
        "Document 3: Natural language processing"
    ]
});

batchResponse.data.forEach((data, i) => {
    console.log(`Document ${i+1} embedding length: ${data.embedding.length}`);
});
```

#### cURL

```bash
curl https://api.openai.com/v1/embeddings \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-small",
    "input": "The quick brown fox jumps over the lazy dog"
  }'
```

### Response Format

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        -0.006929283495992422,
        -0.005336422007530928,
        0.024047505110502243,
        // ... (1536 dimensions for text-embedding-3-small)
      ]
    }
  ],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

### Common Use Cases

#### Semantic Search

```python
import numpy as np
from openai import OpenAI

client = OpenAI()

# Create embeddings for documents
documents = [
    "Python is a programming language",
    "Machine learning uses algorithms",
    "Dogs are loyal pets",
    "Neural networks process data"
]

doc_embeddings = []
for doc in documents:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=doc
    )
    doc_embeddings.append(response.data[0].embedding)

# Search query
query = "What is programming?"
query_response = client.embeddings.create(
    model="text-embedding-3-small",
    input=query
)
query_embedding = query_response.data[0].embedding

# Calculate similarities
similarities = []
for doc_embedding in doc_embeddings:
    similarity = np.dot(query_embedding, doc_embedding)
    similarities.append(similarity)

# Find best match
best_match_idx = np.argmax(similarities)
print(f"Best match: {documents[best_match_idx]}")
print(f"Similarity: {similarities[best_match_idx]:.4f}")
```

#### Text Classification

```python
# Use embeddings as features for classification
from sklearn.linear_model import LogisticRegression
import numpy as np

# Assuming you have labeled training data
training_texts = ["positive review", "negative review", ...]
training_labels = [1, 0, ...]

# Get embeddings
training_embeddings = []
for text in training_texts:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    training_embeddings.append(response.data[0].embedding)

# Train classifier
classifier = LogisticRegression()
classifier.fit(training_embeddings, training_labels)

# Classify new text
new_text = "This product is amazing!"
new_response = client.embeddings.create(
    model="text-embedding-3-small",
    input=new_text
)
new_embedding = new_response.data[0].embedding

prediction = classifier.predict([new_embedding])
print(f"Prediction: {prediction[0]}")
```

---

## Evaluations API

Test and validate AI model performance with systematic evaluations.

The Evaluations API enables you to systematically test AI models against predefined datasets and grading criteria. This is essential for measuring model performance, comparing different approaches, and ensuring consistent quality in production applications.

### Evaluations Key Features

- **Systematic Testing**: Structured evaluation framework for model performance
- **Custom Graders**: Define your own evaluation criteria and scoring methods
- **Data Sources**: Support for various input data formats and sources
- **Performance Metrics**: Comprehensive scoring and analytics
- **Batch Processing**: Efficient evaluation of large datasets
- **Comparative Analysis**: Compare different models, prompts, or configurations

### List Evaluations

Retrieve all evaluations for your project with filtering and pagination.

#### Endpoint

```http
GET /evals
```

#### List Evaluations Parameters

| Parameter  | Type    | Required | Description                              |
| ---------- | ------- | -------- | ---------------------------------------- |
| `after`    | string  | No       | Pagination cursor for next page          |
| `limit`    | integer | No       | Number of evaluations to return          |
| `order`    | string  | No       | Sort order: `asc` or `desc`              |
| `order_by` | string  | No       | Sort field: `created_at` or `updated_at` |

#### List Evaluations Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List recent evaluations
evals = client.evals.list(
    limit=10,
    order="desc",
    order_by="created_at"
)

for eval in evals.data:
    print(f"Eval ID: {eval.id}")
    print(f"Name: {eval.name}")
    print(f"Status: {eval.status}")
    print(f"Created: {eval.created_at}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const evals = await client.evals.list({
    limit: 10,
    order: "desc",
    order_by: "created_at"
});

evals.data.forEach(eval => {
    console.log(`Eval ID: ${eval.id}`);
    console.log(`Name: ${eval.name}`);
    console.log(`Status: ${eval.status}`);
    console.log(`Created: ${eval.created_at}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/evals \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=10 \
  -d order=desc \
  -d order_by=created_at
```

### Create Evaluation

Create a new evaluation structure to test model performance against specific criteria and datasets.

Evaluations define the testing framework including grading criteria and data sources. Once created, you can run the evaluation against different models and configurations to measure performance systematically.

#### Endpoint

```http
POST /evals
```

#### Create Evaluation Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `name`        | string | Yes      | Name for the evaluation                           |
| `description` | string | No       | Description of what this evaluation tests         |
| `graders`     | array  | Yes      | Evaluation criteria and grading configuration     |
| `data_source` | object | Yes      | Configuration for the dataset to evaluate against |

#### Create Evaluation Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create a new evaluation
eval = client.evals.create(
    name="Customer Support Quality",
    description="Evaluate model responses for customer support scenarios",
    graders=[
        {
            "type": "human",
            "instructions": "Rate responses for helpfulness and accuracy"
        }
    ],
    data_source={
        "type": "jsonl",
        "location": "gs://my-bucket/customer-support-data.jsonl"
    }
)

print(f"Created evaluation: {eval.id}")
print(f"Status: {eval.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const eval = await client.evals.create({
    name: "Customer Support Quality",
    description: "Evaluate model responses for customer support scenarios",
    graders: [{
        type: "human",
        instructions: "Rate responses for helpfulness and accuracy"
    }],
    data_source: {
        type: "jsonl",
        location: "gs://my-bucket/customer-support-data.jsonl"
    }
});

console.log(`Created evaluation: ${eval.id}`);
console.log(`Status: ${eval.status}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/evals \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer Support Quality",
    "description": "Evaluate model responses for customer support scenarios",
    "graders": [{
      "type": "human",
      "instructions": "Rate responses for helpfulness and accuracy"
    }],
    "data_source": {
      "type": "jsonl",
      "location": "gs://my-bucket/customer-support-data.jsonl"
    }
  }'
```

#### Response

```json
{
  "id": "eval_abc123",
  "name": "Customer Support Quality",
  "description": "Evaluate model responses for customer support scenarios",
  "status": "ready",
  "created_at": "2024-01-15T10:30:00Z",
  "graders": [...],
  "data_source": {...}
}
```

### Get Evaluation

Retrieve details for a specific evaluation by its ID.

#### Get Evaluation Endpoint

```http
GET /evals/{eval_id}
```

#### Get Evaluation Parameters

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| `eval_id` | string | Yes      | The ID of the evaluation to retrieve |

#### Get Evaluation Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get evaluation details
eval_details = client.evals.retrieve("eval_abc123")

print(f"Evaluation Name: {eval_details.name}")
print(f"Status: {eval_details.status}")
print(f"Created: {eval_details.created_at}")
print(f"Description: {eval_details.description}")

# Check grading configuration
for grader in eval_details.graders:
    print(f"Grader type: {grader.type}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const evalDetails = await client.evals.retrieve("eval_abc123");

console.log(`Evaluation Name: ${evalDetails.name}`);
console.log(`Status: ${evalDetails.status}`);
console.log(`Created: ${evalDetails.created_at}`);
console.log(`Description: ${evalDetails.description}`);

// Check grading configuration
evalDetails.graders.forEach(grader => {
    console.log(`Grader type: ${grader.type}`);
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/evals/eval_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Get Evaluation Response

```json
{
  "id": "eval_abc123",
  "name": "Customer Support Quality",
  "description": "Evaluate model responses for customer support scenarios",
  "status": "ready",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "graders": [
    {
      "type": "human",
      "instructions": "Rate responses for helpfulness and accuracy"
    }
  ],
  "data_source": {
    "type": "jsonl",
    "location": "gs://my-bucket/customer-support-data.jsonl"
  }
}
```

### Update Evaluation

Update properties of an existing evaluation such as name or metadata.

#### Update Evaluation Endpoint

```http
POST /evals/{eval_id}
```

#### Update Evaluation Parameters

| Parameter  | Type   | Required | Description                            |
| ---------- | ------ | -------- | -------------------------------------- |
| `eval_id`  | string | Yes      | The ID of the evaluation to update     |
| `name`     | string | No       | New name for the evaluation            |
| `metadata` | object | No       | Additional metadata for the evaluation |

#### Update Evaluation Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update evaluation name and metadata
updated_eval = client.evals.update(
    "eval_abc123",
    name="Updated Customer Support Quality Test",
    metadata={"version": "2.0", "updated_by": "team_lead"}
)

print(f"Updated evaluation: {updated_eval.name}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const updatedEval = await client.evals.update("eval_abc123", {
    name: "Updated Customer Support Quality Test",
    metadata: {
        version: "2.0",
        updated_by: "team_lead"
    }
});

console.log(`Updated evaluation: ${updatedEval.name}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/evals/eval_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Customer Support Quality Test",
    "metadata": {
      "version": "2.0",
      "updated_by": "team_lead"
    }
  }'
```

### Delete Evaluation

Remove an evaluation and all associated data permanently.

#### Delete Evaluation Endpoint

```http
DELETE /evals/{eval_id}
```

#### Delete Evaluation Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `eval_id` | string | Yes      | The ID of the evaluation to delete |

#### Delete Evaluation Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete an evaluation
result = client.evals.delete("eval_abc123")

if result.deleted:
    print(f"Successfully deleted evaluation: {result.eval_id}")
else:
    print("Failed to delete evaluation")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.evals.delete("eval_abc123");

if (result.deleted) {
    console.log(`Successfully deleted evaluation: ${result.eval_id}`);
} else {
    console.log("Failed to delete evaluation");
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/evals/eval_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Delete Evaluation Response

```json
{
  "object": "eval.deleted",
  "deleted": true,
  "eval_id": "eval_abc123"
}
```

### List Evaluation Runs

Get all runs for a specific evaluation with filtering and pagination options.

#### List Evaluation Runs Endpoint

```http
GET /evals/{eval_id}/runs
```

#### List Evaluation Runs Parameters

| Parameter | Type    | Required | Description                                                                  |
| --------- | ------- | -------- | ---------------------------------------------------------------------------- |
| `eval_id` | string  | Yes      | The ID of the evaluation to retrieve runs for                                |
| `after`   | string  | No       | Pagination cursor for next page                                              |
| `limit`   | integer | No       | Number of runs to return                                                     |
| `order`   | string  | No       | Sort order: `asc` or `desc`                                                  |
| `status`  | string  | No       | Filter by status: `queued`, `in_progress`, `failed`, `completed`, `canceled` |

#### List Evaluation Runs Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get all runs for an evaluation
runs = client.evals.runs.list(
    "eval_abc123",
    limit=10,
    status="completed"
)

for run in runs.data:
    print(f"Run ID: {run.id}")
    print(f"Status: {run.status}")
    print(f"Score: {run.score}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const runs = await client.evals.runs.list("eval_abc123", {
    limit: 10,
    status: "completed"
});

runs.data.forEach(run => {
    console.log(`Run ID: ${run.id}`);
    console.log(`Status: ${run.status}`);
    console.log(`Score: ${run.score}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/evals/eval_abc123/runs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=10 \
  -d status=completed
```

### Create Evaluation Run

Start a new evaluation run to test a model against the evaluation's dataset and criteria.

#### Create Evaluation Run Endpoint

```http
POST /evals/{eval_id}/runs
```

#### Create Evaluation Run Parameters

| Parameter     | Type    | Required | Description                                        |
| ------------- | ------- | -------- | -------------------------------------------------- |
| `eval_id`     | string  | Yes      | The ID of the evaluation to run                    |
| `model`       | string  | Yes      | Model to evaluate (e.g., "gpt-4", "gpt-3.5-turbo") |
| `temperature` | number  | No       | Sampling temperature for the model                 |
| `max_tokens`  | integer | No       | Maximum tokens for model responses                 |

#### Create Evaluation Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Start a new evaluation run
run = client.evals.runs.create(
    "eval_abc123",
    model="gpt-4",
    temperature=0.2,
    max_tokens=1000
)

print(f"Started run: {run.id}")
print(f"Status: {run.status}")
print(f"Model: {run.model}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const run = await client.evals.runs.create("eval_abc123", {
    model: "gpt-4",
    temperature: 0.2,
    max_tokens: 1000
});

console.log(`Started run: ${run.id}`);
console.log(`Status: ${run.status}`);
console.log(`Model: ${run.model}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/evals/eval_abc123/runs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4",
    "temperature": 0.2,
    "max_tokens": 1000
  }'
```

#### Create Evaluation Run Response

```json
{
  "id": "run_def456",
  "eval_id": "eval_abc123",
  "status": "queued",
  "model": "gpt-4",
  "created_at": "2024-01-15T11:00:00Z",
  "parameters": {
    "temperature": 0.2,
    "max_tokens": 1000
  }
}
```

### Get Evaluation Run

Retrieve details for a specific evaluation run including status, scores, and results.

#### Get Evaluation Run Endpoint

```http
GET /evals/{eval_id}/runs/{run_id}
```

#### Get Evaluation Run Parameters

| Parameter | Type   | Required | Description                   |
| --------- | ------ | -------- | ----------------------------- |
| `eval_id` | string | Yes      | The ID of the evaluation      |
| `run_id`  | string | Yes      | The ID of the run to retrieve |

#### Get Evaluation Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get evaluation run details
run = client.evals.runs.retrieve(
    "eval_abc123",
    "run_def456"
)

print(f"Run ID: {run.id}")
print(f"Status: {run.status}")
print(f"Model: {run.model}")
print(f"Score: {run.score}")
print(f"Completed: {run.completed_at}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const run = await client.evals.runs.retrieve(
    "eval_abc123",
    "run_def456"
);

console.log(`Run ID: ${run.id}`);
console.log(`Status: ${run.status}`);
console.log(`Model: ${run.model}`);
console.log(`Score: ${run.score}`);
console.log(`Completed: ${run.completed_at}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/evals/eval_abc123/runs/run_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Get Evaluation Run Response

```json
{
  "id": "run_def456",
  "eval_id": "eval_abc123",
  "status": "completed",
  "model": "gpt-4",
  "score": 0.85,
  "created_at": "2024-01-15T11:00:00Z",
  "completed_at": "2024-01-15T11:15:00Z",
  "total_items": 100,
  "passed_items": 85
}
```

### Cancel Evaluation Run

Stop an ongoing evaluation run before completion.

#### Cancel Evaluation Run Endpoint

```http
POST /evals/{eval_id}/runs/{run_id}
```

#### Cancel Evaluation Run Parameters

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `eval_id` | string | Yes      | The ID of the evaluation    |
| `run_id`  | string | Yes      | The ID of the run to cancel |

#### Cancel Evaluation Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Cancel an ongoing evaluation run
cancelled_run = client.evals.runs.cancel(
    "eval_abc123",
    "run_def456"
)

print(f"Cancelled run: {cancelled_run.id}")
print(f"Status: {cancelled_run.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const cancelledRun = await client.evals.runs.cancel(
    "eval_abc123",
    "run_def456"
);

console.log(`Cancelled run: ${cancelledRun.id}`);
console.log(`Status: ${cancelledRun.status}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/evals/eval_abc123/runs/run_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Delete Evaluation Run

Permanently delete an evaluation run and all associated data.

#### Delete Evaluation Run Endpoint

```http
DELETE /evals/{eval_id}/runs/{run_id}
```

#### Delete Evaluation Run Parameters

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `eval_id` | string | Yes      | The ID of the evaluation    |
| `run_id`  | string | Yes      | The ID of the run to delete |

#### Delete Evaluation Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete an evaluation run
result = client.evals.runs.delete(
    "eval_abc123",
    "run_def456"
)

if result.deleted:
    print(f"Successfully deleted run: {result.run_id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.evals.runs.delete(
    "eval_abc123",
    "run_def456"
);

if (result.deleted) {
    console.log(`Successfully deleted run: ${result.run_id}`);
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/evals/eval_abc123/runs/run_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Delete Evaluation Run Response

```json
{
  "object": "eval.run.deleted",
  "deleted": true,
  "run_id": "run_def456"
}
```

### List Evaluation Run Output Items

Get detailed results and output items from an evaluation run for analysis.

#### List Run Output Items Endpoint

```http
GET /evals/{eval_id}/runs/{run_id}/output_items
```

#### List Run Output Items Parameters

| Parameter | Type    | Required | Description                          |
| --------- | ------- | -------- | ------------------------------------ |
| `eval_id` | string  | Yes      | The ID of the evaluation             |
| `run_id`  | string  | Yes      | The ID of the run                    |
| `after`   | string  | No       | Pagination cursor for next page      |
| `limit`   | integer | No       | Number of output items to return     |
| `status`  | string  | No       | Filter by status: `failed` or `pass` |
| `order`   | string  | No       | Sort order: `asc` or `desc`          |

#### List Run Output Items Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get output items from an evaluation run
output_items = client.evals.runs.output_items.list(
    "eval_abc123",
    "run_def456",
    status="failed",  # Only failed items for review
    limit=20
)

for item in output_items.data:
    print(f"Item ID: {item.id}")
    print(f"Status: {item.status}")
    print(f"Score: {item.score}")
    print(f"Input: {item.input}")
    print(f"Output: {item.output}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const outputItems = await client.evals.runs.outputItems.list(
    "eval_abc123",
    "run_def456",
    {
        status: "failed",
        limit: 20
    }
);

outputItems.data.forEach(item => {
    console.log(`Item ID: ${item.id}`);
    console.log(`Status: ${item.status}`);
    console.log(`Score: ${item.score}`);
    console.log(`Input: ${item.input}`);
    console.log(`Output: ${item.output}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/evals/eval_abc123/runs/run_def456/output_items \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d status=failed \
  -d limit=20
```

### Get Evaluation Run Output Item

Retrieve a specific output item from an evaluation run with detailed scoring information.

#### Get Run Output Item Endpoint

```http
GET /evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}
```

#### Get Run Output Item Parameters

| Parameter        | Type   | Required | Description               |
| ---------------- | ------ | -------- | ------------------------- |
| `eval_id`        | string | Yes      | The ID of the evaluation  |
| `run_id`         | string | Yes      | The ID of the run         |
| `output_item_id` | string | Yes      | The ID of the output item |

#### Get Run Output Item Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get specific output item details
item = client.evals.runs.output_items.retrieve(
    "eval_abc123",
    "run_def456",
    "item_ghi789"
)

print(f"Item ID: {item.id}")
print(f"Status: {item.status}")
print(f"Score: {item.score}")
print(f"Grader feedback: {item.grader_feedback}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const item = await client.evals.runs.outputItems.retrieve(
    "eval_abc123",
    "run_def456",
    "item_ghi789"
);

console.log(`Item ID: ${item.id}`);
console.log(`Status: ${item.status}`);
console.log(`Score: ${item.score}`);
console.log(`Grader feedback: ${item.grader_feedback}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/evals/eval_abc123/runs/run_def456/output_items/item_ghi789 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

## Files API

Manage file uploads for use with various OpenAI endpoints including Assistants, Fine-tuning, and Batch processing.

The Files API allows you to upload documents that can be used across different OpenAI features. Files are stored securely and can be referenced by their unique ID in subsequent API calls.

### Files Key Features

- **Multiple Use Cases**: Support for Assistants, Fine-tuning, and Batch processing
- **Large File Support**: Individual files up to 512 MB, 1 TB total per organization
- **Format Flexibility**: Support for various file types depending on use case
- **Secure Storage**: Files are encrypted and stored securely
- **Easy Management**: Simple upload, list, retrieve, and delete operations

### List Files

Retrieve all files uploaded to your organization with filtering options.

#### List Files Endpoint

```http
GET /files
```

#### List Files Parameters

| Parameter | Type    | Required | Description                                           |
| --------- | ------- | -------- | ----------------------------------------------------- |
| `purpose` | string  | No       | Filter files by purpose                               |
| `limit`   | integer | No       | Number of files to return (1-10,000, default: 10,000) |
| `order`   | string  | No       | Sort order: `asc` or `desc` by created_at             |
| `after`   | string  | No       | Pagination cursor for next page                       |

#### List Files Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all files
files = client.files.list()

for file in files.data:
    print(f"File ID: {file.id}")
    print(f"Filename: {file.filename}")
    print(f"Purpose: {file.purpose}")
    print(f"Size: {file.bytes} bytes")
    print("---")

# List files for specific purpose
assistant_files = client.files.list(purpose="assistants")
print(f"Found {len(assistant_files.data)} assistant files")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List all files
const files = await client.files.list();

files.data.forEach(file => {
    console.log(`File ID: ${file.id}`);
    console.log(`Filename: ${file.filename}`);
    console.log(`Purpose: ${file.purpose}`);
    console.log(`Size: ${file.bytes} bytes`);
    console.log("---");
});

// List files for specific purpose
const assistantFiles = await client.files.list({
    purpose: "assistants"
});
console.log(`Found ${assistantFiles.data.length} assistant files`);
```

**cURL:**

```bash
# List all files
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# List files with specific purpose
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d purpose=assistants \
  -d limit=50
```

### Upload File

Upload files for use with Assistants, Fine-tuning, or Batch processing.

Different endpoints have specific requirements:

- **Assistants API**: Up to 2M tokens, various file types
- **Fine-tuning API**: Only `.jsonl` files with specific formats
- **Batch API**: Only `.jsonl` files up to 200 MB

#### Upload File Endpoint

```http
POST /files
```

#### Upload File Parameters

| Parameter | Type   | Required | Description                                       |
| --------- | ------ | -------- | ------------------------------------------------- |
| `file`    | file   | Yes      | The file to upload                                |
| `purpose` | string | Yes      | Purpose: `assistants`, `fine-tune`, `batch`, etc. |

#### Upload File Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Upload file for assistants
with open("document.pdf", "rb") as file:
    uploaded_file = client.files.create(
        file=file,
        purpose="assistants"
    )

print(f"Uploaded file ID: {uploaded_file.id}")
print(f"Filename: {uploaded_file.filename}")
print(f"Size: {uploaded_file.bytes} bytes")

# Upload JSONL for fine-tuning
with open("training_data.jsonl", "rb") as file:
    training_file = client.files.create(
        file=file,
        purpose="fine-tune"
    )

print(f"Training file ID: {training_file.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

// Upload file for assistants
const uploadedFile = await client.files.create({
    file: fs.createReadStream("document.pdf"),
    purpose: "assistants"
});

console.log(`Uploaded file ID: ${uploadedFile.id}`);
console.log(`Filename: ${uploadedFile.filename}`);
console.log(`Size: ${uploadedFile.bytes} bytes`);

// Upload JSONL for fine-tuning
const trainingFile = await client.files.create({
    file: fs.createReadStream("training_data.jsonl"),
    purpose: "fine-tune"
});

console.log(`Training file ID: ${trainingFile.id}`);
```

**cURL:**

```bash
# Upload file for assistants
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "purpose=assistants" \
  -F "file=@document.pdf"

# Upload JSONL for fine-tuning
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "purpose=fine-tune" \
  -F "file=@training_data.jsonl"
```

#### Upload File Response

```json
{
  "id": "file-abc123",
  "bytes": 175542,
  "created_at": 1699564176,
  "filename": "document.pdf",
  "object": "file",
  "purpose": "assistants",
  "status": "processed"
}
```

### Delete File

Permanently remove a file from your organization's storage.

#### Delete File Endpoint

```http
DELETE /files/{file_id}
```

#### Delete File Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `file_id` | string | Yes      | The ID of the file to delete |

#### Delete File Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete a file
result = client.files.delete("file-abc123")

if result.deleted:
    print(f"Successfully deleted file: {result.id}")
else:
    print("Failed to delete file")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.files.delete("file-abc123");

if (result.deleted) {
    console.log(`Successfully deleted file: ${result.id}`);
} else {
    console.log("Failed to delete file");
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/files/file-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Retrieve File Info

Get detailed information about a specific file including metadata and processing status.

#### Retrieve File Endpoint

```http
GET /files/{file_id}
```

#### Retrieve File Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| `file_id` | string | Yes      | The ID of the file to retrieve |

#### Retrieve File Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get file information
file_info = client.files.retrieve("file-abc123")

print(f"File ID: {file_info.id}")
print(f"Filename: {file_info.filename}")
print(f"Purpose: {file_info.purpose}")
print(f"Size: {file_info.bytes} bytes")
print(f"Status: {file_info.status}")
print(f"Created: {file_info.created_at}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const fileInfo = await client.files.retrieve("file-abc123");

console.log(`File ID: ${fileInfo.id}`);
console.log(`Filename: ${fileInfo.filename}`);
console.log(`Purpose: ${fileInfo.purpose}`);
console.log(`Size: ${fileInfo.bytes} bytes`);
console.log(`Status: ${fileInfo.status}`);
console.log(`Created: ${fileInfo.created_at}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/files/file-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Retrieve File Response

```json
{
  "id": "file-abc123",
  "bytes": 175542,
  "created_at": 1699564176,
  "filename": "document.pdf",
  "object": "file",
  "purpose": "assistants",
  "status": "processed"
}
```

## GET /files/{file_id}/content

Retrieve file content

Returns the contents of the specified file.

### Parameters

| Name    | Type   | Required | Description                                 |
| ------- | ------ | -------- | ------------------------------------------- |
| file_id | string | True     | The ID of the file to use for this request. |

### Responses

#### 200

OK

string

## POST /fine_tuning/alpha/graders/run

Run grader

Run a grader.

### Request Body

[RunGraderRequest](#rungraderrequest)

### Responses

#### 200

OK

[RunGraderResponse](#rungraderresponse)

## POST /fine_tuning/alpha/graders/validate

Validate grader

Validate a grader.

### Request Body

[ValidateGraderRequest](#validategraderrequest)

### Responses

#### 200

OK

[ValidateGraderResponse](#validategraderresponse)

## GET /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions

List checkpoint permissions

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Parameters

| Name                        | Type    | Required | Description                                                                 |
| --------------------------- | ------- | -------- | --------------------------------------------------------------------------- |
| fine_tuned_model_checkpoint | string  | True     | The ID of the fine-tuned model checkpoint to get permissions for.           |
| project_id                  | string  | False    | The ID of the project to get permissions for.                               |
| after                       | string  | False    | Identifier for the last permission ID from the previous pagination request. |
| limit                       | integer | False    | Number of permissions to retrieve.                                          |
| order                       | string  | False    | The order in which to retrieve permissions.                                 |

### Responses

#### 200

OK

[ListFineTuningCheckpointPermissionResponse](#listfinetuningcheckpointpermissionresponse)

## POST /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions

Create checkpoint permissions

**NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).

This enables organization owners to share fine-tuned models with other projects in their organization.

### Parameters

| Name                        | Type   | Required | Description                                                           |
| --------------------------- | ------ | -------- | --------------------------------------------------------------------- |
| fine_tuned_model_checkpoint | string | True     | The ID of the fine-tuned model checkpoint to create a permission for. |

### Request Body

[CreateFineTuningCheckpointPermissionRequest](#createfinetuningcheckpointpermissionrequest)

### Responses

#### 200

OK

[ListFineTuningCheckpointPermissionResponse](#listfinetuningcheckpointpermissionresponse)

## DELETE /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}

Delete checkpoint permission

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.

### Parameters

| Name                        | Type   | Required | Description                                                           |
| --------------------------- | ------ | -------- | --------------------------------------------------------------------- |
| fine_tuned_model_checkpoint | string | True     | The ID of the fine-tuned model checkpoint to delete a permission for. |
| permission_id               | string | True     | The ID of the fine-tuned model checkpoint permission to delete.       |

### Responses

#### 200

OK

---

## Fine-tuning API

Create custom models by fine-tuning OpenAI's base models with your specific data.

Fine-tuning allows you to customize OpenAI models for your specific use case by training on your own data. This can significantly improve performance for specialized tasks and reduce the need for extensive prompting.

### Fine-tuning Key Features

- **Custom Model Creation**: Train models specifically for your use case
- **Improved Performance**: Better results than base models for specialized tasks
- **Cost Effective**: Potentially reduce token usage through better task-specific performance
- **Full Control**: Monitor training progress and manage job lifecycle
- **Model Versioning**: Keep track of different fine-tuned model versions

### Create Fine-tuning Job

Start a new fine-tuning job to create a custom model from your training data.

#### Create Fine-tuning Job Endpoint

```http
POST /fine_tuning/jobs
```

#### Create Fine-tuning Job Parameters

| Parameter         | Type   | Required | Description                                     |
| ----------------- | ------ | -------- | ----------------------------------------------- |
| `model`           | string | Yes      | Base model to fine-tune (e.g., "gpt-3.5-turbo") |
| `training_file`   | string | Yes      | File ID of training data in JSONL format        |
| `validation_file` | string | No       | File ID of validation data                      |
| `hyperparameters` | object | No       | Training hyperparameters                        |
| `suffix`          | string | No       | Suffix for the fine-tuned model name            |

#### Create Fine-tuning Job Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create a fine-tuning job
job = client.fine_tuning.jobs.create(
    model="gpt-3.5-turbo",
    training_file="file-abc123",
    validation_file="file-def456",
    hyperparameters={
        "n_epochs": 3,
        "batch_size": 1,
        "learning_rate_multiplier": 0.1
    },
    suffix="my-custom-model"
)

print(f"Job ID: {job.id}")
print(f"Status: {job.status}")
print(f"Model: {job.model}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const job = await client.fineTuning.jobs.create({
    model: "gpt-3.5-turbo",
    training_file: "file-abc123",
    validation_file: "file-def456",
    hyperparameters: {
        n_epochs: 3,
        batch_size: 1,
        learning_rate_multiplier: 0.1
    },
    suffix: "my-custom-model"
});

console.log(`Job ID: ${job.id}`);
console.log(`Status: ${job.status}`);
console.log(`Model: ${job.model}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "training_file": "file-abc123",
    "validation_file": "file-def456",
    "hyperparameters": {
      "n_epochs": 3,
      "batch_size": 1,
      "learning_rate_multiplier": 0.1
    },
    "suffix": "my-custom-model"
  }'
```

### List Fine-tuning Jobs

#### List Fine-tuning Jobs Endpoint

```http
GET /fine_tuning/jobs
```

#### List Fine-tuning Jobs Parameters

| Parameter  | Type    | Required | Description                        |
| ---------- | ------- | -------- | ---------------------------------- |
| `after`    | string  | No       | Pagination cursor for next page    |
| `limit`    | integer | No       | Number of jobs to return           |
| `metadata` | object  | No       | Filter by metadata key-value pairs |

#### List Fine-tuning Jobs Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all fine-tuning jobs
jobs = client.fine_tuning.jobs.list(limit=10)

for job in jobs.data:
    print(f"Job ID: {job.id}")
    print(f"Status: {job.status}")
    print(f"Model: {job.model}")
    print(f"Fine-tuned model: {job.fine_tuned_model}")
    print("---")

# Filter by metadata
filtered_jobs = client.fine_tuning.jobs.list(
    metadata={"project": "customer_support"}
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List all fine-tuning jobs
const jobs = await client.fineTuning.jobs.list({
    limit: 10
});

jobs.data.forEach(job => {
    console.log(`Job ID: ${job.id}`);
    console.log(`Status: ${job.status}`);
    console.log(`Model: ${job.model}`);
    console.log(`Fine-tuned model: ${job.fine_tuned_model}`);
    console.log("---");
});

// Filter by metadata
const filteredJobs = await client.fineTuning.jobs.list({
    metadata: {
        project: "customer_support"
    }
});
```

**cURL:**

```bash
# List all fine-tuning jobs
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Filter by metadata
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d 'metadata[project]=customer_support' \
  -d limit=10
```

## GET /fine_tuning/jobs/{fine_tuning_job_id}

Retrieve fine-tuning job

Get info about a fine-tuning job.

[Learn more about fine-tuning](https://platform.openai.com/docs/guides/model-optimization)

### Parameters

| Name               | Type   | Required | Description                    |
| ------------------ | ------ | -------- | ------------------------------ |
| fine_tuning_job_id | string | True     | The ID of the fine-tuning job. |

### Responses

#### 200

OK

[FineTuningJob](#finetuningjob)

## POST /fine_tuning/jobs/{fine_tuning_job_id}/cancel

Cancel fine-tuning

Immediately cancel a fine-tune job.

### Parameters

| Name               | Type   | Required | Description                              |
| ------------------ | ------ | -------- | ---------------------------------------- |
| fine_tuning_job_id | string | True     | The ID of the fine-tuning job to cancel. |

### Responses

#### 200

OK

[FineTuningJob](#finetuningjob)

## GET /fine_tuning/jobs/{fine_tuning_job_id}/checkpoints

List fine-tuning checkpoints

List checkpoints for a fine-tuning job.

### Parameters

| Name               | Type    | Required | Description                                                                 |
| ------------------ | ------- | -------- | --------------------------------------------------------------------------- |
| fine_tuning_job_id | string  | True     | The ID of the fine-tuning job to get checkpoints for.                       |
| after              | string  | False    | Identifier for the last checkpoint ID from the previous pagination request. |
| limit              | integer | False    | Number of checkpoints to retrieve.                                          |

### Responses

#### 200

OK

[ListFineTuningJobCheckpointsResponse](#listfinetuningjobcheckpointsresponse)

## GET /fine_tuning/jobs/{fine_tuning_job_id}/events

List fine-tuning events

Get status updates for a fine-tuning job.

### Parameters

| Name               | Type    | Required | Description                                                         |
| ------------------ | ------- | -------- | ------------------------------------------------------------------- |
| fine_tuning_job_id | string  | True     | The ID of the fine-tuning job to get events for.                    |
| after              | string  | False    | Identifier for the last event from the previous pagination request. |
| limit              | integer | False    | Number of events to retrieve.                                       |

### Responses

#### 200

OK

[ListFineTuningJobEventsResponse](#listfinetuningjobeventsresponse)

## POST /fine_tuning/jobs/{fine_tuning_job_id}/pause

Pause fine-tuning

Pause a fine-tune job.

### Parameters

| Name               | Type   | Required | Description                             |
| ------------------ | ------ | -------- | --------------------------------------- |
| fine_tuning_job_id | string | True     | The ID of the fine-tuning job to pause. |

### Responses

#### 200

OK

[FineTuningJob](#finetuningjob)

## POST /fine_tuning/jobs/{fine_tuning_job_id}/resume

Resume fine-tuning

Resume a fine-tune job.

### Parameters

| Name               | Type   | Required | Description                              |
| ------------------ | ------ | -------- | ---------------------------------------- |
| fine_tuning_job_id | string | True     | The ID of the fine-tuning job to resume. |

### Responses

#### 200

OK

[FineTuningJob](#finetuningjob)

## POST /images/edits

Create image edit

Creates an edited or extended image given one or more source images and a prompt. This endpoint only supports`gpt-image-1`and`dall-e-2`.

### Request Body

[CreateImageEditRequest](#createimageeditrequest)

### Responses

#### 200

OK

[ImagesResponse](#imagesresponse)

[ImageEditStreamEvent](#imageeditstreamevent)

## POST /images/generations

Create image

Creates an image given a prompt. [Learn more](https://platform.openai.com/docs/guides/images).

### Request Body

[CreateImageRequest](#createimagerequest)

### Responses

#### 200

OK

[ImagesResponse](#imagesresponse)

[ImageGenStreamEvent](#imagegenstreamevent)

## POST /images/variations

Create image variation

Creates a variation of a given image. This endpoint only supports `dall-e-2`.

### Request Body

[CreateImageVariationRequest](#createimagevariationrequest)

### Responses

#### 200

OK

[ImagesResponse](#imagesresponse)

## GET /models

List models

Lists the currently available models, and provides basic information about each one such as the owner and availability.

### Responses

#### 200

OK

[ListModelsResponse](#listmodelsresponse)

## GET /models/{model}

Retrieve model

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

### Parameters

| Name  | Type   | Required | Description                                 |
| ----- | ------ | -------- | ------------------------------------------- |
| model | string | True     | The ID of the model to use for this request |

### Responses

#### 200

OK

[Model](#model)

## DELETE /models/{model}

Delete a fine-tuned model

Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.

### Parameters

| Name  | Type   | Required | Description         |
| ----- | ------ | -------- | ------------------- |
| model | string | True     | The model to delete |

### Responses

#### 200

OK

[DeleteModelResponse](#deletemodelresponse)

## POST /moderations

Create moderation

Classifies if text and/or image inputs are potentially harmful. Learn
more in the [moderation guide](https://platform.openai.com/docs/guides/moderation).

### Request Body

[CreateModerationRequest](#createmoderationrequest)

### Responses

#### 200

OK

[CreateModerationResponse](#createmoderationresponse)

## GET /organization/admin_api_keys

List all organization and project API keys.

List organization API keys

### Parameters

| Name  | Type    | Required | Description |
| ----- | ------- | -------- | ----------- |
| after | string  | False    |
| order | string  | False    |
| limit | integer | False    |

### Responses

#### 200

A list of organization API keys.

[ApiKeyList](#apikeylist)

## POST /organization/admin_api_keys

Create admin API key

Create an organization admin API key

### Request Body

object

| Field | Type   | Description |
| ----- | ------ | ----------- |
| name  | string |

### Responses

#### 200

The newly created admin API key.

[AdminApiKey](#adminapikey)

## GET /organization/admin_api_keys/{key_id}

Retrieve admin API key

Retrieve a single organization API key

### Parameters

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| key_id | string | True     |

### Responses

#### 200

Details of the requested API key.

[AdminApiKey](#adminapikey)

## DELETE /organization/admin_api_keys/{key_id}

Delete admin API key

Delete an organization admin API key

### Parameters

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| key_id | string | True     |

### Responses

#### 200

Confirmation that the API key was deleted.

---

## Organization Management API

Comprehensive organization administration including audit logs, certificates, user management, projects, and usage monitoring.

The Organization Management API provides enterprise-grade tools for managing your OpenAI organization. This includes security monitoring through audit logs, SSL certificate management, user and project administration, cost tracking, and detailed usage analytics.

### Organization Management Key Features

- **Audit & Security**: Complete audit trail of all organization activities
- **Certificate Management**: SSL certificate upload, activation, and lifecycle management
- **User Administration**: Invite management and user access control
- **Project Management**: Create, organize, and manage projects within your organization
- **Cost & Usage Tracking**: Detailed analytics and usage monitoring across projects
- **Enterprise Controls**: Advanced administrative features for large organizations

### Audit Logs

Monitor all user actions and configuration changes within your organization for security and compliance.

#### List Audit Logs Endpoint

```http
GET /organization/audit_logs
```

#### List Audit Logs Parameters

| Parameter        | Type    | Required | Description                                     |
| ---------------- | ------- | -------- | ----------------------------------------------- |
| `effective_at`   | object  | No       | Filter events by effective timestamp range      |
| `project_ids[]`  | array   | No       | Return events only for specific projects        |
| `event_types[]`  | array   | No       | Filter by event types (e.g., `project.created`) |
| `actor_ids[]`    | array   | No       | Filter by specific actor IDs                    |
| `actor_emails[]` | array   | No       | Filter by user email addresses                  |
| `resource_ids[]` | array   | No       | Filter by target resource IDs                   |
| `limit`          | integer | No       | Number of events to return (1-100, default: 20) |
| `after`          | string  | No       | Pagination cursor for next page                 |
| `before`         | string  | No       | Pagination cursor for previous page             |

#### List Audit Logs Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List recent audit logs
audit_logs = client.organization.audit_logs.list(
    limit=50,
    event_types=["project.created", "user.added", "api_key.created"]
)

for log in audit_logs.data:
    print(f"Event: {log.type}")
    print(f"Actor: {log.actor.email}")
    print(f"Timestamp: {log.effective_at}")
    print(f"Resource: {log.resource_id}")
    print("---")

# Filter by specific project
project_logs = client.organization.audit_logs.list(
    project_ids=["proj_abc123"],
    effective_at={
        "gte": 1699564176,  # Unix timestamp
        "lte": 1699650576
    }
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List recent audit logs
const auditLogs = await client.organization.auditLogs.list({
    limit: 50,
    event_types: ["project.created", "user.added", "api_key.created"]
});

auditLogs.data.forEach(log => {
    console.log(`Event: ${log.type}`);
    console.log(`Actor: ${log.actor.email}`);
    console.log(`Timestamp: ${log.effective_at}`);
    console.log(`Resource: ${log.resource_id}`);
    console.log("---");
});

// Filter by specific project
const projectLogs = await client.organization.auditLogs.list({
    project_ids: ["proj_abc123"],
    effective_at: {
        gte: 1699564176,
        lte: 1699650576
    }
});
```

**cURL:**

```bash
# List recent audit logs
curl https://api.openai.com/v1/organization/audit_logs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=50 \
  -d 'event_types[]=project.created' \
  -d 'event_types[]=user.added'

# Filter by project and date range
curl https://api.openai.com/v1/organization/audit_logs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d 'project_ids[]=proj_abc123' \
  -d 'effective_at[gte]=1699564176' \
  -d 'effective_at[lte]=1699650576'
```

#### List Audit Logs Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "audit_log_abc123",
      "type": "project.created",
      "effective_at": 1699564176,
      "actor": {
        "type": "user",
        "user": {
          "id": "user_abc123",
          "email": "admin@company.com"
        }
      },
      "resource_id": "proj_def456",
      "details": {
        "name": "Customer Support Project"
      }
    }
  ],
  "first_id": "audit_log_abc123",
  "last_id": "audit_log_xyz789",
  "has_more": false
}
```

---

### SSL Certificate Management

Manage SSL certificates for secure API communications and custom domains.

#### List Organization Certificates

Retrieve all SSL certificates uploaded to your organization.

#### List Certificates Endpoint

```http
GET /organization/certificates
```

#### List Certificates Parameters

| Parameter | Type    | Required | Description                                           |
| --------- | ------- | -------- | ----------------------------------------------------- |
| `limit`   | integer | No       | Number of certificates to return (1-100, default: 20) |
| `after`   | string  | No       | Pagination cursor for next page                       |
| `order`   | string  | No       | Sort order: `asc` or `desc` by created_at             |

#### List Certificates Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all certificates
certificates = client.organization.certificates.list()

for cert in certificates.data:
    print(f"Certificate ID: {cert.id}")
    print(f"Name: {cert.name}")
    print(f"Status: {cert.status}")
    print(f"Expires: {cert.expires_at}")
    print(f"Domains: {', '.join(cert.domains)}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const certificates = await client.organization.certificates.list();

certificates.data.forEach(cert => {
    console.log(`Certificate ID: ${cert.id}`);
    console.log(`Name: ${cert.name}`);
    console.log(`Status: ${cert.status}`);
    console.log(`Expires: ${cert.expires_at}`);
    console.log(`Domains: ${cert.domains.join(', ')}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/certificates \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=20 \
  -d order=desc
```

#### Upload Certificate

Upload a new SSL certificate to your organization. Note that uploading does not automatically activate the certificate.

#### Upload Certificate Endpoint

```http
POST /organization/certificates
```

#### Upload Certificate Parameters

| Parameter           | Type   | Required | Description                       |
| ------------------- | ------ | -------- | --------------------------------- |
| `name`              | string | Yes      | Friendly name for the certificate |
| `certificate`       | string | Yes      | PEM-encoded certificate content   |
| `private_key`       | string | Yes      | PEM-encoded private key           |
| `certificate_chain` | string | No       | PEM-encoded certificate chain     |

#### Upload Certificate Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Read certificate files
with open("certificate.pem", "r") as cert_file:
    certificate = cert_file.read()

with open("private_key.pem", "r") as key_file:
    private_key = key_file.read()

with open("chain.pem", "r") as chain_file:
    certificate_chain = chain_file.read()

# Upload certificate
uploaded_cert = client.organization.certificates.create(
    name="Production SSL Certificate",
    certificate=certificate,
    private_key=private_key,
    certificate_chain=certificate_chain
)

print(f"Uploaded certificate ID: {uploaded_cert.id}")
print(f"Status: {uploaded_cert.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

// Read certificate files
const certificate = fs.readFileSync("certificate.pem", "utf8");
const privateKey = fs.readFileSync("private_key.pem", "utf8");
const certificateChain = fs.readFileSync("chain.pem", "utf8");

const uploadedCert = await client.organization.certificates.create({
    name: "Production SSL Certificate",
    certificate: certificate,
    private_key: privateKey,
    certificate_chain: certificateChain
});

console.log(`Uploaded certificate ID: ${uploadedCert.id}`);
console.log(`Status: ${uploadedCert.status}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/certificates \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production SSL Certificate",
    "certificate": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
    "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
    "certificate_chain": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
  }'
```

#### Activate Certificates

Activate one or more certificates for use in your organization. Up to 10 certificates can be activated atomically.

#### Activate Certificates Endpoint

```http
POST /organization/certificates/activate
```

#### Activate Certificates Parameters

| Parameter         | Type  | Required | Description                                   |
| ----------------- | ----- | -------- | --------------------------------------------- |
| `certificate_ids` | array | Yes      | Array of certificate IDs to activate (max 10) |

#### Activate Certificates Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Activate multiple certificates
result = client.organization.certificates.activate(
    certificate_ids=["cert_abc123", "cert_def456"]
)

for cert in result.data:
    print(f"Certificate {cert.id}: {cert.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.certificates.activate({
    certificate_ids: ["cert_abc123", "cert_def456"]
});

result.data.forEach(cert => {
    console.log(`Certificate ${cert.id}: ${cert.status}`);
});
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/certificates/activate \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "certificate_ids": ["cert_abc123", "cert_def456"]
  }'
```

#### Deactivate Certificates

Deactivate one or more certificates in your organization. Up to 10 certificates can be deactivated atomically.

#### Deactivate Certificates Endpoint

```http
POST /organization/certificates/deactivate
```

#### Deactivate Certificates Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Deactivate certificates
result = client.organization.certificates.deactivate(
    certificate_ids=["cert_abc123", "cert_def456"]
)

for cert in result.data:
    print(f"Certificate {cert.id}: {cert.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.certificates.deactivate({
    certificate_ids: ["cert_abc123", "cert_def456"]
});

result.data.forEach(cert => {
    console.log(`Certificate ${cert.id}: ${cert.status}`);
});
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/certificates/deactivate \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "certificate_ids": ["cert_abc123", "cert_def456"]
  }'
```

#### Get Certificate

Retrieve detailed information about a specific certificate, including its content if requested.

#### Get Certificate Endpoint

```http
GET /organization/certificates/{certificate_id}
```

#### Get Certificate Parameters

| Parameter        | Type   | Required | Description                                                     |
| ---------------- | ------ | -------- | --------------------------------------------------------------- |
| `certificate_id` | string | Yes      | Unique ID of the certificate to retrieve                        |
| `include`        | array  | No       | Additional fields to include (e.g., `["content"]` for PEM data) |

#### Get Certificate Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get certificate metadata
cert = client.organization.certificates.retrieve("cert_abc123")

print(f"Certificate: {cert.name}")
print(f"Status: {cert.status}")
print(f"Domains: {', '.join(cert.domains)}")
print(f"Expires: {cert.expires_at}")

# Get certificate with PEM content
cert_with_content = client.organization.certificates.retrieve(
    "cert_abc123",
    include=["content"]
)

print(f"PEM Content: {cert_with_content.content}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Get certificate metadata
const cert = await client.organization.certificates.retrieve("cert_abc123");

console.log(`Certificate: ${cert.name}`);
console.log(`Status: ${cert.status}`);
console.log(`Domains: ${cert.domains.join(', ')}`);
console.log(`Expires: ${cert.expires_at}`);

// Get certificate with PEM content
const certWithContent = await client.organization.certificates.retrieve(
    "cert_abc123",
    { include: ["content"] }
);

console.log(`PEM Content: ${certWithContent.content}`);
```

**cURL:**

```bash
# Get certificate metadata
curl https://api.openai.com/v1/organization/certificates/cert_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Get certificate with PEM content
curl https://api.openai.com/v1/organization/certificates/cert_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d 'include[]=content'
```

#### Update Certificate

Modify certificate properties. Currently only the certificate name can be updated.

#### Update Certificate Endpoint

```http
POST /organization/certificates/{certificate_id}
```

#### Update Certificate Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update certificate name
updated_cert = client.organization.certificates.update(
    "cert_abc123",
    name="Updated Production Certificate"
)

print(f"Updated certificate: {updated_cert.name}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const updatedCert = await client.organization.certificates.update(
    "cert_abc123",
    { name: "Updated Production Certificate" }
);

console.log(`Updated certificate: ${updatedCert.name}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/certificates/cert_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Production Certificate"
  }'
```

#### Delete Certificate

Permanently delete a certificate from your organization. The certificate must be inactive across all projects.

#### Delete Certificate Endpoint

```http
DELETE /organization/certificates/{certificate_id}
```

#### Delete Certificate Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete certificate
result = client.organization.certificates.delete("cert_abc123")

if result.deleted:
    print(f"Successfully deleted certificate: {result.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.certificates.delete("cert_abc123");

if (result.deleted) {
    console.log(`Successfully deleted certificate: ${result.id}`);
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/organization/certificates/cert_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

### Organization Costs & Usage

Monitor spending and usage patterns across your organization and projects.

#### Get Organization Costs

Retrieve detailed cost breakdown and spending analytics for your organization across all projects.

#### Get Costs Endpoint

```http
GET /organization/costs
```

#### Get Costs Parameters

| Parameter      | Type    | Required | Description                                     |
| -------------- | ------- | -------- | ----------------------------------------------- |
| `start_time`   | integer | Yes      | Start time (Unix seconds) of query range        |
| `end_time`     | integer | No       | End time (Unix seconds) of query range          |
| `bucket_width` | string  | No       | Time bucket width: `1d` (default)               |
| `project_ids`  | array   | No       | Filter costs for specific projects              |
| `group_by`     | array   | No       | Group by: `project_id`, `line_item`             |
| `limit`        | integer | No       | Number of buckets to return (1-180, default: 7) |
| `page`         | string  | No       | Pagination cursor                               |

#### Get Costs Examples

**Python:**

```python
from openai import OpenAI
import datetime

client = OpenAI()

# Get costs for the last 7 days
start_time = int((datetime.datetime.now() - datetime.timedelta(days=7)).timestamp())
end_time = int(datetime.datetime.now().timestamp())

costs = client.organization.costs.list(
    start_time=start_time,
    end_time=end_time,
    group_by=["project_id", "line_item"]
)

print(f"Total cost buckets: {len(costs.data)}")
for bucket in costs.data:
    print(f"Date: {bucket.start_time}")
    print(f"Total cost: ${bucket.cost_usd}")
    for result in bucket.results:
        print(f"  Project: {result.project_id}")
        print(f"  Item: {result.line_item}")
        print(f"  Cost: ${result.cost_usd}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Get costs for the last 30 days
const endTime = Math.floor(Date.now() / 1000);
const startTime = endTime - (30 * 24 * 60 * 60); // 30 days ago

const costs = await client.organization.costs.list({
    start_time: startTime,
    end_time: endTime,
    bucket_width: "1d",
    group_by: ["project_id"]
});

console.log(`Total cost buckets: ${costs.data.length}`);
costs.data.forEach(bucket => {
    console.log(`Date: ${new Date(bucket.start_time * 1000).toISOString()}`);
    console.log(`Total cost: $${bucket.cost_usd}`);
    bucket.results.forEach(result => {
        console.log(`  Project: ${result.project_id} - $${result.cost_usd}`);
    });
    console.log("---");
});
```

**cURL:**

```bash
# Get costs for the last 7 days
curl "https://api.openai.com/v1/organization/costs" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d start_time=1699564176 \
  -d end_time=1700168976 \
  -d bucket_width=1d \
  -d 'group_by[]=project_id' \
  -d 'group_by[]=line_item'
```

#### Get Costs Response

```json
{
  "object": "list",
  "data": [
    {
      "start_time": 1699564176,
      "end_time": 1699650576,
      "cost_usd": 125.50,
      "results": [
        {
          "project_id": "proj_abc123",
          "line_item": "gpt-4-turbo",
          "cost_usd": 87.25
        },
        {
          "project_id": "proj_def456",
          "line_item": "gpt-3.5-turbo",
          "cost_usd": 38.25
        }
      ]
    }
  ],
  "has_more": false,
  "next_page": null
}
```

---

### User & Invite Management

Manage user invitations and access control within your organization.

#### List Organization Invites

Retrieve all pending and accepted invites for your organization.

#### List Invites Endpoint

```http
GET /organization/invites
```

#### List Invites Parameters

| Parameter | Type    | Required | Description                                      |
| --------- | ------- | -------- | ------------------------------------------------ |
| `limit`   | integer | No       | Number of invites to return (1-100, default: 20) |
| `after`   | string  | No       | Pagination cursor for next page                  |

#### List Invites Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all invites
invites = client.organization.invites.list()

for invite in invites.data:
    print(f"Invite ID: {invite.id}")
    print(f"Email: {invite.email}")
    print(f"Role: {invite.role}")
    print(f"Status: {invite.status}")
    print(f"Expires: {invite.expires_at}")
    print("---")

# Filter with pagination
pending_invites = client.organization.invites.list(limit=50)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const invites = await client.organization.invites.list();

invites.data.forEach(invite => {
    console.log(`Invite ID: ${invite.id}`);
    console.log(`Email: ${invite.email}`);
    console.log(`Role: ${invite.role}`);
    console.log(`Status: ${invite.status}`);
    console.log(`Expires: ${invite.expires_at}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/invites \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d limit=20
```

#### Create Organization Invite

Send an invitation to a user to join your organization with specified role and permissions.

#### Create Invite Endpoint

```http
POST /organization/invites
```

#### Create Invite Parameters

| Parameter  | Type   | Required | Description                                |
| ---------- | ------ | -------- | ------------------------------------------ |
| `email`    | string | Yes      | Email address of the user to invite        |
| `role`     | string | Yes      | Role to assign: `owner`, `admin`, `member` |
| `projects` | array  | No       | Project-specific access permissions        |

#### Create Invite Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create organization invite
invite = client.organization.invites.create(
    email="newuser@company.com",
    role="member"
)

print(f"Created invite: {invite.id}")
print(f"Email: {invite.email}")
print(f"Status: {invite.status}")
print(f"Expires: {invite.expires_at}")

# Create invite with project access
project_invite = client.organization.invites.create(
    email="developer@company.com",
    role="member",
    projects=[
        {
            "project_id": "proj_abc123",
            "role": "member"
        }
    ]
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Create organization invite
const invite = await client.organization.invites.create({
    email: "newuser@company.com",
    role: "member"
});

console.log(`Created invite: ${invite.id}`);
console.log(`Email: ${invite.email}`);
console.log(`Status: ${invite.status}`);
console.log(`Expires: ${invite.expires_at}`);

// Create invite with project access
const projectInvite = await client.organization.invites.create({
    email: "developer@company.com",
    role: "member",
    projects: [{
        project_id: "proj_abc123",
        role: "member"
    }]
});
```

**cURL:**

```bash
# Create basic invite
curl https://api.openai.com/v1/organization/invites \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@company.com",
    "role": "member"
  }'

# Create invite with project access
curl https://api.openai.com/v1/organization/invites \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@company.com",
    "role": "member",
    "projects": [{
      "project_id": "proj_abc123",
      "role": "member"
    }]
  }'
```

#### Retrieve Invite

Get detailed information about a specific organization invite.

#### Retrieve Invite Endpoint

```http
GET /organization/invites/{invite_id}
```

#### Retrieve Invite Parameters

| Parameter   | Type   | Required | Description                      |
| ----------- | ------ | -------- | -------------------------------- |
| `invite_id` | string | Yes      | The ID of the invite to retrieve |

#### Retrieve Invite Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get invite details
invite = client.organization.invites.retrieve("invite_abc123")

print(f"Invite ID: {invite.id}")
print(f"Email: {invite.email}")
print(f"Role: {invite.role}")
print(f"Status: {invite.status}")
print(f"Created: {invite.created_at}")
print(f"Expires: {invite.expires_at}")

if invite.projects:
    print("Project access:")
    for project in invite.projects:
        print(f"  Project: {project.project_id} - Role: {project.role}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const invite = await client.organization.invites.retrieve("invite_abc123");

console.log(`Invite ID: ${invite.id}`);
console.log(`Email: ${invite.email}`);
console.log(`Role: ${invite.role}`);
console.log(`Status: ${invite.status}`);
console.log(`Created: ${invite.created_at}`);
console.log(`Expires: ${invite.expires_at}`);

if (invite.projects) {
    console.log("Project access:");
    invite.projects.forEach(project => {
        console.log(`  Project: ${project.project_id} - Role: ${project.role}`);
    });
}
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/invites/invite_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Delete Invite

Remove an invite from your organization. Note that accepted invites cannot be deleted.

#### Delete Invite Endpoint

```http
DELETE /organization/invites/{invite_id}
```

#### Delete Invite Parameters

| Parameter   | Type   | Required | Description                    |
| ----------- | ------ | -------- | ------------------------------ |
| `invite_id` | string | Yes      | The ID of the invite to delete |

#### Delete Invite Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete an invite
result = client.organization.invites.delete("invite_abc123")

if result.deleted:
    print(f"Successfully deleted invite: {result.id}")
else:
    print("Failed to delete invite")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.invites.delete("invite_abc123");

if (result.deleted) {
    console.log(`Successfully deleted invite: ${result.id}`);
} else {
    console.log("Failed to delete invite");
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/organization/invites/invite_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

### Project Management

Create and manage projects within your organization for better resource organization and access control.

#### List Projects

Retrieve all projects in your organization with their current status and configuration.

#### List Projects Endpoint

```http
GET /organization/projects
```

#### List Projects Parameters

| Parameter          | Type    | Required | Description                                       |
| ------------------ | ------- | -------- | ------------------------------------------------- |
| `limit`            | integer | No       | Number of projects to return (1-100, default: 20) |
| `after`            | string  | No       | Pagination cursor for next page                   |
| `include_archived` | boolean | No       | Include archived projects (default: false)        |

#### List Projects Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List active projects
projects = client.organization.projects.list()

for project in projects.data:
    print(f"Project ID: {project.id}")
    print(f"Name: {project.name}")
    print(f"Status: {project.status}")
    print(f"Created: {project.created_at}")
    print("---")

# Include archived projects
all_projects = client.organization.projects.list(
    include_archived=True,
    limit=50
)

print(f"Total projects (including archived): {len(all_projects.data)}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List active projects
const projects = await client.organization.projects.list();

projects.data.forEach(project => {
    console.log(`Project ID: ${project.id}`);
    console.log(`Name: ${project.name}`);
    console.log(`Status: ${project.status}`);
    console.log(`Created: ${project.created_at}`);
    console.log("---");
});

// Include archived projects
const allProjects = await client.organization.projects.list({
    include_archived: true,
    limit: 50
});

console.log(`Total projects (including archived): ${allProjects.data.length}`);
```

**cURL:**

```bash
# List active projects
curl https://api.openai.com/v1/organization/projects \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Include archived projects
curl https://api.openai.com/v1/organization/projects \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -G \
  -d include_archived=true \
  -d limit=50
```

#### Create Project

Create a new project within your organization to organize resources and control access.

#### Create Project Endpoint

```http
POST /organization/projects
```

#### Create Project Parameters

| Parameter     | Type   | Required | Description                      |
| ------------- | ------ | -------- | -------------------------------- |
| `name`        | string | Yes      | Descriptive name for the project |
| `description` | string | No       | Optional project description     |

#### Create Project Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create a new project
project = client.organization.projects.create(
    name="Customer Support AI",
    description="AI models and tools for customer support automation"
)

print(f"Created project: {project.id}")
print(f"Name: {project.name}")
print(f"Status: {project.status}")
print(f"Description: {project.description}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const project = await client.organization.projects.create({
    name: "Customer Support AI",
    description: "AI models and tools for customer support automation"
});

console.log(`Created project: ${project.id}`);
console.log(`Name: ${project.name}`);
console.log(`Status: ${project.status}`);
console.log(`Description: ${project.description}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer Support AI",
    "description": "AI models and tools for customer support automation"
  }'
```

#### Retrieve Project

Get detailed information about a specific project including its configuration and status.

#### Retrieve Project Endpoint

```http
GET /organization/projects/{project_id}
```

#### Retrieve Project Parameters

| Parameter    | Type   | Required | Description                       |
| ------------ | ------ | -------- | --------------------------------- |
| `project_id` | string | Yes      | The ID of the project to retrieve |

#### Retrieve Project Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get project details
project = client.organization.projects.retrieve("proj_abc123")

print(f"Project ID: {project.id}")
print(f"Name: {project.name}")
print(f"Description: {project.description}")
print(f"Status: {project.status}")
print(f"Created: {project.created_at}")
print(f"Updated: {project.updated_at}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const project = await client.organization.projects.retrieve("proj_abc123");

console.log(`Project ID: ${project.id}`);
console.log(`Name: ${project.name}`);
console.log(`Description: ${project.description}`);
console.log(`Status: ${project.status}`);
console.log(`Created: ${project.created_at}`);
console.log(`Updated: ${project.updated_at}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Update Project

Modify project properties such as name and description.

#### Update Project Endpoint

```http
POST /organization/projects/{project_id}
```

#### Update Project Parameters

| Parameter     | Type   | Required | Description                     |
| ------------- | ------ | -------- | ------------------------------- |
| `project_id`  | string | Yes      | The ID of the project to update |
| `name`        | string | No       | New name for the project        |
| `description` | string | No       | New description for the project |

#### Update Project Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update project details
updated_project = client.organization.projects.update(
    "proj_abc123",
    name="Enhanced Customer Support AI",
    description="Advanced AI models and automation tools for customer support"
)

print(f"Updated project: {updated_project.name}")
print(f"New description: {updated_project.description}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const updatedProject = await client.organization.projects.update("proj_abc123", {
    name: "Enhanced Customer Support AI",
    description: "Advanced AI models and automation tools for customer support"
});

console.log(`Updated project: ${updatedProject.name}`);
console.log(`New description: ${updatedProject.description}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Enhanced Customer Support AI",
    "description": "Advanced AI models and automation tools for customer support"
  }'
```

---

### Project API Key Management

Manage API keys within specific projects for controlled access and usage monitoring.

#### List Project API Keys

Retrieve all API keys associated with a specific project.

#### List Project API Keys Endpoint

```http
GET /organization/projects/{project_id}/api_keys
```

#### List Project API Keys Parameters

| Parameter    | Type    | Required | Description                                       |
| ------------ | ------- | -------- | ------------------------------------------------- |
| `project_id` | string  | Yes      | The ID of the project                             |
| `limit`      | integer | No       | Number of API keys to return (1-100, default: 20) |
| `after`      | string  | No       | Pagination cursor for next page                   |

#### List Project API Keys Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List API keys for a project
api_keys = client.organization.projects.api_keys.list("proj_abc123")

for key in api_keys.data:
    print(f"Key ID: {key.id}")
    print(f"Name: {key.name}")
    print(f"Created: {key.created_at}")
    print(f"Last used: {key.last_used_at}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const apiKeys = await client.organization.projects.apiKeys.list("proj_abc123");

apiKeys.data.forEach(key => {
    console.log(`Key ID: ${key.id}`);
    console.log(`Name: ${key.name}`);
    console.log(`Created: ${key.created_at}`);
    console.log(`Last used: ${key.last_used_at}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123/api_keys \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Retrieve Project API Key

Get detailed information about a specific API key within a project.

#### Retrieve Project API Key Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get API key details
api_key = client.organization.projects.api_keys.retrieve("proj_abc123", "key_def456")

print(f"Key ID: {api_key.id}")
print(f"Name: {api_key.name}")
print(f"Permissions: {api_key.permissions}")
print(f"Created: {api_key.created_at}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const apiKey = await client.organization.projects.apiKeys.retrieve(
    "proj_abc123",
    "key_def456"
);

console.log(`Key ID: ${apiKey.id}`);
console.log(`Name: ${apiKey.name}`);
console.log(`Permissions: ${apiKey.permissions}`);
console.log(`Created: ${apiKey.created_at}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123/api_keys/key_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Delete Project API Key

Remove an API key from a project. This action cannot be undone.

#### Delete Project API Key Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete API key
result = client.organization.projects.api_keys.delete("proj_abc123", "key_def456")

if result.deleted:
    print(f"Successfully deleted API key: {result.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.projects.apiKeys.delete(
    "proj_abc123",
    "key_def456"
);

if (result.deleted) {
    console.log(`Successfully deleted API key: ${result.id}`);
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc123/api_keys/key_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Archive Project

Archive a project to prevent further usage while preserving historical data. Archived projects cannot be updated or used for new API calls.

#### Archive Project Endpoint

```http
POST /organization/projects/{project_id}/archive
```

#### Archive Project Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Archive a project
archived_project = client.organization.projects.archive("proj_abc123")

print(f"Archived project: {archived_project.id}")
print(f"Status: {archived_project.status}")
print(f"Archived at: {archived_project.archived_at}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const archivedProject = await client.organization.projects.archive("proj_abc123");

console.log(`Archived project: ${archivedProject.id}`);
console.log(`Status: ${archivedProject.status}`);
console.log(`Archived at: ${archivedProject.archived_at}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/archive \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

### Project Certificate Management

Manage certificates at the project level for enhanced security and access control.

#### List Project Certificates

Retrieve all certificates associated with a specific project for monitoring and management.

#### List Project Certificates Endpoint

```http
GET /organization/projects/{project_id}/certificates
```

#### List Project Certificates Parameters

| Parameter    | Type    | Required | Description                                           |
| ------------ | ------- | -------- | ----------------------------------------------------- |
| `project_id` | string  | Yes      | The ID of the project                                 |
| `limit`      | integer | No       | Number of certificates to return (1-100, default: 20) |
| `after`      | string  | No       | Pagination cursor for next page                       |
| `order`      | string  | No       | Sort order by created_at timestamp (`asc` or `desc`)  |

#### List Project Certificates Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List certificates for a project
certificates = client.organization.projects.certificates.list("proj_abc123")

for cert in certificates.data:
    print(f"Certificate ID: {cert.id}")
    print(f"Status: {cert.status}")
    print(f"Created: {cert.created_at}")
    print(f"Valid until: {cert.valid_until}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const certificates = await client.organization.projects.certificates.list("proj_abc123");

certificates.data.forEach(cert => {
    console.log(`Certificate ID: ${cert.id}`);
    console.log(`Status: ${cert.status}`);
    console.log(`Created: ${cert.created_at}`);
    console.log(`Valid until: ${cert.valid_until}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123/certificates \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Activate Project Certificates

Activate up to 10 certificates at the project level atomically and idempotently.

#### Activate Project Certificates Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Activate multiple certificates
result = client.organization.projects.certificates.activate(
    "proj_abc123",
    certificate_ids=["cert_123", "cert_456"]
)

print(f"Activated {len(result.data)} certificates")
for cert in result.data:
    if cert.status == "active":
        print(f"Certificate {cert.id} is now active")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.projects.certificates.activate(
    "proj_abc123",
    {
        certificate_ids: ["cert_123", "cert_456"]
    }
);

console.log(`Activated ${result.data.length} certificates`);
result.data.forEach(cert => {
    if (cert.status === "active") {
        console.log(`Certificate ${cert.id} is now active`);
    }
});
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/certificates/activate \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "certificate_ids": ["cert_123", "cert_456"]
  }'
```

#### Deactivate Project Certificates Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Deactivate multiple certificates
result = client.organization.projects.certificates.deactivate(
    "proj_abc123",
    certificate_ids=["cert_123", "cert_456"]
)

print(f"Deactivated {len(result.data)} certificates")
for cert in result.data:
    if cert.status == "inactive":
        print(f"Certificate {cert.id} is now inactive")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.projects.certificates.deactivate(
    "proj_abc123",
    {
        certificate_ids: ["cert_123", "cert_456"]
    }
);

console.log(`Deactivated ${result.data.length} certificates`);
result.data.forEach(cert => {
    if (cert.status === "inactive") {
        console.log(`Certificate ${cert.id} is now inactive`);
    }
});
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/certificates/deactivate \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "certificate_ids": ["cert_123", "cert_456"]
  }'
```

---

### Project Rate Limits

Monitor and manage rate limits for different models within your projects to ensure optimal resource allocation and cost control.

#### List Project Rate Limits

Retrieve rate limit configurations for all models in a project to monitor usage thresholds.

#### List Project Rate Limits Endpoint

```http
GET /organization/projects/{project_id}/rate_limits
```

#### List Project Rate Limits Parameters

| Parameter    | Type    | Required | Description                                    |
| ------------ | ------- | -------- | ---------------------------------------------- |
| `project_id` | string  | Yes      | The ID of the project                          |
| `limit`      | integer | No       | Number of rate limits to return (default: 100) |
| `after`      | string  | No       | Pagination cursor for next page                |
| `before`     | string  | No       | Pagination cursor for previous page            |

#### List Project Rate Limits Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List rate limits for a project
rate_limits = client.organization.projects.rate_limits.list("proj_abc123")

for rate_limit in rate_limits.data:
    print(f"Model: {rate_limit.model}")
    print(f"Max requests per minute: {rate_limit.max_requests_per_1_minute}")
    print(f"Max tokens per minute: {rate_limit.max_tokens_per_1_minute}")
    print(f"Max requests per day: {rate_limit.max_requests_per_1_day}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const rateLimits = await client.organization.projects.rateLimits.list("proj_abc123");

rateLimits.data.forEach(rateLimit => {
    console.log(`Model: ${rateLimit.model}`);
    console.log(`Max requests per minute: ${rateLimit.max_requests_per_1_minute}`);
    console.log(`Max tokens per minute: ${rateLimit.max_tokens_per_1_minute}`);
    console.log(`Max requests per day: ${rateLimit.max_requests_per_1_day}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123/rate_limits \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Update Project Rate Limit

Modify rate limit settings for a specific model within a project to adjust usage controls.

#### Update Project Rate Limit Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update rate limit for GPT-4 model
updated_rate_limit = client.organization.projects.rate_limits.update(
    project_id="proj_abc123",
    rate_limit_id="rl_gpt4_abc123",
    max_requests_per_1_minute=100,
    max_tokens_per_1_minute=50000,
    max_requests_per_1_day=2000
)

print(f"Updated rate limit for {updated_rate_limit.model}")
print(f"New limits: {updated_rate_limit.max_requests_per_1_minute} req/min, {updated_rate_limit.max_tokens_per_1_minute} tokens/min")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const updatedRateLimit = await client.organization.projects.rateLimits.update(
    "proj_abc123",
    "rl_gpt4_abc123",
    {
        max_requests_per_1_minute: 100,
        max_tokens_per_1_minute: 50000,
        max_requests_per_1_day: 2000
    }
);

console.log(`Updated rate limit for ${updatedRateLimit.model}`);
console.log(`New limits: ${updatedRateLimit.max_requests_per_1_minute} req/min, ${updatedRateLimit.max_tokens_per_1_minute} tokens/min`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/rate_limits/rl_gpt4_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "max_requests_per_1_minute": 100,
    "max_tokens_per_1_minute": 50000,
    "max_requests_per_1_day": 2000
  }'
```

---

### Project Service Accounts

Manage service accounts within projects for automated access and programmatic integrations.

#### List Project Service Accounts

Retrieve all service accounts associated with a specific project for automated API access management.

#### List Project Service Accounts Endpoint

```http
GET /organization/projects/{project_id}/service_accounts
```

#### List Project Service Accounts Parameters

| Parameter    | Type    | Required | Description                                               |
| ------------ | ------- | -------- | --------------------------------------------------------- |
| `project_id` | string  | Yes      | The ID of the project                                     |
| `limit`      | integer | No       | Number of service accounts to return (1-100, default: 20) |
| `after`      | string  | No       | Pagination cursor for next page                           |

#### List Project Service Accounts Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List service accounts for a project
service_accounts = client.organization.projects.service_accounts.list("proj_abc123")

for account in service_accounts.data:
    print(f"Service Account ID: {account.id}")
    print(f"Name: {account.name}")
    print(f"Role: {account.role}")
    print(f"Created: {account.created_at}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const serviceAccounts = await client.organization.projects.serviceAccounts.list("proj_abc123");

serviceAccounts.data.forEach(account => {
    console.log(`Service Account ID: ${account.id}`);
    console.log(`Name: ${account.name}`);
    console.log(`Role: ${account.role}`);
    console.log(`Created: ${account.created_at}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123/service_accounts \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Create Project Service Account

Create a new service account for automated API access within a project. Returns an unredacted API key.

#### Create Project Service Account Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create a new service account
service_account = client.organization.projects.service_accounts.create(
    "proj_abc123",
    name="Production Bot",
    role="member"
)

print(f"Created service account: {service_account.id}")
print(f"Name: {service_account.name}")
print(f"API Key: {service_account.api_key}")  # Store securely - won't be shown again
print(f"Role: {service_account.role}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const serviceAccount = await client.organization.projects.serviceAccounts.create(
    "proj_abc123",
    {
        name: "Production Bot",
        role: "member"
    }
);

console.log(`Created service account: ${serviceAccount.id}`);
console.log(`Name: ${serviceAccount.name}`);
console.log(`API Key: ${serviceAccount.api_key}`); // Store securely - won't be shown again
console.log(`Role: ${serviceAccount.role}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/service_accounts \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Bot",
    "role": "member"
  }'
```

#### Retrieve Project Service Account

Get detailed information about a specific service account within a project.

#### Retrieve Project Service Account Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve a specific service account
service_account = client.organization.projects.service_accounts.retrieve(
    "proj_abc123",
    "sa_def456"
)

print(f"Service Account ID: {service_account.id}")
print(f"Name: {service_account.name}")
print(f"Role: {service_account.role}")
print(f"Created: {service_account.created_at}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const serviceAccount = await client.organization.projects.serviceAccounts.retrieve(
    "proj_abc123",
    "sa_def456"
);

console.log(`Service Account ID: ${serviceAccount.id}`);
console.log(`Name: ${serviceAccount.name}`);
console.log(`Role: ${serviceAccount.role}`);
console.log(`Created: ${serviceAccount.created_at}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123/service_accounts/sa_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Delete Project Service Account

Remove a service account from a project. This action cannot be undone and will invalidate all associated API keys.

#### Delete Project Service Account Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete a service account
result = client.organization.projects.service_accounts.delete(
    "proj_abc123",
    "sa_def456"
)

if result.deleted:
    print(f"Successfully deleted service account: {result.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.projects.serviceAccounts.delete(
    "proj_abc123",
    "sa_def456"
);

if (result.deleted) {
    console.log(`Successfully deleted service account: ${result.id}`);
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc123/service_accounts/sa_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

### Project User Management

Manage user access and permissions within specific projects for collaborative development and administration.

#### List Project Users

Retrieve all users who have access to a specific project, including their roles and permissions.

#### List Project Users Endpoint

```http
GET /organization/projects/{project_id}/users
```

#### List Project Users Parameters

| Parameter    | Type    | Required | Description                                    |
| ------------ | ------- | -------- | ---------------------------------------------- |
| `project_id` | string  | Yes      | The ID of the project                          |
| `limit`      | integer | No       | Number of users to return (1-100, default: 20) |
| `after`      | string  | No       | Pagination cursor for next page                |

#### List Project Users Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List users in a project
users = client.organization.projects.users.list("proj_abc123")

for user in users.data:
    print(f"User ID: {user.id}")
    print(f"Name: {user.name}")
    print(f"Email: {user.email}")
    print(f"Role: {user.role}")
    print(f"Added: {user.added_at}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const users = await client.organization.projects.users.list("proj_abc123");

users.data.forEach(user => {
    console.log(`User ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`Added: ${user.added_at}`);
    console.log("---");
});
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123/users \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Add User to Project

Add an existing organization member to a project with specified role and permissions.

#### Add User to Project Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Add user to project
project_user = client.organization.projects.users.create(
    "proj_abc123",
    user_id="user_def456",
    role="member"
)

print(f"Added user to project: {project_user.id}")
print(f"Role: {project_user.role}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const projectUser = await client.organization.projects.users.create(
    "proj_abc123",
    {
        user_id: "user_def456",
        role: "member"
    }
);

console.log(`Added user to project: ${projectUser.id}`);
console.log(`Role: ${projectUser.role}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/users \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_def456",
    "role": "member"
  }'
```

#### Retrieve Project User

Get detailed information about a specific user's role and permissions within a project.

#### Retrieve Project User Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Get user details in project
project_user = client.organization.projects.users.retrieve("proj_abc123", "user_def456")

print(f"User: {project_user.name}")
print(f"Email: {project_user.email}")
print(f"Role: {project_user.role}")
print(f"Added at: {project_user.added_at}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const projectUser = await client.organization.projects.users.retrieve("proj_abc123", "user_def456");

console.log(`User: ${projectUser.name}`);
console.log(`Email: ${projectUser.email}`);
console.log(`Role: ${projectUser.role}`);
console.log(`Added at: ${projectUser.added_at}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/organization/projects/proj_abc123/users/user_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Update Project User Role

Modify a user's role within a project to change their access permissions.

#### Update Project User Role Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update user role in project
updated_user = client.organization.projects.users.update(
    "proj_abc123",
    "user_def456",
    role="owner"
)

print(f"Updated user role to: {updated_user.role}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const updatedUser = await client.organization.projects.users.update(
    "proj_abc123",
    "user_def456",
    {
        role: "owner"
    }
);

console.log(`Updated user role to: ${updatedUser.role}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/users/user_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "owner"
  }'
```

#### Remove User from Project

Remove a user's access to a specific project while maintaining their organization membership.

#### Remove User from Project Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Remove user from project
result = client.organization.projects.users.delete("proj_abc123", "user_def456")

if result.deleted:
    print(f"Successfully removed user from project: {result.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.organization.projects.users.delete("proj_abc123", "user_def456");

if (result.deleted) {
    console.log(`Successfully removed user from project: ${result.id}`);
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc123/users/user_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

## Organization Usage Analytics

Comprehensive usage tracking and analytics for monitoring API consumption across your organization's projects and users.

### Audio Speeches Usage

Track usage metrics for text-to-speech API calls to monitor voice generation consumption and costs.

#### Get Audio Speeches Usage

Retrieve detailed usage analytics for audio speech generation across your organization.

#### Audio Speeches Usage Endpoint

```http
GET /organization/usage/audio_speeches
```

#### Audio Speeches Usage Parameters

| Parameter      | Type    | Required | Description                                                  |
| -------------- | ------- | -------- | ------------------------------------------------------------ |
| `start_time`   | integer | Yes      | Start time (Unix seconds) of the query time range, inclusive |
| `end_time`     | integer | No       | End time (Unix seconds) of the query time range, exclusive   |
| `bucket_width` | string  | No       | Time bucket width: `1m`, `1h`, or `1d` (default: `1d`)       |
| `project_ids`  | array   | No       | Filter by specific project IDs                               |
| `user_ids`     | array   | No       | Filter by specific user IDs                                  |
| `api_key_ids`  | array   | No       | Filter by specific API key IDs                               |
| `models`       | array   | No       | Filter by specific model names                               |
| `group_by`     | array   | No       | Group by: `project_id`, `user_id`, `api_key_id`, `model`     |
| `limit`        | integer | No       | Number of buckets to return (varies by bucket_width)         |
| `page`         | string  | No       | Pagination cursor from previous response                     |

#### Audio Speeches Usage Examples

**Python:**

```python
from openai import OpenAI
import datetime

client = OpenAI()

# Get audio speeches usage for the last 7 days
end_time = int(datetime.datetime.now().timestamp())
start_time = end_time - (7 * 24 * 60 * 60)  # 7 days ago

usage = client.organization.usage.audio_speeches.get(
    start_time=start_time,
    end_time=end_time,
    bucket_width="1d",
    group_by=["project_id", "model"]
)

print(f"Total usage buckets: {len(usage.data)}")
for bucket in usage.data:
    print(f"Date: {bucket.start_time}")
    print(f"Characters: {bucket.characters}")
    print(f"Requests: {bucket.requests}")
    if bucket.project_id:
        print(f"Project: {bucket.project_id}")
    print("---")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const endTime = Math.floor(Date.now() / 1000);
const startTime = endTime - (7 * 24 * 60 * 60); // 7 days ago

const usage = await client.organization.usage.audioSpeeches.get({
    start_time: startTime,
    end_time: endTime,
    bucket_width: "1d",
    group_by: ["project_id", "model"]
});

console.log(`Total usage buckets: ${usage.data.length}`);
usage.data.forEach(bucket => {
    console.log(`Date: ${bucket.start_time}`);
    console.log(`Characters: ${bucket.characters}`);
    console.log(`Requests: ${bucket.requests}`);
    if (bucket.project_id) {
        console.log(`Project: ${bucket.project_id}`);
    }
    console.log("---");
});
```

**cURL:**

```bash
# Get audio speeches usage for last 7 days
START_TIME=$(date -d '7 days ago' +%s)
END_TIME=$(date +%s)

curl "https://api.openai.com/v1/organization/usage/audio_speeches?start_time=$START_TIME&end_time=$END_TIME&bucket_width=1d&group_by=project_id&group_by=model" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## GET /organization/usage/audio_transcriptions

Audio transcriptions

Get audio transcriptions usage details for the organization.

### Parameters

| Name         | Type    | Required | Description                                                                                                                                    |
| ------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time   | integer | True     | Start time (Unix seconds) of the query time range, inclusive.                                                                                  |
| end_time     | integer | False    | End time (Unix seconds) of the query time range, exclusive.                                                                                    |
| bucket_width | string  | False    | Width of each time bucket in response. Currently`1m`, `1h`and`1d`are supported, default to`1d`.                                                |
| project_ids  | array   | False    | Return only usage for these projects.                                                                                                          |
| user_ids     | array   | False    | Return only usage for these users.                                                                                                             |
| api_key_ids  | array   | False    | Return only usage for these API keys.                                                                                                          |
| models       | array   | False    | Return only usage for these models.                                                                                                            |
| group_by     | array   | False    | Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`or any combination of them. |
| limit        | integer | False    | Specifies the number of buckets to return.                                                                                                     |

-`bucket_width=1d`: default: 7, max: 31

- `bucket_width=1h`: default: 24, max: 168
- `bucket_width=1m`: default: 60, max: 1440
 |
| page | string | A cursor for use in pagination. Corresponding to the `next_page`field from the previous response. |

### Responses

#### 200

Usage data retrieved successfully.

[UsageResponse](#usageresponse)

## GET /organization/usage/code_interpreter_sessions

Code interpreter sessions

Get code interpreter sessions usage details for the organization.

### Parameters

| Name         | Type    | Required | Description                                                                                     |
| ------------ | ------- | -------- | ----------------------------------------------------------------------------------------------- |
| start_time   | integer | True     | Start time (Unix seconds) of the query time range, inclusive.                                   |
| end_time     | integer | False    | End time (Unix seconds) of the query time range, exclusive.                                     |
| bucket_width | string  | False    | Width of each time bucket in response. Currently`1m`, `1h`and`1d`are supported, default to`1d`. |
| project_ids  | array   | False    | Return only usage for these projects.                                                           |
| group_by     | array   | False    | Group the usage data by the specified fields. Support fields include `project_id`.              |
| limit        | integer | False    | Specifies the number of buckets to return.                                                      |

- `bucket_width=1d`: default: 7, max: 31
- `bucket_width=1h`: default: 24, max: 168
- `bucket_width=1m`: default: 60, max: 1440
 |
| page | string | A cursor for use in pagination. Corresponding to the `next_page`field from the previous response. |

### Responses

#### 200

Usage data retrieved successfully.

[UsageResponse](#usageresponse)

## GET /organization/usage/completions

Completions

Get completions usage details for the organization.

### Parameters

| Name         | Type    | Required | Description                                                                                                                                             |
| ------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time   | integer | True     | Start time (Unix seconds) of the query time range, inclusive.                                                                                           |
| end_time     | integer | False    | End time (Unix seconds) of the query time range, exclusive.                                                                                             |
| bucket_width | string  | False    | Width of each time bucket in response. Currently`1m`, `1h`and`1d`are supported, default to`1d`.                                                         |
| project_ids  | array   | False    | Return only usage for these projects.                                                                                                                   |
| user_ids     | array   | False    | Return only usage for these users.                                                                                                                      |
| api_key_ids  | array   | False    | Return only usage for these API keys.                                                                                                                   |
| models       | array   | False    | Return only usage for these models.                                                                                                                     |
| batch        | boolean | False    | If `true`, return batch jobs only. If `false`, return non-batch jobs only. By default, return both.                                                     |
| group_by     | array   | False    | Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`or any combination of them. |
| limit        | integer | False    | Specifies the number of buckets to return.                                                                                                              |

-`bucket_width=1d`: default: 7, max: 31

- `bucket_width=1h`: default: 24, max: 168
- `bucket_width=1m`: default: 60, max: 1440
 |
| page | string | A cursor for use in pagination. Corresponding to the `next_page`field from the previous response. |

### Responses

#### 200

Usage data retrieved successfully.

[UsageResponse](#usageresponse)

## GET /organization/usage/embeddings

Embeddings

Get embeddings usage details for the organization.

### Parameters

| Name         | Type    | Required | Description                                                                                                                                    |
| ------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time   | integer | True     | Start time (Unix seconds) of the query time range, inclusive.                                                                                  |
| end_time     | integer | False    | End time (Unix seconds) of the query time range, exclusive.                                                                                    |
| bucket_width | string  | False    | Width of each time bucket in response. Currently`1m`, `1h`and`1d`are supported, default to`1d`.                                                |
| project_ids  | array   | False    | Return only usage for these projects.                                                                                                          |
| user_ids     | array   | False    | Return only usage for these users.                                                                                                             |
| api_key_ids  | array   | False    | Return only usage for these API keys.                                                                                                          |
| models       | array   | False    | Return only usage for these models.                                                                                                            |
| group_by     | array   | False    | Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`or any combination of them. |
| limit        | integer | False    | Specifies the number of buckets to return.                                                                                                     |

-`bucket_width=1d`: default: 7, max: 31

- `bucket_width=1h`: default: 24, max: 168
- `bucket_width=1m`: default: 60, max: 1440
 |
| page | string | A cursor for use in pagination. Corresponding to the `next_page`field from the previous response. |

### Responses

#### 200

Usage data retrieved successfully.

[UsageResponse](#usageresponse)

## GET /organization/usage/images

Images

Get images usage details for the organization.

### Parameters

| Name         | Type    | Required | Description                                                                                                                                                     |
| ------------ | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time   | integer | True     | Start time (Unix seconds) of the query time range, inclusive.                                                                                                   |
| end_time     | integer | False    | End time (Unix seconds) of the query time range, exclusive.                                                                                                     |
| bucket_width | string  | False    | Width of each time bucket in response. Currently`1m`, `1h`and`1d`are supported, default to`1d`.                                                                 |
| sources      | array   | False    | Return only usages for these sources. Possible values are `image.generation`, `image.edit`, `image.variation`or any combination of them.                        |
| sizes        | array   | False    | Return only usages for these image sizes. Possible values are`256x256`, `512x512`, `1024x1024`, `1792x1792`, `1024x1792`or any combination of them.             |
| project_ids  | array   | False    | Return only usage for these projects.                                                                                                                           |
| user_ids     | array   | False    | Return only usage for these users.                                                                                                                              |
| api_key_ids  | array   | False    | Return only usage for these API keys.                                                                                                                           |
| models       | array   | False    | Return only usage for these models.                                                                                                                             |
| group_by     | array   | False    | Group the usage data by the specified fields. Support fields include`project_id`, `user_id`, `api_key_id`, `model`, `size`, `source`or any combination of them. |
| limit        | integer | False    | Specifies the number of buckets to return.                                                                                                                      |

-`bucket_width=1d`: default: 7, max: 31

- `bucket_width=1h`: default: 24, max: 168
- `bucket_width=1m`: default: 60, max: 1440
 |
| page | string | A cursor for use in pagination. Corresponding to the `next_page`field from the previous response. |

### Responses

#### 200

Usage data retrieved successfully.

[UsageResponse](#usageresponse)

## GET /organization/usage/moderations

Moderations

Get moderations usage details for the organization.

### Parameters

| Name         | Type    | Required | Description                                                                                                                                    |
| ------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time   | integer | True     | Start time (Unix seconds) of the query time range, inclusive.                                                                                  |
| end_time     | integer | False    | End time (Unix seconds) of the query time range, exclusive.                                                                                    |
| bucket_width | string  | False    | Width of each time bucket in response. Currently`1m`, `1h`and`1d`are supported, default to`1d`.                                                |
| project_ids  | array   | False    | Return only usage for these projects.                                                                                                          |
| user_ids     | array   | False    | Return only usage for these users.                                                                                                             |
| api_key_ids  | array   | False    | Return only usage for these API keys.                                                                                                          |
| models       | array   | False    | Return only usage for these models.                                                                                                            |
| group_by     | array   | False    | Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`or any combination of them. |
| limit        | integer | False    | Specifies the number of buckets to return.                                                                                                     |

-`bucket_width=1d`: default: 7, max: 31

- `bucket_width=1h`: default: 24, max: 168
- `bucket_width=1m`: default: 60, max: 1440
 |
| page | string | A cursor for use in pagination. Corresponding to the `next_page`field from the previous response. |

### Responses

#### 200

Usage data retrieved successfully.

[UsageResponse](#usageresponse)

## GET /organization/usage/vector_stores

Vector stores

Get vector stores usage details for the organization.

### Parameters

| Name         | Type    | Required | Description                                                                                     |
| ------------ | ------- | -------- | ----------------------------------------------------------------------------------------------- |
| start_time   | integer | True     | Start time (Unix seconds) of the query time range, inclusive.                                   |
| end_time     | integer | False    | End time (Unix seconds) of the query time range, exclusive.                                     |
| bucket_width | string  | False    | Width of each time bucket in response. Currently`1m`, `1h`and`1d`are supported, default to`1d`. |
| project_ids  | array   | False    | Return only usage for these projects.                                                           |
| group_by     | array   | False    | Group the usage data by the specified fields. Support fields include `project_id`.              |
| limit        | integer | False    | Specifies the number of buckets to return.                                                      |

- `bucket_width=1d`: default: 7, max: 31
- `bucket_width=1h`: default: 24, max: 168
- `bucket_width=1m`: default: 60, max: 1440
 |
| page | string | A cursor for use in pagination. Corresponding to the `next_page`field from the previous response. |

### Responses

#### 200

Usage data retrieved successfully.

[UsageResponse](#usageresponse)

## GET /organization/users

List users

Lists all of the users in the organization.

### Parameters

| Name   | Type    | Required | Description                                                                                                                                                                                                                                                                    |
| ------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| limit  | integer | False    | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.                                                                                                                                                                     |
| after  | string  | False    | A cursor for use in pagination.`after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. |
| emails | array   | False    | Filter by the email address of users.                                                                                                                                                                                                                                          |

### Responses

#### 200

Users listed successfully.

[UserListResponse](#userlistresponse)

## GET /organization/users/{user_id}

Retrieve user

Retrieves a user by their identifier.

### Parameters

| Name    | Type   | Required | Description         |
| ------- | ------ | -------- | ------------------- |
| user_id | string | True     | The ID of the user. |

### Responses

#### 200

User retrieved successfully.

[User](#user)

## POST /organization/users/{user_id}

Modify user

Modifies a user's role in the organization.

### Parameters

| Name    | Type   | Required | Description         |
| ------- | ------ | -------- | ------------------- |
| user_id | string | True     | The ID of the user. |

### Request Body

[UserRoleUpdateRequest](#userroleupdaterequest)

### Responses

#### 200

User role updated successfully.

[User](#user)

## DELETE /organization/users/{user_id}

Delete user

Deletes a user from the organization.

### Parameters

| Name    | Type   | Required | Description         |
| ------- | ------ | -------- | ------------------- |
| user_id | string | True     | The ID of the user. |

### Responses

#### 200

User deleted successfully.

[UserDeleteResponse](#userdeleteresponse)

## POST /realtime/calls

Create call

Create a new Realtime API call over WebRTC and receive the SDP answer needed
to complete the peer connection.

### Request Body

[RealtimeCallCreateRequest](#realtimecallcreaterequest)

string

### Responses

#### 201

Realtime call created successfully.

string

## POST /realtime/calls/{call_id}/accept

Accept call

Accept an incoming SIP call and configure the realtime session that will
handle it.

### Parameters

| Name    | Type   | Required | Description                                 |
| ------- | ------ | -------- | ------------------------------------------- |
| call_id | string | True     | The identifier for the call provided in the |
[`realtime.call.incoming`](https://platform.openai.com/docs/api-reference/webhook_events/realtime/call/incoming)
webhook. |

### Request Body

[RealtimeSessionCreateRequestGA](#realtimesessioncreaterequestga)

### Responses

#### 200

Call accepted successfully.

## POST /realtime/calls/{call_id}/hangup

Hang up call

End an active Realtime API call, whether it was initiated over SIP or
WebRTC.

### Parameters

| Name    | Type   | Required | Description                                                               |
| ------- | ------ | -------- | ------------------------------------------------------------------------- |
| call_id | string | True     | The identifier for the call. For SIP calls, use the value provided in the |
[`realtime.call.incoming`](https://platform.openai.com/docs/api-reference/webhook_events/realtime/call/incoming)
webhook. For WebRTC sessions, reuse the call ID returned in the `Location`
header when creating the call with
[`POST /v1/realtime/calls`](https://platform.openai.com/docs/api-reference/realtime/create-call). |

### Responses

#### 200

Call hangup initiated successfully.

## POST /realtime/calls/{call_id}/refer

Refer call

Transfer an active SIP call to a new destination using the SIP REFER verb.

### Parameters

| Name    | Type   | Required | Description                                 |
| ------- | ------ | -------- | ------------------------------------------- |
| call_id | string | True     | The identifier for the call provided in the |
[`realtime.call.incoming`](https://platform.openai.com/docs/api-reference/webhook_events/realtime/call/incoming)
webhook. |

### Request Body

[RealtimeCallReferRequest](#realtimecallreferrequest)

### Responses

#### 200

Call referred successfully.

## POST /realtime/calls/{call_id}/reject

Reject call

Decline an incoming SIP call by returning a SIP status code to the caller.

### Parameters

| Name    | Type   | Required | Description                                 |
| ------- | ------ | -------- | ------------------------------------------- |
| call_id | string | True     | The identifier for the call provided in the |
[`realtime.call.incoming`](https://platform.openai.com/docs/api-reference/webhook_events/realtime/call/incoming)
webhook. |

### Request Body

[RealtimeCallRejectRequest](#realtimecallrejectrequest)

### Responses

#### 200

Call rejected successfully.

## POST /realtime/client_secrets

Create client secret

Create a Realtime client secret with an associated session configuration.

### Request Body

[RealtimeCreateClientSecretRequest](#realtimecreateclientsecretrequest)

### Responses

#### 200

Client secret created successfully.

[RealtimeCreateClientSecretResponse](#realtimecreateclientsecretresponse)

## POST /realtime/sessions

Create session

Create an ephemeral API token for use in client-side applications with the
Realtime API. Can be configured with the same session parameters as the
`session.update`client event.

It responds with a session object, plus a`client_secret`key which contains
a usable ephemeral API token that can be used to authenticate browser clients
for the Realtime API.

### Request Body

[RealtimeSessionCreateRequest](#realtimesessioncreaterequest)

### Responses

#### 200

Session created successfully.

[RealtimeSessionCreateResponse](#realtimesessioncreateresponse)

## POST /realtime/transcription_sessions

Create transcription session

Create an ephemeral API token for use in client-side applications with the
Realtime API specifically for realtime transcriptions.
Can be configured with the same session parameters as the`transcription_session.update`client event.

It responds with a session object, plus a`client_secret`key which contains
a usable ephemeral API token that can be used to authenticate browser clients
for the Realtime API.

### Request Body

[RealtimeTranscriptionSessionCreateRequest](#realtimetranscriptionsessioncreaterequest)

### Responses

#### 200

Session created successfully.

[RealtimeTranscriptionSessionCreateResponse](#realtimetranscriptionsessioncreateresponse)

## POST /responses

Create a model response

Creates a model response. Provide [text](https://platform.openai.com/docs/guides/text) or
[image](https://platform.openai.com/docs/guides/images) inputs to generate [text](https://platform.openai.com/docs/guides/text)
or [JSON](https://platform.openai.com/docs/guides/structured-outputs) outputs. Have the model call
your own [custom code](https://platform.openai.com/docs/guides/function-calling) or use built-in
[tools](https://platform.openai.com/docs/guides/tools) like [web search](https://platform.openai.com/docs/guides/tools-web-search)
or [file search](https://platform.openai.com/docs/guides/tools-file-search) to use your own data
as input for the model's response.

### Request Body

[CreateResponse](#createresponse)

### Responses

#### 200

OK

[Response](#response)

[ResponseStreamEvent](#responsestreamevent)

## GET /responses/{response_id}

Get a model response

Retrieves a model response with the given ID.

### Parameters

| Name        | Type   | Required                                                       | Description                         |
| ----------- | ------ | -------------------------------------------------------------- | ----------------------------------- |
| response_id | string | True                                                           | The ID of the response to retrieve. |
| include     | array  | Additional fields to include in the response. See the`include` |
parameter for Response creation above for more information.
 |
| stream | boolean |  | If set to true, the model response data will be streamed to the client
as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
See the [Streaming section below](https://platform.openai.com/docs/api-reference/responses-streaming)
for more information.
 |
| starting_after | integer |  | The sequence number of the event after which to start streaming.
 |
| include_obfuscation | boolean |  | When true, stream obfuscation will be enabled. Stream obfuscation adds
random characters to an`obfuscation`field on streaming delta events
to normalize payload sizes as a mitigation to certain side-channel
attacks. These obfuscation fields are included by default, but add a
small amount of overhead to the data stream. You can set`include_obfuscation`to false to optimize for bandwidth if you trust
the network links between your application and the OpenAI API.
 |

### Responses

#### 200

OK

[Response](#response)

## DELETE /responses/{response_id}

Delete a model response

Deletes a model response with the given ID.

### Parameters

| Name        | Type   | Required | Description                       |
| ----------- | ------ | -------- | --------------------------------- |
| response_id | string | True     | The ID of the response to delete. |

### Responses

#### 200

OK

#### 404

Not Found

[Error](#error)

## POST /responses/{response_id}/cancel

Cancel a response

Cancels a model response with the given ID. Only responses created with
the`background`parameter set to`true`can be cancelled.
[Learn more](https://platform.openai.com/docs/guides/background).

### Parameters

| Name        | Type   | Required | Description                       |
| ----------- | ------ | -------- | --------------------------------- |
| response_id | string | True     | The ID of the response to cancel. |

### Responses

#### 200

OK

[Response](#response)

#### 404

Not Found

[Error](#error)

## GET /responses/{response_id}/input_items

List input items

Returns a list of input items for a given response.

### Parameters

| Name        | Type    | Required | Description                                                              |
| ----------- | ------- | -------- | ------------------------------------------------------------------------ |
| response_id | string  | True     | The ID of the response to retrieve input items for.                      |
| limit       | integer | False    | A limit on the number of objects to be returned. Limit can range between |
1 and 100, and the default is 20.
 |
| order | string |  | The order to return the input items in. Default is`desc`.

- `asc`: Return the input items in ascending order.
- `desc`: Return the input items in descending order.
 |
| after | string |  | An item ID to list items after, used in pagination.
 |
| include | array |  | Additional fields to include in the response. See the `include`parameter for Response creation above for more information.
 |

### Responses

#### 200

OK

---

## Threads API

Manage conversation threads for multi-turn interactions with assistants, enabling persistent conversational context and advanced AI workflows.

### Create Thread

Create a new conversation thread to maintain context across multiple assistant interactions.

#### Create Thread Endpoint

```http
POST /threads
```

#### Create Thread Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create an empty thread
thread = client.beta.threads.create()
print(f"Thread created: {thread.id}")

# Create thread with initial messages
thread_with_messages = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "Hello! I need help with Python programming."
        }
    ]
)
print(f"Thread with messages: {thread_with_messages.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Create an empty thread
const thread = await client.beta.threads.create();
console.log(`Thread created: ${thread.id}`);

// Create thread with initial messages
const threadWithMessages = await client.beta.threads.create({
    messages: [
        {
            role: "user",
            content: "Hello! I need help with Python programming."
        }
    ]
});
console.log(`Thread with messages: ${threadWithMessages.id}`);
```

**cURL:**

```bash
# Create empty thread
curl https://api.openai.com/v1/threads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{}'

# Create thread with messages
curl https://api.openai.com/v1/threads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Hello! I need help with Python programming."
      }
    ]
  }'
```

### Create Thread and Run

Create a thread and immediately run it with an assistant in a single request for streamlined workflows.

#### Create Thread and Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create thread and run with assistant
run = client.beta.threads.create_and_run(
    assistant_id="asst_abc123",
    thread={
        "messages": [
            {
                "role": "user",
                "content": "Explain quantum computing in simple terms."
            }
        ]
    }
)

print(f"Run created: {run.id}")
print(f"Status: {run.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const run = await client.beta.threads.createAndRun({
    assistant_id: "asst_abc123",
    thread: {
        messages: [
            {
                role: "user",
                content: "Explain quantum computing in simple terms."
            }
        ]
    }
});

console.log(`Run created: ${run.id}`);
console.log(`Status: ${run.status}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/threads/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "assistant_id": "asst_abc123",
    "thread": {
      "messages": [
        {
          "role": "user",
          "content": "Explain quantum computing in simple terms."
        }
      ]
    }
  }'
```

### Retrieve Thread

Get detailed information about an existing conversation thread.

#### Retrieve Thread Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve thread details
thread = client.beta.threads.retrieve("thread_abc123")
print(f"Thread ID: {thread.id}")
print(f"Created at: {thread.created_at}")
print(f"Metadata: {thread.metadata}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const thread = await client.beta.threads.retrieve("thread_abc123");
console.log(`Thread ID: ${thread.id}`);
console.log(`Created at: ${thread.created_at}`);
console.log(`Metadata: ${thread.metadata}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/threads/thread_abc123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

### Modify Thread

Update thread metadata to organize and tag conversations.

#### Modify Thread Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update thread metadata
thread = client.beta.threads.update(
    "thread_abc123",
    metadata={
        "user_id": "user_456",
        "category": "support",
        "priority": "high"
    }
)
print(f"Updated thread: {thread.id}")
print(f"New metadata: {thread.metadata}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const thread = await client.beta.threads.update("thread_abc123", {
    metadata: {
        user_id: "user_456",
        category: "support",
        priority: "high"
    }
});
console.log(`Updated thread: ${thread.id}`);
console.log(`New metadata: ${thread.metadata}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/threads/thread_abc123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "metadata": {
      "user_id": "user_456",
      "category": "support",
      "priority": "high"
    }
  }'
```

### Delete Thread

Permanently remove a conversation thread and all associated messages.

#### Delete Thread Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete thread
result = client.beta.threads.delete("thread_abc123")
print(f"Thread deleted: {result.id}")
print(f"Deleted: {result.deleted}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.beta.threads.del("thread_abc123");
console.log(`Thread deleted: ${result.id}`);
console.log(`Deleted: ${result.deleted}`);
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/threads/thread_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

---

### Thread Messages

Manage individual messages within conversation threads for granular control over conversational context.

#### List Messages

Retrieve all messages from a conversation thread with flexible filtering and pagination options.

#### List Messages Endpoint

```http
GET /threads/{thread_id}/messages
```

#### List Messages Parameters

| Parameter   | Type    | Required | Description                                         |
| ----------- | ------- | -------- | --------------------------------------------------- |
| `thread_id` | string  | Yes      | The ID of the thread containing messages            |
| `limit`     | integer | No       | Number of messages to return (1-100, default: 20)   |
| `order`     | string  | No       | Sort order: `asc` or `desc` by created_at timestamp |
| `after`     | string  | No       | Pagination cursor for next page                     |
| `before`    | string  | No       | Pagination cursor for previous page                 |
| `run_id`    | string  | No       | Filter messages by the run ID that generated them   |

#### List Messages Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all messages in a thread
messages = client.beta.threads.messages.list("thread_abc123")

for message in messages.data:
    print(f"Message ID: {message.id}")
    print(f"Role: {message.role}")
    print(f"Content: {message.content[0].text.value}")
    print(f"Created: {message.created_at}")
    print("---")

# List messages with filtering
filtered_messages = client.beta.threads.messages.list(
    "thread_abc123",
    limit=10,
    order="desc",
    run_id="run_def456"
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List all messages in a thread
const messages = await client.beta.threads.messages.list("thread_abc123");

messages.data.forEach(message => {
    console.log(`Message ID: ${message.id}`);
    console.log(`Role: ${message.role}`);
    console.log(`Content: ${message.content[0].text.value}`);
    console.log(`Created: ${message.created_at}`);
    console.log("---");
});

// List messages with filtering
const filteredMessages = await client.beta.threads.messages.list("thread_abc123", {
    limit: 10,
    order: "desc",
    run_id: "run_def456"
});
```

**cURL:**

```bash
# List all messages
curl https://api.openai.com/v1/threads/thread_abc123/messages \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"

# List messages with filtering
curl "https://api.openai.com/v1/threads/thread_abc123/messages?limit=10&order=desc&run_id=run_def456" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

#### Create Message

Add a new message to an existing conversation thread.

#### Create Message Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create a user message
message = client.beta.threads.messages.create(
    thread_id="thread_abc123",
    role="user",
    content="Can you help me debug this Python code?"
)

print(f"Message created: {message.id}")
print(f"Content: {message.content[0].text.value}")

# Create message with file attachments
message_with_files = client.beta.threads.messages.create(
    thread_id="thread_abc123",
    role="user",
    content="Please analyze this document",
    attachments=[
        {
            "file_id": "file_def456",
            "tools": [{"type": "file_search"}]
        }
    ]
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Create a user message
const message = await client.beta.threads.messages.create("thread_abc123", {
    role: "user",
    content: "Can you help me debug this Python code?"
});

console.log(`Message created: ${message.id}`);
console.log(`Content: ${message.content[0].text.value}`);

// Create message with file attachments
const messageWithFiles = await client.beta.threads.messages.create("thread_abc123", {
    role: "user",
    content: "Please analyze this document",
    attachments: [
        {
            file_id: "file_def456",
            tools: [{ type: "file_search" }]
        }
    ]
});
```

**cURL:**

```bash
# Create user message
curl https://api.openai.com/v1/threads/thread_abc123/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "role": "user",
    "content": "Can you help me debug this Python code?"
  }'
```

#### Retrieve Message

Get detailed information about a specific message in a thread.

#### Retrieve Message Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve message details
message = client.beta.threads.messages.retrieve(
    thread_id="thread_abc123",
    message_id="msg_def456"
)

print(f"Message ID: {message.id}")
print(f"Role: {message.role}")
print(f"Content: {message.content[0].text.value}")
print(f"Attachments: {len(message.attachments)}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const message = await client.beta.threads.messages.retrieve(
    "thread_abc123",
    "msg_def456"
);

console.log(`Message ID: ${message.id}`);
console.log(`Role: ${message.role}`);
console.log(`Content: ${message.content[0].text.value}`);
console.log(`Attachments: ${message.attachments.length}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/threads/thread_abc123/messages/msg_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

#### Modify Message

Update message metadata for organization and tracking purposes.

#### Modify Message Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update message metadata
message = client.beta.threads.messages.update(
    thread_id="thread_abc123",
    message_id="msg_def456",
    metadata={
        "priority": "high",
        "category": "bug_report",
        "resolved": "false"
    }
)

print(f"Updated message: {message.id}")
print(f"New metadata: {message.metadata}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const message = await client.beta.threads.messages.update(
    "thread_abc123",
    "msg_def456",
    {
        metadata: {
            priority: "high",
            category: "bug_report",
            resolved: "false"
        }
    }
);

console.log(`Updated message: ${message.id}`);
console.log(`New metadata: ${message.metadata}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/threads/thread_abc123/messages/msg_def456 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "metadata": {
      "priority": "high",
      "category": "bug_report",
      "resolved": "false"
    }
  }'
```

#### Delete Message

Remove a message from a conversation thread permanently.

#### Delete Message Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete message
result = client.beta.threads.messages.delete(
    thread_id="thread_abc123",
    message_id="msg_def456"
)

print(f"Message deleted: {result.id}")
print(f"Deleted: {result.deleted}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const result = await client.beta.threads.messages.del(
    "thread_abc123",
    "msg_def456"
);

console.log(`Message deleted: ${result.id}`);
console.log(`Deleted: ${result.deleted}`);
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/threads/thread_abc123/messages/msg_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

---

### Thread Runs

Execute assistant workflows within conversation threads, managing the complete lifecycle of AI-powered interactions.

#### List Thread Runs

Retrieve all runs associated with a specific thread for monitoring and management.

#### List Thread Runs Endpoint

```http
GET /threads/{thread_id}/runs
```

#### List Thread Runs Parameters

| Parameter   | Type    | Required | Description                                         |
| ----------- | ------- | -------- | --------------------------------------------------- |
| `thread_id` | string  | Yes      | The ID of the thread containing runs                |
| `limit`     | integer | No       | Number of runs to return (1-100, default: 20)       |
| `order`     | string  | No       | Sort order: `asc` or `desc` by created_at timestamp |
| `after`     | string  | No       | Pagination cursor for next page                     |
| `before`    | string  | No       | Pagination cursor for previous page                 |

#### List Thread Runs Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all runs for a thread
runs = client.beta.threads.runs.list("thread_abc123")

for run in runs.data:
    print(f"Run ID: {run.id}")
    print(f"Assistant ID: {run.assistant_id}")
    print(f"Status: {run.status}")
    print(f"Created: {run.created_at}")
    if run.completed_at:
        print(f"Completed: {run.completed_at}")
    print("---")

# List runs with pagination
recent_runs = client.beta.threads.runs.list(
    "thread_abc123",
    limit=5,
    order="desc"
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List all runs for a thread
const runs = await client.beta.threads.runs.list("thread_abc123");

runs.data.forEach(run => {
    console.log(`Run ID: ${run.id}`);
    console.log(`Assistant ID: ${run.assistant_id}`);
    console.log(`Status: ${run.status}`);
    console.log(`Created: ${run.created_at}`);
    if (run.completed_at) {
        console.log(`Completed: ${run.completed_at}`);
    }
    console.log("---");
});

// List runs with pagination
const recentRuns = await client.beta.threads.runs.list("thread_abc123", {
    limit: 5,
    order: "desc"
});
```

**cURL:**

```bash
# List all runs
curl https://api.openai.com/v1/threads/thread_abc123/runs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"

# List recent runs with pagination
curl "https://api.openai.com/v1/threads/thread_abc123/runs?limit=5&order=desc" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

#### Create Run

Execute an assistant on a conversation thread to generate responses and perform tasks.

#### Create Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create a basic run
run = client.beta.threads.runs.create(
    thread_id="thread_abc123",
    assistant_id="asst_def456"
)

print(f"Run created: {run.id}")
print(f"Status: {run.status}")

# Create run with custom instructions
custom_run = client.beta.threads.runs.create(
    thread_id="thread_abc123",
    assistant_id="asst_def456",
    instructions="Please be concise in your response and focus on practical examples.",
    additional_instructions="Use code examples where appropriate."
)

# Create run with tools
tools_run = client.beta.threads.runs.create(
    thread_id="thread_abc123",
    assistant_id="asst_def456",
    tools=[
        {"type": "code_interpreter"},
        {"type": "file_search"}
    ]
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Create a basic run
const run = await client.beta.threads.runs.create("thread_abc123", {
    assistant_id: "asst_def456"
});

console.log(`Run created: ${run.id}`);
console.log(`Status: ${run.status}`);

// Create run with custom instructions
const customRun = await client.beta.threads.runs.create("thread_abc123", {
    assistant_id: "asst_def456",
    instructions: "Please be concise in your response and focus on practical examples.",
    additional_instructions: "Use code examples where appropriate."
});

// Create run with tools
const toolsRun = await client.beta.threads.runs.create("thread_abc123", {
    assistant_id: "asst_def456",
    tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
    ]
});
```

**cURL:**

```bash
# Create basic run
curl https://api.openai.com/v1/threads/thread_abc123/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "assistant_id": "asst_def456"
  }'

# Create run with custom instructions and tools
curl https://api.openai.com/v1/threads/thread_abc123/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "assistant_id": "asst_def456",
    "instructions": "Please be concise in your response and focus on practical examples.",
    "tools": [
      {"type": "code_interpreter"},
      {"type": "file_search"}
    ]
  }'
```

#### Retrieve Run

Get detailed information about a specific run, including its status and execution details.

#### Retrieve Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve run details
run = client.beta.threads.runs.retrieve(
    thread_id="thread_abc123",
    run_id="run_def456"
)

print(f"Run ID: {run.id}")
print(f"Status: {run.status}")
print(f"Assistant ID: {run.assistant_id}")
print(f"Created at: {run.created_at}")
if run.completed_at:
    print(f"Completed at: {run.completed_at}")
if run.failed_at:
    print(f"Failed at: {run.failed_at}")
    print(f"Last error: {run.last_error}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const run = await client.beta.threads.runs.retrieve(
    "thread_abc123",
    "run_def456"
);

console.log(`Run ID: ${run.id}`);
console.log(`Status: ${run.status}`);
console.log(`Assistant ID: ${run.assistant_id}`);
console.log(`Created at: ${run.created_at}`);
if (run.completed_at) {
    console.log(`Completed at: ${run.completed_at}`);
}
if (run.failed_at) {
    console.log(`Failed at: ${run.failed_at}`);
    console.log(`Last error: ${run.last_error}`);
}
```

**cURL:**

```bash
curl https://api.openai.com/v1/threads/thread_abc123/runs/run_def456 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

#### Modify Run

Update run metadata for organization and tracking purposes.

#### Modify Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update run metadata
run = client.beta.threads.runs.update(
    thread_id="thread_abc123",
    run_id="run_def456",
    metadata={
        "user_id": "user_789",
        "session_type": "debugging",
        "priority": "high"
    }
)

print(f"Updated run: {run.id}")
print(f"New metadata: {run.metadata}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const run = await client.beta.threads.runs.update(
    "thread_abc123",
    "run_def456",
    {
        metadata: {
            user_id: "user_789",
            session_type: "debugging",
            priority: "high"
        }
    }
);

console.log(`Updated run: ${run.id}`);
console.log(`New metadata: ${run.metadata}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/threads/thread_abc123/runs/run_def456 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "metadata": {
      "user_id": "user_789",
      "session_type": "debugging",
      "priority": "high"
    }
  }'
```

#### Cancel Run

Stop a run that is currently in progress, useful for managing computational resources.

#### Cancel Run Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Cancel a running process
run = client.beta.threads.runs.cancel(
    thread_id="thread_abc123",
    run_id="run_def456"
)

print(f"Run {run.id} status: {run.status}")
print(f"Cancelled at: {run.cancelled_at}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const run = await client.beta.threads.runs.cancel(
    "thread_abc123",
    "run_def456"
);

console.log(`Run ${run.id} status: ${run.status}`);
console.log(`Cancelled at: ${run.cancelled_at}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/threads/thread_abc123/runs/run_def456/cancel \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

#### List Run Steps

Retrieve detailed steps showing how a run executed, including tool calls and their results.

#### List Run Steps Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all steps for a run
steps = client.beta.threads.runs.steps.list(
    thread_id="thread_abc123",
    run_id="run_def456"
)

for step in steps.data:
    print(f"Step ID: {step.id}")
    print(f"Type: {step.type}")
    print(f"Status: {step.status}")

    if step.type == "tool_calls":
        for tool_call in step.step_details.tool_calls:
            print(f"Tool: {tool_call.type}")
            if tool_call.type == "code_interpreter":
                print(f"Code: {tool_call.code_interpreter.input}")
    print("---")

# List steps with detailed content
detailed_steps = client.beta.threads.runs.steps.list(
    thread_id="thread_abc123",
    run_id="run_def456",
    include=["step_details.tool_calls[*].file_search.results[*].content"]
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List all steps for a run
const steps = await client.beta.threads.runs.steps.list(
    "thread_abc123",
    "run_def456"
);

steps.data.forEach(step => {
    console.log(`Step ID: ${step.id}`);
    console.log(`Type: ${step.type}`);
    console.log(`Status: ${step.status}`);

    if (step.type === "tool_calls") {
        step.step_details.tool_calls.forEach(toolCall => {
            console.log(`Tool: ${toolCall.type}`);
            if (toolCall.type === "code_interpreter") {
                console.log(`Code: ${toolCall.code_interpreter.input}`);
            }
        });
    }
    console.log("---");
});
```

**cURL:**

```bash
# List run steps
curl https://api.openai.com/v1/threads/thread_abc123/runs/run_def456/steps \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"

# List steps with detailed content
curl "https://api.openai.com/v1/threads/thread_abc123/runs/run_def456/steps?include[]=step_details.tool_calls[*].file_search.results[*].content" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

#### Retrieve Run Step

Get detailed information about a specific step in a run execution.

#### Retrieve Run Step Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve specific step details
step = client.beta.threads.runs.steps.retrieve(
    thread_id="thread_abc123",
    run_id="run_def456",
    step_id="step_ghi789"
)

print(f"Step ID: {step.id}")
print(f"Type: {step.type}")
print(f"Status: {step.status}")
print(f"Created: {step.created_at}")

if step.type == "message_creation":
    print(f"Message ID: {step.step_details.message_creation.message_id}")
elif step.type == "tool_calls":
    for tool_call in step.step_details.tool_calls:
        print(f"Tool call: {tool_call.type}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const step = await client.beta.threads.runs.steps.retrieve(
    "thread_abc123",
    "run_def456",
    "step_ghi789"
);

console.log(`Step ID: ${step.id}`);
console.log(`Type: ${step.type}`);
console.log(`Status: ${step.status}`);
console.log(`Created: ${step.created_at}`);

if (step.type === "message_creation") {
    console.log(`Message ID: ${step.step_details.message_creation.message_id}`);
} else if (step.type === "tool_calls") {
    step.step_details.tool_calls.forEach(toolCall => {
        console.log(`Tool call: ${toolCall.type}`);
    });
}
```

**cURL:**

```bash
curl https://api.openai.com/v1/threads/thread_abc123/runs/run_def456/steps/step_ghi789 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

#### Submit Tool Outputs

Provide results from function calls when a run requires action, allowing the assistant to continue execution.

#### Submit Tool Outputs Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Submit tool outputs to continue run
run = client.beta.threads.runs.submit_tool_outputs(
    thread_id="thread_abc123",
    run_id="run_def456",
    tool_outputs=[
        {
            "tool_call_id": "call_abc123",
            "output": "The current temperature is 72°F"
        },
        {
            "tool_call_id": "call_def456",
            "output": "Database query returned 5 results"
        }
    ]
)

print(f"Run status: {run.status}")
print(f"Updated at: {run.last_error}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const run = await client.beta.threads.runs.submitToolOutputs(
    "thread_abc123",
    "run_def456",
    {
        tool_outputs: [
            {
                tool_call_id: "call_abc123",
                output: "The current temperature is 72°F"
            },
            {
                tool_call_id: "call_def456",
                output: "Database query returned 5 results"
            }
        ]
    }
);

console.log(`Run status: ${run.status}`);
console.log(`Updated at: ${run.last_error}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/threads/thread_abc123/runs/run_def456/submit_tool_outputs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "tool_outputs": [
      {
        "tool_call_id": "call_abc123",
        "output": "The current temperature is 72°F"
      },
      {
        "tool_call_id": "call_def456",
        "output": "Database query returned 5 results"
      }
    ]
  }'
```

---

## Uploads API

Manage large file uploads with chunked upload support for efficient handling of files up to 8GB in size.

### Create Upload

Initialize a new multipart upload session for large files. Uploads expire after 1 hour and support files up to 8GB.

#### Create Upload Endpoint

```http
POST /uploads
```

#### Create Upload Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create upload for assistants
upload = client.uploads.create(
    filename="large_dataset.jsonl",
    purpose="fine-tune",
    bytes=1024000000,  # 1GB file
    mime_type="application/jsonl"
)

print(f"Upload ID: {upload.id}")
print(f"Status: {upload.status}")
print(f"Expires at: {upload.expires_at}")

# Create upload for file search
document_upload = client.uploads.create(
    filename="company_handbook.pdf",
    purpose="assistants",
    bytes=50000000,  # 50MB file
    mime_type="application/pdf"
)

print(f"Document upload ID: {document_upload.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Create upload for fine-tuning
const upload = await client.uploads.create({
    filename: "large_dataset.jsonl",
    purpose: "fine-tune",
    bytes: 1024000000, // 1GB file
    mime_type: "application/jsonl"
});

console.log(`Upload ID: ${upload.id}`);
console.log(`Status: ${upload.status}`);
console.log(`Expires at: ${upload.expires_at}`);

// Create upload for assistants
const documentUpload = await client.uploads.create({
    filename: "company_handbook.pdf",
    purpose: "assistants",
    bytes: 50000000, // 50MB file
    mime_type: "application/pdf"
});

console.log(`Document upload ID: ${documentUpload.id}`);
```

**cURL:**

```bash
# Create upload session
curl https://api.openai.com/v1/uploads \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "large_dataset.jsonl",
    "purpose": "fine-tune",
    "bytes": 1024000000,
    "mime_type": "application/jsonl"
  }'
```

### Add Upload Parts

Upload file chunks to an existing upload session. Each part can be up to 64MB and uploaded in parallel.

#### Add Upload Parts Examples

**Python:**

```python
from openai import OpenAI
import os

client = OpenAI()

# Upload file parts
upload_id = "upload_abc123"
file_path = "large_file.jsonl"

# Read file in chunks and upload parts
chunk_size = 64 * 1024 * 1024  # 64MB chunks
parts = []

with open(file_path, 'rb') as file:
    part_number = 1
    while True:
        chunk = file.read(chunk_size)
        if not chunk:
            break

        # Upload part
        part = client.uploads.parts.create(
            upload_id=upload_id,
            data=chunk
        )

        parts.append(part)
        print(f"Uploaded part {part_number}: {part.id}")
        part_number += 1

print(f"Uploaded {len(parts)} parts total")
```

**JavaScript:**

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

const uploadId = "upload_abc123";
const filePath = "large_file.jsonl";

// Upload file parts
const chunkSize = 64 * 1024 * 1024; // 64MB chunks
const parts = [];

const fileBuffer = fs.readFileSync(filePath);
let offset = 0;
let partNumber = 1;

while (offset < fileBuffer.length) {
    const chunk = fileBuffer.slice(offset, offset + chunkSize);

    const part = await client.uploads.parts.create(uploadId, {
        data: chunk
    });

    parts.push(part);
    console.log(`Uploaded part ${partNumber}: ${part.id}`);

    offset += chunkSize;
    partNumber++;
}

console.log(`Uploaded ${parts.length} parts total`);
```

**cURL:**

```bash
# Upload a file part
curl -X POST https://api.openai.com/v1/uploads/upload_abc123/parts \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "data=@file_chunk_001.bin"
```

### Complete Upload

Finalize the upload by specifying the order of parts and creating the final file object.

#### Complete Upload Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Complete the upload with ordered parts
completed_upload = client.uploads.complete(
    upload_id="upload_abc123",
    part_ids=["part_001", "part_002", "part_003"],
    md5="d41d8cd98f00b204e9800998ecf8427e"  # Optional checksum
)

print(f"Upload completed: {completed_upload.status}")
print(f"File ID: {completed_upload.file.id}")
print(f"File ready for use: {completed_upload.file.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const completedUpload = await client.uploads.complete("upload_abc123", {
    part_ids: ["part_001", "part_002", "part_003"],
    md5: "d41d8cd98f00b204e9800998ecf8427e" // Optional checksum
});

console.log(`Upload completed: ${completedUpload.status}`);
console.log(`File ID: ${completedUpload.file.id}`);
console.log(`File ready for use: ${completedUpload.file.status}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/uploads/upload_abc123/complete \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "part_ids": ["part_001", "part_002", "part_003"],
    "md5": "d41d8cd98f00b204e9800998ecf8427e"
  }'
```

### Cancel Upload

Cancel an active upload session to free resources when upload is no longer needed.

#### Cancel Upload Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Cancel upload
cancelled_upload = client.uploads.cancel("upload_abc123")

print(f"Upload cancelled: {cancelled_upload.status}")
print(f"Upload ID: {cancelled_upload.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const cancelledUpload = await client.uploads.cancel("upload_abc123");

console.log(`Upload cancelled: ${cancelledUpload.status}`);
console.log(`Upload ID: ${cancelledUpload.id}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/uploads/upload_abc123/cancel \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

## Vector Stores API

Manage vector databases for semantic search and retrieval-augmented generation (RAG) workflows with automatic embedding and indexing.

### List Vector Stores

Retrieve all vector stores in your organization for managing document collections and search indexes.

#### List Vector Stores Endpoint

```http
GET /vector_stores
```

#### List Vector Stores Parameters

| Parameter | Type    | Required | Description                                            |
| --------- | ------- | -------- | ------------------------------------------------------ |
| `limit`   | integer | No       | Number of vector stores to return (1-100, default: 20) |
| `order`   | string  | No       | Sort order: `asc` or `desc` by created_at timestamp    |
| `after`   | string  | No       | Pagination cursor for next page                        |
| `before`  | string  | No       | Pagination cursor for previous page                    |

#### List Vector Stores Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all vector stores
vector_stores = client.beta.vector_stores.list()

for store in vector_stores.data:
    print(f"Store ID: {store.id}")
    print(f"Name: {store.name}")
    print(f"Status: {store.status}")
    print(f"File counts: {store.file_counts}")
    print(f"Usage bytes: {store.usage_bytes}")
    print("---")

# List with pagination
recent_stores = client.beta.vector_stores.list(
    limit=10,
    order="desc"
)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List all vector stores
const vectorStores = await client.beta.vectorStores.list();

vectorStores.data.forEach(store => {
    console.log(`Store ID: ${store.id}`);
    console.log(`Name: ${store.name}`);
    console.log(`Status: ${store.status}`);
    console.log(`File counts: ${store.file_counts}`);
    console.log(`Usage bytes: ${store.usage_bytes}`);
    console.log("---");
});

// List with pagination
const recentStores = await client.beta.vectorStores.list({
    limit: 10,
    order: "desc"
});
```

**cURL:**

```bash
# List vector stores
curl https://api.openai.com/v1/vector_stores \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"

# List with pagination
curl "https://api.openai.com/v1/vector_stores?limit=10&order=desc" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

### Create Vector Store

Create a new vector store for organizing and searching through document collections.

#### Create Vector Store Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create basic vector store
vector_store = client.beta.vector_stores.create(
    name="Company Knowledge Base"
)

print(f"Created vector store: {vector_store.id}")
print(f"Name: {vector_store.name}")
print(f"Status: {vector_store.status}")

# Create vector store with files and expiration
vector_store_with_files = client.beta.vector_stores.create(
    name="Product Documentation",
    file_ids=["file_abc123", "file_def456"],
    expires_after={
        "anchor": "last_active_at",
        "days": 30
    },
    metadata={
        "department": "product",
        "version": "v2.1"
    }
)

print(f"Created store with files: {vector_store_with_files.id}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Create basic vector store
const vectorStore = await client.beta.vectorStores.create({
    name: "Company Knowledge Base"
});

console.log(`Created vector store: ${vectorStore.id}`);
console.log(`Name: ${vectorStore.name}`);
console.log(`Status: ${vectorStore.status}`);

// Create vector store with files and expiration
const vectorStoreWithFiles = await client.beta.vectorStores.create({
    name: "Product Documentation",
    file_ids: ["file_abc123", "file_def456"],
    expires_after: {
        anchor: "last_active_at",
        days: 30
    },
    metadata: {
        department: "product",
        version: "v2.1"
    }
});

console.log(`Created store with files: ${vectorStoreWithFiles.id}`);
```

**cURL:**

```bash
# Create basic vector store
curl https://api.openai.com/v1/vector_stores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "name": "Company Knowledge Base"
  }'

# Create with files and expiration
curl https://api.openai.com/v1/vector_stores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "name": "Product Documentation",
    "file_ids": ["file_abc123", "file_def456"],
    "expires_after": {
      "anchor": "last_active_at",
      "days": 30
    }
  }'
```

---

### Retrieve Vector Store

Get detailed information about a specific vector store including file counts and usage statistics.

#### Retrieve Vector Store Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve vector store by ID
vector_store = client.beta.vector_stores.retrieve("vs_abc123")

print(f"Vector Store ID: {vector_store.id}")
print(f"Name: {vector_store.name}")
print(f"Status: {vector_store.status}")
print(f"File counts: {vector_store.file_counts}")
print(f"Usage bytes: {vector_store.usage_bytes}")
print(f"Created at: {vector_store.created_at}")
print(f"Last active at: {vector_store.last_active_at}")

# Check expiration settings
if vector_store.expires_after:
    print(f"Expires after: {vector_store.expires_after}")

# Access metadata
if vector_store.metadata:
    print("Metadata:")
    for key, value in vector_store.metadata.items():
        print(f"  {key}: {value}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Retrieve vector store by ID
const vectorStore = await client.beta.vectorStores.retrieve("vs_abc123");

console.log(`Vector Store ID: ${vectorStore.id}`);
console.log(`Name: ${vectorStore.name}`);
console.log(`Status: ${vectorStore.status}`);
console.log(`File counts: ${vectorStore.file_counts}`);
console.log(`Usage bytes: ${vectorStore.usage_bytes}`);
console.log(`Created at: ${vectorStore.created_at}`);
console.log(`Last active at: ${vectorStore.last_active_at}`);

// Check expiration settings
if (vectorStore.expires_after) {
    console.log(`Expires after: ${vectorStore.expires_after}`);
}

// Access metadata
if (vectorStore.metadata) {
    console.log("Metadata:");
    Object.entries(vectorStore.metadata).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });
}
```

**cURL:**

```bash
curl https://api.openai.com/v1/vector_stores/vs_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

---

### Modify Vector Store

Update vector store properties like name, metadata, and expiration settings.

#### Modify Vector Store Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update vector store name and metadata
updated_store = client.beta.vector_stores.update(
    vector_store_id="vs_abc123",
    name="Updated Knowledge Base",
    metadata={
        "department": "engineering",
        "updated_by": "admin",
        "version": "v2.0"
    }
)

print(f"Updated store: {updated_store.name}")
print(f"New metadata: {updated_store.metadata}")

# Update expiration settings
store_with_expiry = client.beta.vector_stores.update(
    vector_store_id="vs_abc123",
    expires_after={
        "anchor": "last_active_at",
        "days": 60
    }
)

print(f"Expiration updated: {store_with_expiry.expires_after}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Update vector store name and metadata
const updatedStore = await client.beta.vectorStores.update("vs_abc123", {
    name: "Updated Knowledge Base",
    metadata: {
        department: "engineering",
        updated_by: "admin",
        version: "v2.0"
    }
});

console.log(`Updated store: ${updatedStore.name}`);
console.log(`New metadata: ${updatedStore.metadata}`);

// Update expiration settings
const storeWithExpiry = await client.beta.vectorStores.update("vs_abc123", {
    expires_after: {
        anchor: "last_active_at",
        days: 60
    }
});

console.log(`Expiration updated: ${storeWithExpiry.expires_after}`);
```

**cURL:**

```bash
# Update vector store
curl https://api.openai.com/v1/vector_stores/vs_abc123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "name": "Updated Knowledge Base",
    "metadata": {
      "department": "engineering",
      "version": "v2.0"
    }
  }'

# Update with expiration
curl https://api.openai.com/v1/vector_stores/vs_abc123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "expires_after": {
      "anchor": "last_active_at",
      "days": 60
    }
  }'
```

---

### Delete Vector Store

Permanently delete a vector store and all its associated files and embeddings.

#### Delete Vector Store Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete vector store
deletion_status = client.beta.vector_stores.delete("vs_abc123")

print(f"Deletion status: {deletion_status}")
print(f"ID: {deletion_status.id}")
print(f"Object: {deletion_status.object}")
print(f"Deleted: {deletion_status.deleted}")

# Confirm deletion by trying to retrieve
try:
    client.beta.vector_stores.retrieve("vs_abc123")
    print("Vector store still exists")
except Exception as e:
    print("Vector store successfully deleted")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Delete vector store
const deletionStatus = await client.beta.vectorStores.del("vs_abc123");

console.log(`Deletion status: ${deletionStatus}`);
console.log(`ID: ${deletionStatus.id}`);
console.log(`Object: ${deletionStatus.object}`);
console.log(`Deleted: ${deletionStatus.deleted}`);

// Confirm deletion by trying to retrieve
try {
    await client.beta.vectorStores.retrieve("vs_abc123");
    console.log("Vector store still exists");
} catch (error) {
    console.log("Vector store successfully deleted");
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/vector_stores/vs_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

---

## Vector Store File Batch Operations

Efficiently manage multiple file operations in vector stores using batch processing for improved performance.

### Create File Batch

Process multiple files simultaneously for faster indexing and embedding generation.

#### Create File Batch Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Create file batch for multiple documents
file_batch = client.beta.vector_stores.file_batches.create(
    vector_store_id="vs_abc123",
    file_ids=[
        "file_doc1.pdf",
        "file_doc2.docx",
        "file_doc3.txt",
        "file_doc4.md"
    ]
)

print(f"Batch ID: {file_batch.id}")
print(f"Status: {file_batch.status}")
print(f"File counts: {file_batch.file_counts}")
print(f"Created at: {file_batch.created_at}")

# Monitor batch progress
while file_batch.status in ["in_progress", "cancelling"]:
    print("Processing files...")
    time.sleep(5)
    file_batch = client.beta.vector_stores.file_batches.retrieve(
        vector_store_id="vs_abc123",
        batch_id=file_batch.id
    )

print(f"Final status: {file_batch.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Create file batch for multiple documents
const fileBatch = await client.beta.vectorStores.fileBatches.create("vs_abc123", {
    file_ids: [
        "file_doc1.pdf",
        "file_doc2.docx",
        "file_doc3.txt",
        "file_doc4.md"
    ]
});

console.log(`Batch ID: ${fileBatch.id}`);
console.log(`Status: ${fileBatch.status}`);
console.log(`File counts: ${fileBatch.file_counts}`);
console.log(`Created at: ${fileBatch.created_at}`);

// Monitor batch progress
let currentBatch = fileBatch;
while (currentBatch.status === "in_progress" || currentBatch.status === "cancelling") {
    console.log("Processing files...");
    await new Promise(resolve => setTimeout(resolve, 5000));
    currentBatch = await client.beta.vectorStores.fileBatches.retrieve("vs_abc123", fileBatch.id);
}

console.log(`Final status: ${currentBatch.status}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/vector_stores/vs_abc123/file_batches \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "file_ids": [
      "file_doc1.pdf",
      "file_doc2.docx",
      "file_doc3.txt",
      "file_doc4.md"
    ]
  }'
```

### Retrieve File Batch

Get detailed information about a file batch including processing status and file counts.

#### Retrieve File Batch Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve file batch status
file_batch = client.beta.vector_stores.file_batches.retrieve(
    vector_store_id="vs_abc123",
    batch_id="vsfb_batch456"
)

print(f"Batch ID: {file_batch.id}")
print(f"Vector Store ID: {file_batch.vector_store_id}")
print(f"Status: {file_batch.status}")
print(f"File counts: {file_batch.file_counts}")
print(f"Created at: {file_batch.created_at}")

# Check individual file counts
print(f"In progress: {file_batch.file_counts.in_progress}")
print(f"Completed: {file_batch.file_counts.completed}")
print(f"Failed: {file_batch.file_counts.failed}")
print(f"Cancelled: {file_batch.file_counts.cancelled}")
print(f"Total: {file_batch.file_counts.total}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Retrieve file batch status
const fileBatch = await client.beta.vectorStores.fileBatches.retrieve(
    "vs_abc123",
    "vsfb_batch456"
);

console.log(`Batch ID: ${fileBatch.id}`);
console.log(`Vector Store ID: ${fileBatch.vector_store_id}`);
console.log(`Status: ${fileBatch.status}`);
console.log(`File counts: ${fileBatch.file_counts}`);
console.log(`Created at: ${fileBatch.created_at}`);

// Check individual file counts
console.log(`In progress: ${fileBatch.file_counts.in_progress}`);
console.log(`Completed: ${fileBatch.file_counts.completed}`);
console.log(`Failed: ${fileBatch.file_counts.failed}`);
console.log(`Cancelled: ${fileBatch.file_counts.cancelled}`);
console.log(`Total: ${fileBatch.file_counts.total}`);
```

**cURL:**

```bash
curl https://api.openai.com/v1/vector_stores/vs_abc123/file_batches/vsfb_batch456 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

### Cancel File Batch

Stop processing of files in a batch that is currently in progress.

#### Cancel File Batch Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Cancel file batch processing
cancelled_batch = client.beta.vector_stores.file_batches.cancel(
    vector_store_id="vs_abc123",
    batch_id="vsfb_batch456"
)

print(f"Cancellation requested for batch: {cancelled_batch.id}")
print(f"Status: {cancelled_batch.status}")
print(f"File counts: {cancelled_batch.file_counts}")

# Monitor cancellation progress
while cancelled_batch.status == "cancelling":
    print("Cancelling batch...")
    time.sleep(2)
    cancelled_batch = client.beta.vector_stores.file_batches.retrieve(
        vector_store_id="vs_abc123",
        batch_id=cancelled_batch.id
    )

print(f"Final status: {cancelled_batch.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Cancel file batch processing
const cancelledBatch = await client.beta.vectorStores.fileBatches.cancel(
    "vs_abc123",
    "vsfb_batch456"
);

console.log(`Cancellation requested for batch: ${cancelledBatch.id}`);
console.log(`Status: ${cancelledBatch.status}`);
console.log(`File counts: ${cancelledBatch.file_counts}`);

// Monitor cancellation progress
let currentBatch = cancelledBatch;
while (currentBatch.status === "cancelling") {
    console.log("Cancelling batch...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    currentBatch = await client.beta.vectorStores.fileBatches.retrieve("vs_abc123", cancelledBatch.id);
}

console.log(`Final status: ${currentBatch.status}`);
```

**cURL:**

```bash
curl -X POST https://api.openai.com/v1/vector_stores/vs_abc123/file_batches/vsfb_batch456/cancel \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

---

## Vector Store File Management

Manage individual files within vector stores for precise control over document processing and indexing.

### List Files in Batch

View all files within a specific batch to monitor processing status and troubleshoot issues.

#### List Batch Files Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List files in a specific batch
batch_files = client.beta.vector_stores.file_batches.list_files(
    vector_store_id="vs_abc123",
    batch_id="vsfb_batch456",
    limit=20,
    filter="completed"
)

print(f"Batch files count: {len(batch_files.data)}")
for file in batch_files.data:
    print(f"File ID: {file.id}")
    print(f"Status: {file.status}")
    print(f"Usage bytes: {file.usage_bytes}")
    print(f"Created at: {file.created_at}")
    print("---")

# Filter by status
failed_files = client.beta.vector_stores.file_batches.list_files(
    vector_store_id="vs_abc123",
    batch_id="vsfb_batch456",
    filter="failed"
)

print(f"Failed files: {len(failed_files.data)}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List files in a specific batch
const batchFiles = await client.beta.vectorStores.fileBatches.listFiles(
    "vs_abc123",
    "vsfb_batch456",
    {
        limit: 20,
        filter: "completed"
    }
);

console.log(`Batch files count: ${batchFiles.data.length}`);
batchFiles.data.forEach(file => {
    console.log(`File ID: ${file.id}`);
    console.log(`Status: ${file.status}`);
    console.log(`Usage bytes: ${file.usage_bytes}`);
    console.log(`Created at: ${file.created_at}`);
    console.log("---");
});

// Filter by status
const failedFiles = await client.beta.vectorStores.fileBatches.listFiles(
    "vs_abc123",
    "vsfb_batch456",
    { filter: "failed" }
);

console.log(`Failed files: ${failedFiles.data.length}`);
```

**cURL:**

```bash
# List files in batch
curl "https://api.openai.com/v1/vector_stores/vs_abc123/file_batches/vsfb_batch456/files?limit=20&filter=completed" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"

# Filter failed files
curl "https://api.openai.com/v1/vector_stores/vs_abc123/file_batches/vsfb_batch456/files?filter=failed" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

### List Vector Store Files

View all files in a vector store with status filtering and pagination support.

#### List Vector Store Files Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# List all files in vector store
vector_store_files = client.beta.vector_stores.files.list(
    vector_store_id="vs_abc123",
    limit=50,
    order="desc"
)

print(f"Total files: {len(vector_store_files.data)}")
for file in vector_store_files.data:
    print(f"File ID: {file.id}")
    print(f"Status: {file.status}")
    print(f"Usage bytes: {file.usage_bytes}")
    print(f"Last error: {file.last_error}")
    print("---")

# Filter by processing status
completed_files = client.beta.vector_stores.files.list(
    vector_store_id="vs_abc123",
    filter="completed"
)

in_progress_files = client.beta.vector_stores.files.list(
    vector_store_id="vs_abc123",
    filter="in_progress"
)

print(f"Completed: {len(completed_files.data)}")
print(f"In progress: {len(in_progress_files.data)}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// List all files in vector store
const vectorStoreFiles = await client.beta.vectorStores.files.list("vs_abc123", {
    limit: 50,
    order: "desc"
});

console.log(`Total files: ${vectorStoreFiles.data.length}`);
vectorStoreFiles.data.forEach(file => {
    console.log(`File ID: ${file.id}`);
    console.log(`Status: ${file.status}`);
    console.log(`Usage bytes: ${file.usage_bytes}`);
    console.log(`Last error: ${file.last_error}`);
    console.log("---");
});

// Filter by processing status
const completedFiles = await client.beta.vectorStores.files.list("vs_abc123", {
    filter: "completed"
});

const inProgressFiles = await client.beta.vectorStores.files.list("vs_abc123", {
    filter: "in_progress"
});

console.log(`Completed: ${completedFiles.data.length}`);
console.log(`In progress: ${inProgressFiles.data.length}`);
```

**cURL:**

```bash
# List all files
curl "https://api.openai.com/v1/vector_stores/vs_abc123/files?limit=50&order=desc" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"

# Filter by status
curl "https://api.openai.com/v1/vector_stores/vs_abc123/files?filter=completed" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

### Create Vector Store File

Add individual files to a vector store for processing and indexing.

#### Create Vector Store File Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Add file to vector store
vector_store_file = client.beta.vector_stores.files.create(
    vector_store_id="vs_abc123",
    file_id="file_document.pdf"
)

print(f"File added: {vector_store_file.id}")
print(f"Vector store: {vector_store_file.vector_store_id}")
print(f"Status: {vector_store_file.status}")
print(f"Created at: {vector_store_file.created_at}")

# Add file with chunking strategy
vector_store_file_chunked = client.beta.vector_stores.files.create(
    vector_store_id="vs_abc123",
    file_id="file_large_doc.pdf",
    chunking_strategy={
        "type": "static",
        "static": {
            "max_chunk_size_tokens": 800,
            "chunk_overlap_tokens": 400
        }
    }
)

print(f"Chunked file added: {vector_store_file_chunked.id}")

# Monitor file processing
while vector_store_file.status in ["in_progress"]:
    print("Processing file...")
    time.sleep(3)
    vector_store_file = client.beta.vector_stores.files.retrieve(
        vector_store_id="vs_abc123",
        file_id=vector_store_file.id
    )

print(f"Final status: {vector_store_file.status}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Add file to vector store
const vectorStoreFile = await client.beta.vectorStores.files.create("vs_abc123", {
    file_id: "file_document.pdf"
});

console.log(`File added: ${vectorStoreFile.id}`);
console.log(`Vector store: ${vectorStoreFile.vector_store_id}`);
console.log(`Status: ${vectorStoreFile.status}`);
console.log(`Created at: ${vectorStoreFile.created_at}`);

// Add file with chunking strategy
const vectorStoreFileChunked = await client.beta.vectorStores.files.create("vs_abc123", {
    file_id: "file_large_doc.pdf",
    chunking_strategy: {
        type: "static",
        static: {
            max_chunk_size_tokens: 800,
            chunk_overlap_tokens: 400
        }
    }
});

console.log(`Chunked file added: ${vectorStoreFileChunked.id}`);

// Monitor file processing
let currentFile = vectorStoreFile;
while (currentFile.status === "in_progress") {
    console.log("Processing file...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    currentFile = await client.beta.vectorStores.files.retrieve("vs_abc123", vectorStoreFile.id);
}

console.log(`Final status: ${currentFile.status}`);
```

**cURL:**

```bash
# Add file to vector store
curl https://api.openai.com/v1/vector_stores/vs_abc123/files \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "file_id": "file_document.pdf"
  }'

# Add with chunking strategy
curl https://api.openai.com/v1/vector_stores/vs_abc123/files \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "file_id": "file_large_doc.pdf",
    "chunking_strategy": {
      "type": "static",
      "static": {
        "max_chunk_size_tokens": 800,
        "chunk_overlap_tokens": 400
      }
    }
  }'
```

---

### Retrieve Vector Store File

Get detailed information about a specific file in a vector store including processing status and metadata.

#### Retrieve Vector Store File Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve file information
vector_store_file = client.beta.vector_stores.files.retrieve(
    vector_store_id="vs_abc123",
    file_id="file_document.pdf"
)

print(f"File ID: {vector_store_file.id}")
print(f"Vector Store ID: {vector_store_file.vector_store_id}")
print(f"Status: {vector_store_file.status}")
print(f"Usage bytes: {vector_store_file.usage_bytes}")
print(f"Created at: {vector_store_file.created_at}")

# Check for errors
if vector_store_file.last_error:
    print(f"Last error: {vector_store_file.last_error}")

# Check chunking strategy
if vector_store_file.chunking_strategy:
    print(f"Chunking strategy: {vector_store_file.chunking_strategy}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Retrieve file information
const vectorStoreFile = await client.beta.vectorStores.files.retrieve(
    "vs_abc123",
    "file_document.pdf"
);

console.log(`File ID: ${vectorStoreFile.id}`);
console.log(`Vector Store ID: ${vectorStoreFile.vector_store_id}`);
console.log(`Status: ${vectorStoreFile.status}`);
console.log(`Usage bytes: ${vectorStoreFile.usage_bytes}`);
console.log(`Created at: ${vectorStoreFile.created_at}`);

// Check for errors
if (vectorStoreFile.last_error) {
    console.log(`Last error: ${vectorStoreFile.last_error}`);
}

// Check chunking strategy
if (vectorStoreFile.chunking_strategy) {
    console.log(`Chunking strategy: ${vectorStoreFile.chunking_strategy}`);
}
```

**cURL:**

```bash
curl https://api.openai.com/v1/vector_stores/vs_abc123/files/file_document.pdf \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

---

### Delete Vector Store File

Remove a file from a vector store without deleting the original file from your account.

#### Delete Vector Store File Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Delete file from vector store
deletion_status = client.beta.vector_stores.files.delete(
    vector_store_id="vs_abc123",
    file_id="file_document.pdf"
)

print(f"File ID: {deletion_status.id}")
print(f"Object: {deletion_status.object}")
print(f"Deleted: {deletion_status.deleted}")

# Confirm deletion by attempting retrieval
try:
    client.beta.vector_stores.files.retrieve(
        vector_store_id="vs_abc123",
        file_id="file_document.pdf"
    )
    print("File still exists in vector store")
except Exception as e:
    print("File successfully removed from vector store")

# Note: Original file still exists in Files API
files = client.files.list()
for file in files.data:
    if file.id == "file_document.pdf":
        print(f"Original file still exists: {file.filename}")
        break
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Delete file from vector store
const deletionStatus = await client.beta.vectorStores.files.del(
    "vs_abc123",
    "file_document.pdf"
);

console.log(`File ID: ${deletionStatus.id}`);
console.log(`Object: ${deletionStatus.object}`);
console.log(`Deleted: ${deletionStatus.deleted}`);

// Confirm deletion by attempting retrieval
try {
    await client.beta.vectorStores.files.retrieve("vs_abc123", "file_document.pdf");
    console.log("File still exists in vector store");
} catch (error) {
    console.log("File successfully removed from vector store");
}

// Note: Original file still exists in Files API
const files = await client.files.list();
const originalFile = files.data.find(file => file.id === "file_document.pdf");
if (originalFile) {
    console.log(`Original file still exists: ${originalFile.filename}`);
}
```

**cURL:**

```bash
curl -X DELETE https://api.openai.com/v1/vector_stores/vs_abc123/files/file_document.pdf \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2"
```

---

### Update Vector Store File

Modify file attributes such as metadata or chunking strategy for files already in a vector store.

#### Update Vector Store File Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Update file metadata
updated_file = client.beta.vector_stores.files.update(
    vector_store_id="vs_abc123",
    file_id="file_document.pdf",
    metadata={
        "category": "technical_documentation",
        "priority": "high",
        "department": "engineering",
        "last_reviewed": "2024-01-15"
    }
)

print(f"File updated: {updated_file.id}")
print(f"New metadata: {updated_file.metadata}")

# Update chunking strategy
updated_chunked_file = client.beta.vector_stores.files.update(
    vector_store_id="vs_abc123",
    file_id="file_large_doc.pdf",
    chunking_strategy={
        "type": "static",
        "static": {
            "max_chunk_size_tokens": 1200,
            "chunk_overlap_tokens": 200
        }
    }
)

print(f"Chunking updated for: {updated_chunked_file.id}")
print(f"New strategy: {updated_chunked_file.chunking_strategy}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

// Update file metadata
const updatedFile = await client.beta.vectorStores.files.update(
    "vs_abc123",
    "file_document.pdf",
    {
        metadata: {
            category: "technical_documentation",
            priority: "high",
            department: "engineering",
            last_reviewed: "2024-01-15"
        }
    }
);

console.log(`File updated: ${updatedFile.id}`);
console.log(`New metadata: ${updatedFile.metadata}`);

// Update chunking strategy
const updatedChunkedFile = await client.beta.vectorStores.files.update(
    "vs_abc123",
    "file_large_doc.pdf",
    {
        chunking_strategy: {
            type: "static",
            static: {
                max_chunk_size_tokens: 1200,
                chunk_overlap_tokens: 200
            }
        }
    }
);

console.log(`Chunking updated for: ${updatedChunkedFile.id}`);
console.log(`New strategy: ${updatedChunkedFile.chunking_strategy}`);
```

**cURL:**

```bash
# Update file metadata
curl https://api.openai.com/v1/vector_stores/vs_abc123/files/file_document.pdf \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "metadata": {
      "category": "technical_documentation",
      "priority": "high",
      "department": "engineering"
    }
  }'

# Update chunking strategy
curl https://api.openai.com/v1/vector_stores/vs_abc123/files/file_large_doc.pdf \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "chunking_strategy": {
      "type": "static",
      "static": {
        "max_chunk_size_tokens": 1200,
        "chunk_overlap_tokens": 200
      }
    }
  }'
```

---

### Retrieve File Content

Access the parsed and processed content of files within a vector store for analysis and debugging.

#### Retrieve File Content Examples

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Retrieve parsed file content
file_content = client.beta.vector_stores.files.content(
    vector_store_id="vs_abc123",
    file_id="file_document.pdf"
)

print(f"Content type: {type(file_content)}")
print(f"Content preview: {str(file_content)[:500]}...")

# Save content to file for analysis
with open("parsed_content.txt", "w", encoding="utf-8") as f:
    f.write(str(file_content))

print("Content saved to parsed_content.txt")

# Process content for analysis
content_str = str(file_content)
word_count = len(content_str.split())
char_count = len(content_str)

print(f"Word count: {word_count}")
print(f"Character count: {char_count}")
```

**JavaScript:**

```javascript
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI();

// Retrieve parsed file content
const fileContent = await client.beta.vectorStores.files.content(
    "vs_abc123",
    "file_document.pdf"
);

console.log(`Content type: ${typeof fileContent}`);
console.log(`Content preview: ${fileContent.toString().substring(0, 500)}...`);

// Save content to file for analysis
fs.writeFileSync("parsed_content.txt", fileContent.toString(), "utf-8");
console.log("Content saved to parsed_content.txt");

// Process content for analysis
const contentStr = fileContent.toString();
const wordCount = contentStr.split(/\s+/).length;
const charCount = contentStr.length;

console.log(`Word count: ${wordCount}`);
console.log(`Character count: ${charCount}`);
```

**cURL:**

```bash
# Retrieve file content
curl https://api.openai.com/v1/vector_stores/vs_abc123/files/file_document.pdf/content \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  --output parsed_content.txt

# View content statistics
wc -w parsed_content.txt
wc -c parsed_content.txt
```

OK

[VectorStoreFileContentResponse](#vectorstorefilecontentresponse)

## POST /vector_stores/{vector_store_id}/search

Search vector store

Search a vector store for relevant chunks based on a query and file attributes filter.

### Parameters

| Name            | Type   | Required | Description                           |
| --------------- | ------ | -------- | ------------------------------------- |
| vector_store_id | string | True     | The ID of the vector store to search. |

### Request Body

[VectorStoreSearchRequest](#vectorstoresearchrequest)

### Responses

#### 200

OK

[VectorStoreSearchResultsPage](#vectorstoresearchresultspage)

## POST /conversations

Create a conversation

Create a conversation.

### Request Body

[CreateConversationBody](#createconversationbody)

### Responses

#### 200

Success

[ConversationResource](#conversationresource)

## GET /conversations/{conversation_id}

Retrieve a conversation

Get a conversation

### Parameters

| Name            | Type   | Required | Description                             |
| --------------- | ------ | -------- | --------------------------------------- |
| conversation_id | string | True     | The ID of the conversation to retrieve. |

### Responses

#### 200

Success

[ConversationResource](#conversationresource)

## DELETE /conversations/{conversation_id}

Delete a conversation

Delete a conversation. Items in the conversation will not be deleted.

### Parameters

| Name            | Type   | Required | Description                           |
| --------------- | ------ | -------- | ------------------------------------- |
| conversation_id | string | True     | The ID of the conversation to delete. |

### Responses

#### 200

Success

[DeletedConversationResource](#deletedconversationresource)

## POST /conversations/{conversation_id}

Update a conversation

### Parameters

| Name            | Type   | Required | Description                           |
| --------------- | ------ | -------- | ------------------------------------- |
| conversation_id | string | True     | The ID of the conversation to update. |

### Request Body

[UpdateConversationBody](#updateconversationbody)

### Responses

#### 200

Success

[ConversationResource](#conversationresource)

## POST /videos

Create video

Create a video

### Request Body

[CreateVideoBody](#createvideobody)

[CreateVideoBody](#createvideobody)

### Responses

#### 200

Success

[VideoResource](#videoresource)

## GET /videos

List videos

### Parameters

| Name  | Type    | Required | Description                                                                                    |
| ----- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| limit | integer | False    | Number of items to retrieve                                                                    |
| order | string  | False    | Sort order of results by timestamp. Use `asc`for ascending order or`desc`for descending order. |
| after | string  | False    | Identifier for the last item from the previous pagination request                              |

### Responses

#### 200

Success

[VideoListResource](#videolistresource)

## GET /videos/{video_id}

Retrieve video

Retrieve a video

### Parameters

| Name     | Type   | Required | Description                              |
| -------- | ------ | -------- | ---------------------------------------- |
| video_id | string | True     | The identifier of the video to retrieve. |

### Responses

#### 200

Success

[VideoResource](#videoresource)

## DELETE /videos/{video_id}

Delete video

Delete a video

### Parameters

| Name     | Type   | Required | Description                            |
| -------- | ------ | -------- | -------------------------------------- |
| video_id | string | True     | The identifier of the video to delete. |

### Responses

#### 200

Success

[DeletedVideoResource](#deletedvideoresource)

## GET /videos/{video_id}/content

Retrieve video content

Download video content

### Parameters

| Name     | Type   | Required | Description                                                    |
| -------- | ------ | -------- | -------------------------------------------------------------- |
| video_id | string | True     | The identifier of the video whose media to download.           |
| variant  | string | False    | Which downloadable asset to return. Defaults to the MP4 video. |

### Responses

#### 200

The video bytes or preview asset that matches the requested variant.

string

string

string

## POST /videos/{video_id}/remix

Remix video

Create a video remix

### Parameters

| Name     | Type   | Required | Description                                     |
| -------- | ------ | -------- | ----------------------------------------------- |
| video_id | string | True     | The identifier of the completed video to remix. |

### Request Body

[CreateVideoRemixBody](#createvideoremixbody)

[CreateVideoRemixBody](#createvideoremixbody)

### Responses

#### 200

Success

[VideoResource](#videoresource)

## POST /chatkit/files

Upload file to ChatKit

Upload a ChatKit file

### Request Body

[UploadFileBody](#uploadfilebody)

[UploadFileBody](#uploadfilebody)

### Responses

#### 200

Success

## POST /chatkit/sessions/{session_id}/cancel

Cancel chat session

Cancel a ChatKit session

### Parameters

| Name       | Type   | Required | Description                                          |
| ---------- | ------ | -------- | ---------------------------------------------------- |
| session_id | string | True     | Unique identifier for the ChatKit session to cancel. |

### Responses

#### 200

Success

[ChatSessionResource](#chatsessionresource)

## POST /chatkit/sessions

Create ChatKit session

Create a ChatKit session

### Request Body

[CreateChatSessionBody](#createchatsessionbody)

### Responses

#### 200

Success

[ChatSessionResource](#chatsessionresource)

## GET /chatkit/threads/{thread_id}/items

List ChatKit thread items

### Parameters

| Name      | Type    | Required | Description                                                                             |
| --------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| thread_id | string  | True     | Identifier of the ChatKit thread whose items are requested.                             |
| limit     | integer | False    | Maximum number of thread items to return. Defaults to 20.                               |
| order     | string  | False    | Sort order for results by creation time. Defaults to`desc`.                             |
| after     | string  | False    | List items created after this thread item ID. Defaults to null for the first page.      |
| before    | string  | False    | List items created before this thread item ID. Defaults to null for the newest results. |

### Responses

#### 200

Success

[ThreadItemListResource](#threaditemlistresource)

## GET /chatkit/threads/{thread_id}

Retrieve ChatKit thread

Retrieve a ChatKit thread

### Parameters

| Name      | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| thread_id | string | True     | Identifier of the ChatKit thread to retrieve. |

### Responses

#### 200

Success

[ThreadResource](#threadresource)

## DELETE /chatkit/threads/{thread_id}

Delete ChatKit thread

Delete a ChatKit thread

### Parameters

| Name      | Type   | Required | Description                                 |
| --------- | ------ | -------- | ------------------------------------------- |
| thread_id | string | True     | Identifier of the ChatKit thread to delete. |

### Responses

#### 200

Success

[DeletedThreadResource](#deletedthreadresource)

## GET /chatkit/threads

List ChatKit threads

### Parameters

| Name   | Type    | Required | Description                                                                               |
| ------ | ------- | -------- | ----------------------------------------------------------------------------------------- |
| limit  | integer | False    | Maximum number of thread items to return. Defaults to 20.                                 |
| order  | string  | False    | Sort order for results by creation time. Defaults to `desc`.                              |
| after  | string  | False    | List items created after this thread item ID. Defaults to null for the first page.        |
| before | string  | False    | List items created before this thread item ID. Defaults to null for the newest results.   |
| user   | string  | False    | Filter threads that belong to this user identifier. Defaults to null to return all users. |

### Responses

#### 200

Success

[ThreadListResource](#threadlistresource)

# Components

## AddUploadPartRequest

| Field | Type   | Description                       |
| ----- | ------ | --------------------------------- |
| data  | string | The chunk of bytes for this Part. |

## AdminApiKey

Represents an individual Admin API key in an org.

| Field          | Type    | Description                                                     |
| -------------- | ------- | --------------------------------------------------------------- |
| object         | string  | The object type, which is always `organization.admin_api_key`   |
| id             | string  | The identifier, which can be referenced in API endpoints        |
| name           | string  | The name of the API key                                         |
| redacted_value | string  | The redacted value of the API key                               |
| value          | string  | The value of the API key. Only shown on create.                 |
| created_at     | integer | The Unix timestamp (in seconds) of when the API key was created |
| last_used_at   |
| owner          | object  |

## ApiKeyList

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| has_more | boolean |
| first_id | string  |
| last_id  | string  |

## AssistantObject

Represents an`assistant`that can call the model and use tools.

| Field           | Type    | Description                                                                                                                                                                                                                                               |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | string  | The identifier, which can be referenced in API endpoints.                                                                                                                                                                                                 |
| object          | string  | The object type, which is always`assistant`.                                                                                                                                                                                                              |
| created_at      | integer | The Unix timestamp (in seconds) for when the assistant was created.                                                                                                                                                                                       |
| name            |
| description     |
| model           | string  | ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them. |
| instructions    |
| tools           | array   | A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.                                                                                       |
| tool_resources  |
| metadata        |
| temperature     |
| top_p           |
| response_format |

## AssistantStreamEvent

Represents an event emitted when streaming a Run.

Each event in a server-sent events stream has an `event`and`data`property:```event: thread.created
data: {"id": "thread_123", "object": "thread", ...}```We emit events whenever a new object is created, transitions to a new state, or is being
streamed in parts (deltas). For example, we emit`thread.run.created`when a new run
is created,`thread.run.completed`when a run completes, and so on. When an Assistant chooses
to create a message during a run, we emit a`thread.message.created event`, a
`thread.message.in_progress`event, many`thread.message.delta`events, and finally a`thread.message.completed`event.

We may add additional events over time, so we recommend handling unknown events gracefully
in your code. See the [Assistants API quickstart](https://platform.openai.com/docs/assistants/overview) to learn how to
integrate the Assistants API with streaming.

## AssistantSupportedModels

## AssistantToolsCode

| Field | Type   | Description                                       |
| ----- | ------ | ------------------------------------------------- |
| type  | string | The type of tool being defined:`code_interpreter` |

## AssistantToolsFileSearch

| Field       | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| type        | string | The type of tool being defined:`file_search` |
| file_search | object | Overrides for the file search tool.          |

## AssistantToolsFileSearchTypeOnly

| Field | Type   | Description                                  |
| ----- | ------ | -------------------------------------------- |
| type  | string | The type of tool being defined:`file_search` |

## AssistantToolsFunction

| Field    | Type   | Description                               |
| -------- | ------ | ----------------------------------------- |
| type     | string | The type of tool being defined:`function` |
| function |

## AssistantsApiResponseFormatOption

Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since`gpt-3.5-turbo-1106`.

Setting to `{ "type": "json_schema", "json_schema": {...} }`enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

Setting to`{ "type": "json_object" }`enables JSON mode, which ensures the message the model generates is valid JSON.

**Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if`finish_reason="length"`, which indicates the generation exceeded `max_tokens`or the conversation exceeded the max context length.

## AssistantsApiToolChoiceOption

Controls which (if any) tool is called by the model.`none`means the model will not call any tools and instead generates a message.`auto`is the default value and means the model can pick between generating a message or calling one or more tools.`required`means the model must call one or more tools before responding to the user.
Specifying a particular tool like`{"type": "file_search"}`or`{"type": "function", "function": {"name": "my_function"}}`forces the model to call that tool.

## AssistantsNamedToolChoice

Specifies a tool the model should use. Use to force the model to call a specific tool.

| Field    | Type   | Description                                                               |
| -------- | ------ | ------------------------------------------------------------------------- |
| type     | string | The type of the tool. If type is`function`, the function name must be set |
| function | object |

## AudioResponseFormat

The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`. For `gpt-4o-transcribe`and`gpt-4o-mini-transcribe`, the only supported format is `json`.

## AudioTranscription

| Field    | Type   | Description                                                                                                                                         |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| model    | string | The model to use for transcription. Current options are `whisper-1`, `gpt-4o-transcribe-latest`, `gpt-4o-mini-transcribe`, and `gpt-4o-transcribe`. |
| language | string | The language of the input audio. Supplying the input language in                                                                                    |
[ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
will improve accuracy and latency.
 |
| prompt | string | An optional text to guide the model's style or continue a previous audio
segment.
For `whisper-1`, the [prompt is a list of keywords](https://platform.openai.com/docs/guides/speech-to-text#prompting).
For `gpt-4o-transcribe`models, the prompt is a free text string, for example "expect words related to technology".
 |

## AuditLog

A log of a user action or configuration change within this organization.

| Field                           | Type    | Description                                                                                                                                                                         |
| ------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                              | string  | The ID of this log.                                                                                                                                                                 |
| type                            |
| effective_at                    | integer | The Unix timestamp (in seconds) of the event.                                                                                                                                       |
| project                         | object  | The project that the action was scoped to. Absent for actions not scoped to projects. Note that any admin actions taken via Admin API keys are associated with the default project. |
| actor                           |
| api_key.created                 | object  | The details for events with this`type`.                                                                                                                                             |
| api_key.updated                 | object  | The details for events with this `type`.                                                                                                                                            |
| api_key.deleted                 | object  | The details for events with this `type`.                                                                                                                                            |
| checkpoint.permission.created   | object  | The project and fine-tuned model checkpoint that the checkpoint permission was created for.                                                                                         |
| checkpoint.permission.deleted   | object  | The details for events with this `type`.                                                                                                                                            |
| external_key.registered         | object  | The details for events with this `type`.                                                                                                                                            |
| external_key.removed            | object  | The details for events with this `type`.                                                                                                                                            |
| group.created                   | object  | The details for events with this `type`.                                                                                                                                            |
| group.updated                   | object  | The details for events with this `type`.                                                                                                                                            |
| group.deleted                   | object  | The details for events with this `type`.                                                                                                                                            |
| scim.enabled                    | object  | The details for events with this `type`.                                                                                                                                            |
| scim.disabled                   | object  | The details for events with this `type`.                                                                                                                                            |
| invite.sent                     | object  | The details for events with this `type`.                                                                                                                                            |
| invite.accepted                 | object  | The details for events with this `type`.                                                                                                                                            |
| invite.deleted                  | object  | The details for events with this `type`.                                                                                                                                            |
| ip_allowlist.created            | object  | The details for events with this `type`.                                                                                                                                            |
| ip_allowlist.updated            | object  | The details for events with this `type`.                                                                                                                                            |
| ip_allowlist.deleted            | object  | The details for events with this `type`.                                                                                                                                            |
| ip_allowlist.config.activated   | object  | The details for events with this `type`.                                                                                                                                            |
| ip_allowlist.config.deactivated | object  | The details for events with this `type`.                                                                                                                                            |
| login.succeeded                 | object  | This event has no additional fields beyond the standard audit log attributes.                                                                                                       |
| login.failed                    | object  | The details for events with this `type`.                                                                                                                                            |
| logout.succeeded                | object  | This event has no additional fields beyond the standard audit log attributes.                                                                                                       |
| logout.failed                   | object  | The details for events with this `type`.                                                                                                                                            |
| organization.updated            | object  | The details for events with this `type`.                                                                                                                                            |
| project.created                 | object  | The details for events with this `type`.                                                                                                                                            |
| project.updated                 | object  | The details for events with this `type`.                                                                                                                                            |
| project.archived                | object  | The details for events with this `type`.                                                                                                                                            |
| project.deleted                 | object  | The details for events with this `type`.                                                                                                                                            |
| rate_limit.updated              | object  | The details for events with this `type`.                                                                                                                                            |
| rate_limit.deleted              | object  | The details for events with this `type`.                                                                                                                                            |
| role.created                    | object  | The details for events with this `type`.                                                                                                                                            |
| role.updated                    | object  | The details for events with this `type`.                                                                                                                                            |
| role.deleted                    | object  | The details for events with this `type`.                                                                                                                                            |
| role.assignment.created         | object  | The details for events with this `type`.                                                                                                                                            |
| role.assignment.deleted         | object  | The details for events with this `type`.                                                                                                                                            |
| service_account.created         | object  | The details for events with this `type`.                                                                                                                                            |
| service_account.updated         | object  | The details for events with this `type`.                                                                                                                                            |
| service_account.deleted         | object  | The details for events with this `type`.                                                                                                                                            |
| user.added                      | object  | The details for events with this `type`.                                                                                                                                            |
| user.updated                    | object  | The details for events with this `type`.                                                                                                                                            |
| user.deleted                    | object  | The details for events with this `type`.                                                                                                                                            |
| certificate.created             | object  | The details for events with this `type`.                                                                                                                                            |
| certificate.updated             | object  | The details for events with this `type`.                                                                                                                                            |
| certificate.deleted             | object  | The details for events with this `type`.                                                                                                                                            |
| certificates.activated          | object  | The details for events with this `type`.                                                                                                                                            |
| certificates.deactivated        | object  | The details for events with this `type`.                                                                                                                                            |

## AuditLogActor

The actor who performed the audit logged action.

| Field   | Type   | Description                                        |
| ------- | ------ | -------------------------------------------------- |
| type    | string | The type of actor. Is either `session`or`api_key`. |
| session |
| api_key |

## AuditLogActorApiKey

The API Key used to perform the audit logged action.

| Field           | Type   | Description                                                   |
| --------------- | ------ | ------------------------------------------------------------- |
| id              | string | The tracking id of the API key.                               |
| type            | string | The type of API key. Can be either `user`or`service_account`. |
| user            |
| service_account |

## AuditLogActorServiceAccount

The service account that performed the audit logged action.

| Field | Type   | Description             |
| ----- | ------ | ----------------------- |
| id    | string | The service account id. |

## AuditLogActorSession

The session in which the audit logged action was performed.

| Field      | Type   | Description                                         |
| ---------- | ------ | --------------------------------------------------- |
| user       |
| ip_address | string | The IP address from which the action was performed. |

## AuditLogActorUser

The user who performed the audit logged action.

| Field | Type   | Description     |
| ----- | ------ | --------------- |
| id    | string | The user id.    |
| email | string | The user email. |

## AuditLogEventType

The event type.

## AutoChunkingStrategyRequestParam

The default strategy. This strategy currently uses a `max_chunk_size_tokens`of`800`and`chunk_overlap_tokens`of`400`.

| Field | Type   | Description    |
| ----- | ------ | -------------- |
| type  | string | Always `auto`. |

## Batch

| Field    | Type   | Description                                                         |
| -------- | ------ | ------------------------------------------------------------------- |
| id       | string |
| object   | string | The object type, which is always `batch`.                           |
| endpoint | string | The OpenAI API endpoint used by the batch.                          |
| model    | string | Model ID used to process the batch, like `gpt-5-2025-08-07`. OpenAI |
offers a wide range of models with different capabilities, performance
characteristics, and price points. Refer to the [model
guide](<https://platform.openai.com/docs/models>) to browse and compare available models.
 |
| errors | object |
| input_file_id | string | The ID of the input file for the batch. |
| completion_window | string | The time frame within which the batch should be processed. |
| status | string | The current status of the batch. |
| output_file_id | string | The ID of the file containing the outputs of successfully executed requests. |
| error_file_id | string | The ID of the file containing the outputs of requests with errors. |
| created_at | integer | The Unix timestamp (in seconds) for when the batch was created. |
| in_progress_at | integer | The Unix timestamp (in seconds) for when the batch started processing. |
| expires_at | integer | The Unix timestamp (in seconds) for when the batch will expire. |
| finalizing_at | integer | The Unix timestamp (in seconds) for when the batch started finalizing. |
| completed_at | integer | The Unix timestamp (in seconds) for when the batch was completed. |
| failed_at | integer | The Unix timestamp (in seconds) for when the batch failed. |
| expired_at | integer | The Unix timestamp (in seconds) for when the batch expired. |
| cancelling_at | integer | The Unix timestamp (in seconds) for when the batch started cancelling. |
| cancelled_at | integer | The Unix timestamp (in seconds) for when the batch was cancelled. |
| request_counts |
| usage | object | Represents token usage details including input tokens, output tokens, a
breakdown of output tokens, and the total tokens used. Only populated on
batches created after September 7, 2025.
 |
| metadata |

## BatchFileExpirationAfter

The expiration policy for the output and/or error file that are generated for a batch.

| Field   | Type    | Description                                                                                                                                                                     |
| ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anchor  | string  | Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`. Note that the anchor is the file creation time, not the time the batch is created. |
| seconds | integer | The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).                                                     |

## BatchRequestInput

The per-line object of the batch input file

| Field     | Type   | Description                                                                                                                                    |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| custom_id | string | A developer-provided per-request id that will be used to match outputs to inputs. Must be unique for each request in a batch.                  |
| method    | string | The HTTP method to be used for the request. Currently only `POST`is supported.                                                                 |
| url       | string | The OpenAI API relative URL to be used for the request. Currently`/v1/chat/completions`, `/v1/embeddings`, and `/v1/completions`are supported. |

## BatchRequestOutput

The per-line object of the batch output and error files

| Field     | Type   | Description                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------- |
| id        | string |
| custom_id | string | A developer-provided per-request id that will be used to match outputs to inputs. |
| response  |
| error     |

## Certificate

Represents an individual`certificate`uploaded to the organization.

| Field  | Type   | Description      |
| ------ | ------ | ---------------- |
| object | string | The object type. |

- If creating, updating, or getting a specific certificate, the object type is`certificate`.
- If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
- If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.
 |
| id | string | The identifier, which can be referenced in API endpoints |
| name | string | The name of the certificate. |
| created_at | integer | The Unix timestamp (in seconds) of when the certificate was uploaded. |
| certificate_details | object |
| active | boolean | Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate. |

## ChatCompletionAllowedTools

Constrains the tools available to the model to a pre-defined set.

| Field | Type   | Description                                                       |
| ----- | ------ | ----------------------------------------------------------------- |
| mode  | string | Constrains the tools available to the model to a pre-defined set. |

`auto`allows the model to pick from among the allowed tools and generate a
message.`required`requires the model to call one or more of the allowed tools.
 |
| tools | array | A list of tool definitions that the model should be allowed to call.

For the Chat Completions API, the list of tool definitions might look like:```json
[
  { "type": "function", "function": { "name": "get_weather" } },
  { "type": "function", "function": { "name": "get_time" } }
]

```|

## ChatCompletionAllowedToolsChoice

Constrains the tools available to the model to a pre-defined set.

| Field         | Type   | Description                                             |
| ------------- | ------ | ------------------------------------------------------- |
| type          | string | Allowed tool configuration type. Always`allowed_tools`. |
| allowed_tools |

## ChatCompletionDeleted

| Field   | Type    | Description                                     |
| ------- | ------- | ----------------------------------------------- |
| object  | string  | The type of object being deleted.               |
| id      | string  | The ID of the chat completion that was deleted. |
| deleted | boolean | Whether the chat completion was deleted.        |

## ChatCompletionFunctionCallOption

Specifying a particular function via `{"name": "my_function"}`forces the model to call that function.

| Field | Type   | Description                       |
| ----- | ------ | --------------------------------- |
| name  | string | The name of the function to call. |

## ChatCompletionFunctions

| Field       | Type   | Description                                                                                                                   |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| description | string | A description of what the function does, used by the model to choose when and how to call the function.                       |
| name        | string | The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64. |
| parameters  |

## ChatCompletionList

An object representing a list of Chat Completions.

| Field    | Type    | Description                                                    |
| -------- | ------- | -------------------------------------------------------------- |
| object   | string  | The type of this object. It is always set to "list".           |
| data     | array   | An array of chat completion objects.                           |
| first_id | string  | The identifier of the first chat completion in the data array. |
| last_id  | string  | The identifier of the last chat completion in the data array.  |
| has_more | boolean | Indicates whether there are more Chat Completions available.   |

## ChatCompletionMessageCustomToolCall

A call to a custom tool created by the model.

| Field  | Type   | Description                            |
| ------ | ------ | -------------------------------------- |
| id     | string | The ID of the tool call.               |
| type   | string | The type of the tool. Always`custom`.  |
| custom | object | The custom tool that the model called. |

## ChatCompletionMessageList

An object representing a list of chat completion messages.

| Field    | Type    | Description                                                 |
| -------- | ------- | ----------------------------------------------------------- |
| object   | string  | The type of this object. It is always set to "list".        |
| data     | array   | An array of chat completion message objects.                |
| first_id | string  | The identifier of the first chat message in the data array. |
| last_id  | string  | The identifier of the last chat message in the data array.  |
| has_more | boolean | Indicates whether there are more chat messages available.   |

## ChatCompletionMessageToolCall

A call to a function tool created by the model.

| Field    | Type   | Description                                                   |
| -------- | ------ | ------------------------------------------------------------- |
| id       | string | The ID of the tool call.                                      |
| type     | string | The type of the tool. Currently, only `function`is supported. |
| function | object | The function that the model called.                           |

## ChatCompletionMessageToolCallChunk

| Field    | Type    | Description                                                  |
| -------- | ------- | ------------------------------------------------------------ |
| index    | integer |
| id       | string  | The ID of the tool call.                                     |
| type     | string  | The type of the tool. Currently, only`function`is supported. |
| function | object  |

## ChatCompletionMessageToolCalls

The tool calls generated by the model, such as function calls.

## ChatCompletionModalities

## ChatCompletionNamedToolChoice

Specifies a tool the model should use. Use to force the model to call a specific function.

| Field    | Type   | Description                                         |
| -------- | ------ | --------------------------------------------------- |
| type     | string | For function calling, the type is always`function`. |
| function | object |

## ChatCompletionNamedToolChoiceCustom

Specifies a tool the model should use. Use to force the model to call a specific custom tool.

| Field  | Type   | Description                                           |
| ------ | ------ | ----------------------------------------------------- |
| type   | string | For custom tool calling, the type is always `custom`. |
| custom | object |

## ChatCompletionRequestAssistantMessage

Messages sent by the model in response to user messages.

| Field         | Type   | Description                                                                                                                  |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| content       |
| refusal       |
| role          | string | The role of the messages author, in this case `assistant`.                                                                   |
| name          | string | An optional name for the participant. Provides the model information to differentiate between participants of the same role. |
| audio         |
| tool_calls    |
| function_call |

## ChatCompletionRequestAssistantMessageContentPart

## ChatCompletionRequestDeveloperMessage

Developer-provided instructions that the model should follow, regardless of
messages sent by the user. With o1 models and newer, `developer`messages
replace the previous`system`messages.

| Field   | Type                                   | Description                                                                                                                  |
| ------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| content | The contents of the developer message. |
| role    | string                                 | The role of the messages author, in this case`developer`.                                                                    |
| name    | string                                 | An optional name for the participant. Provides the model information to differentiate between participants of the same role. |

## ChatCompletionRequestFunctionMessage

| Field   | Type   | Description                                               |
| ------- | ------ | --------------------------------------------------------- |
| role    | string | The role of the messages author, in this case `function`. |
| content |
| name    | string | The name of the function to call.                         |

## ChatCompletionRequestMessage

## ChatCompletionRequestMessageContentPartAudio

Learn about [audio inputs](https://platform.openai.com/docs/guides/audio).

| Field       | Type   | Description                                         |
| ----------- | ------ | --------------------------------------------------- |
| type        | string | The type of the content part. Always `input_audio`. |
| input_audio | object |

## ChatCompletionRequestMessageContentPartFile

Learn about [file inputs](https://platform.openai.com/docs/guides/text) for text generation.

| Field | Type   | Description                                  |
| ----- | ------ | -------------------------------------------- |
| type  | string | The type of the content part. Always `file`. |
| file  | object |

## ChatCompletionRequestMessageContentPartImage

Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

| Field     | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| type      | string | The type of the content part. |
| image_url | object |

## ChatCompletionRequestMessageContentPartRefusal

| Field   | Type   | Description                                 |
| ------- | ------ | ------------------------------------------- |
| type    | string | The type of the content part.               |
| refusal | string | The refusal message generated by the model. |

## ChatCompletionRequestMessageContentPartText

Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

| Field | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| type  | string | The type of the content part. |
| text  | string | The text content.             |

## ChatCompletionRequestSystemMessage

Developer-provided instructions that the model should follow, regardless of
messages sent by the user. With o1 models and newer, use `developer`messages
for this purpose instead.

| Field   | Type                                | Description                                                                                                                  |
| ------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| content | The contents of the system message. |
| role    | string                              | The role of the messages author, in this case`system`.                                                                       |
| name    | string                              | An optional name for the participant. Provides the model information to differentiate between participants of the same role. |

## ChatCompletionRequestSystemMessageContentPart

## ChatCompletionRequestToolMessage

| Field        | Type                              | Description                                           |
| ------------ | --------------------------------- | ----------------------------------------------------- |
| role         | string                            | The role of the messages author, in this case `tool`. |
| content      | The contents of the tool message. |
| tool_call_id | string                            | Tool call that this message is responding to.         |

## ChatCompletionRequestToolMessageContentPart

## ChatCompletionRequestUserMessage

Messages sent by an end user, containing prompts or additional context
information.

| Field   | Type                              | Description                                                                                                                  |
| ------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| content | The contents of the user message. |
| role    | string                            | The role of the messages author, in this case `user`.                                                                        |
| name    | string                            | An optional name for the participant. Provides the model information to differentiate between participants of the same role. |

## ChatCompletionRequestUserMessageContentPart

## ChatCompletionResponseMessage

A chat completion message generated by the model.

| Field       | Type  | Description                                                     |
| ----------- | ----- | --------------------------------------------------------------- |
| content     |
| refusal     |
| tool_calls  |
| annotations | array | Annotations for the message, when applicable, as when using the |
[web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).
 |
| role | string | The role of the author of this message. |
| function_call | object | Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model. |
| audio |

## ChatCompletionRole

The role of the author of a message

## ChatCompletionStreamOptions

## ChatCompletionStreamResponseDelta

A chat completion delta generated by streamed model responses.

| Field         | Type   | Description                                                                                                                     |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| content       |
| function_call | object | Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model. |
| tool_calls    | array  |
| role          | string | The role of the author of this message.                                                                                         |
| refusal       |

## ChatCompletionTokenLogprob

| Field        | Type   | Description                                                                                                                                                             |
| ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | string | The token.                                                                                                                                                              |
| logprob      | number | The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0`is used to signify that the token is very unlikely.     |
| bytes        |
| top_logprobs | array  | List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested`top_logprobs`returned. |

## ChatCompletionTool

A function tool that can be used to generate a response.

| Field    | Type   | Description                                                  |
| -------- | ------ | ------------------------------------------------------------ |
| type     | string | The type of the tool. Currently, only`function`is supported. |
| function |

## ChatCompletionToolChoiceOption

Controls which (if any) tool is called by the model.`none`means the model will not call any tool and instead generates a message.`auto`means the model can pick between generating a message or calling one or more tools.`required`means the model must call one or more tools.
Specifying a particular tool via`{"type": "function", "function": {"name": "my_function"}}`forces the model to call that tool.`none`is the default when no tools are present.`auto`is the default if tools are present.

## ChunkingStrategyRequestParam

The chunking strategy used to chunk the file(s). If not set, will use the`auto`strategy. Only applicable if`file_ids`is non-empty.

## Click

A click action.

| Field | Type   | Description                                                    |
| ----- | ------ | -------------------------------------------------------------- |
| type  | string | Specifies the event type. For a click action, this property is |
always set to`click`.
 |
| button | string | Indicates which mouse button was pressed during the click. One of `left`, `right`, `wheel`, `back`, or `forward`.
 |
| x | integer | The x-coordinate where the click occurred.
 |
| y | integer | The y-coordinate where the click occurred.
 |

## CodeInterpreterFileOutput

The output of a code interpreter tool call that is a file.

| Field | Type   | Description                                                   |
| ----- | ------ | ------------------------------------------------------------- |
| type  | string | The type of the code interpreter file output. Always `files`. |
| files | array  |

## CodeInterpreterOutputImage

The image output from the code interpreter.

| Field | Type   | Description                                            |
| ----- | ------ | ------------------------------------------------------ |
| type  | string | The type of the output. Always 'image'.                |
| url   | string | The URL of the image output from the code interpreter. |

## CodeInterpreterOutputLogs

The logs output from the code interpreter.

| Field | Type   | Description                                |
| ----- | ------ | ------------------------------------------ |
| type  | string | The type of the output. Always 'logs'.     |
| logs  | string | The logs output from the code interpreter. |

## CodeInterpreterTextOutput

The output of a code interpreter tool call that is text.

| Field | Type   | Description                                                  |
| ----- | ------ | ------------------------------------------------------------ |
| type  | string | The type of the code interpreter text output. Always `logs`. |
| logs  | string | The logs of the code interpreter tool call.                  |

## CodeInterpreterTool

A tool that runs Python code to help generate a response to a prompt.

| Field     | Type                                                                    | Description                                                       |
| --------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| type      | string                                                                  | The type of the code interpreter tool. Always `code_interpreter`. |
| container | The code interpreter container. Can be a container ID or an object that |
specifies uploaded file IDs to make available to your code.
 |

## CodeInterpreterToolAuto

Configuration for a code interpreter container. Optionally specify the IDs
of the files to run the code on.

| Field    | Type   | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| type     | string | Always `auto`.                                                     |
| file_ids | array  | An optional list of uploaded files to make available to your code. |

## CodeInterpreterToolCall

A tool call to run code.

| Field        | Type   | Description                                                                                                                            |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| type         | string | The type of the code interpreter tool call. Always `code_interpreter_call`.                                                            |
| id           | string | The unique ID of the code interpreter tool call.                                                                                       |
| status       | string | The status of the code interpreter tool call. Valid values are `in_progress`, `completed`, `incomplete`, `interpreting`, and `failed`. |
| container_id | string | The ID of the container used to run the code.                                                                                          |
| code         |
| outputs      |

## ComparisonFilter

A filter used to compare a specified attribute key to a given value using a defined comparison operation.

| Field | Type   | Description                                                              |
| ----- | ------ | ------------------------------------------------------------------------ |
| type  | string | Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`. |

- `eq`: equals
- `ne`: not equal
- `gt`: greater than
- `gte`: greater than or equal
- `lt`: less than
- `lte`: less than or equal
 |
| key | string | The key to compare against the value. |
| value | The value to compare against the attribute key; supports string, number, or boolean types. |

## CompleteUploadRequest

| Field    | Type   | Description                                                                                              |
| -------- | ------ | -------------------------------------------------------------------------------------------------------- |
| part_ids | array  | The ordered list of Part IDs.                                                                            |
| md5      | string | The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect. |

## CompletionUsage

Usage statistics for the completion request.

| Field                     | Type    | Description                                                       |
| ------------------------- | ------- | ----------------------------------------------------------------- |
| completion_tokens         | integer | Number of tokens in the generated completion.                     |
| prompt_tokens             | integer | Number of tokens in the prompt.                                   |
| total_tokens              | integer | Total number of tokens used in the request (prompt + completion). |
| completion_tokens_details | object  | Breakdown of tokens used in a completion.                         |
| prompt_tokens_details     | object  | Breakdown of tokens used in the prompt.                           |

## CompoundFilter

Combine multiple filters using `and`or`or`.

| Field   | Type   | Description                                                                     |
| ------- | ------ | ------------------------------------------------------------------------------- |
| type    | string | Type of operation: `and`or`or`.                                                 |
| filters | array  | Array of filters to combine. Items can be `ComparisonFilter`or`CompoundFilter`. |

## ComputerAction

## ComputerScreenshotImage

A computer screenshot image used with the computer use tool.

| Field | Type   | Description                                                           |
| ----- | ------ | --------------------------------------------------------------------- |
| type  | string | Specifies the event type. For a computer screenshot, this property is |
always set to `computer_screenshot`.
 |
| image_url | string | The URL of the screenshot image. |
| file_id | string | The identifier of an uploaded file that contains the screenshot. |

## ComputerToolCall

A tool call to a computer use tool. See the
[computer use guide](https://platform.openai.com/docs/guides/tools-computer-use) for more information.

| Field                 | Type   | Description                                                      |
| --------------------- | ------ | ---------------------------------------------------------------- |
| type                  | string | The type of the computer call. Always `computer_call`.           |
| id                    | string | The unique ID of the computer call.                              |
| call_id               | string | An identifier used when responding to the tool call with output. |
| action                |
| pending_safety_checks | array  | The pending safety checks for the computer call.                 |
| status                | string | The status of the item. One of `in_progress`, `completed`, or    |
`incomplete`. Populated when items are returned via API.
 |

## ComputerToolCallOutput

The output of a computer tool call.

| Field                      | Type   | Description                                                               |
| -------------------------- | ------ | ------------------------------------------------------------------------- |
| type                       | string | The type of the computer tool call output. Always `computer_call_output`. |
| id                         | string | The ID of the computer tool call output.                                  |
| call_id                    | string | The ID of the computer tool call that produced the output.                |
| acknowledged_safety_checks | array  | The safety checks reported by the API that have been acknowledged by the  |
developer.
 |
| output |
| status | string | The status of the message input. One of `in_progress`, `completed`, or
`incomplete`. Populated when input items are returned via API.
 |

## ComputerToolCallOutputResource

## ComputerToolCallSafetyCheck

A pending safety check for the computer call.

| Field   | Type   | Description                             |
| ------- | ------ | --------------------------------------- |
| id      | string | The ID of the pending safety check.     |
| code    | string | The type of the pending safety check.   |
| message | string | Details about the pending safety check. |

## ContainerFileListResource

| Field    | Type                                         | Description                             |
| -------- | -------------------------------------------- | --------------------------------------- |
| object   | The type of object returned, must be 'list'. |
| data     | array                                        | A list of container files.              |
| first_id | string                                       | The ID of the first file in the list.   |
| last_id  | string                                       | The ID of the last file in the list.    |
| has_more | boolean                                      | Whether there are more files available. |

## ContainerFileResource

| Field        | Type    | Description                                            |
| ------------ | ------- | ------------------------------------------------------ |
| id           | string  | Unique identifier for the file.                        |
| object       | string  | The type of this object (`container.file`).            |
| container_id | string  | The container this file belongs to.                    |
| created_at   | integer | Unix timestamp (in seconds) when the file was created. |
| bytes        | integer | Size of the file in bytes.                             |
| path         | string  | Path of the file in the container.                     |
| source       | string  | Source of the file (e.g., `user`, `assistant`).        |

## ContainerListResource

| Field    | Type                                         | Description                                  |
| -------- | -------------------------------------------- | -------------------------------------------- |
| object   | The type of object returned, must be 'list'. |
| data     | array                                        | A list of containers.                        |
| first_id | string                                       | The ID of the first container in the list.   |
| last_id  | string                                       | The ID of the last container in the list.    |
| has_more | boolean                                      | Whether there are more containers available. |

## ContainerResource

| Field         | Type    | Description                                                 |
| ------------- | ------- | ----------------------------------------------------------- |
| id            | string  | Unique identifier for the container.                        |
| object        | string  | The type of this object.                                    |
| name          | string  | Name of the container.                                      |
| created_at    | integer | Unix timestamp (in seconds) when the container was created. |
| status        | string  | Status of the container (e.g., active, deleted).            |
| expires_after | object  | The container will expire after this time period.           |
The anchor is the reference point for the expiration.
The minutes is the number of minutes after the anchor before the container expires.
 |

## Content

Multi-modal input and output contents.

## Conversation

## ConversationItem

A single item within a conversation. The set of possible types are the same as the `output`type of a [Response object](https://platform.openai.com/docs/api-reference/responses/object#responses/object-output).

## ConversationItemList

A list of Conversation items.

| Field    | Type                                        | Description                             |
| -------- | ------------------------------------------- | --------------------------------------- |
| object   | The type of object returned, must be`list`. |
| data     | array                                       | A list of conversation items.           |
| has_more | boolean                                     | Whether there are more items available. |
| first_id | string                                      | The ID of the first item in the list.   |
| last_id  | string                                      | The ID of the last item in the list.    |

## Coordinate

An x/y coordinate pair, e.g. `{ x: 100, y: 200 }`.

| Field | Type    | Description       |
| ----- | ------- | ----------------- |
| x     | integer | The x-coordinate. |
| y     | integer | The y-coordinate. |

## CostsResult

The aggregated costs details of the specific time bucket.

| Field      | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| object     | string |
| amount     | object | The monetary value in its associated currency. |
| line_item  |
| project_id |

## CreateAssistantRequest

| Field            | Type                                                                                                                                                                                                                                                      | Description                                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| model            | ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them. |
| name             |
| description      |
| instructions     |
| reasoning_effort |
| tools            | array                                                                                                                                                                                                                                                     | A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`. |
| tool_resources   |
| metadata         |
| temperature      |
| top_p            |
| response_format  |

## CreateChatCompletionRequest

## CreateChatCompletionResponse

Represents a chat completion response returned by model, based on the provided input.

| Field              | Type    | Description                                                                      |
| ------------------ | ------- | -------------------------------------------------------------------------------- |
| id                 | string  | A unique identifier for the chat completion.                                     |
| choices            | array   | A list of chat completion choices. Can be more than one if `n`is greater than 1. |
| created            | integer | The Unix timestamp (in seconds) of when the chat completion was created.         |
| model              | string  | The model used for the chat completion.                                          |
| service_tier       |
| system_fingerprint | string  | This fingerprint represents the backend configuration that the model runs with.  |

Can be used in conjunction with the`seed`request parameter to understand when backend changes have been made that might impact determinism.
 |
| object | string | The object type, which is always`chat.completion`. |
| usage |

## CreateChatCompletionStreamResponse

Represents a streamed chunk of a chat completion response returned
by the model, based on the provided input.
[Learn more](https://platform.openai.com/docs/guides/streaming-responses).

| Field   | Type   | Description                                                                                                              |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| id      | string | A unique identifier for the chat completion. Each chunk has the same ID.                                                 |
| choices | array  | A list of chat completion choices. Can contain more than one elements if `n`is greater than 1. Can also be empty for the |
last chunk if you set`stream_options: {"include_usage": true}`.
 |
| created | integer | The Unix timestamp (in seconds) of when the chat completion was created. Each chunk has the same timestamp. |
| model | string | The model to generate the completion. |
| service_tier |
| system_fingerprint | string | This fingerprint represents the backend configuration that the model runs with.
Can be used in conjunction with the `seed`request parameter to understand when backend changes have been made that might impact determinism.
 |
| object | string | The object type, which is always`chat.completion.chunk`. |
| usage |  | An optional field that will only be present when you set
`stream_options: {"include_usage": true}`in your request. When present, it
contains a null value **except for the last chunk** which contains the
token usage statistics for the entire request.

**NOTE:** If the stream is interrupted or cancelled, you may not
receive the final usage chunk which contains the total token usage for
the request.
 |

## CreateCompletionRequest

| Field  | Type                                                                                                                                                                                                                                                      | Description |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| model  | ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them. |
| prompt | The prompt(s) to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays.                                                                                                                              |

Note that <|endoftext|> is the document separator that the model sees during training, so if a prompt is not specified the model will generate as if from the beginning of a new document.
 |
| best_of | integer | Generates`best_of`completions server-side and returns the "best" (the one with the highest log probability per token). Results cannot be streamed.

When used with`n`, `best_of`controls the number of candidate completions and`n`specifies how many to return –`best_of`must be greater than`n`.

**Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens`and`stop`.
 |
| echo | boolean | Echo back the prompt in addition to the completion
 |
| frequency_penalty | number | Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.

[See more information about frequency and presence penalties.](https://platform.openai.com/docs/guides/text-generation)
 |
| logit_bias | object | Modify the likelihood of specified tokens appearing in the completion.

Accepts a JSON object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.

As an example, you can pass `{"50256": -100}`to prevent the <|endoftext|> token from being generated.
 |
| logprobs | integer | Include the log probabilities on the`logprobs`most likely output tokens, as well the chosen tokens. For example, if`logprobs`is 5, the API will return a list of the 5 most likely tokens. The API will always return the`logprob`of the sampled token, so there may be up to`logprobs+1`elements in the response.

The maximum value for`logprobs`is 5.
 |
| max_tokens | integer | The maximum number of [tokens](/tokenizer) that can be generated in the completion.

The token count of your prompt plus`max_tokens`cannot exceed the model's context length. [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken) for counting tokens.
 |
| n | integer | How many completions to generate for each prompt.

**Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for`max_tokens`and`stop`.
 |
| presence_penalty | number | Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.

[See more information about frequency and presence penalties.](https://platform.openai.com/docs/guides/text-generation)
 |
| seed | integer | If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed`and parameters should return the same result.

Determinism is not guaranteed, and you should refer to the`system_fingerprint`response parameter to monitor changes in the backend.
 |
| stop |
| stream | boolean | Whether to stream back partial progress. If set, tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a`data: [DONE]`message. [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
 |
| stream_options |
| suffix | string | The suffix that comes after a completion of inserted text.

This parameter is only supported for`gpt-3.5-turbo-instruct`.
 |
| temperature | number | What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

We generally recommend altering this or `top_p`but not both.
 |
| top_p | number | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

We generally recommend altering this or`temperature`but not both.
 |
| user | string | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#end-user-ids).
 |

## CreateCompletionResponse

Represents a completion response from the API. Note: both the streamed and non-streamed response objects share the same shape (unlike the chat endpoint).

| Field              | Type    | Description                                                                     |
| ------------------ | ------- | ------------------------------------------------------------------------------- |
| id                 | string  | A unique identifier for the completion.                                         |
| choices            | array   | The list of completion choices the model generated for the input prompt.        |
| created            | integer | The Unix timestamp (in seconds) of when the completion was created.             |
| model              | string  | The model used for completion.                                                  |
| system_fingerprint | string  | This fingerprint represents the backend configuration that the model runs with. |

Can be used in conjunction with the`seed`request parameter to understand when backend changes have been made that might impact determinism.
 |
| object | string | The object type, which is always "text_completion" |
| usage |

## CreateContainerBody

| Field         | Type   | Description                                                         |
| ------------- | ------ | ------------------------------------------------------------------- |
| name          | string | Name of the container to create.                                    |
| file_ids      | array  | IDs of files to copy to the container.                              |
| expires_after | object | Container expiration time in seconds relative to the 'anchor' time. |

## CreateContainerFileBody

| Field   | Type   | Description                                     |
| ------- | ------ | ----------------------------------------------- |
| file_id | string | Name of the file to create.                     |
| file    | string | The File object (not file name) to be uploaded. |

## CreateEmbeddingRequest

| Field           | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Description                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input           | Input text to embed, encoded as a string or array of tokens. To embed multiple inputs in a single request, pass an array of strings or array of token arrays. The input must not exceed the max input tokens for the model (8192 tokens for all embedding models), cannot be an empty string, and any array must be 2048 dimensions or less. [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken) for counting tokens. In addition to the per-input token limit, all embedding  models enforce a maximum of 300,000 tokens summed across all inputs in a  single request. |
| model           | ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.                                                                                                                                                                                                                                                                                                                                                          |
| encoding_format | string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | The format to return the embeddings in. Can be either`float` or [`base64`](https://pypi.org/project/pybase64/).                                                                              |
| dimensions      | integer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | The number of dimensions the resulting output embeddings should have. Only supported in `text-embedding-3`and later models.                                                                  |
| user            | string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#end-user-ids). |

## CreateEmbeddingResponse

| Field  | Type   | Description                                           |
| ------ | ------ | ----------------------------------------------------- |
| data   | array  | The list of embeddings generated by the model.        |
| model  | string | The name of the model used to generate the embedding. |
| object | string | The object type, which is always "list".              |
| usage  | object | The usage information for the request.                |

## CreateEvalCompletionsRunDataSource

A CompletionsRunDataSource object describing a model sampling configuration.

| Field           | Type                                                                                                                                                                                                                                            | Description                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| type            | string                                                                                                                                                                                                                                          | The type of run data source. Always`completions`.                         |
| input_messages  | Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item`namespace. |
| sampling_params | object                                                                                                                                                                                                                                          |
| model           | string                                                                                                                                                                                                                                          | The name of the model to use for generating completions (e.g. "o3-mini"). |
| source          | Determines what populates the`item`namespace in this run's data source.                                                                                                                                                                         |

## CreateEvalCustomDataSourceConfig

A CustomDataSourceConfig object that defines the schema for the data source used for the evaluation runs.
This schema is used to define the shape of the data that will be:

- Used to define your testing criteria and
- What data is required when creating a run

| Field                 | Type    | Description                                                                                                               |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| type                  | string  | The type of data source. Always`custom`.                                                                                  |
| item_schema           | object  | The json schema for each row in the data source.                                                                          |
| include_sample_schema | boolean | Whether the eval should expect you to populate the sample namespace (ie, by generating responses off of your data source) |

## CreateEvalItem

A chat message that makes up the prompt or context. May include variable references to the `item`namespace, ie {{item.name}}.

## CreateEvalJsonlRunDataSource

A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

| Field  | Type                                                              | Description                             |
| ------ | ----------------------------------------------------------------- | --------------------------------------- |
| type   | string                                                            | The type of data source. Always`jsonl`. |
| source | Determines what populates the `item`namespace in the data source. |

## CreateEvalLabelModelGrader

A LabelModelGrader object which uses a model to assign labels to each item
in the evaluation.

| Field          | Type   | Description                                                                                                                      |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| type           | string | The object type, which is always`label_model`.                                                                                   |
| name           | string | The name of the grader.                                                                                                          |
| model          | string | The model to use for the evaluation. Must support structured outputs.                                                            |
| input          | array  | A list of chat messages forming the prompt or context. May include variable references to the `item`namespace, ie {{item.name}}. |
| labels         | array  | The labels to classify to each item in the evaluation.                                                                           |
| passing_labels | array  | The labels that indicate a passing result. Must be a subset of labels.                                                           |

## CreateEvalLogsDataSourceConfig

A data source config which specifies the metadata property of your logs query.
This is usually metadata like`usecase=chatbot`or`prompt-version=v2`, etc.

| Field    | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| type     | string | The type of data source. Always `logs`.    |
| metadata | object | Metadata filters for the logs data source. |

## CreateEvalRequest

| Field              | Type   | Description                                                                                                                                                                                                                                                        |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name               | string | The name of the evaluation.                                                                                                                                                                                                                                        |
| metadata           |
| data_source_config | object | The configuration for the data source used for the evaluation runs. Dictates the schema of the data used in the evaluation.                                                                                                                                        |
| testing_criteria   | array  | A list of graders for all eval runs in this group. Graders can reference variables in the data source using double curly braces notation, like `{{item.variable_name}}`. To reference the model's output, use the `sample`namespace (ie,`{{sample.output_text}}`). |

## CreateEvalResponsesRunDataSource

A ResponsesRunDataSource object describing a model sampling configuration.

| Field           | Type                                                                                                                                                                                                                                            | Description                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| type            | string                                                                                                                                                                                                                                          | The type of run data source. Always `responses`.                          |
| input_messages  | Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item`namespace. |
| sampling_params | object                                                                                                                                                                                                                                          |
| model           | string                                                                                                                                                                                                                                          | The name of the model to use for generating completions (e.g. "o3-mini"). |
| source          | Determines what populates the`item`namespace in this run's data source.                                                                                                                                                                         |

## CreateEvalRunRequest

| Field       | Type   | Description                          |
| ----------- | ------ | ------------------------------------ |
| name        | string | The name of the run.                 |
| metadata    |
| data_source | object | Details about the run's data source. |

## CreateEvalStoredCompletionsDataSourceConfig

Deprecated in favor of LogsDataSourceConfig.

| Field    | Type   | Description                                              |
| -------- | ------ | -------------------------------------------------------- |
| type     | string | The type of data source. Always`stored_completions`.     |
| metadata | object | Metadata filters for the stored completions data source. |

## CreateFileRequest

| Field         | Type   | Description                                     |
| ------------- | ------ | ----------------------------------------------- |
| file          | string | The File object (not file name) to be uploaded. |
| purpose       |
| expires_after |

## CreateFineTuningCheckpointPermissionRequest

| Field       | Type  | Description                                 |
| ----------- | ----- | ------------------------------------------- |
| project_ids | array | The project identifiers to grant access to. |

## CreateFineTuningJobRequest

| Field | Type                                                          | Description |
| ----- | ------------------------------------------------------------- | ----------- |
| model | The name of the model to fine-tune. You can select one of the |
[supported models](https://platform.openai.com/docs/guides/fine-tuning#which-models-can-be-fine-tuned).
 |
| training_file | string | The ID of an uploaded file that contains training data.

See [upload file](https://platform.openai.com/docs/api-reference/files/create) for how to upload a file.

Your dataset must be formatted as a JSONL file. Additionally, you must upload your file with the purpose `fine-tune`.

The contents of the file should differ depending on if the model uses the [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input), [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input) format, or if the fine-tuning method uses the [preference](https://platform.openai.com/docs/api-reference/fine-tuning/preference-input) format.

See the [fine-tuning guide](https://platform.openai.com/docs/guides/model-optimization) for more details.
 |
| hyperparameters | object | The hyperparameters used for the fine-tuning job.
This value is now deprecated in favor of `method`, and should be passed in under the `method`parameter.
 |
| suffix | string | A string of up to 64 characters that will be added to your fine-tuned model name.

For example, a`suffix`of "custom-model-name" would produce a model name like`ft:gpt-4o-mini:openai:custom-model-name:7p4lURel`.
 |
| validation_file | string | The ID of an uploaded file that contains validation data.

If you provide this file, the data is used to generate validation
metrics periodically during fine-tuning. These metrics can be viewed in
the fine-tuning results file.
The same data should not be present in both train and validation files.

Your dataset must be formatted as a JSONL file. You must upload your file with the purpose `fine-tune`.

See the [fine-tuning guide](https://platform.openai.com/docs/guides/model-optimization) for more details.
 |
| integrations | array | A list of integrations to enable for your fine-tuning job. |
| seed | integer | The seed controls the reproducibility of the job. Passing in the same seed and job parameters should produce the same results, but may differ in rare cases.
If a seed is not specified, one will be generated for you.
 |
| method |
| metadata |

## CreateImageEditRequest

| Field | Type                                                                        | Description |
| ----- | --------------------------------------------------------------------------- | ----------- |
| image | The image(s) to edit. Must be a supported image file or an array of images. |

For `gpt-image-1`, each image should be a `png`, `webp`, or `jpg`file less
than 50MB. You can provide up to 16 images.

For`dall-e-2`, you can only provide one image, and it should be a square
`png`file less than 4MB.
 |
| prompt | string | A text description of the desired image(s). The maximum length is 1000 characters for`dall-e-2`, and 32000 characters for `gpt-image-1`. |
| mask | string | An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where `image`should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as`image`. |
| background | string | Allows to set transparency for the background of the generated image(s).
This parameter is only supported for `gpt-image-1`. Must be one of
`transparent`, `opaque`or`auto`(default value). When`auto`is used, the
model will automatically determine the best background for the image.

If`transparent`, the output format needs to support transparency, so it
should be set to either `png`(default value) or`webp`.
 |
| model | The model to use for image generation. Only `dall-e-2`and`gpt-image-1`are supported. Defaults to`dall-e-2`unless a parameter specific to`gpt-image-1`is used. |
| n | integer | The number of images to generate. Must be between 1 and 10. |
| size | string | The size of the generated images. Must be one of`1024x1024`, `1536x1024`(landscape),`1024x1536`(portrait), or`auto`(default value) for`gpt-image-1`, and one of `256x256`, `512x512`, or `1024x1024`for`dall-e-2`. |
| response_format | string | The format in which the generated images are returned. Must be one of `url`or`b64_json`. URLs are only valid for 60 minutes after the image has been generated. This parameter is only supported for `dall-e-2`, as `gpt-image-1`will always return base64-encoded images. |
| output_format | string | The format in which the generated images are returned. This parameter is
only supported for`gpt-image-1`. Must be one of `png`, `jpeg`, or `webp`.
The default value is `png`.
 |
| output_compression | integer | The compression level (0-100%) for the generated images. This parameter
is only supported for `gpt-image-1`with the`webp`or`jpeg`output
formats, and defaults to 100.
 |
| user | string | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#end-user-ids).
 |
| input_fidelity |
| stream | boolean | Edit the image in streaming mode. Defaults to`false`. See the
[Image generation guide](https://platform.openai.com/docs/guides/image-generation) for more information.
 |
| partial_images |
| quality | string | The quality of the image that will be generated. `high`, `medium`and`low`are only supported for`gpt-image-1`. `dall-e-2`only supports`standard`quality. Defaults to`auto`.
 |

## CreateImageRequest

| Field   | Type                                                                                                                                                              | Description                                                                                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prompt  | string                                                                                                                                                            | A text description of the desired image(s). The maximum length is 32000 characters for `gpt-image-1`, 1000 characters for `dall-e-2`and 4000 characters for`dall-e-3`. |
| model   | The model to use for image generation. One of `dall-e-2`, `dall-e-3`, or `gpt-image-1`. Defaults to `dall-e-2`unless a parameter specific to`gpt-image-1`is used. |
| n       | integer                                                                                                                                                           | The number of images to generate. Must be between 1 and 10. For`dall-e-3`, only `n=1`is supported.                                                                     |
| quality | string                                                                                                                                                            | The quality of the image that will be generated.                                                                                                                       |

-`auto`(default value) will automatically select the best quality for the given model.
-`high`, `medium`and`low`are supported for`gpt-image-1`.
- `hd`and`standard`are supported for`dall-e-3`.
- `standard`is the only option for`dall-e-2`.
 |
| response_format | string | The format in which generated images with `dall-e-2`and`dall-e-3`are returned. Must be one of`url`or`b64_json`. URLs are only valid for 60 minutes after the image has been generated. This parameter isn't supported for `gpt-image-1`which will always return base64-encoded images. |
| output_format | string | The format in which the generated images are returned. This parameter is only supported for`gpt-image-1`. Must be one of `png`, `jpeg`, or `webp`. |
| output_compression | integer | The compression level (0-100%) for the generated images. This parameter is only supported for `gpt-image-1`with the`webp`or`jpeg`output formats, and defaults to 100. |
| stream | boolean | Generate the image in streaming mode. Defaults to`false`. See the
[Image generation guide](https://platform.openai.com/docs/guides/image-generation) for more information.
This parameter is only supported for `gpt-image-1`.
 |
| partial_images |
| size | string | The size of the generated images. Must be one of `1024x1024`, `1536x1024`(landscape),`1024x1536`(portrait), or`auto`(default value) for`gpt-image-1`, one of `256x256`, `512x512`, or `1024x1024`for`dall-e-2`, and one of `1024x1024`, `1792x1024`, or `1024x1792`for`dall-e-3`. |
| moderation | string | Control the content-moderation level for images generated by `gpt-image-1`. Must be either `low`for less restrictive filtering or`auto`(default value). |
| background | string | Allows to set transparency for the background of the generated image(s).
This parameter is only supported for`gpt-image-1`. Must be one of
`transparent`, `opaque`or`auto`(default value). When`auto`is used, the
model will automatically determine the best background for the image.

If`transparent`, the output format needs to support transparency, so it
should be set to either `png`(default value) or`webp`.
 |
| style | string | The style of the generated images. This parameter is only supported for `dall-e-3`. Must be one of `vivid`or`natural`. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images. |
| user | string | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#end-user-ids).
 |

## CreateImageVariationRequest

| Field           | Type                                                                             | Description                                                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| image           | string                                                                           | The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.                                                                                     |
| model           | The model to use for image generation. Only `dall-e-2`is supported at this time. |
| n               | integer                                                                          | The number of images to generate. Must be between 1 and 10.                                                                                                                                  |
| response_format | string                                                                           | The format in which the generated images are returned. Must be one of`url`or`b64_json`. URLs are only valid for 60 minutes after the image has been generated.                               |
| size            | string                                                                           | The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.                                                                                                       |
| user            | string                                                                           | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#end-user-ids). |

## CreateMessageRequest

| Field | Type   | Description                                                                  |
| ----- | ------ | ---------------------------------------------------------------------------- |
| role  | string | The role of the entity that is creating the message. Allowed values include: |

- `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
- `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.
 |
| content |
| attachments |
| metadata |

## CreateModelResponseProperties

## CreateModerationRequest

| Field | Type                                                                           | Description |
| ----- | ------------------------------------------------------------------------------ | ----------- |
| input | Input (or inputs) to classify. Can be a single string, an array of strings, or |
an array of multi-modal input objects similar to other models.
 |
| model |  | The content moderation model you would like to use. Learn more in
[the moderation guide](https://platform.openai.com/docs/guides/moderation), and learn about
available models [here](https://platform.openai.com/docs/models#moderation).
 |

## CreateModerationResponse

Represents if a given text input is potentially harmful.

| Field   | Type   | Description                                        |
| ------- | ------ | -------------------------------------------------- |
| id      | string | The unique identifier for the moderation request.  |
| model   | string | The model used to generate the moderation results. |
| results | array  | A list of moderation objects.                      |

## CreateResponse

## CreateRunRequest

| Field                   | Type                                                                                                                                                                                                                                                              | Description                                                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assistant_id            | string                                                                                                                                                                                                                                                            | The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to execute this run.                                                                                                                            |
| model                   | The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used. |
| reasoning_effort        |
| instructions            | string                                                                                                                                                                                                                                                            | Overrides the [instructions](https://platform.openai.com/docs/api-reference/assistants/createAssistant) of the assistant. This is useful for modifying the behavior on a per-run basis.                                                     |
| additional_instructions | string                                                                                                                                                                                                                                                            | Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.                                                             |
| additional_messages     | array                                                                                                                                                                                                                                                             | Adds additional messages to the thread before creating the run.                                                                                                                                                                             |
| tools                   | array                                                                                                                                                                                                                                                             | Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.                                                                                                                        |
| metadata                |
| temperature             | number                                                                                                                                                                                                                                                            | What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.                                                        |
| top_p                   | number                                                                                                                                                                                                                                                            | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. |

We generally recommend altering this or temperature but not both.
 |
| stream | boolean | If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]`message.
 |
| max_prompt_tokens | integer | The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status`incomplete`. See `incomplete_details`for more info.
 |
| max_completion_tokens | integer | The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status`incomplete`. See `incomplete_details`for more info.
 |
| truncation_strategy |
| tool_choice |
| parallel_tool_calls |
| response_format |

## CreateSpeechRequest

| Field           | Type                                                                                                                                                                                                                                                                                                           | Description                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| model           | One of the available [TTS models](https://platform.openai.com/docs/models#tts):`tts-1`, `tts-1-hd`or`gpt-4o-mini-tts`.                                                                                                                                                                                         |
| input           | string                                                                                                                                                                                                                                                                                                         | The text to generate audio for. The maximum length is 4096 characters.                                                 |
| instructions    | string                                                                                                                                                                                                                                                                                                         | Control the voice of your generated audio with additional instructions. Does not work with `tts-1`or`tts-1-hd`.        |
| voice           | The voice to use when generating the audio. Supported voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, and `verse`. Previews of the voices are available in the [Text to speech guide](https://platform.openai.com/docs/guides/text-to-speech#voice-options). |
| response_format | string                                                                                                                                                                                                                                                                                                         | The format to audio in. Supported formats are `mp3`, `opus`, `aac`, `flac`, `wav`, and `pcm`.                          |
| speed           | number                                                                                                                                                                                                                                                                                                         | The speed of the generated audio. Select a value from `0.25`to`4.0`. `1.0`is the default.                              |
| stream_format   | string                                                                                                                                                                                                                                                                                                         | The format to stream the audio in. Supported formats are`sse`and`audio`. `sse`is not supported for`tts-1`or`tts-1-hd`. |

## CreateSpeechResponseStreamEvent

## CreateThreadAndRunRequest

| Field          | Type                                                                                                                                                                                                                                                              | Description                                                                                                                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assistant_id   | string                                                                                                                                                                                                                                                            | The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to execute this run.                                                                                                                                |
| thread         |
| model          | The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used. |
| instructions   | string                                                                                                                                                                                                                                                            | Override the default system message of the assistant. This is useful for modifying the behavior on a per-run basis.                                                                                                                             |
| tools          | array                                                                                                                                                                                                                                                             | Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.                                                                                                                            |
| tool_resources | object                                                                                                                                                                                                                                                            | A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter`tool requires a list of file IDs, while the`file_search`tool requires a list of vector store IDs. |
| metadata       |
| temperature    | number                                                                                                                                                                                                                                                            | What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.                                                            |
| top_p          | number                                                                                                                                                                                                                                                            | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.     |

We generally recommend altering this or temperature but not both.
 |
| stream | boolean | If`true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]`message.
 |
| max_prompt_tokens | integer | The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status`incomplete`. See `incomplete_details`for more info.
 |
| max_completion_tokens | integer | The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status`incomplete`. See `incomplete_details`for more info.
 |
| truncation_strategy |
| tool_choice |
| parallel_tool_calls |
| response_format |

## CreateThreadRequest

Options to create a new thread. If no thread is provided when running a
request, an empty thread will be created.

| Field          | Type  | Description                                                                                             |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------- |
| messages       | array | A list of [messages](https://platform.openai.com/docs/api-reference/messages) to start the thread with. |
| tool_resources |
| metadata       |

## CreateTranscriptionRequest

| Field                   | Type                                                                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file                    | string                                                                                                                                                       | The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.                                                                                                                                                                                                                         |
| model                   | ID of the model to use. The options are`gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `whisper-1`(which is powered by our open source Whisper V2 model). |
| language                | string                                                                                                                                                       | The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g.`en`) format will improve accuracy and latency.                                                                                                                                                                  |
| prompt                  | string                                                                                                                                                       | An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://platform.openai.com/docs/guides/speech-to-text#prompting) should match the audio language.                                                                                                                                                         |
| response_format         |
| temperature             | number                                                                                                                                                       | The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit. |
| stream                  |
| chunking_strategy       |
| timestamp_granularities | array                                                                                                                                                        | The timestamp granularities to populate for this transcription. `response_format`must be set`verbose_json`to use timestamp granularities. Either or both of these options are supported:`word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.                      |
| include                 | array                                                                                                                                                        | Additional information to include in the transcription response.                                                                                                                                                                                                                                                                                          |
`logprobs`will return the log probabilities of the tokens in the
response to understand the model's confidence in the transcription.`logprobs`only works with response_format set to`json`and only with
the models`gpt-4o-transcribe`and`gpt-4o-mini-transcribe`.
 |

## CreateTranscriptionResponseJson

Represents a transcription response returned by model, based on the provided input.

| Field    | Type   | Description                                                                                                                                                                      |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text     | string | The transcribed text.                                                                                                                                                            |
| logprobs | array  | The log probabilities of the tokens in the transcription. Only returned with the models `gpt-4o-transcribe`and`gpt-4o-mini-transcribe`if`logprobs`is added to the`include`array. |
| usage    | object | Token usage statistics for the request.                                                                                                                                          |

## CreateTranscriptionResponseStreamEvent

## CreateTranscriptionResponseVerboseJson

Represents a verbose json transcription response returned by model, based on the provided input.

| Field    | Type   | Description                                                       |
| -------- | ------ | ----------------------------------------------------------------- |
| language | string | The language of the input audio.                                  |
| duration | number | The duration of the input audio.                                  |
| text     | string | The transcribed text.                                             |
| words    | array  | Extracted words and their corresponding timestamps.               |
| segments | array  | Segments of the transcribed text and their corresponding details. |
| usage    |

## CreateTranslationRequest

| Field           | Type                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file            | string                                                                                                                | The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.                                                                                                                                                                                                                             |
| model           | ID of the model to use. Only`whisper-1`(which is powered by our open source Whisper V2 model) is currently available. |
| prompt          | string                                                                                                                | An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://platform.openai.com/docs/guides/speech-to-text#prompting) should be in English.                                                                                                                                                                    |
| response_format | string                                                                                                                | The format of the output, in one of these options:`json`, `text`, `srt`, `verbose_json`, or `vtt`.                                                                                                                                                                                                                                                        |
| temperature     | number                                                                                                                | The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit. |

## CreateTranslationResponseJson

| Field | Type   | Description |
| ----- | ------ | ----------- |
| text  | string |

## CreateTranslationResponseVerboseJson

| Field    | Type   | Description                                                      |
| -------- | ------ | ---------------------------------------------------------------- |
| language | string | The language of the output translation (always `english`).       |
| duration | number | The duration of the input audio.                                 |
| text     | string | The translated text.                                             |
| segments | array  | Segments of the translated text and their corresponding details. |

## CreateUploadRequest

| Field    | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| filename | string | The name of the file to upload.            |
| purpose  | string | The intended purpose of the uploaded file. |

See the [documentation on File purposes](https://platform.openai.com/docs/api-reference/files/create#files-create-purpose).
 |
| bytes | integer | The number of bytes in the file you are uploading.
 |
| mime_type | string | The MIME type of the file.

This must fall within the supported MIME types for your file purpose. See the supported MIME types for assistants and vision.
 |
| expires_after |

## CreateVectorStoreFileBatchRequest

| Field             | Type  | Description                                                                                                                                                            |
| ----------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file_ids          | array | A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that the vector store should use. Useful for tools like `file_search`that can access files. |
| chunking_strategy |
| attributes        |

## CreateVectorStoreFileRequest

| Field             | Type   | Description                                                                                                                                                  |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| file_id           | string | A [File](https://platform.openai.com/docs/api-reference/files) ID that the vector store should use. Useful for tools like`file_search`that can access files. |
| chunking_strategy |
| attributes        |

## CreateVectorStoreRequest

| Field             | Type   | Description                                                                                                                                                           |
| ----------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file_ids          | array  | A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that the vector store should use. Useful for tools like`file_search`that can access files. |
| name              | string | The name of the vector store.                                                                                                                                         |
| expires_after     |
| chunking_strategy |
| metadata          |

## CustomTool

A custom tool that processes input using a specified format. Learn more about
[custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools).

| Field       | Type                                                                 | Description                                                            |
| ----------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| type        | string                                                               | The type of the custom tool. Always`custom`.                           |
| name        | string                                                               | The name of the custom tool, used to identify it in tool calls.        |
| description | string                                                               | Optional description of the custom tool, used to provide more context. |
| format      | The input format for the custom tool. Default is unconstrained text. |

## CustomToolCall

A call to a custom tool created by the model.

| Field   | Type   | Description                                                            |
| ------- | ------ | ---------------------------------------------------------------------- |
| type    | string | The type of the custom tool call. Always `custom_tool_call`.           |
| id      | string | The unique ID of the custom tool call in the OpenAI platform.          |
| call_id | string | An identifier used to map this custom tool call to a tool call output. |
| name    | string | The name of the custom tool being called.                              |
| input   | string | The input for the custom tool call generated by the model.             |

## CustomToolCallOutput

The output of a custom tool call from your code, being sent back to the model.

| Field   | Type                                                         | Description                                                                  |
| ------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| type    | string                                                       | The type of the custom tool call output. Always `custom_tool_call_output`.   |
| id      | string                                                       | The unique ID of the custom tool call output in the OpenAI platform.         |
| call_id | string                                                       | The call ID, used to map this custom tool call output to a custom tool call. |
| output  | The output from the custom tool call generated by your code. |
Can be a string or an list of output content.
 |

## CustomToolChatCompletions

A custom tool that processes input using a specified format.

| Field  | Type   | Description                                   |
| ------ | ------ | --------------------------------------------- |
| type   | string | The type of the custom tool. Always `custom`. |
| custom | object | Properties of the custom tool.                |

## DeleteAssistantResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| id      | string  |
| deleted | boolean |
| object  | string  |

## DeleteCertificateResponse

| Field  | Type                                            | Description                                 |
| ------ | ----------------------------------------------- | ------------------------------------------- |
| object | The object type, must be `certificate.deleted`. |
| id     | string                                          | The ID of the certificate that was deleted. |

## DeleteFileResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| id      | string  |
| object  | string  |
| deleted | boolean |

## DeleteFineTuningCheckpointPermissionResponse

| Field   | Type    | Description                                                                  |
| ------- | ------- | ---------------------------------------------------------------------------- |
| id      | string  | The ID of the fine-tuned model checkpoint permission that was deleted.       |
| object  | string  | The object type, which is always "checkpoint.permission".                    |
| deleted | boolean | Whether the fine-tuned model checkpoint permission was successfully deleted. |

## DeleteMessageResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| id      | string  |
| deleted | boolean |
| object  | string  |

## DeleteModelResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| id      | string  |
| deleted | boolean |
| object  | string  |

## DeleteThreadResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| id      | string  |
| deleted | boolean |
| object  | string  |

## DeleteVectorStoreFileResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| id      | string  |
| deleted | boolean |
| object  | string  |

## DeleteVectorStoreResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| id      | string  |
| deleted | boolean |
| object  | string  |

## DeletedConversation

## DoneEvent

Occurs when a stream ends.

| Field | Type   | Description |
| ----- | ------ | ----------- |
| event | string |
| data  | string |

## DoubleClick

A double click action.

| Field | Type   | Description                                                           |
| ----- | ------ | --------------------------------------------------------------------- |
| type  | string | Specifies the event type. For a double click action, this property is |
always set to `double_click`.
 |
| x | integer | The x-coordinate where the double click occurred.
 |
| y | integer | The y-coordinate where the double click occurred.
 |

## Drag

A drag action.

| Field | Type   | Description                                                   |
| ----- | ------ | ------------------------------------------------------------- |
| type  | string | Specifies the event type. For a drag action, this property is |
always set to `drag`.
 |
| path | array | An array of coordinates representing the path of the drag action. Coordinates will appear as an array
of objects, eg

```[
  { x: 100, y: 200 },
  { x: 200, y: 300 }
]```|

## EasyInputMessage

A message input to the model with a role indicating instruction following
hierarchy. Instructions given with the`developer`or`system`role take
precedence over instructions given with the`user`role. Messages with the`assistant`role are presumed to have been generated by the model in previous
interactions.

| Field | Type   | Description                                                            |
| ----- | ------ | ---------------------------------------------------------------------- |
| role  | string | The role of the message input. One of`user`, `assistant`, `system`, or |
`developer`.
 |
| content |  | Text, image, or audio input to the model, used to generate a response.
Can also contain previous assistant responses.
 |
| type | string | The type of the message input. Always `message`.
 |

## Embedding

Represents an embedding vector returned by embedding endpoint.

| Field     | Type    | Description                                                                                                                                                                        |
| --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| index     | integer | The index of the embedding in the list of embeddings.                                                                                                                              |
| embedding | array   | The embedding vector, which is a list of floats. The length of vector depends on the model as listed in the [embedding guide](https://platform.openai.com/docs/guides/embeddings). |
| object    | string  | The object type, which is always "embedding".                                                                                                                                      |

## Error

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| code    |
| message | string |
| param   |
| type    | string |

## ErrorEvent

Occurs when an [error](https://platform.openai.com/docs/guides/error-codes#api-errors) occurs. This can happen due to an internal server error or a timeout.

| Field | Type   | Description |
| ----- | ------ | ----------- |
| event | string |
| data  |

## ErrorResponse

| Field | Type | Description |
| ----- | ---- | ----------- |
| error |

## Eval

An Eval object with a data source config and testing criteria.
An Eval represents a task to be done for your LLM integration.
Like:

- Improve the quality of my chatbot
- See how well my chatbot handles customer support
- Check if o4-mini is better at my usecase than gpt-4o

| Field              | Type    | Description                                                    |
| ------------------ | ------- | -------------------------------------------------------------- |
| object             | string  | The object type.                                               |
| id                 | string  | Unique identifier for the evaluation.                          |
| name               | string  | The name of the evaluation.                                    |
| data_source_config | object  | Configuration of data sources used in runs of the evaluation.  |
| testing_criteria   | array   | A list of testing criteria.                                    |
| created_at         | integer | The Unix timestamp (in seconds) for when the eval was created. |
| metadata           |

## EvalApiError

An object representing an error response from the Eval API.

| Field   | Type   | Description        |
| ------- | ------ | ------------------ |
| code    | string | The error code.    |
| message | string | The error message. |

## EvalCustomDataSourceConfig

A CustomDataSourceConfig which specifies the schema of your `item`and optionally`sample`namespaces.
The response schema defines the shape of the data that will be:

- Used to define your testing criteria and
- What data is required when creating a run

| Field  | Type   | Description                                    |
| ------ | ------ | ---------------------------------------------- |
| type   | string | The type of data source. Always`custom`.       |
| schema | object | The json schema for the run data source items. |
Learn how to build JSON schemas [here](https://json-schema.org/).
 |

## EvalGraderLabelModel

## EvalGraderPython

## EvalGraderScoreModel

## EvalGraderStringCheck

## EvalGraderTextSimilarity

## EvalItem

A message input to the model with a role indicating instruction following
hierarchy. Instructions given with the `developer`or`system`role take
precedence over instructions given with the`user`role. Messages with the`assistant`role are presumed to have been generated by the model in previous
interactions.

| Field | Type   | Description                                                            |
| ----- | ------ | ---------------------------------------------------------------------- |
| role  | string | The role of the message input. One of`user`, `assistant`, `system`, or |
`developer`.
 |
| content |  | Inputs to the model - can contain template strings.
 |
| type | string | The type of the message input. Always `message`.
 |

## EvalJsonlFileContentSource

| Field   | Type   | Description                                      |
| ------- | ------ | ------------------------------------------------ |
| type    | string | The type of jsonl source. Always `file_content`. |
| content | array  | The content of the jsonl file.                   |

## EvalJsonlFileIdSource

| Field | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| type  | string | The type of jsonl source. Always `file_id`. |
| id    | string | The identifier of the file.                 |

## EvalList

An object representing a list of evals.

| Field    | Type    | Description                                          |
| -------- | ------- | ---------------------------------------------------- |
| object   | string  | The type of this object. It is always set to "list". |
| data     | array   | An array of eval objects.                            |
| first_id | string  | The identifier of the first eval in the data array.  |
| last_id  | string  | The identifier of the last eval in the data array.   |
| has_more | boolean | Indicates whether there are more evals available.    |

## EvalLogsDataSourceConfig

A LogsDataSourceConfig which specifies the metadata property of your logs query.
This is usually metadata like `usecase=chatbot`or`prompt-version=v2`, etc.
The schema returned by this data source config is used to defined what variables are available in your evals.
`item`and`sample`are both defined when using this data source config.

| Field    | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| type     | string | The type of data source. Always`logs`.         |
| metadata |
| schema   | object | The json schema for the run data source items. |
Learn how to build JSON schemas [here](https://json-schema.org/).
 |

## EvalResponsesSource

A EvalResponsesSource object describing a run data source configuration.

| Field               | Type   | Description                                      |
| ------------------- | ------ | ------------------------------------------------ |
| type                | string | The type of run data source. Always `responses`. |
| metadata            |
| model               |
| instructions_search |
| created_after       |
| created_before      |
| reasoning_effort    |
| temperature         |
| top_p               |
| users               |
| tools               |

## EvalRun

A schema representing an evaluation run.

| Field                        | Type    | Description                                                        |
| ---------------------------- | ------- | ------------------------------------------------------------------ |
| object                       | string  | The type of the object. Always "eval.run".                         |
| id                           | string  | Unique identifier for the evaluation run.                          |
| eval_id                      | string  | The identifier of the associated evaluation.                       |
| status                       | string  | The status of the evaluation run.                                  |
| model                        | string  | The model that is evaluated, if applicable.                        |
| name                         | string  | The name of the evaluation run.                                    |
| created_at                   | integer | Unix timestamp (in seconds) when the evaluation run was created.   |
| report_url                   | string  | The URL to the rendered evaluation run report on the UI dashboard. |
| result_counts                | object  | Counters summarizing the outcomes of the evaluation run.           |
| per_model_usage              | array   | Usage statistics for each model during the evaluation run.         |
| per_testing_criteria_results | array   | Results per testing criteria applied during the evaluation run.    |
| data_source                  | object  | Information about the run's data source.                           |
| metadata                     |
| error                        |

## EvalRunList

An object representing a list of runs for an evaluation.

| Field    | Type    | Description                                             |
| -------- | ------- | ------------------------------------------------------- |
| object   | string  | The type of this object. It is always set to "list".    |
| data     | array   | An array of eval run objects.                           |
| first_id | string  | The identifier of the first eval run in the data array. |
| last_id  | string  | The identifier of the last eval run in the data array.  |
| has_more | boolean | Indicates whether there are more evals available.       |

## EvalRunOutputItem

A schema representing an evaluation run output item.

| Field              | Type    | Description                                                            |
| ------------------ | ------- | ---------------------------------------------------------------------- |
| object             | string  | The type of the object. Always "eval.run.output_item".                 |
| id                 | string  | Unique identifier for the evaluation run output item.                  |
| run_id             | string  | The identifier of the evaluation run associated with this output item. |
| eval_id            | string  | The identifier of the evaluation group.                                |
| created_at         | integer | Unix timestamp (in seconds) when the evaluation run was created.       |
| status             | string  | The status of the evaluation run.                                      |
| datasource_item_id | integer | The identifier for the data source item.                               |
| datasource_item    | object  | Details of the input data source item.                                 |
| results            | array   | A list of grader results for this output item.                         |
| sample             | object  | A sample containing the input and output of the evaluation run.        |

## EvalRunOutputItemList

An object representing a list of output items for an evaluation run.

| Field    | Type    | Description                                                         |
| -------- | ------- | ------------------------------------------------------------------- |
| object   | string  | The type of this object. It is always set to "list".                |
| data     | array   | An array of eval run output item objects.                           |
| first_id | string  | The identifier of the first eval run output item in the data array. |
| last_id  | string  | The identifier of the last eval run output item in the data array.  |
| has_more | boolean | Indicates whether there are more eval run output items available.   |

## EvalRunOutputItemResult

A single grader result for an evaluation run output item.

| Field  | Type                                                         | Description                                           |
| ------ | ------------------------------------------------------------ | ----------------------------------------------------- |
| name   | string                                                       | The name of the grader.                               |
| type   | string                                                       | The grader type (for example, "string-check-grader"). |
| score  | number                                                       | The numeric score produced by the grader.             |
| passed | boolean                                                      | Whether the grader considered the output a pass.      |
| sample | Optional sample or intermediate data produced by the grader. |

## EvalStoredCompletionsDataSourceConfig

Deprecated in favor of LogsDataSourceConfig.

| Field    | Type   | Description                                           |
| -------- | ------ | ----------------------------------------------------- |
| type     | string | The type of data source. Always `stored_completions`. |
| metadata |
| schema   | object | The json schema for the run data source items.        |
Learn how to build JSON schemas [here](https://json-schema.org/).
 |

## EvalStoredCompletionsSource

A StoredCompletionsRunDataSource configuration describing a set of filters

| Field          | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| type           | string | The type of source. Always `stored_completions`. |
| metadata       |
| model          |
| created_after  |
| created_before |
| limit          |

## FileExpirationAfter

The expiration policy for a file. By default, files with `purpose=batch`expire after 30 days and all other files are persisted until they are manually deleted.

| Field   | Type    | Description                                                                                                                 |
| ------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| anchor  | string  | Anchor timestamp after which the expiration policy applies. Supported anchors:`created_at`.                                 |
| seconds | integer | The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days). |

## FilePath

A path to a file.

| Field   | Type    | Description                                    |
| ------- | ------- | ---------------------------------------------- |
| type    | string  | The type of the file path. Always `file_path`. |
| file_id | string  | The ID of the file.                            |
| index   | integer | The index of the file in the list of files.    |

## FileSearchRanker

The ranker to use for the file search. If not specified will use the `auto`ranker.

## FileSearchRankingOptions

The ranking options for the file search. If not specified, the file search tool will use the`auto`ranker and a score_threshold of 0.

See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

| Field           | Type   | Description                                                                                          |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| ranker          |
| score_threshold | number | The score threshold for the file search. All values must be a floating point number between 0 and 1. |

## FileSearchToolCall

The results of a file search tool call. See the
[file search guide](https://platform.openai.com/docs/guides/tools-file-search) for more information.

| Field  | Type   | Description                                                      |
| ------ | ------ | ---------------------------------------------------------------- |
| id     | string | The unique ID of the file search tool call.                      |
| type   | string | The type of the file search tool call. Always`file_search_call`. |
| status | string | The status of the file search tool call. One of `in_progress`,   |
`searching`, `incomplete`or`failed`,
 |
| queries | array | The queries used to search for files.
 |
| results |

## FineTuneChatCompletionRequestAssistantMessage

## FineTuneChatRequestInput

The per-line training example of a fine-tuning input file for chat models using the supervised method.
Input messages may contain text or image content only. Audio and file input messages
are not currently supported for fine-tuning.

| Field               | Type  | Description                                                 |
| ------------------- | ----- | ----------------------------------------------------------- |
| messages            | array |
| tools               | array | A list of tools the model may generate JSON inputs for.     |
| parallel_tool_calls |
| functions           | array | A list of functions the model may generate JSON inputs for. |

## FineTuneDPOHyperparameters

The hyperparameters used for the DPO fine-tuning job.

| Field                    | Type                                                                                                                                    | Description |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| beta                     | The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.  |
| batch_size               | Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance. |
| learning_rate_multiplier | Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.                                       |
| n_epochs                 | The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.                            |

## FineTuneDPOMethod

Configuration for the DPO fine-tuning method.

| Field           | Type | Description |
| --------------- | ---- | ----------- |
| hyperparameters |

## FineTuneMethod

The method used for fine-tuning.

| Field         | Type   | Description                                                            |
| ------------- | ------ | ---------------------------------------------------------------------- |
| type          | string | The type of method. Is either `supervised`, `dpo`, or `reinforcement`. |
| supervised    |
| dpo           |
| reinforcement |

## FineTunePreferenceRequestInput

The per-line training example of a fine-tuning input file for chat models using the dpo method.
Input messages may contain text or image content only. Audio and file input messages
are not currently supported for fine-tuning.

| Field                | Type   | Description                                          |
| -------------------- | ------ | ---------------------------------------------------- |
| input                | object |
| preferred_output     | array  | The preferred completion message for the output.     |
| non_preferred_output | array  | The non-preferred completion message for the output. |

## FineTuneReinforcementHyperparameters

The hyperparameters used for the reinforcement fine-tuning job.

| Field                    | Type                                                                                                                                    | Description                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| batch_size               | Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance. |
| learning_rate_multiplier | Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.                                       |
| n_epochs                 | The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.                            |
| reasoning_effort         | string                                                                                                                                  | Level of reasoning effort. |
| compute_multiplier       | Multiplier on amount of compute used for exploring search space during training.                                                        |
| eval_interval            | The number of training steps between evaluation runs.                                                                                   |
| eval_samples             | Number of evaluation samples to generate per training step.                                                                             |

## FineTuneReinforcementMethod

Configuration for the reinforcement fine-tuning method.

| Field           | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| grader          | object | The grader used for the fine-tuning job. |
| hyperparameters |

## FineTuneReinforcementRequestInput

Per-line training example for reinforcement fine-tuning. Note that `messages`and`tools`are the only reserved keywords.
Any other arbitrary key-value data can be included on training datapoints and will be available to reference during grading under the`{{ item.XXX }}`template variable.
Input messages may contain text or image content only. Audio and file input messages
are not currently supported for fine-tuning.

| Field    | Type  | Description                                             |
| -------- | ----- | ------------------------------------------------------- |
| messages | array |
| tools    | array | A list of tools the model may generate JSON inputs for. |

## FineTuneSupervisedHyperparameters

The hyperparameters used for the fine-tuning job.

| Field                    | Type                                                                                                                                    | Description |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| batch_size               | Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance. |
| learning_rate_multiplier | Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.                                       |
| n_epochs                 | The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.                            |

## FineTuneSupervisedMethod

Configuration for the supervised fine-tuning method.

| Field           | Type | Description |
| --------------- | ---- | ----------- |
| hyperparameters |

## FineTuningCheckpointPermission

The`checkpoint.permission`object represents a permission for a fine-tuned model checkpoint.

| Field      | Type    | Description                                                              |
| ---------- | ------- | ------------------------------------------------------------------------ |
| id         | string  | The permission identifier, which can be referenced in the API endpoints. |
| created_at | integer | The Unix timestamp (in seconds) for when the permission was created.     |
| project_id | string  | The project identifier that the permission is for.                       |
| object     | string  | The object type, which is always "checkpoint.permission".                |

## FineTuningIntegration

| Field | Type   | Description                                                                                        |
| ----- | ------ | -------------------------------------------------------------------------------------------------- |
| type  | string | The type of the integration being enabled for the fine-tuning job                                  |
| wandb | object | The settings for your integration with Weights and Biases. This payload specifies the project that |
metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
to your run, and set a default entity (team, username, etc) to be associated with your run.
 |

## FineTuningJob

The`fine_tuning.job`object represents a fine-tuning job that has been created through the API.

| Field            | Type    | Description                                                                                                                                                                         |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id               | string  | The object identifier, which can be referenced in the API endpoints.                                                                                                                |
| created_at       | integer | The Unix timestamp (in seconds) for when the fine-tuning job was created.                                                                                                           |
| error            |
| fine_tuned_model |
| finished_at      |
| hyperparameters  | object  | The hyperparameters used for the fine-tuning job. This value will only be returned when running`supervised`jobs.                                                                    |
| model            | string  | The base model that is being fine-tuned.                                                                                                                                            |
| object           | string  | The object type, which is always "fine_tuning.job".                                                                                                                                 |
| organization_id  | string  | The organization that owns the fine-tuning job.                                                                                                                                     |
| result_files     | array   | The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents). |
| status           | string  | The current status of the fine-tuning job, which can be either`validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.                                       |
| trained_tokens   |
| training_file    | string  | The file ID used for training. You can retrieve the training data with the [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).                     |
| validation_file  |
| integrations     |
| seed             | integer | The seed used for the fine-tuning job.                                                                                                                                              |
| estimated_finish |
| method           |
| metadata         |

## FineTuningJobCheckpoint

The `fine_tuning.job.checkpoint`object represents a model checkpoint for a fine-tuning job that is ready to use.

| Field                       | Type    | Description                                                              |
| --------------------------- | ------- | ------------------------------------------------------------------------ |
| id                          | string  | The checkpoint identifier, which can be referenced in the API endpoints. |
| created_at                  | integer | The Unix timestamp (in seconds) for when the checkpoint was created.     |
| fine_tuned_model_checkpoint | string  | The name of the fine-tuned checkpoint model that is created.             |
| step_number                 | integer | The step number that the checkpoint was created at.                      |
| metrics                     | object  | Metrics at the step number during the fine-tuning job.                   |
| fine_tuning_job_id          | string  | The name of the fine-tuning job that this checkpoint was created from.   |
| object                      | string  | The object type, which is always "fine_tuning.job.checkpoint".           |

## FineTuningJobEvent

Fine-tuning job event object

| Field      | Type    | Description                                                               |
| ---------- | ------- | ------------------------------------------------------------------------- |
| object     | string  | The object type, which is always "fine_tuning.job.event".                 |
| id         | string  | The object identifier.                                                    |
| created_at | integer | The Unix timestamp (in seconds) for when the fine-tuning job was created. |
| level      | string  | The log level of the event.                                               |
| message    | string  | The message of the event.                                                 |
| type       | string  | The type of event.                                                        |
| data       | object  | The data associated with the event.                                       |

## FunctionAndCustomToolCallOutput

## FunctionObject

| Field       | Type   | Description                                                                                                                   |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| description | string | A description of what the function does, used by the model to choose when and how to call the function.                       |
| name        | string | The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64. |
| parameters  |
| strict      |

## FunctionParameters

The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

Omitting`parameters`defines a function with an empty parameter list.

## FunctionToolCall

A tool call to run a function. See the
[function calling guide](https://platform.openai.com/docs/guides/function-calling) for more information.

| Field     | Type   | Description                                                     |
| --------- | ------ | --------------------------------------------------------------- |
| id        | string | The unique ID of the function tool call.                        |
| type      | string | The type of the function tool call. Always`function_call`.      |
| call_id   | string | The unique ID of the function tool call generated by the model. |
| name      | string | The name of the function to run.                                |
| arguments | string | A JSON string of the arguments to pass to the function.         |
| status    | string | The status of the item. One of `in_progress`, `completed`, or   |
`incomplete`. Populated when items are returned via API.
 |

## FunctionToolCallOutput

The output of a function tool call.

| Field | Type   | Description                                                              |
| ----- | ------ | ------------------------------------------------------------------------ |
| id    | string | The unique ID of the function tool call output. Populated when this item |
is returned via API.
 |
| type | string | The type of the function tool call output. Always `function_call_output`.
 |
| call_id | string | The unique ID of the function tool call generated by the model.
 |
| output |  | The output from the function call generated by your code.
Can be a string or an list of output content.
 |
| status | string | The status of the item. One of `in_progress`, `completed`, or
`incomplete`. Populated when items are returned via API.
 |

## FunctionToolCallOutputResource

## FunctionToolCallResource

## GraderLabelModel

A LabelModelGrader object which uses a model to assign labels to each item
in the evaluation.

| Field          | Type   | Description                                                            |
| -------------- | ------ | ---------------------------------------------------------------------- |
| type           | string | The object type, which is always `label_model`.                        |
| name           | string | The name of the grader.                                                |
| model          | string | The model to use for the evaluation. Must support structured outputs.  |
| input          | array  |
| labels         | array  | The labels to assign to each item in the evaluation.                   |
| passing_labels | array  | The labels that indicate a passing result. Must be a subset of labels. |

## GraderMulti

A MultiGrader object combines the output of multiple graders to produce a single score.

| Field            | Type   | Description                                                |
| ---------------- | ------ | ---------------------------------------------------------- |
| type             | string | The object type, which is always `multi`.                  |
| name             | string | The name of the grader.                                    |
| graders          |
| calculate_output | string | A formula to calculate the output based on grader results. |

## GraderPython

A PythonGrader object that runs a python script on the input.

| Field     | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| type      | string | The object type, which is always `python`.  |
| name      | string | The name of the grader.                     |
| source    | string | The source code of the python script.       |
| image_tag | string | The image tag to use for the python script. |

## GraderScoreModel

A ScoreModelGrader object that uses a model to assign a score to the input.

| Field           | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| type            | string | The object type, which is always `score_model`.    |
| name            | string | The name of the grader.                            |
| model           | string | The model to use for the evaluation.               |
| sampling_params | object | The sampling parameters for the model.             |
| input           | array  | The input text. This may include template strings. |
| range           | array  | The range of the score. Defaults to `[0, 1]`.      |

## GraderStringCheck

A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.

| Field     | Type   | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| type      | string | The object type, which is always `string_check`.                              |
| name      | string | The name of the grader.                                                       |
| input     | string | The input text. This may include template strings.                            |
| reference | string | The reference text. This may include template strings.                        |
| operation | string | The string check operation to perform. One of `eq`, `ne`, `like`, or `ilike`. |

## GraderTextSimilarity

A TextSimilarityGrader object which grades text based on similarity metrics.

| Field             | Type   | Description                                                           |
| ----------------- | ------ | --------------------------------------------------------------------- |
| type              | string | The type of grader.                                                   |
| name              | string | The name of the grader.                                               |
| input             | string | The text being graded.                                                |
| reference         | string | The text being graded against.                                        |
| evaluation_metric | string | The evaluation metric to use. One of `cosine`, `fuzzy_match`, `bleu`, |
`gleu`, `meteor`, `rouge_1`, `rouge_2`, `rouge_3`, `rouge_4`, `rouge_5`,
or `rouge_l`.
 |

## Image

Represents the content or the URL of an image generated by the OpenAI API.

| Field          | Type   | Description                                                                                                                                                          |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| b64_json       | string | The base64-encoded JSON of the generated image. Default value for `gpt-image-1`, and only present if `response_format`is set to`b64_json`for`dall-e-2`and`dall-e-3`. |
| url            | string | When using `dall-e-2`or`dall-e-3`, the URL of the generated image if `response_format`is set to`url`(default value). Unsupported for`gpt-image-1`.                   |
| revised_prompt | string | For `dall-e-3`only, the revised prompt that was used to generate the image.                                                                                          |

## ImageEditCompletedEvent

Emitted when image editing has completed and the final image is available.

| Field         | Type    | Description                                                                 |
| ------------- | ------- | --------------------------------------------------------------------------- |
| type          | string  | The type of the event. Always`image_edit.completed`.                        |
| b64_json      | string  | Base64-encoded final edited image data, suitable for rendering as an image. |
| created_at    | integer | The Unix timestamp when the event was created.                              |
| size          | string  | The size of the edited image.                                               |
| quality       | string  | The quality setting for the edited image.                                   |
| background    | string  | The background setting for the edited image.                                |
| output_format | string  | The output format for the edited image.                                     |
| usage         |

## ImageEditPartialImageEvent

Emitted when a partial image is available during image editing streaming.

| Field               | Type    | Description                                                            |
| ------------------- | ------- | ---------------------------------------------------------------------- |
| type                | string  | The type of the event. Always `image_edit.partial_image`.              |
| b64_json            | string  | Base64-encoded partial image data, suitable for rendering as an image. |
| created_at          | integer | The Unix timestamp when the event was created.                         |
| size                | string  | The size of the requested edited image.                                |
| quality             | string  | The quality setting for the requested edited image.                    |
| background          | string  | The background setting for the requested edited image.                 |
| output_format       | string  | The output format for the requested edited image.                      |
| partial_image_index | integer | 0-based index for the partial image (streaming).                       |

## ImageEditStreamEvent

## ImageGenCompletedEvent

Emitted when image generation has completed and the final image is available.

| Field         | Type    | Description                                                    |
| ------------- | ------- | -------------------------------------------------------------- |
| type          | string  | The type of the event. Always `image_generation.completed`.    |
| b64_json      | string  | Base64-encoded image data, suitable for rendering as an image. |
| created_at    | integer | The Unix timestamp when the event was created.                 |
| size          | string  | The size of the generated image.                               |
| quality       | string  | The quality setting for the generated image.                   |
| background    | string  | The background setting for the generated image.                |
| output_format | string  | The output format for the generated image.                     |
| usage         |

## ImageGenPartialImageEvent

Emitted when a partial image is available during image generation streaming.

| Field               | Type    | Description                                                            |
| ------------------- | ------- | ---------------------------------------------------------------------- |
| type                | string  | The type of the event. Always `image_generation.partial_image`.        |
| b64_json            | string  | Base64-encoded partial image data, suitable for rendering as an image. |
| created_at          | integer | The Unix timestamp when the event was created.                         |
| size                | string  | The size of the requested image.                                       |
| quality             | string  | The quality setting for the requested image.                           |
| background          | string  | The background setting for the requested image.                        |
| output_format       | string  | The output format for the requested image.                             |
| partial_image_index | integer | 0-based index for the partial image (streaming).                       |

## ImageGenStreamEvent

## ImageGenTool

A tool that generates images using a model like `gpt-image-1`.

| Field   | Type   | Description                                                         |
| ------- | ------ | ------------------------------------------------------------------- |
| type    | string | The type of the image generation tool. Always `image_generation`.   |
| model   | string | The image generation model to use. Default: `gpt-image-1`.          |
| quality | string | The quality of the generated image. One of `low`, `medium`, `high`, |
or `auto`. Default: `auto`.
 |
| size | string | The size of the generated image. One of `1024x1024`, `1024x1536`,
`1536x1024`, or `auto`. Default: `auto`.
 |
| output_format | string | The output format of the generated image. One of `png`, `webp`, or
`jpeg`. Default: `png`.
 |
| output_compression | integer | Compression level for the output image. Default: 100.
 |
| moderation | string | Moderation level for the generated image. Default: `auto`.
 |
| background | string | Background type for the generated image. One of `transparent`,
`opaque`, or `auto`. Default: `auto`.
 |
| input_fidelity |
| input_image_mask | object | Optional mask for inpainting. Contains `image_url`(string, optional) and`file_id`(string, optional).
 |
| partial_images | integer | Number of partial images to generate in streaming mode, from 0 (default value) to 3.
 |

## ImageGenToolCall

An image generation request made by the model.

| Field  | Type   | Description                                                           |
| ------ | ------ | --------------------------------------------------------------------- |
| type   | string | The type of the image generation call. Always`image_generation_call`. |
| id     | string | The unique ID of the image generation call.                           |
| status | string | The status of the image generation call.                              |
| result |

## ImageInputFidelity

## ImagesResponse

The response from the image generation endpoint.

| Field         | Type    | Description                                                                             |
| ------------- | ------- | --------------------------------------------------------------------------------------- |
| created       | integer | The Unix timestamp (in seconds) of when the image was created.                          |
| data          | array   | The list of generated images.                                                           |
| background    | string  | The background parameter used for the image generation. Either `transparent`or`opaque`. |
| output_format | string  | The output format of the image generation. Either `png`, `webp`, or `jpeg`.             |
| size          | string  | The size of the image generated. Either `1024x1024`, `1024x1536`, or `1536x1024`.       |
| quality       | string  | The quality of the image generated. Either `low`, `medium`, or `high`.                  |
| usage         |

## ImagesUsage

For `gpt-image-1`only, the token usage information for the image generation.

| Field                | Type    | Description                                                                 |
| -------------------- | ------- | --------------------------------------------------------------------------- |
| total_tokens         | integer | The total number of tokens (images and text) used for the image generation. |
| input_tokens         | integer | The number of tokens (images and text) in the input prompt.                 |
| output_tokens        | integer | The number of image tokens in the output image.                             |
| input_tokens_details | object  | The input tokens detailed information for the image generation.             |

## Includable

Specify additional output data to include in the model response. Currently
supported values are:

-`web_search_call.action.sources`: Include the sources of the web search tool call.
- `code_interpreter_call.outputs`: Includes the outputs of python code execution
  in code interpreter tool call items.
- `computer_call_output.output.image_url`: Include image urls from the computer call output.
- `file_search_call.results`: Include the search results of
  the file search tool call.
- `message.input_image.image_url`: Include image urls from the input message.
- `message.output_text.logprobs`: Include logprobs with assistant messages.
- `reasoning.encrypted_content`: Includes an encrypted version of reasoning
  tokens in reasoning item outputs. This enables reasoning items to be used in
  multi-turn conversations when using the Responses API statelessly (like
  when the `store`parameter is set to`false`, or when an organization is
  enrolled in the zero data retention program).

## InputAudio

An audio input to the model.

| Field       | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| type        | string | The type of the input item. Always `input_audio`. |
| input_audio | object |

## InputContent

## InputItem

## InputMessage

A message input to the model with a role indicating instruction following
hierarchy. Instructions given with the `developer`or`system`role take
precedence over instructions given with the`user`role.

| Field  | Type   | Description                                                             |
| ------ | ------ | ----------------------------------------------------------------------- |
| type   | string | The type of the message input. Always set to`message`.                  |
| role   | string | The role of the message input. One of `user`, `system`, or `developer`. |
| status | string | The status of item. One of `in_progress`, `completed`, or               |
`incomplete`. Populated when items are returned via API.
 |
| content |

## InputMessageContentList

A list of one or many input items to the model, containing different content
types.

## InputMessageResource

## Invite

Represents an individual `invite`to the organization.

| Field       | Type    | Description                                                              |
| ----------- | ------- | ------------------------------------------------------------------------ |
| object      | string  | The object type, which is always`organization.invite`                    |
| id          | string  | The identifier, which can be referenced in API endpoints                 |
| email       | string  | The email address of the individual to whom the invite was sent          |
| role        | string  | `owner`or`reader`                                                        |
| status      | string  | `accepted`,`expired`, or `pending`                                       |
| invited_at  | integer | The Unix timestamp (in seconds) of when the invite was sent.             |
| expires_at  | integer | The Unix timestamp (in seconds) of when the invite expires.              |
| accepted_at | integer | The Unix timestamp (in seconds) of when the invite was accepted.         |
| projects    | array   | The projects that were granted membership upon acceptance of the invite. |

## InviteDeleteResponse

| Field   | Type    | Description                                                   |
| ------- | ------- | ------------------------------------------------------------- |
| object  | string  | The object type, which is always`organization.invite.deleted` |
| id      | string  |
| deleted | boolean |

## InviteListResponse

| Field    | Type    | Description                                                                            |
| -------- | ------- | -------------------------------------------------------------------------------------- |
| object   | string  | The object type, which is always`list`                                                 |
| data     | array   |
| first_id | string  | The first`invite_id`in the retrieved`list`                                             |
| last_id  | string  | The last`invite_id`in the retrieved`list`                                              |
| has_more | boolean | The`has_more`property is used for pagination to indicate there are additional results. |

## InviteRequest

| Field    | Type   | Description                                                                                                                                                                                          |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| email    | string | Send an email to this address                                                                                                                                                                        |
| role     | string | `owner`or`reader`                                                                                                                                                                                    |
| projects | array  | An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior. |

## Item

Content item used to generate a response.

## ItemResource

Content item used to generate a response.

## KeyPress

A collection of keypresses the model would like to perform.

| Field | Type   | Description                                                       |
| ----- | ------ | ----------------------------------------------------------------- |
| type  | string | Specifies the event type. For a keypress action, this property is |
always set to`keypress`.
 |
| keys | array | The combination of keys the model is requesting to be pressed. This is an
array of strings, each representing a key.
 |

## ListAssistantsResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ListAuditLogsResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ListBatchesResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |
| object   | string  |

## ListCertificatesResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |
| object   | string  |

## ListFilesResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ListFineTuningCheckpointPermissionResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| data     | array   |
| object   | string  |
| first_id |
| last_id  |
| has_more | boolean |

## ListFineTuningJobCheckpointsResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| data     | array   |
| object   | string  |
| first_id |
| last_id  |
| has_more | boolean |

## ListFineTuningJobEventsResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| data     | array   |
| object   | string  |
| has_more | boolean |

## ListMessagesResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ListModelsResponse

| Field  | Type   | Description |
| ------ | ------ | ----------- |
| object | string |
| data   | array  |

## ListPaginatedFineTuningJobsResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| data     | array   |
| has_more | boolean |
| object   | string  |

## ListRunStepsResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ListRunsResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ListVectorStoreFilesResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ListVectorStoresResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## LocalShellExecAction

Execute a shell command on the server.

| Field             | Type   | Description                                        |
| ----------------- | ------ | -------------------------------------------------- |
| type              | string | The type of the local shell action. Always `exec`. |
| command           | array  | The command to run.                                |
| timeout_ms        |
| working_directory |
| env               | object | Environment variables to set for the command.      |
| user              |

## LocalShellTool

A tool that allows the model to execute shell commands in a local environment.

| Field | Type   | Description                                             |
| ----- | ------ | ------------------------------------------------------- |
| type  | string | The type of the local shell tool. Always `local_shell`. |

## LocalShellToolCall

A tool call to run a command on the local shell.

| Field   | Type   | Description                                                        |
| ------- | ------ | ------------------------------------------------------------------ |
| type    | string | The type of the local shell call. Always `local_shell_call`.       |
| id      | string | The unique ID of the local shell call.                             |
| call_id | string | The unique ID of the local shell tool call generated by the model. |
| action  |
| status  | string | The status of the local shell call.                                |

## LocalShellToolCallOutput

The output of a local shell tool call.

| Field  | Type   | Description                                                                     |
| ------ | ------ | ------------------------------------------------------------------------------- |
| type   | string | The type of the local shell tool call output. Always `local_shell_call_output`. |
| id     | string | The unique ID of the local shell tool call generated by the model.              |
| output | string | A JSON string of the output of the local shell tool call.                       |
| status |

## LogProbProperties

A log probability object.

| Field   | Type   | Description                                               |
| ------- | ------ | --------------------------------------------------------- |
| token   | string | The token that was used to generate the log probability.  |
| logprob | number | The log probability of the token.                         |
| bytes   | array  | The bytes that were used to generate the log probability. |

## MCPApprovalRequest

A request for human approval of a tool invocation.

| Field        | Type   | Description                                          |
| ------------ | ------ | ---------------------------------------------------- |
| type         | string | The type of the item. Always `mcp_approval_request`. |
| id           | string | The unique ID of the approval request.               |
| server_label | string | The label of the MCP server making the request.      |
| name         | string | The name of the tool to run.                         |
| arguments    | string | A JSON string of arguments for the tool.             |

## MCPApprovalResponse

A response to an MCP approval request.

| Field               | Type    | Description                                           |
| ------------------- | ------- | ----------------------------------------------------- |
| type                | string  | The type of the item. Always `mcp_approval_response`. |
| id                  |
| approval_request_id | string  | The ID of the approval request being answered.        |
| approve             | boolean | Whether the request was approved.                     |
| reason              |

## MCPApprovalResponseResource

A response to an MCP approval request.

| Field               | Type    | Description                                           |
| ------------------- | ------- | ----------------------------------------------------- |
| type                | string  | The type of the item. Always `mcp_approval_response`. |
| id                  | string  | The unique ID of the approval response                |
| approval_request_id | string  | The ID of the approval request being answered.        |
| approve             | boolean | Whether the request was approved.                     |
| reason              |

## MCPListTools

A list of tools available on an MCP server.

| Field        | Type   | Description                                    |
| ------------ | ------ | ---------------------------------------------- |
| type         | string | The type of the item. Always `mcp_list_tools`. |
| id           | string | The unique ID of the list.                     |
| server_label | string | The label of the MCP server.                   |
| tools        | array  | The tools available on the server.             |
| error        |

## MCPListToolsTool

A tool available on an MCP server.

| Field        | Type   | Description                                  |
| ------------ | ------ | -------------------------------------------- |
| name         | string | The name of the tool.                        |
| description  |
| input_schema | object | The JSON schema describing the tool's input. |
| annotations  |

## MCPTool

Give the model access to additional tools via remote Model Context Protocol
(MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

| Field        | Type   | Description                                                            |
| ------------ | ------ | ---------------------------------------------------------------------- |
| type         | string | The type of the MCP tool. Always `mcp`.                                |
| server_label | string | A label for this MCP server, used to identify it in tool calls.        |
| server_url   | string | The URL for the MCP server. One of `server_url`or`connector_id`must be |
provided.
 |
| connector_id | string | Identifier for service connectors, like those available in ChatGPT. One of`server_url`or`connector_id`must be provided. Learn more about service
connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

Currently supported`connector_id`values are:

- Dropbox:`connector_dropbox`- Gmail:`connector_gmail`- Google Calendar:`connector_googlecalendar`- Google Drive:`connector_googledrive`- Microsoft Teams:`connector_microsoftteams`- Outlook Calendar:`connector_outlookcalendar`- Outlook Email:`connector_outlookemail`- SharePoint:`connector_sharepoint`|
| authorization | string | An OAuth access token that can be used with a remote MCP server, either
with a custom MCP server URL or a service connector. Your application
must handle the OAuth authorization flow and provide the token here.
 |
| server_description | string | Optional description of the MCP server, used to provide more context.
 |
| headers |
| allowed_tools |
| require_approval |

## MCPToolCall

An invocation of a tool on an MCP server.

| Field               | Type                                                                                                  | Description                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| type                | string                                                                                                | The type of the item. Always`mcp_call`.            |
| id                  | string                                                                                                | The unique ID of the tool call.                    |
| server_label        | string                                                                                                | The label of the MCP server running the tool.      |
| name                | string                                                                                                | The name of the tool that was run.                 |
| arguments           | string                                                                                                | A JSON string of the arguments passed to the tool. |
| output              |
| error               |
| status              | The status of the tool call. One of `in_progress`, `completed`, `incomplete`, `calling`, or `failed`. |
| approval_request_id |

## MCPToolFilter

A filter object to specify which tools are allowed.

| Field      | Type    | Description                                                          |
| ---------- | ------- | -------------------------------------------------------------------- |
| tool_names | array   | List of allowed tool names.                                          |
| read_only  | boolean | Indicates whether or not a tool modifies data or is read-only. If an |
MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
it will match this filter.
 |

## MessageContentImageFileObject

References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

| Field      | Type   | Description          |
| ---------- | ------ | -------------------- |
| type       | string | Always `image_file`. |
| image_file | object |

## MessageContentImageUrlObject

References an image URL in the content of a message.

| Field     | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| type      | string | The type of the content part. |
| image_url | object |

## MessageContentRefusalObject

The refusal content generated by the assistant.

| Field   | Type   | Description       |
| ------- | ------ | ----------------- |
| type    | string | Always `refusal`. |
| refusal | string |

## MessageContentTextAnnotationsFileCitationObject

A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

| Field         | Type    | Description                                                |
| ------------- | ------- | ---------------------------------------------------------- |
| type          | string  | Always `file_citation`.                                    |
| text          | string  | The text in the message content that needs to be replaced. |
| file_citation | object  |
| start_index   | integer |
| end_index     | integer |

## MessageContentTextAnnotationsFilePathObject

A URL for the file that's generated when the assistant used the `code_interpreter`tool to generate a file.

| Field       | Type    | Description                                                |
| ----------- | ------- | ---------------------------------------------------------- |
| type        | string  | Always`file_path`.                                         |
| text        | string  | The text in the message content that needs to be replaced. |
| file_path   | object  |
| start_index | integer |
| end_index   | integer |

## MessageContentTextObject

The text content that is part of a message.

| Field | Type   | Description    |
| ----- | ------ | -------------- |
| type  | string | Always `text`. |
| text  | object |

## MessageDeltaContentImageFileObject

References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

| Field      | Type    | Description                                   |
| ---------- | ------- | --------------------------------------------- |
| index      | integer | The index of the content part in the message. |
| type       | string  | Always `image_file`.                          |
| image_file | object  |

## MessageDeltaContentImageUrlObject

References an image URL in the content of a message.

| Field     | Type    | Description                                   |
| --------- | ------- | --------------------------------------------- |
| index     | integer | The index of the content part in the message. |
| type      | string  | Always `image_url`.                           |
| image_url | object  |

## MessageDeltaContentRefusalObject

The refusal content that is part of a message.

| Field   | Type    | Description                                   |
| ------- | ------- | --------------------------------------------- |
| index   | integer | The index of the refusal part in the message. |
| type    | string  | Always `refusal`.                             |
| refusal | string  |

## MessageDeltaContentTextAnnotationsFileCitationObject

A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

| Field         | Type    | Description                                                |
| ------------- | ------- | ---------------------------------------------------------- |
| index         | integer | The index of the annotation in the text content part.      |
| type          | string  | Always `file_citation`.                                    |
| text          | string  | The text in the message content that needs to be replaced. |
| file_citation | object  |
| start_index   | integer |
| end_index     | integer |

## MessageDeltaContentTextAnnotationsFilePathObject

A URL for the file that's generated when the assistant used the `code_interpreter`tool to generate a file.

| Field       | Type    | Description                                                |
| ----------- | ------- | ---------------------------------------------------------- |
| index       | integer | The index of the annotation in the text content part.      |
| type        | string  | Always`file_path`.                                         |
| text        | string  | The text in the message content that needs to be replaced. |
| file_path   | object  |
| start_index | integer |
| end_index   | integer |

## MessageDeltaContentTextObject

The text content that is part of a message.

| Field | Type    | Description                                   |
| ----- | ------- | --------------------------------------------- |
| index | integer | The index of the content part in the message. |
| type  | string  | Always `text`.                                |
| text  | object  |

## MessageDeltaObject

Represents a message delta i.e. any changed fields on a message during streaming.

| Field  | Type   | Description                                                              |
| ------ | ------ | ------------------------------------------------------------------------ |
| id     | string | The identifier of the message, which can be referenced in API endpoints. |
| object | string | The object type, which is always `thread.message.delta`.                 |
| delta  | object | The delta containing the fields that have changed on the Message.        |

## MessageObject

Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

| Field              | Type    | Description                                                                                           |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------- |
| id                 | string  | The identifier, which can be referenced in API endpoints.                                             |
| object             | string  | The object type, which is always `thread.message`.                                                    |
| created_at         | integer | The Unix timestamp (in seconds) for when the message was created.                                     |
| thread_id          | string  | The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to. |
| status             | string  | The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.           |
| incomplete_details |
| completed_at       |
| incomplete_at      |
| role               | string  | The entity that produced the message. One of `user`or`assistant`.                                     |
| content            | array   | The content of the message in array of text and/or images.                                            |
| assistant_id       |
| run_id             |
| attachments        |
| metadata           |

## MessageRequestContentTextObject

The text content that is part of a message.

| Field | Type   | Description                          |
| ----- | ------ | ------------------------------------ |
| type  | string | Always `text`.                       |
| text  | string | Text content to be sent to the model |

## MessageStreamEvent

## Metadata

## Model

Describes an OpenAI model offering that can be used with the API.

| Field    | Type    | Description                                                         |
| -------- | ------- | ------------------------------------------------------------------- |
| id       | string  | The model identifier, which can be referenced in the API endpoints. |
| created  | integer | The Unix timestamp (in seconds) when the model was created.         |
| object   | string  | The object type, which is always "model".                           |
| owned_by | string  | The organization that owns the model.                               |

## ModelIds

## ModelIdsResponses

## ModelIdsShared

## ModelResponseProperties

| Field        | Type   | Description                                                                                                                                |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| metadata     |
| top_logprobs |
| temperature  |
| top_p        |
| user         | string | This field is being replaced by `safety_identifier`and`prompt_cache_key`. Use `prompt_cache_key`instead to maintain caching optimizations. |
A stable identifier for your end-users.
Used to boost cache hit rates by better bucketing similar requests and  to help OpenAI detect and prevent abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#safety-identifiers).
 |
| safety_identifier | string | A stable identifier used to help detect users of your application that may be violating OpenAI's usage policies.
The IDs should be a string that uniquely identifies each user. We recommend hashing their username or email address, in order to avoid sending us any identifying information. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#safety-identifiers).
 |
| prompt_cache_key | string | Used by OpenAI to cache responses for similar requests to optimize your cache hit rates. Replaces the`user`field. [Learn more](https://platform.openai.com/docs/guides/prompt-caching).
 |
| service_tier |

## ModifyAssistantRequest

| Field            | Type                                                                                                                                                                                                                                                      | Description                                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| model            | ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them. |
| reasoning_effort |
| name             |
| description      |
| instructions     |
| tools            | array                                                                                                                                                                                                                                                     | A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types`code_interpreter`, `file_search`, or `function`. |
| tool_resources   |
| metadata         |
| temperature      |
| top_p            |
| response_format  |

## ModifyCertificateRequest

| Field | Type   | Description                          |
| ----- | ------ | ------------------------------------ |
| name  | string | The updated name for the certificate |

## ModifyMessageRequest

| Field    | Type | Description |
| -------- | ---- | ----------- |
| metadata |

## ModifyRunRequest

| Field    | Type | Description |
| -------- | ---- | ----------- |
| metadata |

## ModifyThreadRequest

| Field          | Type | Description |
| -------------- | ---- | ----------- |
| tool_resources |
| metadata       |

## Move

A mouse move action.

| Field | Type   | Description                                                   |
| ----- | ------ | ------------------------------------------------------------- |
| type  | string | Specifies the event type. For a move action, this property is |
always set to `move`.
 |
| x | integer | The x-coordinate to move to.
 |
| y | integer | The y-coordinate to move to.
 |

## NoiseReductionType

Type of noise reduction. `near_field`is for close-talking microphones such as headphones,`far_field`is for far-field microphones such as laptop or conference room microphones.

## OpenAIFile

The`File`object represents a document that has been uploaded to OpenAI.

| Field          | Type    | Description                                                                                                                                                                     |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id             | string  | The file identifier, which can be referenced in the API endpoints.                                                                                                              |
| bytes          | integer | The size of the file, in bytes.                                                                                                                                                 |
| created_at     | integer | The Unix timestamp (in seconds) for when the file was created.                                                                                                                  |
| expires_at     | integer | The Unix timestamp (in seconds) for when the file will expire.                                                                                                                  |
| filename       | string  | The name of the file.                                                                                                                                                           |
| object         | string  | The object type, which is always`file`.                                                                                                                                         |
| purpose        | string  | The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`. |
| status         | string  | Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.                                                                            |
| status_details | string  | Deprecated. For details on why a fine-tuning training file failed validation, see the `error`field on`fine_tuning.job`.                                                         |

## OtherChunkingStrategyResponseParam

This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy`concept was introduced in the API.

| Field | Type   | Description    |
| ----- | ------ | -------------- |
| type  | string | Always`other`. |

## OutputAudio

An audio output from the model.

| Field      | Type   | Description                                          |
| ---------- | ------ | ---------------------------------------------------- |
| type       | string | The type of the output audio. Always `output_audio`. |
| data       | string | Base64-encoded audio data from the model.            |
| transcript | string | The transcript of the audio data from the model.     |

## OutputContent

## OutputItem

## OutputMessage

An output message from the model.

| Field   | Type   | Description                                                            |
| ------- | ------ | ---------------------------------------------------------------------- |
| id      | string | The unique ID of the output message.                                   |
| type    | string | The type of the output message. Always `message`.                      |
| role    | string | The role of the output message. Always `assistant`.                    |
| content | array  | The content of the output message.                                     |
| status  | string | The status of the message input. One of `in_progress`, `completed`, or |
`incomplete`. Populated when input items are returned via API.
 |

## OutputMessageContent

## ParallelToolCalls

Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

## PartialImages

## PredictionContent

Static predicted output content, such as the content of a text file that is
being regenerated.

| Field | Type   | Description                                                         |
| ----- | ------ | ------------------------------------------------------------------- |
| type  | string | The type of the predicted content you want to provide. This type is |
currently always `content`.
 |
| content |  | The content that should be matched when generating a model response.
If generated tokens would match this content, the entire model response
can be returned much more quickly.
 |

## Project

Represents an individual project.

| Field       | Type    | Description                                                      |
| ----------- | ------- | ---------------------------------------------------------------- |
| id          | string  | The identifier, which can be referenced in API endpoints         |
| object      | string  | The object type, which is always `organization.project`          |
| name        | string  | The name of the project. This appears in reporting.              |
| created_at  | integer | The Unix timestamp (in seconds) of when the project was created. |
| archived_at |
| status      | string  | `active`or`archived`                                             |

## ProjectApiKey

Represents an individual API key in a project.

| Field          | Type    | Description                                                        |
| -------------- | ------- | ------------------------------------------------------------------ |
| object         | string  | The object type, which is always`organization.project.api_key`     |
| redacted_value | string  | The redacted value of the API key                                  |
| name           | string  | The name of the API key                                            |
| created_at     | integer | The Unix timestamp (in seconds) of when the API key was created    |
| last_used_at   | integer | The Unix timestamp (in seconds) of when the API key was last used. |
| id             | string  | The identifier, which can be referenced in API endpoints           |
| owner          | object  |

## ProjectApiKeyDeleteResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| object  | string  |
| id      | string  |
| deleted | boolean |

## ProjectApiKeyListResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ProjectCreateRequest

| Field     | Type   | Description                                                                                                                                                                                                                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name      | string | The friendly name of the project, this name appears in reports.                                                                                                                                                                                                                                                              |
| geography | string | Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](https://platform.openai.com/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field. |

## ProjectListResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ProjectRateLimit

Represents a project rate limit config.

| Field                            | Type    | Description                                                               |
| -------------------------------- | ------- | ------------------------------------------------------------------------- |
| object                           | string  | The object type, which is always`project.rate_limit`                      |
| id                               | string  | The identifier, which can be referenced in API endpoints.                 |
| model                            | string  | The model this rate limit applies to.                                     |
| max_requests_per_1_minute        | integer | The maximum requests per minute.                                          |
| max_tokens_per_1_minute          | integer | The maximum tokens per minute.                                            |
| max_images_per_1_minute          | integer | The maximum images per minute. Only present for relevant models.          |
| max_audio_megabytes_per_1_minute | integer | The maximum audio megabytes per minute. Only present for relevant models. |
| max_requests_per_1_day           | integer | The maximum requests per day. Only present for relevant models.           |
| batch_1_day_max_input_tokens     | integer | The maximum batch input tokens per day. Only present for relevant models. |

## ProjectRateLimitListResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ProjectRateLimitUpdateRequest

| Field                            | Type    | Description                                                               |
| -------------------------------- | ------- | ------------------------------------------------------------------------- |
| max_requests_per_1_minute        | integer | The maximum requests per minute.                                          |
| max_tokens_per_1_minute          | integer | The maximum tokens per minute.                                            |
| max_images_per_1_minute          | integer | The maximum images per minute. Only relevant for certain models.          |
| max_audio_megabytes_per_1_minute | integer | The maximum audio megabytes per minute. Only relevant for certain models. |
| max_requests_per_1_day           | integer | The maximum requests per day. Only relevant for certain models.           |
| batch_1_day_max_input_tokens     | integer | The maximum batch input tokens per day. Only relevant for certain models. |

## ProjectServiceAccount

Represents an individual service account in a project.

| Field      | Type    | Description                                                             |
| ---------- | ------- | ----------------------------------------------------------------------- |
| object     | string  | The object type, which is always`organization.project.service_account`  |
| id         | string  | The identifier, which can be referenced in API endpoints                |
| name       | string  | The name of the service account                                         |
| role       | string  | `owner`or`member`                                                       |
| created_at | integer | The Unix timestamp (in seconds) of when the service account was created |

## ProjectServiceAccountApiKey

| Field      | Type    | Description                                                                    |
| ---------- | ------- | ------------------------------------------------------------------------------ |
| object     | string  | The object type, which is always`organization.project.service_account.api_key` |
| value      | string  |
| name       | string  |
| created_at | integer |
| id         | string  |

## ProjectServiceAccountCreateRequest

| Field | Type   | Description                                    |
| ----- | ------ | ---------------------------------------------- |
| name  | string | The name of the service account being created. |

## ProjectServiceAccountCreateResponse

| Field      | Type    | Description                                             |
| ---------- | ------- | ------------------------------------------------------- |
| object     | string  |
| id         | string  |
| name       | string  |
| role       | string  | Service accounts can only have one role of type`member` |
| created_at | integer |
| api_key    |

## ProjectServiceAccountDeleteResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| object  | string  |
| id      | string  |
| deleted | boolean |

## ProjectServiceAccountListResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ProjectUpdateRequest

| Field | Type   | Description                                                    |
| ----- | ------ | -------------------------------------------------------------- |
| name  | string | The updated name of the project, this name appears in reports. |

## ProjectUser

Represents an individual user in a project.

| Field    | Type    | Description                                                    |
| -------- | ------- | -------------------------------------------------------------- |
| object   | string  | The object type, which is always`organization.project.user`    |
| id       | string  | The identifier, which can be referenced in API endpoints       |
| name     | string  | The name of the user                                           |
| email    | string  | The email address of the user                                  |
| role     | string  | `owner`or`member`                                              |
| added_at | integer | The Unix timestamp (in seconds) of when the project was added. |

## ProjectUserCreateRequest

| Field   | Type   | Description         |
| ------- | ------ | ------------------- |
| user_id | string | The ID of the user. |
| role    | string | `owner`or`member`   |

## ProjectUserDeleteResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| object  | string  |
| id      | string  |
| deleted | boolean |

## ProjectUserListResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## ProjectUserUpdateRequest

| Field | Type   | Description       |
| ----- | ------ | ----------------- |
| role  | string | `owner`or`member` |

## Prompt

## RealtimeAudioFormats

## RealtimeBetaClientEventConversationItemCreate

Add a new Item to the Conversation's context, including messages, function
calls, and function call responses. This event can be used both to populate a
"history" of the conversation and to add new items mid-stream, but has the
current limitation that it cannot populate assistant audio messages.

If successful, the server will respond with a`conversation.item.created`event, otherwise an`error`event will be sent.

| Field            | Type                                               | Description                                                             |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| event_id         | string                                             | Optional client-generated ID used to identify this event.               |
| type             | The event type, must be`conversation.item.create`. |
| previous_item_id | string                                             | The ID of the preceding item after which the new item will be inserted. |
If not set, the new item will be appended to the end of the conversation.
If set to `root`, the new item will be added to the beginning of the conversation.
If set to an existing ID, it allows an item to be inserted mid-conversation. If the
ID cannot be found, an error will be returned and the item will not be added.
 |
| item |

## RealtimeBetaClientEventConversationItemDelete

Send this event when you want to remove any item from the conversation
history. The server will respond with a `conversation.item.deleted`event,
unless the item does not exist in the conversation history, in which case the
server will respond with an error.

| Field    | Type                                               | Description                                               |
| -------- | -------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                             | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`conversation.item.delete`. |
| item_id  | string                                             | The ID of the item to delete.                             |

## RealtimeBetaClientEventConversationItemRetrieve

Send this event when you want to retrieve the server's representation of a specific item in the conversation history. This is useful, for example, to inspect user audio after noise cancellation and VAD.
The server will respond with a `conversation.item.retrieved`event,
unless the item does not exist in the conversation history, in which case the
server will respond with an error.

| Field    | Type                                                 | Description                                               |
| -------- | ---------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                               | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`conversation.item.retrieve`. |
| item_id  | string                                               | The ID of the item to retrieve.                           |

## RealtimeBetaClientEventConversationItemTruncate

Send this event to truncate a previous assistant message’s audio. The server
will produce audio faster than realtime, so this event is useful when the user
interrupts to truncate audio that has already been sent to the client but not
yet played. This will synchronize the server's understanding of the audio with
the client's playback.

Truncating audio will delete the server-side text transcript to ensure there
is not text in the context that hasn't been heard by the user.

If successful, the server will respond with a `conversation.item.truncated`event.

| Field    | Type                                                 | Description                                                              |
| -------- | ---------------------------------------------------- | ------------------------------------------------------------------------ |
| event_id | string                                               | Optional client-generated ID used to identify this event.                |
| type     | The event type, must be`conversation.item.truncate`. |
| item_id  | string                                               | The ID of the assistant message item to truncate. Only assistant message |
items can be truncated.
 |
| content_index | integer | The index of the content part to truncate. Set this to 0. |
| audio_end_ms | integer | Inclusive duration up to which audio is truncated, in milliseconds. If
the audio_end_ms is greater than the actual audio duration, the server
will respond with an error.
 |

## RealtimeBetaClientEventInputAudioBufferAppend

Send this event to append audio bytes to the input audio buffer. The audio
buffer is temporary storage you can write to and later commit. In Server VAD
mode, the audio buffer is used to detect speech and the server will decide
when to commit. When Server VAD is disabled, you must commit the audio buffer
manually.

The client may choose how much audio to place in each event up to a maximum
of 15 MiB, for example streaming smaller chunks from the client may allow the
VAD to be more responsive. Unlike made other client events, the server will
not send a confirmation response to this event.

| Field    | Type                                                 | Description                                                             |
| -------- | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| event_id | string                                               | Optional client-generated ID used to identify this event.               |
| type     | The event type, must be `input_audio_buffer.append`. |
| audio    | string                                               | Base64-encoded audio bytes. This must be in the format specified by the |
`input_audio_format`field in the session configuration.
 |

## RealtimeBetaClientEventInputAudioBufferClear

Send this event to clear the audio bytes in the buffer. The server will
respond with an`input_audio_buffer.cleared`event.

| Field    | Type                                               | Description                                               |
| -------- | -------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                             | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`input_audio_buffer.clear`. |

## RealtimeBetaClientEventInputAudioBufferCommit

Send this event to commit the user input audio buffer, which will create a
new user message item in the conversation. This event will produce an error
if the input audio buffer is empty. When in Server VAD mode, the client does
not need to send this event, the server will commit the audio buffer
automatically.

Committing the input audio buffer will trigger input audio transcription
(if enabled in session configuration), but it will not create a response
from the model. The server will respond with an `input_audio_buffer.committed`event.

| Field    | Type                                                | Description                                               |
| -------- | --------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                              | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`input_audio_buffer.commit`. |

## RealtimeBetaClientEventOutputAudioBufferClear

**WebRTC Only:** Emit to cut off the current audio response. This will trigger the server to
stop generating audio and emit a `output_audio_buffer.cleared`event. This
event should be preceded by a`response.cancel`client event to stop the
generation of the current response.
[Learn more](https://platform.openai.com/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).

| Field    | Type                                                | Description                                                |
| -------- | --------------------------------------------------- | ---------------------------------------------------------- |
| event_id | string                                              | The unique ID of the client event used for error handling. |
| type     | The event type, must be`output_audio_buffer.clear`. |

## RealtimeBetaClientEventResponseCancel

Send this event to cancel an in-progress response. The server will respond
with a `response.done`event with a status of`response.status=cancelled`. If
there is no response to cancel, the server will respond with an error.

| Field       | Type                                       | Description                                                        |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------ |
| event_id    | string                                     | Optional client-generated ID used to identify this event.          |
| type        | The event type, must be `response.cancel`. |
| response_id | string                                     | A specific response ID to cancel - if not provided, will cancel an |
in-progress response in the default conversation.
 |

## RealtimeBetaClientEventResponseCreate

This event instructs the server to create a Response, which means triggering
model inference. When in Server VAD mode, the server will create Responses
automatically.

A Response will include at least one Item, and may have two, in which case
the second will be a function call. These Items will be appended to the
conversation history.

The server will respond with a `response.created`event, events for Items
and content created, and finally a`response.done`event to indicate the
Response is complete.

The`response.create`event can optionally include inference configuration like`instructions`, and `temperature`. These fields will override the Session's
configuration for this Response only.

Responses can be created out-of-band of the default Conversation, meaning that they can
have arbitrary input, and it's possible to disable writing the output to the Conversation.
Only one Response can write to the default Conversation at a time, but otherwise multiple
Responses can be created in parallel.

Clients can set `conversation`to`none`to create a Response that does not write to the default
Conversation. Arbitrary input can be provided with the`input`field, which is an array accepting
raw Items and references to existing Items.

| Field    | Type                                      | Description                                               |
| -------- | ----------------------------------------- | --------------------------------------------------------- |
| event_id | string                                    | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`response.create`. |
| response |

## RealtimeBetaClientEventSessionUpdate

Send this event to update the session’s default configuration.
The client may send this event at any time to update any field,
except for `voice`. However, note that once a session has been
initialized with a particular `model`, it can’t be changed to
another model using `session.update`.

When the server receives a `session.update`, it will respond
with a `session.updated`event showing the full, effective configuration.
Only the fields that are present are updated. To clear a field like`instructions`, pass an empty string.

| Field    | Type                                      | Description                                               |
| -------- | ----------------------------------------- | --------------------------------------------------------- |
| event_id | string                                    | Optional client-generated ID used to identify this event. |
| type     | The event type, must be `session.update`. |
| session  |

## RealtimeBetaClientEventTranscriptionSessionUpdate

Send this event to update a transcription session.

| Field    | Type                                                    | Description                                               |
| -------- | ------------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                                  | Optional client-generated ID used to identify this event. |
| type     | The event type, must be `transcription_session.update`. |
| session  |

## RealtimeBetaResponse

The response resource.

| Field  | Type                                          | Description                                                              |
| ------ | --------------------------------------------- | ------------------------------------------------------------------------ |
| id     | string                                        | The unique ID of the response.                                           |
| object | The object type, must be `realtime.response`. |
| status | string                                        | The final status of the response (`completed`, `cancelled`, `failed`, or |
`incomplete`, `in_progress`).
 |
| status_details | object | Additional details about the status. |
| output | array | The list of output items generated by the response. |
| metadata |
| usage | object | Usage statistics for the Response, this will correspond to billing. A
Realtime API session will maintain a conversation context and append new
Items to the Conversation, thus output from previous turns (text and
audio tokens) will become the input for later turns.
 |
| conversation_id | string | Which conversation the response is added to, determined by the `conversation`field in the`response.create`event. If`auto`, the response will be added to
the default conversation and the value of `conversation_id`will be an id like`conv_1234`. If `none`, the response will not be added to any conversation and
the value of `conversation_id`will be`null`. If responses are being triggered
by server VAD, the response will be added to the default conversation, thus
the `conversation_id`will be an id like`conv_1234`.
 |
| voice |  | The voice the model used to respond.
Current voice options are `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`,
`shimmer`, and `verse`.
 |
| modalities | array | The set of modalities the model used to respond. If there are multiple modalities,
the model will pick one, for example if `modalities`is`["text", "audio"]`, the model
could be responding in either text or audio.
 |
| output_audio_format | string | The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
 |
| temperature | number | Sampling temperature for the model, limited to [0.6, 1.2]. Defaults to 0.8.
 |
| max_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls, that was used in this response.
 |

## RealtimeBetaResponseCreateParams

Create a new Realtime response with these parameters

| Field      | Type  | Description                                                         |
| ---------- | ----- | ------------------------------------------------------------------- |
| modalities | array | The set of modalities the model can respond with. To disable audio, |
set this to ["text"].
 |
| instructions | string | The default system instructions (i.e. system message) prepended to model
calls. This field allows the client to guide the model on desired
responses. The model can be instructed on response content and format,
(e.g. "be extremely succinct", "act friendly", "here are examples of good
responses") and on audio behavior (e.g. "talk quickly", "inject emotion
into your voice", "laugh frequently"). The instructions are not guaranteed
to be followed by the model, but they provide guidance to the model on the
desired behavior.

Note that the server sets default instructions which will be used if this
field is not set and are visible in the `session.created`event at the
start of the session.
 |
| voice |  | The voice the model uses to respond. Voice cannot be changed during the
session once the model has responded with audio at least once. Current
voice options are`alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`,
`shimmer`, and `verse`.
 |
| output_audio_format | string | The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
 |
| tools | array | Tools (functions) available to the model. |
| tool_choice |  | How the model chooses tools. Provide one of the string modes or force a specific
function/MCP tool.
 |
| temperature | number | Sampling temperature for the model, limited to [0.6, 1.2]. Defaults to 0.8.
 |
| max_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls. Provide an integer between 1 and 4096 to
limit output tokens, or `inf`for the maximum available tokens for a
given model. Defaults to`inf`.
 |
| conversation |  | Controls which conversation the response is added to. Currently supports
`auto`and`none`, with `auto`as the default value. The`auto`value
means that the contents of the response will be added to the default
conversation. Set this to`none`to create an out-of-band response which
will not add items to default conversation.
 |
| metadata |
| prompt |
| input | array | Input items to include in the prompt for the model. Using this field
creates a new context for this Response instead of using the default
conversation. An empty array`[]`will clear the context for this Response.
Note that this can include references to items from the default conversation.
 |

## RealtimeBetaServerEventConversationItemCreated

Returned when a conversation item is created. There are several scenarios that produce this event:

- The server is generating a Response, which if successful will produce
    either one or two Items, which will be of type`message`(role`assistant`) or type `function_call`.
- The input audio buffer has been committed, either by the client or the
    server (in `server_vad`mode). The server will take the content of the
    input audio buffer and add it to a new user message Item.
- The client has sent a`conversation.item.create`event to add a new Item
    to the Conversation.

| Field            | Type                                                | Description                        |
| ---------------- | --------------------------------------------------- | ---------------------------------- |
| event_id         | string                                              | The unique ID of the server event. |
| type             | The event type, must be`conversation.item.created`. |
| previous_item_id |
| item             |

## RealtimeBetaServerEventConversationItemDeleted

Returned when an item in the conversation is deleted by the client with a
`conversation.item.delete`event. This event is used to synchronize the
server's understanding of the conversation history with the client's view.

| Field    | Type                                                | Description                          |
| -------- | --------------------------------------------------- | ------------------------------------ |
| event_id | string                                              | The unique ID of the server event.   |
| type     | The event type, must be`conversation.item.deleted`. |
| item_id  | string                                              | The ID of the item that was deleted. |

## RealtimeBetaServerEventConversationItemInputAudioTranscriptionCompleted

This event is the output of audio transcription for user audio written to the
user audio buffer. Transcription begins when the input audio buffer is
committed by the client or server (in `server_vad`mode). Transcription runs
asynchronously with Response creation, so this event may come before or after
the Response events.

Realtime API models accept audio natively, and thus input transcription is a
separate process run on a separate ASR (Automatic Speech Recognition) model.
The transcript may diverge somewhat from the model's interpretation, and
should be treated as a rough guide.

| Field         | Type    | Description                                           |
| ------------- | ------- | ----------------------------------------------------- |
| event_id      | string  | The unique ID of the server event.                    |
| type          | string  | The event type, must be                               | `conversation.item.input_audio_transcription.completed`. |
|               |
| item_id       | string  | The ID of the user message item containing the audio. |
| content_index | integer | The index of the content part containing the audio.   |
| transcript    | string  | The transcribed text.                                 |
| logprobs      |
| usage         | object  | Usage statistics for the transcription.               |

## RealtimeBetaServerEventConversationItemInputAudioTranscriptionDelta

Returned when the text value of an input audio transcription content part is updated.

| Field         | Type                                                                         | Description                                                |
| ------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                                       | The unique ID of the server event.                         |
| type          | The event type, must be `conversation.item.input_audio_transcription.delta`. |
| item_id       | string                                                                       | The ID of the item.                                        |
| content_index | integer                                                                      | The index of the content part in the item's content array. |
| delta         | string                                                                       | The text delta.                                            |
| logprobs      |

## RealtimeBetaServerEventConversationItemInputAudioTranscriptionFailed

Returned when input audio transcription is configured, and a transcription
request for a user message failed. These events are separate from other
`error`events so that the client can identify the related Item.

| Field         | Type    | Description                                         |
| ------------- | ------- | --------------------------------------------------- |
| event_id      | string  | The unique ID of the server event.                  |
| type          | string  | The event type, must be                             | `conversation.item.input_audio_transcription.failed`. |
|               |
| item_id       | string  | The ID of the user message item.                    |
| content_index | integer | The index of the content part containing the audio. |
| error         | object  | Details of the transcription error.                 |

## RealtimeBetaServerEventConversationItemInputAudioTranscriptionSegment

Returned when an input audio transcription segment is identified for an item.

| Field         | Type                                                                           | Description                                                |
| ------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| event_id      | string                                                                         | The unique ID of the server event.                         |
| type          | The event type, must be `conversation.item.input_audio_transcription.segment`. |
| item_id       | string                                                                         | The ID of the item containing the input audio content.     |
| content_index | integer                                                                        | The index of the input audio content part within the item. |
| text          | string                                                                         | The text for this segment.                                 |
| id            | string                                                                         | The segment identifier.                                    |
| speaker       | string                                                                         | The detected speaker label for this segment.               |
| start         | number                                                                         | Start time of the segment in seconds.                      |
| end           | number                                                                         | End time of the segment in seconds.                        |

## RealtimeBetaServerEventConversationItemRetrieved

Returned when a conversation item is retrieved with `conversation.item.retrieve`.

| Field    | Type                                                   | Description                        |
| -------- | ------------------------------------------------------ | ---------------------------------- |
| event_id | string                                                 | The unique ID of the server event. |
| type     | The event type, must be `conversation.item.retrieved`. |
| item     |

## RealtimeBetaServerEventConversationItemTruncated

Returned when an earlier assistant audio message item is truncated by the
client with a `conversation.item.truncate`event. This event is used to
synchronize the server's understanding of the audio with the client's playback.

This action will truncate the audio and remove the server-side text transcript
to ensure there is no text in the context that hasn't been heard by the user.

| Field         | Type                                                  | Description                                                        |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| event_id      | string                                                | The unique ID of the server event.                                 |
| type          | The event type, must be`conversation.item.truncated`. |
| item_id       | string                                                | The ID of the assistant message item that was truncated.           |
| content_index | integer                                               | The index of the content part that was truncated.                  |
| audio_end_ms  | integer                                               | The duration up to which the audio was truncated, in milliseconds. |

## RealtimeBetaServerEventError

Returned when an error occurs, which could be a client problem or a server
problem. Most errors are recoverable and the session will stay open, we
recommend to implementors to monitor and log error messages by default.

| Field    | Type                             | Description                        |
| -------- | -------------------------------- | ---------------------------------- |
| event_id | string                           | The unique ID of the server event. |
| type     | The event type, must be `error`. |
| error    | object                           | Details of the error.              |

## RealtimeBetaServerEventInputAudioBufferCleared

Returned when the input audio buffer is cleared by the client with a
`input_audio_buffer.clear`event.

| Field    | Type                                                 | Description                        |
| -------- | ---------------------------------------------------- | ---------------------------------- |
| event_id | string                                               | The unique ID of the server event. |
| type     | The event type, must be`input_audio_buffer.cleared`. |

## RealtimeBetaServerEventInputAudioBufferCommitted

Returned when an input audio buffer is committed, either by the client or
automatically in server VAD mode. The `item_id`property is the ID of the user
message item that will be created, thus a`conversation.item.created`event
will also be sent to the client.

| Field            | Type                                                   | Description                                           |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| event_id         | string                                                 | The unique ID of the server event.                    |
| type             | The event type, must be`input_audio_buffer.committed`. |
| previous_item_id |
| item_id          | string                                                 | The ID of the user message item that will be created. |

## RealtimeBetaServerEventInputAudioBufferSpeechStarted

Sent by the server when in `server_vad`mode to indicate that speech has been
detected in the audio buffer. This can happen any time audio is added to the
buffer (unless speech is already detected). The client may want to use this
event to interrupt audio playback or provide visual feedback to the user.

The client should expect to receive a`input_audio_buffer.speech_stopped`event
when speech stops. The`item_id`property is the ID of the user message item
that will be created when speech stops and will also be included in the`input_audio_buffer.speech_stopped`event (unless the client manually commits
the audio buffer during VAD activation).

| Field          | Type                                                        | Description                                                               |
| -------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| event_id       | string                                                      | The unique ID of the server event.                                        |
| type           | The event type, must be`input_audio_buffer.speech_started`. |
| audio_start_ms | integer                                                     | Milliseconds from the start of all audio written to the buffer during the |
session when speech was first detected. This will correspond to the
beginning of audio sent to the model, and thus includes the
`prefix_padding_ms`configured in the Session.
 |
| item_id | string | The ID of the user message item that will be created when speech stops.
 |

## RealtimeBetaServerEventInputAudioBufferSpeechStopped

Returned in`server_vad`mode when the server detects the end of speech in
the audio buffer. The server will also send an`conversation.item.created`event with the user message item that is created from the audio buffer.

| Field        | Type                                                        | Description                                                           |
| ------------ | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| event_id     | string                                                      | The unique ID of the server event.                                    |
| type         | The event type, must be`input_audio_buffer.speech_stopped`. |
| audio_end_ms | integer                                                     | Milliseconds since the session started when speech stopped. This will |
correspond to the end of audio sent to the model, and thus includes the
`min_silence_duration_ms`configured in the Session.
 |
| item_id | string | The ID of the user message item that will be created. |

## RealtimeBetaServerEventMCPListToolsCompleted

Returned when listing MCP tools has completed for an item.

| Field    | Type                                               | Description                        |
| -------- | -------------------------------------------------- | ---------------------------------- |
| event_id | string                                             | The unique ID of the server event. |
| type     | The event type, must be`mcp_list_tools.completed`. |
| item_id  | string                                             | The ID of the MCP list tools item. |

## RealtimeBetaServerEventMCPListToolsFailed

Returned when listing MCP tools has failed for an item.

| Field    | Type                                             | Description                        |
| -------- | ------------------------------------------------ | ---------------------------------- |
| event_id | string                                           | The unique ID of the server event. |
| type     | The event type, must be `mcp_list_tools.failed`. |
| item_id  | string                                           | The ID of the MCP list tools item. |

## RealtimeBetaServerEventMCPListToolsInProgress

Returned when listing MCP tools is in progress for an item.

| Field    | Type                                                  | Description                        |
| -------- | ----------------------------------------------------- | ---------------------------------- |
| event_id | string                                                | The unique ID of the server event. |
| type     | The event type, must be `mcp_list_tools.in_progress`. |
| item_id  | string                                                | The ID of the MCP list tools item. |

## RealtimeBetaServerEventRateLimitsUpdated

Emitted at the beginning of a Response to indicate the updated rate limits.
When a Response is created some tokens will be "reserved" for the output
tokens, the rate limits shown here reflect that reservation, which is then
adjusted accordingly once the Response is completed.

| Field       | Type                                           | Description                        |
| ----------- | ---------------------------------------------- | ---------------------------------- |
| event_id    | string                                         | The unique ID of the server event. |
| type        | The event type, must be `rate_limits.updated`. |
| rate_limits | array                                          | List of rate limit information.    |

## RealtimeBetaServerEventResponseAudioDelta

Returned when the model-generated audio is updated.

| Field         | Type                                                   | Description                                                |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| event_id      | string                                                 | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_audio.delta`. |
| response_id   | string                                                 | The ID of the response.                                    |
| item_id       | string                                                 | The ID of the item.                                        |
| output_index  | integer                                                | The index of the output item in the response.              |
| content_index | integer                                                | The index of the content part in the item's content array. |
| delta         | string                                                 | Base64-encoded audio data delta.                           |

## RealtimeBetaServerEventResponseAudioDone

Returned when the model-generated audio is done. Also emitted when a Response
is interrupted, incomplete, or cancelled.

| Field         | Type                                                  | Description                                                |
| ------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_audio.done`. |
| response_id   | string                                                | The ID of the response.                                    |
| item_id       | string                                                | The ID of the item.                                        |
| output_index  | integer                                               | The index of the output item in the response.              |
| content_index | integer                                               | The index of the content part in the item's content array. |

## RealtimeBetaServerEventResponseAudioTranscriptDelta

Returned when the model-generated transcription of audio output is updated.

| Field         | Type                                                              | Description                                                |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                            | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_audio_transcript.delta`. |
| response_id   | string                                                            | The ID of the response.                                    |
| item_id       | string                                                            | The ID of the item.                                        |
| output_index  | integer                                                           | The index of the output item in the response.              |
| content_index | integer                                                           | The index of the content part in the item's content array. |
| delta         | string                                                            | The transcript delta.                                      |

## RealtimeBetaServerEventResponseAudioTranscriptDone

Returned when the model-generated transcription of audio output is done
streaming. Also emitted when a Response is interrupted, incomplete, or
cancelled.

| Field         | Type                                                             | Description                                                |
| ------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                           | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_audio_transcript.done`. |
| response_id   | string                                                           | The ID of the response.                                    |
| item_id       | string                                                           | The ID of the item.                                        |
| output_index  | integer                                                          | The index of the output item in the response.              |
| content_index | integer                                                          | The index of the content part in the item's content array. |
| transcript    | string                                                           | The final transcript of the audio.                         |

## RealtimeBetaServerEventResponseContentPartAdded

Returned when a new content part is added to an assistant message item during
response generation.

| Field         | Type                                                   | Description                                                |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| event_id      | string                                                 | The unique ID of the server event.                         |
| type          | The event type, must be `response.content_part.added`. |
| response_id   | string                                                 | The ID of the response.                                    |
| item_id       | string                                                 | The ID of the item to which the content part was added.    |
| output_index  | integer                                                | The index of the output item in the response.              |
| content_index | integer                                                | The index of the content part in the item's content array. |
| part          | object                                                 | The content part that was added.                           |

## RealtimeBetaServerEventResponseContentPartDone

Returned when a content part is done streaming in an assistant message item.
Also emitted when a Response is interrupted, incomplete, or cancelled.

| Field         | Type                                                  | Description                                                |
| ------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                | The unique ID of the server event.                         |
| type          | The event type, must be `response.content_part.done`. |
| response_id   | string                                                | The ID of the response.                                    |
| item_id       | string                                                | The ID of the item.                                        |
| output_index  | integer                                               | The index of the output item in the response.              |
| content_index | integer                                               | The index of the content part in the item's content array. |
| part          | object                                                | The content part that is done.                             |

## RealtimeBetaServerEventResponseCreated

Returned when a new Response is created. The first event of response creation,
where the response is in an initial state of `in_progress`.

| Field    | Type                                        | Description                        |
| -------- | ------------------------------------------- | ---------------------------------- |
| event_id | string                                      | The unique ID of the server event. |
| type     | The event type, must be `response.created`. |
| response |

## RealtimeBetaServerEventResponseDone

Returned when a Response is done streaming. Always emitted, no matter the
final state. The Response object included in the `response.done`event will
include all output Items in the Response but will omit the raw audio data.

| Field    | Type                                    | Description                        |
| -------- | --------------------------------------- | ---------------------------------- |
| event_id | string                                  | The unique ID of the server event. |
| type     | The event type, must be`response.done`. |
| response |

## RealtimeBetaServerEventResponseFunctionCallArgumentsDelta

Returned when the model-generated function call arguments are updated.

| Field        | Type                                                              | Description                                   |
| ------------ | ----------------------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                                            | The unique ID of the server event.            |
| type         | The event type, must be `response.function_call_arguments.delta`. |
| response_id  | string                                                            | The ID of the response.                       |
| item_id      | string                                                            | The ID of the function call item.             |
| output_index | integer                                                           | The index of the output item in the response. |
| call_id      | string                                                            | The ID of the function call.                  |
| delta        | string                                                            | The arguments delta as a JSON string.         |

## RealtimeBetaServerEventResponseFunctionCallArgumentsDone

Returned when the model-generated function call arguments are done streaming.
Also emitted when a Response is interrupted, incomplete, or cancelled.

| Field        | Type                                                             | Description                                   |
| ------------ | ---------------------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                                           | The unique ID of the server event.            |
| type         | The event type, must be `response.function_call_arguments.done`. |
| response_id  | string                                                           | The ID of the response.                       |
| item_id      | string                                                           | The ID of the function call item.             |
| output_index | integer                                                          | The index of the output item in the response. |
| call_id      | string                                                           | The ID of the function call.                  |
| arguments    | string                                                           | The final arguments as a JSON string.         |

## RealtimeBetaServerEventResponseMCPCallArgumentsDelta

Returned when MCP tool call arguments are updated during response generation.

| Field        | Type                                                         | Description                                   |
| ------------ | ------------------------------------------------------------ | --------------------------------------------- |
| event_id     | string                                                       | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call_arguments.delta`. |
| response_id  | string                                                       | The ID of the response.                       |
| item_id      | string                                                       | The ID of the MCP tool call item.             |
| output_index | integer                                                      | The index of the output item in the response. |
| delta        | string                                                       | The JSON-encoded arguments delta.             |
| obfuscation  |

## RealtimeBetaServerEventResponseMCPCallArgumentsDone

Returned when MCP tool call arguments are finalized during response generation.

| Field        | Type                                                        | Description                                   |
| ------------ | ----------------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                                      | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call_arguments.done`. |
| response_id  | string                                                      | The ID of the response.                       |
| item_id      | string                                                      | The ID of the MCP tool call item.             |
| output_index | integer                                                     | The index of the output item in the response. |
| arguments    | string                                                      | The final JSON-encoded arguments string.      |

## RealtimeBetaServerEventResponseMCPCallCompleted

Returned when an MCP tool call has completed successfully.

| Field        | Type                                                   | Description                                   |
| ------------ | ------------------------------------------------------ | --------------------------------------------- |
| event_id     | string                                                 | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call.completed`. |
| output_index | integer                                                | The index of the output item in the response. |
| item_id      | string                                                 | The ID of the MCP tool call item.             |

## RealtimeBetaServerEventResponseMCPCallFailed

Returned when an MCP tool call has failed.

| Field        | Type                                                | Description                                   |
| ------------ | --------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                              | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call.failed`. |
| output_index | integer                                             | The index of the output item in the response. |
| item_id      | string                                              | The ID of the MCP tool call item.             |

## RealtimeBetaServerEventResponseMCPCallInProgress

Returned when an MCP tool call has started and is in progress.

| Field        | Type                                                     | Description                                   |
| ------------ | -------------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                                   | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call.in_progress`. |
| output_index | integer                                                  | The index of the output item in the response. |
| item_id      | string                                                   | The ID of the MCP tool call item.             |

## RealtimeBetaServerEventResponseOutputItemAdded

Returned when a new Item is created during Response generation.

| Field        | Type                                                  | Description                                       |
| ------------ | ----------------------------------------------------- | ------------------------------------------------- |
| event_id     | string                                                | The unique ID of the server event.                |
| type         | The event type, must be `response.output_item.added`. |
| response_id  | string                                                | The ID of the Response to which the item belongs. |
| output_index | integer                                               | The index of the output item in the Response.     |
| item         |

## RealtimeBetaServerEventResponseOutputItemDone

Returned when an Item is done streaming. Also emitted when a Response is
interrupted, incomplete, or cancelled.

| Field        | Type                                                 | Description                                       |
| ------------ | ---------------------------------------------------- | ------------------------------------------------- |
| event_id     | string                                               | The unique ID of the server event.                |
| type         | The event type, must be `response.output_item.done`. |
| response_id  | string                                               | The ID of the Response to which the item belongs. |
| output_index | integer                                              | The index of the output item in the Response.     |
| item         |

## RealtimeBetaServerEventResponseTextDelta

Returned when the text value of an "output_text" content part is updated.

| Field         | Type                                                  | Description                                                |
| ------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_text.delta`. |
| response_id   | string                                                | The ID of the response.                                    |
| item_id       | string                                                | The ID of the item.                                        |
| output_index  | integer                                               | The index of the output item in the response.              |
| content_index | integer                                               | The index of the content part in the item's content array. |
| delta         | string                                                | The text delta.                                            |

## RealtimeBetaServerEventResponseTextDone

Returned when the text value of an "output_text" content part is done streaming. Also
emitted when a Response is interrupted, incomplete, or cancelled.

| Field         | Type                                                 | Description                                                |
| ------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                               | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_text.done`. |
| response_id   | string                                               | The ID of the response.                                    |
| item_id       | string                                               | The ID of the item.                                        |
| output_index  | integer                                              | The index of the output item in the response.              |
| content_index | integer                                              | The index of the content part in the item's content array. |
| text          | string                                               | The final text content.                                    |

## RealtimeBetaServerEventSessionCreated

Returned when a Session is created. Emitted automatically when a new
connection is established as the first server event. This event will contain
the default Session configuration.

| Field    | Type                                       | Description                        |
| -------- | ------------------------------------------ | ---------------------------------- |
| event_id | string                                     | The unique ID of the server event. |
| type     | The event type, must be `session.created`. |
| session  |

## RealtimeBetaServerEventSessionUpdated

Returned when a session is updated with a `session.update`event, unless
there is an error.

| Field    | Type                                      | Description                        |
| -------- | ----------------------------------------- | ---------------------------------- |
| event_id | string                                    | The unique ID of the server event. |
| type     | The event type, must be`session.updated`. |
| session  |

## RealtimeBetaServerEventTranscriptionSessionCreated

Returned when a transcription session is created.

| Field    | Type                                                     | Description                        |
| -------- | -------------------------------------------------------- | ---------------------------------- |
| event_id | string                                                   | The unique ID of the server event. |
| type     | The event type, must be `transcription_session.created`. |
| session  |

## RealtimeBetaServerEventTranscriptionSessionUpdated

Returned when a transcription session is updated with a `transcription_session.update`event, unless
there is an error.

| Field    | Type                                                    | Description                        |
| -------- | ------------------------------------------------------- | ---------------------------------- |
| event_id | string                                                  | The unique ID of the server event. |
| type     | The event type, must be`transcription_session.updated`. |
| session  |

## RealtimeCallCreateRequest

Parameters required to initiate a realtime call and receive the SDP answer
needed to complete a WebRTC peer connection. Provide an SDP offer generated
by your client and optionally configure the session that will answer the call.

| Field   | Type                                                                   | Description                                                              |
| ------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| sdp     | string                                                                 | WebRTC Session Description Protocol (SDP) offer generated by the caller. |
| session | Optional session configuration to apply before the realtime session is |
created. Use the same parameters you would send in a [`create client secret`](https://platform.openai.com/docs/api-reference/realtime-sessions/create-realtime-client-secret)
request. |

## RealtimeCallReferRequest

Parameters required to transfer a SIP call to a new destination using the
Realtime API.

| Field                                        | Type   | Description                                                             |
| -------------------------------------------- | ------ | ----------------------------------------------------------------------- |
| target_uri                                   | string | URI that should appear in the SIP Refer-To header. Supports values like |
| `tel:+14155550123`or`sip:agent@example.com`. |

## RealtimeCallRejectRequest

Parameters used to decline an incoming SIP call handled by the Realtime API.

| Field         | Type    | Description                                                              |
| ------------- | ------- | ------------------------------------------------------------------------ |
| status_code   | integer | SIP response code to send back to the caller. Defaults to `603`(Decline) |
| when omitted. |

## RealtimeClientEvent

A realtime client event.

## RealtimeClientEventConversationItemCreate

Add a new Item to the Conversation's context, including messages, function
calls, and function call responses. This event can be used both to populate a
"history" of the conversation and to add new items mid-stream, but has the
current limitation that it cannot populate assistant audio messages.

If successful, the server will respond with a`conversation.item.created`event, otherwise an`error`event will be sent.

| Field            | Type                                               | Description                                                             |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| event_id         | string                                             | Optional client-generated ID used to identify this event.               |
| type             | The event type, must be`conversation.item.create`. |
| previous_item_id | string                                             | The ID of the preceding item after which the new item will be inserted. |
If not set, the new item will be appended to the end of the conversation.
If set to `root`, the new item will be added to the beginning of the conversation.
If set to an existing ID, it allows an item to be inserted mid-conversation. If the
ID cannot be found, an error will be returned and the item will not be added.
 |
| item |

## RealtimeClientEventConversationItemDelete

Send this event when you want to remove any item from the conversation
history. The server will respond with a `conversation.item.deleted`event,
unless the item does not exist in the conversation history, in which case the
server will respond with an error.

| Field    | Type                                               | Description                                               |
| -------- | -------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                             | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`conversation.item.delete`. |
| item_id  | string                                             | The ID of the item to delete.                             |

## RealtimeClientEventConversationItemRetrieve

Send this event when you want to retrieve the server's representation of a specific item in the conversation history. This is useful, for example, to inspect user audio after noise cancellation and VAD.
The server will respond with a `conversation.item.retrieved`event,
unless the item does not exist in the conversation history, in which case the
server will respond with an error.

| Field    | Type                                                 | Description                                               |
| -------- | ---------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                               | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`conversation.item.retrieve`. |
| item_id  | string                                               | The ID of the item to retrieve.                           |

## RealtimeClientEventConversationItemTruncate

Send this event to truncate a previous assistant message’s audio. The server
will produce audio faster than realtime, so this event is useful when the user
interrupts to truncate audio that has already been sent to the client but not
yet played. This will synchronize the server's understanding of the audio with
the client's playback.

Truncating audio will delete the server-side text transcript to ensure there
is not text in the context that hasn't been heard by the user.

If successful, the server will respond with a `conversation.item.truncated`event.

| Field    | Type                                                 | Description                                                              |
| -------- | ---------------------------------------------------- | ------------------------------------------------------------------------ |
| event_id | string                                               | Optional client-generated ID used to identify this event.                |
| type     | The event type, must be`conversation.item.truncate`. |
| item_id  | string                                               | The ID of the assistant message item to truncate. Only assistant message |
items can be truncated.
 |
| content_index | integer | The index of the content part to truncate. Set this to `0`. |
| audio_end_ms | integer | Inclusive duration up to which audio is truncated, in milliseconds. If
the audio_end_ms is greater than the actual audio duration, the server
will respond with an error.
 |

## RealtimeClientEventInputAudioBufferAppend

Send this event to append audio bytes to the input audio buffer. The audio
buffer is temporary storage you can write to and later commit. A "commit" will create a new
user message item in the conversation history from the buffer content and clear the buffer.
Input audio transcription (if enabled) will be generated when the buffer is committed.

If VAD is enabled the audio buffer is used to detect speech and the server will decide
when to commit. When Server VAD is disabled, you must commit the audio buffer
manually. Input audio noise reduction operates on writes to the audio buffer.

The client may choose how much audio to place in each event up to a maximum
of 15 MiB, for example streaming smaller chunks from the client may allow the
VAD to be more responsive. Unlike most other client events, the server will
not send a confirmation response to this event.

| Field    | Type                                                 | Description                                                             |
| -------- | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| event_id | string                                               | Optional client-generated ID used to identify this event.               |
| type     | The event type, must be `input_audio_buffer.append`. |
| audio    | string                                               | Base64-encoded audio bytes. This must be in the format specified by the |
`input_audio_format`field in the session configuration.
 |

## RealtimeClientEventInputAudioBufferClear

Send this event to clear the audio bytes in the buffer. The server will
respond with an`input_audio_buffer.cleared`event.

| Field    | Type                                               | Description                                               |
| -------- | -------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                             | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`input_audio_buffer.clear`. |

## RealtimeClientEventInputAudioBufferCommit

Send this event to commit the user input audio buffer, which will create a  new user message item in the conversation. This event will produce an error  if the input audio buffer is empty. When in Server VAD mode, the client does  not need to send this event, the server will commit the audio buffer  automatically.

Committing the input audio buffer will trigger input audio transcription  (if enabled in session configuration), but it will not create a response  from the model. The server will respond with an `input_audio_buffer.committed`event.

| Field    | Type                                                | Description                                               |
| -------- | --------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                              | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`input_audio_buffer.commit`. |

## RealtimeClientEventOutputAudioBufferClear

**WebRTC Only:** Emit to cut off the current audio response. This will trigger the server to
stop generating audio and emit a `output_audio_buffer.cleared`event. This
event should be preceded by a`response.cancel`client event to stop the
generation of the current response.
[Learn more](https://platform.openai.com/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).

| Field    | Type                                                | Description                                                |
| -------- | --------------------------------------------------- | ---------------------------------------------------------- |
| event_id | string                                              | The unique ID of the client event used for error handling. |
| type     | The event type, must be`output_audio_buffer.clear`. |

## RealtimeClientEventResponseCancel

Send this event to cancel an in-progress response. The server will respond
with a `response.done`event with a status of`response.status=cancelled`. If
there is no response to cancel, the server will respond with an error. It's safe
to call `response.cancel`even if no response is in progress, an error will be
returned the session will remain unaffected.

| Field       | Type                                      | Description                                                        |
| ----------- | ----------------------------------------- | ------------------------------------------------------------------ |
| event_id    | string                                    | Optional client-generated ID used to identify this event.          |
| type        | The event type, must be`response.cancel`. |
| response_id | string                                    | A specific response ID to cancel - if not provided, will cancel an |
in-progress response in the default conversation.
 |

## RealtimeClientEventResponseCreate

This event instructs the server to create a Response, which means triggering
model inference. When in Server VAD mode, the server will create Responses
automatically.

A Response will include at least one Item, and may have two, in which case
the second will be a function call. These Items will be appended to the
conversation history by default.

The server will respond with a `response.created`event, events for Items
and content created, and finally a`response.done`event to indicate the
Response is complete.

The`response.create`event includes inference configuration like`instructions`and`tools`. If these are set, they will override the Session's
configuration for this Response only.

Responses can be created out-of-band of the default Conversation, meaning that they can
have arbitrary input, and it's possible to disable writing the output to the Conversation.
Only one Response can write to the default Conversation at a time, but otherwise multiple
Responses can be created in parallel. The `metadata`field is a good way to disambiguate
multiple simultaneous Responses.

Clients can set`conversation`to`none`to create a Response that does not write to the default
Conversation. Arbitrary input can be provided with the`input`field, which is an array accepting
raw Items and references to existing Items.

| Field    | Type                                      | Description                                               |
| -------- | ----------------------------------------- | --------------------------------------------------------- |
| event_id | string                                    | Optional client-generated ID used to identify this event. |
| type     | The event type, must be`response.create`. |
| response |

## RealtimeClientEventSessionUpdate

Send this event to update the session’s configuration.
The client may send this event at any time to update any field
except for `voice`and`model`. `voice`can be updated only if there have been no other audio outputs yet.

When the server receives a`session.update`, it will respond
with a `session.updated`event showing the full, effective configuration.
Only the fields that are present in the`session.update`are updated. To clear a field like`instructions`, pass an empty string. To clear a field like `tools`, pass an empty array.
To clear a field like `turn_detection`, pass `null`.

| Field    | Type                                     | Description                                                                                                                                                                                                                                   |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event_id | string                                   | Optional client-generated ID used to identify this event. This is an arbitrary string that a client may assign. It will be passed back if there is an error with the event, but the corresponding `session.updated`event will not include it. |
| type     | The event type, must be`session.update`. |
| session  | object                                   | Update the Realtime session. Choose either a realtime                                                                                                                                                                                         |
session or a transcription session.
 |

## RealtimeClientEventTranscriptionSessionUpdate

Send this event to update a transcription session.

| Field    | Type                                                    | Description                                               |
| -------- | ------------------------------------------------------- | --------------------------------------------------------- |
| event_id | string                                                  | Optional client-generated ID used to identify this event. |
| type     | The event type, must be `transcription_session.update`. |
| session  |

## RealtimeConversationItem

A single item within a Realtime conversation.

## RealtimeConversationItemFunctionCall

A function call item in a Realtime conversation.

| Field     | Type   | Description                                                                                                                                                        |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id        | string | The unique ID of the item. This may be provided by the client or generated by the server.                                                                          |
| object    | string | Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item.                                                          |
| type      | string | The type of the item. Always `function_call`.                                                                                                                      |
| status    | string | The status of the item. Has no effect on the conversation.                                                                                                         |
| call_id   | string | The ID of the function call.                                                                                                                                       |
| name      | string | The name of the function being called.                                                                                                                             |
| arguments | string | The arguments of the function call. This is a JSON-encoded string representing the arguments passed to the function, for example `{"arg1": "value1", "arg2": 42}`. |

## RealtimeConversationItemFunctionCallOutput

A function call output item in a Realtime conversation.

| Field   | Type   | Description                                                                                               |
| ------- | ------ | --------------------------------------------------------------------------------------------------------- |
| id      | string | The unique ID of the item. This may be provided by the client or generated by the server.                 |
| object  | string | Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. |
| type    | string | The type of the item. Always `function_call_output`.                                                      |
| status  | string | The status of the item. Has no effect on the conversation.                                                |
| call_id | string | The ID of the function call this output is for.                                                           |
| output  | string | The output of the function call, this is free text and can contain any information or simply be empty.    |

## RealtimeConversationItemMessageAssistant

An assistant message item in a Realtime conversation.

| Field   | Type   | Description                                                                                               |
| ------- | ------ | --------------------------------------------------------------------------------------------------------- |
| id      | string | The unique ID of the item. This may be provided by the client or generated by the server.                 |
| object  | string | Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. |
| type    | string | The type of the item. Always `message`.                                                                   |
| status  | string | The status of the item. Has no effect on the conversation.                                                |
| role    | string | The role of the message sender. Always `assistant`.                                                       |
| content | array  | The content of the message.                                                                               |

## RealtimeConversationItemMessageSystem

A system message in a Realtime conversation can be used to provide additional context or instructions to the model. This is similar but distinct from the instruction prompt provided at the start of a conversation, as system messages can be added at any point in the conversation. For major changes to the conversation's behavior, use instructions, but for smaller updates (e.g. "the user is now asking about a different topic"), use system messages.

| Field   | Type   | Description                                                                                               |
| ------- | ------ | --------------------------------------------------------------------------------------------------------- |
| id      | string | The unique ID of the item. This may be provided by the client or generated by the server.                 |
| object  | string | Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. |
| type    | string | The type of the item. Always `message`.                                                                   |
| status  | string | The status of the item. Has no effect on the conversation.                                                |
| role    | string | The role of the message sender. Always `system`.                                                          |
| content | array  | The content of the message.                                                                               |

## RealtimeConversationItemMessageUser

A user message item in a Realtime conversation.

| Field   | Type   | Description                                                                                               |
| ------- | ------ | --------------------------------------------------------------------------------------------------------- |
| id      | string | The unique ID of the item. This may be provided by the client or generated by the server.                 |
| object  | string | Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item. |
| type    | string | The type of the item. Always `message`.                                                                   |
| status  | string | The status of the item. Has no effect on the conversation.                                                |
| role    | string | The role of the message sender. Always `user`.                                                            |
| content | array  | The content of the message.                                                                               |

## RealtimeConversationItemWithReference

The item to add to the conversation.

| Field | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| id    | string | For an item of type (`message` | `function_call` | `function_call_output`) |
this field allows the client to assign the unique ID of the item. It is
not required because the server will generate one if not provided.

For an item of type `item_reference`, this field is required and is a
reference to any item that has previously existed in the conversation.
 |
| type | string | The type of the item (`message`, `function_call`, `function_call_output`, `item_reference`).
 |
| object | string | Identifier for the API object being returned - always `realtime.item`.
 |
| status | string | The status of the item (`completed`, `incomplete`, `in_progress`). These have no effect
on the conversation, but are accepted for consistency with the
`conversation.item.created` event.
 |
| role | string | The role of the message sender (`user`, `assistant`, `system`), only
applicable for `message`items.
 |
| content | array | The content of the message, applicable for`message`items.

- Message items of role`system`support only`input_text`content
- Message items of role`user`support`input_text`and`input_audio`content
- Message items of role`assistant`support`text`content.
 |
| call_id | string | The ID of the function call (for`function_call`and`function_call_output`items). If passed on a`function_call_output`item, the server will check that a`function_call`item with the same
ID exists in the conversation history.
 |
| name | string | The name of the function being called (for`function_call`items).
 |
| arguments | string | The arguments of the function call (for`function_call`items).
 |
| output | string | The output of the function call (for`function_call_output`items).
 |

## RealtimeCreateClientSecretRequest

Create a session and client secret for the Realtime API. The request can specify
either a realtime or a transcription session configuration.
[Learn more about the Realtime API](https://platform.openai.com/docs/guides/realtime).

| Field         | Type   | Description                                                                               |
| ------------- | ------ | ----------------------------------------------------------------------------------------- |
| expires_after | object | Configuration for the client secret expiration. Expiration refers to the time after which |
a client secret will no longer be valid for creating sessions. The session itself may
continue after that time once started. A secret can be used to create multiple sessions
until it expires.
 |
| session |  | Session configuration to use for the client secret. Choose either a realtime
session or a transcription session.
 |

## RealtimeCreateClientSecretResponse

Response from creating a session and client secret for the Realtime API.

| Field      | Type                                                                      | Description                                                         |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| value      | string                                                                    | The generated client secret value.                                  |
| expires_at | integer                                                                   | Expiration timestamp for the client secret, in seconds since epoch. |
| session    | The session configuration for either a realtime or transcription session. |

## RealtimeFunctionTool

| Field       | Type   | Description                                                         |
| ----------- | ------ | ------------------------------------------------------------------- |
| type        | string | The type of the tool, i.e.`function`.                               |
| name        | string | The name of the function.                                           |
| description | string | The description of the function, including guidance on when and how |
to call it, and guidance about what to tell the user when calling
(if anything).
 |
| parameters | object | Parameters of the function in JSON Schema. |

## RealtimeMCPApprovalRequest

A Realtime item requesting human approval of a tool invocation.

| Field        | Type   | Description                                          |
| ------------ | ------ | ---------------------------------------------------- |
| type         | string | The type of the item. Always `mcp_approval_request`. |
| id           | string | The unique ID of the approval request.               |
| server_label | string | The label of the MCP server making the request.      |
| name         | string | The name of the tool to run.                         |
| arguments    | string | A JSON string of arguments for the tool.             |

## RealtimeMCPApprovalResponse

A Realtime item responding to an MCP approval request.

| Field               | Type    | Description                                           |
| ------------------- | ------- | ----------------------------------------------------- |
| type                | string  | The type of the item. Always `mcp_approval_response`. |
| id                  | string  | The unique ID of the approval response.               |
| approval_request_id | string  | The ID of the approval request being answered.        |
| approve             | boolean | Whether the request was approved.                     |
| reason              |

## RealtimeMCPHTTPError

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| type    | string  |
| code    | integer |
| message | string  |

## RealtimeMCPListTools

A Realtime item listing tools available on an MCP server.

| Field        | Type   | Description                                    |
| ------------ | ------ | ---------------------------------------------- |
| type         | string | The type of the item. Always `mcp_list_tools`. |
| id           | string | The unique ID of the list.                     |
| server_label | string | The label of the MCP server.                   |
| tools        | array  | The tools available on the server.             |

## RealtimeMCPProtocolError

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| type    | string  |
| code    | integer |
| message | string  |

## RealtimeMCPToolCall

A Realtime item representing an invocation of a tool on an MCP server.

| Field               | Type   | Description                                        |
| ------------------- | ------ | -------------------------------------------------- |
| type                | string | The type of the item. Always `mcp_call`.           |
| id                  | string | The unique ID of the tool call.                    |
| server_label        | string | The label of the MCP server running the tool.      |
| name                | string | The name of the tool that was run.                 |
| arguments           | string | A JSON string of the arguments passed to the tool. |
| approval_request_id |
| output              |
| error               |

## RealtimeMCPToolExecutionError

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| type    | string |
| message | string |

## RealtimeResponse

The response resource.

| Field  | Type                                          | Description                                                              |
| ------ | --------------------------------------------- | ------------------------------------------------------------------------ |
| id     | string                                        | The unique ID of the response, will look like `resp_1234`.               |
| object | The object type, must be `realtime.response`. |
| status | string                                        | The final status of the response (`completed`, `cancelled`, `failed`, or |
`incomplete`, `in_progress`).
 |
| status_details | object | Additional details about the status. |
| output | array | The list of output items generated by the response. |
| metadata |
| audio | object | Configuration for audio output. |
| usage | object | Usage statistics for the Response, this will correspond to billing. A
Realtime API session will maintain a conversation context and append new
Items to the Conversation, thus output from previous turns (text and
audio tokens) will become the input for later turns.
 |
| conversation_id | string | Which conversation the response is added to, determined by the `conversation`field in the`response.create`event. If`auto`, the response will be added to
the default conversation and the value of `conversation_id`will be an id like`conv_1234`. If `none`, the response will not be added to any conversation and
the value of `conversation_id`will be`null`. If responses are being triggered
automatically by VAD the response will be added to the default conversation
 |
| output_modalities | array | The set of modalities the model used to respond, currently the only possible values are
`[\"audio\"]`, `[\"text\"]`. Audio output always include a text transcript. Setting the
output to mode `text`will disable audio output from the model.
 |
| max_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls, that was used in this response.
 |

## RealtimeResponseCreateParams

Create a new Realtime response with these parameters

| Field             | Type  | Description                                                                             |
| ----------------- | ----- | --------------------------------------------------------------------------------------- |
| output_modalities | array | The set of modalities the model used to respond, currently the only possible values are | `[\"audio\"]`, `[\"text\"]`. Audio output always include a text transcript. Setting the |
output to mode `text`will disable audio output from the model.
 |
| instructions | string | The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.
Note that the server sets default instructions which will be used if this field is not set and are visible in the`session.created`event at the start of the session.
 |
| audio | object | Configuration for audio input and output. |
| tools | array | Tools available to the model. |
| tool_choice |  | How the model chooses tools. Provide one of the string modes or force a specific
function/MCP tool.
 |
| max_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls. Provide an integer between 1 and 4096 to
limit output tokens, or`inf`for the maximum available tokens for a
given model. Defaults to`inf`.
 |
| conversation |  | Controls which conversation the response is added to. Currently supports
`auto`and`none`, with `auto`as the default value. The`auto`value
means that the contents of the response will be added to the default
conversation. Set this to`none`to create an out-of-band response which
will not add items to default conversation.
 |
| metadata |
| prompt |
| input | array | Input items to include in the prompt for the model. Using this field
creates a new context for this Response instead of using the default
conversation. An empty array`[]`will clear the context for this Response.
Note that this can include references to items that previously appeared in the session
using their id.
 |

## RealtimeServerEvent

A realtime server event.

## RealtimeServerEventConversationCreated

Returned when a conversation is created. Emitted right after session creation.

| Field        | Type                                           | Description                        |
| ------------ | ---------------------------------------------- | ---------------------------------- |
| event_id     | string                                         | The unique ID of the server event. |
| type         | The event type, must be`conversation.created`. |
| conversation | object                                         | The conversation resource.         |

## RealtimeServerEventConversationItemAdded

Sent by the server when an Item is added to the default Conversation. This can happen in several cases:

- When the client sends a `conversation.item.create`event.
- When the input audio buffer is committed. In this case the item will be a user message containing the audio from the buffer.
- When the model is generating a Response. In this case the`conversation.item.added`event will be sent when the model starts generating a specific Item, and thus it will not yet have any content (and`status`will be`in_progress`).

The event will include the full content of the Item (except when model is generating a Response) except for audio data, which can be retrieved separately with a `conversation.item.retrieve`event if necessary.

| Field            | Type                                              | Description                        |
| ---------------- | ------------------------------------------------- | ---------------------------------- |
| event_id         | string                                            | The unique ID of the server event. |
| type             | The event type, must be`conversation.item.added`. |
| previous_item_id |
| item             |

## RealtimeServerEventConversationItemCreated

Returned when a conversation item is created. There are several scenarios that produce this event:

- The server is generating a Response, which if successful will produce
    either one or two Items, which will be of type `message`(role`assistant`) or type `function_call`.
- The input audio buffer has been committed, either by the client or the
    server (in `server_vad`mode). The server will take the content of the
    input audio buffer and add it to a new user message Item.
- The client has sent a`conversation.item.create`event to add a new Item
    to the Conversation.

| Field            | Type                                                | Description                        |
| ---------------- | --------------------------------------------------- | ---------------------------------- |
| event_id         | string                                              | The unique ID of the server event. |
| type             | The event type, must be`conversation.item.created`. |
| previous_item_id |
| item             |

## RealtimeServerEventConversationItemDeleted

Returned when an item in the conversation is deleted by the client with a
`conversation.item.delete`event. This event is used to synchronize the
server's understanding of the conversation history with the client's view.

| Field    | Type                                                | Description                          |
| -------- | --------------------------------------------------- | ------------------------------------ |
| event_id | string                                              | The unique ID of the server event.   |
| type     | The event type, must be`conversation.item.deleted`. |
| item_id  | string                                              | The ID of the item that was deleted. |

## RealtimeServerEventConversationItemDone

Returned when a conversation item is finalized.

The event will include the full content of the Item except for audio data, which can be retrieved separately with a `conversation.item.retrieve`event if needed.

| Field            | Type                                             | Description                        |
| ---------------- | ------------------------------------------------ | ---------------------------------- |
| event_id         | string                                           | The unique ID of the server event. |
| type             | The event type, must be`conversation.item.done`. |
| previous_item_id |
| item             |

## RealtimeServerEventConversationItemInputAudioTranscriptionCompleted

This event is the output of audio transcription for user audio written to the
user audio buffer. Transcription begins when the input audio buffer is
committed by the client or server (when VAD is enabled). Transcription runs
asynchronously with Response creation, so this event may come before or after
the Response events.

Realtime API models accept audio natively, and thus input transcription is a
separate process run on a separate ASR (Automatic Speech Recognition) model.
The transcript may diverge somewhat from the model's interpretation, and
should be treated as a rough guide.

| Field    | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| event_id | string | The unique ID of the server event. |
| type     | string | The event type, must be            |
`conversation.item.input_audio_transcription.completed`.
 |
| item_id | string | The ID of the item containing the audio that is being transcribed. |
| content_index | integer | The index of the content part containing the audio. |
| transcript | string | The transcribed text. |
| logprobs |
| usage | object | Usage statistics for the transcription, this is billed according to the ASR model's pricing rather than the realtime model's pricing. |

## RealtimeServerEventConversationItemInputAudioTranscriptionDelta

Returned when the text value of an input audio transcription content part is updated with incremental transcription results.

| Field         | Type                                                                         | Description                                                        |
| ------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| event_id      | string                                                                       | The unique ID of the server event.                                 |
| type          | The event type, must be `conversation.item.input_audio_transcription.delta`. |
| item_id       | string                                                                       | The ID of the item containing the audio that is being transcribed. |
| content_index | integer                                                                      | The index of the content part in the item's content array.         |
| delta         | string                                                                       | The text delta.                                                    |
| logprobs      |

## RealtimeServerEventConversationItemInputAudioTranscriptionFailed

Returned when input audio transcription is configured, and a transcription
request for a user message failed. These events are separate from other
`error`events so that the client can identify the related Item.

| Field         | Type    | Description                                         |
| ------------- | ------- | --------------------------------------------------- |
| event_id      | string  | The unique ID of the server event.                  |
| type          | string  | The event type, must be                             | `conversation.item.input_audio_transcription.failed`. |
|               |
| item_id       | string  | The ID of the user message item.                    |
| content_index | integer | The index of the content part containing the audio. |
| error         | object  | Details of the transcription error.                 |

## RealtimeServerEventConversationItemInputAudioTranscriptionSegment

Returned when an input audio transcription segment is identified for an item.

| Field         | Type                                                                           | Description                                                |
| ------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| event_id      | string                                                                         | The unique ID of the server event.                         |
| type          | The event type, must be `conversation.item.input_audio_transcription.segment`. |
| item_id       | string                                                                         | The ID of the item containing the input audio content.     |
| content_index | integer                                                                        | The index of the input audio content part within the item. |
| text          | string                                                                         | The text for this segment.                                 |
| id            | string                                                                         | The segment identifier.                                    |
| speaker       | string                                                                         | The detected speaker label for this segment.               |
| start         | number                                                                         | Start time of the segment in seconds.                      |
| end           | number                                                                         | End time of the segment in seconds.                        |

## RealtimeServerEventConversationItemRetrieved

Returned when a conversation item is retrieved with `conversation.item.retrieve`. This is provided as a way to fetch the server's representation of an item, for example to get access to the post-processed audio data after noise cancellation and VAD. It includes the full content of the Item, including audio data.

| Field    | Type                                                   | Description                        |
| -------- | ------------------------------------------------------ | ---------------------------------- |
| event_id | string                                                 | The unique ID of the server event. |
| type     | The event type, must be `conversation.item.retrieved`. |
| item     |

## RealtimeServerEventConversationItemTruncated

Returned when an earlier assistant audio message item is truncated by the
client with a `conversation.item.truncate`event. This event is used to
synchronize the server's understanding of the audio with the client's playback.

This action will truncate the audio and remove the server-side text transcript
to ensure there is no text in the context that hasn't been heard by the user.

| Field         | Type                                                  | Description                                                        |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| event_id      | string                                                | The unique ID of the server event.                                 |
| type          | The event type, must be`conversation.item.truncated`. |
| item_id       | string                                                | The ID of the assistant message item that was truncated.           |
| content_index | integer                                               | The index of the content part that was truncated.                  |
| audio_end_ms  | integer                                               | The duration up to which the audio was truncated, in milliseconds. |

## RealtimeServerEventError

Returned when an error occurs, which could be a client problem or a server
problem. Most errors are recoverable and the session will stay open, we
recommend to implementors to monitor and log error messages by default.

| Field    | Type                             | Description                        |
| -------- | -------------------------------- | ---------------------------------- |
| event_id | string                           | The unique ID of the server event. |
| type     | The event type, must be `error`. |
| error    | object                           | Details of the error.              |

## RealtimeServerEventInputAudioBufferCleared

Returned when the input audio buffer is cleared by the client with a
`input_audio_buffer.clear`event.

| Field    | Type                                                 | Description                        |
| -------- | ---------------------------------------------------- | ---------------------------------- |
| event_id | string                                               | The unique ID of the server event. |
| type     | The event type, must be`input_audio_buffer.cleared`. |

## RealtimeServerEventInputAudioBufferCommitted

Returned when an input audio buffer is committed, either by the client or
automatically in server VAD mode. The `item_id`property is the ID of the user
message item that will be created, thus a`conversation.item.created`event
will also be sent to the client.

| Field            | Type                                                   | Description                                           |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| event_id         | string                                                 | The unique ID of the server event.                    |
| type             | The event type, must be`input_audio_buffer.committed`. |
| previous_item_id |
| item_id          | string                                                 | The ID of the user message item that will be created. |

## RealtimeServerEventInputAudioBufferSpeechStarted

Sent by the server when in `server_vad`mode to indicate that speech has been
detected in the audio buffer. This can happen any time audio is added to the
buffer (unless speech is already detected). The client may want to use this
event to interrupt audio playback or provide visual feedback to the user.

The client should expect to receive a`input_audio_buffer.speech_stopped`event
when speech stops. The`item_id`property is the ID of the user message item
that will be created when speech stops and will also be included in the`input_audio_buffer.speech_stopped`event (unless the client manually commits
the audio buffer during VAD activation).

| Field          | Type                                                        | Description                                                               |
| -------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| event_id       | string                                                      | The unique ID of the server event.                                        |
| type           | The event type, must be`input_audio_buffer.speech_started`. |
| audio_start_ms | integer                                                     | Milliseconds from the start of all audio written to the buffer during the |
session when speech was first detected. This will correspond to the
beginning of audio sent to the model, and thus includes the
`prefix_padding_ms`configured in the Session.
 |
| item_id | string | The ID of the user message item that will be created when speech stops.
 |

## RealtimeServerEventInputAudioBufferSpeechStopped

Returned in`server_vad`mode when the server detects the end of speech in
the audio buffer. The server will also send an`conversation.item.created`event with the user message item that is created from the audio buffer.

| Field        | Type                                                        | Description                                                           |
| ------------ | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| event_id     | string                                                      | The unique ID of the server event.                                    |
| type         | The event type, must be`input_audio_buffer.speech_stopped`. |
| audio_end_ms | integer                                                     | Milliseconds since the session started when speech stopped. This will |
correspond to the end of audio sent to the model, and thus includes the
`min_silence_duration_ms`configured in the Session.
 |
| item_id | string | The ID of the user message item that will be created. |

## RealtimeServerEventInputAudioBufferTimeoutTriggered

Returned when the Server VAD timeout is triggered for the input audio buffer. This is configured
with`idle_timeout_ms`in the`turn_detection`settings of the session, and it indicates that
there hasn't been any speech detected for the configured duration.

The`audio_start_ms`and`audio_end_ms`fields indicate the segment of audio after the last
model response up to the triggering time, as an offset from the beginning of audio written
to the input audio buffer. This means it demarcates the segment of audio that was silent and
the difference between the start and end values will roughly match the configured timeout.

The empty audio will be committed to the conversation as an`input_audio`item (there will be a`input_audio_buffer.committed`event) and a model response will be generated. There may be speech
that didn't trigger VAD but is still detected by the model, so the model may respond with
something relevant to the conversation or a prompt to continue speaking.

| Field          | Type                                                           | Description                                                                                                                |
| -------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| event_id       | string                                                         | The unique ID of the server event.                                                                                         |
| type           | The event type, must be`input_audio_buffer.timeout_triggered`. |
| audio_start_ms | integer                                                        | Millisecond offset of audio written to the input audio buffer that was after the playback time of the last model response. |
| audio_end_ms   | integer                                                        | Millisecond offset of audio written to the input audio buffer at the time the timeout was triggered.                       |
| item_id        | string                                                         | The ID of the item associated with this segment.                                                                           |

## RealtimeServerEventMCPListToolsCompleted

Returned when listing MCP tools has completed for an item.

| Field    | Type                                                | Description                        |
| -------- | --------------------------------------------------- | ---------------------------------- |
| event_id | string                                              | The unique ID of the server event. |
| type     | The event type, must be `mcp_list_tools.completed`. |
| item_id  | string                                              | The ID of the MCP list tools item. |

## RealtimeServerEventMCPListToolsFailed

Returned when listing MCP tools has failed for an item.

| Field    | Type                                             | Description                        |
| -------- | ------------------------------------------------ | ---------------------------------- |
| event_id | string                                           | The unique ID of the server event. |
| type     | The event type, must be `mcp_list_tools.failed`. |
| item_id  | string                                           | The ID of the MCP list tools item. |

## RealtimeServerEventMCPListToolsInProgress

Returned when listing MCP tools is in progress for an item.

| Field    | Type                                                  | Description                        |
| -------- | ----------------------------------------------------- | ---------------------------------- |
| event_id | string                                                | The unique ID of the server event. |
| type     | The event type, must be `mcp_list_tools.in_progress`. |
| item_id  | string                                                | The ID of the MCP list tools item. |

## RealtimeServerEventOutputAudioBufferCleared

**WebRTC Only:** Emitted when the output audio buffer is cleared. This happens either in VAD
mode when the user has interrupted (`input_audio_buffer.speech_started`),
or when the client has emitted the `output_audio_buffer.clear`event to manually
cut off the current audio response.
[Learn more](https://platform.openai.com/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).

| Field       | Type                                                  | Description                                            |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------ |
| event_id    | string                                                | The unique ID of the server event.                     |
| type        | The event type, must be`output_audio_buffer.cleared`. |
| response_id | string                                                | The unique ID of the response that produced the audio. |

## RealtimeServerEventOutputAudioBufferStarted

**WebRTC Only:** Emitted when the server begins streaming audio to the client. This event is
emitted after an audio content part has been added (`response.content_part.added`)
to the response.
[Learn more](https://platform.openai.com/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).

| Field       | Type                                                   | Description                                            |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------ |
| event_id    | string                                                 | The unique ID of the server event.                     |
| type        | The event type, must be `output_audio_buffer.started`. |
| response_id | string                                                 | The unique ID of the response that produced the audio. |

## RealtimeServerEventOutputAudioBufferStopped

**WebRTC Only:** Emitted when the output audio buffer has been completely drained on the server,
and no more audio is forthcoming. This event is emitted after the full response
data has been sent to the client (`response.done`).
[Learn more](https://platform.openai.com/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).

| Field       | Type                                                   | Description                                            |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------ |
| event_id    | string                                                 | The unique ID of the server event.                     |
| type        | The event type, must be `output_audio_buffer.stopped`. |
| response_id | string                                                 | The unique ID of the response that produced the audio. |

## RealtimeServerEventRateLimitsUpdated

Emitted at the beginning of a Response to indicate the updated rate limits.
When a Response is created some tokens will be "reserved" for the output
tokens, the rate limits shown here reflect that reservation, which is then
adjusted accordingly once the Response is completed.

| Field       | Type                                           | Description                        |
| ----------- | ---------------------------------------------- | ---------------------------------- |
| event_id    | string                                         | The unique ID of the server event. |
| type        | The event type, must be `rate_limits.updated`. |
| rate_limits | array                                          | List of rate limit information.    |

## RealtimeServerEventResponseAudioDelta

Returned when the model-generated audio is updated.

| Field         | Type                                                   | Description                                                |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| event_id      | string                                                 | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_audio.delta`. |
| response_id   | string                                                 | The ID of the response.                                    |
| item_id       | string                                                 | The ID of the item.                                        |
| output_index  | integer                                                | The index of the output item in the response.              |
| content_index | integer                                                | The index of the content part in the item's content array. |
| delta         | string                                                 | Base64-encoded audio data delta.                           |

## RealtimeServerEventResponseAudioDone

Returned when the model-generated audio is done. Also emitted when a Response
is interrupted, incomplete, or cancelled.

| Field         | Type                                                  | Description                                                |
| ------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_audio.done`. |
| response_id   | string                                                | The ID of the response.                                    |
| item_id       | string                                                | The ID of the item.                                        |
| output_index  | integer                                               | The index of the output item in the response.              |
| content_index | integer                                               | The index of the content part in the item's content array. |

## RealtimeServerEventResponseAudioTranscriptDelta

Returned when the model-generated transcription of audio output is updated.

| Field         | Type                                                              | Description                                                |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                            | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_audio_transcript.delta`. |
| response_id   | string                                                            | The ID of the response.                                    |
| item_id       | string                                                            | The ID of the item.                                        |
| output_index  | integer                                                           | The index of the output item in the response.              |
| content_index | integer                                                           | The index of the content part in the item's content array. |
| delta         | string                                                            | The transcript delta.                                      |

## RealtimeServerEventResponseAudioTranscriptDone

Returned when the model-generated transcription of audio output is done
streaming. Also emitted when a Response is interrupted, incomplete, or
cancelled.

| Field         | Type                                                             | Description                                                |
| ------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                           | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_audio_transcript.done`. |
| response_id   | string                                                           | The ID of the response.                                    |
| item_id       | string                                                           | The ID of the item.                                        |
| output_index  | integer                                                          | The index of the output item in the response.              |
| content_index | integer                                                          | The index of the content part in the item's content array. |
| transcript    | string                                                           | The final transcript of the audio.                         |

## RealtimeServerEventResponseContentPartAdded

Returned when a new content part is added to an assistant message item during
response generation.

| Field         | Type                                                   | Description                                                |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| event_id      | string                                                 | The unique ID of the server event.                         |
| type          | The event type, must be `response.content_part.added`. |
| response_id   | string                                                 | The ID of the response.                                    |
| item_id       | string                                                 | The ID of the item to which the content part was added.    |
| output_index  | integer                                                | The index of the output item in the response.              |
| content_index | integer                                                | The index of the content part in the item's content array. |
| part          | object                                                 | The content part that was added.                           |

## RealtimeServerEventResponseContentPartDone

Returned when a content part is done streaming in an assistant message item.
Also emitted when a Response is interrupted, incomplete, or cancelled.

| Field         | Type                                                  | Description                                                |
| ------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                | The unique ID of the server event.                         |
| type          | The event type, must be `response.content_part.done`. |
| response_id   | string                                                | The ID of the response.                                    |
| item_id       | string                                                | The ID of the item.                                        |
| output_index  | integer                                               | The index of the output item in the response.              |
| content_index | integer                                               | The index of the content part in the item's content array. |
| part          | object                                                | The content part that is done.                             |

## RealtimeServerEventResponseCreated

Returned when a new Response is created. The first event of response creation,
where the response is in an initial state of `in_progress`.

| Field    | Type                                        | Description                        |
| -------- | ------------------------------------------- | ---------------------------------- |
| event_id | string                                      | The unique ID of the server event. |
| type     | The event type, must be `response.created`. |
| response |

## RealtimeServerEventResponseDone

Returned when a Response is done streaming. Always emitted, no matter the
final state. The Response object included in the `response.done`event will
include all output Items in the Response but will omit the raw audio data.

Clients should check the`status` field of the Response to determine if it was successful
(`completed`) or if there was another outcome: `cancelled`, `failed`, or `incomplete`.

A response will contain all output items that were generated during the response, excluding
any audio content.

| Field    | Type                                     | Description                        |
| -------- | ---------------------------------------- | ---------------------------------- |
| event_id | string                                   | The unique ID of the server event. |
| type     | The event type, must be `response.done`. |
| response |

## RealtimeServerEventResponseFunctionCallArgumentsDelta

Returned when the model-generated function call arguments are updated.

| Field        | Type                                                              | Description                                   |
| ------------ | ----------------------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                                            | The unique ID of the server event.            |
| type         | The event type, must be `response.function_call_arguments.delta`. |
| response_id  | string                                                            | The ID of the response.                       |
| item_id      | string                                                            | The ID of the function call item.             |
| output_index | integer                                                           | The index of the output item in the response. |
| call_id      | string                                                            | The ID of the function call.                  |
| delta        | string                                                            | The arguments delta as a JSON string.         |

## RealtimeServerEventResponseFunctionCallArgumentsDone

Returned when the model-generated function call arguments are done streaming.
Also emitted when a Response is interrupted, incomplete, or cancelled.

| Field        | Type                                                             | Description                                   |
| ------------ | ---------------------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                                           | The unique ID of the server event.            |
| type         | The event type, must be `response.function_call_arguments.done`. |
| response_id  | string                                                           | The ID of the response.                       |
| item_id      | string                                                           | The ID of the function call item.             |
| output_index | integer                                                          | The index of the output item in the response. |
| call_id      | string                                                           | The ID of the function call.                  |
| arguments    | string                                                           | The final arguments as a JSON string.         |

## RealtimeServerEventResponseMCPCallArgumentsDelta

Returned when MCP tool call arguments are updated during response generation.

| Field        | Type                                                         | Description                                   |
| ------------ | ------------------------------------------------------------ | --------------------------------------------- |
| event_id     | string                                                       | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call_arguments.delta`. |
| response_id  | string                                                       | The ID of the response.                       |
| item_id      | string                                                       | The ID of the MCP tool call item.             |
| output_index | integer                                                      | The index of the output item in the response. |
| delta        | string                                                       | The JSON-encoded arguments delta.             |
| obfuscation  |

## RealtimeServerEventResponseMCPCallArgumentsDone

Returned when MCP tool call arguments are finalized during response generation.

| Field        | Type                                                        | Description                                   |
| ------------ | ----------------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                                      | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call_arguments.done`. |
| response_id  | string                                                      | The ID of the response.                       |
| item_id      | string                                                      | The ID of the MCP tool call item.             |
| output_index | integer                                                     | The index of the output item in the response. |
| arguments    | string                                                      | The final JSON-encoded arguments string.      |

## RealtimeServerEventResponseMCPCallCompleted

Returned when an MCP tool call has completed successfully.

| Field        | Type                                                   | Description                                   |
| ------------ | ------------------------------------------------------ | --------------------------------------------- |
| event_id     | string                                                 | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call.completed`. |
| output_index | integer                                                | The index of the output item in the response. |
| item_id      | string                                                 | The ID of the MCP tool call item.             |

## RealtimeServerEventResponseMCPCallFailed

Returned when an MCP tool call has failed.

| Field        | Type                                                | Description                                   |
| ------------ | --------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                              | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call.failed`. |
| output_index | integer                                             | The index of the output item in the response. |
| item_id      | string                                              | The ID of the MCP tool call item.             |

## RealtimeServerEventResponseMCPCallInProgress

Returned when an MCP tool call has started and is in progress.

| Field        | Type                                                     | Description                                   |
| ------------ | -------------------------------------------------------- | --------------------------------------------- |
| event_id     | string                                                   | The unique ID of the server event.            |
| type         | The event type, must be `response.mcp_call.in_progress`. |
| output_index | integer                                                  | The index of the output item in the response. |
| item_id      | string                                                   | The ID of the MCP tool call item.             |

## RealtimeServerEventResponseOutputItemAdded

Returned when a new Item is created during Response generation.

| Field        | Type                                                  | Description                                       |
| ------------ | ----------------------------------------------------- | ------------------------------------------------- |
| event_id     | string                                                | The unique ID of the server event.                |
| type         | The event type, must be `response.output_item.added`. |
| response_id  | string                                                | The ID of the Response to which the item belongs. |
| output_index | integer                                               | The index of the output item in the Response.     |
| item         |

## RealtimeServerEventResponseOutputItemDone

Returned when an Item is done streaming. Also emitted when a Response is
interrupted, incomplete, or cancelled.

| Field        | Type                                                 | Description                                       |
| ------------ | ---------------------------------------------------- | ------------------------------------------------- |
| event_id     | string                                               | The unique ID of the server event.                |
| type         | The event type, must be `response.output_item.done`. |
| response_id  | string                                               | The ID of the Response to which the item belongs. |
| output_index | integer                                              | The index of the output item in the Response.     |
| item         |

## RealtimeServerEventResponseTextDelta

Returned when the text value of an "output_text" content part is updated.

| Field         | Type                                                  | Description                                                |
| ------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                                | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_text.delta`. |
| response_id   | string                                                | The ID of the response.                                    |
| item_id       | string                                                | The ID of the item.                                        |
| output_index  | integer                                               | The index of the output item in the response.              |
| content_index | integer                                               | The index of the content part in the item's content array. |
| delta         | string                                                | The text delta.                                            |

## RealtimeServerEventResponseTextDone

Returned when the text value of an "output_text" content part is done streaming. Also
emitted when a Response is interrupted, incomplete, or cancelled.

| Field         | Type                                                 | Description                                                |
| ------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| event_id      | string                                               | The unique ID of the server event.                         |
| type          | The event type, must be `response.output_text.done`. |
| response_id   | string                                               | The ID of the response.                                    |
| item_id       | string                                               | The ID of the item.                                        |
| output_index  | integer                                              | The index of the output item in the response.              |
| content_index | integer                                              | The index of the content part in the item's content array. |
| text          | string                                               | The final text content.                                    |

## RealtimeServerEventSessionCreated

Returned when a Session is created. Emitted automatically when a new
connection is established as the first server event. This event will contain
the default Session configuration.

| Field    | Type                                       | Description                        |
| -------- | ------------------------------------------ | ---------------------------------- |
| event_id | string                                     | The unique ID of the server event. |
| type     | The event type, must be `session.created`. |
| session  | The session configuration.                 |

## RealtimeServerEventSessionUpdated

Returned when a session is updated with a `session.update`event, unless
there is an error.

| Field    | Type                                      | Description                        |
| -------- | ----------------------------------------- | ---------------------------------- |
| event_id | string                                    | The unique ID of the server event. |
| type     | The event type, must be`session.updated`. |
| session  | The session configuration.                |

## RealtimeServerEventTranscriptionSessionUpdated

Returned when a transcription session is updated with a `transcription_session.update`event, unless
there is an error.

| Field    | Type                                                    | Description                        |
| -------- | ------------------------------------------------------- | ---------------------------------- |
| event_id | string                                                  | The unique ID of the server event. |
| type     | The event type, must be`transcription_session.updated`. |
| session  |

## RealtimeSession

Realtime session object for the beta interface.

| Field      | Type                                                                | Description                                                                |
| ---------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| id         | string                                                              | Unique identifier for the session that looks like `sess_1234567890abcdef`. |
| object     | string                                                              | The object type. Always `realtime.session`.                                |
| modalities | The set of modalities the model can respond with. To disable audio, |
set this to ["text"].
 |
| model | string | The Realtime model used for this session.
 |
| instructions | string | The default system instructions (i.e. system message) prepended to model
calls. This field allows the client to guide the model on desired
responses. The model can be instructed on response content and format,
(e.g. "be extremely succinct", "act friendly", "here are examples of good
responses") and on audio behavior (e.g. "talk quickly", "inject emotion
into your voice", "laugh frequently"). The instructions are not
guaranteed to be followed by the model, but they provide guidance to the
model on the desired behavior.

Note that the server sets default instructions which will be used if this
field is not set and are visible in the `session.created`event at the
start of the session.
 |
| voice |  | The voice the model uses to respond. Voice cannot be changed during the
session once the model has responded with audio at least once. Current
voice options are`alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`,
`shimmer`, and `verse`.
 |
| input_audio_format | string | The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
For `pcm16`, input audio must be 16-bit PCM at a 24kHz sample rate,
single channel (mono), and little-endian byte order.
 |
| output_audio_format | string | The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
For `pcm16`, output audio is sampled at a rate of 24kHz.
 |
| input_audio_transcription |
| turn_detection |
| input_audio_noise_reduction | object | Configuration for input audio noise reduction. This can be set to `null`to turn off.
Noise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.
Filtering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.
 |
| speed | number | The speed of the model's spoken response. 1.0 is the default speed. 0.25 is
the minimum speed. 1.5 is the maximum speed. This value can only be changed
in between model turns, not while a response is in progress.
 |
| tracing |
| tools | array | Tools (functions) available to the model. |
| tool_choice | string | How the model chooses tools. Options are`auto`, `none`, `required`, or
specify a function.
 |
| temperature | number | Sampling temperature for the model, limited to [0.6, 1.2]. For audio models a temperature of 0.8 is highly recommended for best performance.
 |
| max_response_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls. Provide an integer between 1 and 4096 to
limit output tokens, or `inf`for the maximum available tokens for a
given model. Defaults to`inf`.
 |
| expires_at | integer | Expiration timestamp for the session, in seconds since epoch. |
| prompt |
| include |

## RealtimeSessionCreateRequest

A new Realtime session configuration, with an ephemeral key. Default TTL
for keys is one minute.

| Field         | Type                                                                | Description                        |
| ------------- | ------------------------------------------------------------------- | ---------------------------------- |
| client_secret | object                                                              | Ephemeral key returned by the API. |
| modalities    | The set of modalities the model can respond with. To disable audio, |
set this to ["text"].
 |
| instructions | string | The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.
Note that the server sets default instructions which will be used if this field is not set and are visible in the `session.created`event at the start of the session.
 |
| voice |  | The voice the model uses to respond. Voice cannot be changed during the
session once the model has responded with audio at least once. Current
voice options are`alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`,
`shimmer`, and `verse`.
 |
| input_audio_format | string | The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
 |
| output_audio_format | string | The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
 |
| input_audio_transcription | object | Configuration for input audio transcription, defaults to off and can be
set to `null`to turn off once on. Input audio transcription is not native
to the model, since the model consumes audio directly. Transcription runs
asynchronously and should be treated as rough guidance
rather than the representation understood by the model.
 |
| speed | number | The speed of the model's spoken response. 1.0 is the default speed. 0.25 is
the minimum speed. 1.5 is the maximum speed. This value can only be changed
in between model turns, not while a response is in progress.
 |
| tracing |  | Configuration options for tracing. Set to null to disable tracing. Once
tracing is enabled for a session, the configuration cannot be modified.`auto`will create a trace for the session with default values for the
workflow name, group id, and metadata.
 |
| turn_detection | object | Configuration for turn detection. Can be set to`null`to turn off. Server
VAD means that the model will detect the start and end of speech based on
audio volume and respond at the end of user speech.
 |
| tools | array | Tools (functions) available to the model. |
| tool_choice | string | How the model chooses tools. Options are`auto`, `none`, `required`, or
specify a function.
 |
| temperature | number | Sampling temperature for the model, limited to [0.6, 1.2]. Defaults to 0.8.
 |
| max_response_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls. Provide an integer between 1 and 4096 to
limit output tokens, or `inf`for the maximum available tokens for a
given model. Defaults to`inf`.
 |
| truncation |
| prompt |

## RealtimeSessionCreateRequestGA

Realtime session object configuration.

| Field             | Type   | Description                                                                             |
| ----------------- | ------ | --------------------------------------------------------------------------------------- |
| type              | string | The type of session to create. Always `realtime`for the Realtime API.                   |
| output_modalities | array  | The set of modalities the model can respond with. It defaults to`["audio"]`, indicating |
that the model will respond with audio plus a transcript. `["text"]`can be used to make
the model respond with text only. It is not possible to request both`text`and`audio`at the same time.
 |
| model |  | The Realtime model used for this session.
 |
| instructions | string | The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.

Note that the server sets default instructions which will be used if this field is not set and are visible in the`session.created`event at the start of the session.
 |
| audio | object | Configuration for input and output audio.
 |
| include | array | Additional fields to include in server outputs.`item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.
 |
| tracing |  | Realtime API can write session traces to the [Traces Dashboard](/logs?api=traces). Set to null to disable tracing. Once
tracing is enabled for a session, the configuration cannot be modified.

`auto`will create a trace for the session with default values for the
workflow name, group id, and metadata.
 |
| tools | array | Tools available to the model. |
| tool_choice |  | How the model chooses tools. Provide one of the string modes or force a specific
function/MCP tool.
 |
| max_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls. Provide an integer between 1 and 4096 to
limit output tokens, or`inf`for the maximum available tokens for a
given model. Defaults to`inf`.
 |
| truncation |
| prompt |

## RealtimeSessionCreateResponse

A Realtime session configuration object.

| Field      | Type    | Description                                                                |
| ---------- | ------- | -------------------------------------------------------------------------- |
| id         | string  | Unique identifier for the session that looks like `sess_1234567890abcdef`. |
| object     | string  | The object type. Always `realtime.session`.                                |
| expires_at | integer | Expiration timestamp for the session, in seconds since epoch.              |
| include    | array   | Additional fields to include in server outputs.                            |

- `item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.
 |
| model | string | The Realtime model used for this session. |
| output_modalities |  | The set of modalities the model can respond with. To disable audio,
set this to ["text"].
 |
| instructions | string | The default system instructions (i.e. system message) prepended to model
calls. This field allows the client to guide the model on desired
responses. The model can be instructed on response content and format,
(e.g. "be extremely succinct", "act friendly", "here are examples of good
responses") and on audio behavior (e.g. "talk quickly", "inject emotion
into your voice", "laugh frequently"). The instructions are not guaranteed
to be followed by the model, but they provide guidance to the model on the
desired behavior.

Note that the server sets default instructions which will be used if this
field is not set and are visible in the `session.created`event at the
start of the session.
 |
| audio | object | Configuration for input and output audio for the session.
 |
| tracing |  | Configuration options for tracing. Set to null to disable tracing. Once
tracing is enabled for a session, the configuration cannot be modified.`auto`will create a trace for the session with default values for the
workflow name, group id, and metadata.
 |
| turn_detection | object | Configuration for turn detection. Can be set to`null`to turn off. Server
VAD means that the model will detect the start and end of speech based on
audio volume and respond at the end of user speech.
 |
| tools | array | Tools (functions) available to the model. |
| tool_choice | string | How the model chooses tools. Options are`auto`, `none`, `required`, or
specify a function.
 |
| max_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls. Provide an integer between 1 and 4096 to
limit output tokens, or `inf`for the maximum available tokens for a
given model. Defaults to`inf`.
 |

## RealtimeSessionCreateResponseGA

A new Realtime session configuration, with an ephemeral key. Default TTL
for keys is one minute.

| Field             | Type   | Description                                                                             |
| ----------------- | ------ | --------------------------------------------------------------------------------------- |
| client_secret     | object | Ephemeral key returned by the API.                                                      |
| type              | string | The type of session to create. Always `realtime`for the Realtime API.                   |
| output_modalities | array  | The set of modalities the model can respond with. It defaults to`["audio"]`, indicating |
that the model will respond with audio plus a transcript. `["text"]`can be used to make
the model respond with text only. It is not possible to request both`text`and`audio`at the same time.
 |
| model |  | The Realtime model used for this session.
 |
| instructions | string | The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.

Note that the server sets default instructions which will be used if this field is not set and are visible in the`session.created`event at the start of the session.
 |
| audio | object | Configuration for input and output audio.
 |
| include | array | Additional fields to include in server outputs.`item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.
 |
| tracing |
| tools | array | Tools available to the model. |
| tool_choice |  | How the model chooses tools. Provide one of the string modes or force a specific
function/MCP tool.
 |
| max_output_tokens |  | Maximum number of output tokens for a single assistant response,
inclusive of tool calls. Provide an integer between 1 and 4096 to
limit output tokens, or `inf`for the maximum available tokens for a
given model. Defaults to`inf`.
 |
| truncation |
| prompt |

## RealtimeTranscriptionSessionCreateRequest

Realtime transcription session object configuration.

| Field                       | Type   | Description                                                                                                                                                                                             |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| turn_detection              | object | Configuration for turn detection. Can be set to `null`to turn off. Server VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech. |
| input_audio_noise_reduction | object | Configuration for input audio noise reduction. This can be set to`null`to turn off.                                                                                                                     |
Noise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.
Filtering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.
 |
| input_audio_format | string | The format of input audio. Options are`pcm16`, `g711_ulaw`, or `g711_alaw`.
For `pcm16`, input audio must be 16-bit PCM at a 24kHz sample rate,
single channel (mono), and little-endian byte order.
 |
| input_audio_transcription |  | Configuration for input audio transcription. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.
 |
| include | array | The set of items to include in the transcription. Current available items are:
`item.input_audio_transcription.logprobs`|

## RealtimeTranscriptionSessionCreateRequestGA

Realtime transcription session object configuration.

| Field   | Type   | Description                                                                     |
| ------- | ------ | ------------------------------------------------------------------------------- |
| type    | string | The type of session to create. Always`transcription`for transcription sessions. |
| audio   | object | Configuration for input and output audio.                                       |
| include | array  | Additional fields to include in server outputs.                                 | `item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription. |
|         |

## RealtimeTranscriptionSessionCreateResponse

A new Realtime transcription session configuration.

When a session is created on the server via REST API, the session object
also contains an ephemeral key. Default TTL for keys is 10 minutes. This
property is not present when a session is updated via the WebSocket API.

| Field         | Type   | Description                                                         |
| ------------- | ------ | ------------------------------------------------------------------- |
| client_secret | object | Ephemeral key returned by the API. Only present when the session is |
created on the server via REST API.
 |
| modalities |  | The set of modalities the model can respond with. To disable audio,
set this to ["text"].
 |
| input_audio_format | string | The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
 |
| input_audio_transcription |  | Configuration of the transcription model.
 |
| turn_detection | object | Configuration for turn detection. Can be set to `null`to turn off. Server
VAD means that the model will detect the start and end of speech based on
audio volume and respond at the end of user speech.
 |

## RealtimeTranscriptionSessionCreateResponseGA

A Realtime transcription session configuration object.

| Field      | Type    | Description                                                               |
| ---------- | ------- | ------------------------------------------------------------------------- |
| type       | string  | The type of session. Always`transcription`for transcription sessions.     |
| id         | string  | Unique identifier for the session that looks like`sess_1234567890abcdef`. |
| object     | string  | The object type. Always `realtime.transcription_session`.                 |
| expires_at | integer | Expiration timestamp for the session, in seconds since epoch.             |
| include    | array   | Additional fields to include in server outputs.                           |

- `item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.
 |
| audio | object | Configuration for input audio for the session.
 |

## RealtimeTruncation

Controls how the realtime conversation is truncated prior to model inference.
The default is `auto`.

## RealtimeTurnDetection

## Reasoning

**gpt-5 and o-series models only**

Configuration options for
[reasoning models](https://platform.openai.com/docs/guides/reasoning).

| Field            | Type | Description |
| ---------------- | ---- | ----------- |
| effort           |
| summary          |
| generate_summary |

## ReasoningEffort

## ReasoningItem

A description of the chain of thought used by a reasoning model while generating
a response. Be sure to include these items in your `input`to the Responses API
for subsequent turns of a conversation if you are manually
[managing context](https://platform.openai.com/docs/guides/conversation-state).

| Field             | Type   | Description                                                   |
| ----------------- | ------ | ------------------------------------------------------------- |
| type              | string | The type of the object. Always`reasoning`.                    |
| id                | string | The unique identifier of the reasoning content.               |
| encrypted_content |
| summary           | array  | Reasoning summary content.                                    |
| content           | array  | Reasoning text content.                                       |
| status            | string | The status of the item. One of `in_progress`, `completed`, or |
`incomplete`. Populated when items are returned via API.
 |

## Response

## ResponseAudioDeltaEvent

Emitted when there is a partial audio response.

| Field           | Type    | Description                                              |
| --------------- | ------- | -------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.audio.delta`.    |
| sequence_number | integer | A sequence number for this chunk of the stream response. |
| delta           | string  | A chunk of Base64 encoded response audio bytes.          |

## ResponseAudioDoneEvent

Emitted when the audio response is complete.

| Field           | Type    | Description                                          |
| --------------- | ------- | ---------------------------------------------------- |
| type            | string  | The type of the event. Always `response.audio.done`. |
| sequence_number | integer | The sequence number of the delta.                    |

## ResponseAudioTranscriptDeltaEvent

Emitted when there is a partial transcript of audio.

| Field           | Type    | Description                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.audio.transcript.delta`. |
| delta           | string  | The partial transcript of the audio response.                    |
| sequence_number | integer | The sequence number of this event.                               |

## ResponseAudioTranscriptDoneEvent

Emitted when the full audio transcript is completed.

| Field           | Type    | Description                                                     |
| --------------- | ------- | --------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.audio.transcript.done`. |
| sequence_number | integer | The sequence number of this event.                              |

## ResponseCodeInterpreterCallCodeDeltaEvent

Emitted when a partial code snippet is streamed by the code interpreter.

| Field           | Type    | Description                                                                        |
| --------------- | ------- | ---------------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.code_interpreter_call_code.delta`.         |
| output_index    | integer | The index of the output item in the response for which the code is being streamed. |
| item_id         | string  | The unique identifier of the code interpreter tool call item.                      |
| delta           | string  | The partial code snippet being streamed by the code interpreter.                   |
| sequence_number | integer | The sequence number of this event, used to order streaming events.                 |

## ResponseCodeInterpreterCallCodeDoneEvent

Emitted when the code snippet is finalized by the code interpreter.

| Field           | Type    | Description                                                                   |
| --------------- | ------- | ----------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.code_interpreter_call_code.done`.     |
| output_index    | integer | The index of the output item in the response for which the code is finalized. |
| item_id         | string  | The unique identifier of the code interpreter tool call item.                 |
| code            | string  | The final code snippet output by the code interpreter.                        |
| sequence_number | integer | The sequence number of this event, used to order streaming events.            |

## ResponseCodeInterpreterCallCompletedEvent

Emitted when the code interpreter call is completed.

| Field           | Type    | Description                                                                                    |
| --------------- | ------- | ---------------------------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.code_interpreter_call.completed`.                      |
| output_index    | integer | The index of the output item in the response for which the code interpreter call is completed. |
| item_id         | string  | The unique identifier of the code interpreter tool call item.                                  |
| sequence_number | integer | The sequence number of this event, used to order streaming events.                             |

## ResponseCodeInterpreterCallInProgressEvent

Emitted when a code interpreter call is in progress.

| Field           | Type    | Description                                                                                      |
| --------------- | ------- | ------------------------------------------------------------------------------------------------ |
| type            | string  | The type of the event. Always `response.code_interpreter_call.in_progress`.                      |
| output_index    | integer | The index of the output item in the response for which the code interpreter call is in progress. |
| item_id         | string  | The unique identifier of the code interpreter tool call item.                                    |
| sequence_number | integer | The sequence number of this event, used to order streaming events.                               |

## ResponseCodeInterpreterCallInterpretingEvent

Emitted when the code interpreter is actively interpreting the code snippet.

| Field           | Type    | Description                                                                                       |
| --------------- | ------- | ------------------------------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.code_interpreter_call.interpreting`.                      |
| output_index    | integer | The index of the output item in the response for which the code interpreter is interpreting code. |
| item_id         | string  | The unique identifier of the code interpreter tool call item.                                     |
| sequence_number | integer | The sequence number of this event, used to order streaming events.                                |

## ResponseCompletedEvent

Emitted when the model response is complete.

| Field           | Type                                  | Description                                         |
| --------------- | ------------------------------------- | --------------------------------------------------- |
| type            | string                                | The type of the event. Always `response.completed`. |
| response        | Properties of the completed response. |
| sequence_number | integer                               | The sequence number for this event.                 |

## ResponseContentPartAddedEvent

Emitted when a new content part is added.

| Field           | Type                             | Description                                                      |
| --------------- | -------------------------------- | ---------------------------------------------------------------- |
| type            | string                           | The type of the event. Always `response.content_part.added`.     |
| item_id         | string                           | The ID of the output item that the content part was added to.    |
| output_index    | integer                          | The index of the output item that the content part was added to. |
| content_index   | integer                          | The index of the content part that was added.                    |
| part            | The content part that was added. |
| sequence_number | integer                          | The sequence number of this event.                               |

## ResponseContentPartDoneEvent

Emitted when a content part is done.

| Field           | Type                           | Description                                                      |
| --------------- | ------------------------------ | ---------------------------------------------------------------- |
| type            | string                         | The type of the event. Always `response.content_part.done`.      |
| item_id         | string                         | The ID of the output item that the content part was added to.    |
| output_index    | integer                        | The index of the output item that the content part was added to. |
| content_index   | integer                        | The index of the content part that is done.                      |
| sequence_number | integer                        | The sequence number of this event.                               |
| part            | The content part that is done. |

## ResponseCreatedEvent

An event that is emitted when a response is created.

| Field           | Type                           | Description                                       |
| --------------- | ------------------------------ | ------------------------------------------------- |
| type            | string                         | The type of the event. Always `response.created`. |
| response        | The response that was created. |
| sequence_number | integer                        | The sequence number for this event.               |

## ResponseCustomToolCallInputDeltaEvent

Event representing a delta (partial update) to the input of a custom tool call.

| Field           | Type    | Description                                                    |
| --------------- | ------- | -------------------------------------------------------------- |
| type            | string  | The event type identifier.                                     |
| sequence_number | integer | The sequence number of this event.                             |
| output_index    | integer | The index of the output this delta applies to.                 |
| item_id         | string  | Unique identifier for the API item associated with this event. |
| delta           | string  | The incremental input data (delta) for the custom tool call.   |

## ResponseCustomToolCallInputDoneEvent

Event indicating that input for a custom tool call is complete.

| Field           | Type    | Description                                                    |
| --------------- | ------- | -------------------------------------------------------------- |
| type            | string  | The event type identifier.                                     |
| sequence_number | integer | The sequence number of this event.                             |
| output_index    | integer | The index of the output this event applies to.                 |
| item_id         | string  | Unique identifier for the API item associated with this event. |
| input           | string  | The complete input data for the custom tool call.              |

## ResponseError

## ResponseErrorCode

The error code for the response.

## ResponseErrorEvent

Emitted when an error occurs.

| Field           | Type    | Description                            |
| --------------- | ------- | -------------------------------------- |
| type            | string  | The type of the event. Always `error`. |
| code            |
| message         | string  | The error message.                     |
| param           |
| sequence_number | integer | The sequence number of this event.     |

## ResponseFailedEvent

An event that is emitted when a response fails.

| Field           | Type                      | Description                                      |
| --------------- | ------------------------- | ------------------------------------------------ |
| type            | string                    | The type of the event. Always `response.failed`. |
| sequence_number | integer                   | The sequence number of this event.               |
| response        | The response that failed. |

## ResponseFileSearchCallCompletedEvent

Emitted when a file search call is completed (results found).

| Field           | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.file_search_call.completed`. |
| output_index    | integer | The index of the output item that the file search call is initiated. |
| item_id         | string  | The ID of the output item that the file search call is initiated.    |
| sequence_number | integer | The sequence number of this event.                                   |

## ResponseFileSearchCallInProgressEvent

Emitted when a file search call is initiated.

| Field           | Type    | Description                                                            |
| --------------- | ------- | ---------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.file_search_call.in_progress`. |
| output_index    | integer | The index of the output item that the file search call is initiated.   |
| item_id         | string  | The ID of the output item that the file search call is initiated.      |
| sequence_number | integer | The sequence number of this event.                                     |

## ResponseFileSearchCallSearchingEvent

Emitted when a file search is currently searching.

| Field           | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.file_search_call.searching`. |
| output_index    | integer | The index of the output item that the file search call is searching. |
| item_id         | string  | The ID of the output item that the file search call is initiated.    |
| sequence_number | integer | The sequence number of this event.                                   |

## ResponseFormatJsonObject

JSON object response format. An older method of generating JSON responses.
Using `json_schema`is recommended for models that support it. Note that the
model will not generate JSON without a system or user message instructing it
to do so.

| Field | Type   | Description                                                     |
| ----- | ------ | --------------------------------------------------------------- |
| type  | string | The type of response format being defined. Always`json_object`. |

## ResponseFormatJsonSchema

JSON Schema response format. Used to generate structured JSON responses.
Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

| Field       | Type   | Description                                                        |
| ----------- | ------ | ------------------------------------------------------------------ |
| type        | string | The type of response format being defined. Always `json_schema`.   |
| json_schema | object | Structured Outputs configuration options, including a JSON Schema. |

## ResponseFormatJsonSchemaSchema

The schema for the response format, described as a JSON Schema object.
Learn how to build JSON schemas [here](https://json-schema.org/).

## ResponseFormatText

Default response format. Used to generate text responses.

| Field | Type   | Description                                               |
| ----- | ------ | --------------------------------------------------------- |
| type  | string | The type of response format being defined. Always `text`. |

## ResponseFormatTextGrammar

A custom grammar for the model to follow when generating text.
Learn more in the [custom grammars guide](https://platform.openai.com/docs/guides/custom-grammars).

| Field   | Type   | Description                                                  |
| ------- | ------ | ------------------------------------------------------------ |
| type    | string | The type of response format being defined. Always `grammar`. |
| grammar | string | The custom grammar for the model to follow.                  |

## ResponseFormatTextPython

Configure the model to generate valid Python code. See the
[custom grammars guide](https://platform.openai.com/docs/guides/custom-grammars) for more details.

| Field | Type   | Description                                                 |
| ----- | ------ | ----------------------------------------------------------- |
| type  | string | The type of response format being defined. Always `python`. |

## ResponseFunctionCallArgumentsDeltaEvent

Emitted when there is a partial function-call arguments delta.

| Field           | Type    | Description                                                                      |
| --------------- | ------- | -------------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.function_call_arguments.delta`.          |
| item_id         | string  | The ID of the output item that the function-call arguments delta is added to.    |
| output_index    | integer | The index of the output item that the function-call arguments delta is added to. |
| sequence_number | integer | The sequence number of this event.                                               |
| delta           | string  | The function-call arguments delta that is added.                                 |

## ResponseFunctionCallArgumentsDoneEvent

Emitted when function-call arguments are finalized.

| Field           | Type    | Description                               |
| --------------- | ------- | ----------------------------------------- |
| type            | string  |
| item_id         | string  | The ID of the item.                       |
| name            | string  | The name of the function that was called. |
| output_index    | integer | The index of the output item.             |
| sequence_number | integer | The sequence number of this event.        |
| arguments       | string  | The function-call arguments.              |

## ResponseImageGenCallCompletedEvent

Emitted when an image generation tool call has completed and the final image is available.

| Field           | Type    | Description                                                               |
| --------------- | ------- | ------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.image_generation_call.completed'. |
| output_index    | integer | The index of the output item in the response's output array.              |
| sequence_number | integer | The sequence number of this event.                                        |
| item_id         | string  | The unique identifier of the image generation item being processed.       |

## ResponseImageGenCallGeneratingEvent

Emitted when an image generation tool call is actively generating an image (intermediate state).

| Field           | Type    | Description                                                                |
| --------------- | ------- | -------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.image_generation_call.generating'. |
| output_index    | integer | The index of the output item in the response's output array.               |
| item_id         | string  | The unique identifier of the image generation item being processed.        |
| sequence_number | integer | The sequence number of the image generation item being processed.          |

## ResponseImageGenCallInProgressEvent

Emitted when an image generation tool call is in progress.

| Field           | Type    | Description                                                                 |
| --------------- | ------- | --------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.image_generation_call.in_progress'. |
| output_index    | integer | The index of the output item in the response's output array.                |
| item_id         | string  | The unique identifier of the image generation item being processed.         |
| sequence_number | integer | The sequence number of the image generation item being processed.           |

## ResponseImageGenCallPartialImageEvent

Emitted when a partial image is available during image generation streaming.

| Field               | Type    | Description                                                                                 |
| ------------------- | ------- | ------------------------------------------------------------------------------------------- |
| type                | string  | The type of the event. Always 'response.image_generation_call.partial_image'.               |
| output_index        | integer | The index of the output item in the response's output array.                                |
| item_id             | string  | The unique identifier of the image generation item being processed.                         |
| sequence_number     | integer | The sequence number of the image generation item being processed.                           |
| partial_image_index | integer | 0-based index for the partial image (backend is 1-based, but this is 0-based for the user). |
| partial_image_b64   | string  | Base64-encoded partial image data, suitable for rendering as an image.                      |

## ResponseInProgressEvent

Emitted when the response is in progress.

| Field           | Type                              | Description                                           |
| --------------- | --------------------------------- | ----------------------------------------------------- |
| type            | string                            | The type of the event. Always `response.in_progress`. |
| response        | The response that is in progress. |
| sequence_number | integer                           | The sequence number of this event.                    |

## ResponseIncompleteEvent

An event that is emitted when a response finishes as incomplete.

| Field           | Type                              | Description                                          |
| --------------- | --------------------------------- | ---------------------------------------------------- |
| type            | string                            | The type of the event. Always `response.incomplete`. |
| response        | The response that was incomplete. |
| sequence_number | integer                           | The sequence number of this event.                   |

## ResponseItemList

A list of Response items.

| Field    | Type                                         | Description                                     |
| -------- | -------------------------------------------- | ----------------------------------------------- |
| object   | The type of object returned, must be `list`. |
| data     | array                                        | A list of items used to generate this response. |
| has_more | boolean                                      | Whether there are more items available.         |
| first_id | string                                       | The ID of the first item in the list.           |
| last_id  | string                                       | The ID of the last item in the list.            |

## ResponseLogProb

A logprob is the logarithmic probability that the model assigns to producing
a particular token at a given position in the sequence. Less-negative (higher)
logprob values indicate greater model confidence in that token choice.

| Field        | Type   | Description                                           |
| ------------ | ------ | ----------------------------------------------------- |
| token        | string | A possible text token.                                |
| logprob      | number | The log probability of this token.                    |
| top_logprobs | array  | The log probability of the top 20 most likely tokens. |

## ResponseMCPCallArgumentsDeltaEvent

Emitted when there is a delta (partial update) to the arguments of an MCP tool call.

| Field           | Type    | Description                                                                         |
| --------------- | ------- | ----------------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.mcp_call_arguments.delta'.                  |
| output_index    | integer | The index of the output item in the response's output array.                        |
| item_id         | string  | The unique identifier of the MCP tool call item being processed.                    |
| delta           | string  | A JSON string containing the partial update to the arguments for the MCP tool call. |
| sequence_number | integer | The sequence number of this event.                                                  |

## ResponseMCPCallArgumentsDoneEvent

Emitted when the arguments for an MCP tool call are finalized.

| Field           | Type    | Description                                                             |
| --------------- | ------- | ----------------------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.mcp_call_arguments.done'.       |
| output_index    | integer | The index of the output item in the response's output array.            |
| item_id         | string  | The unique identifier of the MCP tool call item being processed.        |
| arguments       | string  | A JSON string containing the finalized arguments for the MCP tool call. |
| sequence_number | integer | The sequence number of this event.                                      |

## ResponseMCPCallCompletedEvent

Emitted when an MCP  tool call has completed successfully.

| Field           | Type    | Description                                                  |
| --------------- | ------- | ------------------------------------------------------------ |
| type            | string  | The type of the event. Always 'response.mcp_call.completed'. |
| item_id         | string  | The ID of the MCP tool call item that completed.             |
| output_index    | integer | The index of the output item that completed.                 |
| sequence_number | integer | The sequence number of this event.                           |

## ResponseMCPCallFailedEvent

Emitted when an MCP  tool call has failed.

| Field           | Type    | Description                                               |
| --------------- | ------- | --------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.mcp_call.failed'. |
| item_id         | string  | The ID of the MCP tool call item that failed.             |
| output_index    | integer | The index of the output item that failed.                 |
| sequence_number | integer | The sequence number of this event.                        |

## ResponseMCPCallInProgressEvent

Emitted when an MCP  tool call is in progress.

| Field           | Type    | Description                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.mcp_call.in_progress'.   |
| sequence_number | integer | The sequence number of this event.                               |
| output_index    | integer | The index of the output item in the response's output array.     |
| item_id         | string  | The unique identifier of the MCP tool call item being processed. |

## ResponseMCPListToolsCompletedEvent

Emitted when the list of available MCP tools has been successfully retrieved.

| Field           | Type    | Description                                                        |
| --------------- | ------- | ------------------------------------------------------------------ |
| type            | string  | The type of the event. Always 'response.mcp_list_tools.completed'. |
| item_id         | string  | The ID of the MCP tool call item that produced this output.        |
| output_index    | integer | The index of the output item that was processed.                   |
| sequence_number | integer | The sequence number of this event.                                 |

## ResponseMCPListToolsFailedEvent

Emitted when the attempt to list available MCP tools has failed.

| Field           | Type    | Description                                                     |
| --------------- | ------- | --------------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.mcp_list_tools.failed'. |
| item_id         | string  | The ID of the MCP tool call item that failed.                   |
| output_index    | integer | The index of the output item that failed.                       |
| sequence_number | integer | The sequence number of this event.                              |

## ResponseMCPListToolsInProgressEvent

Emitted when the system is in the process of retrieving the list of available MCP tools.

| Field           | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| type            | string  | The type of the event. Always 'response.mcp_list_tools.in_progress'. |
| item_id         | string  | The ID of the MCP tool call item that is being processed.            |
| output_index    | integer | The index of the output item that is being processed.                |
| sequence_number | integer | The sequence number of this event.                                   |

## ResponseModalities

## ResponseOutputItemAddedEvent

Emitted when a new output item is added.

| Field           | Type                            | Description                                                 |
| --------------- | ------------------------------- | ----------------------------------------------------------- |
| type            | string                          | The type of the event. Always `response.output_item.added`. |
| output_index    | integer                         | The index of the output item that was added.                |
| sequence_number | integer                         | The sequence number of this event.                          |
| item            | The output item that was added. |

## ResponseOutputItemDoneEvent

Emitted when an output item is marked done.

| Field           | Type                                  | Description                                                |
| --------------- | ------------------------------------- | ---------------------------------------------------------- |
| type            | string                                | The type of the event. Always `response.output_item.done`. |
| output_index    | integer                               | The index of the output item that was marked done.         |
| sequence_number | integer                               | The sequence number of this event.                         |
| item            | The output item that was marked done. |

## ResponseOutputTextAnnotationAddedEvent

Emitted when an annotation is added to output text content.

| Field            | Type    | Description                                                               |
| ---------------- | ------- | ------------------------------------------------------------------------- |
| type             | string  | The type of the event. Always 'response.output_text.annotation.added'.    |
| item_id          | string  | The unique identifier of the item to which the annotation is being added. |
| output_index     | integer | The index of the output item in the response's output array.              |
| content_index    | integer | The index of the content part within the output item.                     |
| annotation_index | integer | The index of the annotation within the content part.                      |
| sequence_number  | integer | The sequence number of this event.                                        |
| annotation       | object  | The annotation object being added. (See annotation schema for details.)   |

## ResponsePromptVariables

## ResponseProperties

| Field                | Type                                                                | Description |
| -------------------- | ------------------------------------------------------------------- | ----------- |
| previous_response_id |
| model                | Model ID used to generate the response, like `gpt-4o`or`o3`. OpenAI |
offers a wide range of models with different capabilities, performance
characteristics, and price points. Refer to the [model guide](https://platform.openai.com/docs/models)
to browse and compare available models.
 |
| reasoning |
| background |
| max_output_tokens |
| max_tool_calls |
| text | object | Configuration options for a text response from the model. Can be plain
text or structured JSON data. Learn more:

- [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
- [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
 |
| tools | array | An array of tools the model may call while generating a response. You
can specify which tool to use by setting the `tool_choice`parameter.

We support the following categories of tools:

- **Built-in tools**: Tools that are provided by OpenAI that extend the
  model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
  or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
  [built-in tools](https://platform.openai.com/docs/guides/tools).
- **MCP Tools**: Integrations with third-party systems via custom MCP servers
  or predefined connectors such as Google Drive and SharePoint. Learn more about
  [MCP Tools](https://platform.openai.com/docs/guides/tools-connectors-mcp).
- **Function calls (custom tools)**: Functions that are defined by you,
  enabling the model to call your own code with strongly typed arguments
  and outputs. Learn more about
  [function calling](https://platform.openai.com/docs/guides/function-calling). You can also use
  custom tools to call your own code.
 |
| tool_choice |  | How the model should select which tool (or tools) to use when generating
a response. See the`tools`parameter to see how to specify which tools
the model can call.
 |
| prompt |
| truncation |

## ResponseQueuedEvent

Emitted when a response is queued and waiting to be processed.

| Field           | Type                                     | Description                                      |
| --------------- | ---------------------------------------- | ------------------------------------------------ |
| type            | string                                   | The type of the event. Always 'response.queued'. |
| response        | The full response object that is queued. |
| sequence_number | integer                                  | The sequence number for this event.              |

## ResponseReasoningSummaryPartAddedEvent

Emitted when a new reasoning summary part is added.

| Field           | Type    | Description                                                           |
| --------------- | ------- | --------------------------------------------------------------------- |
| type            | string  | The type of the event. Always`response.reasoning_summary_part.added`. |
| item_id         | string  | The ID of the item this summary part is associated with.              |
| output_index    | integer | The index of the output item this summary part is associated with.    |
| summary_index   | integer | The index of the summary part within the reasoning summary.           |
| sequence_number | integer | The sequence number of this event.                                    |
| part            | object  | The summary part that was added.                                      |

## ResponseReasoningSummaryPartDoneEvent

Emitted when a reasoning summary part is completed.

| Field           | Type    | Description                                                           |
| --------------- | ------- | --------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.reasoning_summary_part.done`. |
| item_id         | string  | The ID of the item this summary part is associated with.              |
| output_index    | integer | The index of the output item this summary part is associated with.    |
| summary_index   | integer | The index of the summary part within the reasoning summary.           |
| sequence_number | integer | The sequence number of this event.                                    |
| part            | object  | The completed summary part.                                           |

## ResponseReasoningSummaryTextDeltaEvent

Emitted when a delta is added to a reasoning summary text.

| Field           | Type    | Description                                                              |
| --------------- | ------- | ------------------------------------------------------------------------ |
| type            | string  | The type of the event. Always `response.reasoning_summary_text.delta`.   |
| item_id         | string  | The ID of the item this summary text delta is associated with.           |
| output_index    | integer | The index of the output item this summary text delta is associated with. |
| summary_index   | integer | The index of the summary part within the reasoning summary.              |
| delta           | string  | The text delta that was added to the summary.                            |
| sequence_number | integer | The sequence number of this event.                                       |

## ResponseReasoningSummaryTextDoneEvent

Emitted when a reasoning summary text is completed.

| Field           | Type    | Description                                                           |
| --------------- | ------- | --------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.reasoning_summary_text.done`. |
| item_id         | string  | The ID of the item this summary text is associated with.              |
| output_index    | integer | The index of the output item this summary text is associated with.    |
| summary_index   | integer | The index of the summary part within the reasoning summary.           |
| text            | string  | The full text of the completed reasoning summary.                     |
| sequence_number | integer | The sequence number of this event.                                    |

## ResponseReasoningTextDeltaEvent

Emitted when a delta is added to a reasoning text.

| Field           | Type    | Description                                                                |
| --------------- | ------- | -------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.reasoning_text.delta`.             |
| item_id         | string  | The ID of the item this reasoning text delta is associated with.           |
| output_index    | integer | The index of the output item this reasoning text delta is associated with. |
| content_index   | integer | The index of the reasoning content part this delta is associated with.     |
| delta           | string  | The text delta that was added to the reasoning content.                    |
| sequence_number | integer | The sequence number of this event.                                         |

## ResponseReasoningTextDoneEvent

Emitted when a reasoning text is completed.

| Field           | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.reasoning_text.done`.        |
| item_id         | string  | The ID of the item this reasoning text is associated with.           |
| output_index    | integer | The index of the output item this reasoning text is associated with. |
| content_index   | integer | The index of the reasoning content part.                             |
| text            | string  | The full text of the completed reasoning content.                    |
| sequence_number | integer | The sequence number of this event.                                   |

## ResponseRefusalDeltaEvent

Emitted when there is a partial refusal text.

| Field           | Type    | Description                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.refusal.delta`.          |
| item_id         | string  | The ID of the output item that the refusal text is added to.     |
| output_index    | integer | The index of the output item that the refusal text is added to.  |
| content_index   | integer | The index of the content part that the refusal text is added to. |
| delta           | string  | The refusal text that is added.                                  |
| sequence_number | integer | The sequence number of this event.                               |

## ResponseRefusalDoneEvent

Emitted when refusal text is finalized.

| Field           | Type    | Description                                                       |
| --------------- | ------- | ----------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.refusal.done`.            |
| item_id         | string  | The ID of the output item that the refusal text is finalized.     |
| output_index    | integer | The index of the output item that the refusal text is finalized.  |
| content_index   | integer | The index of the content part that the refusal text is finalized. |
| refusal         | string  | The refusal text that is finalized.                               |
| sequence_number | integer | The sequence number of this event.                                |

## ResponseStreamEvent

## ResponseStreamOptions

## ResponseTextDeltaEvent

Emitted when there is an additional text delta.

| Field           | Type    | Description                                                     |
| --------------- | ------- | --------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.output_text.delta`.     |
| item_id         | string  | The ID of the output item that the text delta was added to.     |
| output_index    | integer | The index of the output item that the text delta was added to.  |
| content_index   | integer | The index of the content part that the text delta was added to. |
| delta           | string  | The text delta that was added.                                  |
| sequence_number | integer | The sequence number for this event.                             |
| logprobs        | array   | The log probabilities of the tokens in the delta.               |

## ResponseTextDoneEvent

Emitted when text content is finalized.

| Field           | Type    | Description                                                       |
| --------------- | ------- | ----------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.output_text.done`.        |
| item_id         | string  | The ID of the output item that the text content is finalized.     |
| output_index    | integer | The index of the output item that the text content is finalized.  |
| content_index   | integer | The index of the content part that the text content is finalized. |
| text            | string  | The text content that is finalized.                               |
| sequence_number | integer | The sequence number for this event.                               |
| logprobs        | array   | The log probabilities of the tokens in the delta.                 |

## ResponseUsage

Represents token usage details including input tokens, output tokens,
a breakdown of output tokens, and the total tokens used.

| Field                 | Type    | Description                                |
| --------------------- | ------- | ------------------------------------------ |
| input_tokens          | integer | The number of input tokens.                |
| input_tokens_details  | object  | A detailed breakdown of the input tokens.  |
| output_tokens         | integer | The number of output tokens.               |
| output_tokens_details | object  | A detailed breakdown of the output tokens. |
| total_tokens          | integer | The total number of tokens used.           |

## ResponseWebSearchCallCompletedEvent

Emitted when a web search call is completed.

| Field           | Type    | Description                                                               |
| --------------- | ------- | ------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.web_search_call.completed`.       |
| output_index    | integer | The index of the output item that the web search call is associated with. |
| item_id         | string  | Unique ID for the output item associated with the web search call.        |
| sequence_number | integer | The sequence number of the web search call being processed.               |

## ResponseWebSearchCallInProgressEvent

Emitted when a web search call is initiated.

| Field           | Type    | Description                                                               |
| --------------- | ------- | ------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.web_search_call.in_progress`.     |
| output_index    | integer | The index of the output item that the web search call is associated with. |
| item_id         | string  | Unique ID for the output item associated with the web search call.        |
| sequence_number | integer | The sequence number of the web search call being processed.               |

## ResponseWebSearchCallSearchingEvent

Emitted when a web search call is executing.

| Field           | Type    | Description                                                               |
| --------------- | ------- | ------------------------------------------------------------------------- |
| type            | string  | The type of the event. Always `response.web_search_call.searching`.       |
| output_index    | integer | The index of the output item that the web search call is associated with. |
| item_id         | string  | Unique ID for the output item associated with the web search call.        |
| sequence_number | integer | The sequence number of the web search call being processed.               |

## RunCompletionUsage

## RunGraderRequest

| Field  | Type   | Description                                                            |
| ------ | ------ | ---------------------------------------------------------------------- |
| grader | object | The grader used for the fine-tuning job.                               |
| item   | object | The dataset item provided to the grader. This will be used to populate |
the `item`namespace. See [the guide](https://platform.openai.com/docs/guides/graders) for more details.
 |
| model_sample | string | The model sample to be evaluated. This value will be used to populate
the`sample`namespace. See [the guide](https://platform.openai.com/docs/guides/graders) for more details.
The`output_json`variable will be populated if the model sample is a
valid JSON string.

 |

## RunGraderResponse

| Field                              | Type   | Description |
| ---------------------------------- | ------ | ----------- |
| reward                             | number |
| metadata                           | object |
| sub_rewards                        | object |
| model_grader_token_usage_per_model | object |

## RunObject

Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

| Field                 | Type    | Description                                                                                                                |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| id                    | string  | The identifier, which can be referenced in API endpoints.                                                                  |
| object                | string  | The object type, which is always`thread.run`.                                                                              |
| created_at            | integer | The Unix timestamp (in seconds) for when the run was created.                                                              |
| thread_id             | string  | The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run. |
| assistant_id          | string  | The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.       |
| status                |
| required_action       | object  | Details on the action required to continue the run. Will be `null`if no action is required.                                |
| last_error            | object  | The last error associated with this run. Will be`null`if there are no errors.                                              |
| expires_at            | integer | The Unix timestamp (in seconds) for when the run will expire.                                                              |
| started_at            | integer | The Unix timestamp (in seconds) for when the run was started.                                                              |
| cancelled_at          | integer | The Unix timestamp (in seconds) for when the run was cancelled.                                                            |
| failed_at             | integer | The Unix timestamp (in seconds) for when the run failed.                                                                   |
| completed_at          | integer | The Unix timestamp (in seconds) for when the run was completed.                                                            |
| incomplete_details    | object  | Details on why the run is incomplete. Will be`null`if the run is not incomplete.                                           |
| model                 | string  | The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.               |
| instructions          | string  | The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.        |
| tools                 | array   | The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.       |
| metadata              |
| usage                 |
| temperature           | number  | The sampling temperature used for this run. If not set, defaults to 1.                                                     |
| top_p                 | number  | The nucleus sampling value used for this run. If not set, defaults to 1.                                                   |
| max_prompt_tokens     | integer | The maximum number of prompt tokens specified to have been used over the course of the run.                                |
| max_completion_tokens | integer | The maximum number of completion tokens specified to have been used over the course of the run.                            |
| truncation_strategy   |
| tool_choice           |
| parallel_tool_calls   |
| response_format       |

## RunStepCompletionUsage

## RunStepDeltaObject

Represents a run step delta i.e. any changed fields on a run step during streaming.

| Field  | Type   | Description                                                               |
| ------ | ------ | ------------------------------------------------------------------------- |
| id     | string | The identifier of the run step, which can be referenced in API endpoints. |
| object | string | The object type, which is always`thread.run.step.delta`.                  |
| delta  |

## RunStepDeltaStepDetailsMessageCreationObject

Details of the message creation by the run step.

| Field            | Type   | Description                |
| ---------------- | ------ | -------------------------- |
| type             | string | Always `message_creation`. |
| message_creation | object |

## RunStepDeltaStepDetailsToolCallsCodeObject

Details of the Code Interpreter tool call the run step was involved in.

| Field            | Type    | Description                                                                                     |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------- |
| index            | integer | The index of the tool call in the tool calls array.                                             |
| id               | string  | The ID of the tool call.                                                                        |
| type             | string  | The type of tool call. This is always going to be `code_interpreter`for this type of tool call. |
| code_interpreter | object  | The Code Interpreter tool call definition.                                                      |

## RunStepDeltaStepDetailsToolCallsCodeOutputImageObject

| Field | Type    | Description                                   |
| ----- | ------- | --------------------------------------------- |
| index | integer | The index of the output in the outputs array. |
| type  | string  | Always`image`.                                |
| image | object  |

## RunStepDeltaStepDetailsToolCallsCodeOutputLogsObject

Text output from the Code Interpreter tool call as part of a run step.

| Field | Type    | Description                                          |
| ----- | ------- | ---------------------------------------------------- |
| index | integer | The index of the output in the outputs array.        |
| type  | string  | Always `logs`.                                       |
| logs  | string  | The text output from the Code Interpreter tool call. |

## RunStepDeltaStepDetailsToolCallsFileSearchObject

| Field       | Type    | Description                                                                                |
| ----------- | ------- | ------------------------------------------------------------------------------------------ |
| index       | integer | The index of the tool call in the tool calls array.                                        |
| id          | string  | The ID of the tool call object.                                                            |
| type        | string  | The type of tool call. This is always going to be `file_search`for this type of tool call. |
| file_search | object  | For now, this is always going to be an empty object.                                       |

## RunStepDeltaStepDetailsToolCallsFunctionObject

| Field    | Type    | Description                                                                            |
| -------- | ------- | -------------------------------------------------------------------------------------- |
| index    | integer | The index of the tool call in the tool calls array.                                    |
| id       | string  | The ID of the tool call object.                                                        |
| type     | string  | The type of tool call. This is always going to be`function`for this type of tool call. |
| function | object  | The definition of the function that was called.                                        |

## RunStepDeltaStepDetailsToolCallsObject

Details of the tool call.

| Field      | Type   | Description                                                                                                                                                      |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | string | Always`tool_calls`.                                                                                                                                              |
| tool_calls | array  | An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`. |

## RunStepDetailsMessageCreationObject

Details of the message creation by the run step.

| Field            | Type   | Description                |
| ---------------- | ------ | -------------------------- |
| type             | string | Always `message_creation`. |
| message_creation | object |

## RunStepDetailsToolCallsCodeObject

Details of the Code Interpreter tool call the run step was involved in.

| Field            | Type   | Description                                                                                     |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------- |
| id               | string | The ID of the tool call.                                                                        |
| type             | string | The type of tool call. This is always going to be `code_interpreter`for this type of tool call. |
| code_interpreter | object | The Code Interpreter tool call definition.                                                      |

## RunStepDetailsToolCallsCodeOutputImageObject

| Field | Type   | Description    |
| ----- | ------ | -------------- |
| type  | string | Always`image`. |
| image | object |

## RunStepDetailsToolCallsCodeOutputLogsObject

Text output from the Code Interpreter tool call as part of a run step.

| Field | Type   | Description                                          |
| ----- | ------ | ---------------------------------------------------- |
| type  | string | Always `logs`.                                       |
| logs  | string | The text output from the Code Interpreter tool call. |

## RunStepDetailsToolCallsFileSearchObject

| Field       | Type   | Description                                                                                |
| ----------- | ------ | ------------------------------------------------------------------------------------------ |
| id          | string | The ID of the tool call object.                                                            |
| type        | string | The type of tool call. This is always going to be `file_search`for this type of tool call. |
| file_search | object | For now, this is always going to be an empty object.                                       |

## RunStepDetailsToolCallsFileSearchRankingOptionsObject

The ranking options for the file search.

| Field           | Type   | Description                                                                                          |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| ranker          |
| score_threshold | number | The score threshold for the file search. All values must be a floating point number between 0 and 1. |

## RunStepDetailsToolCallsFileSearchResultObject

A result instance of the file search.

| Field     | Type   | Description                                                                                                          |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| file_id   | string | The ID of the file that result was found in.                                                                         |
| file_name | string | The name of the file that result was found in.                                                                       |
| score     | number | The score of the result. All values must be a floating point number between 0 and 1.                                 |
| content   | array  | The content of the result that was found. The content is only included if requested via the include query parameter. |

## RunStepDetailsToolCallsFunctionObject

| Field    | Type   | Description                                                                            |
| -------- | ------ | -------------------------------------------------------------------------------------- |
| id       | string | The ID of the tool call object.                                                        |
| type     | string | The type of tool call. This is always going to be`function`for this type of tool call. |
| function | object | The definition of the function that was called.                                        |

## RunStepDetailsToolCallsObject

Details of the tool call.

| Field      | Type   | Description                                                                                                                                                      |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | string | Always`tool_calls`.                                                                                                                                              |
| tool_calls | array  | An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`. |

## RunStepObject

Represents a step in execution of a run.

| Field        | Type    | Description                                                                                                        |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------ |
| id           | string  | The identifier of the run step, which can be referenced in API endpoints.                                          |
| object       | string  | The object type, which is always `thread.run.step`.                                                                |
| created_at   | integer | The Unix timestamp (in seconds) for when the run step was created.                                                 |
| assistant_id | string  | The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step. |
| thread_id    | string  | The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.                       |
| run_id       | string  | The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.          |
| type         | string  | The type of run step, which can be either `message_creation`or`tool_calls`.                                        |
| status       | string  | The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.   |
| step_details | object  | The details of the run step.                                                                                       |
| last_error   |
| expired_at   |
| cancelled_at |
| failed_at    |
| completed_at |
| metadata     |
| usage        |

## RunStepStreamEvent

## RunStreamEvent

## RunToolCallObject

Tool call objects

| Field    | Type   | Description                                                                                                                                                                                                     |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id       | string | The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint. |
| type     | string | The type of tool call the output is required for. For now, this is always `function`.                                                                                                                           |
| function | object | The function definition.                                                                                                                                                                                        |

## Screenshot

A screenshot action.

| Field | Type   | Description                                                         |
| ----- | ------ | ------------------------------------------------------------------- |
| type  | string | Specifies the event type. For a screenshot action, this property is |
always set to `screenshot`.
 |

## Scroll

A scroll action.

| Field | Type   | Description                                                     |
| ----- | ------ | --------------------------------------------------------------- |
| type  | string | Specifies the event type. For a scroll action, this property is |
always set to `scroll`.
 |
| x | integer | The x-coordinate where the scroll occurred.
 |
| y | integer | The y-coordinate where the scroll occurred.
 |
| scroll_x | integer | The horizontal scroll distance.
 |
| scroll_y | integer | The vertical scroll distance.
 |

## ServiceTier

## SpeechAudioDeltaEvent

Emitted for each chunk of audio data generated during speech synthesis.

| Field | Type   | Description                                         |
| ----- | ------ | --------------------------------------------------- |
| type  | string | The type of the event. Always `speech.audio.delta`. |
| audio | string | A chunk of Base64-encoded audio data.               |

## SpeechAudioDoneEvent

Emitted when the speech synthesis is complete and all audio has been streamed.

| Field | Type   | Description                                        |
| ----- | ------ | -------------------------------------------------- |
| type  | string | The type of the event. Always `speech.audio.done`. |
| usage | object | Token usage statistics for the request.            |

## StaticChunkingStrategy

| Field                 | Type    | Description                                                                                                                       |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| max_chunk_size_tokens | integer | The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100`and the maximum value is`4096`. |
| chunk_overlap_tokens  | integer | The number of tokens that overlap between chunks. The default value is `400`.                                                     |

Note that the overlap must not exceed half of `max_chunk_size_tokens`.
 |

## StaticChunkingStrategyRequestParam

Customize your own chunking strategy by setting chunk size and chunk overlap.

| Field  | Type   | Description      |
| ------ | ------ | ---------------- |
| type   | string | Always `static`. |
| static |

## StaticChunkingStrategyResponseParam

| Field  | Type   | Description      |
| ------ | ------ | ---------------- |
| type   | string | Always `static`. |
| static |

## StopConfiguration

Not supported with latest reasoning models `o3`and`o4-mini`.

Up to 4 sequences where the API will stop generating further tokens. The
returned text will not contain the stop sequence.

## SubmitToolOutputsRunRequest

| Field        | Type  | Description                                                |
| ------------ | ----- | ---------------------------------------------------------- |
| tool_outputs | array | A list of tools for which the outputs are being submitted. |
| stream       |

## TextResponseFormatConfiguration

An object specifying the format that the model must output.

Configuring `{ "type": "json_schema" }`enables Structured Outputs,
which ensures the model will match your supplied JSON schema. Learn more in the
[Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

The default format is`{ "type": "text" }`with no additional options.

**Not recommended for gpt-4o and newer models:**

Setting to`{ "type": "json_object" }`enables the older JSON mode, which
ensures the message the model generates is valid JSON. Using`json_schema`is preferred for models that support it.

## TextResponseFormatJsonSchema

JSON Schema response format. Used to generate structured JSON responses.
Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

| Field       | Type   | Description                                                            |
| ----------- | ------ | ---------------------------------------------------------------------- |
| type        | string | The type of response format being defined. Always`json_schema`.        |
| description | string | A description of what the response format is for, used by the model to |
determine how to respond in the format.
 |
| name | string | The name of the response format. Must be a-z, A-Z, 0-9, or contain
underscores and dashes, with a maximum length of 64.
 |
| schema |
| strict |

## ThreadObject

Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

| Field          | Type    | Description                                                      |
| -------------- | ------- | ---------------------------------------------------------------- |
| id             | string  | The identifier, which can be referenced in API endpoints.        |
| object         | string  | The object type, which is always `thread`.                       |
| created_at     | integer | The Unix timestamp (in seconds) for when the thread was created. |
| tool_resources |
| metadata       |

## ThreadStreamEvent

## ToggleCertificatesRequest

| Field           | Type  | Description |
| --------------- | ----- | ----------- |
| certificate_ids | array |

## Tool

A tool that can be used to generate a response.

## ToolChoiceAllowed

Constrains the tools available to the model to a pre-defined set.

| Field | Type   | Description                                                       |
| ----- | ------ | ----------------------------------------------------------------- |
| type  | string | Allowed tool configuration type. Always `allowed_tools`.          |
| mode  | string | Constrains the tools available to the model to a pre-defined set. |

`auto`allows the model to pick from among the allowed tools and generate a
message.`required`requires the model to call one or more of the allowed tools.
 |
| tools | array | A list of tool definitions that the model should be allowed to call.

For the Responses API, the list of tool definitions might look like:```json
[
  { "type": "function", "name": "get_weather" },
  { "type": "mcp", "server_label": "deepwiki" },
  { "type": "image_generation" }
]

```|

## ToolChoiceCustom

Use this option to force the model to call a specific custom tool.

| Field | Type   | Description                                          |
| ----- | ------ | ---------------------------------------------------- |
| type  | string | For custom tool calling, the type is always`custom`. |
| name  | string | The name of the custom tool to call.                 |

## ToolChoiceFunction

Use this option to force the model to call a specific function.

| Field | Type   | Description                                          |
| ----- | ------ | ---------------------------------------------------- |
| type  | string | For function calling, the type is always `function`. |
| name  | string | The name of the function to call.                    |

## ToolChoiceMCP

Use this option to force the model to call a specific tool on a remote MCP server.

| Field        | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| type         | string | For MCP tools, the type is always `mcp`. |
| server_label | string | The label of the MCP server to use.      |
| name         |

## ToolChoiceOptions

Controls which (if any) tool is called by the model.

`none`means the model will not call any tool and instead generates a message.`auto`means the model can pick between generating a message or calling one or
more tools.`required`means the model must call one or more tools.

## ToolChoiceTypes

Indicates that the model should use a built-in tool to generate a response.
[Learn more about built-in tools](https://platform.openai.com/docs/guides/tools).

| Field | Type   | Description                                                       |
| ----- | ------ | ----------------------------------------------------------------- |
| type  | string | The type of hosted tool the model should to use. Learn more about |
[built-in tools](https://platform.openai.com/docs/guides/tools).

Allowed values are:

-`file_search`-`web_search_preview`-`computer_use_preview`-`code_interpreter`-`image_generation`|

## TranscriptTextDeltaEvent

Emitted when there is an additional text delta. This is also the first event emitted when the transcription starts. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the`Stream`parameter set to`true`.

| Field    | Type   | Description                                                                                                                                                                                                  |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type     | string | The type of the event. Always `transcript.text.delta`.                                                                                                                                                       |
| delta    | string | The text delta that was additionally transcribed.                                                                                                                                                            |
| logprobs | array  | The log probabilities of the delta. Only included if you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `include[]`parameter set to`logprobs`. |

## TranscriptTextDoneEvent

Emitted when the transcription is complete. Contains the complete transcription text. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `Stream`parameter set to`true`.

| Field    | Type   | Description                                                                                                                                                                                                                                   |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | string | The type of the event. Always `transcript.text.done`.                                                                                                                                                                                         |
| text     | string | The text that was transcribed.                                                                                                                                                                                                                |
| logprobs | array  | The log probabilities of the individual tokens in the transcription. Only included if you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `include[]`parameter set to`logprobs`. |
| usage    |

## TranscriptTextUsageDuration

Usage statistics for models billed by audio input duration.

| Field   | Type   | Description                                                      |
| ------- | ------ | ---------------------------------------------------------------- |
| type    | string | The type of the usage object. Always `duration`for this variant. |
| seconds | number | Duration of the input audio in seconds.                          |

## TranscriptTextUsageTokens

Usage statistics for models billed by token usage.

| Field               | Type    | Description                                                   |
| ------------------- | ------- | ------------------------------------------------------------- |
| type                | string  | The type of the usage object. Always`tokens`for this variant. |
| input_tokens        | integer | Number of input tokens billed for this request.               |
| input_token_details | object  | Details about the input tokens billed for this request.       |
| output_tokens       | integer | Number of output tokens generated.                            |
| total_tokens        | integer | Total number of tokens used (input + output).                 |

## TranscriptionChunkingStrategy

## TranscriptionInclude

## TranscriptionSegment

| Field             | Type    | Description                                                                                                                             |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| id                | integer | Unique identifier of the segment.                                                                                                       |
| seek              | integer | Seek offset of the segment.                                                                                                             |
| start             | number  | Start time of the segment in seconds.                                                                                                   |
| end               | number  | End time of the segment in seconds.                                                                                                     |
| text              | string  | Text content of the segment.                                                                                                            |
| tokens            | array   | Array of token IDs for the text content.                                                                                                |
| temperature       | number  | Temperature parameter used for generating the segment.                                                                                  |
| avg_logprob       | number  | Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.                                            |
| compression_ratio | number  | Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.                                    |
| no_speech_prob    | number  | Probability of no speech in the segment. If the value is higher than 1.0 and the`avg_logprob`is below -1, consider this segment silent. |

## TranscriptionWord

| Field | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| word  | string | The text content of the word.      |
| start | number | Start time of the word in seconds. |
| end   | number | End time of the word in seconds.   |

## TruncationObject

Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

| Field         | Type   | Description                                                                                                                                                                                                                                                                                                     |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | string | The truncation strategy to use for the thread. The default is`auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`. |
| last_messages |

## Type

An action to type in text.

| Field | Type   | Description                                                   |
| ----- | ------ | ------------------------------------------------------------- |
| type  | string | Specifies the event type. For a type action, this property is |
always set to `type`.
 |
| text | string | The text to type.
 |

## UpdateVectorStoreFileAttributesRequest

| Field      | Type | Description |
| ---------- | ---- | ----------- |
| attributes |

## UpdateVectorStoreRequest

| Field         | Type   | Description                   |
| ------------- | ------ | ----------------------------- |
| name          | string | The name of the vector store. |
| expires_after |
| metadata      |

## Upload

The Upload object can accept byte chunks in the form of Parts.

| Field      | Type    | Description                                                                                                                                                    |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id         | string  | The Upload unique identifier, which can be referenced in API endpoints.                                                                                        |
| created_at | integer | The Unix timestamp (in seconds) for when the Upload was created.                                                                                               |
| filename   | string  | The name of the file to be uploaded.                                                                                                                           |
| bytes      | integer | The intended number of bytes to be uploaded.                                                                                                                   |
| purpose    | string  | The intended purpose of the file. [Please refer here](https://platform.openai.com/docs/api-reference/files/object#files/object-purpose) for acceptable values. |
| status     | string  | The status of the Upload.                                                                                                                                      |
| expires_at | integer | The Unix timestamp (in seconds) for when the Upload will expire.                                                                                               |
| object     | string  | The object type, which is always "upload".                                                                                                                     |
| file       |

## UploadCertificateRequest

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| name    | string | An optional name for the certificate  |
| content | string | The certificate content in PEM format |

## UploadPart

The upload Part represents a chunk of bytes we can add to an Upload object.

| Field      | Type    | Description                                                                  |
| ---------- | ------- | ---------------------------------------------------------------------------- |
| id         | string  | The upload Part unique identifier, which can be referenced in API endpoints. |
| created_at | integer | The Unix timestamp (in seconds) for when the Part was created.               |
| upload_id  | string  | The ID of the Upload object that this Part was added to.                     |
| object     | string  | The object type, which is always `upload.part`.                              |

## UsageAudioSpeechesResult

The aggregated audio speeches usage details of the specific time bucket.

| Field              | Type    | Description                              |
| ------------------ | ------- | ---------------------------------------- |
| object             | string  |
| characters         | integer | The number of characters processed.      |
| num_model_requests | integer | The count of requests made to the model. |
| project_id         |
| user_id            |
| api_key_id         |
| model              |

## UsageAudioTranscriptionsResult

The aggregated audio transcriptions usage details of the specific time bucket.

| Field              | Type    | Description                              |
| ------------------ | ------- | ---------------------------------------- |
| object             | string  |
| seconds            | integer | The number of seconds processed.         |
| num_model_requests | integer | The count of requests made to the model. |
| project_id         |
| user_id            |
| api_key_id         |
| model              |

## UsageCodeInterpreterSessionsResult

The aggregated code interpreter sessions usage details of the specific time bucket.

| Field        | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| object       | string  |
| num_sessions | integer | The number of code interpreter sessions. |
| project_id   |

## UsageCompletionsResult

The aggregated completions usage details of the specific time bucket.

| Field               | Type    | Description                                                                                                                                                     |
| ------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object              | string  |
| input_tokens        | integer | The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.               |
| input_cached_tokens | integer | The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens. |
| output_tokens       | integer | The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.                                       |
| input_audio_tokens  | integer | The aggregated number of audio input tokens used, including cached tokens.                                                                                      |
| output_audio_tokens | integer | The aggregated number of audio output tokens used.                                                                                                              |
| num_model_requests  | integer | The count of requests made to the model.                                                                                                                        |
| project_id          |
| user_id             |
| api_key_id          |
| model               |
| batch               |

## UsageEmbeddingsResult

The aggregated embeddings usage details of the specific time bucket.

| Field              | Type    | Description                                 |
| ------------------ | ------- | ------------------------------------------- |
| object             | string  |
| input_tokens       | integer | The aggregated number of input tokens used. |
| num_model_requests | integer | The count of requests made to the model.    |
| project_id         |
| user_id            |
| api_key_id         |
| model              |

## UsageImagesResult

The aggregated images usage details of the specific time bucket.

| Field              | Type    | Description                              |
| ------------------ | ------- | ---------------------------------------- |
| object             | string  |
| images             | integer | The number of images processed.          |
| num_model_requests | integer | The count of requests made to the model. |
| source             |
| size               |
| project_id         |
| user_id            |
| api_key_id         |
| model              |

## UsageModerationsResult

The aggregated moderations usage details of the specific time bucket.

| Field              | Type    | Description                                 |
| ------------------ | ------- | ------------------------------------------- |
| object             | string  |
| input_tokens       | integer | The aggregated number of input tokens used. |
| num_model_requests | integer | The count of requests made to the model.    |
| project_id         |
| user_id            |
| api_key_id         |
| model              |

## UsageResponse

| Field     | Type    | Description |
| --------- | ------- | ----------- |
| object    | string  |
| data      | array   |
| has_more  | boolean |
| next_page | string  |

## UsageTimeBucket

| Field      | Type    | Description |
| ---------- | ------- | ----------- |
| object     | string  |
| start_time | integer |
| end_time   | integer |
| result     | array   |

## UsageVectorStoresResult

The aggregated vector stores usage details of the specific time bucket.

| Field       | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| object      | string  |
| usage_bytes | integer | The vector stores usage in bytes. |
| project_id  |

## User

Represents an individual `user`within an organization.

| Field    | Type    | Description                                                 |
| -------- | ------- | ----------------------------------------------------------- |
| object   | string  | The object type, which is always`organization.user`         |
| id       | string  | The identifier, which can be referenced in API endpoints    |
| name     | string  | The name of the user                                        |
| email    | string  | The email address of the user                               |
| role     | string  | `owner`or`reader`                                           |
| added_at | integer | The Unix timestamp (in seconds) of when the user was added. |

## UserDeleteResponse

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| object  | string  |
| id      | string  |
| deleted | boolean |

## UserListResponse

| Field    | Type    | Description |
| -------- | ------- | ----------- |
| object   | string  |
| data     | array   |
| first_id | string  |
| last_id  | string  |
| has_more | boolean |

## UserRoleUpdateRequest

| Field | Type   | Description       |
| ----- | ------ | ----------------- |
| role  | string | `owner`or`reader` |

## VadConfig

| Field             | Type    | Description                                                                |
| ----------------- | ------- | -------------------------------------------------------------------------- |
| type              | string  | Must be set to`server_vad`to enable manual chunking using server side VAD. |
| prefix_padding_ms | integer | Amount of audio to include before the VAD detected speech (in              |
milliseconds).
 |
| silence_duration_ms | integer | Duration of silence to detect speech stop (in milliseconds).
With shorter values the model will respond more quickly,
but may jump in on short pauses from the user.
 |
| threshold | number | Sensitivity threshold (0.0 to 1.0) for voice activity detection. A
higher threshold will require louder audio to activate the model, and
thus might perform better in noisy environments.
 |

## ValidateGraderRequest

| Field  | Type   | Description                              |
| ------ | ------ | ---------------------------------------- |
| grader | object | The grader used for the fine-tuning job. |

## ValidateGraderResponse

| Field  | Type   | Description                              |
| ------ | ------ | ---------------------------------------- |
| grader | object | The grader used for the fine-tuning job. |

## VectorStoreExpirationAfter

The expiration policy for a vector store.

| Field  | Type    | Description                                                                                     |
| ------ | ------- | ----------------------------------------------------------------------------------------------- |
| anchor | string  | Anchor timestamp after which the expiration policy applies. Supported anchors:`last_active_at`. |
| days   | integer | The number of days after the anchor time that the vector store will expire.                     |

## VectorStoreFileAttributes

## VectorStoreFileBatchObject

A batch of files attached to a vector store.

| Field           | Type    | Description                                                                                                                                                                             |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | string  | The identifier, which can be referenced in API endpoints.                                                                                                                               |
| object          | string  | The object type, which is always `vector_store.file_batch`.                                                                                                                             |
| created_at      | integer | The Unix timestamp (in seconds) for when the vector store files batch was created.                                                                                                      |
| vector_store_id | string  | The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to. |
| status          | string  | The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled`or`failed`.                                                                      |
| file_counts     | object  |

## VectorStoreFileContentResponse

Represents the parsed content of a vector store file.

| Field     | Type    | Description                                                       |
| --------- | ------- | ----------------------------------------------------------------- |
| object    | string  | The object type, which is always `vector_store.file_content.page` |
| data      | array   | Parsed content of the file.                                       |
| has_more  | boolean | Indicates if there are more content pages to fetch.               |
| next_page |

## VectorStoreFileObject

A list of files attached to a vector store.

| Field             | Type    | Description                                                                                                                                                                                 |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                | string  | The identifier, which can be referenced in API endpoints.                                                                                                                                   |
| object            | string  | The object type, which is always`vector_store.file`.                                                                                                                                        |
| usage_bytes       | integer | The total vector store usage in bytes. Note that this may be different from the original file size.                                                                                         |
| created_at        | integer | The Unix timestamp (in seconds) for when the vector store file was created.                                                                                                                 |
| vector_store_id   | string  | The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.     |
| status            | string  | The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed`indicates that the vector store file is ready for use. |
| last_error        |
| chunking_strategy |
| attributes        |

## VectorStoreObject

A vector store is a collection of processed files can be used by the`file_search`tool.

| Field          | Type    | Description                                                                                                                                                            |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id             | string  | The identifier, which can be referenced in API endpoints.                                                                                                              |
| object         | string  | The object type, which is always`vector_store`.                                                                                                                        |
| created_at     | integer | The Unix timestamp (in seconds) for when the vector store was created.                                                                                                 |
| name           | string  | The name of the vector store.                                                                                                                                          |
| usage_bytes    | integer | The total number of bytes used by the files in the vector store.                                                                                                       |
| file_counts    | object  |
| status         | string  | The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed`indicates that the vector store is ready for use. |
| expires_after  |
| expires_at     |
| last_active_at |
| metadata       |

## VectorStoreSearchRequest

| Field           | Type                                        | Description                                                                                |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| query           | A query string for a search                 |
| rewrite_query   | boolean                                     | Whether to rewrite the natural language query for vector search.                           |
| max_num_results | integer                                     | The maximum number of results to return. This number should be between 1 and 50 inclusive. |
| filters         | A filter to apply based on file attributes. |
| ranking_options | object                                      | Ranking options for search.                                                                |

## VectorStoreSearchResultContentObject

| Field | Type   | Description                            |
| ----- | ------ | -------------------------------------- |
| type  | string | The type of content.                   |
| text  | string | The text content returned from search. |

## VectorStoreSearchResultItem

| Field      | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| file_id    | string | The ID of the vector store file.     |
| filename   | string | The name of the vector store file.   |
| score      | number | The similarity score for the result. |
| attributes |
| content    | array  | Content chunks from the file.        |

## VectorStoreSearchResultsPage

| Field        | Type    | Description                                                        |
| ------------ | ------- | ------------------------------------------------------------------ |
| object       | string  | The object type, which is always`vector_store.search_results.page` |
| search_query | array   |
| data         | array   | The list of search result items.                                   |
| has_more     | boolean | Indicates if there are more results to fetch.                      |
| next_page    |

## Verbosity

## VoiceIdsShared

## Wait

A wait action.

| Field | Type   | Description                                                   |
| ----- | ------ | ------------------------------------------------------------- |
| type  | string | Specifies the event type. For a wait action, this property is |
always set to`wait`.
 |

## WebSearchActionFind

Action type "find": Searches for a pattern within a loaded page.

| Field   | Type   | Description                                        |
| ------- | ------ | -------------------------------------------------- |
| type    | string | The action type.                                   |
| url     | string | The URL of the page searched for the pattern.      |
| pattern | string | The pattern or text to search for within the page. |

## WebSearchActionOpenPage

Action type "open_page" - Opens a specific URL from search results.

| Field | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| type  | string | The action type.             |
| url   | string | The URL opened by the model. |

## WebSearchActionSearch

Action type "search" - Performs a web search query.

| Field   | Type   | Description                     |
| ------- | ------ | ------------------------------- |
| type    | string | The action type.                |
| query   | string | The search query.               |
| sources | array  | The sources used in the search. |

## WebSearchApproximateLocation

## WebSearchContextSize

High level guidance for the amount of context window space to use for the
search. One of `low`, `medium`, or `high`. `medium`is the default.

## WebSearchLocation

Approximate location parameters for the search.

| Field   | Type   | Description    |
| ------- | ------ | -------------- |
| country | string | The two-letter |
[ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user,
e.g.`US`.
 |
| region | string | Free text input for the region of the user, e.g. `California`.
 |
| city | string | Free text input for the city of the user, e.g. `San Francisco`.
 |
| timezone | string | The [IANA timezone](https://timeapi.io/documentation/iana-timezones)
of the user, e.g. `America/Los_Angeles`.
 |

## WebSearchTool

Search the Internet for sources related to the prompt. Learn more about the
[web search tool](https://platform.openai.com/docs/guides/tools-web-search).

| Field               | Type   | Description                                                                                                                                  |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| type                | string | The type of the web search tool. One of `web_search`or`web_search_2025_08_26`.                                                               |
| filters             |
| user_location       |
| search_context_size | string | High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium`is the default. |

## WebSearchToolCall

The results of a web search tool call. See the
[web search guide](https://platform.openai.com/docs/guides/tools-web-search) for more information.

| Field  | Type   | Description                                                             |
| ------ | ------ | ----------------------------------------------------------------------- |
| id     | string | The unique ID of the web search tool call.                              |
| type   | string | The type of the web search tool call. Always`web_search_call`.          |
| status | string | The status of the web search tool call.                                 |
| action | object | An object describing the specific action taken in this web search call. |
Includes details on how the model used the web (search, open_page, find).
 |

## WebhookBatchCancelled

Sent when a batch API request has been cancelled.

| Field      | Type    | Description                                                                  |
| ---------- | ------- | ---------------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the batch API request was cancelled. |
| id         | string  | The unique ID of the event.                                                  |
| data       | object  | Event data payload.                                                          |
| object     | string  | The object of the event. Always `event`.                                     |
| type       | string  | The type of the event. Always `batch.cancelled`.                             |

## WebhookBatchCompleted

Sent when a batch API request has been completed.

| Field      | Type    | Description                                                                  |
| ---------- | ------- | ---------------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the batch API request was completed. |
| id         | string  | The unique ID of the event.                                                  |
| data       | object  | Event data payload.                                                          |
| object     | string  | The object of the event. Always `event`.                                     |
| type       | string  | The type of the event. Always `batch.completed`.                             |

## WebhookBatchExpired

Sent when a batch API request has expired.

| Field      | Type    | Description                                                            |
| ---------- | ------- | ---------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the batch API request expired. |
| id         | string  | The unique ID of the event.                                            |
| data       | object  | Event data payload.                                                    |
| object     | string  | The object of the event. Always `event`.                               |
| type       | string  | The type of the event. Always `batch.expired`.                         |

## WebhookBatchFailed

Sent when a batch API request has failed.

| Field      | Type    | Description                                                           |
| ---------- | ------- | --------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the batch API request failed. |
| id         | string  | The unique ID of the event.                                           |
| data       | object  | Event data payload.                                                   |
| object     | string  | The object of the event. Always `event`.                              |
| type       | string  | The type of the event. Always `batch.failed`.                         |

## WebhookEvalRunCanceled

Sent when an eval run has been canceled.

| Field      | Type    | Description                                                        |
| ---------- | ------- | ------------------------------------------------------------------ |
| created_at | integer | The Unix timestamp (in seconds) of when the eval run was canceled. |
| id         | string  | The unique ID of the event.                                        |
| data       | object  | Event data payload.                                                |
| object     | string  | The object of the event. Always `event`.                           |
| type       | string  | The type of the event. Always `eval.run.canceled`.                 |

## WebhookEvalRunFailed

Sent when an eval run has failed.

| Field      | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| created_at | integer | The Unix timestamp (in seconds) of when the eval run failed. |
| id         | string  | The unique ID of the event.                                  |
| data       | object  | Event data payload.                                          |
| object     | string  | The object of the event. Always `event`.                     |
| type       | string  | The type of the event. Always `eval.run.failed`.             |

## WebhookEvalRunSucceeded

Sent when an eval run has succeeded.

| Field      | Type    | Description                                                     |
| ---------- | ------- | --------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the eval run succeeded. |
| id         | string  | The unique ID of the event.                                     |
| data       | object  | Event data payload.                                             |
| object     | string  | The object of the event. Always `event`.                        |
| type       | string  | The type of the event. Always `eval.run.succeeded`.             |

## WebhookFineTuningJobCancelled

Sent when a fine-tuning job has been cancelled.

| Field      | Type    | Description                                                                |
| ---------- | ------- | -------------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the fine-tuning job was cancelled. |
| id         | string  | The unique ID of the event.                                                |
| data       | object  | Event data payload.                                                        |
| object     | string  | The object of the event. Always `event`.                                   |
| type       | string  | The type of the event. Always `fine_tuning.job.cancelled`.                 |

## WebhookFineTuningJobFailed

Sent when a fine-tuning job has failed.

| Field      | Type    | Description                                                         |
| ---------- | ------- | ------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the fine-tuning job failed. |
| id         | string  | The unique ID of the event.                                         |
| data       | object  | Event data payload.                                                 |
| object     | string  | The object of the event. Always `event`.                            |
| type       | string  | The type of the event. Always `fine_tuning.job.failed`.             |

## WebhookFineTuningJobSucceeded

Sent when a fine-tuning job has succeeded.

| Field      | Type    | Description                                                            |
| ---------- | ------- | ---------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the fine-tuning job succeeded. |
| id         | string  | The unique ID of the event.                                            |
| data       | object  | Event data payload.                                                    |
| object     | string  | The object of the event. Always `event`.                               |
| type       | string  | The type of the event. Always `fine_tuning.job.succeeded`.             |

## WebhookRealtimeCallIncoming

Sent when Realtime API Receives a incoming SIP call.

| Field      | Type    | Description                                                               |
| ---------- | ------- | ------------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the model response was completed. |
| id         | string  | The unique ID of the event.                                               |
| data       | object  | Event data payload.                                                       |
| object     | string  | The object of the event. Always `event`.                                  |
| type       | string  | The type of the event. Always `realtime.call.incoming`.                   |

## WebhookResponseCancelled

Sent when a background response has been cancelled.

| Field      | Type    | Description                                                               |
| ---------- | ------- | ------------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the model response was cancelled. |
| id         | string  | The unique ID of the event.                                               |
| data       | object  | Event data payload.                                                       |
| object     | string  | The object of the event. Always `event`.                                  |
| type       | string  | The type of the event. Always `response.cancelled`.                       |

## WebhookResponseCompleted

Sent when a background response has been completed.

| Field      | Type    | Description                                                               |
| ---------- | ------- | ------------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the model response was completed. |
| id         | string  | The unique ID of the event.                                               |
| data       | object  | Event data payload.                                                       |
| object     | string  | The object of the event. Always `event`.                                  |
| type       | string  | The type of the event. Always `response.completed`.                       |

## WebhookResponseFailed

Sent when a background response has failed.

| Field      | Type    | Description                                                        |
| ---------- | ------- | ------------------------------------------------------------------ |
| created_at | integer | The Unix timestamp (in seconds) of when the model response failed. |
| id         | string  | The unique ID of the event.                                        |
| data       | object  | Event data payload.                                                |
| object     | string  | The object of the event. Always `event`.                           |
| type       | string  | The type of the event. Always `response.failed`.                   |

## WebhookResponseIncomplete

Sent when a background response has been interrupted.

| Field      | Type    | Description                                                                 |
| ---------- | ------- | --------------------------------------------------------------------------- |
| created_at | integer | The Unix timestamp (in seconds) of when the model response was interrupted. |
| id         | string  | The unique ID of the event.                                                 |
| data       | object  | Event data payload.                                                         |
| object     | string  | The object of the event. Always `event`.                                    |
| type       | string  | The type of the event. Always `response.incomplete`.                        |

## MessageStatus

## MessageRole

## InputTextContent

A text input to the model.

| Field | Type   | Description                                      |
| ----- | ------ | ------------------------------------------------ |
| type  | string | The type of the input item. Always `input_text`. |
| text  | string | The text input to the model.                     |

## FileCitationBody

A citation to a file.

| Field    | Type    | Description                                            |
| -------- | ------- | ------------------------------------------------------ |
| type     | string  | The type of the file citation. Always `file_citation`. |
| file_id  | string  | The ID of the file.                                    |
| index    | integer | The index of the file in the list of files.            |
| filename | string  | The filename of the file cited.                        |

## UrlCitationBody

A citation for a web resource used to generate a model response.

| Field       | Type    | Description                                                          |
| ----------- | ------- | -------------------------------------------------------------------- |
| type        | string  | The type of the URL citation. Always `url_citation`.                 |
| url         | string  | The URL of the web resource.                                         |
| start_index | integer | The index of the first character of the URL citation in the message. |
| end_index   | integer | The index of the last character of the URL citation in the message.  |
| title       | string  | The title of the web resource.                                       |

## ContainerFileCitationBody

A citation for a container file used to generate a model response.

| Field        | Type    | Description                                                                     |
| ------------ | ------- | ------------------------------------------------------------------------------- |
| type         | string  | The type of the container file citation. Always `container_file_citation`.      |
| container_id | string  | The ID of the container file.                                                   |
| file_id      | string  | The ID of the file.                                                             |
| start_index  | integer | The index of the first character of the container file citation in the message. |
| end_index    | integer | The index of the last character of the container file citation in the message.  |
| filename     | string  | The filename of the container file cited.                                       |

## Annotation

## TopLogProb

The top log probability of a token.

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| token   | string |
| logprob | number |
| bytes   | array  |

## LogProb

The log probability of a token.

| Field        | Type   | Description |
| ------------ | ------ | ----------- |
| token        | string |
| logprob      | number |
| bytes        | array  |
| top_logprobs | array  |

## OutputTextContent

A text output from the model.

| Field       | Type   | Description                                        |
| ----------- | ------ | -------------------------------------------------- |
| type        | string | The type of the output text. Always `output_text`. |
| text        | string | The text output from the model.                    |
| annotations | array  | The annotations of the text output.                |
| logprobs    | array  |

## TextContent

A text content.

| Field | Type   | Description |
| ----- | ------ | ----------- |
| type  | string |
| text  | string |

## SummaryTextContent

A summary text from the model.

| Field | Type   | Description                                              |
| ----- | ------ | -------------------------------------------------------- |
| type  | string | The type of the object. Always `summary_text`.           |
| text  | string | A summary of the reasoning output from the model so far. |

## ReasoningTextContent

Reasoning text from the model.

| Field | Type   | Description                                              |
| ----- | ------ | -------------------------------------------------------- |
| type  | string | The type of the reasoning text. Always `reasoning_text`. |
| text  | string | The reasoning text from the model.                       |

## RefusalContent

A refusal from the model.

| Field   | Type   | Description                                |
| ------- | ------ | ------------------------------------------ |
| type    | string | The type of the refusal. Always `refusal`. |
| refusal | string | The refusal explanation from the model.    |

## ImageDetail

## InputImageContent

An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

| Field     | Type                                                                                                        | Description                                       |
| --------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| type      | string                                                                                                      | The type of the input item. Always `input_image`. |
| image_url |
| file_id   |
| detail    | The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`. |

## ComputerScreenshotContent

A screenshot of a computer.

| Field     | Type   | Description                                                                                                |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| type      | string | Specifies the event type. For a computer screenshot, this property is always set to `computer_screenshot`. |
| image_url |
| file_id   |

## InputFileContent

A file input to the model.

| Field     | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| type      | string | The type of the input item. Always `input_file`. |
| file_id   |
| filename  | string | The name of the file to be sent to the model.    |
| file_url  | string | The URL of the file to be sent to the model.     |
| file_data | string | The content of the file to be sent to the model. |

## Message

A message to or from the model.

| Field   | Type                                                                                                                         | Description                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| type    | string                                                                                                                       | The type of the message. Always set to `message`. |
| id      | string                                                                                                                       | The unique ID of the message.                     |
| status  | The status of item. One of `in_progress`, `completed`, or `incomplete`. Populated when items are returned via API.           |
| role    | The role of the message. One of `unknown`, `user`, `assistant`, `system`, `critic`, `discriminator`, `developer`, or `tool`. |
| content | array                                                                                                                        | The content of the message                        |

## MCPToolCallStatus

## DetailEnum

## ComputerCallSafetyCheckParam

A pending safety check for the computer call.

| Field   | Type   | Description                         |
| ------- | ------ | ----------------------------------- |
| id      | string | The ID of the pending safety check. |
| code    |
| message |

## FunctionCallItemStatus

## ComputerCallOutputItemParam

The output of a computer tool call.

| Field                      | Type   | Description                                                               |
| -------------------------- | ------ | ------------------------------------------------------------------------- |
| id                         |
| call_id                    | string | The ID of the computer tool call that produced the output.                |
| type                       | string | The type of the computer tool call output. Always `computer_call_output`. |
| output                     |
| acknowledged_safety_checks |
| status                     |

## InputTextContentParam

A text input to the model.

| Field | Type   | Description                                      |
| ----- | ------ | ------------------------------------------------ |
| type  | string | The type of the input item. Always `input_text`. |
| text  | string | The text input to the model.                     |

## InputImageContentParamAutoParam

An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision)

| Field     | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| type      | string | The type of the input item. Always `input_image`. |
| image_url |
| file_id   |
| detail    |

## InputFileContentParam

A file input to the model.

| Field     | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| type      | string | The type of the input item. Always `input_file`. |
| file_id   |
| filename  |
| file_data |
| file_url  |

## FunctionCallOutputItemParam

The output of a function tool call.

| Field   | Type                                                   | Description                                                               |
| ------- | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| id      |
| call_id | string                                                 | The unique ID of the function tool call generated by the model.           |
| type    | string                                                 | The type of the function tool call output. Always `function_call_output`. |
| output  | Text, image, or file output of the function tool call. |
| status  |

## ItemReferenceParam

An internal identifier for an item to reference.

| Field | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| type  |
| id    | string | The ID of the item to reference. |

## ConversationResource

| Field    | Type                                                                                                                                                                                                                           | Description                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| id       | string                                                                                                                                                                                                                         | The unique ID of the conversation.               |
| object   | string                                                                                                                                                                                                                         | The object type, which is always `conversation`. |
| metadata | Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard. |

        Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters. |
| created_at | integer | The time at which the conversation was created, measured in seconds since the Unix epoch. |

## FunctionTool

Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

| Field       | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| type        | string | The type of the function tool. Always `function`. |
| name        | string | The name of the function to call.                 |
| description |
| parameters  |
| strict      |

## RankerVersionType

## RankingOptions

| Field           | Type                                   | Description                                                                                                                                                                 |
| --------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ranker          | The ranker to use for the file search. |
| score_threshold | number                                 | The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results. |

## Filters

## FileSearchTool

A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

| Field            | Type                        | Description                                                                                |
| ---------------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| type             | string                      | The type of the file search tool. Always `file_search`.                                    |
| vector_store_ids | array                       | The IDs of the vector stores to search.                                                    |
| max_num_results  | integer                     | The maximum number of results to return. This number should be between 1 and 50 inclusive. |
| ranking_options  | Ranking options for search. |
| filters          |

## ComputerEnvironment

## ComputerUsePreviewTool

A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

| Field          | Type                                         | Description                                                       |
| -------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| type           | string                                       | The type of the computer use tool. Always `computer_use_preview`. |
| environment    | The type of computer environment to control. |
| display_width  | integer                                      | The width of the computer display.                                |
| display_height | integer                                      | The height of the computer display.                               |

## ApproximateLocation

| Field    | Type   | Description                                               |
| -------- | ------ | --------------------------------------------------------- |
| type     | string | The type of location approximation. Always `approximate`. |
| country  |
| region   |
| city     |
| timezone |

## SearchContextSize

## WebSearchPreviewTool

This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

| Field               | Type                                                                                                                                         | Description                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| type                | string                                                                                                                                       | The type of the web search tool. One of `web_search_preview`or`web_search_preview_2025_03_11`. |
| user_location       |
| search_context_size | High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium`is the default. |

## ImageGenInputUsageDetails

The input tokens detailed information for the image generation.

| Field        | Type    | Description                                     |
| ------------ | ------- | ----------------------------------------------- |
| text_tokens  | integer | The number of text tokens in the input prompt.  |
| image_tokens | integer | The number of image tokens in the input prompt. |

## ImageGenUsage

For`gpt-image-1`only, the token usage information for the image generation.

| Field                | Type    | Description                                                                 |
| -------------------- | ------- | --------------------------------------------------------------------------- |
| input_tokens         | integer | The number of tokens (images and text) in the input prompt.                 |
| total_tokens         | integer | The total number of tokens (images and text) used for the image generation. |
| output_tokens        | integer | The number of output tokens generated by the model.                         |
| input_tokens_details |

## ConversationParam

The conversation that this response belongs to.

| Field | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| id    | string | The unique ID of the conversation. |

## Conversation-2

The conversation that this response belongs to. Input items and output items from this response are automatically added to this conversation.

| Field | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| id    | string | The unique ID of the conversation. |

## CreateConversationBody

| Field    | Type | Description |
| -------- | ---- | ----------- |
| metadata |
| items    |

## UpdateConversationBody

| Field    | Type                                                                                                                                                                                                                           | Description |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| metadata | Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard. |

        Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters. |

## DeletedConversationResource

| Field   | Type    | Description |
| ------- | ------- | ----------- |
| object  | string  |
| deleted | boolean |
| id      | string  |

## OrderEnum

## VideoModel

## VideoStatus

## VideoSize

## VideoSeconds

## Error-2

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| code    | string |
| message | string |

## VideoResource

Structured information describing a generated video job.

| Field                 | Type                                              | Description                                                |
| --------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| id                    | string                                            | Unique identifier for the video job.                       |
| object                | string                                            | The object type, which is always`video`.                   |
| model                 | The video generation model that produced the job. |
| status                | Current lifecycle status of the video job.        |
| progress              | integer                                           | Approximate completion percentage for the generation task. |
| created_at            | integer                                           | Unix timestamp (seconds) for when the job was created.     |
| completed_at          |
| expires_at            |
| size                  | The resolution of the generated video.            |
| seconds               | Duration of the generated clip in seconds.        |
| remixed_from_video_id |
| error                 |

## VideoListResource

| Field    | Type                                         | Description                             |
| -------- | -------------------------------------------- | --------------------------------------- |
| object   | The type of object returned, must be `list`. |
| data     | array                                        | A list of items                         |
| first_id |
| last_id  |
| has_more | boolean                                      | Whether there are more items available. |

## CreateVideoBody

Parameters for creating a new video generation job.

| Field           | Type                                                                 | Description                                       |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| model           | The video generation model to use. Defaults to `sora-2`.             |
| prompt          | string                                                               | Text prompt that describes the video to generate. |
| input_reference | string                                                               | Optional image reference that guides generation.  |
| seconds         | Clip duration in seconds. Defaults to 4 seconds.                     |
| size            | Output resolution formatted as width x height. Defaults to 720x1280. |

## DeletedVideoResource

Confirmation payload returned after deleting a video.

| Field   | Type    | Description                                         |
| ------- | ------- | --------------------------------------------------- |
| object  | string  | The object type that signals the deletion response. |
| deleted | boolean | Indicates that the video resource was deleted.      |
| id      | string  | Identifier of the deleted video.                    |

## VideoContentVariant

## CreateVideoRemixBody

Parameters for remixing an existing generated video.

| Field  | Type   | Description                                            |
| ------ | ------ | ------------------------------------------------------ |
| prompt | string | Updated text prompt that directs the remix generation. |

## UploadFileBody

Parameters for uploading an attachment to the active ChatKit session.

| Field | Type   | Description                                                                                                    |
| ----- | ------ | -------------------------------------------------------------------------------------------------------------- |
| file  | string | Binary file contents to store with the ChatKit session. Supports PDFs and PNG, JPG, JPEG, GIF, or WEBP images. |

## FilePartResource

Metadata for a non-image file uploaded through ChatKit.

| Field      | Type   | Description                               |
| ---------- | ------ | ----------------------------------------- |
| id         | string | Unique identifier for the uploaded file.  |
| type       | string | Type discriminator that is always `file`. |
| name       |
| mime_type  |
| upload_url |

## ImagePartResource

Metadata for an image uploaded through ChatKit.

| Field       | Type   | Description                                            |
| ----------- | ------ | ------------------------------------------------------ |
| id          | string | Unique identifier for the uploaded image.              |
| type        | string | Type discriminator that is always `image`.             |
| mime_type   | string | MIME type of the uploaded image.                       |
| name        |
| preview_url | string | Preview URL that can be rendered inline for the image. |
| upload_url  |

## ChatkitWorkflowTracing

Controls diagnostic tracing during the session.

| Field   | Type    | Description                           |
| ------- | ------- | ------------------------------------- |
| enabled | boolean | Indicates whether tracing is enabled. |

## ChatkitWorkflow

Workflow metadata and state returned for the session.

| Field           | Type                                      | Description                                     |
| --------------- | ----------------------------------------- | ----------------------------------------------- |
| id              | string                                    | Identifier of the workflow backing the session. |
| version         |
| state_variables |
| tracing         | Tracing settings applied to the workflow. |

## ChatSessionRateLimits

Active per-minute request limit for the session.

| Field                     | Type    | Description                                     |
| ------------------------- | ------- | ----------------------------------------------- |
| max_requests_per_1_minute | integer | Maximum allowed requests per one-minute window. |

## ChatSessionStatus

## ChatSessionAutomaticThreadTitling

Automatic thread title preferences for the session.

| Field   | Type    | Description                                  |
| ------- | ------- | -------------------------------------------- |
| enabled | boolean | Whether automatic thread titling is enabled. |

## ChatSessionFileUpload

Upload permissions and limits applied to the session.

| Field         | Type    | Description                                       |
| ------------- | ------- | ------------------------------------------------- |
| enabled       | boolean | Indicates if uploads are enabled for the session. |
| max_file_size |
| max_files     |

## ChatSessionHistory

History retention preferences returned for the session.

| Field          | Type    | Description                                             |
| -------------- | ------- | ------------------------------------------------------- |
| enabled        | boolean | Indicates if chat history is persisted for the session. |
| recent_threads |

## ChatSessionChatkitConfiguration

ChatKit configuration for the session.

| Field                    | Type                                  | Description |
| ------------------------ | ------------------------------------- | ----------- |
| automatic_thread_titling | Automatic thread titling preferences. |
| file_upload              | Upload settings for the session.      |
| history                  | History retention configuration.      |

## ChatSessionResource

Represents a ChatKit session and its resolved configuration.

| Field                     | Type                                                    | Description                                                  |
| ------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| id                        | string                                                  | Identifier for the ChatKit session.                          |
| object                    | string                                                  | Type discriminator that is always `chatkit.session`.         |
| expires_at                | integer                                                 | Unix timestamp (in seconds) for when the session expires.    |
| client_secret             | string                                                  | Ephemeral client secret that authenticates session requests. |
| workflow                  | Workflow metadata for the session.                      |
| user                      | string                                                  | User identifier associated with the session.                 |
| rate_limits               | Resolved rate limit values.                             |
| max_requests_per_1_minute | integer                                                 | Convenience copy of the per-minute request limit.            |
| status                    | Current lifecycle state of the session.                 |
| chatkit_configuration     | Resolved ChatKit feature configuration for the session. |

## WorkflowTracingParam

Controls diagnostic tracing during the session.

| Field   | Type    | Description                                                      |
| ------- | ------- | ---------------------------------------------------------------- |
| enabled | boolean | Whether tracing is enabled during the session. Defaults to true. |

## WorkflowParam

Workflow reference and overrides applied to the chat session.

| Field           | Type                                                                                                 | Description                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| id              | string                                                                                               | Identifier for the workflow invoked by the session.                                                                                                  |
| version         | string                                                                                               | Specific workflow version to run. Defaults to the latest deployed version.                                                                           |
| state_variables | object                                                                                               | State variables forwarded to the workflow. Keys may be up to 64 characters, values must be primitive types, and the map defaults to an empty object. |
| tracing         | Optional tracing overrides for the workflow invocation. When omitted, tracing is enabled by default. |

## ExpiresAfterParam

Controls when the session expires relative to an anchor timestamp.

| Field   | Type    | Description                                                                   |
| ------- | ------- | ----------------------------------------------------------------------------- |
| anchor  | string  | Base timestamp used to calculate expiration. Currently fixed to `created_at`. |
| seconds | integer | Number of seconds after the anchor when the session expires.                  |

## RateLimitsParam

Controls request rate limits for the session.

| Field                     | Type    | Description                                                                    |
| ------------------------- | ------- | ------------------------------------------------------------------------------ |
| max_requests_per_1_minute | integer | Maximum number of requests allowed per minute for the session. Defaults to 10. |

## AutomaticThreadTitlingParam

Controls whether ChatKit automatically generates thread titles.

| Field   | Type    | Description                                                 |
| ------- | ------- | ----------------------------------------------------------- |
| enabled | boolean | Enable automatic thread title generation. Defaults to true. |

## FileUploadParam

Controls whether users can upload files.

| Field         | Type    | Description                                                                                                |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| enabled       | boolean | Enable uploads for this session. Defaults to false.                                                        |
| max_file_size | integer | Maximum size in megabytes for each uploaded file. Defaults to 512 MB, which is the maximum allowable size. |
| max_files     | integer | Maximum number of files that can be uploaded to the session. Defaults to 10.                               |

## HistoryParam

Controls how much historical context is retained for the session.

| Field          | Type    | Description                                                                              |
| -------------- | ------- | ---------------------------------------------------------------------------------------- |
| enabled        | boolean | Enables chat users to access previous ChatKit threads. Defaults to true.                 |
| recent_threads | integer | Number of recent ChatKit threads users have access to. Defaults to unlimited when unset. |

## ChatkitConfigurationParam

Optional per-session configuration settings for ChatKit behavior.

| Field                    | Type                                                                                                                                | Description |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| automatic_thread_titling | Configuration for automatic thread titling. When omitted, automatic thread titling is enabled by default.                           |
| file_upload              | Configuration for upload enablement and limits. When omitted, uploads are disabled by default (max_files 10, max_file_size 512 MB). |
| history                  | Configuration for chat history retention. When omitted, history is enabled by default with no limit on recent_threads (null).       |

## CreateChatSessionBody

Parameters for provisioning a new ChatKit session.

| Field                 | Type                                                                                              | Description                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| workflow              | Workflow that powers the session.                                                                 |
| user                  | string                                                                                            | A free-form string that identifies your end user; ensures this Session can access other objects that have the same `user`scope. |
| expires_after         | Optional override for session expiration timing in seconds from creation. Defaults to 10 minutes. |
| rate_limits           | Optional override for per-minute request limits. When omitted, defaults to 10.                    |
| chatkit_configuration | Optional overrides for ChatKit runtime configuration features                                     |

## UserMessageInputText

Text block that a user contributed to the thread.

| Field | Type   | Description                                    |
| ----- | ------ | ---------------------------------------------- |
| type  | string | Type discriminator that is always`input_text`. |
| text  | string | Plain-text content supplied by the user.       |

## UserMessageQuotedText

Quoted snippet that the user referenced in their message.

| Field | Type   | Description                                      |
| ----- | ------ | ------------------------------------------------ |
| type  | string | Type discriminator that is always `quoted_text`. |
| text  | string | Quoted text content.                             |

## AttachmentType

## Attachment

Attachment metadata included on thread items.

| Field       | Type                      | Description                               |
| ----------- | ------------------------- | ----------------------------------------- |
| type        | Attachment discriminator. |
| id          | string                    | Identifier for the attachment.            |
| name        | string                    | Original display name for the attachment. |
| mime_type   | string                    | MIME type of the attachment.              |
| preview_url |

## ToolChoice

Tool selection that the assistant should honor when executing the item.

| Field | Type   | Description                       |
| ----- | ------ | --------------------------------- |
| id    | string | Identifier of the requested tool. |

## InferenceOptions

Model and tool overrides applied when generating the assistant response.

| Field       | Type | Description |
| ----------- | ---- | ----------- |
| tool_choice |
| model       |

## UserMessageItem

User-authored messages within a thread.

| Field             | Type    | Description                                                              |
| ----------------- | ------- | ------------------------------------------------------------------------ |
| id                | string  | Identifier of the thread item.                                           |
| object            | string  | Type discriminator that is always `chatkit.thread_item`.                 |
| created_at        | integer | Unix timestamp (in seconds) for when the item was created.               |
| thread_id         | string  | Identifier of the parent thread.                                         |
| type              | string  |
| content           | array   | Ordered content elements supplied by the user.                           |
| attachments       | array   | Attachments associated with the user message. Defaults to an empty list. |
| inference_options |

## FileAnnotationSource

Attachment source referenced by an annotation.

| Field    | Type   | Description                               |
| -------- | ------ | ----------------------------------------- |
| type     | string | Type discriminator that is always `file`. |
| filename | string | Filename referenced by the annotation.    |

## FileAnnotation

Annotation that references an uploaded file.

| Field  | Type                                          | Description                                                  |
| ------ | --------------------------------------------- | ------------------------------------------------------------ |
| type   | string                                        | Type discriminator that is always `file`for this annotation. |
| source | File attachment referenced by the annotation. |

## UrlAnnotationSource

URL backing an annotation entry.

| Field | Type   | Description                             |
| ----- | ------ | --------------------------------------- |
| type  | string | Type discriminator that is always`url`. |
| url   | string | URL referenced by the annotation.       |

## UrlAnnotation

Annotation that references a URL.

| Field  | Type                              | Description                                                 |
| ------ | --------------------------------- | ----------------------------------------------------------- |
| type   | string                            | Type discriminator that is always `url`for this annotation. |
| source | URL referenced by the annotation. |

## ResponseOutputText

Assistant response text accompanied by optional annotations.

| Field       | Type   | Description                                                |
| ----------- | ------ | ---------------------------------------------------------- |
| type        | string | Type discriminator that is always`output_text`.            |
| text        | string | Assistant generated text.                                  |
| annotations | array  | Ordered list of annotations attached to the response text. |

## AssistantMessageItem

Assistant-authored message within a thread.

| Field      | Type    | Description                                                    |
| ---------- | ------- | -------------------------------------------------------------- |
| id         | string  | Identifier of the thread item.                                 |
| object     | string  | Type discriminator that is always `chatkit.thread_item`.       |
| created_at | integer | Unix timestamp (in seconds) for when the item was created.     |
| thread_id  | string  | Identifier of the parent thread.                               |
| type       | string  | Type discriminator that is always `chatkit.assistant_message`. |
| content    | array   | Ordered assistant response segments.                           |

## WidgetMessageItem

Thread item that renders a widget payload.

| Field      | Type    | Description                                                |
| ---------- | ------- | ---------------------------------------------------------- |
| id         | string  | Identifier of the thread item.                             |
| object     | string  | Type discriminator that is always `chatkit.thread_item`.   |
| created_at | integer | Unix timestamp (in seconds) for when the item was created. |
| thread_id  | string  | Identifier of the parent thread.                           |
| type       | string  | Type discriminator that is always `chatkit.widget`.        |
| widget     | string  | Serialized widget payload rendered in the UI.              |

## ClientToolCallStatus

## ClientToolCallItem

Record of a client side tool invocation initiated by the assistant.

| Field      | Type                                | Description                                                   |
| ---------- | ----------------------------------- | ------------------------------------------------------------- |
| id         | string                              | Identifier of the thread item.                                |
| object     | string                              | Type discriminator that is always `chatkit.thread_item`.      |
| created_at | integer                             | Unix timestamp (in seconds) for when the item was created.    |
| thread_id  | string                              | Identifier of the parent thread.                              |
| type       | string                              | Type discriminator that is always `chatkit.client_tool_call`. |
| status     | Execution status for the tool call. |
| call_id    | string                              | Identifier for the client tool call.                          |
| name       | string                              | Tool name that was invoked.                                   |
| arguments  | string                              | JSON-encoded arguments that were sent to the tool.            |
| output     |

## TaskType

## TaskItem

Task emitted by the workflow to show progress and status updates.

| Field      | Type                  | Description                                                |
| ---------- | --------------------- | ---------------------------------------------------------- |
| id         | string                | Identifier of the thread item.                             |
| object     | string                | Type discriminator that is always `chatkit.thread_item`.   |
| created_at | integer               | Unix timestamp (in seconds) for when the item was created. |
| thread_id  | string                | Identifier of the parent thread.                           |
| type       | string                | Type discriminator that is always `chatkit.task`.          |
| task_type  | Subtype for the task. |
| heading    |
| summary    |

## TaskGroupTask

Task entry that appears within a TaskGroup.

| Field   | Type                          | Description |
| ------- | ----------------------------- | ----------- |
| type    | Subtype for the grouped task. |
| heading |
| summary |

## TaskGroupItem

Collection of workflow tasks grouped together in the thread.

| Field      | Type    | Description                                                |
| ---------- | ------- | ---------------------------------------------------------- |
| id         | string  | Identifier of the thread item.                             |
| object     | string  | Type discriminator that is always `chatkit.thread_item`.   |
| created_at | integer | Unix timestamp (in seconds) for when the item was created. |
| thread_id  | string  | Identifier of the parent thread.                           |
| type       | string  | Type discriminator that is always `chatkit.task_group`.    |
| tasks      | array   | Tasks included in the group.                               |

## ThreadItem

## ThreadItemListResource

A paginated list of thread items rendered for the ChatKit API.

| Field    | Type                                         | Description                             |
| -------- | -------------------------------------------- | --------------------------------------- |
| object   | The type of object returned, must be `list`. |
| data     | array                                        | A list of items                         |
| first_id |
| last_id  |
| has_more | boolean                                      | Whether there are more items available. |

## ActiveStatus

Indicates that a thread is active.

| Field | Type   | Description                                   |
| ----- | ------ | --------------------------------------------- |
| type  | string | Status discriminator that is always `active`. |

## LockedStatus

Indicates that a thread is locked and cannot accept new input.

| Field  | Type   | Description                                   |
| ------ | ------ | --------------------------------------------- |
| type   | string | Status discriminator that is always `locked`. |
| reason |

## ClosedStatus

Indicates that a thread has been closed.

| Field  | Type   | Description                                   |
| ------ | ------ | --------------------------------------------- |
| type   | string | Status discriminator that is always `closed`. |
| reason |

## ThreadResource

Represents a ChatKit thread and its current status.

| Field      | Type                                                                          | Description                                                         |
| ---------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| id         | string                                                                        | Identifier of the thread.                                           |
| object     | string                                                                        | Type discriminator that is always `chatkit.thread`.                 |
| created_at | integer                                                                       | Unix timestamp (in seconds) for when the thread was created.        |
| title      |
| status     | Current status for the thread. Defaults to `active`for newly created threads. |
| user       | string                                                                        | Free-form string that identifies your end user who owns the thread. |

## DeletedThreadResource

Confirmation payload returned after deleting a thread.

| Field   | Type    | Description                                                |
| ------- | ------- | ---------------------------------------------------------- |
| id      | string  | Identifier of the deleted thread.                          |
| object  | string  | Type discriminator that is always`chatkit.thread.deleted`. |
| deleted | boolean | Indicates that the thread has been deleted.                |

## ThreadListResource

A paginated list of ChatKit threads.

| Field    | Type                                         | Description                             |
| -------- | -------------------------------------------- | --------------------------------------- |
| object   | The type of object returned, must be `list`. |
| data     | array                                        | A list of items                         |
| first_id |
| last_id  |
| has_more | boolean                                      | Whether there are more items available. |

## RealtimeConnectParams

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| model   | string |
| call_id | string |

## ModerationImageURLInput

An object describing an image to classify.

| Field     | Type   | Description                                                            |
| --------- | ------ | ---------------------------------------------------------------------- |
| type      | string | Always `image_url`.                                                    |
| image_url | object | Contains either an image URL or a data URL for a base64 encoded image. |

## ModerationTextInput

An object describing text to classify.

| Field | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| type  | string | Always `text`.                |
| text  | string | A string of text to classify. |

## ChunkingStrategyResponse

The strategy used to chunk the file.

## FilePurpose

The intended purpose of the uploaded file. One of: - `assistants`: Used in the Assistants API - `batch`: Used in the Batch API - `fine-tune`: Used for fine-tuning - `vision`: Images used for vision fine-tuning - `user_data`: Flexible file type for any purpose - `evals`: Used for eval data sets

## BatchError

| Field   | Type   | Description                                                      |
| ------- | ------ | ---------------------------------------------------------------- |
| code    | string | An error code identifying the error type.                        |
| message | string | A human-readable message providing more details about the error. |
| param   |
| line    |

## BatchRequestCounts

The request counts for different statuses within the batch.

| Field     | Type    | Description                                               |
| --------- | ------- | --------------------------------------------------------- |
| total     | integer | Total number of requests in the batch.                    |
| completed | integer | Number of requests that have been completed successfully. |
| failed    | integer | Number of requests that have failed.                      |

## AssistantTool

## TextAnnotationDelta

## TextAnnotation

## RunStepDetailsToolCall

## RunStepDeltaStepDetailsToolCall

## MessageContent

## MessageContentDelta

## ChatModel

## Summary

A summary text from the model.

| Field | Type   | Description                                              |
| ----- | ------ | -------------------------------------------------------- |
| type  | string | The type of the object. Always `summary_text`.           |
| text  | string | A summary of the reasoning output from the model so far. |

## CreateThreadAndRunRequestWithoutStream

| Field          | Type                                                                                                                                                                                                                                                              | Description                                                                                                                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assistant_id   | string                                                                                                                                                                                                                                                            | The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to execute this run.                                                                                                                                |
| thread         |
| model          | The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used. |
| instructions   | string                                                                                                                                                                                                                                                            | Override the default system message of the assistant. This is useful for modifying the behavior on a per-run basis.                                                                                                                             |
| tools          | array                                                                                                                                                                                                                                                             | Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.                                                                                                                            |
| tool_resources | object                                                                                                                                                                                                                                                            | A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter`tool requires a list of file IDs, while the`file_search`tool requires a list of vector store IDs. |
| metadata       |
| temperature    | number                                                                                                                                                                                                                                                            | What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.                                                            |
| top_p          | number                                                                                                                                                                                                                                                            | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.     |

We generally recommend altering this or temperature but not both.
 |
| max_prompt_tokens | integer | The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status`incomplete`. See `incomplete_details`for more info.
 |
| max_completion_tokens | integer | The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status`incomplete`. See `incomplete_details`for more info.
 |
| truncation_strategy |
| tool_choice |
| parallel_tool_calls |
| response_format |

## CreateRunRequestWithoutStream

| Field                   | Type                                                                                                                                                                                                                                                              | Description                                                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assistant_id            | string                                                                                                                                                                                                                                                            | The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to execute this run.                                                                                                                            |
| model                   | The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used. |
| reasoning_effort        |
| instructions            | string                                                                                                                                                                                                                                                            | Overrides the [instructions](https://platform.openai.com/docs/api-reference/assistants/createAssistant) of the assistant. This is useful for modifying the behavior on a per-run basis.                                                     |
| additional_instructions | string                                                                                                                                                                                                                                                            | Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.                                                             |
| additional_messages     | array                                                                                                                                                                                                                                                             | Adds additional messages to the thread before creating the run.                                                                                                                                                                             |
| tools                   | array                                                                                                                                                                                                                                                             | Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.                                                                                                                        |
| metadata                |
| temperature             | number                                                                                                                                                                                                                                                            | What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.                                                        |
| top_p                   | number                                                                                                                                                                                                                                                            | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. |

We generally recommend altering this or temperature but not both.
 |
| max_prompt_tokens | integer | The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status`incomplete`. See `incomplete_details`for more info.
 |
| max_completion_tokens | integer | The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status`incomplete`. See `incomplete_details`for more info.
 |
| truncation_strategy |
| tool_choice |
| parallel_tool_calls |
| response_format |

## SubmitToolOutputsRunRequestWithoutStream

| Field        | Type  | Description                                                |
| ------------ | ----- | ---------------------------------------------------------- |
| tool_outputs | array | A list of tools for which the outputs are being submitted. |

## RunStatus

The status of the run, which can be either`queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

## RunStepDeltaObjectDelta

The delta containing the fields that have changed on the run step.

| Field        | Type   | Description                  |
| ------------ | ------ | ---------------------------- |
| step_details | object | The details of the run step. |
