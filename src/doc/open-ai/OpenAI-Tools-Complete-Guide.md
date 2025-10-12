# OpenAI Tools - Complete Documentation Guide

## Table of Contents

1. [OpenAI Tools Overview](#openai-tools-overview)
2. [Code Interpreter](#code-interpreter)
3. [Computer Use](#computer-use)
4. [Connectors and MCP Servers](#connectors-and-mcp-servers)
5. [File Search](#file-search)
6. [Image Generation](#image-generation)
7. [Web Search](#web-search)
8. [Built-in vs Custom Tools](#built-in-vs-custom-tools)

---

# OpenAI Tools Overview

Enhance your AI applications with powerful built-in tools and integrations.

OpenAI provides a comprehensive suite of tools that extend the capabilities of language models, enabling them to perform complex tasks beyond text generation. These tools can be used with the Responses API, Chat Completions API, and Assistants API to create sophisticated applications.

## Categories of Tools

### Built-in Tools

OpenAI provides several built-in tools that are ready to use:

- **Code Interpreter** - Execute Python code in sandboxed environments
- **Computer Use** - Control computer interfaces and perform automated tasks
- **File Search** - Search through uploaded documents and vector stores
- **Image Generation** - Create and edit images using natural language prompts
- **Web Search** - Access real-time information from the internet
- **MCP and Connectors** - Connect to external services and APIs

### Custom Tools via Function Calling

Define your own functions that models can call to access specific data or capabilities unique to your application.

## Tool Usage Patterns

Tools can be used in different ways depending on your use case:

1. **Automatic Tool Selection** - Let the model decide when to use tools
2. **Required Tool Usage** - Force the model to use specific tools
3. **Tool Chains** - Combine multiple tools in sequence
4. **Conditional Tool Access** - Control tool availability based on context

---

# Code Interpreter

Allow models to write and run Python to solve problems.

The Code Interpreter tool allows models to write and run Python code in a sandboxed environment to solve complex problems in domains like data analysis, coding, and math. Use it for:

- Processing files with diverse data and formatting
- Generating files with data and images of graphs
- Writing and running code iteratively to solve problems—for example, a model that writes code that fails to run can keep rewriting and running that code until it succeeds
- Boosting visual intelligence in our latest reasoning models (like o3 and o4-mini). The model can use this tool to crop, zoom, rotate, and otherwise process and transform images.

## Basic Usage

Here's an example of calling the Responses API with a tool call to Code Interpreter:

### Python Example

```python
from openai import OpenAI

client = OpenAI()

instructions = """
You are a personal math tutor. When asked a math question,
write and run code using the python tool to answer the question.
"""

resp = client.responses.create(
    model="gpt-4.1",
    tools=[
        {
            "type": "code_interpreter",
            "container": {"type": "auto"}
        }
    ],
    instructions=instructions,
    input="I need to solve the equation 3x + 11 = 14. Can you help me?",
)

print(resp.output)
```

### JavaScript Example

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const instructions = `You are a personal math tutor. When asked a math question,
write and run code using the python tool to answer the question.`;

const resp = await client.responses.create({
    model: "gpt-4.1",
    tools: [
        {
            type: "code_interpreter",
            container: { type: "auto" },
        },
    ],
    instructions,
    input: "I need to solve the equation 3x + 11 = 14. Can you help me?",
});

console.log(JSON.stringify(resp.output, null, 2));
```

### cURL Example

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4.1",
    "tools": [{
      "type": "code_interpreter",
      "container": { "type": "auto" }
    }],
    "instructions": "You are a personal math tutor. When asked a math question, write and run code using the python tool to answer the question.",
    "input": "I need to solve the equation 3x + 11 = 14. Can you help me?"
  }'
```

While we call this tool Code Interpreter, the model knows it as the "python tool". Models usually understand prompts that refer to the code interpreter tool, however, the most explicit way to invoke this tool is to ask for "the python tool" in your prompts.

## Containers

The Code Interpreter tool requires a container object. A container is a fully sandboxed virtual machine that the model can run Python code in. This container can contain files that you upload, or that it generates.

There are two ways to create containers:

### 1. Auto Mode

As seen in the example above, you can do this by passing the `"container": { "type": "auto", "file_ids": ["file-1", "file-2"] }` property in the tool configuration while creating a new Response object. This automatically creates a new container, or reuses an active container that was used by a previous `code_interpreter_call` item in the model's context.

### 2. Explicit Mode

Here, you explicitly create a container using the `v1/containers` endpoint, and assign its `id` as the `container` value in the tool configuration in the Response object.

#### Use explicit container creation

**Python:**

```python
from openai import OpenAI

client = OpenAI()

container = client.containers.create(name="test-container")

response = client.responses.create(
    model="gpt-4.1",
    tools=[{
        "type": "code_interpreter",
        "container": container.id
    }],
    tool_choice="required",
    input="use the python tool to calculate what is 4 * 3.82. and then find its square root and then find the square root of that result"
)

print(response.output_text)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const container = await client.containers.create({ name: "test-container" });

const resp = await client.responses.create({
    model: "gpt-4.1",
    tools: [
        {
            type: "code_interpreter",
            container: container.id
        }
    ],
    tool_choice: "required",
    input: "use the python tool to calculate what is 4 * 3.82. and then find its square root and then find the square root of that result"
});

console.log(resp.output_text);
```

**cURL:**

```bash
curl https://api.openai.com/v1/containers \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Container"
  }'

# Use the returned container id in the next call:
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4.1",
    "tools": [{
      "type": "code_interpreter",
      "container": "cntr_abc123"
    }],
    "tool_choice": "required",
    "input": "use the python tool to calculate what is 4 * 3.82. and then find its square root and then find the square root of that result"
  }'
```

Note that containers created with the auto mode are also accessible using the `/v1/containers` endpoint.

## Container Expiration

We highly recommend you treat containers as ephemeral and store all data related to the use of this tool on your own systems. Expiration details:

- A container expires if it is not used for 20 minutes. When this happens, using the container in `v1/responses` will fail. You'll still be able to see a snapshot of the container's metadata at its expiry, but all data associated with the container will be discarded from our systems and not recoverable.

- You can't move a container from an expired state to an active one. Instead, create a new container and upload files again. Note that any state in the old container's memory (like python objects) will be lost.

- Any container operation, like retrieving the container, or adding or deleting files from the container, will automatically refresh the container's `last_active_at` time.

## Working with Files

When running Code Interpreter, the model can create its own files. For example, if you ask it to construct a plot, or create a CSV, it creates these images directly on your container. When it does so, it cites these files in the `annotations` of its next message.

### File Citations Example

```json
{
  "id": "msg_682d514e268c8191a89c38ea318446200f2610a7ec781a4f",
  "content": [
    {
      "annotations": [
        {
          "file_id": "cfile_682d514b2e00819184b9b07e13557f82",
          "index": null,
          "type": "container_file_citation",
          "container_id": "cntr_682d513bb0c48191b10bd4f8b0b3312200e64562acc2e0af",
          "end_index": 0,
          "filename": "cfile_682d514b2e00819184b9b07e13557f82.png",
          "start_index": 0
        }
      ],
      "text": "Here is the histogram of the RGB channels for the uploaded image. Each curve represents the distribution of pixel intensities for the red, green, and blue channels. Peaks toward the high end of the intensity scale (right-hand side) suggest a lot of brightness and strong warm tones, matching the orange and light background in the image. If you want a different style of histogram (e.g., overall intensity, or quantized color groups), let me know!",
      "type": "output_text",
      "logprobs": []
    }
  ],
  "role": "assistant",
  "status": "completed",
  "type": "message"
}
```

You can download these constructed files by calling the get container file content method.

### File Operations

Any files in the model input get automatically uploaded to the container. You do not have to explicitly upload it to the container.

#### Uploading and downloading files

Add new files to your container using Create container file. This endpoint accepts either a multipart upload or a JSON body with a `file_id`. List existing container files with List container files and download bytes from Retrieve container file content.

#### Dealing with citations

Files and images generated by the model are returned as annotations on the assistant's message. `container_file_citation` annotations point to files created in the container. They include the `container_id`, `file_id`, and `filename`. You can parse these annotations to surface download links or otherwise process the files.

## Supported File Formats

| File format | MIME type                                                                 |
| ----------- | ------------------------------------------------------------------------- |
| .c          | text/x-c                                                                  |
| .cs         | text/x-csharp                                                             |
| .cpp        | text/x-c++                                                                |
| .csv        | text/csv                                                                  |
| .doc        | application/msword                                                        |
| .docx       | application/vnd.openxmlformats-officedocument.wordprocessingml.document   |
| .html       | text/html                                                                 |
| .java       | text/x-java                                                               |
| .json       | application/json                                                          |
| .md         | text/markdown                                                             |
| .pdf        | application/pdf                                                           |
| .php        | text/x-php                                                                |
| .pptx       | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| .py         | text/x-python                                                             |
| .py         | text/x-script.python                                                      |
| .rb         | text/x-ruby                                                               |
| .tex        | text/x-tex                                                                |
| .txt        | text/plain                                                                |
| .css        | text/css                                                                  |
| .js         | text/javascript                                                           |
| .sh         | application/x-sh                                                          |
| .ts         | application/typescript                                                    |
| .csv        | application/csv                                                           |
| .jpeg       | image/jpeg                                                                |
| .jpg        | image/jpeg                                                                |
| .gif        | image/gif                                                                 |
| .pkl        | application/octet-stream                                                  |
| .png        | image/png                                                                 |
| .tar        | application/x-tar                                                         |
| .xlsx       | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet         |
| .xml        | application/xml or "text/xml"                                             |
| .zip        | application/zip                                                           |

## Usage Notes

- **Responses API**: Available
- **Chat Completions API**: Available
- **Assistants API**: Available
- **Rate Limits**: 100 RPM per org
- **Pricing**: See pricing page
- **ZDR and data residency**: Supported

---

# Computer Use

Build a computer-using agent that can perform tasks on your behalf.

**Computer use** is a practical application of our Computer-Using Agent (CUA) model, `computer-use-preview`, which combines the vision capabilities of GPT-4o with advanced reasoning to simulate controlling computer interfaces and performing tasks.

Computer use is available through the Responses API. It is not available on Chat Completions.

Computer use is in beta. Because the model is still in preview and may be susceptible to exploits and inadvertent mistakes, we discourage trusting it in fully authenticated environments or for high-stakes tasks. See limitations and risk and safety best practices below. You must use the Computer Use tool in line with OpenAI's Usage Policy and Business Terms.

## How it Works

The computer use tool operates in a continuous loop. It sends computer actions, like `click(x,y)` or `type(text)`, which your code executes on a computer or browser environment and then returns screenshots of the outcomes back to the model.

In this way, your code simulates the actions of a human using a computer interface, while our model uses the screenshots to understand the state of the environment and suggest next actions.

This loop lets you automate many tasks requiring clicking, typing, scrolling, and more. For example, booking a flight, searching for a product, or filling out a form.

## Setting Up Your Environment

Before integrating the tool, prepare an environment that can capture screenshots and execute the recommended actions. We recommend using a sandboxed environment for safety reasons.

### Set up a local browsing environment

If you want to try out the computer use tool with minimal setup, you can use a browser automation framework such as Playwright or Selenium.

Running a browser automation framework locally can pose security risks. We recommend the following setup to mitigate them:

- Use a sandboxed environment
- Set `env` to an empty object to avoid exposing host environment variables to the browser
- Set flags to disable extensions and the file system

#### Start a browser instance

**JavaScript (Playwright):**

```javascript
import { chromium } from "playwright";

const browser = await chromium.launch({
    headless: false,
    chromiumSandbox: true,
    env: {},
    args: ["--disable-extensions", "--disable-file-system"],
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1024, height: 768 });
await page.goto("https://bing.com");
await page.waitForTimeout(10000);
browser.close();
```

**Python (Playwright):**

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=False,
        chromium_sandbox=True,
        env={},
        args=[
            "--disable-extensions",
            "--disable-file-system"
        ]
    )
    page = browser.new_page()
    page.set_viewport_size({"width": 1024, "height": 768})
    page.goto("https://bing.com")
    page.wait_for_timeout(10000)
```

### Set up a local virtual machine

If you'd like to use the computer use tool beyond just a browser interface, you can set up a local virtual machine instead, using a tool like Docker.

#### Create a Dockerfile

```dockerfile
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# 1) Install Xfce, x11vnc, Xvfb, xdotool, etc., but remove any screen lockers or power managers
RUN apt-get update && apt-get install -y xfce4 xfce4-goodies x11vnc xvfb xdotool imagemagick x11-apps sudo software-properties-common imagemagick && \
    apt-get remove -y light-locker xfce4-screensaver xfce4-power-manager || true && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 2) Add the mozillateam PPA and install Firefox ESR
RUN add-apt-repository ppa:mozillateam/ppa && \
    apt-get update && apt-get install -y --no-install-recommends firefox-esr && \
    update-alternatives --set x-www-browser /usr/bin/firefox-esr && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 3) Create non-root user
RUN useradd -ms /bin/bash myuser && echo "myuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER myuser
WORKDIR /home/myuser

# 4) Set x11vnc password ("secret")
RUN x11vnc -storepasswd secret /home/myuser/.vncpass

# 5) Expose port 5900 and run Xvfb, x11vnc, Xfce (no login manager)
EXPOSE 5900

CMD ["/bin/sh", "-c", "Xvfb :99 -screen 0 1280x800x24 >/dev/null 2>&1 & x11vnc -display :99 -forever -rfbauth /home/myuser/.vncpass -listen 0.0.0.0 -rfbport 5900 >/dev/null 2>&1 & export DISPLAY=:99 && startxfce4 >/dev/null 2>&1 & sleep 2 && echo 'Container running!' && tail -f /dev/null"]
```

#### Build and run the Docker container

```bash
docker build -t cua-image .
docker run --rm -it --name cua-image -p 5900:5900 -e DISPLAY=:99 cua-image
```

## Integrating the CUA Loop

These are the high-level steps you need to follow to integrate the computer use tool in your application:

1. **Send a request to the model**: Include the `computer` tool as part of the available tools, specifying the display size and environment.

2. **Receive a response from the model**: Check if the response has any `computer_call` items. This tool call contains a suggested action to take to progress towards the specified goal.

3. **Execute the requested action**: Execute through code the corresponding action on your computer or browser environment.

4. **Capture the updated state**: After executing the action, capture the updated state of the environment as a screenshot.

5. **Repeat**: Send a new request with the updated state as a `computer_call_output`, and repeat this loop until the model stops requesting actions or you decide to stop.

![Computer use diagram](https://cdn.openai.com/API/docs/images/cua_diagram.png)

### 1. Send a request to the model

Send a request to create a Response with the `computer-use-preview` model equipped with the `computer_use_preview` tool.

**Python:**

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="computer-use-preview",
    tools=[{
        "type": "computer_use_preview",
        "display_width": 1024,
        "display_height": 768,
        "environment": "browser"  # other possible values: "mac", "windows", "ubuntu"
    }],
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Check the latest OpenAI news on bing.com."
                }
                # Optional: include a screenshot of the initial state of the environment
                # {
                #     "type": "input_image",
                #     "image_url": f"data:image/png;base64,{screenshot_base64}"
                # }
            ]
        }
    ],
    reasoning={
        "summary": "concise",
    },
    truncation="auto"
)

print(response.output)
```

**JavaScript:**

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
    model: "computer-use-preview",
    tools: [
        {
            type: "computer_use_preview",
            display_width: 1024,
            display_height: 768,
            environment: "browser", // other possible values: "mac", "windows", "ubuntu"
        },
    ],
    input: [
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: "Check the latest OpenAI news on bing.com.",
                },
                // Optional: include a screenshot of the initial state of the environment
                // {
                //     type: "input_image",
                //     image_url: `data:image/png;base64,${screenshot_base64}`
                // }
            ],
        },
    ],
    reasoning: {
        summary: "concise",
    },
    truncation: "auto",
});

