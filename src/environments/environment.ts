// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyC1ovJSjagfJezf4dvGfh3q0T_IyM4QMxA",
    authDomain: "events-e16c4.firebaseapp.com",
    databaseURL: "https://events-e16c4.firebaseio.com",
    projectId: "events-e16c4",
    storageBucket: "events-e16c4.appspot.com",
    messagingSenderId: "972337545573"
  }
};
