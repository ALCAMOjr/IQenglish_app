import withMT from "@material-tailwind/react/utils/withMT";

const tailwindConfig = {
  content: ["./src/**/*.{js,ts,tsx,jsx,css}", 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', /* Cambia esto por el color que desees */
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
    },
  },
  variants: {},
  plugins: [ ('flowbite/plugin')],
};

export default withMT(tailwindConfig);
