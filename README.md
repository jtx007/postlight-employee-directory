# Postlight Employee Directory (Frontend)

This is my submission for the Postlight take home assignment for the Full Stack Engineer Position. In order to run this project in it's entirety, please clone and setup the backend repo and the server is running which can be found _[here](https://github.com/jtx007/postlight-employee-directory-api)_

## Prerequisites

- Make sure that the backend api server is running which can be found _[here](https://github.com/jtx007/postlight-employee-directory-api)_

- **nvm**: use [nvm](https://github.com/nvm-sh/nvm) and run `nvm install` and nvm will read the .npmrc file to install the compatible node version for this project - Node version 14.17.0

- **npm**: install [npm](https://docs.npmjs.com/) globally. Its a great package manager and the following steps will utilize `npm` in the examples.

## Tech Stack (Frontend)

- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/docs/getting-started)
- [framer-motion](https://www.framer.com/docs/)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with a template flag for chakra ui. This template sets up a new react app with Create React App and all its glory with all of the configurations to have Chakra-UI in the project. To learn more about the Create React App template with Chakra UI, check out the docs [here](https://chakra-ui.com/guides/integrations/with-cra).

To develop on the project you have the following available scripts: `start`, `build`, `test`, `eject`. (See docs as part of the [react-scripts](https://create-react-app.dev/docs/available-scripts/) for more info):

For the purposes of a demo, you won't need most of the scripts. You can run:

```
$ npm i && npm start
```

For tests run:

```
$ npm run test
```

This will spin up the development server at the port it mentions after spinning up the [backend](<(https://github.com/jtx007/postlight-employee-directory-api)>) API and allow you to see the app live!

## Technical Design

For the frontend, I decided to go with Chakra UI, a component library that emphasizes simplicity, modularity, and accessibility. Think Tailwind CSS but with built out components that are fully customizeable. These prebuilt components provide great building blocks for your application. You can use them straight out of the box or build your own using said building blocks for even further extensibility. The documentation is great and seemed like a no brainer. I used the latest version of React with the latest features, such as Hooks. I used the following third-party libraries on top of Chakra UI:

- [@reach/router](https://reach.tech/router/)
  - a small, simple router for React that borrows from React Router, Ember, and Preact Router. Used for navigation in React SPA's.
- [axios](https://axios-http.com/docs/intro)
  - a promise-based HTTP Client for node.js and the browser. Used in lieu of the native fetch api found in the browser.
- [framer-motion](https://www.framer.com/docs/)
  - A production-ready motion library for React. It came bundled with the Chakra UI template and composes it's animations.

## Project Walkthrough

Made with the [Create React App template](https://chakra-ui.com/guides/integrations/with-cra) with Chakra UI, this project is fairly standard in terms of design.

- Start off at `public/index.html`. This gets served with all the bundled JS when this app is deployed. From there, the JS initializes React which renders DOM into the <div#root>.
- The Javascript begins at [`index.js`](src/index.js). There you will find where React is bootstrapped and rendered into the DOM mentioned above. The difference here compared to other CRA's is the ColorModeScript from Chakra UI, which helps keep color theming settings in sync across pages of the App.
- [`App.js`](src/components/App.js) is the starting point of the React component heirarchy.
- For this app, I have a Chakra Provider that wraps my entire application, with a theme prop, which is extending the default [theme](src/theme.js) from Chakra UI with some custom styles of my own. I then have a [Layout](src/components/Layout.js) component which encompasses the [Navbar](src/components/Navbar.js) wrapping the application.
- Then I have the Router provider from reach/router wrapping the page components for the application with dynamic routes for the directory and it's pagination as well as dynamic routing for editing employees.
- To view all employees, one would navigate to the directory page where on mount, employees would be fetched from my Rails API. The results will be stored via local state and rendered into [EmployeeCard](src/components/EmployeeCard.js) presentational components. The employee card has two buttons to edit current employees as well as delete them with a [modal](src/components/DeleteModal.js).
- There is there is the [AddEmployeePage](src/pages/AddEmployee.js) with a form to add new employees.

## Stretch Features

- More in depth unit tests.
- Dynamic form components for more DRY code.
- Form validations
- More dynamic error handling, with the error state.

- Pages to add new locations, departments, and job titles for an ever-expanding org.
- Other optimizations such as using useMemo or useCallback for extremely long lists.
