/**
 * AI Assistant - Helper - The Chat Log helpers.
 */

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { generateNewText, regenerateText } from './generateNewText';
import { RenderShortcut } from './RenderFilter';
import {
	AiSparkleIcon,
	CopyCloseIcon,
	ContentOverwriteIcon,
	ContentReplaceIcon,
	EditIcon,
	CopyIcon,
	CheckIcon,
	ClockIcon,
	RegenerateIcon,
	SmallArrowIcons,
} from '@Scripts/IconComponents';
import { Dashicon } from '@wordpress/components';
import { zipAiClassNames, copyToClipboard } from '@Scripts/Helpers';
import ContentFilters from '@Sidebar/modal/components/ContentFilters';
import HTMLReactParser from 'html-react-parser';

// Create the Chat Log, which will contain an array objects pertaining to each chat message.
export const SidebarContext = createContext( {
	chatLog: [],
	setChatLog: null,
	editMode: { enabled: false, value: '', id: -1 },
	setEditMode: null,
	isOpen: false,
	setIsOpen: null,
	isRichText: false,
	updateContent: null,
	currentText: '',
	hoveredButton: null,
	setHoveredButton: null,
	handleMouseEnter: null,
	handleMouseLeave: null,
	currentDropdown: null,
	setCurrentDropdown: null,
	footerRefHeight: 0,
	setFooterRefHeight: null,
	scrollButtonRef: null,
	openedDropdownNode: null,
	setOpenDropdownNode: null,
} );

// The Chat Loader Div Structure.
export const ChatLoader = (
	<div className="zip-ai-sidebar__chat-loader">
		<div className="zip-ai-sidebar__chat-loader--dot dot-1" />
		<div className="zip-ai-sidebar__chat-loader--dot dot-2" />
		<div className="zip-ai-sidebar__chat-loader--dot dot-3" />
	</div>
);

// Get the last AI generated message.
export const getLastAiMessage = ( chatLog, fallbackMessage ) =>
	chatLog
		?.filter( ( chat ) => chat.from === 'ai' || chat.from === 'content' )
		?.pop()?.message || fallbackMessage;

// Get all the messages, and format them into an array for the SCS.
export const getMessagesForSCS = ( chatLog ) => {
	const messages = [];

	// Loop through the messages and add them to the messages array.
	chatLog.forEach( ( chat ) => {
		messages.push( {
			role: 'ai' === chat.from ? 'assistant' : 'user',
			message: chat?.message || '',
		} );
	} );

	return messages;
};

// Render the Low Credit Notification.
export const LowCreditNotification = () => {
	const notificationRef = useRef( null );

	// Add the Notification Visibility class once the ref has been set.
	useEffect( () => {
		if ( notificationRef.current ) {
			setTimeout( () => {
				notificationRef.current.classList.add(
					'zip-ai-sidebar__notification--visible'
				);
			}, 1000 );
		}
	}, [ notificationRef ] );

	return (
		<div className="zip-ai-sidebar__notification" ref={ notificationRef }>
			<div className="zip-ai-sidebar__notification--content">
				{ __( 'Your Credit Balance is low, top up soon!', 'zip-ai' ) }
				<Dashicon icon="external" />
			</div>
		</div>
	);
};

// Internal Helper Function to determine the copy icon to render.
const renderRequiredCopyIcon = ( icons, copyIconInUse, setCopyIconInUse ) => {
	let iconToUse;
	switch ( copyIconInUse ) {
		case 'progress':
			iconToUse = icons?.progress;
			break;
		case 'success':
			iconToUse = icons?.success;
			setTimeout( () => {
				setCopyIconInUse( 'default' );
			}, 750 );
			break;
		default:
			iconToUse = icons.default;
	}
	return iconToUse;
};

