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
          input: '#001D3D'
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
          second: '#91A7B4'
        }, 
        white: {
          main: '#FEFEFF'
        }
      },
      backgroundImage: {
        'authbg-pattern': "url('/images/auth-pattern.png')",
      },
    },
  },
  plugins: [],
}
export default config
