// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBUVVq1zmNztkE47UzswmuSM0EBhnouDlI",
    authDomain: "qa-questions.firebaseapp.com",
    databaseURL: "https://qa-questions.firebaseio.com",
    projectId: "qa-questions",
    storageBucket: "qa-questions.appspot.com",
    messagingSenderId: "454716495894"
  }
};
