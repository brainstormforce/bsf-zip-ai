/**
 * AI Assistant - Helper - The list of possible AI features.
 */

import { sprintf, __ } from '@wordpress/i18n';
import {
	ContentAddIcon,
	ContentRemoveIcon,
	TranslateIcon,
	SmileyIcon,
	BookCheckIcon,
	ResetIcon,
} from '@Scripts/IconComponents';

// Common styling for filter SVGs.
const commonFilterSvgStyling = {
	color: '#64748b',
};

// Common functionality for all create text labels.
const commonNewTextFunctionality = ( text, setText, generationRef ) => {
	setText( text );
	generationRef?.current?.focus();
};

const languageArray = [
	{ value: 'Arabic', label: __( 'Arabic', 'zip-ai' ) },
	{ value: 'Azerbaijani', label: __( 'Azerbaijani', 'zip-ai' ) },
	{ value: 'Bengali', label: __( 'Bengali', 'zip-ai' ) },
	{ value: 'Belarusian', label: __( 'Belarusian', 'zip-ai' ) },
	{ value: 'Bulgarian', label: __( 'Bulgarian', 'zip-ai' ) },
	{ value: 'Chinese', label: __( 'Chinese (Simplified)', 'zip-ai' ) },
	{ value: 'Croatian', label: __( 'Croatian', 'zip-ai' ) },
	{ value: 'Czech', label: __( 'Czech', 'zip-ai' ) },
	{ value: 'Danish', label: __( 'Danish', 'zip-ai' ) },
	{ value: 'Dutch', label: __( 'Dutch', 'zip-ai' ) },
	{ value: 'English', label: __( 'English', 'zip-ai' ) },
	{ value: 'Estonian', label: __( 'Estonian', 'zip-ai' ) },
	{ value: 'Finnish', label: __( 'Finnish', 'zip-ai' ) },
	{ value: 'Filipino', label: __( 'Filipino', 'zip-ai' ) },
	{ value: 'French', label: __( 'French', 'zip-ai' ) },
	{ value: 'Georgian', label: __( 'Georgian', 'zip-ai' ) },
	{ value: 'German', label: __( 'German', 'zip-ai' ) },
	{ value: 'Greek', label: __( 'Greek', 'zip-ai' ) },
	{ value: 'Hebrew', label: __( 'Hebrew', 'zip-ai' ) },
	{ value: 'Hindi', label: __( 'Hindi', 'zip-ai' ) },
	{ value: 'Hungarian', label: __( 'Hungarian', 'zip-ai' ) },
	{ value: 'Indonesian', label: __( 'Indonesian', 'zip-ai' ) },
	{ value: 'Italian', label: __( 'Italian', 'zip-ai' ) },
	{ value: 'Japanese', label: __( 'Japanese', 'zip-ai' ) },
	{ value: 'Kazakh', label: __( 'Kazakh', 'zip-ai' ) },
	{ value: 'Korean', label: __( 'Korean', 'zip-ai' ) },
	{ value: 'Latvian', label: __( 'Latvian', 'zip-ai' ) },
	{ value: 'Lithuanian', label: __( 'Lithuanian', 'zip-ai' ) },
	{ value: 'Macedonian', label: __( 'Macedonian', 'zip-ai' ) },
	{ value: 'Malay', label: __( 'Malay', 'zip-ai' ) },
	{ value: 'Norwegian', label: __( 'Norwegian', 'zip-ai' ) },
	{ value: 'Polish', label: __( 'Polish', 'zip-ai' ) },
	{ value: 'Portuguese', label: __( 'Portuguese', 'zip-ai' ) },
	{ value: 'Romanian', label: __( 'Romanian', 'zip-ai' ) },
	{ value: 'Russian', label: __( 'Russian', 'zip-ai' ) },
	{ value: 'Serbian', label: __( 'Serbian', 'zip-ai' ) },
	{ value: 'Slovak', label: __( 'Slovak', 'zip-ai' ) },
	{ value: 'Slovenian', label: __( 'Slovenian', 'zip-ai' ) },
	{ value: 'Spanish', label: __( 'Spanish', 'zip-ai' ) },
	{ value: 'Swahili', label: __( 'Swahili', 'zip-ai' ) },
	{ value: 'Swedish', label: __( 'Swedish', 'zip-ai' ) },
	{ value: 'Thai', label: __( 'Thai', 'zip-ai' ) },
	{ value: 'Turkish', label: __( 'Turkish', 'zip-ai' ) },
	{ value: 'Ukrainian', label: __( 'Ukrainian', 'zip-ai' ) },
	{ value: 'Urdu', label: __( 'Urdu', 'zip-ai' ) },
	{ value: 'Vietnamese', label: __( 'Vietnamese', 'zip-ai' ) },
];

