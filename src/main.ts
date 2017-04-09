///<reference path="./typings/webgl2.d.ts" />
///<reference path="../node_modules/@types/node/index.d.ts" />
///<reference path="./typings/gl-matrix.d.ts" />
///<reference path="./typings/jquery.d.ts" />

declare const Stats;
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
