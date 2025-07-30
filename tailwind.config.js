import withMT from "@material-tailwind/react/utils/withMT";
import { nextui } from "@nextui-org/react";

const tailwindConfig = {
  content: [
    "./src/**/*.{js,ts,tsx,jsx,css}", 
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', /* Cambia esto por el color que desees */
        customBlue: '#74a7e4',
        secondprimary: '#0A259C',
        secondary: '#000000'
      },
      fontSize: {
        'rem-8.75': '8.75rem',
      },
      spacing: {
        '7px': '7px',
      },
      rotate: {
        '45': '45deg',
        '135': '135deg',
      },
      translate: {
        'x-6': '1.5rem',
        'x-full': '100%',
      },
      opacity: {
        '100': '1',
        '0': '0',
      },
      backgroundColor: {
        'gray-1': '#D4D9E8',
        'gray-2': '#EAEEFB',
      },
      borderColor: {
        'stroke': '#D4D9E8',
      },
      textColor: {
        'body-color': '#333',
      },
      screens: {
        'xs': '450px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1280px',
        'xl': '1536px',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: { // Agrega esta sección
        '500': '500ms',
      },
      transitionTimingFunction: { // Agrega esta sección
        'in-out': 'ease-in-out',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), 'flowbite/plugin'],
};

export default withMT(tailwindConfig);
