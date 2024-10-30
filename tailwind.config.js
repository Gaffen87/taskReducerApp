/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#03346E",
				secondary: "#6EACDA",
				danger: "#E2E2B6",
			},
		},
	},
	plugins: [],
};
