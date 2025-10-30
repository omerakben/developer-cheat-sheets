import { CheatSheet } from "@/types/cheatsheet";

export const openaiCheatSheet: CheatSheet = {
  title: "OpenAI API Cheat Sheet",
  description:
    "Comprehensive OpenAI API guide • Chat completions • Vision • Audio • Embeddings • Assistants • Function calling • Best practices",
  sections: [
    {
      id: "quick-start",
      title: "Quick Start & Authentication",
      description:
        "Set up authentication • Install SDKs • Make your first API call",
      examples: [
        {
          title: "API Key Setup",
          description:
            "Configure API key for all platforms • Secure environment variable setup",
          language: "bash",
          difficulty: "beginner",
          tags: ["setup", "authentication", "security", "api-keys"],
          code: `# macOS / Linux
export OPENAI_API_KEY="sk-proj-..."

# Windows PowerShell
setx OPENAI_API_KEY "sk-proj-..."

# SECURITY: Never commit API keys
# Use environment variables or secret managers
# Rotate keys regularly`,
        },
        {
          title: "Python SDK Basic Usage",
          description:
            "Install SDK and make your first API call • Automatic authentication",
          language: "python",
          difficulty: "beginner",
          tags: ["python", "sdk", "chat", "getting-started"],
          code: `# Installation: pip install openai
from openai import OpenAI

client = OpenAI()  # Reads OPENAI_API_KEY from environment

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`,
        },
        {
          title: "JavaScript/TypeScript SDK",
          description:
            "Node.js setup with TypeScript support • Type-safe API calls",
          language: "typescript",
          code: `// Installation: npm install openai
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" }
  ],
});

console.log(response.choices[0].message.content);`,
        },
        {
          title: "Error Handling",
          description:
            "Robust error handling • Rate limits • Retry logic with exponential backoff",
          language: "python",
          code: `from openai import OpenAI, APIError, RateLimitError
import time

client = OpenAI()

def api_call_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                timeout=30.0
            )
        except RateLimitError:
            wait = (2 ** attempt)
            print(f"Rate limit. Waiting {wait}s...")
            time.sleep(wait)
        except APIError as e:
            print(f"API error: {e}")
            raise
    raise Exception("Max retries exceeded")`,
        },
      ],
    },
    {
      id: "chat-completions",
      title: "Chat Completions",
      description:
        "Text generation • Streaming • Multi-turn conversations • Parameters",
      examples: [
        {
          title: "Basic Chat Completion",
          description:
            "Single-turn conversation with parameters • Temperature and token control",
          language: "python",
          code: `from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a Python expert."},
        {"role": "user", "content": "How do I read a CSV file?"}
    ],
    temperature=0.7,     # 0.0-2.0 (creativity)
    max_tokens=500,      # Maximum response length
    top_p=1.0,           # Nucleus sampling
    frequency_penalty=0, # Reduce repetition
    presence_penalty=0   # Encourage new topics
)

print(response.choices[0].message.content)
print(f"Tokens: {response.usage.total_tokens}")`,
        },
        {
          title: "Streaming Responses",
          description:
            "Real-time token streaming • Better UX • Process chunks as they arrive",
          language: "python",
          code: `from openai import OpenAI

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Write a story."}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`,
        },
        {
          title: "Multi-Turn Conversation",
          description:
            "Maintain conversation history • Build chatbot interactions",
          language: "python",
          code: `from openai import OpenAI

client = OpenAI()

messages = [
    {"role": "system", "content": "You are a helpful assistant."}
]

def chat(user_msg):
    messages.append({"role": "user", "content": user_msg})
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )
    
    assistant_msg = response.choices[0].message.content
    messages.append({"role": "assistant", "content": assistant_msg})
    return assistant_msg

print(chat("What is 15 * 23?"))
print(chat("Can you show your work?"))`,
        },
        {
          title: "JSON Mode",
          description:
            "Get structured JSON responses • Type-safe parsing • Data extraction",
          language: "python",
          code: `from openai import OpenAI
import json

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": '''Extract: "John Smith, age 30, Software Engineer"
        Return JSON with: name, age, occupation'''
    }],
    response_format={"type": "json_object"},
    temperature=0
)

data = json.loads(response.choices[0].message.content)
print(f"Name: {data['name']}, Age: {data['age']}")`,
        },
      ],
    },
    {
      id: "vision",
      title: "Vision & Image Generation",
      description:
        "Analyze images with GPT-4V • Generate with DALL-E • Image editing",
      examples: [
        {
          title: "Image Analysis",
          description:
            "Analyze images with GPT-4 Vision • Extract text • Describe content",
          language: "python",
          code: `from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "What's in this image?"},
            {
                "type": "image_url",
                "image_url": {
                    "url": "https://example.com/image.jpg",
                    "detail": "high"  # or "low"
                }
            }
        ]
    }]
)

print(response.choices[0].message.content)`,
        },
        {
          title: "Local Image Analysis",
          description:
            "Analyze local images with base64 encoding • Privacy-first approach",
          language: "python",
          code: `from openai import OpenAI
import base64

client = OpenAI()

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

image_b64 = encode_image("image.jpg")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Describe this image."},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{image_b64}"
                }
            }
        ]
    }]
)

print(response.choices[0].message.content)`,
        },
        {
          title: "Generate Images with DALL-E",
          description:
            "Create images from text • Multiple sizes and quality options",
          language: "python",
          code: `from openai import OpenAI

client = OpenAI()

response = client.images.generate(
    model="dall-e-3",
    prompt="A serene Japanese garden at sunset, digital art",
    size="1024x1024",    # "1792x1024", "1024x1792"
    quality="standard",  # or "hd"
    n=1
)

image_url = response.data[0].url
print(f"Image: {image_url}")`,
        },
      ],
    },
    {
      id: "audio",
      title: "Audio & Speech",
      description:
        "Text-to-speech • Speech-to-text with Whisper • Audio translation",
      examples: [
        {
          title: "Text-to-Speech",
          description:
            "Convert text to natural speech • Multiple voices • Different formats",
          language: "python",
          code: `from openai import OpenAI
from pathlib import Path

client = OpenAI()

response = client.audio.speech.create(
    model="tts-1",  # or "tts-1-hd"
    voice="alloy",  # alloy, echo, fable, onyx, nova, shimmer
    input="Hello! This is a test of text-to-speech.",
    speed=1.0  # 0.25 to 4.0
)

response.stream_to_file(Path("speech.mp3"))`,
        },
        {
          title: "Speech-to-Text with Whisper",
          description:
            "Transcribe audio to text • Multiple languages • High accuracy",
          language: "python",
          code: `from openai import OpenAI

client = OpenAI()

with open("audio.mp3", "rb") as audio_file:
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        response_format="text",
        language="en",  # Optional
        prompt="Technical discussion about ML"  # Context
    )

print(transcript)

# With timestamps
with open("audio.mp3", "rb") as audio_file:
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        response_format="verbose_json",
        timestamp_granularities=["word"]
    )
    
for word in transcript.words:
    print(f"{word['word']}: {word['start']}s")`,
        },
      ],
    },
    {
      id: "embeddings",
      title: "Embeddings & Search",
      description:
        "Text embeddings • Semantic similarity • RAG applications",
      examples: [
        {
          title: "Generate Embeddings",
          description:
            "Convert text to vector embeddings • Batch processing",
          language: "python",
          code: `from openai import OpenAI

client = OpenAI()

response = client.embeddings.create(
    model="text-embedding-3-small",
    input="OpenAI makes AI accessible.",
    encoding_format="float"
)

embedding = response.data[0].embedding
print(f"Dimensions: {len(embedding)}")

# Batch embed
texts = ["Text 1", "Text 2", "Text 3"]
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)

embeddings = [item.embedding for item in response.data]`,
        },
        {
          title: "Semantic Similarity",
          description:
            "Find similar texts using cosine similarity • Ranking results",
          language: "python",
          code: `from openai import OpenAI
import numpy as np

client = OpenAI()

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

docs = ["Python programming", "JavaScript web dev", "ML training"]

# Embed documents
doc_embeddings = []
for doc in docs:
    r = client.embeddings.create(
        model="text-embedding-3-small", input=doc
    )
    doc_embeddings.append(r.data[0].embedding)

# Query
query = "What language for machine learning?"
q_r = client.embeddings.create(
    model="text-embedding-3-small", input=query
)
q_emb = q_r.data[0].embedding

# Find similar
similarities = [
    cosine_similarity(q_emb, d_emb) for d_emb in doc_embeddings
]

for doc, score in zip(docs, similarities):
    print(f"{score:.3f}: {doc}")`,
        },
      ],
    },
    {
      id: "function-calling",
      title: "Function Calling",
      description:
        "Extend models with custom functions • Structured outputs • Tool integration",
      examples: [
        {
          title: "Basic Function Calling",
          description:
            "Define and use functions • Structured tool integration",
          language: "python",
          code: `from openai import OpenAI
import json

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City name"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"]
                }
            },
            "required": ["location"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Weather in Paris?"}],
    tools=tools,
    tool_choice="auto"
)

if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    print(f"Function: {tool_call.function.name}")
    print(f"Args: {tool_call.function.arguments}")`,
        },
        {
          title: "Execute and Return Results",
          description:
            "Complete function calling loop • Execute functions • Return results",
          language: "python",
          code: `from openai import OpenAI
import json

client = OpenAI()

def get_weather(location, unit="fahrenheit"):
    return {"temp": 72, "condition": "sunny"}

tools = [{ /* tool definition */ }]

messages = [{"role": "user", "content": "Weather in Boston?"}]

response = client.chat.completions.create(
    model="gpt-4o", messages=messages, tools=tools
)

message = response.choices[0].message
messages.append(message)

if message.tool_calls:
    for tool_call in message.tool_calls:
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)
        
        result = get_weather(**function_args)
        
        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result)
        })

final = client.chat.completions.create(
    model="gpt-4o", messages=messages
)
print(final.choices[0].message.content)`,
        },
      ],
    },
    {
      id: "best-practices",
      title: "Best Practices",
      description:
        "Rate limiting • Cost optimization • Security • Production deployment",
      examples: [
        {
          title: "Rate Limiting with Backoff",
          description:
            "Handle rate limits gracefully • Exponential backoff with jitter",
          language: "python",
          code: `from openai import OpenAI, RateLimitError
import time
import random

client = OpenAI()

def api_call_with_backoff(messages, max_retries=5):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                timeout=30.0
            )
        except RateLimitError:
            if attempt == max_retries - 1:
                raise
            delay = (2 ** attempt) + random.uniform(0, 1)
            print(f"Retrying in {delay:.1f}s...")
            time.sleep(delay)`,
        },
        {
          title: "Cost Optimization",
          description:
            "Reduce costs • Choose right models • Token counting • Caching",
          language: "python",
          code: `from openai import OpenAI
import tiktoken

client = OpenAI()

# Use cheaper models when appropriate
def choose_model(complexity):
    if complexity == "simple":
        return "gpt-4o-mini"  # 15x cheaper
    return "gpt-4o"

# Count tokens before calling
def estimate_cost(text, model="gpt-4o"):
    encoding = tiktoken.encoding_for_model(model)
    tokens = len(encoding.encode(text))
    
    # Pricing per 1K tokens (check current rates)
    cost_per_1k = 0.005 if model == "gpt-4o" else 0.00015
    return tokens, (tokens / 1000) * cost_per_1k

tokens, cost = estimate_cost("Your prompt...")
print(f"{tokens} tokens, cost: {cost}")`,
        },
        {
          title: "Security Best Practices",
          description:
            "Secure API keys • Input validation • Output sanitization • PII handling",
          language: "python",
          code: `from openai import OpenAI
import os
import re

# 1. Use environment variables
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 2. Validate input
def sanitize_input(text):
    if len(text) > 10000:
        raise ValueError("Input too long")
    
    dangerous = [
        r"ignore previous",
        r"system:",
    ]
    for pattern in dangerous:
        if re.search(pattern, text, re.I):
            raise ValueError("Unsafe input")
    return text

# 3. Remove PII
def remove_pii(text):
    text = re.sub(r'\\b[\\w.-]+@[\\w.-]+\\.\\w+\\b', '[EMAIL]', text)
    text = re.sub(r'\\b\\d{3}-\\d{3}-\\d{4}\\b', '[PHONE]', text)
    return text

# 4. Usage
user_input = sanitize_input(input("Question: "))
user_input = remove_pii(user_input)`,
        },
      ],
    },
  ],
};
