/**
 * Zip AI - React Icon Renderers.
 *
 * All Exported Constants are alplabetically arranged.
 */
import { createElement as el } from '@wordpress/element';

// --------- Common Constants --------- //

// These are common properties used by all icons
const commonProperties = {
	// Choose from the common SVG sizes.
	size: {
		huge: 72,
		big: 32,
		regular: 24,
		small: 16,
	},
	// Choose from the common stroke thicknesses.
	stroke: {
		thick: 2,
		regular: 1.4,
		thin: 1.2,
		one: 1,
	},
	// Choose from the common colors.
	color: {
		currentColor: 'currentColor',
		none: 'none',
		white: '#fff',
	},
	// Spread this for rounded stroke vertices.
	rounded: {
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
	},
};

// These are the common formats used for our SVGs.
const format = {
	// Spread these values to get all the required properties for an outlined icon.
	outlined: {
		stroke: commonProperties.color.currentColor,
		strokeWidth: commonProperties.stroke.regular,
		fill: commonProperties.color.none,
		...commonProperties.rounded,
	},
	// Spread these values to get all the required properties for a filled icon.
	filled: {
		fill: commonProperties.color.currentColor,
		stroke: commonProperties.color.none,
	},
};

// --------- Logo Renderers --------- //

// The WordPress Logo.
export const WordPressLogo = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.regular,
		height: commonProperties.size.regular,
		viewBox: '0 0 29 28',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'g',
		{
			clipPath: 'url(#clip_spec_ai_wordpress_logo)',
		},
		el(
			'path',
			{
				d: 'M28.2 14C28.2 6.272 21.9279 0 14.2 0C6.47195 0 0.199951 6.272 0.199951 14C0.199951 21.728 6.47195 28 14.2 28C21.9279 28 28.2 21.728 28.2 14ZM14.2 1.414C21.158 1.414 26.7859 7.042 26.7859 14C26.7859 20.958 21.158 26.586 14.2 26.586C7.24195 26.586 1.61395 20.958 1.61395 14C1.61395 7.042 7.24195 1.414 14.2 1.414ZM11.414 20.748L7.14395 9.254C7.82995 9.212 8.61395 9.142 8.61395 9.142C9.21595 9.072 9.14595 7.728 8.52995 7.756C8.52995 7.756 6.72395 7.896 5.54795 7.896C5.33795 7.896 5.08595 7.896 4.81995 7.882C6.83595 4.844 10.28 2.842 14.2 2.842C17.1259 2.842 19.786 3.948 21.774 5.768C20.934 5.656 19.744 6.258 19.744 7.756C19.744 8.68 20.276 9.464 20.85 10.388C21.284 11.144 21.55 12.096 21.55 13.482C21.55 15.358 19.7719 19.754 19.7719 19.754L15.978 9.254C16.65 9.212 17.028 9.03 17.028 9.03C17.63 8.96 17.56 7.49 16.958 7.518C16.958 7.518 15.138 7.672 13.962 7.672C12.87 7.672 11.008 7.518 11.008 7.518C10.406 7.49 10.336 9.002 10.938 9.03L12.114 9.142L13.682 13.398L11.414 20.748ZM19.842 23.758L23.496 14C23.496 14 24.434 11.634 24.042 8.666C24.924 10.262 25.358 12.054 25.358 14C25.358 18.144 23.174 21.812 19.842 23.758ZM3.95195 9.478L9.29995 24.15C5.56195 22.33 3.04195 18.438 3.04195 14C3.04195 12.376 3.32195 10.878 3.95195 9.478ZM14.382 15.82L17.588 24.57C16.538 24.948 15.39 25.158 14.2 25.158C13.192 25.158 12.226 25.004 11.316 24.738L14.382 15.82Z',
				...format.filled,
				...childParams,
			},
		),
	),
	el(
		'defs',
		null,
		el(
			'clipPath',
			{
				id: 'clip_spec_ai_wordpress_logo',
			},
			el(
				'rect',
				{
					width: 28,
					height: 28,
					fill: commonProperties.color.white,
					transform: 'translate(0.199951)',
				},
			),
		),
	),
);

// The ZipWP Logo.
export const ZipWPLogo = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.big,
		height: commonProperties.size.big,
		viewBox: '0 0 30 30',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M5 0C2.23858 0 0 2.23858 0 5V25C0 27.7614 2.23858 30 5 30H25C27.7614 30 30 27.7614 30 25V5C30 2.23858 27.7614 0 25 0H5ZM26.1432 10.7265C26.1459 10.7262 26.1487 10.7259 26.1514 10.7256L26.1349 10.7269C26.1377 10.7267 26.1405 10.7266 26.1432 10.7265ZM26.1432 10.7265C21.9125 11.174 19.2481 11.1414 18.4509 11.1007C18.3687 11.1071 18.3417 10.9723 18.4048 10.9331C20.7044 9.21451 21.5524 7.98503 21.7865 7.59037C21.8319 7.53551 21.776 7.45429 21.7102 7.45939C20.6151 7.42458 13.7358 7.29097 9.63266 7.95161C6.00268 8.5242 3.84948 11.2753 3.86235 14.851C3.87523 18.4266 6.09129 21.3863 9.29387 22.1304C17.4168 23.9986 22.9334 18.0944 23.8439 17.0311C23.9057 16.975 23.8485 16.8768 23.7649 16.8661L19.5924 16.8476C19.4937 16.8553 19.4654 16.7035 19.5615 16.6618C24.5276 14.3256 25.9654 11.5273 26.2442 10.8553C26.2709 10.7871 26.2208 10.7249 26.1432 10.7265Z',
			...format.filled,
			fillRule: 'evenodd',
			clipRule: 'evenodd',
			...childParams,
		}
	),
);

// --------- Icon Renderers - Alphabetically Arranged --------- //

// The AI Sparkle Icon - A big four-pointed stars with two small four-pointed stars on the right.
export const AiSparkleIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.regular,
		height: commonProperties.size.regular,
		viewBox: '0 0 24 24',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M9.8132 15.9038L9 18.75L8.1868 15.9038C7.75968 14.4089 6.59112 13.2403 5.09619 12.8132L2.25 12L5.09619 11.1868C6.59113 10.7597 7.75968 9.59112 8.1868 8.09619L9 5.25L9.8132 8.09619C10.2403 9.59113 11.4089 10.7597 12.9038 11.1868L15.75 12L12.9038 12.8132C11.4089 13.2403 10.2403 14.4089 9.8132 15.9038Z',
			...format.outlined,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M16.8942 20.5673L16.5 21.75L16.1058 20.5673C15.8818 19.8954 15.3546 19.3682 14.6827 19.1442L13.5 18.75L14.6827 18.3558C15.3546 18.1318 15.8818 17.6046 16.1058 16.9327L16.5 15.75L16.8942 16.9327C17.1182 17.6046 17.6454 18.1318 18.3173 18.3558L19.5 18.75L18.3173 19.1442C17.6454 19.3682 17.1182 19.8954 16.8942 20.5673Z',
			...format.outlined,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M18.2589 8.71454L18 9.75L17.7411 8.71454C17.4388 7.50533 16.4947 6.56117 15.2855 6.25887L14.25 6L15.2855 5.74113C16.4947 5.43883 17.4388 4.49467 17.7411 3.28546L18 2.25L18.2589 3.28546C18.5612 4.49467 19.5053 5.43883 20.7145 5.74113L21.75 6L20.7145 6.25887C19.5053 6.56117 18.5612 7.50532 18.2589 8.71454Z',
			...format.outlined,
			...childParams,
		},
	),
);

