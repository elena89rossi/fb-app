# fb-app
## Intro

The project aims to demonstrate different implementation techniques within the context of a complex Web Application.

The application flow consists of the following steps:

- Launching the application with access to the registration page.
NOTE: Registration coincides with the login (fake) phase and the initialization of a user session. 
User data sre persisted in local storage to allow the user to open multiple browser instances.

- If registration is successful, the user navigates to the main page where profile details are displayed.
NOTE: Data is refreshed every 5 minutes through an HTTP polling call (to the user detail endpoint).

- By clicking the logout button (fake), the user created during registration is deleted, the storage is cleared, and you are redirected to the registration page.

## concepts that I decided to implement into the exercice

 - Module and standalone components (app entrypoint is module based, instead user-form and user session are standalone )

 - Core lib : single entrypoint lib without exportable entities and unit test implementation.

 - UI Lib: library with multiple secondary entrypoint. This architecture allows developer to import into project only what he want to use (optimization for bundle size). Simple example om dummy component...

 - UserSession : concepts related to data persistence and dynamic data updates  (browser storage, polling, share data for multiple subsctiption, no  nested subscription, destroy subsctiption usign takeUntil, use share rapla to use only one stream for multiple subscribers....)

## Execution Commands
 ### Application launch
1 - `npm install` (only the first time)
2 - `npm run start`

## Unit Test Execution
Unit test are implemented only for some files into core lib
 1 -  Execute `npm run test:core`

## Build Projects
Main app: `npm run build`
Core Lib (single entrypoint): `npm run build:core`
UI Lib (secondary entrypoint): `npm run build:ui`



con il comanco nopm run  start di default cvienne utilizzato il file proxy.conf.dev per riuscire in locale a puntare alle api di gorest

APP:
l'entri point dell'applicativo è definito tramite composizione mofulare mentre le featur fanno uso di standalone component ( l'obiettivo era di utilizzare entrambe le modalità)


#commands 
Generate publishable lib 
❯ npx nx generate @nrwl/angular:library ui  --publishable --importPath=@fb/ui --prefix=fb-ui

setup secondary en
trypoint
 npx nx g @nrwl/angular:library-secondary-entry-point --library=ui --name={moduleName}

 generate component
 npx nx generate @nrwl/angular:component --name={componentName} --project=ui --export=true
