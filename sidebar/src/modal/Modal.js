/**
 * AI Assistant - The Modal Component.
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import GenerationWindow from './components/GenerationWindow';
import { ContentPrompts } from './components/ContentFilters';
import AuthWindow from './components/AuthWindow';
import ChatWindow from './components/ChatWindow';
import { SidebarContext, getLastAiMessage } from './helpers/RenderChatLog';
import { RenderTooltip } from './helpers/RenderFilter';
import { generateNewText } from './helpers/generateNewText';
import { displayInThousands } from '@Scripts/Helpers';
import { CloseIcon, ExternalLinkIcon } from '@Scripts/IconComponents';
import {
	makeTextShorterEvent,
	makeTextLongerEvent,
	fixGrammarEvent,
	changeToneEvent,
	rephraseTextEvent,
} from '@Sidebar/modal/helpers/aiFeatures';
import './styling.scss';
import LoadingSpinner from './components/loadingSpinner';

// React Component to Render the Zip AI Chat Sidebar.
const ZipChatSidebar = ( props ) => {
	const {
		chatLogId,
		setIsOpen,
		setAdminIsOpen,
		isSidebar = false,
		updateContent,
		currentText = '',
		autoRun,
		setAutoRun,
	} = props;

	// Refs required for the Sidebar
	const overlayRef = useRef( null );
	const sidebarRef = useRef( null );
	const generationRef = useRef( null );
	const scrollButtonRef = useRef( null );

	// The Stored Chat Log. This will be fetched from the Redux Context.
	const storedChatLog =
		JSON.parse( localStorage.getItem( `zipAiPreservedChatlog${ chatLogId }` ) ) ||
		[];
	const zipAiAuthStatus =
		JSON.parse( localStorage.getItem( `zipAiAuthorizationStatus` ) ) ||
		zip_ai_react?.is_authorized ||
		false;

	// The Chat Log
	const [ chatLog, setChatLog ] = useState( storedChatLog );

	// The Zip AI Authorization Status.
	const [ isAuthorized, setIsAuthorized ] = useState( zipAiAuthStatus );

	// State to identify if the user is editing the User message.
	const [ editMode, setEditMode ] = useState( { enabled: false, value: '' } );

	// The AI Response Error, if any.
	const [ aiResponseError, setAiResponseError ] = useState( '' );

	// The text to use for Generation.
	const [ userInput, setUserInput ] = useState( '' );

	// Flag used to update filters based on content change.
	const [ refreshFilters, setRefreshFilters ] = useState( false );

	// Flag used to check whether content is being generated.
	const [ generating, setGenerating ] = useState( false );

	// Set the valid for saving number to 2 if the chatlog has a message from the content.
	const [ validForSaving, setValidForSaving ] = useState(
		storedChatLog.length > 0
	);

	// State to identify the current opened dropdown.
	const [ currentDropdown, setCurrentDropdown ] = useState( null );

	// State to identify the hovered button.
	const [ hoveredButton, setHoveredButton ] = useState( null );

	// State to store the footer's real-time height.
	const [ footerRefHeight, setFooterRefHeight ] = useState( 0 );

	// State to identify if dropdown content has run.
	const [ dropdownContentGenerating, setDropdownContentGenerating ] =
		useState( false );

	// State to save the ref of the current opened dropdown.
	const [ openedDropdownNode, setOpenDropdownNode ] = useState( null );

	// State to show the current credit details.
	const [ creditDetails, setCreditDetails ] = useState(
		zip_ai_react.credit_details
	);
	const [ isLoadingCredits, setIsLoadingCredits ] = useState( true );
	// // States required for the popup authorization UI.
	// const [ userPopupButtonLabel, setUserPopupButtonLabel ] = useState( __( 'Login', 'zip-ai' ) );
	// const [ userPopupAuthSubheading, setUserPopupAuthSubheading ] = useState( __( 'Login to use the AI Assistant!', 'zip-ai' ) );

	// Function to handle the mouse enter event.
	const handleMouseEnter = ( index ) => {
		setHoveredButton( index );
		// If there's a dropdown open, simulate a close.
		if ( openedDropdownNode ) {
			openedDropdownNode?.blur();
			setCurrentDropdown( null );
			setOpenDropdownNode( null );
		}
	};

	// Function to handle the mouse leave event.
	const handleMouseLeave = () => setHoveredButton( null );

	const handleAutoRun = () => {
		// If autoRun or the setAutoRun function are not defined, abandon ship.
		if ( ! autoRun || ! setAutoRun ) {
			return;
		}

		// Set the last used tone that was localized.
		const lastUsedTone =
			zip_ai_react?.zip_ai_assistant_options?.last_used?.changeTone ||
			undefined;

		// Function to generate content.
		const generateContent = ( {
			textCommand,
			oneClickCommand,
			useSystemMessage,
		} ) => {
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

		// Toolbar dropdown options.
		if ( 'not_set' !== autoRun && ! dropdownContentGenerating ) {
			switch ( autoRun ) {
				case 'fix_grammar':
					fixGrammarEvent( generateContent );
					break;
				case 'rephrase':
					rephraseTextEvent( generateContent );
					break;
				case 'make_shorter':
					makeTextShorterEvent( generateContent );
					break;
				case 'make_longer':
					makeTextLongerEvent( generateContent );
					break;
				case 'change_tone':
					changeToneEvent( lastUsedTone, generateContent );
					break;
			}
			setAutoRun( 'not_set' );
			setDropdownContentGenerating( true );
		}
	};

	// // Function to open the user icon popup.
	// const openUserIconPopup = () => {
	// 	setIsUserIconPopupOpen( true );

	// 	// Create the formData for the AJAX request to get the latest credit details.
	// 	const zipAiCreditAjax = new FormData();
	// 	zipAiCreditAjax.append( 'action', 'get_latest_credit_details' );
	// 	zipAiCreditAjax.append( 'nonce', zip_ai_react.ajax_nonce );

	// 	// Update the loading class for the progress wrapper.
	// 	setProgressWrapperLoadingClass( 'zip-ai__progress-wrapper--loading' );

	// 	// Function to remove the loading opacity smoothly.
	// 	const smoothRemoveLoading = () => {
	// 		// First use the loaded class.
	// 		setProgressWrapperLoadingClass( 'zip-ai__progress-wrapper--loaded' );
	// 		// After the CSS animation is done, remove the class altogether.
	// 		setTimeout( () => {
	// 			setProgressWrapperLoadingClass( null );
	// 		}, 150 );
	// 	};

	// 	// Get the latest credit details
	// 	fetch( zip_ai_react.ajax_url, {
	// 		method: 'POST',
	// 		credentials: 'same-origin',
	// 		body: zipAiCreditAjax,
	// 	} )
	// 		.then( ( resp ) => resp.json() )
	// 		.then( ( data ) => {
	// 			// Get the required details, and remove the loading class.
	// 			if ( data?.success && data?.data?.threshold ) {
	// 				setCreditDetails( data.data );
	// 				const latestCreditClass = getCreditLevelClass( data.data );
	// 				setCreditClass( latestCreditClass );
	// 				zip_ai_react.credit_details = data.data;
	// 			}
	// 			smoothRemoveLoading();
	// 		} )
	// 		.catch( () => {
	// 			// Reset the progress wrapper loading class.
	// 			smoothRemoveLoading();
	// 		} );
	// };
	// Function to get fresh credit details
	const getUserCreditrs = () => {
		// Create the formData for the AJAX request to get the latest credit details.
		const zipAiCreditAjax = new FormData();
		zipAiCreditAjax.append( 'action', 'zip_ai_get_fresh_credit_details' );
		zipAiCreditAjax.append( 'nonce', zip_ai_react.ajax_nonce );

		// Get the latest credit details
		fetch( zip_ai_react.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			body: zipAiCreditAjax,
		} )
			.then( ( resp ) => resp.json() )
			.then( ( data ) => {
				// Get the required details, and remove the loading class.
				if ( data?.success && data?.data?.threshold ) {
					setCreditDetails( data.data );
					setIsLoadingCredits( false );
					// Update the global credit details.
					zip_ai_react.credit_details = data.data;
				}
			} )
			.catch( () => {
				setIsLoadingCredits( false );
			} );
	};

	// // Function to close the user icon popup.
	// const closeUserIconPopup = () => {
	// 	userIconPopupRef?.current?.firstChild?.classList?.add( 'zip-ai-sidebar__header--user-popup-content-closed' );
	// 	setTimeout( () => {
	// 		setIsUserIconPopupOpen( false );
	// 	}, 100 );
	// };

	// // Function to close the user icon popup.
	// const handleUserIconPopupClickOutside = ( event ) => {
	// 	// If the user hasn't clicked inside the popup, close it.
	// 	const hasUserClickedOutside = userIconPopupRef?.current && ! userIconPopupRef.current?.contains( event?.target );
	// 	// If the user has clicked inside, but on the wrapper layer, close it.
	// 	const hasUserClickedTheWrapper = event?.target?.classList?.contains( 'zip-ai-sidebar__header--user-popup' );
	// 	if ( hasUserClickedOutside || hasUserClickedTheWrapper ) {
	// 		closeUserIconPopup();
	// 	}
	// };

	// UseEffect to refresh credits when modal opens
	useEffect( () => {
		if ( isAuthorized && ! generating ) {
			setIsLoadingCredits( true );
			getUserCreditrs();
		}
	}, [ isAuthorized, generating ] );

	// UseEffect to refresh credits after content generation
	useEffect( () => {
		if ( ! generating && isAuthorized ) {
			getUserCreditrs();
		}
	}, [ generating ] );

	// UseEffect for the First Time Load.
	useEffect( () => {
		// Get the user of the last chat bubble if it exists.
		const lastChat = chatLog?.length
			? {
				from: chatLog[ chatLog.length - 1 ]?.from,
				message: chatLog[ chatLog.length - 1 ]?.message,
			  }
			: null;
		// If the content bubble does not need to be added to the chatlog, abandon ship.
		if ( ! currentText || 'content' === lastChat?.from ) {
			return;
		}
		// If the last chat bubble matches the content, then don't repeat. If not, then add it.
		if ( currentText.trim() !== lastChat?.message?.trim() ) {
			// Push the content chat bubble into the chatlog.
			chatLog.push( {
				id: chatLog?.length ? chatLog[ chatLog.length - 1 ].id + 1 : 0,
				from: 'content',
				message: currentText,
			} );
			setChatLog( [ ...chatLog ] );
		}
	}, [] );

	// UseEffect to handle autoRun changes
	useEffect( () => {
		// If the autoRun parameter changes, run the handleAutoRun function
		if ( autoRun && autoRun !== 'not_set' ) {
			handleAutoRun();
		}
	}, [ autoRun ] );

	// UseEffect to focus the input field on load, and when the generating state has changed.
	useEffect( () => {
		// If the field is available, focus on it.
		if ( generationRef?.current ) {
			generationRef.current?.focus();
		}
		// If currently generating, reset the hovered tooltip.
		if ( generating ) {
			handleMouseLeave();
		}
	}, [ generationRef, generating ] );

	// The Close Modal Function.
	const closeModal = () => {
		// Add the required SCSS animations to the refs.
		overlayRef?.current.classList.add( 'close-it' );
		sidebarRef?.current.classList.add( 'close-it' );

		// Close the sidebar.
		setTimeout( () => {
			// If the chatlog has a content message at the end, remove it.
			if ( 'content' === chatLog[ chatLog.length - 1 ]?.from ) {
				chatLog.pop();
				setChatLog( [ ...chatLog ] );
			}

			// Save the chatlog only if required - i.e. at least 1 generation has happened.
			if ( validForSaving ) {
				const preservedChatLog = chatLog.slice( -20 );

				// Function to update chat log IDs
				const updateChatLogIds = ( newchatLog ) => {
					return newchatLog.map( ( message, index ) => {
						return { ...message, id: index };
					} );
				};
				// Update chat log IDs so they don't cause issue with missing index
				const updatedChatLog = updateChatLogIds( preservedChatLog );

				// Store updated chat log in localStorage
				localStorage.setItem(
					`zipAiPreservedChatlog${ chatLogId }`,
					JSON.stringify( updatedChatLog )
				);

				// update state with the spliced and updated chat log
				setChatLog( updatedChatLog );
			}

			// Close the sidebar if the editor is in Editor-Pagelevel-Sidebar mode.
			if ( isSidebar ) {
				dispatch( 'core/edit-post' ).closeGeneralSidebar(
					'zip-ai-page-settings-panel'
				);
			}
			setIsOpen( false );

			if ( setAdminIsOpen ) {
				setAdminIsOpen( false );
			}
		}, 150 );
	};
	// // Function to render the user icon.
	// const RenderUserIcon = () => {
	// 	// If the organization name could not be obtained, use a placeholder user icon.
	// 	if ( ! userTeamName || 'string' !== typeof userTeamName ) {
	// 		return UserIcon();
	// 	}

	// 	// Split the organization name into individual words, then fetch the initals from them.
	// 	const nameParts = userTeamName.split( ' ' );
	// 	const initials = nameParts.map( ( namePart ) => namePart.charAt( 0 ) );

	// 	// Return the first two initials if they exist.
	// 	return `${ initials[ 0 ]?.toUpperCase() }${ initials[ 1 ]?.toUpperCase() || '' }`;
	// };

	return (
		<SidebarContext.Provider
			value={ {
				chatLog,
				setChatLog,
				editMode,
				setEditMode,
				currentDropdown,
				setCurrentDropdown,
				hoveredButton,
				setHoveredButton,
				handleMouseEnter,
				handleMouseLeave,
				footerRefHeight,
				setFooterRefHeight,
				scrollButtonRef,
				openedDropdownNode,
				setOpenDropdownNode,
			} }
		>
			<div
				className="zip-ai-sidebar-overlay"
				ref={ overlayRef }
				onClick={ ( e ) => {
					if ( e.target === overlayRef?.current ) {
						return closeModal();
					}
				} }
				onKeyDown={ ( e ) => {
					if ( 'Escape' === e.key ) {
						return closeModal();
					}
				} }
				role="button"
				tabIndex="0"
			>
				<div className="zip-ai-sidebar" ref={ sidebarRef }>
					<div className="zip-ai-sidebar__header">
						<h2 className="zip-ai-sidebar__header--title">
							{ __( 'AI Assistant', 'zip-ai' ) }
						</h2>
						<button
							className="zip-ai-sidebar__header--close"
							onClick={ () => closeModal() }
							onMouseEnter={ () =>
								handleMouseEnter( 'sidebar-close-button' )
							}
							onMouseLeave={ handleMouseLeave }
						>
							{ CloseIcon() }
							{ 'sidebar-close-button' === hoveredButton && (
								<RenderTooltip
									details={ { label: __( 'Close', 'zip-ai' ) } }
								/>
							) }
						</button>
						<div className="zip-ai-sidebar__header--user-wrapper">
							<div className="zip-ai-sidebar__header--user-credit-wrapper">
								{ isAuthorized && ! isLoadingCredits && (
									<>
										<span className="zip-ai-sidebar__header--user-credit-details">
											<b
												className={
													creditDetails?.percentage >
													90
														? 'zip-ai-sidebar__header--user-credit-details-used-high'
														: 'zip-ai-sidebar__header--user-credit-details-used'
												}
											>
												{ displayInThousands(
													creditDetails?.used || 0
												) }
											</b>
											/
											<span className="zip-ai-sidebar__header--user-credit-details-total">
												{ displayInThousands(
													creditDetails?.total || 0
												) }
											</span>
										</span>
										<a
											className="zip-ai-sidebar__header--user-popup-link"
											href={
												zip_ai_react?.credit_topup_url
											}
											target="_blank"
											rel="noreferrer noopener"
										>
											{ __( 'Get More Credits', 'zip-ai' ) }
											{ ExternalLinkIcon( {
												width: 12,
												height: 12,
											} ) }
										</a>
									</>
								) }

								{ isAuthorized && isLoadingCredits && (
									<>
										<span className="zip-ai-sidebar__header--user-credit-details-loading">
											<div className="zip-ai-sidebar__header--user-credit-details-loading-spinner">
												<LoadingSpinner />
											</div>
										</span>
									</>
								) }
							</div>
						</div>
					</div>
					{ /* Render the chat window when authorized, else render the auth window. */ }
					{ isAuthorized ? (
						<>
							<ChatWindow
								{ ...{
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
								} }
							/>
							{ /* Render the initial prompts only when required. */ }
							{ ! ( currentText || chatLog?.length ) && (
								<ContentPrompts
									{ ...{
										currentText,
										generationRef,
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
							<GenerationWindow
								{ ...{
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
								} }
							/>
						</>
					) : (
						<AuthWindow
							{ ...{
								setIsAuthorized,
								setCreditDetails,
							} }
						/>
					) }
				</div>
			</div>
		</SidebarContext.Provider>
	);
};

export default ZipChatSidebar;
