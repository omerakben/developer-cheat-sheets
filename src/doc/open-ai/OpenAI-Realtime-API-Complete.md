# OpenAI Realtime API - Complete Documentation Guide

## Table of Contents

1. [Realtime API Overview](#realtime-api-overview)
2. [Voice Agents](#voice-agents)
3. [Connection Methods](#connection-methods)
4. [API Usage](#api-usage)
5. [Beta to GA Migration](#beta-to-ga-migration)
6. [Realtime API with WebSocket](#realtime-api-with-websocket)
7. [Realtime API with WebRTC](#realtime-api-with-webrtc)
8. [Realtime API with SIP](#realtime-api-with-sip)

---

# Realtime API

Build low-latency, multimodal LLM applications with the Realtime API.

The OpenAI Realtime API enables low-latency communication with [models](/docs/models) that natively support speech-to-speech interactions as well as multimodal inputs (audio, images, and text) and outputs (audio and text). These APIs can also be used for [realtime audio transcription](/docs/guides/realtime-transcription).

## Voice Agents

One of the most common use cases for the Realtime API is building voice agents for speech-to-speech model interactions in the browser. Our recommended starting point for these types of applications is the [Agents SDK for TypeScript](https://openai.github.io/openai-agents-js/guides/voice-agents/), which uses a [WebRTC connection](/docs/guides/realtime-webrtc) to the Realtime model in the browser, and [WebSocket](/docs/guides/realtime-websocket) when used on the server.

```js
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";

const agent = new RealtimeAgent({
    name: "Assistant",
    instructions: "You are a helpful assistant.",
});

const session = new RealtimeSession(agent);

// Automatically connects your microphone and audio output
await session.connect({
    apiKey: "<client-api-key>",
});
```

**[Voice Agent Quickstart](https://openai.github.io/openai-agents-js/guides/voice-agents/quickstart/)**

Follow the voice agent quickstart to build Realtime agents in the browser.

To use the Realtime API directly outside the context of voice agents, check out the other connection options below.

## Connection Methods

While building [voice agents with the Agents SDK](https://openai.github.io/openai-agents-js/guides/voice-agents/) is the fastest path to one specific type of application, the Realtime API provides an entire suite of flexible tools for a variety of use cases.

There are three primary supported interfaces for the Realtime API:

### [WebRTC Connection](/docs/guides/realtime-webrtc)

Ideal for browser and client-side interactions with a Realtime model.

### [WebSocket Connection](/docs/guides/realtime-websocket)

Ideal for middle tier server-side applications with consistent low-latency network connections.

### [SIP Connection](/docs/guides/realtime-sip)

Ideal for VoIP telephony connections.

Depending on how you'd like to connect to a Realtime model, check out one of the connection guides above to get started. You'll learn how to initialize a Realtime session, and how to interact with a Realtime model using client and server events.

## API Usage

Once connected to a realtime model using one of the methods above, learn how to interact with the model in these usage guides.

* **[Prompting guide](/docs/guides/realtime-models-prompting):** learn tips and best practices for prompting and steering Realtime models.
* **[Managing conversations](/docs/guides/realtime-conversations):** Learn about the Realtime session lifecycle and the key events that happen during a conversation.
* **[Webhooks and server-side controls](/docs/guides/realtime-server-controls):** Learn how you can control a Realtime session on the server to call tools and implement guardrails.
* **[Realtime audio transcription](/docs/guides/realtime-transcription):** Transcribe audio streams in real time over a WebSocket connection.

## Beta to GA Migration

There are a few key differences between the interfaces in the Realtime beta API and the recently released GA API. Expand the topics below for more information about migrating from the beta interface to GA.

### Beta Header

For REST API requests, WebSocket connections, and other interfaces with the Realtime API, beta users had to include the following header with each request:

```text
OpenAI-Beta: realtime=v1
```

This header should be removed for requests to the GA interface. To retain the behavior of the beta API, you should continue to include this header.

### Generating Ephemeral API Keys

In the beta interface, there were multiple endpoints for generating ephemeral keys for either Realtime sessions or transcription sessions. In the GA interface, there is only one REST API endpoint used to generate keys - [`POST /v1/realtime/client_secrets`](/docs/api-reference/realtime-sessions/create-realtime-client-secret).

To create a session and receive a client secret you can use to initialize a WebRTC or WebSocket connection on a client, you can request one like this using the appropriate session configuration:

```javascript
const sessionConfig = JSON.stringify({
    session: {
        type: "realtime",
        model: "gpt-realtime",
        audio: {
            output: { voice: "marin" },
        },
    },
});

const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    },
    body: sessionConfig,
});

const data = await response.json();
console.log(data.value); // e.g. ek_68af296e8e408191a1120ab6383263c2
```

These tokens can safely be used in client environments like browsers and mobile applications.

### New URL for WebRTC SDP Data

When initializing a WebRTC session in the browser, the URL for obtaining remote session information via SDP is now `/v1/realtime/calls`:

```javascript
const baseUrl = "https://api.openai.com/v1/realtime/calls";
const model = "gpt-realtime";
const sdpResponse = await fetch(baseUrl, {
    method: "POST",
    body: offer.sdp,
    headers: {
        Authorization: `Bearer YOUR_EPHEMERAL_KEY_HERE`,
        "Content-Type": "application/sdp",
    },
});

const sdp = await sdpResponse.text();
const answer = { type: "answer", sdp };
await pc.setRemoteDescription(answer);
```

### New Event Names and Shapes

When creating or [updating](/docs/api-reference/realtime_client_events/session/update) a Realtime session in the GA interface, you must now specify a session type, since now the same client event is used to create both speech-to-speech and transcription sessions. The options for the session type are:

* `realtime` for speech-to-speech
* `transcription` for realtime audio transcription

```javascript
import WebSocket from "ws";

const url = "wss://api.openai.com/v1/realtime?model=gpt-realtime";
const ws = new WebSocket(url, {
    headers: {
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
});

ws.on("open", function open() {
    console.log("Connected to server.");

    // Send client events over the WebSocket once connected
    ws.send(
        JSON.stringify({
            type: "session.update",
            session: {
                type: "realtime",
                instructions: "Be extra nice today!",
            },
        })
    );
});
```

Configuration for input modalities and other properties have moved as well, notably output audio configuration like model voice. [Check the API reference](/docs/api-reference/realtime_client_events) for the latest event shapes.

```javascript
ws.on("open", function open() {
    ws.send(
        JSON.stringify({
            type: "session.update",
            session: {
                type: "realtime",
                model: "gpt-realtime",
                audio: {
                    output: { voice: "marin" },
                },
            },
        })
    );
});
```

Finally, some event names have changed to reflect their new position in the event data model:

* **`response.text.delta` → `response.output_text.delta`**
* **`response.audio.delta` → `response.output_audio.delta`**
* **`response.audio_transcript.delta` → `response.output_audio_transcript.delta`**

### New Conversation Item Events

For `response.output_item`, the API has always had both `.added` and `.done` events, but for conversation level items the API previously only had `.created`, which by convention is emitted at the start when the item added. We have added a `.added` and `.done` event to allow better ergonomics for developers when receiving events that need some loading time (such as MCP tool listing or input audio transcriptions if these were to be modeled as items in the future).

Current event shape for conversation items added:

```javascript
{
    "event_id": "event_1920",
    "type": "conversation.item.created",
    "previous_item_id": "msg_002",
    "item": Item
}
```

New events to replace the above:

```javascript
{
    "event_id": "event_1920",
    "type": "conversation.item.added",
    "previous_item_id": "msg_002",
    "item": Item
}
```

```javascript
{
    "event_id": "event_1920",
    "type": "conversation.item.done",
    "previous_item_id": "msg_002",
    "item": Item
}
```

### Input and Output Item Changes

#### All Items

Realtime API sets an `object=realtime.item` param on all items in the GA interface.

#### Function Call Output

`status`: Realtime now accepts a no-op `status` field for the function call output item param. This aligns with the Responses API implementation.

#### Message

**Assistant Message Content**

The `type` properties of output assistant messages now align with the Responses API:

* `type=text` → `type=output_text` (no change to `text` field name)
* `type=audio` → `type=output_audio` (no change to `audio` field name)

---

# Realtime API with WebSocket

Connect to the Realtime API using WebSockets on a server.

[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) are a broadly supported API for realtime data transfer, and a great choice for connecting to the OpenAI Realtime API in server-to-server applications. For browser and mobile clients, we recommend connecting via [WebRTC](/docs/guides/realtime-webrtc).

In a server-to-server integration with Realtime, your backend system will connect via WebSocket directly to the Realtime API. You can use a [standard API key](/settings/organization/api-keys) to authenticate this connection, since the token will only be available on your secure backend server.

![connect directly to realtime API](https://openaidevs.retool.com/api/file/464d4334-c467-4862-901b-d0c6847f003a)

## Connect via WebSocket

Below are several examples of connecting via WebSocket to the Realtime API. In addition to using the WebSocket URL below, you will also need to pass an authentication header using your OpenAI API key.

It is possible to use WebSocket in browsers with an ephemeral API token as shown in the [WebRTC connection guide](/docs/guides/realtime-webrtc), but if you are connecting from a client like a browser or mobile app, WebRTC will be a more robust solution in most cases.

### ws module (Node.js)

Connect using the ws module (Node.js)

```javascript
import WebSocket from "ws";

const url = "wss://api.openai.com/v1/realtime?model=gpt-realtime";
const ws = new WebSocket(url, {
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
  },
});

ws.on("open", function open() {
  console.log("Connected to server.");
});

ws.on("message", function incoming(message) {
  console.log(JSON.parse(message.toString()));
});
```

### websocket-client (Python)

Connect with websocket-client (Python)

```python
# example requires websocket-client library:
# pip install websocket-client

import os
import json
import websocket

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

url = "wss://api.openai.com/v1/realtime?model=gpt-realtime"
headers = ["Authorization: Bearer " + OPENAI_API_KEY]

def on_open(ws):
    print("Connected to server.")

def on_message(ws, message):
    data = json.loads(message)
    print("Received event:", json.dumps(data, indent=2))

ws = websocket.WebSocketApp(
    url,
    header=headers,
    on_open=on_open,
    on_message=on_message,
)

ws.run_forever()
```

### WebSocket (browsers)

Connect with standard WebSocket (browsers)

```javascript
/*
Note that in client-side environments like web browsers, we recommend
using WebRTC instead. It is possible, however, to use the standard
WebSocket interface in browser-like environments like Deno and
Cloudflare Workers.
*/

const ws = new WebSocket(
  "wss://api.openai.com/v1/realtime?model=gpt-realtime",
  [
    "realtime",
    // Auth
    "openai-insecure-api-key." + OPENAI_API_KEY,
    // Optional
    "openai-organization." + OPENAI_ORG_ID,
    "openai-project." + OPENAI_PROJECT_ID,
  ]
);

ws.on("open", function open() {
  console.log("Connected to server.");
});

ws.on("message", function incoming(message) {
  console.log(message.data);
});
```

## Sending and Receiving Events

Realtime API sessions are managed using a combination of [client-sent events](/docs/api-reference/realtime_client_events/session) emitted by you as the developer, and [server-sent events](/docs/api-reference/realtime_server_events/error) created by the Realtime API to indicate session lifecycle events.

Over a WebSocket, you will both send and receive JSON-serialized events as strings of text, as in this Node.js example below (the same principles apply for other WebSocket libraries):

```javascript
import WebSocket from "ws";

const url = "wss://api.openai.com/v1/realtime?model=gpt-realtime";
const ws = new WebSocket(url, {
    headers: {
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
});

ws.on("open", function open() {
    console.log("Connected to server.");

    // Send client events over the WebSocket once connected
    ws.send(
        JSON.stringify({
            type: "session.update",
            session: {
                type: "realtime",
                instructions: "Be extra nice today!",
            },
        })
    );
});

// Listen for and parse server events
ws.on("message", function incoming(message) {
    console.log(JSON.parse(message.toString()));
});
```

The WebSocket interface is perhaps the lowest-level interface available to interact with a Realtime model, where you will be responsible for both sending and processing Base64-encoded audio chunks over the socket connection.

To learn how to send and receive audio over Websockets, refer to the [Realtime conversations guide](/docs/guides/realtime-conversations#handling-audio-with-websockets).

---

# Realtime API with WebRTC

Connect to the Realtime API using WebRTC.

[WebRTC](https://webrtc.org/) is a powerful set of standard interfaces for building real-time applications. The OpenAI Realtime API supports connecting to realtime models through a WebRTC peer connection.

For browser-based speech-to-speech voice applications, we recommend starting with the [Agents SDK for TypeScript](https://openai.github.io/openai-agents-js/guides/voice-agents/quickstart/), which provides higher-level helpers and APIs for managing Realtime sessions. The WebRTC interface is powerful and flexible, but lower level than the Agents SDK.

When connecting to a Realtime model from the client (like a web browser or mobile device), we recommend using WebRTC rather than WebSockets for more consistent performance.

For more guidance on building user interfaces on top of WebRTC, [refer to the docs on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API).

## Overview

The Realtime API supports two mechanisms for connecting to the Realtime API from the browser, either using ephemeral API keys ([generated via the OpenAI REST API](/docs/api-reference/realtime-sessions)), or via the new unified interface. Generally, using the unified interface is simpler, but puts your application server in the critical path for session initialization.

### Connecting using the unified interface

The process for initializing a WebRTC connection using the unified interface is as follows (assuming a web browser client):

1. The browser makes a request to a developer-controlled server using the SDP data from its WebRTC peer connection.
2. The server combines that SDP with its session configuration in a multipart form and sends that to the OpenAI Realtime API, authenticating it with its [standard API key](/settings/organization/api-keys).

#### Creating a session via the unified interface

To create a realtime API session via the unified interface, you will need to build a small server-side application (or integrate with an existing one) to make an request to `/v1/realtime/calls`. You will use a [standard API key](/settings/organization/api-keys) to authenticate this request on your backend server.

Below is an example of a simple Node.js [express](https://expressjs.com/) server which creates a realtime API session:

```javascript
import express from "express";

const app = express();

// Parse raw SDP payloads posted from the browser
app.use(express.text({ type: ["application/sdp", "text/plain"] }));

const sessionConfig = JSON.stringify({
    type: "realtime",
    model: "gpt-realtime",
    audio: { output: { voice: "marin" } }
});

// An endpoint which creates a Realtime API session.
app.post("/session", async (req, res) => {
    const fd = new FormData();
    fd.set("sdp", req.body);
    fd.set("session", sessionConfig);

    try {
        const r = await fetch("https://api.openai.com/v1/realtime/calls", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: fd,
        });
        // Send back the SDP we received from the OpenAI REST API
        const sdp = await r.text();
        res.send(sdp);
    } catch (error) {
        console.error("Token generation error:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

app.listen(3000);
```

#### Connecting to the server

In the browser, you can use standard WebRTC APIs to connect to the Realtime API via your application server. The client directly POSTs its SDP data to your server.

```javascript
// Create a peer connection
const pc = new RTCPeerConnection();

// Set up to play remote audio from the model
audioElement.current = document.createElement("audio");
audioElement.current.autoplay = true;
pc.ontrack = (e) => (audioElement.current.srcObject = e.streams[0]);

// Add local audio track for microphone input in the browser
const ms = await navigator.mediaDevices.getUserMedia({
    audio: true,
});
pc.addTrack(ms.getTracks()[0]);

// Set up data channel for sending and receiving events
const dc = pc.createDataChannel("oai-events");

// Start the session using the Session Description Protocol (SDP)
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);

const sdpResponse = await fetch("/session", {
    method: "POST",
    body: offer.sdp,
    headers: {
        "Content-Type": "application/sdp",
    },
});

const answer = {
    type: "answer",
    sdp: await sdpResponse.text(),
};
await pc.setRemoteDescription(answer);
```

### Connecting using an ephemeral token

The process for initializing a WebRTC connection using an ephemeral API key is as follows (assuming a web browser client):

1. The browser makes a request to a developer-controlled server to mint an ephemeral API key.
2. The developer's server uses a [standard API key](/settings/organization/api-keys) to request an ephemeral key from the [OpenAI REST API](/docs/api-reference/realtime-sessions), and returns that new key to the browser.
3. The browser uses the ephemeral key to authenticate a session directly with the OpenAI Realtime API as a [WebRTC peer connection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection).

![connect to realtime via WebRTC](https://openaidevs.retool.com/api/file/55b47800-9aaf-48b9-90d5-793ab227ddd3)

#### Creating an ephemeral token

To create an ephemeral token to use on the client-side, you will need to build a small server-side application (or integrate with an existing one) to make an [OpenAI REST API](/docs/api-reference/realtime-sessions) request for an ephemeral key. You will use a [standard API key](/settings/organization/api-keys) to authenticate this request on your backend server.

Below is an example of a simple Node.js [express](https://expressjs.com/) server which mints an ephemeral API key using the REST API:

```javascript
import express from "express";

const app = express();

const sessionConfig = JSON.stringify({
    session: {
        type: "realtime",
        model: "gpt-realtime",
        audio: {
            output: {
                voice: "marin",
            },
        },
    },
});

// An endpoint which would work with the client code above - it returns
// the contents of a REST API request to this protected endpoint
app.get("/token", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.openai.com/v1/realtime/client_secrets",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: sessionConfig,
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Token generation error:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

app.listen(3000);
```

You can create a server endpoint like this one on any platform that can send and receive HTTP requests. Just ensure that **you only use standard OpenAI API keys on the server, not in the browser.**

#### Connecting to the server

In the browser, you can use standard WebRTC APIs to connect to the Realtime API with an ephemeral token. The client first fetches a token from your server endpoint, and then POSTs its SDP data (with the ephemeral token) to the Realtime API.

```javascript
// Get a session token for OpenAI Realtime API
const tokenResponse = await fetch("/token");
const data = await tokenResponse.json();
const EPHEMERAL_KEY = data.value;

// Create a peer connection
const pc = new RTCPeerConnection();

// Set up to play remote audio from the model
audioElement.current = document.createElement("audio");
audioElement.current.autoplay = true;
pc.ontrack = (e) => (audioElement.current.srcObject = e.streams[0]);

// Add local audio track for microphone input in the browser
const ms = await navigator.mediaDevices.getUserMedia({
    audio: true,
});
pc.addTrack(ms.getTracks()[0]);

// Set up data channel for sending and receiving events
const dc = pc.createDataChannel("oai-events");

// Start the session using the Session Description Protocol (SDP)
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);

const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    body: offer.sdp,
    headers: {
        Authorization: `Bearer ${EPHEMERAL_KEY}`,
        "Content-Type": "application/sdp",
    },
});

const answer = {
    type: "answer",
    sdp: await sdpResponse.text(),
};
await pc.setRemoteDescription(answer);
```

## Sending and Receiving Events

Realtime API sessions are managed using a combination of [client-sent events](/docs/api-reference/realtime_client_events/session) emitted by you as the developer, and [server-sent events](/docs/api-reference/realtime_server_events/error) created by the Realtime API to indicate session lifecycle events.

When connecting to a Realtime model via WebRTC, you don't have to handle audio events from the model in the same granular way you must with [WebSockets](/docs/guides/realtime-websocket). The WebRTC peer connection object, if configured as above, will do all that work for you.

To send and receive other client and server events, you can use the WebRTC peer connection's [data channel](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_data_channels).

```javascript
// This is the data channel set up in the browser code above...
const dc = pc.createDataChannel("oai-events");

// Listen for server events
dc.addEventListener("message", (e) => {
    const event = JSON.parse(e.data);
    console.log(event);
});

// Send client events
const event = {
    type: "conversation.item.create",
    item: {
        type: "message",
        role: "user",
        content: [
            {
                type: "input_text",
                text: "hello there!",
            },
        ],
    },
};
dc.send(JSON.stringify(event));
```

To learn more about managing Realtime conversations, refer to the [Realtime conversations guide](/docs/guides/realtime-conversations).

**[Realtime Console](https://github.com/openai/openai-realtime-console/)**

Check out the WebRTC Realtime API in this light weight example app.

---

# Realtime API with SIP

Connect to the Realtime API using SIP.

[SIP](https://en.wikipedia.org/wiki/Session_Initiation_Protocol) is a protocol used to make phone calls over the internet. With SIP and the Realtime API you can direct incoming phone calls to the API.

## Overview

If you want to connect a phone number to the Realtime API, use a SIP trunking provider (e.g., Twilio). This is a service that converts your phone call to IP traffic. After you purchase a phone number from your SIP trunking provider, follow the instructions below.

Start by creating a [webhook](/docs/guides/webhooks) for incoming calls, through your **platform.openai.com** [settings](https://platform.openai.com/settings) > Project > **Webhooks**. Then, point your SIP trunk at the OpenAI SIP endpoint, using the project ID for which you configured the webhook, e.g., `sip:$PROJECT_ID@sip.api.openai.com;transport=tls`. To find your `$PROJECT_ID`, visit [settings](https://platform.openai.com/settings) > Project > **General**. That page will display the project ID, which will have a `proj_` prefix.

When OpenAI receives SIP traffic associated with your project, your webhook will be fired. The event fired will be a [`realtime.call.incoming`](/docs/api-reference/webhook-events/realtime/call/incoming) event, like the example below:

```text
POST https://my_website.com/webhook_endpoint
user-agent: OpenAI/1.0 (+https://platform.openai.com/docs/webhooks)
content-type: application/json
webhook-id: wh_685342e6c53c8190a1be43f081506c52 # unique id for idempotency
webhook-timestamp: 1750287078 # timestamp of delivery attempt
webhook-signature: v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4= # signature to verify authenticity from OpenAI

{
  "object": "event",
  "id": "evt_685343a1381c819085d44c354e1b330e",
  "type": "realtime.call.incoming",
  "created_at": 1750287018, // Unix timestamp
  "data": {
    "call_id": "some_unique_id",
    "sip_headers": [
      { "name": "From", "value": "sip:+142555512112@sip.example.com" },
      { "name": "To", "value": "sip:+18005551212@sip.example.com" },
      { "name": "Call-ID", "value": "03782086-4ce9-44bf-8b0d-4e303d2cc590"}
    ]
  }
}
```

From this webhook, you can accept or reject the call, using the `call_id` value from the webhook. When accepting the call, you'll provide the needed configuration (instructions, voice, etc) for the Realtime API session. Once established, you can set up a WebSocket and monitor the session as usual. The APIs to accept, reject, monitor, refer, and hangup the call are documented below.

## Accept the Call

Use the [Accept call endpoint](/docs/api-reference/realtime-calls/accept-call) to approve the inbound call and configure the realtime session that will answer it. Send the same parameters you would send in a [`create client secret`](/docs/api-reference/realtime-sessions/create-realtime-client-secret) request, i.e., ensure the realtime model, voice, tools, or instructions are set before bridging the call to the model.

```bash
curl -X POST "https://api.openai.com/v1/realtime/calls/$CALL_ID/accept" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
        "type": "realtime",
        "model": "gpt-realtime",
        "instructions": "You are Alex, a friendly concierge for Example Corp."
      }'
```

The request path must include the `call_id` from the [`realtime.call.incoming`](/docs/api-reference/webhook_events/realtime/call/incoming) webhook, and every request requires the `Authorization` header shown above. The endpoint returns `200 OK` once the SIP leg is ringing and the realtime session is being established.

## Reject the Call

Use the [Reject call endpoint](/docs/api-reference/realtime-calls/reject-call) to decline an invite when you do not want to handle the incoming call, (e.g., from an unsupported country code.) Supply the `call_id` path parameter and an optional SIP `status_code` (e.g., `486` to indicate "busy") in the JSON body to control the response sent back to the carrier.

```bash
curl -X POST "https://api.openai.com/v1/realtime/calls/$CALL_ID/reject" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"status_code": 486}'
```

If no status code is supplied the API uses `603 Decline` by default. A successful request responds with `200 OK` after OpenAI delivers the SIP response.

## Monitor Call Events

After you accept a call, open a WebSocket connection to the same session to stream events and issue realtime commands. Note that when connecting to an existing call using the `call_id` parameter, the `model` argument is not used (as it has already been configured via the `accept` endpoint).

### WebSocket Request

`GET wss://api.openai.com/v1/realtime?call_id={call_id}`

### Query Parameters

| Parameter | Type   | Description                                         |
| --------- | ------ | --------------------------------------------------- |
| call_id   | string | Identifier from the realtime.call.incoming webhook. |

### Headers

* `Authorization: Bearer YOUR_API_KEY`

The WebSocket behaves exactly like any other Realtime API connection. Send [`response.create`](/docs/api-reference/realtime_client_events/response/create), and other client events to control the call, and listen for server events to track progress. See [Webhooks and server-side controls](/docs/guides/realtime-server-controls) for more information.

```javascript
import WebSocket from "ws";

const callId = "rtc_u1_9c6574da8b8a41a18da9308f4ad974ce";
const ws = new WebSocket(`wss://api.openai.com/v1/realtime?call_id=${callId}`, {
    headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
});

ws.on("open", () => {
    ws.send(
        JSON.stringify({
            type: "response.create",
        })
    );
});
```

## Redirect the Call

Transfer an active call using the [Refer call endpoint](/docs/api-reference/realtime-calls/refer-call). Provide the `call_id` as well as the `target_uri` that should be placed in the SIP `Refer-To` header (for example `tel:+14155550123` or `sip:agent@example.com`).

```bash
curl -X POST "https://api.openai.com/v1/realtime/calls/$CALL_ID/refer" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"target_uri": "tel:+14155550123"}'
```

OpenAI returns `200 OK` once the REFER is relayed to your SIP provider. The downstream system handles the rest of the call flow for the caller.

## Hang Up the Call

End the session with the [Hang up endpoint](/docs/api-reference/realtime-calls/hangup-call) when your application should disconnect the caller. This endpoint can be used to terminate both SIP and WebRTC realtime sessions.

```bash
curl -X POST "https://api.openai.com/v1/realtime/calls/$CALL_ID/hangup" \\
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

The API responds with `200 OK` when it starts tearing down the call.

## Python Example

The following is an example of a `realtime.call.incoming` handler. It accepts the call and then logs all the events from the Realtime API.

```python
from flask import Flask, request, Response, jsonify, make_response
from openai import OpenAI, InvalidWebhookSignatureError
import asyncio
import json
import os
import requests
import time
import threading
import websockets

app = Flask(__name__)
client = OpenAI(
    webhook_secret=os.environ["OPENAI_WEBHOOK_SECRET"]
)

AUTH_HEADER = {
    "Authorization": "Bearer " + os.getenv("OPENAI_API_KEY")
}

call_accept = {
    "type": "realtime",
    "instructions": "You are a support agent.",
    "model": "gpt-realtime",
}

response_create = {
    "type": "response.create",
    "response": {
        "instructions": (
            "Say to the user 'Thank you for calling, how can I help you'"
        )
    },
}

async def websocket_task(call_id):
    try:
        async with websockets.connect(
            "wss://api.openai.com/v1/realtime?call_id=" + call_id,
            additional_headers=AUTH_HEADER,
        ) as websocket:
            await websocket.send(json.dumps(response_create))

            while True:
                response = await websocket.recv()
                print(f"Received from WebSocket: {response}")
    except Exception as e:
        print(f"WebSocket error: {e}")

@app.route("/", methods=["POST"])
def webhook():
    try:
        event = client.webhooks.unwrap(request.data, request.headers)

        if event.type == "realtime.call.incoming":
            requests.post(
                "https://api.openai.com/v1/realtime/calls/"
                + event.data.call_id
                + "/accept",
                headers={**AUTH_HEADER, "Content-Type": "application/json"},
                json=call_accept,
            )
            threading.Thread(
                target=lambda: asyncio.run(
                    websocket_task(event.data.call_id)
                ),
                daemon=True,
            ).start()
            return Response(status=200)
    except InvalidWebhookSignatureError as e:
        print("Invalid signature", e)
        return Response("Invalid signature", status=400)

if __name__ == "__main__":
    app.run(port=8000)
```

## Next Steps

Now that you've connected over SIP, use the left navigation or click into these pages to start building your realtime application.

* [Using realtime models](/docs/guides/realtime-models-prompting)
* [Managing conversations](/docs/guides/realtime-conversations)
* [Webhooks and server-side controls](/docs/guides/realtime-server-controls)
* [Realtime transcription](/docs/guides/realtime-transcription)

### Additional Resources

* [JavaScript demo](https://hello-realtime.val.run/)
* [Connect the Realtime SIP Connector to Twilio Elastic SIP Trunking](https://www.twilio.com/en-us/blog/developers/tutorials/product/openai-realtime-api-elastic-sip-trunking)

---

## Conclusion

This comprehensive guide covers all aspects of the OpenAI Realtime API, including:

* **Overview and Voice Agents**: Understanding the core concepts and recommended approaches
* **Connection Methods**: Three primary ways to connect (WebSocket, WebRTC, SIP)
* **Migration Guide**: Transitioning from Beta to GA
* **Implementation Examples**: Complete code samples for all connection types
* **Best Practices**: Tips for optimal performance and security

The Realtime API enables powerful speech-to-speech applications with low latency and multimodal capabilities. Choose the connection method that best fits your use case:

* **WebRTC** for client-side browser applications
* **WebSocket** for server-side applications
* **SIP** for telephony integrations

For additional resources and support, refer to the OpenAI documentation and community resources.
