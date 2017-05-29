// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBkjiA8hB9dAJcPg5J4w3lK2aLaa_tDgsU',
    authDomain: 'chimple-learn.firebaseapp.com',
    databaseURL: 'https://chimple-learn.firebaseio.com',
    projectId: 'chimple-learn',
    storageBucket: 'chimple-learn.appspot.com',
    messagingSenderId: '459345255283'
  }
};
