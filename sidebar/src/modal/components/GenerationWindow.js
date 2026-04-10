/**
 * AI Assistant - Component - The AI generated editable text.
 */

import { useEffect, useContext, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { SendIcon, TrashIcon } from '@Scripts/IconComponents';
import { generateNewText } from '@Sidebar/modal/helpers/generateNewText';
import { SidebarContext, getLastAiMessage } from '@Sidebar/modal/helpers/RenderChatLog';
import { RenderTooltip } from '@Sidebar/modal/helpers/RenderFilter';
import HTMLReactParser from 'html-react-parser';

const GenerationWindow = ( props ) => {
	const {
		chatLogId,
		isAuthorized,
		generationRef,
		currentText,
		userInput,
		setUserInput,
		setRefreshFilters,
		generating,
		setGenerating,
		setAiResponseError,
		validForSaving,
		setValidForSaving,
	} = props;

	const {
		chatLog,
		setChatLog,
		editMode,
		setFooterRefHeight,
		hoveredButton,
		handleMouseEnter,
		handleMouseLeave,
		scrollButtonRef,
	} = useContext( SidebarContext );

	// Set a ref for the entire footer area.
	const footerRef = useRef( null );

	// UseEffect to update the footer ref height whenver the footer ref is changed.
	useEffect( () => {
		// Save the height of the entire footer area.
		if ( footerRef?.current ) {
			setFooterRefHeight( footerRef.current?.offsetHeight );
		}
	}, [ footerRef ] );

	useEffect( () => {
		if ( ! generationRef?.current ) {
			return;
		}

		// If there's no content, directly set the height to the initial.
		if ( ! userInput ) {
			generationRef.current.style.height = '';
			if ( footerRef?.current ) {
				setFooterRefHeight( footerRef.current.offsetHeight );
			}
			return;
		}

		// Set the required constants to calculate the current height required.
		const verticalPadding = 24; // CSS synchronization - 2 x $padding-interactions-input.
		const borderBottom = 56; // CSS synchronization - $textarea-border-bottom.
		const textAreaLineHeight = 20; // CSS synchronization - $line-height-sm.
		const minRows = 1;
		const maxRows = 5;

		// Reset height to auto to allow content to dictate height.
		generationRef.current.style.height = 'auto';

		// Get the current scroll height and remove the vertical padding from it.
		const textArea = generationRef.current.scrollHeight - verticalPadding;
		const newRows = Math.ceil( textArea / textAreaLineHeight );

		// Clamp rows between minRows and maxRows.
		const clampedRows = Math.max( minRows, Math.min( newRows, maxRows ) );

		// Set the required height for the textarea.
		generationRef.current.style.height = `${ ( clampedRows * textAreaLineHeight ) + verticalPadding + borderBottom }px`;

		// Update the height of the entire footer area.
		if ( footerRef?.current ) {
			setFooterRefHeight( footerRef.current.offsetHeight );
		}
	}, [ userInput ] );

	// Get the plugin details from the plugin that loaded this library.
	let pluginDetails = zip_ai_react?.collab_product_details;

	// If the plugin details are not an object, set it to an empty object.
	if ( 'object' !== typeof pluginDetails || null === pluginDetails ) {
		pluginDetails = {};
	}

	// Extract common data from the plugin that loaded this library.
	const {
		ai_assistant_authorized_disable_url: pluginRedirect,
		ai_assistant_unauthorized_disable_url: pluginAuthRedirect,
	} = pluginDetails;

	// Generate new text.
	const generateContent = () => {
		let textContent, textCommand;
		if ( chatLog?.length || currentText ) {
			// If there was a chat, or if this was not an empty Richtext, use that as the content.
			textContent = getLastAiMessage( chatLog, currentText );
			textCommand = userInput;
		} else {
			// Otherwise, use the user input as the content.
			textContent = userInput;
		}
		generateNewText( {
			startingText: currentText,
			textContent,
			textCommand,
			setGenerating,
			setText: setUserInput,
			setRefreshFilters,
			setAiResponseError,
			chatLog,
			setChatLog,
			setValidForSaving,
		} );
	};

	const getDefaultPlaceholder = () => (
		chatLog?.length || '' === currentText ? __( 'How can I help you?', 'zip-ai' ) : currentText
	);

	return (
		<div
			className="zip-ai-sidebar__footer"
			ref={ footerRef }
		>
			<div className="zip-ai-sidebar__input-prompt">
				<div className="zip-ai-sidebar__input-prompt--textarea-wrapper">
					<textarea
						className="zip-ai-sidebar__input-prompt--text"
						onChange={ ( event ) => {
							setUserInput( event.target?.value || '' );
						} }
						onKeyDown={ ( event ) => {
							if ( event.key === 'Enter' && ! event.shiftKey ) {
								event.preventDefault();
								if ( '' !== userInput.trim() ) {
									generateContent();
								}
							}
						} }
						ref={ generationRef }
						value={ userInput }
						disabled={ generating || ! isAuthorized || editMode?.enabled }
						placeholder={ generating ? __( 'Generating…', 'zip-ai' ) : getDefaultPlaceholder() }
					/>
				</div>
				<div className="zip-ai-sidebar__input-prompt--footer">
					<button
						className="zip-ai-sidebar__input-prompt--button"
						onClick={ () => generateContent() }
						onMouseEnter={ () => handleMouseEnter( 'sidebar-send-button' ) }
						onMouseLeave={ handleMouseLeave }
						disabled={ '' === userInput.trim() || generating || ! isAuthorized || editMode?.enabled }
					>
						{ SendIcon( { width: 16, height: 16, color: '#fff' } ) }
						{ 'sidebar-send-button' === hoveredButton && <RenderTooltip details={ { label: __( 'Ask AI', 'zip-ai' ), position: 'left' } } /> }
					</button>
					{ validForSaving && (
						<button
							className="zip-ai-sidebar__input-prompt--button secondary-variant"
							onClick={ () => {
								localStorage.removeItem( `zipAiPreservedChatlog${ chatLogId }` );
								setValidForSaving( false );
								setChatLog( currentText ? [ {
									id: 0,
									from: 'content',
									message: currentText,
								} ] : [] );
								setRefreshFilters( true );
								// If the scroll button is visible, reset it.
								if ( scrollButtonRef?.current && scrollButtonRef.current?.classList.contains( 'scroll-button-is-visible' ) ) {
									scrollButtonRef.current.classList.remove( 'scroll-button-is-visible' );
									scrollButtonRef.current.tabIndex = -1;
									scrollButtonRef.current.setAttribute( 'aria-hidden', 'true' );
								}
							} }
							onMouseEnter={ () => handleMouseEnter( 'sidebar-clear-button' ) }
							onMouseLeave={ handleMouseLeave }
							disabled={ generating || editMode?.enabled }
						>
							{ TrashIcon( { color: '#fff' } ) }
							{ 'sidebar-clear-button' === hoveredButton && <RenderTooltip details={ { label: __( 'Clear Chat', 'zip-ai' ), position: 'right' } } /> }
						</button>
					) }
				</div>
			</div>
			<div className="zip-ai-sidebar__input-prompt--disclaimer">
				{ ( isAuthorized && pluginRedirect ) || ( ! isAuthorized && pluginAuthRedirect )
					? HTMLReactParser(
						sprintf(
						// Translators: %1$s is the opening link tag, %2$s is the closing link tag.
							__( 'AI Assistant can make mistakes. Want to %1$sdisable it?%2$s', 'zip-ai' ),
							`<a href="${ isAuthorized ? pluginRedirect : pluginAuthRedirect }" target="_blank">`,
							'</a>',
						),
					)
					: __( 'AI Assistant can make mistakes.', 'zip-ai' )
				}
			</div>
		</div>
	);
};

export default GenerationWindow;
