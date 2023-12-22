/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.js"
    ],
    theme: {
        fontFamily: {
            display: ["Varela Round", "sans-serif"]
        },
        extend: {
            colors: {
                'spotify-green': '#1DB954',
                'spotify-black': '#191414'
            }
        }
    },
    plugins: [
        require('tw-elements/dist/plugin')
    ],
}