console.log(JSON.stringify(response.output, null, 2));
```

### 2. Receive a suggested action

The model returns an output that contains either a `computer_call` item, just text, or other tool calls, depending on the state of the conversation.

Examples of `computer_call` items are a click, a scroll, a key press, or any other event defined in the API reference. In our example, the item is a click action:

```json
"output": [
  {
    "type": "reasoning",
    "id": "rs_67cc...",
    "summary": [
      {
        "type": "summary_text",
        "text": "Clicking on the browser address bar."
      }
    ]
  },
  {
    "type": "computer_call",
    "id": "cu_67cc...",
    "call_id": "call_zw3...",
    "action": {
      "type": "click",
      "button": "left",
      "x": 156,
      "y": 50
    },
    "pending_safety_checks": [],
    "status": "completed"
  }
]
```

### 3. Execute the action in your environment

Execute the corresponding actions on your computer or browser. How you map a computer call to actions through code depends on your environment.

**Playwright Example:**

```python
def handle_model_action(page, action):
    """
    Given a computer action (e.g., click, double_click, scroll, etc.),
    execute the corresponding operation on the Playwright page.
    """
    action_type = action.type

    try:
        match action_type:
            case "click":
                x, y = action.x, action.y
                button = action.button
                print(f"Action: click at ({x}, {y}) with button '{button}'")
                # Not handling things like middle click, etc.
                if button != "left" and button != "right":
                    button = "left"
                page.mouse.click(x, y, button=button)

            case "scroll":
                x, y = action.x, action.y
                scroll_x, scroll_y = action.scroll_x, action.scroll_y
                print(f"Action: scroll at ({x}, {y}) with offsets (scroll_x={scroll_x}, scroll_y={scroll_y})")
                page.mouse.move(x, y)
                page.evaluate(f"window.scrollBy({scroll_x}, {scroll_y})")

            case "keypress":
                keys = action.keys
                for k in keys:
                    print(f"Action: keypress '{k}'")
                    # A simple mapping for common keys; expand as needed.
                    if k.lower() == "enter":
                        page.keyboard.press("Enter")
                    elif k.lower() == "space":
                        page.keyboard.press(" ")
                    else:
                        page.keyboard.press(k)

            case "type":
                text = action.text
                print(f"Action: type text: {text}")
                page.keyboard.type(text)

            case "wait":
                print(f"Action: wait")
                time.sleep(2)

            case "screenshot":
                # Nothing to do as screenshot is taken at each turn
                print(f"Action: screenshot")

            # Handle other actions here
            case _:
                print(f"Unrecognized action: {action}")

    except Exception as e:
        print(f"Error handling action {action}: {e}")
