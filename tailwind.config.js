const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                red:"#ED1802",
                red_dark:"#b61400",
                red_hover:"#ea5f51",
                pink:"#FD8578",
                light_pink:"#ffb9b2"
            }
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