// Component that splits up the code block into title and content.
const StructuredCodeBlock = ( props ) => {
	const { message } = props;

	// State to determine the copy icon to use.
	const [ currentIcon, setCurrentIcon ] = useState( 'default' );

	// Return early if no message is found.
	if ( ! message ) {
		return null;
	}

	// Split the message into title and content.
	const messageArray = message.split( '\n' );
	const title = messageArray.shift();
	const content = messageArray.join( '\n' ).trim();

	// The Copy Icon to use.
	const copyIconSet = {
		default: CopyIcon(),
		progress: ClockIcon(),
		success: CheckIcon(),
	};

	return (
		<div className="zip-ai-sidebar__chat-bubble--code-block">
			<div className="zip-ai-sidebar__chat-bubble--code-block-title">
				{ title }
				<div className="zip-ai-sidebar__chat-bubble--code-block-actions">
					<button
						className="zip-ai-sidebar__chat-bubble--code-block-button"
						onClick={ async () => {
							try {
								setCurrentIcon( 'progress' );
								await copyToClipboard( content );
								setCurrentIcon( 'success' );
							} catch ( error ) {
								console.error( error ); // eslint-disable-line no-console
								setCurrentIcon( 'default' );
							}
						} }
					>
						{ renderRequiredCopyIcon(
							copyIconSet,
							currentIcon,
							setCurrentIcon
						) }
					</button>
				</div>
			</div>
			<div className="zip-ai-sidebar__chat-bubble--code-block-content">
				<code>{ content }</code>
			</div>
		</div>
	);
};

// Identify and replace all the dummy URLs with the actual site URL.
const dummyUrlUpdater = ( message ) => {
	// Internal function to replace the dummy site URL with the actual site URL if required.
	const replaceDummySiteUrl = ( match ) =>
		`${ zip_ai_react.site_url }${ match.substring(
			match.indexOf( 'example.com' ) + 11
		) }`;

	// Find how many instances of the dummy site are in the generated content.
	const dummyLinkCount = ( message.match( /example\.com/g ) || [] ).length;
	let loopCounter = 0;

	// Now replace all the dummy URLs with the actual site URL.
	while ( loopCounter < dummyLinkCount ) {
		message = message.replace(
			/(https?:\/\/)?(www\.)?example\.com\/.*/g,
			( match, path ) => replaceDummySiteUrl( match, path )
		);
		loopCounter++;
	}

	// Return the same message with the actual site URLs.
	return message;
};

