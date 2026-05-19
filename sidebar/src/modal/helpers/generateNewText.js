import { OpenAiResponder } from '@Sidebar/utils';
import { getMessagesForSCS } from './RenderChatLog';
import { __ } from '@wordpress/i18n';

// Function to generate new text and add it to the chat.
export const generateNewText = ( params ) => {
	const {
		startingText = '',
		textContent,
		textCommand,
		setGenerating,
		setText,
		setRefreshFilters,
		setAiResponseError,
		chatLog,
		setChatLog,
		fallbackChatlog = null,
		oneClickCommand = null,
		setValidForSaving = null,
		useSystemMessage = true,
	} = params;

	// Add a fallback for the chat log state, the ID counter, and create the chatlog to update.
	const olderChatLog = fallbackChatlog || chatLog || [];
	let currentId = chatLog?.length ? chatLog[ chatLog.length - 1 ].id + 1 : 0;
	let updatedChatLog = [
		...chatLog,
		{
			id: currentId,
			from: 'user',
			message: oneClickCommand || ( ( chatLog?.length || startingText ) ? textCommand : textContent ),
		},
	];

	// If the previous message was also from a user, add the not-last class.
	if ( updatedChatLog[ updatedChatLog.length - 2 ]?.from && 'ai' !== updatedChatLog[ updatedChatLog.length - 2 ].from ) {
		updatedChatLog[ updatedChatLog.length - 2 ].additionalClasses = [ 'not-last-message' ];
	}

	// Increate the current ID and start generation, as we're now rendering the new message.
	++currentId;
	setGenerating( true );
	setAiResponseError( '' );
	setChatLog( [ ...updatedChatLog ] );

	// Get the previous messages so that we can have a context of what was previously done.
	const previousMessages = 0 === currentId ? [] : getMessagesForSCS( olderChatLog );

	// Set the upcoming AI message
	updatedChatLog = [
		...updatedChatLog,
		{
			id: currentId,
			from: 'ai',
			type: 'loader',
			icon: 'assistant',
			additionalClasses: [
				'animated-chat-bubble',
			],
		},
	];
	setChatLog( [ ...updatedChatLog ] );

	// Generate the new text.
	OpenAiResponder( { userCommand: textCommand || textContent, previousMessages, useSystemMessage } ).then( ( result ) => {
		const response = result;
		setGenerating( false );

		// Update the message after trimming.
		if ( response.message.startsWith( '"' ) && response.message.endsWith( '"' ) ) {
			response.message = response.message.slice( 1, -1 );
		}
		// If the last message ID is still correct, update it - else error dump and yeet.
		const lastMessageId = updatedChatLog.length - 1;
		const lastMessage = updatedChatLog[ lastMessageId ];
		if ( currentId === lastMessage.id ) {
			delete lastMessage.type;
			lastMessage.message = response.message.trim();
			// Delete the last message's animation class if required.
			if ( lastMessage?.additionalClasses?.includes( 'animated-chat-bubble' ) ) {
				// Delete the additional classes. In the future if more additional classes are required, this can be updated.
				delete lastMessage.additionalClasses;
			}
			updatedChatLog[ lastMessageId ] = lastMessage;
			setChatLog( [ ...updatedChatLog ] );
		} else {
			setAiResponseError( __( 'Something went wrong while I was generating a response.', 'zip-ai' ) );
			setChatLog( [ ...olderChatLog ] );
		}
		setText( '' );
		if ( 'function' === typeof setValidForSaving ) {
			setValidForSaving( true );
		}
		// Refresh when the content generation is over.
		setRefreshFilters( true );
	} ).catch( ( error ) => {
		setGenerating( false );
		setAiResponseError( error?.message || __( 'Something went wrong', 'zip-ai' ) );
		setChatLog( [ ...olderChatLog ] );
	} );
	// Refresh when the content generation has started.
	setRefreshFilters( true );
};

// Function to regenerate the given text.
export const regenerateText = ( params ) => {
	const {
		chatBubble,
		regenerationCommand,
		setGenerating,
		setRegeneratingId,
		setAiResponseError,
		chatLog,
		setChatLog,
	} = params;

	// Create the previous messages array.
	const previousMessages = [];

	// Add the last AI message to the array if it exists.
	if ( chatLog[ chatBubble.id - 2 ]?.message ) {
		previousMessages.push( { role: 'assistant', message: chatLog[ chatBubble.id - 2 ].message } );
	}

	// Add the previous messages to the array.
	previousMessages.push(
		{ role: 'user', message: chatLog[ chatBubble.id - 1 ].message },
		{ role: 'assistant', message: chatBubble.variations[ 0 ] }
	);

	// Add the previously generated variations to the array.
	if ( chatBubble?.variations?.length && chatBubble.variations.length > 1 ) {
		chatBubble.variations.forEach( ( variation, index ) => {
			if ( index === 0 ) {
				return;
			}
			previousMessages.push(
				{ role: 'user', message: regenerationCommand },
				{ role: 'assistant', message: variation }
			);
		} );
	}

	setRegeneratingId( chatBubble.id );
	setGenerating( true );
	setAiResponseError( '' );
	// Regenerate the text.
	OpenAiResponder( { userCommand: regenerationCommand, previousMessages, useSystemMessage: false } ).then( ( result ) => {
		const response = result;
		setGenerating( false );
		setRegeneratingId( null );
		if ( response.message.startsWith( '"' ) && response.message.endsWith( '"' ) ) {
			response.message = response.message.slice( 1, -1 );
		}
		// Find the current chat bubble.
		chatLog.forEach( ( iteratedBubble, index ) => {
			if ( chatBubble.id === iteratedBubble.id ) {
				delete chatLog[ index ].type;
				chatLog[ index ].message = ( response.message.trim() );
				chatLog[ index ].variations.push( response.message.trim() );
				setChatLog( [ ...chatLog ] );
			}
		} );
	} ).catch( ( error ) => {
		setGenerating( false );
		setRegeneratingId( null );
		setAiResponseError( error?.message || __( 'Something went wrong', 'zip-ai' ) );
	} );
};
