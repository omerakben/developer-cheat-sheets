# OpenAI GPT Actions - Complete Documentation Guide

## Table of Contents

1. [GPT Actions Overview](#gpt-actions-overview)
2. [How GPT Actions Work](#how-gpt-actions-work)
3. [Getting Started with GPT Actions](#getting-started-with-gpt-actions)
4. [Data Retrieval with GPT Actions](#data-retrieval-with-gpt-actions)
5. [GPT Action Authentication](#gpt-action-authentication)
6. [GPT Actions Library](#gpt-actions-library)
7. [Production Notes on GPT Actions](#production-notes-on-gpt-actions)
8. [Sending and Returning Files](#sending-and-returning-files-with-gpt-actions)

---

# GPT Actions Overview

Customize ChatGPT with GPT Actions and API integrations.

GPT Actions are stored in [Custom GPTs](https://openai.com/blog/introducing-gpts), which enable users to customize ChatGPT for specific use cases by providing instructions, attaching documents as knowledge, and connecting to 3rd party services.

GPT Actions empower ChatGPT users to interact with external applications via RESTful APIs calls outside of ChatGPT simply by using natural language. They convert natural language text into the json schema required for an API call. GPT Actions are usually either used to do [data retrieval](https://platform.openai.com/docs/actions/data-retrieval) to ChatGPT (e.g. query a Data Warehouse) or take action in another application (e.g. file a JIRA ticket).

## How GPT Actions Work

At their core, GPT Actions leverage [Function Calling](https://platform.openai.com/docs/guides/function-calling) to execute API calls.

Similar to ChatGPT's Data Analysis capability (which generates Python code and then executes it), they leverage Function Calling to (1) decide which API call is relevant to the user's question and (2) generate the json input necessary for the API call. Then finally, the GPT Action executes the API call using that json input.

Developers can even specify the authentication mechanism of an action, and the Custom GPT will execute the API call using the third party app's authentication. GPT Actions obfuscates the complexity of the API call to the end user: they simply ask a question in natural language, and ChatGPT provides the output in natural language as well.

## The Power of GPT Actions

APIs allow for **interoperability** to enable your organization to access other applications. However, enabling users to access the right information from 3rd-party APIs can require significant overhead from developers.

GPT Actions provide a viable alternative: developers can now simply describe the schema of an API call, configure authentication, and add in some instructions to the GPT, and ChatGPT provides the bridge between the user's natural language questions and the API layer.

## Simplified Example

The [getting started guide](https://platform.openai.com/docs/actions/getting-started) walks through an example using two API calls from weather.gov to generate a forecast:

* `/points/{latitude},{longitude}` inputs lat-long coordinates and outputs forecast office (wfo) and x-y coordinates
* `/gridpoints/{office}/{gridX},{gridY}/forecast` inputs wfo,x,y coordinates and outputs a forecast

Once a developer has encoded the json schema required to populate both of those API calls in a GPT Action, a user can simply ask "What I should pack on a trip to Washington DC this weekend?" The GPT Action will then figure out the lat-long of that location, execute both API calls in order, and respond with a packing list based on the weekend forecast it receives back.

In this example, GPT Actions will supply api.weather.gov with two API inputs:

**`/points` API call:**

```json
{
  "latitude": 38.9072,
  "longitude": -77.0369
}
```

**`/forecast` API call:**

```json
{
  "wfo": "LWX",
  "x": 97,
  "y": 71
}
```

## Get Started on Building

Check out the [getting started guide](https://platform.openai.com/docs/actions/getting-started) for a deeper dive on this weather example and our [actions library](https://platform.openai.com/docs/actions/actions-library) for pre-built example GPT Actions of the most common 3rd party apps.

## Additional Information

* Familiarize yourself with our [GPT policies](https://openai.com/policies/usage-policies#:~:text=or%20educational%20purposes.-,Building%20with%20ChatGPT,-Shared%20GPTs%20allow)
* Check out the [GPT data privacy FAQs](https://help.openai.com/en/articles/8554402-gpts-data-privacy-faqs)
* Find answers to [common GPT questions](https://help.openai.com/en/articles/8554407-gpts-faq)

---

# Getting Started with GPT Actions

Set up and test GPT Actions from scratch.

## Weather.gov Example

The NSW (National Weather Service) maintains a [public API](https://www.weather.gov/documentation/services-web-api) that users can query to receive a weather forecast for any lat-long point. To retrieve a forecast, there's 2 steps:

1. A user provides a lat-long to the api.weather.gov/points API and receives back a WFO (weather forecast office), grid-X, and grid-Y coordinates
2. Those 3 elements feed into the api.weather.gov/forecast API to retrieve a forecast for that coordinate

For the purpose of this exercise, let's build a Custom GPT where a user writes a city, landmark, or lat-long coordinates, and the Custom GPT answers questions about a weather forecast in that location.

## Step 1: Write and Test Open API Schema (using Actions GPT)

A GPT Action requires an [Open API schema](https://swagger.io/specification/) to describe the parameters of the API call, which is a standard for describing APIs.

OpenAI released a public [Actions GPT](https://chatgpt.com/g/g-TYEliDU6A-actionsgpt) to help developers write this schema. For example, go to the Actions GPT and ask: *"Go to [https://www.weather.gov/documentation/services-web-api](https://www.weather.gov/documentation/services-web-api) and read the documentation on that page. Build an Open API Schema for the /points/{latitude},{longitude} and /gridpoints/{office}/{gridX},{gridY}/forecast" API calls"*

### Deep Dive - Complete Open API Schema

ChatGPT uses the **info** at the top (including the description in particular) to determine if this action is relevant for the user query.

```yaml
info:
  title: NWS Weather API
  description: Access to weather data including forecasts, alerts, and observations.
  version: 1.0.0
```

Then the **parameters** below further define each part of the schema. For example, we're informing ChatGPT that the *office* parameter refers to the Weather Forecast Office (WFO).

```yaml
/gridpoints/{office}/{gridX},{gridY}/forecast:
  get:
    operationId: getGridpointForecast
    summary: Get forecast for a given grid point
    parameters:
      - name: office
        in: path
        required: true
        schema:
          type: string
          description: Weather Forecast Office ID
```

**Key:** Pay special attention to the **schema names** and **descriptions** that you use in this Open API schema. ChatGPT uses those names and descriptions to understand (a) which API action should be called and (b) which parameter should be used. If a field is restricted to only certain values, you can also provide an "enum" with descriptive category names.

While you can just try the Open API schema directly in a GPT Action, debugging directly in ChatGPT can be a challenge. We recommend using a 3rd party service, like [Postman](https://www.postman.com/), to test that your API call is working properly. Postman is free to sign up, verbose in its error-handling, and comprehensive in its authentication options. It even gives you the option of importing Open API schemas directly.

## Step 2: Identify Authentication Requirements

This Weather 3rd party service does not require authentication, so you can skip that step for this Custom GPT. For other GPT Actions that do require authentication, there are 2 options: API Key or OAuth. Asking ChatGPT can help you get started for most common applications. For example, if I needed to use OAuth to authenticate to Google Cloud, I can provide a screenshot and ask for details: *"I'm building a connection to Google Cloud via OAuth. Please provide instructions for how to fill out each of these boxes."*

Often, ChatGPT provides the correct directions on all 5 elements. Once you have those basics ready, try testing and debugging the authentication in Postman or another similar service. If you encounter an error, provide the error to ChatGPT, and it can usually help you debug from there.

## Step 3: Create the GPT Action and Test

Now is the time to create your Custom GPT. If you've never created a Custom GPT before, start at our [Creating a GPT guide](https://help.openai.com/en/articles/8554397-creating-a-gpt).

1. Provide a name, description, and image to describe your Custom GPT
2. Go to the Action section and paste in your Open API schema. Take a note of the Action names and json parameters when writing your instructions.
3. Add in your authentication settings
4. Go back to the main page and add in instructions

### Guidance on Writing Instructions

Your instructions should clearly explain:

* What the GPT does and its purpose
* How it should use the available actions
* Any specific behavior or formatting requirements
* Examples of good user queries

### Test the GPT Action

Next to each action, you'll see a **Test** button. Click on that for each action. In the test, you can see the detailed input and output of each API call.

If your API call is working in a 3rd party tool like Postman and not in ChatGPT, there are a few possible culprits:

* The parameters in ChatGPT are wrong or missing
* An authentication issue in ChatGPT
* Your instructions are incomplete or unclear
* The descriptions in the Open API schema are unclear

## Step 4: Set Up Callback URL in the 3rd Party App

If your GPT Action uses OAuth Authentication, you'll need to set up the callback URL in your 3rd party application. Once you set up a GPT Action with OAuth, ChatGPT provides you with a callback URL (this will update any time you update one of the OAuth parameters). Copy that callback URL and add it to the appropriate place in your application.

## Step 5: Evaluate the Custom GPT

Even though you tested the GPT Action in the step above, you still need to evaluate if the Instructions and GPT Action function in the way users expect. Try to come up with at least 5-10 representative questions (the more, the better) of an **"evaluation set"** of questions to ask your Custom GPT.

**Key:** Test that the Custom GPT handles each one of your questions as you expect.

An example question: *"What should I pack for a trip to the White House this weekend?"* tests the Custom GPT's ability to: (1) convert a landmark to a lat-long, (2) run both GPT Actions, and (3) answer the user's question.

## Common Debugging Steps

**Challenge:** The GPT Action is calling the wrong API call (or not calling it at all)

* **Solution:** Make sure the descriptions of the Actions are clear - and refer to the Action names in your Custom GPT Instructions

**Challenge:** The GPT Action is calling the right API call but not using the parameters correctly

* **Solution:** Add or modify the descriptions of the parameters in the GPT Action

**Challenge:** The Custom GPT is not working but I am not getting a clear error

* **Solution:** Make sure to test the Action - there are more robust logs in the test window. If that is still unclear, use Postman or another 3rd party service to better diagnose.

**Challenge:** The Custom GPT is giving an authentication error

* **Solution:** Make sure your callback URL is set up correctly. Try testing the exact same authentication settings in Postman or another 3rd party service

**Challenge:** The Custom GPT cannot handle more difficult / ambiguous questions

* **Solution:** Try to prompt engineer your instructions in the Custom GPT. See examples in our [prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)

This concludes the guide to building a Custom GPT. Good luck building and leveraging the [OpenAI developer forum](https://community.openai.com/) if you have additional questions.

---

# Data Retrieval with GPT Actions

Retrieve data using APIs and databases with GPT Actions.

One of the most common tasks an action in a GPT can perform is data retrieval. An action might:

1. Access an API to retrieve data based on a keyword search
2. Access a relational database to retrieve records based on a structured query
3. Access a vector database to retrieve text chunks based on semantic search

We'll explore considerations specific to the various types of retrieval integrations in this guide.

## Data Retrieval Using APIs

Many organizations rely on 3rd party software to store important data. Think Salesforce for customer data, Zendesk for support data, Confluence for internal process data, and Google Drive for business documents. These providers often provide REST APIs which enable external systems to search for and retrieve information.

When building an action to integrate with a provider's REST API, start by reviewing the existing documentation. You'll need to confirm a few things:

### 1. Retrieval Methods

* **Search** - Each provider will support different search semantics, but generally you want a method which takes a keyword or query string and returns a list of matching documents. See [Google Drive's `file.list` method](https://developers.google.com/drive/api/guides/search-files) for an example.

* **Get** - Once you've found matching documents, you need a way to retrieve them. See [Google Drive's `file.get` method](https://developers.google.com/drive/api/reference/rest/v3/files/get) for an example.

### 2. Authentication Scheme

* For example, [Google Drive uses OAuth](https://developers.google.com/workspace/guides/configure-oauth-consent) to authenticate users and ensure that only their available files are available for retrieval.

### 3. OpenAPI Spec

* Some providers will provide an OpenAPI spec document which you can import directly into your action. See [Zendesk](https://developer.zendesk.com/api-reference/ticketing/introduction/#download-openapi-file), for an example.

* You may want to remove references to methods your GPT *won't* access, which constrains the actions your GPT can perform.

* For providers who *don't* provide an OpenAPI spec document, you can create your own using the [ActionsGPT](https://chatgpt.com/g/g-TYEliDU6A-actionsgpt) (a GPT developed by OpenAI).

Your goal is to get the GPT to use the action to search for and retrieve documents containing context which are relevant to the user's prompt. Your GPT follows your instructions to use the provided search and get methods to achieve this goal.

## Data Retrieval Using Relational Databases

Organizations use relational databases to store a variety of records pertaining to their business. These records can contain useful context that will help improve your GPT's responses. For example, let's say you are building a GPT to help users understand the status of an insurance claim. If the GPT can look up claims in a relational database based on a claims number, the GPT will be much more useful to the user.

When building an action to integrate with a relational database, there are a few things to keep in mind:

### 1. Availability of REST APIs

* Many relational databases do not natively expose a REST API for processing queries. In that case, you may need to build or buy middleware which can sit between your GPT and the database.

* This middleware should do the following:
  * Accept a formal query string
  * Pass the query string to the database
  * Respond back to the requester with the returned records

### 2. Accessibility from the Public Internet

* Unlike APIs which are designed to be accessed from the public internet, relational databases are traditionally designed to be used within an organization's application infrastructure. Because GPTs are hosted on OpenAI's infrastructure, you'll need to make sure that any APIs you expose are accessible outside of your firewall.

### 3. Complex Query Strings

* Relational databases uses formal query syntax like SQL to retrieve relevant records. This means that you need to provide additional instructions to the GPT indicating which query syntax is supported. The good news is that GPTs are usually very good at generating formal queries based on user input.

### 4. Database Permissions

* Although databases support user-level permissions, it is likely that your end users won't have permission to access the database directly. If you opt to use a service account to provide access, consider giving the service account read-only permissions. This can avoid inadvertently overwriting or deleting existing data.

Your goal is to get the GPT to write a formal query related to the user's prompt, submit the query via the action, and then use the returned records to augment the response.

## Data Retrieval Using Vector Databases

If you want to equip your GPT with the most relevant search results, you might consider integrating your GPT with a vector database which supports semantic search as described above. There are many managed and self hosted solutions available on the market, [see here for a partial list](https://github.com/openai/chatgpt-retrieval-plugin#choosing-a-vector-database).

When building an action to integrate with a vector database, there are a few things to keep in mind:

### 1. Availability of REST APIs

* Many vector databases do not natively expose a REST API for processing queries. In that case, you may need to build or buy middleware which can sit between your GPT and the database.

### 2. Accessibility from the Public Internet

* Unlike APIs which are designed to be accessed from the public internet, vector databases are traditionally designed to be used within an organization's application infrastructure. Because GPTs are hosted on OpenAI's infrastructure, you'll need to make sure that any APIs you expose are accessible outside of your firewall.

### 3. Query Embedding

* As discussed above, vector databases typically accept a vector embedding (as opposed to plain text) as query input. This means that you need to use an embedding API to convert the query input into a vector embedding before you can submit it to the vector database. This conversion is best handled in the REST API gateway, so that the GPT can submit a plaintext query string.

### 4. Database Permissions

* Because vector databases store text chunks as opposed to full documents, it can be difficult to maintain user permissions which might have existed on the original source documents. Remember that any user who can access your GPT will have access to all of the text chunks in the database and plan accordingly.

### Middleware for Vector Databases

As described above, middleware for vector databases typically needs to do two things:

1. Expose access to the vector database via a REST API
2. Convert plaintext query strings into vector embeddings

![Middleware for vector databases](https://cdn.openai.com/API/docs/images/actions-db-diagram.webp)

The goal is to get your GPT to submit a relevant query to a vector database to trigger a semantic search, and then use the returned text chunks to augment the response.

---

# GPT Action Authentication

Learn authentication options for GPT Actions.

Actions offer different authentication schemas to accommodate various use cases. To specify the authentication schema for your action, use the GPT editor and select "None", "API Key", or "OAuth".

By default, the authentication method for all actions is set to "None", but you can change this and allow different actions to have different authentication methods.

## No Authentication

We support flows without authentication for applications where users can send requests directly to your API without needing an API key or signing in with OAuth.

Consider using no authentication for initial user interactions as you might experience a user drop off if they are forced to sign into an application. You can create a "signed out" experience and then move users to a "signed in" experience by enabling a separate action.

## API Key Authentication

Just like how a user might already be using your API, we allow API key authentication through the GPT editor UI. We encrypt the secret key when we store it in our database to keep your API key secure.

This approach is useful if you have an API that takes slightly more consequential actions than the no authentication flow but does not require an individual user to sign in. Adding API key authentication can protect your API and give you more fine-grained access controls along with visibility into where requests are coming from.

## OAuth

Actions allow OAuth sign in for each user. This is the best way to provide personalized experiences and make the most powerful actions available to users. A simple example of the OAuth flow with actions will look like the following:

* To start, select "Authentication" in the GPT editor UI, and select "OAuth".

* You will be prompted to enter the OAuth client ID, client secret, authorization URL, token URL, and scope.

* The client ID and secret can be simple text strings but should [follow OAuth best practices](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/).

* We store an encrypted version of the client secret, while the client ID is available to end users.

* OAuth requests will include the following information:

```json
{
  "grant_type": "authorization_code",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "code": "abc123",
  "redirect_uri": "https://chat.openai.com/aip/{g-YOUR-GPT-ID-HERE}/oauth/callback"
}
```

Note: `https://chatgpt.com/aip/{g-YOUR-GPT-ID-HERE}/oauth/callback` is also valid.

* In order for someone to use an action with OAuth, they will need to send a message that invokes the action and then the user will be presented with a "Sign in to [domain]" button in the ChatGPT UI.

* The `authorization_url` endpoint should return a response that looks like:

```json
{
  "access_token": "example_token",
  "token_type": "bearer",
  "refresh_token": "example_token",
  "expires_in": 59
}
```

* During the user sign in process, ChatGPT makes a request to your `authorization_url` using the specified `authorization_content_type`, we expect to get back an access token and optionally a [refresh token](https://auth0.com/learn/refresh-tokens) which we use to periodically fetch a new access token.

* Each time a user makes a request to the action, the user's token will be passed in the Authorization header: ("Authorization": "[Bearer/Basic] [user's token]").

* We require that OAuth applications make use of the [state parameter](https://auth0.com/docs/secure/attack-protection/state-parameters#set-and-compare-state-parameter-values) for security reasons.

### Failure to Login Issues on Custom GPTs (Redirect URLs)?

* Be sure to enable this redirect URL in your OAuth application:

* **#1 Redirect URL:** `https://chat.openai.com/aip/{g-YOUR-GPT-ID-HERE}/oauth/callback` (Different domain possible for some clients)

* **#2 Redirect URL:** `https://chatgpt.com/aip/{g-YOUR-GPT-ID-HERE}/oauth/callback` (Get your GPT ID in the URL bar of the ChatGPT UI once you save) if you have several GPTs you'd need to enable for each or a wildcard depending on risk tolerance.

* **Debug Note:** Your Auth Provider will typically log failures (e.g. 'redirect\_uri is not registered for client'), which helps debug login issues as well.

---

# GPT Actions Library

Build and integrate GPT Actions for common applications.

## Purpose

While GPT Actions should be significantly less work for an API developer to set up than an entire application using those APIs from scratch, there's still some set up required to get GPT Actions up and running. A Library of GPT Actions is meant to provide guidance for building GPT Actions on common applications.

## Getting Started

If you've never built an action before, start by reading the [getting started guide](https://platform.openai.com/docs/actions/getting-started) first to understand better how actions work.

Generally, this guide is meant for people with familiarity and comfort with calling API calls. For debugging help, try to explain your issues to ChatGPT - and include screenshots.

## How to Access

[The OpenAI Cookbook](https://cookbook.openai.com/) has a [directory](https://cookbook.openai.com/topic/chatgpt) of 3rd party applications and middleware application.

### 3rd Party Actions Cookbook

GPT Actions can integrate with HTTP services directly. GPT Actions leveraging SaaS API directly will authenticate and request resources directly from SaaS providers, such as [Google Drive](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_action_google_drive) or [Snowflake](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_action_snowflake_direct).

### Middleware Actions Cookbook

GPT Actions can benefit from having a middleware. It allows pre-processing, data formatting, data filtering or even connection to endpoints not exposed through HTTP (e.g: databases). Multiple middleware cookbooks are available describing an example implementation path, such as [Azure](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_middleware_azure_function), [GCP](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_middleware_google_cloud_function) and [AWS](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_middleware_aws_function).

## Give Us Feedback

Are there integrations that you'd like us to prioritize? Are there errors in our integrations? File a PR or issue on the cookbook page's github, and we'll take a look.

## Contribute to Our Library

If you're interested in contributing to our library, please follow the below guidelines, then submit a PR in github for us to review. In general, follow the template similar to [this example GPT Action](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_action_bigquery).

### Guidelines - Include the Following Sections

* **Application Information** - describe the 3rd party application, and include a link to app website and API docs

* **Custom GPT Instructions** - include the exact instructions to be included in a Custom GPT

* **OpenAPI Schema** - include the exact OpenAPI schema to be included in the GPT Action

* **Authentication Instructions** - for OAuth, include the exact set of items (authorization URL, token URL, scope, etc.); also include instructions on how to write the callback URL in the application (as well as any other steps)

* **FAQ and Troubleshooting** - what are common pitfalls that users may encounter? Write them here and workarounds

## Disclaimers

This action library is meant to be a guide for interacting with 3rd parties that OpenAI have no control over. These 3rd parties may change their API settings or configurations, and OpenAI cannot guarantee these Actions will work in perpetuity. Please see them as a starting point.

This guide is meant for developers and people with comfort writing API calls. Non-technical users will likely find these steps challenging.

---

# Production Notes on GPT Actions

Deploy GPT Actions in production with best practices.

## Rate Limits

Consider implementing rate limiting on the API endpoints you expose. ChatGPT will respect 429 response codes and dynamically back off from sending requests to your action after receiving a certain number of 429's or 500's in a short period of time.

## Timeouts

When making API calls during the actions experience, timeouts take place if the following thresholds are exceeded:

* 45 seconds round trip for API calls

## Use TLS and HTTPS

All traffic to your action must use TLS 1.2 or later on port 443 with a valid public certificate.

## IP Egress Ranges

ChatGPT will call your action from an IP address from one of the [CIDR blocks](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) listed in [chatgpt-actions.json](https://openai.com/chatgpt-actions.json)

You may wish to explicitly allowlist these IP addresses. This list is updated automatically periodically.

## Multiple Authentication Schemas

When defining an action, you can mix a single authentication type (OAuth or API key) along with endpoints that do not require authentication.

You can learn more about action authentication on our [actions authentication page](/docs/actions/authentication).

## OpenAPI Specification Limits

Keep in mind the following limits in your OpenAPI specification, which are subject to change:

* 300 characters max for each API endpoint description/summary field in API specification
* 700 characters max for each API parameter description field in API specification

## Additional Limitations

There are a few limitations to be aware of when building with actions:

* Custom headers are not supported
* With the exception of Google, Microsoft and Adobe OAuth domains, all domains used in an OAuth flow must be the same as the domain used for the primary endpoints
* Request and response payloads must be less than 100,000 characters each
* Requests timeout after 45 seconds
* Requests and responses can only contain text (no images or video)

## Consequential Flag

In the OpenAPI specification, you can now set certain endpoints as "consequential" as shown below:

```yaml
paths:
  /todo:
    get:
      operationId: getTODOs
      description: Fetches items in a TODO list from the API.
      security: []
    post:
      operationId: updateTODOs
      description: Mutates the TODO list.
      x-openai-isConsequential: true
```

A good example of a consequential action is booking a hotel room and paying for it on behalf of a user.

* If the `x-openai-isConsequential` field is `true`, ChatGPT treats the operation as "must always prompt the user for confirmation before running" and don't show an "always allow" button (both are features of GPTs designed to give builders and users more control over actions).

* If the `x-openai-isConsequential` field is `false`, ChatGPT shows the "always allow button".

* If the field isn't present, ChatGPT defaults all GET operations to `false` and all other operations to `true`

## Best Practices on Feeding Examples

Here are some best practices to follow when writing your GPT instructions and descriptions in your schema, as well as when designing your API responses:

### 1. Appropriate Usage Descriptions

Your descriptions should not encourage the GPT to use the action when the user hasn't asked for your action's particular category of service.

**Bad example:**
> Whenever the user mentions any type of task, ask if they would like to use the TODO action to add something to their todo list.

**Good example:**
> The TODO list can add, remove and view the user's TODOs.

### 2. Avoid Prescriptive Triggers

Your descriptions should not prescribe specific triggers for the GPT to use the action. ChatGPT is designed to use your action automatically when appropriate.

**Bad example:**
> When the user mentions a task, respond with "Would you like me to add this to your TODO list? Say 'yes' to continue."

**Good example:**
> [no instructions needed for this]

### 3. Return Raw Data

Action responses from an API should return raw data instead of natural language responses unless it's necessary. The GPT will provide its own natural language response using the returned data.

**Bad example:**
> I was able to find your todo list! You have 2 todos: get groceries and walk the dog. I can add more todos if you'd like!

**Good example:**

```json
{
  "todos": [
    "get groceries",
    "walk the dog"
  ]
}
```

## How GPT Action Data is Used

GPT Actions connect ChatGPT to external apps. If a user interacts with a GPT's custom action, ChatGPT may send parts of their conversation to the action's endpoint.

If you have questions or run into additional limitations, you can join the discussion on the [OpenAI developer forum](https://community.openai.com).

---

# Sending and Returning Files with GPT Actions

## Sending Files

POST requests can include up to ten files (including DALL-E generated images) from the conversation. They will be sent as URLs which are valid for five minutes.

For files to be part of your POST request, the parameter must be named `openaiFileIdRefs` and the description should explain to the model the type and quantity of the files which your API is expecting.

The `openaiFileIdRefs` parameter will be populated with an array of JSON objects. Each object contains:

* `name` The name of the file. This will be an auto generated name when created by DALL-E.
* `id` A stable identifier for the file.
* `mime_type` The mime type of the file. For user uploaded files this is based on file extension.
* `download_link` The URL to fetch the file which is valid for five minutes.

Here's an example of an `openaiFileIdRefs` array with two elements:

```json
[
  {
    "name": "dalle-Lh2tg7WuosbyR9hk",
    "id": "file-XFlOqJYTPBPwMZE3IopCBv1Z",
    "mime_type": "image/webp",
    "download_link": "https://files.oaiusercontent.com/file-XFlOqJYTPBPwMZE3IopCBv1Z?se=2024-03-11T20%3A29%3A52Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Da580bae6-ea30-478e-a3e2-1f6c06c3e02f.webp&sig=ZPWol5eXACxU1O9azLwRNgKVidCe%2BwgMOc/TdrPGYII%3D"
  },
  {
    "name": "2023 Benefits Booklet.pdf",
    "id": "file-s5nX7o4junn2ig0J84r8Q0Ew",
    "mime_type": "application/pdf",
    "download_link": "https://files.oaiusercontent.com/file-s5nX7o4junn2ig0J84r8Q0Ew?se=2024-03-11T20%3A29%3A52Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D299%2C%20immutable&rscd=attachment%3B%20filename%3D2023%2520Benefits%2520Booklet.pdf&sig=Ivhviy%2BrgoyUjxZ%2BingpwtUwsA4%2BWaRfXy8ru9AfcII%3D"
  }
]
```

Actions can include files uploaded by the user, images generated by DALL-E, and files created by Code Interpreter.

### OpenAPI Example

```yaml
/createWidget:
  post:
    operationId: createWidget
    summary: Creates a widget based on an image.
    description: Uploads a file reference using its file id. This file should be an image created by DALL·E or uploaded by the user. JPG, WEBP, and PNG are supported for widget creation.
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              openaiFileIdRefs:
                type: array
                items:
                  type: string
```

While this schema shows `openaiFileIdRefs` as being an array of type `string`, at runtime this will be populated with an array of JSON objects as previously shown.

## Returning Files

Requests may return up to 10 files. Each file may be up to 10 MB and cannot be an image or video.

These files will become part of the conversation similarly to if a user uploaded them, meaning they may be made available to code interpreter, file search, and sent as part of subsequent action invocations. In the web app users will see that the files have been returned and can download them.

To return files, the body of the response must contain an `openaiFileResponse` parameter. This parameter must always be an array and must be populated in one of two ways.

### Inline Option

Each element of the array is a JSON object which contains:

* `name` The name of the file. This will be visible to the user.
* `mime_type` The MIME type of the file. This is used to determine eligibility and which features have access to the file.
* `content` The base64 encoded contents of the file.

Here's an example of an openaiFileResponse array with two elements:

```json
[
  {
    "name": "example_document.pdf",
    "mime_type": "application/pdf",
    "content": "JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PC9MZW5ndGggNiAwIFIvRmlsdGVyIC9GbGF0ZURlY29kZT4+CnN0cmVhbQpHhD93PQplbmRzdHJlYW0KZW5kb2JqCg=="
  },
  {
    "name": "sample_spreadsheet.csv",
    "mime_type": "text/csv",
    "content": "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
  }
]
```

**OpenAPI Example:**

```yaml
/papers:
  get:
    operationId: findPapers
    summary: Retrieve PDFs of relevant academic papers.
    description: Provided an academic topic, up to five relevant papers will be returned as PDFs.
    parameters:
      - in: query
        name: topic
        required: true
        schema:
          type: string
          description: The topic the papers should be about.
    responses:
      '200':
        description: Zero to five academic paper PDFs
        content:
          application/json:
            schema:
              type: object
              properties:
                openaiFileResponse:
                  type: array
                  items:
                    type: object
                    properties:
                      name:
                        type: string
                        description: The name of the file.
                      mime_type:
                        type: string
                        description: The MIME type of the file.
                      content:
                        type: string
                        format: byte
                        description: The content of the file in base64 encoding.
```

### URL Option

Each element of the array is a URL referencing a file to be downloaded. The headers `Content-Disposition` and `Content-Type` must be set such that a file name and MIME type can be determined. The name of the file will be visible to the user. The MIME type of the file determines eligibility and which features have access to the file.

There is a 10 second timeout for fetching each file.

Here's an example of an `openaiFileResponse` array with two elements:

```json
[
  "https://example.com/f/dca89f18-16d4-4a65-8ea2-ededced01646",
  "https://example.com/f/01fad6b0-635b-4803-a583-0f678b2e6153"
]
```

Here's an example of the required headers for each URL:

```text
Content-Type: application/pdf
Content-Disposition: attachment; filename="example_document.pdf"
```

**OpenAPI Example:**

```yaml
/papers:
  get:
    operationId: findPapers
    summary: Retrieve PDFs of relevant academic papers.
    description: Provided an academic topic, up to five relevant papers will be returned as PDFs.
    parameters:
      - in: query
        name: topic
        required: true
        schema:
          type: string
          description: The topic the papers should be about.
    responses:
      '200':
        description: Zero to five academic paper PDFs
        content:
          application/json:
            schema:
              type: object
              properties:
                openaiFileResponse:
                  type: array
                  items:
                    type: string
                    format: uri
                    description: URLs to fetch the files.
```

---

## Conclusion

This comprehensive guide covers all aspects of GPT Actions, providing developers with the knowledge needed to build powerful integrations between ChatGPT and external services. From basic setup to production deployment, this documentation serves as a complete reference for:

* **Understanding GPT Actions**: Core concepts and how they work
* **Getting Started**: Step-by-step tutorial with practical examples
* **Data Integration**: Working with APIs, databases, and vector stores
* **Authentication**: Implementing secure connections
* **Production Deployment**: Best practices and limitations
* **File Handling**: Advanced features for file processing

GPT Actions bridge the gap between natural language conversations and powerful API integrations, enabling users to accomplish complex tasks through simple conversational interfaces.

For additional support and community discussions, visit the [OpenAI Developer Forum](https://community.openai.com/).