// The AI Sparkle Icon Text Icon - A big four-pointed stars with two small four-pointed stars on the right, and the words "Ask AI" after that.
export const AiSparkleTextIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.huge,
		height: commonProperties.size.regular,
		viewBox: '0 0 78 24',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M9.8132 15.9038L9 18.75L8.1868 15.9038C7.75968 14.4089 6.59112 13.2403 5.09619 12.8132L2.25 12L5.09619 11.1868C6.59113 10.7597 7.75968 9.59112 8.1868 8.09619L9 5.25L9.8132 8.09619C10.2403 9.59113 11.4089 10.7597 12.9038 11.1868L15.75 12L12.9038 12.8132C11.4089 13.2403 10.2403 14.4089 9.8132 15.9038Z',
			...format.outlined,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M16.8942 20.5673L16.5 21.75L16.1058 20.5673C15.8818 19.8954 15.3546 19.3682 14.6827 19.1442L13.5 18.75L14.6827 18.3558C15.3546 18.1318 15.8818 17.6046 16.1058 16.9327L16.5 15.75L16.8942 16.9327C17.1182 17.6046 17.6454 18.1318 18.3173 18.3558L19.5 18.75L18.3173 19.1442C17.6454 19.3682 17.1182 19.8954 16.8942 20.5673Z',
			...format.outlined,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M18.2589 8.71454L18 9.75L17.7411 8.71454C17.4388 7.50533 16.4947 6.56117 15.2855 6.25887L14.25 6L15.2855 5.74113C16.4947 5.43883 17.4388 4.49467 17.7411 3.28546L18 2.25L18.2589 3.28546C18.5612 4.49467 19.5053 5.43883 20.7145 5.74113L21.75 6L20.7145 6.25887C19.5053 6.56117 18.5612 7.50532 18.2589 8.71454Z',
			...format.outlined,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M31.8864 18H30.4091L34.6818 6.36364H36.1364L40.4091 18H38.9318L35.4545 8.20455H35.3636L31.8864 18ZM32.4318 13.4545H38.3864V14.7045H32.4318V13.4545ZM48.2216 11.2273L47.017 11.5682C46.9413 11.3674 46.8295 11.1723 46.6818 10.983C46.5379 10.7898 46.3409 10.6307 46.0909 10.5057C45.8409 10.3807 45.5208 10.3182 45.1307 10.3182C44.5966 10.3182 44.1515 10.4413 43.7955 10.6875C43.4432 10.9299 43.267 11.2386 43.267 11.6136C43.267 11.947 43.3883 12.2102 43.6307 12.4034C43.8731 12.5966 44.2519 12.7576 44.767 12.8864L46.0625 13.2045C46.8428 13.3939 47.4242 13.6837 47.8068 14.0739C48.1894 14.4602 48.3807 14.9583 48.3807 15.5682C48.3807 16.0682 48.2367 16.5152 47.9489 16.9091C47.6648 17.303 47.267 17.6136 46.7557 17.8409C46.2443 18.0682 45.6496 18.1818 44.9716 18.1818C44.0814 18.1818 43.3447 17.9886 42.7614 17.6023C42.178 17.2159 41.8087 16.6515 41.6534 15.9091L42.9261 15.5909C43.0473 16.0606 43.2765 16.4129 43.6136 16.6477C43.9545 16.8826 44.3996 17 44.9489 17C45.5739 17 46.0701 16.8674 46.4375 16.6023C46.8087 16.3333 46.9943 16.0114 46.9943 15.6364C46.9943 15.3333 46.8883 15.0795 46.6761 14.875C46.464 14.6667 46.1383 14.5114 45.6989 14.4091L44.2443 14.0682C43.4451 13.8788 42.858 13.5852 42.483 13.1875C42.1117 12.786 41.9261 12.2841 41.9261 11.6818C41.9261 11.1894 42.0644 10.7538 42.3409 10.375C42.6212 9.99621 43.0019 9.69886 43.483 9.48295C43.9678 9.26705 44.517 9.15909 45.1307 9.15909C45.9943 9.15909 46.6723 9.34848 47.1648 9.72727C47.661 10.1061 48.0133 10.6061 48.2216 11.2273ZM51.6491 14.8182L51.6264 13.1591H51.8991L55.7173 9.27273H57.3764L53.3082 13.3864H53.1946L51.6491 14.8182ZM50.3991 18V6.36364H51.7401V18H50.3991ZM55.9446 18L52.5355 13.6818L53.4901 12.75L57.6491 18H55.9446ZM64.2614 18H62.7841L67.0568 6.36364H68.5114L72.7841 18H71.3068L67.8295 8.20455H67.7386L64.2614 18ZM64.8068 13.4545H70.7614V14.7045H64.8068V13.4545ZM76.0057 6.36364V18H74.5966V6.36364H76.0057Z',
			...format.filled,
			...childParams,
		},
	),
);

// The User Icon - a outlined simplistic head and body.
export const UserIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 24 24',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M15.7498 6C15.7498 8.07107 14.0709 9.75 11.9998 9.75C9.92877 9.75 8.24984 8.07107 8.24984 6C8.24984 3.92893 9.92877 2.25 11.9998 2.25C14.0709 2.25 15.7498 3.92893 15.7498 6Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thin,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M4.50098 20.1182C4.57128 16.0369 7.90171 12.75 11.9998 12.75C16.0981 12.75 19.4286 16.0371 19.4987 20.1185C17.2159 21.166 14.6762 21.75 12.0002 21.75C9.32384 21.75 6.78394 21.1659 4.50098 20.1182Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thin,
			...childParams,
		},
	),
);

// The Blocks Icon - Four squares in a grid.
export const BlocksIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.regular,
		height: commonProperties.size.regular,
		viewBox: '0 0 29 28',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M22.9111 2.80005C24.2857 2.80005 25.4 3.8991 25.4 5.25484L25.4 9.4453C25.4 10.801 24.2857 11.9001 22.9111 11.9001H19.1778C17.8032 11.9001 16.6889 10.801 16.6889 9.4453L16.6889 5.25484C16.6889 3.8991 17.8032 2.80005 19.1778 2.80005L22.9111 2.80005Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thick,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M5.48889 2.80005C4.11431 2.80005 3 3.8991 3 5.25484L3.00001 9.4453C3.00001 10.801 4.11432 11.9001 5.4889 11.9001H9.22223C10.5968 11.9001 11.7111 10.801 11.7111 9.4453L11.7111 5.25484C11.7111 3.8991 10.5968 2.80005 9.22222 2.80005L5.48889 2.80005Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thick,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M22.9111 16.1001C24.2857 16.1001 25.4 17.1991 25.4 18.5549V22.7453C25.4 24.101 24.2857 25.2001 22.9111 25.2001H19.1778C17.8032 25.2001 16.6889 24.101 16.6889 22.7453L16.6889 18.5549C16.6889 17.1991 17.8032 16.1001 19.1778 16.1001H22.9111Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thick,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M5.4889 16.1001C4.11432 16.1001 3.00001 17.1991 3.00001 18.5549L3.00001 22.7453C3.00001 24.101 4.11433 25.2001 5.4889 25.2001H9.22223C10.5968 25.2001 11.7111 24.101 11.7111 22.7453L11.7111 18.5549C11.7111 17.1991 10.5968 16.1001 9.22223 16.1001H5.4889Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thick,
			...childParams,
		},
	),
);

// The Check Icon - A simple tick mark.
export const CheckIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 24 24',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M4.5 12.75l6 6 9-13.5',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thin,
			...childParams,
		},
	),
);