const tones = [
	{ value: 'friendly', label: __( 'Friendly', 'zip-ai' ) },
	{ value: 'formal', label: __( 'Formal', 'zip-ai' ) },
	{ value: 'casual', label: __( 'Casual', 'zip-ai' ) },
	{ value: 'professional', label: __( 'Professional', 'zip-ai' ) },
	{ value: 'informative', label: __( 'Informative', 'zip-ai' ) },
	{ value: 'playful', label: __( 'Playful', 'zip-ai' ) },
	{ value: 'serious', label: __( 'Serious', 'zip-ai' ) },
	{ value: 'humorous', label: __( 'Humorous', 'zip-ai' ) },
	{ value: 'polite', label: __( 'Polite', 'zip-ai' ) },
	{ value: 'emotional', label: __( 'Emotional', 'zip-ai' ) },
];

// Return the title and an array of all the create text features and their actions on click.
const defaultInitialPrompts = ( setText, generationRef ) => ( {
	title: __( 'Draft with AI', 'zip-ai' ),
	filters: [
		{
			feature: __( 'Give me an idea', 'zip-ai' ),
			possibilityText: __( 'for an attractive heading about', 'zip-ai' ),
			clickEvent: () => {
				commonNewTextFunctionality(
					__( 'Give me an idea for ', 'zip-ai' ),
					setText,
					generationRef,
				);
			},
		},
		{
			feature: __( 'Show me a code snippet', 'zip-ai' ),
			possibilityText: __( 'of blur-on-hover CSS', 'zip-ai' ),
			clickEvent: () => {
				commonNewTextFunctionality(
					__( 'Show me a code snippet of ', 'zip-ai' ),
					setText,
					generationRef,
				);
			},
		},
		{
			feature: __( 'Write me a description', 'zip-ai' ),
			possibilityText: __( 'about a product for', 'zip-ai' ),
			clickEvent: () => {
				commonNewTextFunctionality(
					__( 'Write me a description about ', 'zip-ai' ),
					setText,
					generationRef,
				);
			},
		},
	],
} );

// Return the title and an array of all the product-based create text features and their actions on click.
const productInitialPrompts = ( generateContent ) => ( {
	title: __( 'Create with AI', 'zip-ai' ),
	filters: [
		{
			feature: __( 'Write a short description', 'zip-ai' ),
			possibilityText: __( 'for this product', 'zip-ai' ),
			clickEvent: () => {
				generateContent( {
					textCommand: 'Write a one-line description for this product. Don\'t add any links.',
					oneClickCommand: __( 'Write a short description.', 'zip-ai' ),
					useSystemMessage: true,
				} );
			},
		},
		{
			feature: __( 'Write a long description', 'zip-ai' ),
			possibilityText: __( 'for this product', 'zip-ai' ),
			clickEvent: () => {
				generateContent( {
					textCommand: 'Write a one-paragraph description for this product. Don\'t add any links.',
					oneClickCommand: __( 'Write a long description.', 'zip-ai' ),
					useSystemMessage: true,
				} );
			},
		},
	],
} );