```

### 4. Capture the updated screenshot

After executing the action, capture the updated state of the environment as a screenshot.

**Playwright Example:**

```python
def get_screenshot(page):
    """
    Take a full-page screenshot using Playwright and return the image bytes.
    """
    return page.screenshot()
```

### 5. Repeat

Once you have the screenshot, you can send it back to the model as a `computer_call_output` to get the next action.

```python
import time
import base64
from openai import OpenAI

client = OpenAI()

def computer_use_loop(instance, response):
    """
    Run the loop that executes computer actions until no 'computer_call' is found.
    """
    while True:
        computer_calls = [item for item in response.output if item.type == "computer_call"]

        if not computer_calls:
            print("No computer call found. Output from model:")
            for item in response.output:
                print(item)
            break  # Exit when no computer calls are issued.

        # We expect at most one computer call per response.
        computer_call = computer_calls[0]
        last_call_id = computer_call.call_id
        action = computer_call.action

        # Execute the action (function defined in step 3)
        handle_model_action(instance, action)
        time.sleep(1)  # Allow time for changes to take effect.

        # Take a screenshot after the action (function defined in step 4)
        screenshot_bytes = get_screenshot(instance)
        screenshot_base64 = base64.b64encode(screenshot_bytes).decode("utf-8")

        # Send the screenshot back as a computer_call_output
        response = client.responses.create(
            model="computer-use-preview",
            previous_response_id=response.id,
            tools=[
                {
                    "type": "computer_use_preview",
                    "display_width": 1024,
                    "display_height": 768,
                    "environment": "browser"
                }
            ],
            input=[
                {
                    "call_id": last_call_id,
                    "type": "computer_call_output",
                    "output": {
                        "type": "input_image",
                        "image_url": f"data:image/png;base64,{screenshot_base64}"
                    }
                }
            ],
            truncation="auto"
        )

    return response
