# CSRF Protection


## Introduction
Supercharge has support for [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) (CSRF) protection. A cross-site request forgery is a malicious exploit where unauthorized commands are transmitted on behalf of an authenticated user.

Supercharge ships with CSRF protection out-of-the-box. It generates a “CSRF token” for active user sessions. Supercharge will verify the CSRF token for `POST`, `PUT`, `PATCH`, and `DELETE` requests to your application.

Supercharge provides you a Handlebars helper to seamlessly add the CSRF token to your forms. Make use of the `{{csrf}}` helper inside your HTML forms. This helper generates and adds a hidden input field to your form. Use the helper like this:

```html
<form method="POST" action="/login">
  {{csrf}}

  …
</form>
```

Supercharge uses the [crumb](https://github.com/hapijs/crumb) plugin to verify the CSRF token. Crumb checks incoming requests whether they contain a CSRF token based on the HTTP method.

In case the HTTP method matches `POST`, `PUT`, `PATCH`, or `DELETE`, the CSRF token must be present. If it doesn’t contain a CSRF token, requests will fail with an `403 Forbidden` error.

```warning
Supercharge won’t automatically disable CSRF protection when running tests.
```


## Exclude Routes from CSRF Protection
At some point, you may want to exclude URIs from CSRF protection. Common use cases are external platforms calling your application via webhooks.

For example, if you’re integrating payment processing via [Braintree](https://www.braintreegateway.com/) you may wish to disable CSRF protection for the related routes. Braintree won’t have a valid CSRF token to send along with the request.


### Disable the Crumb Plugin on Routes
You can disable individual plugins on routes via the `plugins` object. Because Supercharge relies on the crumb plugin to handle CSRF protection, you should set `crumb: false` on the route where you want to disable it.

Here’s a sample route for a Braintree webhook with disabled `crumb` plugin:

```js
module.exports = {
  method: 'POST',
  path: '/webhooks/braintree',
  config: {
    plugins: {
      crumb: false
    },
    handler: async (request, h) => {
      // process webhook
    }
  }
}
```

Notice that the configuration disables CSRF verification for this single route. If you want to disable CSRF verification on another route, you need to configure it separately.


### Use Crumb’s Skip Function
Another way to skip CSRF verification is the plugins `skip` function. Navigate your IDE or editor to the `verify-csrf-token` plugin in `app/plugins` and add this option. The `skip` function has the `asyc (request, h)` signature.

To skip CSRF verification, return `true` from the skip function, `false` otherwise. The following example will skip CSRF protection for all routes having a URI that includes “/webhooks”:

```js
module.exports = {
  plugin: require('crumb'),
  options: {
    skip: async (request, h) => {
      return request.path.includes('/webhooks')
    }
  }
}
```


## X-CSRF-Token for Restful Routes
Sometimes you want to send the CSRF token in a request header instead of the request payload. To achieve this, you need to configure crumb to use a restful configuration and then send the CSRF token along in the request headers.

First, you need to configure the crumb plugin or individual routes to fetch the CSRF token from the request headers:

```js
module.exports = {
  method: 'PUT',
  path: '/profile',
  config: {
    plugins: {
      crumb: {
        restful: true // this requires the 'X-CSRF-Token' request header
      }
    },
    handler: async (request, h) => {
      // update profile
    }
  }
}
```
