import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {NZ_I18N_DATE_PROVIDER, NZ_I18N_PROVIDER} from "./locale.config";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    NZ_I18N_PROVIDER, // Use the locale provider
    NZ_I18N_DATE_PROVIDER,
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};