// Return the title and an array of all the create text features and their actions on click.
export const newTextFeatures = ( setText, generationRef, generateContent ) => {
	switch ( zip_ai_react?.current_view ) {
		case 'editing_product':
			return productInitialPrompts( generateContent );
		default:
			return defaultInitialPrompts( setText, generationRef );
	}
};

export const fixGrammarEvent = ( generateContent ) => {
	generateContent( {
		textCommand: 'Fix the grammar and any spelling mistakes in the previous message.',
		oneClickCommand: __( 'Fix any grammatical mistakes.', 'zip-ai' ),
		useSystemMessage: false,
	} );
};

export const makeTextLongerEvent = ( generateContent ) => {
	generateContent( {
		textCommand: 'Rewrite it by making it 5 to 10 words longer - and keep it in the same language as the last message.',
		oneClickCommand: __( 'Make it longer.', 'zip-ai' ),
		useSystemMessage: false,
	} );
};

export const makeTextShorterEvent = ( generateContent ) => {
	generateContent( {
		textCommand: 'Make it shorter - and keep it in the same language as the last message.',
		oneClickCommand: __( 'Make it shorter.', 'zip-ai' ),
		useSystemMessage: false,
	  } );
};

// Return the title and an array of all the update text features ( with icons ) and their actions on click.
export const updateTextFeatures = ( generateContent ) => ( {
	filters: [
		{
			icon: BookCheckIcon( commonFilterSvgStyling ),
			feature: __( 'Fix Grammar', 'zip-ai' ),
			clickEvent: () => fixGrammarEvent( generateContent ),
		},
		{
			icon: ContentAddIcon( { width: 14, height: 14, ...commonFilterSvgStyling } ),
			feature: __( 'Make Longer', 'zip-ai' ),
			clickEvent: () => makeTextLongerEvent( generateContent ),
		},
		{
			icon: ContentRemoveIcon( commonFilterSvgStyling ),
			feature: __( 'Make Shorter', 'zip-ai' ),
			clickEvent: () => makeTextShorterEvent( generateContent ),
		},
		{
			icon: ResetIcon( commonFilterSvgStyling ),
			feature: __( 'Rephrase', 'zip-ai' ),
			clickEvent: ( ) => rephraseTextEvent( generateContent ),
		},
	],
} );

export const translateLanguageEvent = ( language, generateContent ) => {
	generateContent( {
		textCommand: `Translate to ${ language.value }.`,
		/* translators: %s: language name */
		oneClickCommand: sprintf( __( 'Translate to %s.', 'zip-ai' ), language.label ),
		useSystemMessage: false,
	} );
};

export const changeToneEvent = ( tone, generateContent ) => {
	generateContent( {
		textCommand: `Rewrite in a ${ tone.value } tone - keep it in the same language, and keep it the exact same length.`,
		/* translators: %s: tone name */
		oneClickCommand: sprintf( __( 'Change tone to %s.', 'zip-ai' ), tone.label ),
		useSystemMessage: false,
	} );
};

export const rephraseTextEvent = ( generateContent ) => {
	generateContent( {
		textCommand: 'Rewrite the text to convey the same meaning in different words, maintaining the original language and similar length.',
		oneClickCommand: __( 'Rephrase', 'zip-ai' ),
		useSystemMessage: false,
	} );
};

export const updateAdditionalTextFeatures = ( generateContent ) => ( {
	filters: [
		{
			icon: SmileyIcon(),
			feature: __( 'Change Tone', 'zip-ai' ),
			options: tones,
			clickEvent: ( tone ) => changeToneEvent( tone, generateContent ),
		},
		{
			icon: TranslateIcon(),
			feature: __( 'Translate', 'zip-ai' ),
			options: languageArray,
			clickEvent: ( language ) => translateLanguageEvent( language, generateContent ),
		},
	],
} );