```

## Safety Checks and Limitations

### Acknowledge safety checks

We have implemented safety checks in the API to help protect against prompt injection and model mistakes. These checks include:

- **Malicious instruction detection**: we evaluate the screenshot image and check if it contains adversarial content that may change the model's behavior.
- **Irrelevant domain detection**: we evaluate the `current_url` (if provided) and check if the current domain is considered relevant given the conversation history.
- **Sensitive domain detection**: we check the `current_url` (if provided) and raise a warning when we detect the user is on a sensitive domain.

If one or multiple of the above checks is triggered, a safety check is raised when the model returns the next `computer_call`, with the `pending_safety_checks` parameter.

You need to pass the safety checks back as `acknowledged_safety_checks` in the next request in order to proceed.

### Limitations

We recommend using the `computer-use-preview` model for browser-based tasks. The model may be susceptible to inadvertent model mistakes, especially in non-browser environments that it is less used to.

Some behavior limitations to be aware of:

- The `computer-use-preview` model has constrained rate limits and feature support.
- Refer to the data retention, residency, and handling policies guide.

## Risks and Safety

Computer use presents unique risks that differ from those in standard API features or chat interfaces, especially when interacting with the internet.

### Best Practices

- **Human in the loop for high-stakes tasks**: Avoid tasks that are high-stakes or require high levels of accuracy.
- **Beware of prompt injections**: Limit computer use access to trusted, isolated environments like a sandboxed browser or container.
- **Use blocklists and allowlists**: Implement controls on websites, actions, and users.
- **Send safety identifiers**: Use the `safety_identifier` param to help OpenAI monitor and detect abuse.
- **Use our safety checks**: When you receive a `pending_safety_check`, increase oversight into model actions.

---

# Connectors and MCP Servers

Use connectors and remote MCP servers to give models new capabilities.

In addition to tools you make available to the model with function calling, you can give models new capabilities using **connectors** and **remote MCP servers**. These tools give the model the ability to connect to and control external services when needed to respond to a user's prompt.

- **Connectors** are OpenAI-maintained MCP wrappers for popular services like Google Workspace or Dropbox.
- **Remote MCP servers** can be any server on the public Internet that implements a remote Model Context Protocol (MCP) server.

## Quickstart

### Using remote MCP servers

Remote MCP servers require a `server_url`. Depending on the server, you may also need an OAuth `authorization` parameter containing an access token.

**Python:**

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

**JavaScript:**

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

**cURL:**

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5",
    "tools": [
      {
        "type": "mcp",
        "server_label": "dmcp",
        "server_description": "A Dungeons and Dragons MCP server to assist with dice rolling.",
        "server_url": "https://dmcp-server.deno.dev/sse",
        "require_approval": "never"
      }
    ],
    "input": "Roll 2d4+1"
  }'
```

