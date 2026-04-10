import apiFetch from '@wordpress/api-fetch';

// The OpenAI Responder
export const OpenAiResponder = async ( params ) => {
	const {
		userCommand,
		previousMessages,
		useSystemMessage,
	} = params;

	const messageArray = [];

	// Add the previous messages to the message array.
	if ( previousMessages?.length ) {
		previousMessages.forEach( ( chat ) => {
			messageArray.push( { role: chat.role, content: chat.message } );
		} );
	}

	// Add the user message to the message array.
	messageArray.push( { role: 'user', content: userCommand } );

	const postData = {
		message_array: messageArray,
		use_system_message: useSystemMessage,
		is_admin: zip_ai_react?.is_admin,
		current_post_id: zip_ai_react?.current_post_id,
		current_page: zip_ai_react?.current_page,
		special_page: zip_ai_react?.special_page,
	};

	return apiFetch( {
		path: 'zip_ai/generate',
		method: 'POST',
		data: postData,
	} );
};