// The Book Check Icon - A closed book with a tickmark.
export const BookCheckIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M2.66602 13.0007V3.00065C2.66602 2.55862 2.84161 2.1347 3.15417 1.82214C3.46673 1.50958 3.89065 1.33398 4.33268 1.33398H13.3327V14.6673H4.33268C3.89065 14.6673 3.46673 14.4917 3.15417 14.1792C2.84161 13.8666 2.66602 13.4427 2.66602 13.0007ZM2.66602 13.0007C2.66602 12.5586 2.84161 12.1347 3.15417 11.8221C3.46673 11.5096 3.89065 11.334 4.33268 11.334H13.3327',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M6 6.33333L7.33333 7.66667L10 5',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Clock Icon - A simple clock icon.
export const ClockIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 24 24',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thin,
			...childParams,
		},
	),
);

// The Close Icon - A simple 'x' mark.
export const CloseIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M4 12L12 4M4 4L12 12',
			...format.outlined,
			...childParams,
		},
	),
);

// The Copy Icon - Two squares, one behind the other.
export const CopyIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M2.4 10.8C1.63 10.8 1 10.17 1 9.4V2.4C1 1.63 1.63 1 2.4 1H9.4C10.17 1 10.8 1.63 10.8 2.4M6.6 5.2H13.6C14.3732 5.2 15 5.8268 15 6.6V13.6C15 14.3732 14.3732 15 13.6 15H6.6C5.8268 15 5.2 14.3732 5.2 13.6V6.6C5.2 5.8268 5.8268 5.2 6.6 5.2Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Copy & Close Icon - Two squares, one behind the other - but an X over the frontmost one.
export const CopyCloseIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M8 8L12.2 12.2M8 12.2L12.2 8M2.4 10.8C1.63 10.8 1 10.17 1 9.4V2.4C1 1.63 1.63 1 2.4 1H9.4C10.17 1 10.8 1.63 10.8 2.4M6.6 5.2H13.6C14.3732 5.2 15 5.8268 15 6.6V13.6C15 14.3732 14.3732 15 13.6 15H6.6C5.8268 15 5.2 14.3732 5.2 13.6V6.6C5.2 5.8268 5.8268 5.2 6.6 5.2Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Code Block Icon - A square with opening and closing angular brackets.
export const CodeBlockIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.regular,
		height: commonProperties.size.regular,
		viewBox: '0 0 28 28',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M11.1998 17.5L7.6998 14L11.1998 10.5M16.7998 10.5L20.2998 14L16.7998 17.5M5.5998 25.2C4.05341 25.2 2.7998 23.9464 2.7998 22.4V5.60005C2.7998 4.05365 4.05341 2.80005 5.5998 2.80005H22.3998C23.9462 2.80005 25.1998 4.05365 25.1998 5.60005V22.4C25.1998 23.9464 23.9462 25.2 22.3998 25.2H5.5998Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thick,
			...childParams,
		},
	),
);

// The Edit Icon - An icon of a square with a pencil on it.
export const EditIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M8 13.334H14',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M11 2.33218C11.2652 2.06697 11.6249 1.91797 12 1.91797C12.1857 1.91797 12.3696 1.95455 12.5412 2.02562C12.7128 2.09669 12.8687 2.20086 13 2.33218C13.1313 2.4635 13.2355 2.61941 13.3066 2.79099C13.3776 2.96257 13.4142 3.14647 13.4142 3.33218C13.4142 3.5179 13.3776 3.7018 13.3066 3.87338C13.2355 4.04496 13.1313 4.20086 13 4.33218L4.66667 12.6655L2 13.3322L2.66667 10.6655L11 2.33218Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The External Link Icon - An arrow exiting a square from the top-right.
export const ExternalLinkIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 12 12',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M5 3H3C2.44772 3 2 3.44772 2 4V9C2 9.55228 2.44772 10 3 10H8C8.55228 10 9 9.55228 9 9V7M7 2H10M10 2V5M10 2L5 7',
			...format.outlined,
			...childParams,
		},
	),
);

// The Layout Icon - A square with a header, sidebar, and footer content.
export const LayoutIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.regular,
		height: commonProperties.size.regular,
		viewBox: '0 0 29 28',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M2.2002 4.36921C2.2002 3.06073 3.27471 2 4.6002 2H23.8002C25.1257 2 26.2002 3.06073 26.2002 4.36921V23.6308C26.2002 24.9393 25.1257 26 23.8002 26H4.6002C3.27471 26 2.2002 24.9393 2.2002 23.6308V4.36921Z',
			...format.outlined,
			strokeWidth: 1.7,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M5.02918 6.12988C5.02918 5.47564 5.56643 4.94528 6.22918 4.94528H22.1714C22.8341 4.94528 23.3714 5.47564 23.3714 6.12988V9.13253C23.3714 9.78677 22.8341 10.3171 22.1714 10.3171H6.22918C5.56643 10.3171 5.02918 9.78677 5.02918 9.13253V6.12988Z',
			...format.outlined,
			strokeWidth: 1.7,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M9.75183 12.9683C10.4146 12.9683 10.9518 13.4986 10.9518 14.1529L10.9518 22.0893C10.9518 22.7435 10.4146 23.2739 9.75183 23.2739H6.2291C5.56636 23.2739 5.0291 22.7435 5.0291 22.0893L5.0291 14.1529C5.0291 13.4986 5.56636 12.9683 6.2291 12.9683H9.75183Z',
			...format.outlined,
			strokeWidth: 1.7,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M22.1714 12.9683C22.8341 12.9683 23.3714 13.4986 23.3714 14.1529V22.0893C23.3714 22.7435 22.8341 23.2739 22.1714 23.2739H14.6509C13.9881 23.2739 13.4509 22.7435 13.4509 22.0893V14.1529C13.4509 13.4986 13.9881 12.9683 14.6509 12.9683H22.1714Z',
			...format.outlined,
			strokeWidth: 1.7,
			...childParams,
		},
	),
);

// The Open Icon - A simple open icon indicating the sidebar to the right.
export const OpenIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
	  width: commonProperties.size.regular,
	  height: commonProperties.size.regular,
	  viewBox: '0 0 19 18',
	  fill: commonProperties.color.none,
	  ...svgParams,
	},
	el(
	  'path',
	  {
			d: 'M14.918 2.25H4.41797C3.58954 2.25 2.91797 2.92157 2.91797 3.75V14.25C2.91797 15.0784 3.58954 15.75 4.41797 15.75H14.918C15.7464 15.75 16.418 15.0784 16.418 14.25V3.75C16.418 2.92157 15.7464 2.25 14.918 2.25Z',
			...format.outlined,
			...childParams,
	  },
	),
	el(
	  'path',
	  {
			d: 'M7.41797 2.25V15.75',
			...format.outlined,
			...childParams,
	  },
	),
	el(
	  'path',
	  {
			d: 'M11.168 6.75L13.418 9L11.168 11.25',
			...format.outlined,
			...childParams,
	  },
	),
);

// The Page Icon - A rounded square with a title area and a content area with lines for content.
export const PageIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.regular,
		height: commonProperties.size.regular,
		viewBox: '0 0 29 28',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M3.7 9.10005H24.7M21.2 14H7.2M15.6 19.6H7.2M7.2 25.2H21.2C23.5196 25.2 25.4 23.3196 25.4 21V7.00005C25.4 4.68045 23.5196 2.80005 21.2 2.80005H7.2C4.8804 2.80005 3 4.68045 3 7.00005V21C3 23.3196 4.8804 25.2 7.2 25.2Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thick,
			...childParams,
		},
	),
);