### Using connectors

Connectors require a `connector_id` parameter, and an OAuth access token provided by your application in the `authorization` parameter.

**Python:**

```python
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="gpt-5",
    tools=[
        {
            "type": "mcp",
            "server_label": "Dropbox",
            "connector_id": "connector_dropbox",
            "authorization": "<oauth access token>",
            "require_approval": "never",
        },
    ],
    input="Summarize the Q2 earnings report.",
)

print(resp.output_text)
```

## How it Works

The MCP tool (for both remote MCP servers and connectors) is available in the Responses API in most recent models. When you're using the MCP tool, you only pay for tokens used when importing tool definitions or making tool calls.

### Step 1: Listing available tools

When you specify a remote MCP server in the `tools` parameter, the API will attempt to get a list of tools from the server. If successful in retrieving the list of tools, a new `mcp_list_tools` output item will appear in the model response output.

```json
{
  "id": "mcpl_68a6102a4968819c8177b05584dd627b0679e572a900e618",
  "type": "mcp_list_tools",
  "server_label": "dmcp",
  "tools": [
    {
      "annotations": null,
      "description": "Given a string of text describing a dice roll...",
      "input_schema": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
          "diceRollExpression": {
            "type": "string"
          }
        },
        "required": ["diceRollExpression"],
        "additionalProperties": false
      },
      "name": "roll"
    }
  ]
}
```

### Step 2: Calling tools

Once the model has access to these tool definitions, it may choose to call them depending on what's in the model's context. When the model decides to call an MCP tool, the API will make an request to the remote MCP server to call the tool and put its output into the model's context.

```json
{
  "id": "mcp_68a6102d8948819c9b1490d36d5ffa4a0679e572a900e618",
  "type": "mcp_call",
  "approval_request_id": null,
  "arguments": "{\"diceRollExpression\":\"2d4 + 1\"}",
  "error": null,
  "name": "roll",
  "output": "4",
  "server_label": "dmcp"
}
```

### Filtering tools

Some MCP servers can have dozens of tools, and exposing many tools to the model can result in high cost and latency. If you're only interested in a subset of tools an MCP server exposes, you can use the `allowed_tools` parameter to only import those tools.

```python
resp = client.responses.create(
    model="gpt-5",
    tools=[{
        "type": "mcp",
        "server_label": "dmcp",
        "server_description": "A Dungeons and Dragons MCP server to assist with dice rolling.",
        "server_url": "https://dmcp-server.deno.dev/sse",
        "require_approval": "never",
        "allowed_tools": ["roll"],
    }],
    input="Roll 2d4+1",
)
```

### Approvals

By default, OpenAI will request your approval before any data is shared with a connector or remote MCP server. Approvals help you maintain control and visibility over what data is being sent to an MCP server.

A request for an approval to make an MCP tool call creates a `mcp_approval_request` item in the Response's output:

```json
{
  "id": "mcpr_68a619e1d82c8190b50c1ccba7ad18ef0d2d23a86136d339",
  "type": "mcp_approval_request",
  "arguments": "{\"diceRollExpression\":\"2d4 + 1\"}",
  "name": "roll",
  "server_label": "dmcp"
}
```

You can then respond to this by creating a new Response object and appending an `mcp_approval_response` item to it.

If and when you feel comfortable trusting a remote MCP server, you can choose to skip the approvals for reduced latency by setting the `require_approval` parameter to `"never"`.

## Authentication

Unlike the example MCP server we used above, most other MCP servers require authentication. The most common scheme is an OAuth access token. Provide this token using the `authorization` field of the MCP tool:

```python
resp = client.responses.create(
    model="gpt-5",
    input="Create a payment link for $20",
    tools=[
        {
            "type": "mcp",
            "server_label": "stripe",
            "server_url": "https://mcp.stripe.com",
            "authorization": "$STRIPE_OAUTH_ACCESS_TOKEN"
        }
    ]
)
```

## Available Connectors

The Responses API has built-in support for a limited set of connectors to third-party services:

- **Dropbox**: `connector_dropbox`
- **Gmail**: `connector_gmail`
- **Google Calendar**: `connector_googlecalendar`
- **Google Drive**: `connector_googledrive`
- **Microsoft Teams**: `connector_microsoftteams`
- **Outlook Calendar**: `connector_outlookcalendar`
- **Outlook Email**: `connector_outlookemail`
- **SharePoint**: `connector_sharepoint`

### Authorizing a connector

In the `authorization` field, pass in an OAuth access token. OAuth client registration and authorization must be handled separately by your application.

For testing purposes, you can use Google's OAuth 2.0 Playground to generate temporary access tokens.

**Example using Google Calendar connector:**

