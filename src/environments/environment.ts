// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: "AIzaSyBP3k8YjpT9D9b51lbwp-EpLUK0mEMx_mQ",
  authDomain: "prf-webshop-d8a6b.firebaseapp.com",
  projectId: "prf-webshop-d8a6b",
  storageBucket: "prf-webshop-d8a6b.appspot.com",
  messagingSenderId: "516156863778",
  appId: "1:516156863778:web:470a6fb203a3b0b65fa17b",
  measurementId: "G-SXLPG0549Z"
};

export const environment = {
  production: false,

  //API_URL: "http://localhost:3000",
  API_URL:"https://prf-webshop-ibb-fe.herokuapp.com",

  LOGIN: '/login',
  LOGOUT: '/logout',
  USER: '/user',
  AUTH_TEST: '/status',
  WEBSHOP_ITEM: '/webshopItem'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
