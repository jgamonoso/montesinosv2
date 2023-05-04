# montesinosv2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


--------------------
Para desplegar en un proyecto de Angular en un servidor Apache dentro de un subdirectorio

ng build --prod --base-href /v2/
luego ir al index generado en la carpeta dist y cambiar esto
<base href="C:/Program Files/Git/v2/">
por esto otro
<base href="/v2/">

O directamente hacer: ng run buildv2

Aparte crear un fichero .htaccess en el subdirectorio tal que así
RewriteEngine On
# Si el archivo solicitado existe, utiliza ese archivo
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Si no existe, redirige la solicitud al archivo index.html
RewriteRule ^ /v2/index.html [L]


TEMPLATE: Admin Pro by wrappixel.com