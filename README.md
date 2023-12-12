## NOTES FOR REVIEWER

Instead of planet name, I have decided to display button to show modal. I made that decision because it was not pretty to display link and allow sorting by this column. 
I created reusable dialog without any libraries. Dialog may be reused and we can inject Template and data we want to show. The dialog is stored in shared folder. 
I used Angular Material for displaying table and search. 
PeopleStorageService was created to keep the state of people data. 
I have decided to not use search by http request, but search it in PeopleStorageService. The reason I did this was becuase the http requests were already taking long with such a small part of data. I also wanted to show that sometimes there is a need to have a search on frontend side in UI libraries. 
The list is fetching the data and dynamically adds the newest part of data due to recursive request calls. I didn't want to use much of Angular Material library and that is why the table has no paginator. Personally, I think it would be best to use paginator 
and load data whenever person will want to check another page. 
To handle error, I created interceptor, there is a retry when request will fail and my idea was to create a Toast Service and another interceptor that will allow me to display a toast with error message. Unfortunately, I didn't have free time to do it. 


# People

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