```python
resp = client.responses.create(
    model="gpt-5",
    tools=[
        {
            "type": "mcp",
            "server_label": "google_calendar",
            "connector_id": "connector_googlecalendar",
            "authorization": "ya29.A0AS3H6...",
            "require_approval": "never",
        },
    ],
    input="What's on my Google Calendar for today?",
)
```

---

# File Search

Give models a knowledge base of your documents to search through.

File search allows models to access and search through uploaded documents, providing accurate and relevant information with citations. Use it to equip models with a comprehensive knowledge base of your business documents, reference materials, or any other text content.

File search works by:

1. Converting documents and user queries into embeddings
2. Performing semantic search to find the most relevant passages
3. Providing those passages to the model with proper citations

## Basic Usage

To use file search, you need to:

1. Upload files and add them to a vector store
2. Use the file search tool in your API calls

### Upload files to a vector store

**Python:**

```python
from openai import OpenAI

client = OpenAI()

# Upload files
file1 = client.files.create(
    file=open("knowledge_base.pdf", "rb"),
    purpose="assistants"
)

file2 = client.files.create(
    file=open("company_docs.pdf", "rb"),
    purpose="assistants"
)

# Create a vector store
vector_store = client.vector_stores.create(
    name="Knowledge Base",
    file_ids=[file1.id, file2.id]
)

print(f"Vector store created: {vector_store.id}")
```

### Use file search in the Responses API

**Python:**

```python
response = client.responses.create(
    model="gpt-4.1",
    input="What is deep research by OpenAI?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": ["<vector_store_id>"]
    }]
)

print(response.output_text)
```

**JavaScript:**

```javascript
const response = await openai.responses.create({
    model: "gpt-4.1",
    input: "What is deep research by OpenAI?",
    tools: [{
        type: "file_search",
        vector_store_ids: ["<vector_store_id>"]
    }]
});

console.log(response.output_text);
```

## Citations and Annotations

When file search finds relevant content, it provides citations in the response. The model's output will include annotations that reference specific files and locations within those files.

### Example response with citations

```json
{
  "id": "msg_abc123",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "output_text",
      "text": "Deep research refers to OpenAI's approach to conducting thorough investigations using AI agents [1][2]. This methodology involves systematic exploration of topics through multiple sources and iterative refinement of understanding [3].",
      "annotations": [
        {
          "type": "file_citation",
          "index": 342,
          "file_id": "file-2dtbBZdjtDKS8eqWxqbgDi",
          "filename": "deep_research_blog.pdf"
        },
        {
          "type": "file_citation",
          "index": 992,
          "file_id": "file-2dtbBZdjtDKS8eqWxqbgDi",
          "filename": "deep_research_blog.pdf"
        },
        {
          "type": "file_citation",
          "index": 1176,
          "file_id": "file-2dtbBZdjtDKS8eqWxqbgDi",
          "filename": "deep_research_blog.pdf"
        }
      ]
    }
  ]
}
```

## Retrieval Customization

### Limiting the number of results

You can customize the number of results retrieved from the vector stores to reduce token usage and latency:

**Python:**

```python
response = client.responses.create(
    model="gpt-4.1",
    input="What is deep research by OpenAI?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": ["<vector_store_id>"],
        "max_num_results": 2
    }]
)
```

### Include search results in the response

By default, file search calls don't return search results. To include search results in the response, use the `include` parameter:

**Python:**

```python
response = client.responses.create(
    model="gpt-4.1",
    input="What is deep research by OpenAI?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": ["<vector_store_id>"]
    }],
    include=["file_search_call.results"]
)
```

### Metadata filtering

You can filter search results based on file metadata:

**Python:**

```python
response = client.responses.create(
    model="gpt-4.1",
    input="What is deep research by OpenAI?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": ["<vector_store_id>"],
        "filters": {
            "type": "eq",
            "key": "type",
            "value": "blog"
        }
    }]
)
```

## Supported File Formats

*For `text/` MIME types, the encoding must be one of `utf-8`, `utf-16`, or `ascii`.*

| File format | MIME type                                                                 |
| ----------- | ------------------------------------------------------------------------- |
| .c          | text/x-c                                                                  |
| .cpp        | text/x-c++                                                                |
| .cs         | text/x-csharp                                                             |
| .css        | text/css                                                                  |
| .doc        | application/msword                                                        |
| .docx       | application/vnd.openxmlformats-officedocument.wordprocessingml.document   |
| .go         | text/x-golang                                                             |
| .html       | text/html                                                                 |
| .java       | text/x-java                                                               |
| .js         | text/javascript                                                           |
| .json       | application/json                                                          |
| .md         | text/markdown                                                             |
| .pdf        | application/pdf                                                           |
| .php        | text/x-php                                                                |
| .pptx       | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| .py         | text/x-python                                                             |
| .py         | text/x-script.python                                                      |
| .rb         | text/x-ruby                                                               |
| .sh         | application/x-sh                                                          |
| .tex        | text/x-tex                                                                |
| .ts         | application/typescript                                                    |
| .txt        | text/plain                                                                |

## Usage Notes

- **Responses API**: Available
- **Chat Completions API**: Available
- **Assistants API**: Available
- **Rate Limits**: Tier 1: 100 RPM, Tier 2 and 3: 500 RPM, Tier 4 and 5: 1000 RPM
- **Pricing**: See pricing page
- **ZDR and data residency**: Supported

---

# Image Generation

Allow models to generate or edit images.

The image generation tool allows you to generate images using a text prompt, and optionally image inputs. It leverages the GPT Image model, and automatically optimizes text inputs for improved performance.

## Usage

When you include the `image_generation` tool in your request, the model can decide when and how to generate images as part of the conversation, using your prompt and any provided image inputs.