// The Reset Icon - A simple reset icon.
export const ResetIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
	  width: commonProperties.size.small,
	  height: commonProperties.size.small,
	  viewBox: '0 0 18 18',
	  fill: commonProperties.color.none,
	  ...svgParams,
	},
	el(
	  'path',
	  {
			d: 'M15.75 1.5V6H11.25',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
	  },
	),
	el(
	  'path',
	  {
			d: 'M15.7516 9.75011C15.5923 11.2546 14.9323 12.6619 13.8774 13.7463C12.8225 14.8307 11.4338 15.5293 9.93435 15.7299C8.43486 15.9306 6.91143 15.6217 5.60853 14.8528C4.30562 14.0839 3.29878 12.8997 2.74957 11.49C2.20035 10.0804 2.14061 8.52708 2.57993 7.07942C3.01925 5.63175 3.93216 4.37364 5.17216 3.50696C6.41217 2.64029 7.90737 2.2153 9.41784 2.30019C10.9283 2.38509 12.3665 2.97494 13.5016 3.97511L15.7516 6.00011',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
	  },
	),
);

// The Regenerate Icon - Two curved arrows forming a circle.
export const RegenerateIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.32263 2.00631 4.71265 2.66082 3.50667 3.82667L2 5.33333',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M2 2V5.33333H5.33333',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14C9.67737 13.9937 11.2874 13.3392 12.4933 12.1733L14 10.6667',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M10.666 10.666H13.9993V13.9993',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Content Add Icon - Three lines indicating sencences, with a plus on the right of the middle line.
export const ContentAddIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M7.33333 8H2',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M10.6667 4H2',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M10.6667 12H2',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M12 6V10',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M14 8H10',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Content Remove Icon - Three lines indicating sencences, with a minus on the right of the middle line.
export const ContentRemoveIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M7.33333 8H2',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M10.6667 4H2',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M10.6667 12H2',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M14 8H10',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Content Insert Icon - Three lines indicating sencences, with an arrow on the left of the middle line.
export const ContentInsertIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M2 5.33333L4.66667 8L2 10.6667M14 8H7.33333M14 4H7.33333M14 12H7.33333',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Content Replace Icon - Three lines indicating sencences, with a looping arrow on the right of the last two lines.
export const ContentReplaceIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 14 14',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M12.25 3.5H1.75M4.08333 7H1.75M4.08333 10.5H1.75M7 10.5C7.36729 10.9897 7.87937 11.3515 8.46368 11.534C9.04799 11.7165 9.67492 11.7106 10.2557 11.517C10.8364 11.3234 11.3415 10.952 11.6995 10.4554C12.0574 9.9588 12.25 9.36216 12.25 8.75C12.25 8.05381 11.9734 7.38613 11.4812 6.89385C10.9889 6.40156 10.3212 6.125 9.625 6.125C8.84917 6.125 8.14333 6.44 7.63583 6.9475L6.41667 8.16667M6.41667 8.16667V5.83333M6.41667 8.16667H8.75',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Content Overwrite Icon - Three lines indicating sencences, inside a frame of four corners to indicate the entire content.
export const ContentOverwriteIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M2 4.66667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H4.66667M11.3333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V4.66667M14 11.3333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H11.3333M4.66667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V11.3333M4.66667 5.33333H10M4.66667 8H11.3333M4.66667 10.6667H8.66667',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Small Arrow Icons - The left and right wedge icons.
export const SmallArrowIcons = ( svgParams = {}, childParams = {} ) => ( {
	left: el(
		'svg',
		{
			width: commonProperties.size.small,
			height: commonProperties.size.small,
			viewBox: '0 0 16 16',
			fill: commonProperties.color.none,
			...svgParams,
		},
		el(
			'path',
			{
				d: 'M10 12L6 8L10 4',
				...format.outlined,
				strokeWidth: commonProperties.stroke.regular,
				...childParams,
			},
		),
	),
	right: el(
		'svg',
		{
			width: commonProperties.size.small,
			height: commonProperties.size.small,
			viewBox: '0 0 16 16',
			fill: commonProperties.color.none,
			...svgParams,
		},
		el(
			'path',
			{
				d: 'M6 12L10 8L6 4',
				...format.outlined,
				strokeWidth: commonProperties.stroke.regular,
				...childParams,
			},
		),
	),
} );

// The Arrow Down Icon - An arrow pointing down.
export const ArrowDown = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M8 3.33398V12.6673',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thick,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M12.6654 8L7.9987 12.6667L3.33203 8',
			...format.outlined,
			strokeWidth: commonProperties.stroke.thick,
			...childParams,
		},
	),
);

// The Smiley Icon - A simple smiley face.
export const SmileyIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M8.00065 14.6673C11.6825 14.6673 14.6673 11.6825 14.6673 8.00065C14.6673 4.31875 11.6825 1.33398 8.00065 1.33398C4.31875 1.33398 1.33398 4.31875 1.33398 8.00065C1.33398 11.6825 4.31875 14.6673 8.00065 14.6673Z',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M5.33398 9.33398C5.33398 9.33398 6.33398 10.6673 8.00065 10.6673C9.66732 10.6673 10.6673 9.33398 10.6673 9.33398',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M6 6H6.00889',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M10 6H10.0089',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Translate Icon - A Japanese character next to an 'A'.
export const TranslateIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.small,
		height: commonProperties.size.small,
		viewBox: '0 0 16 16',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'path',
		{
			d: 'M3.33398 5.33398L7.33398 9.33398',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M2.66602 9.33398L6.66602 5.33398L7.99935 3.33398',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M1.33398 3.33398H9.33398',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M4.66602 1.33398H5.33268',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M14.6667 14.6667L11.3333 8L8 14.6667',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
	el(
		'path',
		{
			d: 'M9.33398 12H13.334',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
		},
	),
);

// The Wand Icon - A wand tilting to the top-left, with lines shining out of the top end.
export const WandIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
		width: commonProperties.size.regular,
		height: commonProperties.size.regular,
		viewBox: '0 0 28 28',
		fill: commonProperties.color.none,
		...svgParams,
	},
	el(
		'g',
		{
			clipPath: 'url(#clip_spec_ai_wand)',
		},
		el(
			'path',
			{
				d: 'M15.4712 1.71924C15.4712 0.917724 14.8013 0.23584 13.9998 0.23584C13.1982 0.23584 12.5164 0.917724 12.5164 1.71924V5.36791C12.5164 6.16943 13.1982 6.83935 13.9998 6.83935C14.8013 6.83935 15.4712 6.16943 15.4712 5.36791V1.71924ZM19.1558 6.83935C18.6054 7.40161 18.6054 8.35865 19.1798 8.93286C19.73 9.48316 20.6989 9.48316 21.2612 8.90893L23.7614 6.40869C24.3237 5.8584 24.3118 4.88941 23.7376 4.31518C23.1873 3.75293 22.2183 3.77685 21.656 4.33911L19.1558 6.83935ZM6.72632 8.90893C7.28858 9.48316 8.25757 9.48316 8.80786 8.93286C9.38208 8.35865 9.38208 7.40161 8.8318 6.83935L6.34351 4.33911C5.78125 3.77685 4.81226 3.75293 4.26197 4.31518C3.68774 4.87744 3.68774 5.84643 4.23805 6.39672L6.72632 8.90893ZM23.283 26.1235C24.0007 26.8532 25.2209 26.8413 25.9267 26.1235C26.6327 25.3937 26.6327 24.2095 25.9267 23.4797L14.574 12.0432C13.8562 11.3254 12.636 11.3254 11.9302 12.0432C11.2124 12.773 11.2244 13.9573 11.9302 14.675L23.283 26.1235ZM1.63013 12.5935C0.828614 12.5935 0.158691 13.2634 0.158691 14.0649C0.158691 14.8665 0.828614 15.5364 1.63013 15.5364H5.27881C6.08032 15.5364 6.76221 14.8665 6.76221 14.0649C6.76221 13.2634 6.08032 12.5935 5.27881 12.5935H1.63013ZM26.3574 15.5364C27.1589 15.5364 27.8409 14.8665 27.8409 14.0649C27.8409 13.2634 27.1589 12.5935 26.3574 12.5935H22.7207C21.9192 12.5935 21.2372 13.2634 21.2372 14.0649C21.2372 14.8665 21.9192 15.5364 22.7207 15.5364H26.3574ZM16.8469 17.7375L13.1145 13.9932C12.8154 13.7061 12.7078 13.3352 13.0068 13.0481C13.27 12.7849 13.6528 12.8806 13.9519 13.1797L17.6604 16.9002L16.8469 17.7375ZM4.23805 21.6972C3.67579 22.2595 3.66382 23.2285 4.21411 23.7788C4.77636 24.353 5.74536 24.3651 6.30761 23.8147L8.80786 21.3145C9.37011 20.7522 9.38208 19.7951 8.8318 19.2328C8.26954 18.6706 7.30055 18.6587 6.73829 19.209L4.23805 21.6972ZM15.4712 22.774C15.4712 21.9725 14.8013 21.2905 13.9998 21.2905C13.1982 21.2905 12.5164 21.9725 12.5164 22.774V26.4107C12.5164 27.2121 13.1982 27.8941 13.9998 27.8941C14.8013 27.8941 15.4712 27.2121 15.4712 26.4107V22.774Z',
				...format.filled,
				...childParams,
			},
		),
	),
	el(
		'defs',
		null,
		el(
			'clipPath',
			{
				id: 'clip_spec_ai_wand',
			},
			el(
				'rect',
				{
					width: 28,
					height: 28,
					fill: commonProperties.color.white,
					...childParams,
				},
			),
		),
	),
);

