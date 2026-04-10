/**
 * AI Assistant - Component - The filters for the AI text.
 */

import { useState, useEffect, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	newTextFeatures,
	updateTextFeatures,
	updateAdditionalTextFeatures,
} from '@Sidebar/modal/helpers/aiFeatures';
import RenderFilter, { RenderPrompt } from '@Sidebar/modal/helpers/RenderFilter';
import { generateNewText } from '@Sidebar/modal/helpers/generateNewText';
import { SidebarContext, getLastAiMessage } from '@Sidebar/modal/helpers/RenderChatLog';

// Render the prompts.
export const ContentPrompts = ( props ) => {
	const {
		currentText,
		generationRef,
		setUserInput,
		refreshFilters,
		setRefreshFilters,
		generating,
		setGenerating,
		setAiResponseError,
		setValidForSaving,
	} = props;

	const { chatLog, setChatLog } = useContext( SidebarContext );

	// Create a generation function for first-time generation prompts.
	const generateContent = ( { textCommand, oneClickCommand, useSystemMessage } ) => {
		const textContent = getLastAiMessage( chatLog, currentText );
		generateNewText( {
			textContent,
			textCommand,
			setGenerating,
			setText: setUserInput,
			setRefreshFilters,
			setAiResponseError,
			chatLog,
			setChatLog,
			oneClickCommand,
			setValidForSaving,
			useSystemMessage,
		} );
	};

	// Fetch the list of prompts.
	const createTextButtons = newTextFeatures( setUserInput, generationRef, generateContent );

	// Set a state to use the required filter for the current situation.
	const [ aiPrompts, setAiPrompts ] = useState( createTextButtons );

	// Create a prompt for the clipboard if possible.
	const clipboardFilter = navigator?.clipboard && {
		feature: __( 'Paste from clipboard', 'zip-ai' ),
		possibilityText: __( 'and chat from there', 'zip-ai' ),
		clickEvent: async () => {
			setGenerating( true );
			const clipboardContent = await navigator.clipboard
				.readText()
				.then( ( clipBoardText ) => ( clipBoardText ) )
				.catch( () => ( '' ) );
			if ( clipboardContent ) {
				chatLog.push( {
					id: 0,
					from: 'content',
					message: clipboardContent,
				} );
				setChatLog( [ ...chatLog ] );
				setRefreshFilters( true );
			}
			setGenerating( false );
		},
	};

	// Update the required filters whenever needed.
	useEffect( () => {
		if ( refreshFilters ) {
			setRefreshFilters( false );
			setAiPrompts( createTextButtons );
		}
	}, [ refreshFilters ] );

	// Render the required prompts
	return (
		<div className="zip-ai-sidebar__prompt">
			{ aiPrompts.filters.map( ( aiPrompt, index ) => (
				<RenderPrompt key={ index } filter={ { ...aiPrompt, disabled: generating } } />
			) ) }
			{ clipboardFilter && ( <RenderPrompt filter={ { ...clipboardFilter, disabled: generating } } /> ) }
		</div>
	);
};

// Render the content filters.
const ContentFilters = ( props ) => {
	const {
		bubbleType,
		currentText,
		setUserInput,
		refreshFilters,
		setRefreshFilters,
		generating,
		setGenerating,
		setAiResponseError,
		setValidForSaving,
	} = props;

	const { chatLog, setChatLog, editMode } = useContext( SidebarContext );

	// Set the postion of the tooltip based on the bubble type.
	let position;

	switch ( bubbleType ) {
		case 'content':
			position = 'bottom';
			break;
		default:
			position = 'top';
	}

	const generateContent = ( { textCommand, oneClickCommand, useSystemMessage } ) => {
		const textContent = getLastAiMessage( chatLog, currentText );
		generateNewText( {
			textContent,
			textCommand,
			setGenerating,
			setText: setUserInput,
			setRefreshFilters,
			setAiResponseError,
			chatLog,
			setChatLog,
			oneClickCommand,
			setValidForSaving,
			useSystemMessage,
		} );
	};

	// Fetch the list of features possible for AI Text Generation.
	const updateTextButtons = updateTextFeatures( generateContent );
	const updateAdditionalTextButtons = updateAdditionalTextFeatures( generateContent );

	// Set a state to use the required filter for the current situation.
	const [ aiFilters, setAiFilters ] = useState( updateTextButtons );

	// Create the additional text filters.
	const [ additionalFilters, setAdditionalFilters ] = useState( updateAdditionalTextButtons );

	// Update the required filters whenever needed.
	useEffect( () => {
		if ( refreshFilters ) {
			setRefreshFilters( false );
			setAiFilters( updateTextButtons );
			setAdditionalFilters( updateAdditionalTextButtons );
		}
	}, [ refreshFilters ] );

	// Render the required filter buttons
	return (
		<div className="zip-ai-sidebar__chat-bubble--interaction">
			{ aiFilters.filters.map( ( aiFilter, index ) => (
				<RenderFilter key={ index } filter={ { ...aiFilter, id: `ai-message-filter-${ index + 1 }`, disabled: ( generating || editMode?.enabled ), position } } />
			) ) }
			{ additionalFilters?.filters?.length > 0 && (
				<>
					<div className="zip-ai-sidebar__chat-bubble--interaction-divider" />
					{ additionalFilters.filters.map( ( additionalFilter, index ) => {
						let filterType;
						switch ( additionalFilter.feature ) {
							// Cases for buttons.
							case 'Rephrase':
								filterType = 'button';
								break;
							// Cases for dropdowns without search.
							case 'Change Tone':
								filterType = 'select-without-search';
								break;
							// Cases for dropdowns - the default.
							default:
								filterType = 'select';
						}

						return (
							<RenderFilter
								type={ filterType }
								key={ index }
								filter={ {
									...additionalFilter,
									id: `ai-message-dropdown-${ index + 1 }`,
									disabled: ( generating || editMode?.enabled ),
									position,
								} }
							/>
						);
					} ) }
				</>
			) }
		</div>
	);
};

export default ContentFilters;
