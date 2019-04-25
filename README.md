# Mayhem

The first rule of Project Mayhem is that you can talk about it as much as you like

## Development server

Run `npm install` in both `fe` and `api` folders, then run `docker-compose up` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `docker-compose run mayhem-fe ng generate component component-name` to generate a new component. You can also use `docker-compose run mayhem-fe ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `docker-compose run mayhem-fe ng test --watch=false` to execute the unit tests via [Karma](https://karma-runner.github.io) inside the docker container.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
