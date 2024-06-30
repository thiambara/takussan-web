import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {User} from "../app/core/models/api/user.model";
import firebase from "firebase/compat";


export {};

declare global {
  interface Window {
    Echo: Echo;
    Pusher: typeof Pusher
    loggedUser: User;

    objectToQueryString(initialObj: any): string;

    toCamelCase(initialObj: string): string;

    toSnakeCase(initialObj: string): string;

    deepCopy<T>(obj: T): T;
    firebaseApp: firebase.app.App
  }

  interface String {
    toCamelCase(): string;

    toSnakeCase(): string;
  }

  let loggedUser: User;
  let objectToQueryString: (initialObj: any) => string;
  let toCamelCase: (initialObj: string) => string;
  let toSnakeCase: (initialObj: string) => string;
  let deepCopy: <T>(obj: T) => T;
}

