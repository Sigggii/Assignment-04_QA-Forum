/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
    content: ['./src/**/*.{html,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                noob: {
                    DEFAULT: 'hsl(var(--noob))',
                    foreground: 'hsl(var(--noob-foreground))',
                },
                pro: {
                    DEFAULT: 'hsl(var(--pro))',
                    foreground: 'hsl(var(--pro-foreground))',
                },
            },
        },
    },
    plugins: [],
}