// Parse the message string to create a preformatted sections wherever needed.
export const parseAiMessage = (
	aiChatBubble,
	setAiResponseError,
	chatLog,
	setChatLog
) => {
	// Return early if no message is found.
	if ( ! aiChatBubble?.message ) {
		// Also, if this happened, delete the last AI message and the last user message from the chat log.
		const revertedChatLog = chatLog;

		// If the last message in the current chat log was the one without a message, remove it.
		if (
			aiChatBubble.id === revertedChatLog[ revertedChatLog.length - 1 ].id
		) {
			revertedChatLog.pop();
		}

		// Remove the user command that was the cause of the error - so that the user can work on the previous data.
		if ( 'user' === revertedChatLog[ revertedChatLog.length - 1 ]?.from ) {
			revertedChatLog.pop();
		}

		setChatLog( [ ...revertedChatLog ] );
		return setAiResponseError(
			__( 'It looks like I\'ve encountered an error…', 'zip-ai' )
		);
	}

	// Function to format the inline code.
	const formatInlineCode = ( originalMessage ) => {
		// Return early if no inline code is found.
		if ( ! originalMessage.includes( '`' ) ) {
			return HTMLReactParser( markdownBasicText( originalMessage ) );
		}

		// Start parsing the message whenever an inline code is found.
		const parsedMessage = [];
		const messageArray = originalMessage.split( '`' );
		messageArray.forEach( ( message, index ) => {
			if ( 0 === index % 2 ) {
				parsedMessage.push(
					HTMLReactParser( markdownBasicText( originalMessage ) )
				);
			} else {
				parsedMessage.push(
					<span className="zip-ai-sidebar__chat-bubble--code">
						{ message }
					</span>
				);
			}
		} );

		// Return the parsed message.
		return parsedMessage;
	};

	// Function to format all other types of messages.
	const markdownBasicText = ( originalMessage ) => {
		// Format the heading based on the number of hashes. To avoid any theme inconsistent styling, headings are just rendered as bold.
		const formatHeading = ( match, level, text ) =>
			`<strong>${ text }</strong>`; // eslint-disable-line no-unused-vars
		// Format bold texts.
		const formatBold = ( text ) => `<strong>${ text }</strong>`;
		// Format italic texts.
		const formatItalic = ( text ) => `<em>${ text }</em>`;
		// Format strikethrough texts.
		const formatStrikethrough = ( text ) => `<del>${ text }</del>`;
		// Format quotes.
		const formatQuotes = ( text ) => `<blockquote>${ text }</blockquote>`;
		// Format inline code as span with styling.
		const formatSpanCode = ( text ) =>
			`<span class="zip-ai-sidebar__chat-bubble--code-inline"><code>${ text }</code></span>`;
		// Format links.
		const formatLinks = ( title, url ) =>
			`<a href="${ url }" target="_blank">${ title }</a>`;

		// Format all the types based on the related pattern.
		originalMessage = originalMessage.replaceAll(
			/^(#{1,6})\s+(.+)$/gm,
			( match, level, text ) => formatHeading( match, level, text )
		);
		originalMessage = originalMessage.replaceAll(
			/(\*\*|\_)([^]*?)\1/g,
			formatBold( '$2' )
		);
		originalMessage = originalMessage.replaceAll(
			/~~([^]*?)~~/g,
			formatStrikethrough( '$1' )
		);
		originalMessage = originalMessage.replaceAll(
			/(\*)([^]*?)(\*)/g,
			formatItalic( '$2' )
		);
		originalMessage = originalMessage.replaceAll(
			/^>\s?(.*)$/gm,
			formatQuotes( '$1' )
		);
		originalMessage = originalMessage.replaceAll(
			/`{1,2}([^`]*)`{1,2}/gm,
			formatSpanCode( '$1' )
		);
		originalMessage = originalMessage.replaceAll(
			/\[(.*?)\]\((.*?)\)/g,
			formatLinks( '$1', '$2' )
		);

		// Replace all the dummy URLs.
		originalMessage = dummyUrlUpdater( originalMessage );

		// Return the formatted text.
		return originalMessage;
	};

	// Start parsing the message whenever a code block is found.
	const messageArray = aiChatBubble.message.split( '```' );

	// Return early if no code block is found.
	if ( 1 === messageArray.length ) {
		return formatInlineCode( aiChatBubble.message );
	}

	const parsedMessage = [];
	messageArray.forEach( ( message, index ) => {
		if ( 0 === index % 2 ) {
			parsedMessage.push( formatInlineCode( message ) );
		}
		if ( 1 === index % 2 ) {
			parsedMessage.push( <StructuredCodeBlock { ...{ message } } /> );
		}
	} );
	return parsedMessage;
};

// Render the Chat Bubbles.
const RenderChatLog = ( props ) => {
	const {
		currentText,
		chatBubble,
		updateContent,
		closeModal,
		generating,
		setGenerating,
		regeneratingId,
		setRegeneratingId,
		aiResponseError,
		setAiResponseError,
		userInput,
		setUserInput = null,
		refreshFilters,
		setRefreshFilters = null,
		editCheck = null,
		setEditCheck = null,
		setValidForSaving = null,
	} = props;

	// Get the chatlog, required for regenerating content.
	const { chatLog, setChatLog, editMode, setEditMode, setHoveredButton } =
		useContext( SidebarContext );

	// State to identify the current page of the chat bubble.
	const [ currentPage, setCurrentPage ] = useState( 0 );

	// State to identify if the user is copying the AI message.
	const [ copyIconInUse, setCopyIconInUse ] = useState( 'default' );

	// Ref for the edit mode textarea.
	const editModeRef = useRef( null );

	// Condition to check if the chat bubble has multiple variations.
	const hasMultipleVariations =
		chatBubble?.variations?.length && chatBubble.variations.length > 1;

	// Handle the change of content in the edit textarea.
	useEffect( () => {
		if ( ! editModeRef?.current ) {
			return;
		}

		// If there's no content, directly set the height to the initial.
		if ( ! editMode.value ) {
			editModeRef.current.style.height = '';
			return;
		}

		// Set the required constants to calculate the current height required.
		const textAreaLineHeight = 20; // CSS synchronization - $line-height-sm.
		const minRows = 1;
		const maxRows = 10;

		// Reset height to auto to allow content to dictate height.
		editModeRef.current.style.height = '0';

		// Get the current scroll height and remove the vertical padding from it.
		const textArea = editModeRef.current.scrollHeight;
		const newRows = Math.ceil( textArea / textAreaLineHeight );

		// Clamp rows between minRows and maxRows.
		const clampedRows = Math.max( minRows, Math.min( newRows, maxRows ) );

		// Set the required height for the textarea.
		editModeRef.current.style.height = `${
			clampedRows * textAreaLineHeight
		}px`;
	}, [ editMode ] );

	// Update the current chat bubble page whenever the chat bubble variations change.
	useEffect( () => {
		if (
			! regeneratingId &&
			'ai' === chatBubble?.from &&
			hasMultipleVariations
		) {
			setCurrentPage( chatBubble.variations.length - 1 );
		}
	}, [ regeneratingId ] );

	// Update the chat log whenever the current page changes.
	useEffect( () => {
		if (
			'ai' === chatBubble?.from &&
			chatBubble?.id &&
			hasMultipleVariations
		) {
			chatLog[ chatBubble.id ].message = chatBubble.variations[ currentPage ];
			setChatLog( [ ...chatLog ] );
		}
	}, [ currentPage ] );

	// Clean up the variants when the chat bubble is not the last AI message.
	useEffect( () => {
		if (
			'ai' === chatBubble?.from &&
			chatBubble?.variations &&
			chatBubble?.id &&
			chatBubble.id !== chatLog?.length - 1
		) {
			if ( chatLog[ chatBubble.id ] ) {
				chatLog[ chatBubble.id ].variations = [];
			}
			setChatLog( [ ...chatLog ] );
		}
	}, [ chatLog?.length ] );

	// Set ther required variables for user specific elements.
	let chatInteractions;
	let chatAction = chatBubble?.action;

	// Check if the chat bubble is the last one. If there's an error bubble, it's definitely not the last one.
	const isLastChatBubble = aiResponseError
		? false
		: chatBubble?.id === chatLog?.length - 1;

	// Assign the required user specific elements.
	switch ( chatBubble?.from ) {
		case 'user':
			chatInteractions = editCheck
				? undefined
				: [
					{
						label: __( 'Edit Message', 'zip-ai' ),
						icon: EditIcon(),
						execute: () => {
							if ( null !== setEditCheck ) {
								setEditCheck( true );
								setHoveredButton( null );
							}
							editMode.id = chatBubble.id;
							editMode.enabled = true;
							editMode.value = chatBubble?.message;
							setEditMode( { ...editMode } );
						},
					},
				  ];
			break;
		case 'ai':
			// Set the array of AI variations.
			if (
				! chatBubble?.variations?.length &&
				chatBubble?.message &&
				isLastChatBubble
			) {
				chatBubble.variations = [ chatBubble?.message ];
			}

			// Set the chat interactions to an array.
			chatInteractions = [];

			// Add the use this button for AI variations.
			chatAction = {
				execute: async () => {
					if ( null !== updateContent ) {
						updateContent( dummyUrlUpdater( chatBubble?.message ) );
					} else {
						try {
							await copyToClipboard(
								dummyUrlUpdater( chatBubble?.message )
							);
						} catch {}
					}
					closeModal();
				},
				label:
					null !== updateContent
						? __( 'Replace Richtext', 'zip-ai' )
						: __( 'Copy & Close', 'zip-ai' ),
				icon:
					null !== updateContent
						? ContentOverwriteIcon()
						: CopyCloseIcon(),
			};

			// Add the chat interaction to copy the AI message.
			chatInteractions.push( {
				label: __( 'Copy', 'zip-ai' ),
				multiIcons: {
					default: CopyIcon(),
					progress: ClockIcon(),
					success: CheckIcon(),
				},
				execute: async () => {
					try {
						setCopyIconInUse( 'progress' );
						await copyToClipboard( chatBubble?.message );
						setCopyIconInUse( 'success' );
					} catch ( error ) {
						console.error( error ); // eslint-disable-line no-console
						setCopyIconInUse( 'default' );
					}
				},
			} );

			// Exit if the chat bubble is not the last one, or if it doesn't have any variations.
			if ( ! isLastChatBubble || ! chatBubble?.variations?.length ) {
				break;
			}

			// Add the chat interaction to regenerate the content.
			chatInteractions.push( {
				label: __( 'Regenerate', 'zip-ai' ),
				icon: RegenerateIcon(),
				execute: () => {
					regenerateText( {
						chatBubble,
						regenerationCommand:
							'Rephrase and change the last assistant message, ensuring that it abides by the last user command.',
						setGenerating,
						setRegeneratingId,
						setAiResponseError,
						chatLog,
						setChatLog,
					} );
				},
			} );
			break;
		case 'content':
		default:
			break;
	}

	// Render the edit chat bubble UI.
	const renderEditChatBubble = () => {
		// Find and update the current chatlog bubble, and delete all the following bubbles.
		const confirmEdit = () => {
			// Exit if the user input or refresh filters functions are not set.
			if ( null === setUserInput || null === setRefreshFilters ) {
				setEditMode( {
					enabled: false,
					value: chatBubble?.message,
					id: -1,
				} );
				if ( null !== setEditCheck ) {
					setEditCheck( false );
				}
				return;
			}

			// Set the required variables.
			const isTheFirstMessage = 0 === editMode.id;
			const textCommand = isTheFirstMessage ? undefined : editMode.value;
			const textContent = isTheFirstMessage
				? editMode.value
				: chatLog[ editMode.id - 1 ]?.message || '';
			const updatedChatLog = chatLog.slice( 0, editMode.id );

			// Update the chat log and generate the new text.
			generateNewText( {
				textContent,
				textCommand,
				setGenerating,
				setText: setUserInput,
				setRefreshFilters,
				setAiResponseError,
				chatLog: updatedChatLog,
				fallbackChatlog: chatLog,
				setChatLog,
			} );

			// Disable the edit mode and turn off the edit check.
			editMode.enabled = false;
			editMode.id = -1;
			setEditMode( { ...editMode } );
			if ( null !== setEditCheck ) {
				setEditCheck( false );
			}
		};

		// Function to check whether the given string can be considered as empty.
		const isThisEmpty = ( input ) => input?.value?.trim() === '';

		return (
			<div className="zip-ai-sidebar__chat-editor">
				<textarea
					className={ zipAiClassNames( [
						'zip-ai-sidebar__chat-editor--input',
					] ) }
					value={ editMode.value }
					ref={ editModeRef }
					// Note that the autoFocus here is required, as this component only appears when editing, and is accessibility friendly.
					autoFocus={ true } // eslint-disable-line jsx-a11y/no-autofocus
					onChange={ ( event ) => {
						editMode.value = event.target.value;
						setEditMode( { ...editMode } );
					} }
					onKeyDown={ ( event ) => {
						if (
							'Enter' === event.key &&
							! event.shiftKey &&
							! isThisEmpty( event.target )
						) {
							editMode.value = event.target.value;
							setEditMode( { ...editMode } );
							confirmEdit();
						}
					} }
				/>
				<div className="zip-ai-sidebar__chat-editor--footer">
					<div className="zip-ai-sidebar__chat-editor--info">
						{ ContentReplaceIcon( { width: 14, height: 14 } ) }
						{ __(
							'Note: All subsequent messages will be deleted after you update.',
							'zip-ai'
						) }
					</div>
					<div className="zip-ai-sidebar__chat-editor--actions">
						<button
							onClick={ () => {
								setEditMode( {
									enabled: false,
									value: chatBubble?.message,
									id: -1,
								} );
								setEditCheck( false );
							} }
						>
							{ __( 'Cancel', 'zip-ai' ) }
						</button>
						<button
							className="zip-ai-sidebar__chat-editor--action-primary"
							onClick={ () => {
								confirmEdit();
							} }
							disabled={ isThisEmpty( editMode ) }
						>
							{ __( 'Update', 'zip-ai' ) }
						</button>
					</div>
				</div>
			</div>
		);
	};

	// Boolean to check if the current chat bubble's actions should be disabled or not.
	const isCurrentlyRegenerating = chatBubble.id === regeneratingId;
	const shouldActionBeDisabled =
		'error' === chatBubble?.type
			? false
			: isCurrentlyRegenerating || editMode?.enabled;

	// Render the content section of the chat bubble.
	const renderChatBubbleContent = () => (
		<>
			{ /* Render the edit area if needed, else render the content area. */ }
			{ 'user' === chatBubble?.from &&
			editMode?.enabled &&
			editMode?.id === chatBubble.id ? (
					renderEditChatBubble()
				) : (
					<>
						{ /* Render the loader if the chat bubble ID matches, and it isn't a special type of chat message. */ }
						{ ( isLastChatBubble && generating && ! regeneratingId ) ||
					( [ 'loader', 'regeneration' ].includes( chatBubble?.type ) &&
						isCurrentlyRegenerating ) ? (
								ChatLoader
							) : (
								<div className="zip-ai-sidebar__chat-bubble--message">
									{ /* If this was an AI message, Parse it with the preformatted text. */ }
									{ 'ai' === chatBubble?.from // eslint-disable-line no-nested-ternary
										? parseAiMessage(
											chatBubble,
											setAiResponseError,
											chatLog,
											setChatLog
										)
										: 'assemble-error' === chatBubble?.type
											? chatBubble.message()
											: HTMLReactParser( chatBubble?.message ) }
								</div>
							) }
						{ /* Render the AI chat interactions when required. */ }
						{ 'loader' !== chatBubble?.type && chatAction && (
							<div className="zip-ai-sidebar__chat-bubble--footer">
								<div className="zip-ai-sidebar__chat-bubble--wrapper">
									<div
										className={ zipAiClassNames( [
											'zip-ai-sidebar__chat-bubble--interaction',
										] ) }
									>
										<RenderShortcut
											shortcut={ {
												label:
												chatAction?.label ||
												__( 'Click Here', 'zip-ai' ),
												id: `ai-message-${ chatBubble.id }-main-interaction`,
												icon: chatAction?.icon,
												clickEvent: () => {
													chatAction?.execute();
												},
												disabled: shouldActionBeDisabled,
												position: 'top',
											} }
										/>
										{ chatInteractions && (
											<>
												{ chatInteractions.map(
													( interaction, index ) => (
														<RenderShortcut
															key={ index }
															shortcut={ {
																label:
																interaction?.label ||
																__(
																	'Click Here',
																	'zip-ai'
																),
																id: `ai-message-${
																	chatBubble.id
																}-interaction-${
																	index + 1
																}`,
																icon:
																'ai' ===
																	chatBubble?.from &&
																interaction?.multiIcons
																	? renderRequiredCopyIcon(
																		interaction.multiIcons,
																		copyIconInUse,
																		setCopyIconInUse
																	  )
																	: interaction?.icon,
																clickEvent: () => {
																	interaction?.execute();
																},
																disabled:
																shouldActionBeDisabled,
																position: 'top',
															} }
														/>
													)
												) }
											</>
										) }
										{ isLastChatBubble && hasMultipleVariations ? (
											<div className="zip-ai-sidebar__chat-bubble--pagination">
												<button
													onClick={ () => {
														setCurrentPage(
															currentPage - 1
														);
													} }
													disabled={
														isCurrentlyRegenerating ||
													currentPage === 0
													}
												>
													{ SmallArrowIcons().left }
												</button>
												<span
													style={ {
														opacity:
														isCurrentlyRegenerating
															? 0.25
															: 1,
													} }
												>
													{ sprintf(
														// translators: %1$d is the current page, %2$d is the total number of pages.
														__( '%1$d/%2$d', 'zip-ai' ),
														currentPage + 1,
														chatBubble.variations.length
													) }
												</span>
												<button
													onClick={ () => {
														setCurrentPage(
															currentPage + 1
														);
													} }
													disabled={
														isCurrentlyRegenerating ||
													currentPage ===
														chatBubble.variations
															.length -
															1
													}
												>
													{ SmallArrowIcons().right }
												</button>
											</div>
										) : (
											<></>
										) }
									</div>
									{ isLastChatBubble &&
									'ai' === chatBubble?.from && (
										<ContentFilters
											{ ...{
												bubbleType: chatBubble.from,
												currentText,
												userInput,
												setUserInput,
												refreshFilters,
												setRefreshFilters,
												generating,
												setGenerating,
												setAiResponseError,
												setValidForSaving,
											} }
										/>
									) }
								</div>
							</div>
						) }
						{ /* Render the content chat interactions when required. */ }
						{ 'content' === chatBubble?.from && isLastChatBubble && (
							<div className="zip-ai-sidebar__chat-bubble--slidein-actions">
								<div className="zip-ai-sidebar__chat-bubble--wrapper">
									<ContentFilters
										{ ...{
											bubbleType: chatBubble.from,
											currentText,
											userInput,
											setUserInput,
											refreshFilters,
											setRefreshFilters,
											generating,
											setGenerating,
											setAiResponseError,
											setValidForSaving,
										} }
									/>
								</div>
							</div>
						) }
					</>
				) }
			{ /* Render the user chat interactions if and when needed. */ }
			{ 'user' === chatBubble?.from && chatInteractions && (
				<div
					className={ zipAiClassNames( [
						'zip-ai-sidebar__chat-bubble--interaction',
						'zip-ai-sidebar__chat-bubble--interaction-for-user',
						'zip-ai-sidebar__chat-bubble--interaction-on-hover',
					] ) }
				>
					{ chatInteractions.map( ( interaction, index ) => (
						<RenderShortcut
							key={ index }
							shortcut={ {
								label:
									interaction?.label ||
									__( 'Click Here', 'zip-ai' ),
								id: `user-message-interaction-${ index + 1 }`,
								icon:
									( 'user' === chatBubble?.from &&
										interaction?.multiIcons ) ??
									interaction?.icon,
								clickEvent: () => {
									interaction?.execute();
								},
								position: 'bottom',
							} }
						/>
					) ) }
				</div>
			) }
		</>
	);

	const renderChatBubbleIcon = ( bubbleType ) => {
		switch ( bubbleType ) {
			case 'assistant':
				return (
					<div className="zip-ai-sidebar__chat-bubble--icon">
						{ AiSparkleIcon( {
							width: 16,
							height: 16,
							color: '#fff',
						} ) }
					</div>
				);
			default:
				return null;
		}
	};

	// Format additional classes into an array.
	const chatBubbleAdditionalClasses = Array.isArray(
		chatBubble?.additionalClasses
	)
		? [ ...chatBubble.additionalClasses ]
		: [];

	const getChatBubbleFrom = ( theFromType ) => {
		switch ( theFromType ) {
			case 'user':
				return 'human';
			case 'content':
				return 'content';
			case 'ai':
				return 'assistant';
			default:
				return 'unknown';
		}
	};

	return (
		<>
			<div
				className={ zipAiClassNames( [
					'zip-ai-sidebar__chat-bubble',
					// If there is a 'from', add the class with a dynamic 'human' or 'assistant' variant based on who the message is from.
					chatBubble?.from &&
						`zip-ai-sidebar__chat-bubble--from-${ getChatBubbleFrom(
							chatBubble.from
						) }`,
					// If there is a message type, like 'error', add the type class.
					chatBubble?.type &&
						`zip-ai-sidebar__chat-bubble--type-${ chatBubble.type }`,
					// If the message has an icon inside it, add the has icon class.
					chatBubble?.icon && `zip-ai-sidebar__chat-bubble--has-icon`,
					// If here are any additional classes, add them.
					...chatBubbleAdditionalClasses,
				] ) }
			>
				{ chatBubble?.icon ? (
					<>
						<div className="zip-ai-sidebar__chat-bubble--icon-wrapper">
							{ renderChatBubbleIcon( chatBubble.icon ) }
						</div>
						<div className="zip-ai-sidebar__chat-bubble--icon-content">
							{ renderChatBubbleContent() }
						</div>
					</>
				) : (
					renderChatBubbleContent()
				) }
			</div>
		</>
	);
};

export default RenderChatLog;
