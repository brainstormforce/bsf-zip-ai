/**
 * AI Assistant - Component - The Chat Window.
 */

import { useState, useEffect, useContext, useRef } from '@wordpress/element';
import { AiSparkleIcon, ArrowDown } from '@Scripts/IconComponents';
import RenderChatLog, {
	SidebarContext,
} from '@Sidebar/modal/helpers/RenderChatLog';
import { __ } from '@wordpress/i18n';

const ChatWindow = ( props ) => {
	const {
		generationRef,
		currentText,
		updateContent,
		closeModal,
		generating,
		setGenerating,
		aiResponseError,
		setAiResponseError,
		userInput,
		setUserInput,
		refreshFilters,
		setRefreshFilters,
		setValidForSaving,
	} = props;

	// Use the Chat Log.
	const { chatLog, setChatLog, footerRefHeight, scrollButtonRef } =
		useContext( SidebarContext );

	// Create a regeneration state specifically to show the loader only when needed.
	const [ regeneratingId, setRegeneratingId ] = useState( null );

	// Create an edit check state to restrict only one edit at a time.
	const [ editCheck, setEditCheck ] = useState( false );

	// Create a button check state to see if we need to show the scroll-to-bottom button or not.
	const [ isScrollToBottomRequired, setIsScrollToBottomRequired ] =
		useState( false );

	// Create the Chat Window and the Scroll-to-bottom refs.
	const chatWindowRef = useRef( null );

	// Function to check if the scroll-to-bottom is required.
	const checkScrollToBottomRequirement = () => {
		// If the ref is not set, abandon ship.
		if ( ! chatWindowRef?.current ) {
			return;
		}
		const sidebarWindow = chatWindowRef.current;
		const currentHeight =
			Math.ceil( sidebarWindow.scrollTop ) +
			Math.ceil( sidebarWindow.clientHeight );
		// Check if the current scroll plus the visible height is the same as the scroll height. If not, you need to scroll down.
		setIsScrollToBottomRequired(
			! isScrollToBottomRequired &&
				currentHeight < sidebarWindow.scrollHeight
		);
	};

	// Function to scroll to the bottom of the sidebar.
	const scrollToBottom = () => {
		// If the ref is not set, abandon ship.
		if ( ! chatWindowRef?.current || ! scrollButtonRef?.current ) {
			return;
		}
		scrollButtonRef.current?.blur();
		chatWindowRef.current.scrollTo( {
			top: chatWindowRef.current.scrollHeight,
			behavior: 'smooth',
		} );
	};

	// Whenever the scroll to bottom is required or not required, alter the classes and styles of the scroll to bottom button.
	useEffect( () => {
		// If the scroll to bottom button does not exist, abandon ship.
		if ( ! scrollButtonRef?.current ) {
			return;
		}
		const scrollButton = scrollButtonRef.current;
		if ( isScrollToBottomRequired ) {
			scrollButton.classList.add( 'scroll-button-is-visible' );
			scrollButton.tabIndex = '';
			scrollButton.setAttribute( 'aria-hidden', 'false' );
		} else {
			scrollButton.classList.remove( 'scroll-button-is-visible' );
			scrollButton.tabIndex = -1;
			scrollButton.setAttribute( 'aria-hidden', 'true' );
		}
	}, [ isScrollToBottomRequired ] );

	// Whenever the sidebar is scrolled, check if the sidebar is at the bottom or not.
	useEffect( () => {
		if ( chatWindowRef?.current ) {
			chatWindowRef.current.addEventListener(
				'scroll',
				checkScrollToBottomRequirement
			);
			return () => {
				if ( chatWindowRef?.current ) {
					chatWindowRef?.current?.removeEventListener(
						'scroll',
						checkScrollToBottomRequirement
					);
				}
			};
		}
	}, [ chatWindowRef?.current ] );

	// Scroll the last chat element into view whenver it has been changed.
	useEffect( () => {
		if ( chatWindowRef?.current ) {
			chatWindowRef.current.scrollTop =
				chatWindowRef.current?.scrollHeight;
			checkScrollToBottomRequirement();
		}
	}, [ chatWindowRef?.current?.lastChild, chatLog ] );

	const renderStructredError = () => {
		const { title, content, button_content } = aiResponseError;

		const errorBubble = {
			type: 'assemble-error',
			icon: 'assistant',
			message: () => {
				return (
					<div className="zip-ai-error-bubble">
						<div className="zip-ai-error-bubble__content">
							{ title && (
								<h4 className="zip-ai-error-bubble__title">
									{ title }
								</h4>
							) }
							{ content && (
								<p className="zip-ai-error-bubble__text">
									{ content }
								</p>
							) }
							{ button_content && (
								<div className="zip-ai-error-bubble__buttons">
									<button
										className="zip-ai-error-bubble__button"
										onClick={ () => {
											if ( button_content?.url ) {
												window.open(
													button_content?.url,
													'_blank'
												);
											}
										} }
									>
										{ button_content?.text || '' }
									</button>
									<button
										className="zip-ai-error-bubble__button-dismiss"
										onClick={ () => {
											const updatedChatLog =
												chatLog.filter(
													( chatBubble ) =>
														chatBubble.from !==
														'error'
												);
											setAiResponseError( '' );
											setChatLog( updatedChatLog );
										} }
									>
										{ __( 'Dismiss', 'zip-ai' ) }
									</button>
								</div>
							) }
						</div>
					</div>
				);
			},
		};
		return <RenderChatLog { ...{ chatBubble: errorBubble } } />;
	};

	// Update the AI Error bubble if and when needed.
	const renderErrorBubble = () => {
		const isAssembleError = aiResponseError?.type === 'assemble-error';

		if ( isAssembleError ) {
			return renderStructredError();
		}

		const errorBubble = {
			type: 'error',
			icon: 'assistant',
			message: aiResponseError,
			action: {
				execute: () => {
					const updatedChatLog = chatLog.filter(
						( chatBubble ) => chatBubble.from !== 'error'
					);
					setAiResponseError( '' );
					setChatLog( updatedChatLog );
				},
				label: __( 'Dismiss', 'zip-ai' ),
			},
		};
		return <RenderChatLog { ...{ chatBubble: errorBubble } } />;
	};

	// If regeneration is occurring, update the last AI message.
	if ( regeneratingId ) {
		const lastMessageId = chatLog.length - 1;
		if (
			'ai' === chatLog[ lastMessageId ]?.from &&
			'loader' !== chatLog?.type &&
			chatLog[ lastMessageId ].id === regeneratingId
		) {
			const chatLogDuringGeneration = chatLog;
			chatLogDuringGeneration[ lastMessageId ].type = 'regeneration';
			setChatLog( chatLogDuringGeneration );
		}
	}

	// Render the required filter buttons.
	return (
		<div className="zip-ai-sidebar__chat-window" ref={ chatWindowRef }>
			{ chatLog?.length || aiResponseError ? (
				<>
					{ chatLog?.length > 0 &&
						chatLog.map( ( chatBubble, index ) => (
							<RenderChatLog
								key={ index }
								{ ...{
									generationRef,
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
									setUserInput,
									refreshFilters,
									setRefreshFilters,
									editCheck,
									setEditCheck,
									setValidForSaving,
								} }
							/>
						) ) }
					{ aiResponseError && renderErrorBubble() }
				</>
			) : (
				<div className="zip-ai-sidebar__chat-window--placeholder">
					{ AiSparkleIcon( {
						width: 32,
						height: 32,
						color: '#5a03ef',
					} ) }
					<h3 className="zip-ai-sidebar__chat-window--placeholder-heading">
						{ __( 'Hi there! I\'m here to assist you.', 'zip-ai' ) }
					</h3>
					<p className="zip-ai-sidebar__chat-window--placeholder-subheading">
						{ __(
							'Choose a prompt bellow or write on your own.',
							'zip-ai'
						) }
						<br />
						{ __( 'Ask me about what you need.', 'zip-ai' ) }
					</p>
				</div>
			) }
			<button
				className="zip-ai-sidebar__chat-window--scroll-button"
				ref={ scrollButtonRef }
				onClick={ () => scrollToBottom() }
				style={ {
					bottom: `${ footerRefHeight }px`,
				} }
			>
				{ ArrowDown() }
			</button>
		</div>
	);
};

export default ChatWindow;