The `image_generation_call` tool call result will include a base64-encoded image.

### Generate an image

**JavaScript:**

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
    model: "gpt-5",
    input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools: [{type: "image_generation"}],
});

// Save the image to a file
const imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result);

if (imageData.length > 0) {
    const imageBase64 = imageData[0];
    const fs = await import("fs");
    fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
}
```

**Python:**

```python
from openai import OpenAI
import base64

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

# Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

### Tool Options

You can configure the following output options as parameters for the image generation tool:

- **Size**: Image dimensions (e.g., 1024x1024, 1024x1536)
- **Quality**: Rendering quality (e.g. low, medium, high)
- **Format**: File output format
- **Compression**: Compression level (0-100%) for JPEG and WebP formats
- **Background**: Transparent or opaque

`size`, `quality`, and `background` support the `auto` option, where the model will automatically select the best option based on the prompt.

### Revised Prompt

When using the image generation tool, the mainline model (e.g. `gpt-4.1`) will automatically revise your prompt for improved performance.

You can access the revised prompt in the `revised_prompt` field of the image generation call:

```json
{
  "type": "image_generation_call",
  "id": "img_abc123",
  "result": "base64_encoded_image_data...",
  "revised_prompt": "A photorealistic image of a gray tabby cat with distinctive stripes gently embracing a brown river otter wearing a bright orange knitted scarf around its neck..."
}
```

## Force Image Generation

To force the image generation tool call, you can set the parameter `tool_choice` to `{"type": "image_generation"}`.

---

# Web Search

Allow models to search the web for the latest information before generating a response.

Web search allows models to access up-to-date information from the internet and provide answers with sourced citations. There are three main types of web search available with OpenAI models:

1. **Non‑reasoning web search**: The non-reasoning model sends the user's query to the web search tool, which returns the response based on top results. This method is fast and ideal for quick lookups.

2. **Agentic search with reasoning models**: The model actively manages the search process, can perform web searches as part of its chain of thought, analyze results, and decide whether to keep searching. This flexibility makes agentic search well suited to complex workflows.

3. **Deep research**: A specialized, agent-driven method for in-depth, extended investigations by reasoning models. The model conducts web searches as part of its chain of thought, often tapping into hundreds of sources.

## Basic Usage

Using the Responses API, you can enable web search by configuring it in the `tools` array in an API request to generate content.

**JavaScript:**

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

**Python:**

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

**cURL:**

```bash
curl "https://api.openai.com/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5",
    "tools": [{"type": "web_search"}],
    "input": "what was a positive news story from today?"
  }'
```

## Output and Citations

Model responses that use the web search tool will include two parts:

### Web Search Call Output

A `web_search_call` output item with the ID of the search call, along with the action taken in `web_search_call.action`. The action is one of:

- `search`, which represents a web search. It will usually include the search `query` and `domains` which were searched.
- `open_page`, which represents a page being opened (supported in reasoning models).
- `find_in_page`, which represents searching within a page (supported in reasoning models).

### Message Output with Citations

A `message` output item containing:

- The text result in `message.content[0].text`
- Annotations `message.content[0].annotations` for the cited URLs

By default, the model's response will include inline citations for URLs found in the web search results. The `url_citation` annotation object will contain the URL, title and location of the cited source.

**When displaying web results or information contained in web results to end users, inline citations must be made clearly visible and clickable in your user interface.**

### Example Response Structure

```json
[
  {
    "type": "web_search_call",
    "id": "ws_67c9fa0502748190b7dd390736892e100be649c1a5ff9609",
    "status": "completed"
  },
  {
    "id": "msg_67c9fa077e288190af08fdffda2e34f20be649c1a5ff9609",
    "type": "message",
    "status": "completed",
    "role": "assistant",
    "content": [
      {
        "type": "output_text",
        "text": "On March 6, 2025, several news...",
        "annotations": [
          {
            "type": "url_citation",
            "start_index": 2606,
            "end_index": 2758,
            "url": "https://...",
            "title": "Title..."
          }
        ]
      }
    ]
  }
]
```

## Domain Filtering

Domain filtering in web search lets you limit results to a specific set of domains. With the `filters` parameter you can set an allow-list of up to 20 URLs.

When formatting URLs, omit the HTTP or HTTPS prefix. For example, use `openai.com` instead of `https://openai.com/`. This approach also includes subdomains in the search.

**Python:**

```python
response = client.responses.create(
    model="gpt-5",
    reasoning={"effort": "low"},
    tools=[
        {
            "type": "web_search",
            "filters": {
                "allowed_domains": [
                    "pubmed.ncbi.nlm.nih.gov",
                    "clinicaltrials.gov",
                    "www.who.int",
                    "www.cdc.gov",
                    "www.fda.gov"
                ]
            }
        }
    ],
    input="Please perform a web search on how semaglutide is used in the treatment of diabetes.",
)
```

## Sources

To view all URLs retrieved during a web search, use the `sources` field. Unlike inline citations, which show only the most relevant references, sources returns the complete list of URLs the model consulted when forming its response.

**cURL:**

```bash
curl "https://api.openai.com/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5",
    "reasoning": { "effort": "low" },
    "tools": [
      {
        "type": "web_search",
        "filters": {
          "allowed_domains": [
            "pubmed.ncbi.nlm.nih.gov",
            "clinicaltrials.gov",
            "www.who.int"
          ]
        }
      }
    ],
    "tool_choice": "auto",
    "include": ["web_search_call.action.sources"],
    "input": "Please perform a web search on how semaglutide is used in the treatment of diabetes."
  }'
```

## User Location

