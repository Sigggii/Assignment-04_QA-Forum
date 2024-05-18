import { inject, Injectable } from '@angular/core'
import { AuthService } from './auth.service'

type BaseTheme = 'dark' | 'light'
type Theme = 'pro-dark' | 'pro-light' | 'noob-dark' | 'noob-light'

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    authService = inject(AuthService)

    systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

    getBaseTheme() {
        return (localStorage.getItem('ui-theme') ||
            this.systemTheme) as BaseTheme
    }

    setTheme(theme: BaseTheme): void {
        localStorage.setItem('ui-theme', theme)
        const role = this.authService.isPro() ? 'pro' : 'noob'

        const allThemes: (Theme | BaseTheme)[] = [
            'pro-dark',
            'pro-light',
            'noob-dark',
            'noob-light',
            'dark',
            'light',
        ]
        document.body.classList.remove(...allThemes)

        document.body.classList.add(`${role}-${theme}`)
        document.body.classList.add(`${theme}`)
    }

    setInitialTheme(): void {
        const theme = this.getBaseTheme()
        this.setTheme(theme)
    }
}
