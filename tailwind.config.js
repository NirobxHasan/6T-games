/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {}
    },

    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#F42A41',

                    secondary: '#042f70',

                    accent: '#30d3b3',

                    neutral: '#2F2541',

                    'base-100': '#373F5C',

                    info: '#1F8FEA',

                    success: '#32C8B1',

                    warning: '#99650A',

                    error: '#DC3858'
                }
            }
        ]
    }
};