// The Trash Icon - A simple trash can.
export const TrashIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
	  width: commonProperties.size.small,
	  height: commonProperties.size.small,
	  viewBox: '0 0 16 16',
	  fill: commonProperties.color.none,
	  ...svgParams,
	},
	el(
	  'path',
	  {
			d: 'M2 4.00065H14M12.6667 4.00065V13.334C12.6667 14.0007 12 14.6673 11.3333 14.6673H4.66667C4 14.6673 3.33333 14.0007 3.33333 13.334V4.00065M5.33333 4.00065V2.66732C5.33333 2.00065 6 1.33398 6.66667 1.33398H9.33333C10 1.33398 10.6667 2.00065 10.6667 2.66732V4.00065',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
	  },
	),
);

// The Send Icon - An arrow pointing rightward
export const SendIcon = ( svgParams = {}, childParams = {} ) => el(
	'svg',
	{
	  width: commonProperties.size.small,
	  height: commonProperties.size.small,
	  viewBox: '0 0 16 16',
	  fill: commonProperties.color.none,
	  ...svgParams,
	},
	el(
	  'path',
	  {
			d: 'M4.00035 7.99998L2.17969 2.08398C6.53489 3.35043 10.6419 5.35118 14.3237 7.99998C10.6422 10.6492 6.53541 12.6504 2.18035 13.9173L4.00035 7.99998ZM4.00035 7.99998H9.00035',
			...format.outlined,
			strokeWidth: commonProperties.stroke.regular,
			...childParams,
	  },
	),
);

