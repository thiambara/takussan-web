import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling
} from '@angular/router';
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
    provideRouter(routes,
      withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideAnimationsAsync(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptors([takussanApiAuthInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {darkModeSelector: '.app-dark'}
      }
    }),

    // PrimeNG services
    [
      MessageService,
      DialogService
    ],
    {provide: LOCALE_ID, useValue: "fr-FR"},
  ]
};
