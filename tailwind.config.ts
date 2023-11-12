import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        dark: {
          main: '#000814',
          second: '#0D111C',
        },
        green: {
          main: '#8FFE09',
          second: '#8FFE09'
        },
        red: {
          main: '#FF415A',
        },
        gray: {
          main: '#8C8C8C', 
        }, 
        white: {
          main: '#FEFEFF'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