To refine search results based on geography, you can specify an approximate user location using country, city, region, and/or timezone.

- The `city` and `region` fields are free text strings, like `Minneapolis` and `Minnesota` respectively.
- The `country` field is a two-letter ISO country code, like `US`.
- The `timezone` field is an IANA timezone like `America/Chicago`.

**Python:**

```python
response = client.responses.create(
    model="o4-mini",
    tools=[{
        "type": "web_search",
        "user_location": {
            "type": "approximate",
            "country": "GB",
            "city": "London",
            "region": "London",
        }
    }],
    input="What are the best restaurants near me?",
)
```

## API Compatibility

Web search is available in:

- **Responses API**: As the generally available version `web_search`, and the earlier `web_search_preview`
- **Chat Completions API**: Use the specialized web search models `gpt-4o-search-preview` and `gpt-4o-mini-search-preview`

## Limitations

- Web search is currently not supported in `gpt-5` with `minimal` reasoning, and `gpt-4.1-nano`.
- When used as a tool in the Responses API, web search has the same tiered rate limits as the models above.
- Web search is limited to a context window size of 128000 (even with `gpt-4.1` and `gpt-4.1-mini` models).

## Usage Notes

- **Responses API**: Available
- **Chat Completions API**: Available (with specific models)
- **Assistants API**: Available
- **Rate Limits**: Same as tiered rate limits for underlying model used with the tool
- **Pricing**: See pricing page
- **ZDR and data residency**: Supported

---

# Built-in vs Custom Tools

Understanding when to use OpenAI's built-in tools versus creating custom tools with function calling.

## Built-in Tools

OpenAI provides several powerful built-in tools that are ready to use out of the box:

### When to Use Built-in Tools

- **Code Interpreter**: When you need to execute Python code, perform data analysis, create visualizations, or process files
- **Computer Use**: When you need to automate computer tasks, web browsing, or UI interactions
- **File Search**: When you need to search through documents or provide a knowledge base
- **Image Generation**: When you need to create or edit images based on text prompts
- **Web Search**: When you need current information from the internet
- **MCP/Connectors**: When you need to connect to popular third-party services

### Advantages of Built-in Tools

- **No setup required**: Tools work immediately without configuration
- **Optimized performance**: Built-in tools are optimized for speed and reliability
- **Automatic handling**: The model knows how and when to use these tools effectively
- **Regular updates**: OpenAI maintains and improves these tools over time

## Custom Tools via Function Calling

You can also define custom functions that models can call to access specific data or capabilities unique to your application.

### When to Create Custom Tools

- **Business-specific data**: Accessing your internal databases, APIs, or systems
- **Custom workflows**: Implementing domain-specific logic or processes
- **Third-party integrations**: Connecting to services not covered by built-in connectors
- **Specialized computations**: Performing calculations or operations specific to your use case

### Creating Custom Functions

Here's an example of defining a custom function:

**Python:**

```python
def get_current_weather(location, unit="fahrenheit"):
    """Get the current weather in a given location"""
    # Implementation would call a weather API
    return {
        "location": location,
        "temperature": "72",
        "unit": unit,
        "description": "Sunny"
    }

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"]
                    }
                },
                "required": ["location"]
            }
        }
    }
]

response = client.responses.create(
    model="gpt-4.1",
    tools=tools,
    input="What's the weather like in Boston today?"
)
```

## Tool Choice Strategies

You can control how models use tools with the `tool_choice` parameter:

- **`auto`** (default): Let the model decide which tools to use
- **`required`**: Force the model to use at least one tool
- **`none`**: Prevent the model from using any tools
- **Specific tool**: Force the model to use a particular tool

**Example:**

```python
# Force the model to use web search
response = client.responses.create(
    model="gpt-4.1",
    tools=[{"type": "web_search"}],
    tool_choice={"type": "web_search"},
    input="What's the latest news about AI?"
)
```

## Combining Tools

You can use multiple tools together in a single request:

**Python:**

```python
response = client.responses.create(
    model="gpt-4.1",
    tools=[
        {"type": "web_search"},
        {"type": "code_interpreter", "container": {"type": "auto"}},
        {"type": "image_generation"},
        {
            "type": "function",
            "function": {
                "name": "save_analysis",
                "description": "Save analysis results to database",
                # ... function definition
            }
        }
    ],
    input="Research the latest AI trends, analyze the data, create a visualization, and save the results."
)
```

## Best Practices

### Tool Selection

1. **Start with built-in tools**: Use OpenAI's built-in tools when they meet your needs
2. **Create custom functions for business logic**: Use function calling for application-specific operations
3. **Combine tools strategically**: Use multiple tools together to create powerful workflows
4. **Consider performance**: Built-in tools are generally faster than custom functions

### Function Definition

1. **Clear descriptions**: Provide detailed descriptions of what each function does
2. **Proper parameters**: Define parameters with appropriate types and descriptions
3. **Error handling**: Implement robust error handling in your custom functions
4. **Security**: Validate all inputs and implement proper authentication

### Tool Control

1. **Use appropriate tool_choice**: Control when and how tools are used
2. **Provide context**: Give the model enough context to choose tools effectively
3. **Handle tool outputs**: Process and validate tool outputs before using them
4. **Monitor usage**: Track tool usage for debugging and optimization

## Conclusion

OpenAI's comprehensive tools ecosystem provides powerful capabilities for enhancing AI applications. By understanding when to use built-in tools versus custom functions, and how to combine them effectively, you can create sophisticated applications that leverage the full potential of AI-powered automation and intelligence.

The key is to start with built-in tools for common functionality, then extend with custom functions for your specific business needs, creating a powerful and flexible AI system tailored to your use case.
