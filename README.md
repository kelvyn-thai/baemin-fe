## What is this project?

- This project using for create order tracking service.
- Copyright Thai Nguyen Hoang Phat

## Available scripts

In the project directory, you can run:

| Command             |        Description        |       ENV        |
| :------------------ | :-----------------------: | :--------------: |
| npm/yarn install    |       Install NPM.        |
| npm/yarn start      | Runs the app on port 8080 | .env.development |
| npm run/yarn build  |         Build app         | .env.production  |
| npm run/yarn deploy |        Deploy app         | .env.production  |

## How to run this project?

- Copy .env.development -> .env
- Run cmd npm/yarn start to start app on port 8080
- Start api services on [baemin-api](https://github.com/phattnh/baemin-api)
- Start socket services on [baemin-socket](https://github.com/phattnh/baemin-socket)

## Main Stack

- Build UI by React core: https://reactjs.org + CRA template typescript
- Manage build, deploy, start,...: [react-scripts](https://www.npmjs.com/package/react-scripts)
- Manage state application by Zustand: https://github.com/pmndrs/zustand
- Asynchronous state management by react-query: https://tanstack.com/query/v4/docs/overview
- Bundle application by Webpack: https://webpack.js.org
- UI core library: combine between [ant-design](https://ant.design/docs/react/introduce) + make by hand.
- CSS framework: https://tailwindcss.com
- Find, fix, format, v...v problems in JavaScript code :
  - Eslint: https://eslint.org/
  - Husky: https://typicode.github.io/husky
  - Lint-staged: https://github.com/okonet/lint-staged
  - Prettier: https://prettier.io/

## Deploy

- Github Pages: https://pages.github.com/

## Production

- https://phattnh.github.io/baemin-fe/

## Developer

- From source ([src](./src/)) app folder:

  - [components](./src/components/): define all component used to build application
  - [database](./src/database/): declare indexed database using for storage client data
  - [env](./src/env/): enviroment logic
  - [hooks](./src/hooks/): declare sharing hooks
  - [http-request](./src/http-request/): http request methods (GET, PUT, PATCH, DELETE) write base on [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) api
  - [pages](./src/pages/): all application pages
    - index.ts: encapsulation page
    - [Page].tsx: declare page component
    - [Page].zustand.ts: manage state of page
    - [Page].utils.ts: define some utils logic of page
    - [Page].styles.scss: define CSS
    - [Page].hook.ts: define hook of page (react-query, some calculate data hook,...)
    - [Page].services.ts: define apis / services
    - [Page].typings.ts: define interface / type some function / data type
  - [zustand-store](./src/zustand-store/): define zustand store used for component / feature / page
  - [http-request](./src/http-request/): create http request by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

- From components(UI) ([components](./src/components)):
  - core: Basic / core component make by hand

## Specifications

- Order
- Will created by other system having these fields:
  - id
  - status customer
  - name rider
  - name order
  - address
  - merchant name
  - merchant address
  - dishes
    - name
    - price
  - total price
  - updated time
- Updated time will be updated when order is created or updated order
- Will have status
- Created: Customer create order
- Accepted: Merchant accepted order
- DriverAssigned:Driver is assigned
- Delivering: Driver is delivering food
- Done:Customer get order
- Canceled: Canceled between created and done by operator
  Operators can cancel order by assigning themselves to certain order.
  Features it should include list orders with pagination
- order will be sorted by updated time descending filter
- order by certain criteria
- criteria
  - id
  - status
  - customer name
  - rider name
  - merchant name
  - updated time: last 5, 10, 15 min; sort order by updated time ascending display, late order
    each step should be finished by 15min (10min warning) except delivering (late: 40min, warning: 30min)

Your backend can be anything and does not have to work. If you would like to use a mocked-out interface, that is fine (even static data in code is ok)

- Extra credit features
- Realtime update
- Dashboard for orders
  - Total/Current number of orders by status
  - Total/Current number of orders by timing (normal, warning, late)
- Etc
  - Polish and UX
  - Highly reusable
  - Components Tests
