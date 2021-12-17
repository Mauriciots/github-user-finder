# GitHub User Finder
A simple web application to search GitHub users easily.

This project was bootstrapped using Create React App. For more information, please check out https://create-react-app.dev/.

## Negative scope
Sorting has not been implemented in this version due to a technical restriction. The GitHub API (https://docs.github.com/en/rest/reference/search#search-users) does not support sorting by any of the columns displayed in the data table. It couldn't have been done in memory because there is a requirement of using server pagination.

## How to start up project locally
- install dependencies running `yarn install`
- start up application running `yarn start`
- application will be loaded on http://localhost:3000

## How to build
- build application running `yarn build`

## How to execute unit-tests
- run `yarn test` or `yarn test --coverage` in case you want to generate coverage report

## SCM basics
- implement all new features and fixes on `develop` branch
- once you are ready, open a pull-request with target branch `master`
- new code on `master` will be automatically deployed in production
