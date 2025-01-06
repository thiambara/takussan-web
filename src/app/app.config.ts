import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import Aura from '@primeng/themes/aura';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {takussanApiAuthInterceptor} from "./core/interceptors/takussan-api-auth.interceptor";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {providePrimeNG} from "primeng/config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([takussanApiAuthInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService,
    DialogService,
    {provide: LOCALE_ID, useValue: "fr-FR"},
  ]
};
