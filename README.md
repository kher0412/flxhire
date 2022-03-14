# React front-end

## Setup

1. Use nvm to install the latest Node.js LTS version
2. See https://github.com/creationix/nvm for nvm

### Development mode

1. Clone this repo

1. Install npm packages ```npm install```

1. Run dev server on localhost:8080 ```npm run dev```

1. Using the app

  Once rails server and webpack's dev server is runnig you can access the app at ```localhost:8080```


## Unit tests

### Running

These tests run using the Jest environment

1. ```npm run test```

## End-to-end tests

See [the wiki](https://github.com/flexhire/flexhire-react/wiki/End-to-end-testing)

## Production or staging modes

Use `npm run production` or `npm run staging` to make the proper builds. Then serve the app with `npm start`

## Suggested Development Tools

Browser Extensions:

1. React devtools

1. Redux devtools

Recommended IDE is Visual Studio Code

Recommended vscode extensions

1. Rubocop: a linter that will highlight errors and style mistakes on the ruby code. Works better if it's set up to use the project's eslint installation instead of the generic one

2. ESLint: same but for javascript/typescript. Works better if it's set up to use the project's eslint installation instead of the generic one. Also make a note to use its auto-fixing ability, it comes very handy when making large changes.

3. Editorconfig: this will let vscode automatically configure stuff to match the project (stuff like how many spaces to use for indentation).

## Storybook Setup

To set up Storybook run the following:

2. `npx sb@next upgrade --prerelease`

1. `npm i -D @storybook/builder-webpack5@next @storybook/manager-webpack5@next`

Then ask another developer for thier version of `frontend/.storybook/main.js` and make sure it matches yours

3. run `npm run storybook` to start
