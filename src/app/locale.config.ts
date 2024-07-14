import { LOCALE_ID, inject } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import it from '@angular/common/locales/it';
import {en_US, NZ_I18N, it_IT, NZ_DATE_LOCALE} from 'ng-zorro-antd/i18n';
import { enUS } from 'date-fns/locale'

registerLocaleData(en);
registerLocaleData(it);

export const NZ_I18N_PROVIDER = {
  provide: NZ_I18N,
  useFactory: () => {
    const localeId = inject(LOCALE_ID);
    switch (localeId) {
      case 'it':
        return it_IT;
      default:
        return en_US;
    }
  }
};

export const NZ_I18N_DATE_PROVIDER = {
  provide: NZ_DATE_LOCALE, useValue: enUS
};