// The Translucent Icon Set.
export const translucentSet = {

	// The Translate Icon - A folded page with A in the front and a Japanese character behind.
	translateIcon: ( svgParams = {} ) => el(
		'svg',
		{
			width: commonProperties.size.regular,
			height: commonProperties.size.regular,
			viewBox: '0 0 20 20',
			fill: commonProperties.color.none,
			...svgParams,
		},
		el(
			'g',
			{
				clipPath: 'url(#zip_ai_translucent_set_translate_clip)',
			},
			el(
				'mask',
				{
					id: 'zip_ai_translucent_set_translate_mask',
					style: { maskType: 'luminance' },
					maskUnits: 'userSpaceOnUse',
					x: 0,
					y: 0,
					width: 20,
					height: 20,
				},
				el(
					'path',
					{
						d: 'M20 0H0V20H20V0Z',
						fill: commonProperties.color.none,
					},
				),
			),
			el(
				'g',
				{
					mask: 'url(#zip_ai_translucent_set_translate_mask)',
				},
				el(
					'path',
					{
						d: 'M17.0894 9.95182e-08H2.86902C2.10845 0.0011001 1.37934 0.303724 0.841531 0.841531C0.303724 1.37934 0.00109989 2.10845 0 2.86902V17.131C0.00109989 17.8915 0.303724 18.6207 0.841531 19.1584C1.37934 19.6963 2.10845 19.9989 2.86902 20H17.131C17.8916 19.9989 18.6207 19.6963 19.1584 19.1584C19.6962 18.6207 19.9989 17.8915 20 17.131V2.84407C19.9826 2.08372 19.6683 1.36038 19.1243 0.828843C18.5804 0.297306 17.8499 -0.00019865 17.0894 9.95182e-08Z',
						...format.filled,
						fill: commonProperties.color.white,
					},
				),
			),
			el(
				'path',
				{
					d: 'M15.2118 6.56641H9.524L10.3498 13.3547L8.85156 15.1588L9.096 15.5257H15.2118L15.6702 15.1588V6.99453L15.2118 6.56641Z',
					...format.filled,
					fillOpacity: 0.25,
				},
			),
			el(
				'path',
				{
					d: 'M8.60323 10.2789C8.58423 10.1838 7.92954 6.91022 7.90873 6.80647C7.87635 6.64416 7.73379 6.52734 7.56829 6.52734H6.87379C6.70829 6.52734 6.56573 6.64416 6.53329 6.80647C6.51223 6.91197 5.85685 10.1888 5.83884 10.2788C5.80123 10.467 5.9232 10.6498 6.11124 10.6875C6.29929 10.7251 6.48223 10.6031 6.51985 10.415L6.74179 9.30528H7.70029L7.92223 10.4151C7.95985 10.6032 8.14292 10.7251 8.33085 10.6875C8.51885 10.6498 8.64085 10.467 8.60323 10.2789ZM6.88067 8.61078L7.15848 7.22184H7.2836L7.56142 8.61078H6.88067Z',
					...format.filled,
				},
			),
			el(
				'path',
				{
					d: 'M14.1681 9.30583H13.1264V8.95858C13.1264 8.76683 12.9709 8.61133 12.7792 8.61133C12.5874 8.61133 12.4319 8.76683 12.4319 8.95858V9.30583H11.3902C11.1984 9.30583 11.043 9.46127 11.043 9.65308C11.043 9.84483 11.1984 10.0003 11.3902 10.0003H11.4742C11.6721 10.6395 11.97 11.1301 12.2978 11.5233C12.031 11.7673 11.761 11.9675 11.5205 12.1598C11.3708 12.2796 11.3465 12.4981 11.4663 12.6479C11.5862 12.7977 11.8047 12.8218 11.9543 12.7021C12.1962 12.5086 12.486 12.2936 12.7792 12.0246C13.0725 12.2938 13.3628 12.5092 13.604 12.7021C13.7537 12.8219 13.9722 12.7976 14.092 12.6479C14.2118 12.4981 14.1875 12.2796 14.0378 12.1598C13.7979 11.9679 13.5276 11.7676 13.2605 11.5233C13.5883 11.1301 13.8862 10.6395 14.0841 10.0003H14.1681C14.3599 10.0003 14.5153 9.84483 14.5153 9.65308C14.5153 9.46127 14.3599 9.30583 14.1681 9.30583ZM12.7792 11.013C12.5575 10.7347 12.3581 10.4026 12.2078 9.99802H13.3505C13.2002 10.4026 13.0008 10.7347 12.7792 11.013Z',
					...format.filled,
				},
			),
			el(
				'path',
				{
					d: 'M14.885 6.18079H9.87539L9.72657 4.98671C9.66151 4.46651 9.21714 4.07422 8.69289 4.07422H5.11594C4.54153 4.07422 4.07422 4.54153 4.07422 5.11593V12.7784C4.07422 13.3527 4.54153 13.82 5.11594 13.82H8.04395L8.19089 15.0142C8.25576 15.5333 8.70014 15.9267 9.22458 15.9267H14.885C15.4593 15.9267 15.9266 15.4594 15.9266 14.8849V7.22254C15.9266 6.6481 15.4593 6.18079 14.885 6.18079ZM5.11594 13.1256C4.92447 13.1256 4.7687 12.9698 4.7687 12.7784V5.11593C4.7687 4.92447 4.92447 4.76869 5.11594 4.76869H8.69289C8.86764 4.76869 9.01576 4.89944 9.03745 5.07274C9.08776 5.47637 9.99132 12.7252 10.0413 13.1256H5.11594ZM8.8597 14.7634L8.74364 13.82H9.67526L8.8597 14.7634ZM15.2321 14.8849C15.2321 15.0764 15.0764 15.2322 14.885 15.2322H9.37251L10.6944 13.7031C10.7621 13.6267 10.7924 13.5254 10.7784 13.4247L9.96195 6.87529H14.885C15.0764 6.87529 15.2321 7.03104 15.2321 7.22254V14.8849Z',
					...format.filled,
				},
			),
		),
		el(
			'defs',
			{},
			el(
				'clipPath',
				{
					id: 'zip_ai_translucent_set_translate_clip',
				},
				el(
					'rect',
					{
						width: 20,
						height: 20,
						fill: commonProperties.color.white,
					},
				),
			),
		),
	),

	// The Pencil Icon - a pencil pointing down-left.
	pencilIcon: ( svgParams = {} ) => el(
		'svg',
		{
			width: commonProperties.size.regular,
			height: commonProperties.size.regular,
			viewBox: '0 0 20 20',
			fill: 'none',
			...svgParams,
		},
		el(
			'g',
			{
				clipPath: 'url(#zip_ai_translucent_set_pencil_clip)',
			},
			el(
				'mask',
				{
					id: 'zip_ai_translucent_set_pencil_mask',
					style: { maskType: 'luminance' },
					maskUnits: 'userSpaceOnUse',
					x: 0,
					y: 0,
					width: 20,
					height: 20,
				},
				el(
					'path',
					{
						d: 'M20 0H0V20H20V0Z',
						fill: commonProperties.color.white,
					},
				),
			),
			el(
				'g',
				{
					mask: 'url(#zip_ai_translucent_set_pencil_mask)',
				},
				el(
					'path',
					{
						d: 'M17.0894 9.94679e-08H2.86902C2.10845 0.00109999 1.37934 0.303724 0.841531 0.841531C0.303724 1.37934 0.00109989 2.10845 0 2.86902V17.131C0.00109989 17.8916 0.303724 18.6207 0.841531 19.1584C1.37934 19.6962 2.10845 19.9989 2.86902 20H17.131C17.8916 19.9989 18.6207 19.6962 19.1584 19.1584C19.6962 18.6207 19.9989 17.8916 20 17.131V2.84407C19.9826 2.08372 19.6683 1.36038 19.1243 0.828844C18.5804 0.297305 17.8499 -0.0001986 17.0894 9.94679e-08Z',
						fill: commonProperties.color.none,
					},
				),
			),
			el(
				'path',
				{
					d: 'M10.8966 6.22266L5.72334 11.3959C5.59051 11.5288 5.52409 11.5952 5.48042 11.6768C5.43676 11.7583 5.41833 11.8505 5.38149 12.0347L4.77038 15.0903C4.7288 15.2982 4.70801 15.4021 4.76714 15.4612C4.82627 15.5203 4.93021 15.4995 5.13809 15.458L8.19368 14.8468C8.37787 14.81 8.46999 14.7916 8.55156 14.7479C8.63318 14.7043 8.69962 14.6378 8.83243 14.505L14.0057 9.33172L10.8966 6.22266Z',
					...format.filled,
					fillOpacity: 0.25,
				},
			),
			el(
				'path',
				{
					d: 'M8.34623 14.6906C8.22654 14.7584 8.09511 14.791 7.95842 14.825C7.94836 14.8275 7.93823 14.83 7.92811 14.8326L5.67534 15.3958L5.6602 15.3995C5.65418 15.401 5.64809 15.4026 5.64196 15.4041C5.54567 15.4282 5.43676 15.4555 5.3441 15.4646C5.24089 15.4747 5.05387 15.4738 4.90307 15.323C4.75227 15.1721 4.75134 14.9851 4.76144 14.882C4.7705 14.7893 4.79779 14.6803 4.82193 14.5841C4.82346 14.5779 4.82499 14.5718 4.82649 14.5658L5.39347 12.2979C5.396 12.2878 5.39851 12.2777 5.40101 12.2676C5.43499 12.1309 5.46765 11.9995 5.5354 11.8798C5.60315 11.7601 5.69905 11.6645 5.79882 11.565C5.80616 11.5577 5.81353 11.5503 5.82091 11.543L11.6877 5.67624L11.7044 5.65948C11.8984 5.46552 12.0697 5.29411 12.2265 5.17453C12.3964 5.04491 12.5923 4.94141 12.8367 4.94141C13.0811 4.94141 13.277 5.04491 13.4469 5.17453C13.6037 5.2941 13.775 5.46551 13.969 5.65947L13.9857 5.67624L14.5498 6.24029L14.5665 6.25708C14.7605 6.45096 14.9319 6.62239 15.0515 6.77908C15.1811 6.94896 15.2846 7.14496 15.2846 7.38933C15.2846 7.63377 15.1811 7.82971 15.0515 7.99958C14.9319 8.15633 14.7605 8.32771 14.5665 8.52164L14.5498 8.53839L8.68304 14.4051C8.67567 14.4125 8.66829 14.4199 8.66098 14.4272C8.56154 14.527 8.46586 14.6229 8.34623 14.6906ZM8.34623 14.6906L8.16148 14.3643',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
			el(
				'path',
				{
					d: 'M10.8945 6.22266L14.0037 9.33173',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
		),
		el(
			'defs',
			{},
			el(
				'clipPath',
				{
					id: 'zip_ai_translucent_set_pencil_clip',
				},
				el(
					'rect',
					{
						width: 20,
						height: 20,
						fill: commonProperties.color.white,
					},
				),
			),
		),
	),

	// The Code Icon - A slash between two angular brackets.
	codeIcon: ( svgParams = {} ) => el(
		'svg',
		{
			width: commonProperties.size.regular,
			height: commonProperties.size.regular,
			viewBox: '0 0 20 20',
			fill: commonProperties.color.none,
			...svgParams,
		},
		el(
			'g',
			{
				clipPath: 'url(#zip_ai_translucent_set_code_clip)',
			},
			el(
				'mask',
				{
					id: 'zip_ai_translucent_set_code_mask',
					style: { maskType: 'luminance' },
					maskUnits: 'userSpaceOnUse',
					x: 0,
					y: 0,
					width: 20,
					height: 20,
				},
				el(
					'path',
					{
						d: 'M20 0H0V20H20V0Z',
						fill: commonProperties.color.white,
					},
				),
			),
			el(
				'g',
				{
					mask: 'url(#zip_ai_translucent_set_code_mask)',
				},
				el(
					'path',
					{
						d: 'M17.0894 9.94679e-08H2.86902C2.10845 0.00109999 1.37934 0.303724 0.841531 0.841531C0.303724 1.37934 0.00109989 2.10845 0 2.86902V17.131C0.00109989 17.8916 0.303724 18.6207 0.841531 19.1584C1.37934 19.6962 2.10845 19.9989 2.86902 20H17.131C17.8916 19.9989 18.6207 19.6962 19.1584 19.1584C19.6962 18.6207 19.9989 17.8916 20 17.131V2.84407C19.9826 2.08372 19.6683 1.36038 19.1243 0.828844C18.5804 0.297305 17.8499 -0.0001986 17.0894 9.94679e-08Z',
						fill: commonProperties.color.none,
					},
				),
			),
			el(
				'path',
				{
					d: 'M7.10807 7.05957L3.66406 9.86632L7.10807 12.6731',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
			el(
				'path',
				{
					d: 'M12.8945 12.6731L16.3385 9.86632L12.8945 7.05957',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
			el(
				'path',
				{
					d: 'M11.07 5.93262L8.92969 14.0682',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			)
		),
		el(
			'defs',
			{},
			el(
				'clipPath',
				{
					id: 'zip_ai_translucent_set_code_clip',
				},
				el(
					'rect',
					{
						width: 20,
						height: 20,
						fill: commonProperties.color.white,
					},
				),
			),
		),
	),

	// The Layers Icon - A stack of isometric cards one on top of another.
	layersIcon: ( svgParams = {} ) => el(
		'svg',
		{
			width: commonProperties.size.regular,
			height: commonProperties.size.regular,
			viewBox: '0 0 20 20',
			fill: commonProperties.color.none,
			...svgParams,
		},
		el(
			'path',
			{
				d: 'M9.64707 4.57713L9.64707 4.57713L9.64911 4.57618C9.86656 4.47461 10.11 4.47461 10.3275 4.57618L10.3274 4.57618L10.3295 4.57713L15.4525 6.94209C15.4714 6.95246 15.4861 6.9665 15.4945 6.97869C15.4977 6.98334 15.4993 6.98653 15.4999 6.98825C15.4995 7.00094 15.4961 7.01005 15.4901 7.01903C15.4829 7.02978 15.4704 7.04221 15.4525 7.05205L10.3295 9.41701L10.3295 9.417L10.3275 9.41795C10.11 9.51953 9.86656 9.51953 9.64911 9.41795L9.64707 9.41701L4.52488 7.05241C4.51721 7.04796 4.51352 7.04351 4.51089 7.03912C4.50777 7.03393 4.5 7.01825 4.5 6.98534C4.5 6.97323 4.50311 6.96473 4.50697 6.95851C4.51044 6.9529 4.51595 6.94688 4.52487 6.94173L9.64707 4.57713Z',
				...format.outlined,
				strokeWidth: commonProperties.stroke.one,
				fill: commonProperties.color.currentColor,
				fillOpacity: 0.25,
			},
		),
		el(
			'path',
			{
				d: 'M15.6719 9.49569C15.8594 9.58953 16 9.77721 16 9.98836C16 10.223 15.8594 10.4106 15.6719 10.5045L10.5391 12.874C10.1875 13.0382 9.78906 13.0382 9.4375 12.874L4.30469 10.5045C4.11719 10.4106 4 10.223 4 9.98836C4 9.77721 4.11719 9.58953 4.30469 9.49569L5.57031 8.90918L9.13281 10.5514C9.67188 10.8095 10.3047 10.8095 10.8438 10.5514L14.4062 8.90918L15.6719 9.49569Z',
				...format.filled,
				fillOpacity: 0.25,
			},
		),
		el(
			'path',
			{
				d: 'M14.4062 11.9121L10.8438 13.5543C10.3047 13.8124 9.67188 13.8124 9.13281 13.5543L5.57031 11.9121L4.30469 12.4986C4.11719 12.5925 4 12.7801 4 12.9913C4 13.2259 4.11719 13.4136 4.30469 13.5074L9.4375 15.8769C9.78906 16.0411 10.1875 16.0411 10.5391 15.8769L15.6719 13.5074C15.8594 13.4136 16 13.2259 16 12.9913C16 12.7801 15.8594 12.5925 15.6719 12.4986L14.4062 11.9121Z',
				...format.filled,
				fillOpacity: 0.25,
			},
		),
	),

	// The Description Icon - A card with a paragraph of text below it.
	descriptionIcon: ( svgParams = {} ) => el(
		'svg',
		{
			width: commonProperties.size.regular,
			height: commonProperties.size.regular,
			viewBox: '0 0 20 20',
			fill: commonProperties.color.none,
			...svgParams,
		},
		el(
			'g',
			{
				clipPath: 'url(#zip_ai_translucent_set_description_clip)',
			},
			el(
				'mask',
				{
					id: 'zip_ai_translucent_set_description_mask',
					style: { maskType: 'luminance' },
					maskUnits: 'userSpaceOnUse',
					x: 0,
					y: 0,
					width: 20,
					height: 20,
				},
				el(
					'path',
					{
						d: 'M20 0H0V20H20V0Z',
						fill: commonProperties.color.white,
					},
				),
			),
			el(
				'g',
				{
					mask: 'url(#zip_ai_translucent_set_description_mask)',
				},
				el(
					'path',
					{
						d: 'M17.0894 9.95182e-08H2.86902C2.10845 0.0011001 1.37934 0.303724 0.841531 0.841531C0.303724 1.37934 0.00109989 2.10845 0 2.86902V17.131C0.00109989 17.8915 0.303724 18.6207 0.841531 19.1584C1.37934 19.6963 2.10845 19.9989 2.86902 20H17.131C17.8916 19.9989 18.6207 19.6963 19.1584 19.1584C19.6962 18.6207 19.9989 17.8915 20 17.131V2.84407C19.9826 2.08372 19.6683 1.36038 19.1243 0.828843C18.5804 0.297306 17.8499 -0.00019865 17.0894 9.95182e-08Z',
						fill: commonProperties.color.none,
					},
				),
			),
			el(
				'path',
				{
					d: 'M15.6076 12.8594H4.39062',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
			el(
				'path',
				{
					d: 'M15.6076 14.8594H4.39062',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
			el(
				'path',
				{
					d: 'M13.5742 16.8594H6.42578',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
			el(
				'path',
				{
					d: 'M7.00476 4.83761H6.31051C6.28332 4.83761 6.26969 4.83761 6.25838 4.83551C6.20757 4.82605 6.16781 4.78629 6.15836 4.73548C6.15625 4.72414 6.15625 4.71054 6.15625 4.68334C6.15625 4.41135 6.15625 4.27535 6.17733 4.16202C6.27188 3.65383 6.66944 3.25624 7.17763 3.16171C7.29094 3.14063 7.42694 3.14062 7.69894 3.14062H12.25C12.5219 3.14062 12.6579 3.14063 12.7713 3.16171C13.2795 3.25624 13.6771 3.65383 13.7716 4.16202C13.7927 4.27535 13.7927 4.41135 13.7927 4.68334C13.7927 4.71054 13.7927 4.72414 13.7906 4.73548C13.7811 4.78629 13.7414 4.82605 13.6906 4.83551C13.6792 4.83761 13.6656 4.83761 13.6384 4.83761H12.9442V7.42855C12.9442 8.60711 12.9442 9.19636 12.5781 9.56249C12.2119 9.92855 11.6227 9.92855 10.4442 9.92855H9.50476C8.32626 9.92855 7.73694 9.92855 7.37088 9.56249C7.00476 9.19636 7.00476 8.60711 7.00476 7.42855V4.83761Z',
					...format.filled,
					fillOpacity: 0.25,
				},
			),
			el(
				'path',
				{
					d: 'M7.00476 4.83761V7.42855C7.00476 8.60711 7.00476 9.19636 7.37088 9.56249C7.73694 9.92855 8.32626 9.92855 9.50476 9.92855H10.4442C11.6227 9.92855 12.2119 9.92855 12.5781 9.56249C12.9442 9.19636 12.9442 8.60711 12.9442 7.42855V4.83761M7.00476 4.83761H12.9442M7.00476 4.83761H6.31051C6.28332 4.83761 6.26969 4.83761 6.25838 4.83551C6.20757 4.82605 6.16781 4.78629 6.15836 4.73548C6.15625 4.72414 6.15625 4.71054 6.15625 4.68334C6.15625 4.41135 6.15625 4.27535 6.17733 4.16202C6.27188 3.65383 6.66944 3.25624 7.17763 3.16171C7.29094 3.14063 7.42694 3.14062 7.69894 3.14062H12.25C12.5219 3.14062 12.6579 3.14063 12.7713 3.16171C13.2795 3.25624 13.6771 3.65383 13.7716 4.16202C13.7927 4.27535 13.7927 4.41135 13.7927 4.68334C13.7927 4.71054 13.7927 4.72414 13.7906 4.73548C13.7811 4.78629 13.7414 4.82605 13.6906 4.83551C13.6792 4.83761 13.6656 4.83761 13.6384 4.83761H12.9442',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
			el(
				'path',
				{
					d: 'M9.125 8.23145H10.822',
					...format.outlined,
					strokeWidth: commonProperties.stroke.one,
				},
			),
		),
		el(
			'defs',
			{},
			el(
				'clipPath',
				{
					id: 'zip_ai_translucent_set_description_clip',
				},
				el(
					'rect',
					{
						width: 20,
						height: 20,
						fill: commonProperties.color.white,
					},
				),
			),
		),
	),

	// The Chat Bubble Icon - a squircle chat bubble.
	chatBubbleIcon: ( svgParams = {} ) => el(
		'svg',
		{
			width: 20,
			height: 20,
			viewBox: '0 0 20 20',
			fill: commonProperties.color.none,
			...svgParams,
		},
		el(
			'g',
			{
				clipPath: 'url(#zip_ai_translucent_set_chat_bubble_clip)',
			},
			el(
				'mask',
				{
					id: 'zip_ai_translucent_set_chat_bubble_mask',
					style: { maskType: 'luminance' },
					maskUnits: 'userSpaceOnUse',
					x: 0,
					y: 0,
					width: 20,
					height: 20,
				},
				el(
					'path',
					{
						d: 'M20 0H0V20H20V0Z',
						fill: commonProperties.color.white,
					},
				),
			),
			el(
				'g',
				{
					mask: 'url(#zip_ai_translucent_set_chat_bubble_mask)',
				},
				el(
					'path',
					{
						d: 'M17.0894 9.95178e-08H2.86902C2.10845 0.0011001 1.37934 0.303726 0.841531 0.841532C0.303724 1.37934 0.00109989 2.10845 0 2.86902V17.131C0.00109989 17.8916 0.303724 18.6207 0.841531 19.1584C1.37934 19.6963 2.10845 19.9989 2.86902 20H17.131C17.8916 19.9989 18.6207 19.6963 19.1584 19.1584C19.6962 18.6207 19.9989 17.8916 20 17.131V2.84408C19.9826 2.08373 19.6683 1.36038 19.1243 0.828844C18.5804 0.297307 17.8499 -0.00019865 17.0894 9.95178e-08Z',
						fill: commonProperties.color.none,
					},
				),
			),
			el(
				'path',
				{
					d: 'M4.41797 12.358V6.41956L6.88217 4.40285L13.1931 4.21387L15.4984 6.41956V11.6964L14.5535 13.1324L12.5885 14.1053H10.8124L8.16704 15.6643L7.57623 15.2486L7.78911 14.1053H7.57623L6.01714 13.6527L4.41797 12.358Z',
					...format.filled,
					fillOpacity: 0.25,
				},
			),
			el(
				'path',
				{
					d: 'M10.0022 8.344H7.5135C7.25581 8.344 7.04688 8.14281 7.04688 7.89463C7.04688 7.6465 7.25581 7.44531 7.5135 7.44531H10.0022C10.2599 7.44531 10.4689 7.6465 10.4689 7.89463C10.4689 8.14281 10.2599 8.344 10.0022 8.344Z',
					...format.filled,
				},
			),
			el(
				'path',
				{
					d: 'M7.04688 10.2912C7.04688 10.043 7.25581 9.8418 7.5135 9.8418H12.491C12.7487 9.8418 12.9576 10.043 12.9576 10.2912C12.9576 10.5394 12.7487 10.7405 12.491 10.7405H7.5135C7.25581 10.7405 7.04688 10.5394 7.04688 10.2912Z',
					...format.filled,
				},
			),
			el(
				'path',
				{
					d: 'M9.35681 3.84961H10.643C11.4964 3.84961 12.1655 3.84961 12.7033 3.89192C13.2509 3.935 13.7033 4.02419 14.1128 4.2251C14.786 4.55539 15.3333 5.08242 15.6763 5.73065C15.8849 6.12496 15.9775 6.56058 16.0223 7.08796C16.0662 7.60577 16.0662 8.25015 16.0662 9.07196V10.7236C16.0662 10.8773 16.0662 10.9709 16.0622 11.0524C15.9749 12.827 14.5006 14.2467 12.6578 14.3307C12.5731 14.3346 12.4662 14.3346 12.2888 14.3346H12.2711L12.2242 14.3346C11.6847 14.3379 11.1591 14.5001 10.7181 14.7995L10.6874 14.8204L9.06312 15.9377C8.12706 16.5815 6.897 15.6517 7.32419 14.6232C7.38162 14.485 7.27594 14.3346 7.12131 14.3346H6.74688C5.19315 14.3346 3.93359 13.1216 3.93359 11.6255V9.07196C3.93359 8.25015 3.93359 7.60577 3.97753 7.08796C4.02226 6.56058 4.11488 6.12496 4.32352 5.73065C4.66651 5.08242 5.21381 4.55539 5.88697 4.2251C6.29644 4.02419 6.74888 3.935 7.29644 3.89192C7.83425 3.84961 8.50338 3.84961 9.35681 3.84961ZM7.37244 4.78765C6.88256 4.82619 6.56669 4.90026 6.31069 5.02586C5.81312 5.26998 5.40859 5.65953 5.15507 6.13865C5.02465 6.38515 4.94772 6.68933 4.9077 7.16108C4.86723 7.63808 4.86687 8.24577 4.86687 9.09208V11.6255C4.86687 12.6253 5.70858 13.4358 6.74688 13.4358H7.12131C7.93619 13.4358 8.49337 14.2284 8.19075 14.957C8.10969 15.1521 8.34306 15.3285 8.52069 15.2064L10.1804 14.0648C10.7772 13.6599 11.4882 13.4404 12.2183 13.4359L12.2711 13.4358C12.4713 13.4358 12.5541 13.4358 12.6137 13.433C13.9757 13.3709 15.0654 12.3216 15.1299 11.01C15.1328 10.9524 15.1329 10.8818 15.1329 10.709V9.09208C15.1329 8.24577 15.1326 7.63808 15.0921 7.16108C15.052 6.68933 14.9751 6.38515 14.8447 6.13865C14.5912 5.65953 14.1866 5.26998 13.6891 5.02586C13.4331 4.90026 13.1172 4.82619 12.6273 4.78765C12.132 4.74867 11.5009 4.74832 10.6221 4.74832H9.37769C8.49888 4.74832 7.86781 4.74867 7.37244 4.78765Z',
					...format.filled,
					fillRule: 'evenodd',
					clipRule: 'evenodd',
				},
			),
		),
		el(
			'defs',
			{},
			el(
				'clipPath',
				{
					id: 'zip_ai_translucent_set_chat_bubble_clip',
				},
				el(
					'rect',
					{
						width: 20,
						height: 20,
						fill: commonProperties.color.white,
					},
				),
			),
		),
	),
};
