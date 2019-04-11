# Request Lifecycle


## Introduction
Starting a Supercharge application via the `server.js` file serves an HTTP server. This HTTP server handles web requests. Each HTTP request to your application goes through a pre-defined lifecycle.

It's important to understand the request lifecycle. Supercharge uses the [hapi](https://hapijs.com) Node.js framework as it's HTTP layer. A benefit of using hapi: the granular request lifecycle with extension points at various lifecycle steps.

At this point, only the Supercharge HTTP server supports a request lifecycle. Craft CLI commands don't have a request lifecycle.


## Lifecycle Extension Points
Supercharge supports the following request lifecycle:

- `onRequest`:
- `onPreAuth`:
- `onCredentials`:
- `onPostAuth`:
- `onPreHandler`:
- `onPostHandler`:
- `onPreResponse`:

Text

- `onPreStart`:
- `onPostStart`:
- `onPreStop`:
- `onPostStop`:


## Request Lifecycle Cheat Sheet
Text


## Extend the Request Lifecycle
You can intercept the request lifecycle at each of the mentioned extension points.


## Request vs. Application Lifecycle
What's the difference?

[application lifecycle](/docs/{{version}}/app-lifecycle)

