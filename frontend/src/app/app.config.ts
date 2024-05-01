import { ApplicationConfig } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import {
    provideAngularQuery,
    QueryClient,
} from '@tanstack/angular-query-experimental'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(),
        provideAngularQuery(
            new QueryClient({
                //Set staleTime to 5 mins
                defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
            })
        ),
    ],
}
