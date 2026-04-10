module.exports = {
	content: [
		'./admin/dashboard-app/src/**/*.{html,js}',
	],
	plugins: [
		require( '@tailwindcss/forms' ),
	],
	theme: {
		extend: {
			colors: {
				zip: {
					DEFAULT: '#ff580e',
				},
				spec: {
					DEFAULT: '#6104ff',
					hover: '#5300e0',
				},
			},
			fontFamily: {
				inter: [ '"Inter"', 'sans-serif' ],
			},
			boxShadow: {
				overlay: '0px 10px 40px 0px rgba(0, 0, 0, 0.12)',
				'overlay-left': '-16px 0px 80px -24px rgba(0, 0, 0, 0.16)',
				'overlay-right': '16px 0px 80px -24px rgba(0, 0, 0, 0.16)',
				hover: '0px 12px 24px -12px rgba(0, 0, 0, 0.12)',
			},
		},
	},
	variants: {
		extend: {},
	},
};
