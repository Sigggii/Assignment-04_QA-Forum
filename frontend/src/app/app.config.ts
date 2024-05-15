import { ApplicationConfig } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { routes } from './app.routes'
import {
    provideHttpClient,
    withInterceptors,
    withXsrfConfiguration,
} from '@angular/common/http'
import {
    provideAngularQuery,
    QueryClient,
} from '@tanstack/angular-query-experimental'
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([credentialsInterceptor])),
        provideAngularQuery(
            new QueryClient({
                //Set staleTime to 5 mins
                defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
            })
        ),
    ],
}
