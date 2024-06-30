import {environment} from "./environments/environment";
import {enableProdMode} from "@angular/core";

export default function bootstrap() {
  toggleLogs();
  setGlobalMethods();
}

function toggleLogs() {
  if (environment.production) {
    enableProdMode();
    window.console = (function (oldCons: Console) {
      return {
        ...oldCons,
        log: (..._) => {}
      };
    }(window.console));
  }
}


function setGlobalMethods() {
  window.toCamelCase = function (str: string): string {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase()).replace(/[-_]/g, '');
  }

  window.toSnakeCase = function (str: string): string {
    return str.replace(/\s/g, "_").replace(/([A-Z])/g, (match) => "_" + match.toLowerCase());
  }

  window.objectToQueryString = function (initialObj: any): string {
    const reducer = (obj: any, parentPrefix = null) => (prev: any, key: any) => {
      const val = obj[key];
      key = encodeURIComponent(key);
      const prefix = parentPrefix ? `${parentPrefix}[${key}]` : key;

      if (val == null || typeof val === 'function') {
        prev.push(`${prefix}=`);
        return prev;
      }

      if (['number', 'boolean', 'string'].includes(typeof val)) {
        prev.push(`${prefix}=${encodeURIComponent(val)}`);
        return prev;
      }

      prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join('&'));
      return prev;
    };

    return Object.keys(initialObj).reduce(reducer(initialObj), []).join('&');
  };

  window.deepCopy = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  String.prototype.toCamelCase = function (): string {
    return toCamelCase(this as string);
  }

  String.prototype.toSnakeCase = function (): string {
    return toSnakeCase(this as string);
  }

  // create custom operator like typeof to clone
}
