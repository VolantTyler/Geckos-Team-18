# Geckos-Team-18: Shift-Logger

## Purpose

ShiftJogger is a work-log and invoice-tracking web app, providing users with the ability to create, edit, and send invoices via Sendgrid's email service.

Our objective was to create a React app, using Next.js and Redux, complete with a custom back end to handle user registration, logins, session authentication, as well as various POST/GET/DELETE requests.

## Usage

To start, you'll need an mLab API key, as well as a custom `secret` key. For development, these should go in the root directory's `config` folder in a file named `keys_dev.js`. Note that the `secret` key is entirely up to you and is only used for session authentication within and for use with ShiftJogger itself. Since we utilized Sendgrid, development keys for that service should also go here. The file structure may look like:

```
module.exports = {
  mongoURL:
    "mongodb://<mLab_KEY_HERE>",
    secretOrKey: "<SECRET_KEY_HERE>",
    SENDGRID_API_KEY: "<SENDGRID_API_KEY_HERE"
};
```

In production, if you utilize Heroku (we do), these will go under the app's Settings `process.env` vars, with the keys and values matching those used in development.

## Installation

To run, clone or download the repo to your local machine. Note that the root directory contains the server files, with the client-side (React, etc.) files housed in the `client` folder. As such, barring changes to the development process in our `package.json` scripts, you'll want to start at the root with `npm i` to install the back-end dependencies, and then navigate to the root of the client folder and run `npm i` to install the front-end dependencies.

To run the app in development, following installation of all server-side and client-side dependencies, navigate to the root directory and enter `npm run dev`. This will queue up the server, which by default listens on `localhost:5000`, as well as the client app, which runs on `localhost:3000` by default.

## Demo

A Heroku-hosted version of ShiftJogger is available at our [ShiftJogger](https://lit-ridge-25934.herokuapp.com/) site.

## Dependencies

As detailed in the server-side and client-side `package.json` files, this project utilizes (at present) the following dependencies:

### Server

- [Sendgrid](https://www.npmjs.com/package/@sendgrid/mail)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [concurrently](https://www.npmjs.com/package/concurrently) (for development and Heroku deployment)
- [Express](https://www.npmjs.com/package/express)
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [moment.js](https://www.npmjs.com/package/moment)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Passport](https://www.npmjs.com/package/passport)
- [Passport-jwt](https://www.npmjs.com/package/passport-jwt)
- [Validator](https://www.npmjs.com/package/validator)
- and [Nodemon](https://www.npmjs.com/package/nodemon) (for development)
- as well as the obvious ones: [Node](https://www.npmjs.com/package/node) and [NPM](https://www.npmjs.com/package/npm)

### Client

- Material-UI [Core](https://www.npmjs.com/package/@material-ui/core) and [Icons](https://www.npmjs.com/package/@material-ui/icons)
- [Axios](https://www.npmjs.com/package/axios)
- [classnames](https://www.npmjs.com/package/classnames)
- [JWT-Decode](https://www.npmjs.com/package/jwt-decode)
- [moment.js](https://www.npmjs.com/package/moment)
- [React](https://www.npmjs.com/package/react) (16.6.3)
- [React-Bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [React-Datetime](https://www.npmjs.com/package/react-datetime)
- [React-Dom](https://www.npmjs.com/package/react-dom)
- [React-Moment](https://www.npmjs.com/package/react-moment)
- [React-Redux](https://www.npmjs.com/package/react-redux)
- [React-Router-DOM](https://www.npmjs.com/package/react-router-dom)
- [React-Scripts](https://www.npmjs.com/package/react-scripts) (for development and deployment)
- [Redux](https://www.npmjs.com/package/redux)
- [Redux-Devtools-Extension](https://www.npmjs.com/package/redux-devtools-extension) (for development, but will update to `Redux-Devtools-Extension/developmentOnly at a later date)
- [Redux-Thunk](https://www.npmjs.com/package/redux-thunk) (middleware)
- and [Styled-Components](https://www.npmjs.com/package/styled-components)

## TODO

- 1/11/19: Reduce width of the "Duration" input fields, probably by moving their labels to the left side of the field, so the input takes up half currend width. Most likely solution: Create separate class for start/end input fields, such that the title can occupy the left 50% of the section, and the input field the right 50%. Possibly need to create columns within TextField.js? Work with the input title fonts to make a bit more prominent.
- 1/12/19: (DONE 11/13) <body> and <div id="root"> sections seem to be 100% of screen height, not 100% of content height, meaning the background color added today cuts off about 80% of the way down the screen when scrolling to bottom.
  1/12/19: New grouping for content on Dashboard: buttons closer to each other, less white space/padding. Also need to add "new draft" button to dashboard--currently only found on nav-bar.
  - 11/13/19: Make navbar fixed position like footer. Setting `position: fixed` removes the 100vw from the navbar, and it now overlaps page content. Needs more adjustment.
  

## Contributors

As of 12/11/2018, `drunkenkismet` is the sole contributor to this project, although he's actively recruiting from the Chingu Voyage 7 cohort to help with front-end design, back-end design and testing, overall code cleanup, and -- eventually -- testing with Enzyme/Jest.

On 1/4/2019, `volantTyler` joined the development team. His initial focus will be on front-end design and code cleanup.
