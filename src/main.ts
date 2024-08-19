/// <reference types="@angular/localize" />
import '@angular/common/locales/global/fr';
import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import bootstrap from "./bootstrap";

bootstrap();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

