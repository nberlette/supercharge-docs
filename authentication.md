# Authentication


## Introduction
Supercharge ships with pre-built authentication that you can use almost instantly. Add authentication to your application using Supercharge’s Craft CLI.

```info
**The fastest way adding authentication** to your application is using the Craft CLI. Run `node craft make:auth` in your fresh Supercharge application.

This scaffolds the necessary routes, route handlers, user model, authentication strategy, and web views. Restart your Supercharge server and visit `http://localhost:3000` to see all changes in effect!
```

Have a look at the authentication configuration located at `config/auth.js`. This file contains the documented authentication options which you can tweak to adjust the authentication handling.

Supercharge uses [hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie) to provide cookie-based authentication. The login route handler authenticates a user and creates a session. At this point, only authenticated users can have a session.

Authenticating users in Supercharge is built on “strategies”. An authentication strategy validates whether a request is authenticated or not. Imagine an authentication strategy as a middleware that authenticates a request (if possible/required).

Scaffolding the authentication with `node craft make:auth` creates the user model file `app/models/user.js`. The user model is a [Mongoose model](/docs/{{version}}/mongodb-preset#mongoose-orm). This predefined model is configured so that you can support authentication without additional configuration. If you want to change something, please go ahead and adjust the model.


## Authentication
Supercharges ships with an authentication system that is initially not part of your application. In your application, you can scaffold everything related to authentication using:

```bash
node craft make:auth
```

Supercharge won’t override any existing files when running the Craft command. You’ll be asked to confirm to override the files which you can deny and skip individual files from being overriden.

Running the authentication scaffolding in your Supercharge app creates files for sign-up, login, and logout:

- routes
- route handlers
- authentication strategy
- web views
- user model


### Routes


### Views
Running `node craft make:auth` will create HTML views in your application. All web view files will be placed in the `resources/views/auth` directory.


### Authenticating Users

#### Redirects

### Retrieve the Authenticated User

#### Is the Current User Authenticated


## Require Authentication on Routes
The default authentication configuration in `config/auth.js` tries to authenticate a user, but will proceed the request if authentication fails.

You certainly want routes to be only accessible by authenticated users and therefore require authentication.


### Authentication for all Routes


```js
default: {
  strategy: 'session',
  mode: 'required'
}
```


### Route-level Authentication


```js
module.exports = {
  method: 'GET',
  path: '/profile',
  config: {
    auth: {
      strategy: 'session',
      mode: 'required'
    },
    handler: (_, h) => h.view('user/profile')
  }
}
```


### Throttle Logins
Supercharge doesn’t protect your login against brute-force attacks by default. We created a Redis-based rate limiter to prevent such attacks.

At this point, you need to manually [add rate-limiting to your application](/docs/{{version}}/rate-limiting) and protect the login route.
