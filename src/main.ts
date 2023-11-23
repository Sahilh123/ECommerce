import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { ApplicationRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((m) => {
    /**
     * This will enable to check change detection time profiling in console in development mode
     * execute in console - ng.profiler.timeChangeDetection();
     * https://medium.com/front-end-hacking/a-guide-to-debugging-angular-applications-5a36bd88b4cf
     */
    const applicationRef = m.injector.get(ApplicationRef);
    const appComponent = applicationRef.components[0];
    enableDebugTools(appComponent);
  })
  .catch((err) => console.error(err));
