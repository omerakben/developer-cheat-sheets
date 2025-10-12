# OpenAI Agents - Complete Documentation Guide

## Table of Contents

1. [OpenAI Agents Overview](#openai-agents-overview)
2. [AgentKit Toolkit](#agentkit-toolkit)
3. [Agent Builder](#agent-builder)
4. [ChatKit Integration](#chatkit-integration)
5. [Advanced ChatKit Integrations](#advanced-chatkit-integrations)
6. [Actions in ChatKit](#actions-in-chatkit)
7. [Agent Evaluations](#agent-evaluations)
8. [Agents SDK](#agents-sdk)
9. [Node Reference](#node-reference)
10. [Safety in Building Agents](#safety-in-building-agents)
11. [Voice Agents](#voice-agents)
12. [ChatKit Theming and Customization](#chatkit-theming-and-customization)
13. [Trace Grading](#trace-grading)
14. [ChatKit Widgets](#chatkit-widgets)

---

# OpenAI Agents Overview

Learn how to build, deploy, and optimize agent workflows with AgentKit.

Agents are systems that intelligently accomplish tasks—from simple goals to complex, open-ended workflows. OpenAI provides models with agentic strengths, a toolkit for agent creation and deployment, and dashboard features for monitoring and optimizing agents.

## How to Build an Agent

Building an agent is a process of designing workflows and connecting pieces of the OpenAI platform to meet your goals. Agent Builder brings all these primitives into one UI.

| Goal                         | What to use                            | Description                                                                                                        |
| ---------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Build an agent workflow      | Agent Builder                          | Visual canvas for creating agent workflows. Brings models, tools, knowledge, and logic all into one place.         |
| Connect to LLMs              | OpenAI models                          | Core intelligence capable of reasoning, making decisions, and processing data. Select your model in Agent Builder. |
| Equip your agent             | Tools, guardrails                      | Access to third-party services with connectors and MCP, search vector stores, and prevent misuse.                  |
| Provide knowledge and memory | Vector stores, file search, embeddings | External and persistent knowledge for more relevant information for your use case, hosted by OpenAI.               |
| Add control-flow logic       | Logic nodes                            | Custom logic for how agents work together, handle conditions, and route to other agents.                           |

To build a voice agent that understands audio and responds in natural language, see the [voice agents docs](/docs/guides/voice-agents). Voice agents are not supported in Agent Builder.

## Deploy Agents in Your Product

When you're ready to bring your agent to production, use ChatKit to embed the agent workflow into your product UI, or copy Agents SDK code.

| Goal                | What to use | Description                                                                                     |
| ------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| Embed your agent    | ChatKit     | Customizable UI component. Paste your workflow ID to embed your agent workflow in your product. |
| Write your own code | Agents SDK  | Copy Python or TypeScript code from Agent Builder for use with the Agents SDK.                  |

## Optimize Agent Performance

Use the OpenAI platform to evaluate agent performance and automate improvements.

| Goal                       | What to use      | Description                                                                        |
| -------------------------- | ---------------- | ---------------------------------------------------------------------------------- |
| Evaluate agent performance | Evals features   | Full evaluation platform, including support for external model evaluation.         |
| Automate trace grading     | Trace grading    | Develop, deploy, monitor, and improve agents.                                      |
| Build and track evals      | Datasets         | A collaborative interface to build agent-level evals in a test environment.        |
| Optimize prompts           | Prompt optimizer | Measure agent performance, identify areas for improvement, and refine your agents. |

---

# AgentKit Toolkit

AgentKit is a modular toolkit for building, deploying, and optimizing agents.

## Build

Create workflows with Agent Builder, a visual canvas with starter templates

**Agent Builder** is a visual canvas for building multi-step agent workflows. You can start from templates, drag and drop nodes for each step in your workflow, provide typed inputs and outputs, and preview runs using live data.

## Deploy

Use ChatKit to embed your agent workflows in your frontend

**ChatKit** is the best way to build agentic chat experiences. Whether you're building an internal knowledge base assistant, HR onboarding helper, research companion, shopping or scheduling assistant, troubleshooting bot, financial planning advisor, or support agent, ChatKit provides a customizable chat embed to handle all user experience details.

## Optimize

Build robust evals to observe and improve agent performance

Use the OpenAI platform's **evaluation workflows** to assess your agent performance programmatically. Create evaluations, configure graders, and launch runs to measure whether an agent or workflow is meeting expectations.

---

# Agent Builder

Visually assemble, debug, and export multi-step agent workflows from the playground.

**Agent Builder** is a visual canvas for building multi-step agent workflows. You can start from templates, drag and drop nodes for each step in your workflow, provide typed inputs and outputs, and preview runs using live data. When you're ready to deploy, embed the workflow into your site with ChatKit, or download the SDK code to run it yourself.

## Agents and Workflows

To build useful agents, you create workflows for them. A **workflow** is a combination of agents, tools, and control-flow logic. A workflow encapsulates all steps and actions involved in handling your tasks or powering your chats, with working code you can deploy when you're ready.

There are three main steps in building agents to handle tasks:

1. **Design a workflow** in Agent Builder. This defines your agents and how they'll work.
2. **Publish your workflow**. It's an object with an ID and versioning.
3. **Deploy your workflow**. Pass the ID into your ChatKit integration, or download the Agents SDK code to deploy your workflow yourself.

## Compose with Nodes

In Agent Builder, insert and connect nodes to create your workflow. Each connection between nodes becomes a typed edge. Click a node to configure its inputs and outputs, observe the data contract between steps, and ensure downstream nodes receive the properties they expect.

### Examples and Templates

Agent Builder provides templates for common workflow patterns. Start with a template to see how nodes work together, or start from scratch.

### Preview and Debug

As you build, you can test your workflow by using the **Preview** feature. Here, you can interactively run your workflow, attach sample files, and observe the execution of each node.

### Safety and Risks

Building agent workflows comes with risks, like prompt injection and data leakage. See [safety in building agents](/docs/guides/agent-builder-safety) to learn about and help mitigate the risks of agent workflows.

### Evaluate Your Workflow

Run [trace graders](/docs/guides/trace-grading) inside of Agent Builder. In the top navigation, click **Evaluate**. Here, you can select a trace (or set of traces) and run custom graders to assess overall workflow performance.

## Publish Your Workflow

Agent Builder autosaves your work as you go. When you're happy with your workflow, publish it to create a new major version that acts as a snapshot. You can then use your workflow in ChatKit, an OpenAI framework for embedding chat experiences.

You can create new versions or specify an older version in your API calls.

## Deploy in Your Product

When you're ready to implement the agent workflow you created, click **Code** in the top navigation. You have two options for implementing your workflow in production:

**ChatKit**: Follow the ChatKit quickstart and pass in your workflow ID to embed this workflow into your application. If you're not sure, we recommend this option.

**Advanced integration**: Copy the workflow code and use it anywhere. You can run ChatKit on your own infrastructure and use the Agents SDK to build and customize agent chat experiences.

---

# ChatKit Integration

Build and customize an embeddable chat with ChatKit.

ChatKit is the best way to build agentic chat experiences. Use ChatKit's embeddable UI widgets, customizable prompts, tool-invocation support, file attachments, and chain-of-thought visualizations to build agents without reinventing the chat UI.

## Overview

There are two ways to implement ChatKit:

* **Recommended integration**: Embed ChatKit in your frontend, customize its look and feel, let OpenAI host and scale the backend from Agent Builder. Requires a development server.
* **Advanced integration**: Run ChatKit on your own infrastructure. Use the ChatKit Python SDK and connect to any agentic backend. Use widgets to build the frontend.

## Embed ChatKit in Your Frontend

At a high level, setting up ChatKit is a three-step process. Create an agent workflow, hosted on OpenAI servers. Then set up ChatKit and add features to build your chat experience.

### 1. Create an Agent Workflow

Create an agent workflow with Agent Builder. Agent Builder is a visual canvas for designing multi-step agent workflows. You'll get a workflow ID.

The chat embedded in your frontend will point to the workflow you created as the backend.

### 2. Set up ChatKit in Your Product

To set up ChatKit, you'll create a ChatKit session and create a backend endpoint, pass in your workflow ID, exchange the client secret, add a script to embed ChatKit on your site.

1. **On your server, generate a client token.**

```python
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()
openai = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

@app.post("/api/chatkit/session")
def create_chatkit_session():
    session = openai.chatkit.sessions.create({
        # ...
    })
    return { client_secret: session.client_secret }
```

2. **In your server-side code, pass in your workflow ID and secret key to the session endpoint.**

```typescript
export default async function getChatKitSessionToken(
  deviceId: string
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "OpenAI-Beta": "chatkit_beta=v1",
      Authorization: "Bearer " + process.env.VITE_OPENAI_API_SECRET_KEY,
    },
    body: JSON.stringify({
      workflow: { id: "wf_68df4b13b3588190a09d19288d4610ec0df388c3983f58d1" },
      user: deviceId,
    }),
  });

  const { client_secret } = await response.json();
  return client_secret;
}
```

3. **In your project directory, install the ChatKit React bindings:**

```bash
npm install @openai/chatkit-react
```

4. **Add the ChatKit JS script to your page.**

```html
<script
  src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
  async
></script>
```

5. **Render ChatKit in your UI.**

```react
import { ChatKit, useChatKit } from '@openai/chatkit-react';

export function MyChat() {
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        if (existing) {
          // implement session refresh
        }
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { client_secret } = await res.json();
        return client_secret;
      },
    },
  });

  return <ChatKit control={control} className="h-[600px] w-[320px]" />;
}
```

### 3. Build and Iterate

See the custom theming, widgets, and actions docs to learn more about how ChatKit works. Or explore resources to test your chat, iterate on prompts, and add widgets and tools.

---

# Advanced ChatKit Integrations

Use your own infrastructure with ChatKit for more customization.

When you need full control—custom authentication, data residency, on-prem deployment, or bespoke agent orchestration—you can run ChatKit on your own infrastructure. Use OpenAI's advanced self-hosted option to use your own server and customized ChatKit.

## Run ChatKit on Your Own Infrastructure

At a high level, an advanced ChatKit integration is a process of building your own ChatKit server and adding widgets to build out your chat surface. You'll use OpenAI APIs and your ChatKit server to build a custom chat powered by OpenAI models.

## Set up Your ChatKit Server

Follow the server guide on GitHub to learn how to handle incoming requests, run tools, and stream results back to the client.

### 1. Install the Server Package

```bash
pip install openai-chatkit
```

### 2. Implement a Server Class

`ChatKitServer` drives the conversation. Override `respond` to stream events whenever a user message or client tool output arrives. Helpers like `stream_agent_response` make it simple to connect to the Agents SDK.

```python
class MyChatKitServer(ChatKitServer):
    def __init__(self, data_store: Store, file_store: FileStore | None = None):
        super().__init__(data_store, file_store)
        assistant_agent = Agent[AgentContext](
            model="gpt-4.1",
            name="Assistant",
            instructions="You are a helpful assistant",
        )

    async def respond(
        self,
        thread: ThreadMetadata,
        input: UserMessageItem | ClientToolCallOutputItem,
        context: Any,
    ) -> AsyncIterator[Event]:
        agent_context = AgentContext(
            thread=thread,
            store=self.store,
            request_context=context,
        )
        result = Runner.run_streamed(
            self.assistant_agent,
            await to_input_item(input, self.to_message_content),
            context=agent_context,
        )
        async for event in stream_agent_response(agent_context, result):
            yield event

    async def to_message_content(
        self, input: FilePart | ImagePart
    ) -> ResponseInputContentParam:
        raise NotImplementedError()
```

### 3. Expose the Endpoint

Use your framework of choice to forward HTTP requests to the server instance. For example, with FastAPI:

```python
app = FastAPI()
data_store = SQLiteStore()
file_store = DiskFileStore(data_store)
server = MyChatKitServer(data_store, file_store)

@app.post("/chatkit")
async def chatkit_endpoint(request: Request):
    result = await server.process(await request.body(), {})
    if isinstance(result, StreamingResult):
        return StreamingResponse(result, media_type="text/event-stream")
    return Response(content=result.json, media_type="application/json")
```

### 4. Establish Data Store Contract

Implement `chatkit.store.Store` to persist threads, messages, and files using your preferred database. The default example uses SQLite for local development.

### 5. Provide File Store Contract

Provide a `FileStore` implementation if you support uploads. ChatKit works with direct uploads or two-phase uploads.

### 6. Trigger Client Tools from the Server

Client tools must be registered both in the client options and on your agent. Use `ctx.context.client_tool_call` to enqueue a call from an Agents SDK tool.

```python
@function_tool(description_override="Add an item to the user's todo list.")
async def add_to_todo_list(ctx: RunContextWrapper[AgentContext], item: str) -> None:
    ctx.context.client_tool_call = ClientToolCall(
        name="add_to_todo_list",
        arguments={"item": item},
    )

assistant_agent = Agent[AgentContext](
    model="gpt-4.1",
    name="Assistant",
    instructions="You are a helpful assistant",
    tools=[add_to_todo_list],
    tool_use_behavior=StopAtTools(stop_at_tool_names=[add_to_todo_list.name]),
)
```

### 7. Use Thread Metadata and State

Use `thread.metadata` to store server-side state such as the previous Responses API run ID or custom labels.

### 8. Get Tool Status Updates

Long-running tools can stream progress to the UI with `ProgressUpdateEvent`.

### 9. Using Server Context

Pass a custom context object to `server.process(body, context)` to enforce permissions or propagate user identity.

## Add Inline Interactive Widgets

Widgets let agents surface rich UI inside the chat surface. Use them for cards, forms, text blocks, lists, and other layouts.

```python
async def respond(
    self,
    thread: ThreadMetadata,
    input: UserMessageItem | ClientToolCallOutputItem,
    context: Any,
) -> AsyncIterator[Event]:
    widget = Card(
        children=[Text(
            id="description",
            value="Generated summary",
        )]
    )
    async for event in stream_widget(
        thread,
        widget,
        generate_id=lambda item_type: self.store.generate_item_id(item_type, thread, context),
    ):
        yield event
```

---

# Actions in ChatKit

Trigger actions on the backend from user interactions in your chat.

Actions are a way for the ChatKit SDK frontend to trigger a streaming response without the user submitting a message. They can also be used to trigger side-effects outside ChatKit SDK.

## Triggering Actions

### In Response to User Interaction with Widgets

Actions can be triggered by attaching an `ActionConfig` to any widget node that supports it. For example, you can respond to click events on Buttons.

```python
Button(
    label="Example",
    onClickAction=ActionConfig(
        type="example",
        payload={"id": 123},
    )
)
```

Actions can also be sent imperatively by your frontend with `sendAction()`.

```tsx
await chatKit.sendAction({
    type: "example",
    payload: { id: 123 },
});
```

## Handling Actions

### On the Server

By default, actions are sent to your server. You can handle actions on your server by implementing the `action` method on `ChatKitServer`.

```python
class MyChatKitServer(ChatKitServer[RequestContext]):
    async def action(
        self,
        thread: ThreadMetadata,
        action: Action[str, Any],
        sender: WidgetItem | None,
        context: RequestContext,
    ) -> AsyncIterator[Event]:
        if action.type == "example":
            await do_thing(action.payload['id'])

            # Often you'll want to add a HiddenContextItem so the model
            # can see that the user did something
            await self.store.add_thread_item(
                thread.id,
                HiddenContextItem(
                    id="item_123",
                    created_at=datetime.now(),
                    content="<USER_ACTION>The user did a thing</USER_ACTION>",
                ),
                context,
            )

            # Then you might want to run inference to stream a response
            # back to the user.
            async for e in self.generate(context, thread):
                yield e
```

**NOTE:** As with any client/server interaction, actions and their payloads are sent by the client and should be treated as untrusted data.

### Client

Sometimes you'll want to handle actions in your client integration. To do that you need to specify that the action should be sent to your client-side action handler by adding `handler="client"` to the `ActionConfig`.

```python
Button(
    label="Example",
    onClickAction=ActionConfig(
        type="example",
        payload={"id": 123},
        handler="client"
    )
)
```

Then, when the action is triggered, it will be passed to a callback that you provide when instantiating ChatKit.

```ts
async function handleWidgetAction(action: {type: string, Record<string, unknown>}) {
    if (action.type === "example") {
        const res = await doSomething(action)

        // You can fire off actions to your server from here as well.
        // e.g. if you want to stream new thread items or update a widget.
        await chatKit.sendAction({
            type: "example_complete",
            payload: res
        })
    }
}

chatKit.setOptions({
    // other options...
    widgets: { onAction: handleWidgetAction }
})
```

## Strongly Typed Actions

By default `Action` and `ActionConfig` are not strongly typed. However, we do expose a `create` helper on `Action` making it easy to generate `ActionConfig`s from a set of strongly-typed actions.

```python
class ExamplePayload(BaseModel):
    id: int

ExampleAction = Action[Literal["example"], ExamplePayload]
OtherAction = Action[Literal["other"], None]

AppAction = Annotated[
    ExampleAction | OtherAction,
    Field(discriminator="type"),
]

ActionAdapter: TypeAdapter[AppAction] = TypeAdapter(AppAction)

def parse_app_action(action: Action[str, Any]) -> AppAction:
    return ActionAdapter.model_validate(action)

# Usage in a widget
Button(
    label="Example",
    onClickAction=ExampleAction.create(ExamplePayload(id=123))
)

# Usage in action handler
class MyChatKitServer(ChatKitServer[RequestContext]):
    async def action(
        self,
        thread: ThreadMetadata,
        action: Action[str, Any],
        sender: WidgetItem | None,
        context: RequestContext,
    ) -> AsyncIterator[Event]:
        app_action = parse_app_action(action)
        if (app_action.type == "example"):
            await do_thing(app_action.payload.id)
```

## Use Widgets and Actions to Create Custom Forms

When widget nodes that take user input are mounted inside a `Form`, the values from those fields will be included in the `payload` of all actions that originate from within the `Form`.

Form values are keyed in the `payload` by their `name` e.g.

* `Select(name="title")` → `action.payload.title`
* `Select(name="todo.title")` → `action.payload.todo.title`

```python
Form(
    direction="col",
    validation="native",
    onSubmitAction=ActionConfig(
        type="update_todo",
        payload={"id": todo.id}
    ),
    children=[
        Title(value="Edit Todo"),
        Text(value="Title", color="secondary", size="sm"),
        Text(
            value=todo.title,
            editable=EditableProps(name="title", required=True),
        ),
        Text(value="Description", color="secondary", size="sm"),
        Text(
            value=todo.description,
            editable=EditableProps(name="description"),
        ),
        Button(label="Save", type="submit")
    ]
)
```

### Validation

`Form` uses basic native form validation; enforcing `required` and `pattern` on fields where they are configured and blocking submission when the form has any invalid field.

### Treating `Card` as a `Form`

You can pass `asForm=True` to `Card` and it will behave as a `Form`, running validation and passing collected fields to the Card's `confirm` action.

## Control Loading State Interactions in Widgets

Use `ActionConfig.loadingBehavior` to control how actions trigger different loading states in a widget.

```python
Button(
    label="This make take a while...",
    onClickAction=ActionConfig(
        type="long_running_action_that_should_block_other_ui_interactions",
        loadingBehavior="container"
    )
)
```

| Value     | Behavior                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| auto      | The action will adapt to how it's being used. (default)                                                                         |
| self      | The action triggers loading state on the widget node that the action was bound to.                                              |
| container | The action triggers loading state on the entire widget container. This causes the widget to fade out slightly and become inert. |
| none      | No loading state                                                                                                                |

### Using `auto` Behavior

Generally, we recommend using `auto`, which is the default. `auto` triggers loading states based on where the action is bound, for example:

* `Button.onClickAction` → `self`
* `Select.onChangeAction` → `none`
* `Card.confirm.action` → `container`

---

# Agent Evaluations

Measure agent quality with reproducible evaluations.

Evaluations (evals) help you measure whether an agent or workflow is meeting expectations. Use the dashboard's evaluation workflows to assess your agent performance programmatically.

## Create Evaluations

1. Navigate to the evaluations builder in your dashboard.
2. Choose your **data source**. Upload a CSV, sample from previous Responses/Chat Completions runs, or type in synthetic examples.
3. Use the **Sample generator** panel to template prompts with handlebars-style variable substitution.

## Configure Graders

Pick from the built-in graders:

* **Score model** and **label model** graders delegate evaluation to chosen OpenAI models.
* **Text similarity** and **string check** graders perform deterministic client-side checks.
* **Python grader** allows custom logic that runs inside an isolated sandbox.

Graders are persisted with the run so you can audit decisions later. Combine multiple graders in a single evaluation to capture quantitative and qualitative signals.

You can also run graders at the trace level for a closer look at agent behavior and performance.

## Launch Runs

When you click **Create evaluation**, the UI serializes your configuration with helpers. Each run stores the data source, sampling parameters, and templated messages so it can be replayed. You can also trigger runs directly through the Evals API:

```ts
import OpenAI from "openai";

const client = new OpenAI();

const run = await client.evals.create({
  name: "knowledge-assistant-regression",
  data_source: {
    type: "responses",
    filter: {
      project_ids: ["proj_123"],
      prompt_ids: ["pmpt_456"],
    },
  },
  graders: [
    {
      type: "score_model",
      model: "gpt-4.1-mini",
      rubric: "Score from 1-5 based on factual accuracy.",
    },
  ],
});
```

## Inspect and Iterate

Completed runs appear in the evaluations list and detail views. The detail page visualizes per-sample results, grader rationales, and regression warnings based on historical baselines. You can reopen a run, tweak graders, or run the same dataset against a different workflow.

---

# Agents SDK

Learn how to build agents with the OpenAI Agents SDK.

Welcome to the OpenAI Agents SDK. This library makes it straightforward to build agentic applications—where a model can use additional context and tools, hand off to other specialized agents, stream partial results, and keep a full trace of what happened.

## Download and Installation

Access the latest version in the following GitHub repositories:

* [Agents SDK Python](https://github.com/openai/openai-agents-python)
* [Agents SDK TypeScript](https://openai.github.io/openai-agents-js)

## Documentation

Documentation for the Agents SDK lives at OpenAI Developers. Use quickstarts, guides, apps, and demos all in one place, under the agents topic.

---

# Node Reference

Explore all available nodes for composing workflows in Agent Builder.

Agent Builder is a visual canvas for composing agentic workflows. Workflows are made up of nodes and connections that control the sequence and flow. Insert nodes, then configure and connect them to define the process you want your agents to follow.

## Core Nodes

Get started with basic building blocks. All workflows have start and agent nodes.

### Start

Define inputs to your workflow. For user input in a chat workflow, start nodes do two things:

* Append the user input to the conversation history
* Expose `input_as_text` to represent the text contents of this input

All chat start nodes have `input_as_text` as an input variable. You can add state variables too.

### Agent

Define instructions, tools, and model configuration, or attach evaluations.

Keep each agent well defined in scope. Add model behavior instructions and user messages as you would with any other model prompt. To pipe output from a previous step, you can add it as context.

You can have as many agent nodes as you'd like.

### Note

Annotate prompts and share context. Unlike other nodes, notes don't _do_ anything in the flow. They're just comments.

## Tool Nodes

Tool nodes let you equip your agents with tools and external services. You can retrieve data, monitor for misuse, and connect to external services.

### File Search

Retrieve data from vector stores you've created in the OpenAI platform. Search by vector store ID, and add a query for what the model should search for.

See the file search documentation to set up vector stores and see supported file types.

### Guardrails

Set up input monitors for unwanted inputs such as personally identifiable information (PII), jailbreaks, hallucinations, and other misuse.

Guardrails are pass/fail by default, meaning they test the output from a previous node, and you define what happens next.

### MCP

Call third-party tools and services. Connect with OpenAI connectors or third-party servers, or add your own server. MCP connections are helpful in a workflow that needs to read or search data in another application, like Gmail or Zapier.

Browse options in the Agent Builder. To learn more about MCP, see the connectors and MCP documentation.

## Logic Nodes

Logic nodes let you write custom logic and define the control flow—for example, looping on custom conditions, or asking the user for approval before continuing an operation.

### If/Else

Add conditional logic. Use Common Expression Language (CEL) to create a custom expression. Useful for defining what to do with input that's been sorted into classifications.

### While

Loop on custom conditions. Use Common Expression Language (CEL) to create a custom expression.

### Human Approval

Defer to end-users for approval. Useful for workflows where agents draft work that could use a human review before it goes out.

## Data Nodes

Data nodes let you define and manipulate data in your workflow. Reshape outputs or define global variables for use across your workflow.

### Transform

Reshape outputs (e.g., object → array). Useful for enforcing types to adhere to your schema or reshaping outputs for agents to read and understand as inputs.

### Set State

Define global variables for use across the workflow. Useful for when an agent takes input and outputs something new that you'll want to use throughout the workflow.

---

# Safety in Building Agents

Minimize prompt injections and other risks when building agents.

As you build and deploy agents with Agent Builder, it's important to understand the risks. Learn about risk types and how to mitigate them when building multi-agent workflows.

## Types of Risk

Certain agent workflow patterns are more vulnerable to risk. In chat workflows, two important considerations are protecting user input and being careful about MCP tool calling.

### Prompt Injections

**Prompt injections** are a common and dangerous type of attack. A prompt injection happens when untrusted text or data enters an AI system, and malicious contents in that text or data attempt to override instructions to the AI.

### Private Data Leakage

**Private data leakage**, when an agent accidentally shares private data, is also a risk to guard against. It's possible for a model to leak private data in a way that's not intended, without an attacker behind it.

## Mitigation Strategies

### Don't Use Untrusted Variables in Developer Messages

Because developer messages take precedence over user and assistant messages, injecting untrusted input directly into developer messages gives attackers the highest degree of control.

### Use Structured Outputs to Constrain Data Flow

Prompt injections often rely on the model freely generating unexpected text or commands that propagate downstream. By defining structured outputs between nodes, you eliminate freeform channels that attackers can exploit.

### Steer the Agent with Clear Guidance and Examples

Agent workflows may do something you don't want due to hallucination, misunderstanding, ambiguous user input, etc. The best way to mitigate this risk is to strengthen your prompts with good documentation of your desired policies and clear examples.

### Use GPT-5 or GPT-5-mini

These models are more disciplined about following developer instructions and exhibit stronger robustness against jailbreaks and indirect prompt injections.

### Keep Tool Approvals On

When using MCP tools, always enable tool approvals so end users can review and confirm every operation. In Agent Builder, use the human approval node.

### Use Guardrails for User Inputs

Sanitize incoming inputs using built-in guardrails to redact personally identifiable information (PII) and detect jailbreak attempts.

### Run Trace Graders and Evals

If you understand what models are doing, you can better catch and prevent mistakes. Use evals to evaluate and improve performance.

### Combine Techniques

By combining these techniques and hardening critical steps, you can significantly reduce risks of prompt injection, malicious tool use, or unexpected agent behavior.

---

# Voice Agents

Learn how to build voice agents that can understand audio and respond back in natural language.

Use the OpenAI API and Agents SDK to create powerful, context-aware voice agents for applications like customer support and language tutoring.

## Choose the Right Architecture

OpenAI provides two primary architectures for building voice agents:

### Speech-to-Speech (Realtime) Architecture

The multimodal speech-to-speech (S2S) architecture directly processes audio inputs and outputs, handling speech in real time in a single multimodal model, `gpt-4o-realtime-preview`. The model thinks and responds in speech.

| Strengths                                                    | Best for                                               |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| Low latency interactions                                     | Interactive and unstructured conversations             |
| Rich multimodal understanding                                | Language tutoring and interactive learning experiences |
| Natural, fluid conversational flow                           | Conversational search and discovery                    |
| Enhanced user experience through vocal context understanding | Interactive customer service scenarios                 |

### Chained Architecture

A chained architecture processes audio sequentially, converting audio to text, generating intelligent responses using large language models (LLMs), and synthesizing audio from text.

You're chaining these models: `gpt-4o-transcribe` → `gpt-4.1` → `gpt-4o-mini-tts`

| Strengths                                           | Best for                                                  |
| --------------------------------------------------- | --------------------------------------------------------- |
| High control and transparency                       | Structured workflows focused on specific user objectives  |
| Robust function calling and structured interactions | Customer support                                          |
| Reliable, predictable responses                     | Sales and inbound triage                                  |
| Support for extended conversational context         | Scenarios that involve transcripts and scripted responses |

## Build a Voice Agent

Use OpenAI's APIs and SDKs to create powerful, context-aware voice agents.

Building a speech-to-speech voice agent requires:

1. Establishing a connection for realtime data transfer
2. Creating a realtime session with the Realtime API
3. Using an OpenAI model with realtime audio input and output capabilities

If you are new to building voice agents, we recommend using the Realtime Agents in the TypeScript Agents SDK to get started with your voice agents.

```bash
npm install @openai/agents
```

### Choose Your Transport Method

As latency is critical in voice agent use cases, the Realtime API provides two low-latency transport methods:

1. **WebRTC**: A peer-to-peer protocol that allows for low-latency audio and video communication.
2. **WebSocket**: A common protocol for realtime data transfer.

WebRTC is generally the better choice if you are building client-side applications such as browser-based voice agents.

For anything where you are executing the agent server-side such as building an agent that can answer phone calls, WebSockets will be the better option.

### Design Your Voice Agent

Just like when designing a text-based agent, you'll want to start small and keep your agent focused on a single task.

Try to limit the number of tools your agent has access to and provide an escape hatch for the agent to deal with tasks that it is not equipped to handle.

### Precisely Prompt Your Agent

With speech-to-speech agents, prompting is even more powerful than with text-based agents as the prompt allows you to not just control the content of the agent's response but also the way the agent speaks or help it understand audio content.

A good example of what a prompt might look like:

```text
# Personality and Tone

## Identity
// Who or what the AI represents (e.g., friendly teacher, formal advisor, helpful assistant)

## Task
// At a high level, what is the agent expected to do?

## Demeanor
// Overall attitude or disposition (e.g., patient, upbeat, serious, empathetic)

## Tone
// Voice style (e.g., warm and conversational, polite and authoritative)

## Level of Enthusiasm
// Degree of energy in responses (e.g., highly enthusiastic vs. calm and measured)

## Level of Formality
// Casual vs. professional language

## Level of Emotion
// How emotionally expressive or neutral the AI should be

## Filler Words
// Helps make the agent more approachable, e.g. "um," "uh," "hm," etc.

## Pacing
// Rhythm and speed of delivery

# Instructions
- If a user provides a name or phone number, always repeat it back to the user to confirm
- If the caller corrects any detail, acknowledge the correction and confirm the new value
```

For use cases with common conversation flows you can encode those inside the prompt using markup language like JSON:

```text
# Conversation States
[
  {
    "id": "1_greeting",
    "description": "Greet the caller and explain the verification process.",
    "instructions": [
      "Greet the caller warmly.",
      "Inform them about the need to collect personal information for their record."
    ],
    "examples": [
      "Good morning, this is the front desk administrator. I will assist you in verifying your details."
    ]
  }
]
```

---

# ChatKit Theming and Customization

Configure colors, typography, density, and component variants.

After following the ChatKit quickstart, learn how to change themes and add customization to your chat embed. Match your app's aesthetic with light and dark themes, setting an accent color, controlling the density, and rounded corners.

## Overview

At a high level, customize the theme by passing in an options object. If you followed the ChatKit quickstart to embed ChatKit in your frontend, use the React syntax below.

* **React**: Pass options to `useChatKit({...})`
* **Advanced integrations**: Set options with `chatkit.setOptions({...})`

In both integration types, the shape of the options object is the same.

## Change the Theme

Match the look and feel of your product by specifying colors, typography, and more.

```jsx
const options: Partial<ChatKitOptions> = {
  theme: {
    colorScheme: "dark",
    color: {
      accent: {
        primary: "#2D8CFF",
        level: 2
      }
    },
    radius: "round",
    density: "compact",
    typography: { fontFamily: "'Inter', sans-serif" },
  },
};
```

## Customize the Start Screen Text

Let users know what to ask or guide their first input by changing the composer's placeholder text.

```jsx
const options: Partial<ChatKitOptions> = {
  composer: {
    placeholder: "Ask anything about your data...",
  },
  startScreen: {
    greeting: "Welcome to FeedbackBot!",
  },
};
```

## Show Starter Prompts for New Threads

Guide users on what to ask or do by suggesting prompt ideas when starting a conversation.

```js
const options: Partial<ChatKitOptions> = {
  startScreen: {
    greeting: "What can I help you build today?",
    prompts: [
      {
        name: "Check on the status of a ticket",
        prompt: "Can you help me check on the status of a ticket?",
        icon: "search"
      },
      {
        name: "Create Ticket",
        prompt: "Can you help me create a new support ticket?",
        icon: "write"
      },
    ],
  },
};
```

## Add Custom Buttons to the Header

Custom header buttons help you add navigation, context, or actions relevant to your integration.

```jsx
const options: Partial<ChatKitOptions> = {
  header: {
    customButtonLeft: {
      icon: "settings-cog",
      onClick: () => openProfileSettings(),
    },
    customButtonRight: {
      icon: "home",
      onClick: () => openHomePage(),
    },
  },
};
```

## Enable File Attachments

Attachments are disabled by default. To enable them, add attachments configuration.

```jsx
const options: Partial<ChatKitOptions> = {
  composer: {
    attachments: {
      uploadStrategy: { type: 'hosted' },
      maxSize: 20 * 1024 * 1024, // 20MB per file
      maxCount: 3,
      accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg"] },
    },
  },
}
```

## Enable @mentions in the Composer with Entity Tags

Let users tag custom "entities" with @-mentions. This enables richer conversation context and interactivity.

```jsx
const options: Partial<ChatKitOptions> = {
  entities: {
    async onTagSearch(query) {
      return [
        {
          id: "user_123",
          title: "Jane Doe",
          group: "People",
          interactive: true,
        },
        {
          id: "document_123",
          title: "Quarterly Plan",
          group: "Documents",
          interactive: true,
        },
      ]
    },
    onClick: (entity) => {
      navigateToEntity(entity.id);
    },
  },
};
```

## Customize How Entity Tags Appear

You can customize the appearance of entity tags on mouseover using widgets.

```jsx
const options: Partial<ChatKitOptions> = {
  entities: {
    async onTagSearch() { /* ... */ },
    onRequestPreview: async (entity) => ({
      preview: {
        type: "Card",
        children: [
          { type: "Text", value: `Profile: ${entity.title}`},
          { type: "Text", value: "Role: Developer" },
        ],
      },
    }),
  },
};
```

## Add Custom Tools to the Composer

Enhance productivity by letting users trigger app-specific actions from the composer bar.

```jsx
const options: Partial<ChatKitOptions> = {
  composer: {
    tools: [
      {
        id: 'add-note',
        label: 'Add Note',
        icon: 'write',
        pinned: true,
      },
    ],
  },
};
```

## Toggle UI Regions and Features

Disable major UI regions and features if you need more customization.

```jsx
const options: Partial<ChatKitOptions> = {
  history: { enabled: false },
  header: { enabled: false },
};
```

## Override the Locale

Override the default locale if you have an app-wide language setting.

```jsx
const options: Partial<ChatKitOptions> = {
  locale: 'de-DE',
};
```

---

# Trace Grading

Grade model outputs with reproducible evaluations.

Trace grading is the process of assigning structured scores or labels to an agent's trace—the end-to-end log of decisions, tool calls, and reasoning steps—to assess correctness, quality, or adherence to expectations.

## Get Started with Traces

1. In the dashboard, navigate to Logs > Traces.
2. Select a workflow. You'll see logs from any workflows you created in Agent Builder.
3. Select a trace to inspect your workflow.
4. Create a grader, and run it to grade your agents' performance against grader criteria.

Trace grading is a valuable tool for error identification at scale, which is critical for building resilience into your AI applications.

## Evaluate Traces with Runs

1. Select **Grade all**. This takes you to the evaluation dashboard.
2. In the evaluation dashboard, add and edit test criteria.
3. Add a run to evaluate outputs. You can configure run options like model, date range, and tool calls to get more specificity in your eval.

---

# ChatKit Widgets

Learn how to design widgets in your chat experience.

Widgets are the containers and components that come with ChatKit. You can use prebuilt widgets, modify templates, or design your own to fully customize ChatKit in your product.

## Design Widgets Quickly

Use the Widget Builder in ChatKit Studio to experiment with card layouts, list rows, and preview components. When you have a design you like, copy the generated JSON into your integration and serve it from your backend.

## Upload Assets

Upload assets to customize ChatKit widgets to match your product. ChatKit expects uploads (files and images) to be hosted by your backend before they are referenced in a message.

## Handle Actions on Your Server

Widget actions allow users to trigger logic from the UI. Actions can be bound to different events on various widget nodes (e.g., button clicks) and then handled by your server or client integration.

```ts
chatkit.setOptions({
  widgets: {
    async onAction(action, item) {
      await fetch('/api/widget-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, itemId: item.id }),
      });
    },
  },
});
```

## Widget Components Reference

### Containers (`WidgetRoot`)

**Card** - A bounded container for widgets. Supports `status`, `confirm` and `cancel` fields for presenting status indicators and action buttons below the widget.

**ListView** - Displays a vertical list of items, each as a `ListViewItem`.

### Components (`WidgetNode`)

**Badge** - A small label for status or metadata.

**Box** - A flexible container for layout, supports direction, spacing, and styling.

**Row** - Arranges children horizontally.

**Col** - Arranges children vertically.

**Button** - A flexible action button.

**Caption** - Smaller, supporting text.

**DatePicker** - A date input with a dropdown calendar.

**Divider** - A horizontal or vertical separator.

**Icon** - Displays an icon by name.

**Image** - Displays an image with optional styling, fit, and position.

**ListView** - Displays a vertical list of items.

**ListViewItem** - An item in a `ListView` with optional action.

**Markdown** - Renders markdown-formatted text, supports streaming updates.

**Select** - A dropdown single-select input.

**Spacer** - Flexible empty space used in layouts.

**Text** - Displays plain text (use `Markdown` for markdown rendering). Supports streaming updates.

**Title** - Prominent heading text.

**Form** - A layout container that can submit an action.

**Transition** - Wraps content that may animate.

---

## Conclusion

This comprehensive guide covers all aspects of OpenAI's Agents ecosystem, providing developers and organizations with the knowledge needed to build, deploy, and optimize sophisticated agent workflows. From visual workflow design in Agent Builder to production deployment with ChatKit, this documentation serves as a complete reference for:

* **Understanding Agents**: Core concepts and architecture patterns
* **Building Workflows**: Visual design tools and node composition
* **Embedding Chat**: ChatKit integration and customization
* **Advanced Features**: Actions, widgets, and server-side logic
* **Voice Capabilities**: Speech-to-speech and chained architectures
* **Safety and Security**: Risk mitigation and best practices
* **Performance Optimization**: Evaluation tools and trace grading

The OpenAI Agents platform empowers developers to create intelligent, context-aware applications that can handle complex tasks through natural language interaction, making advanced AI capabilities accessible through intuitive visual tools and robust SDKs.

For additional support and community discussions, visit the [OpenAI Developer Forum](https://community.openai.com/) and explore the extensive resources available at [OpenAI Developers](https://developers.openai.com).
