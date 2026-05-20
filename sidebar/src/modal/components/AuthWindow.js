/**
 * AI Assistant - Component - The Authentication Window.
 */

import { useState } from '@wordpress/element';
import { ZipWPLogo, translucentSet } from '@Scripts/IconComponents';
import { getCreditLevelClass } from '@Scripts/Helpers';
import { __, sprintf } from '@wordpress/i18n';
import HTMLReactParser from 'html-react-parser';

// Function to authorize Zip AI.
export const authorizeZipAi = ( event, data ) => {
	event.preventDefault();

	const {
		setIsAuthorized,
		setButtonLabel,
		setSubHeading,
		setUserTeamName,
		setCreditDetails,
		setCreditClass,
		buttonLabels,
		subHeadings,
	} = data;
	// Get he event target and disable it.
	const authButton = event.target;
	authButton.disabled = true;

	const positioning = {
		left: ( screen.width - 480 ) / 2,
		top: ( screen.height - 720 ) / 2,
	};

	// Redirect to the Zip AI Authorization URL.
	const authWindow = window.open( zip_ai_react.auth_middleware, 'ZipAiAuthorization', `width=480,height=720,top=${ positioning.top },left=${ positioning.left },scrollbars=0` );

	// Create the formData for the AJAX request, with the typed in value as the search query.
	const zipAiAuthLooper = new FormData();
	zipAiAuthLooper.append( 'action', 'zip_ai_verify_authenticity' );
	zipAiAuthLooper.append( 'nonce', zip_ai_react.ajax_nonce );

	// Set a counter for timeout.
	let iterations = 0;

	// Update the texts.
	setButtonLabel( buttonLabels?.progress );
	setSubHeading( HTMLReactParser(
		// First render the text.
		subHeadings?.progressWithLink,
		// Then add the click event to the link.
		{
			replace: ( domNode ) => {
				const { name } = domNode;
				if ( 'a' === name ) {
					domNode.attribs.onClick = () => authWindow.focus();
				}
				return domNode;
			},
		}
	) );

	// Set an interval to check if the option was updated.
	const authVerificationInterval = setInterval( () => {
		// Clear the interval if the window was closed, or automatically after 5 minutes.
		if ( authWindow.closed || 300 === iterations ) {
			// Close the auth window if it wasn't closed.
			if ( ! authWindow.closed ) {
				authWindow.close();
			}
			// Reset the texts and enable the button.
			clearInterval( authVerificationInterval );
			setButtonLabel( buttonLabels?.error );
			setSubHeading( subHeadings?.error );
			authButton.disabled = false;
		}

		// Make the AJAX request to check if the option was updated.
		fetch( zip_ai_react.ajax_url, {
			method: 'POST',
			credentials: 'same-origin',
			body: zipAiAuthLooper,
		} )
			.then( ( resp ) => resp.json() )
			.then( ( fetchedData ) => {
				if ( fetchedData?.success && fetchedData?.data?.is_authorized ) {
					authWindow.close();
					localStorage.setItem( 'zipAiAuthorizationStatus', true );
					setIsAuthorized( true );
					setButtonLabel( buttonLabels?.success );
					setSubHeading( subHeadings?.success );
					authButton.disabled = false;
					clearInterval( authVerificationInterval );
					// If the teamname was passed, update it in the sidebar.
					if ( fetchedData.data?.team_name && 'string' === typeof fetchedData.data.team_name ) {
						setUserTeamName( fetchedData.data.team_name );
					}
					// If the credit details exist, update them.
					if ( fetchedData.data?.credit_details && fetchedData.data.credit_details?.threshold ) {
						setCreditDetails( fetchedData.data.credit_details );
						const latestCreditClass = getCreditLevelClass( fetchedData.data.credit_details );
						setCreditClass( latestCreditClass );
						zip_ai_react.credit_details = fetchedData.data.credit_details;
					}
				}
			} );
		iterations++;
	}, 500 );
};

// The auth window component
const AuthWindow = ( props ) => {
	const {
		setIsAuthorized,
		setUserTeamName,
		setCreditDetails,
		setCreditClass,
	} = props;

	// Set the default messages based on whether the user is new or has linked before.
	const buttonText = ( 'disconnected' === zip_ai_react?.current_status
		? __( 'Reconnect and Continue Using AI Features', 'zip-ai' )
		: __( 'Get Started with 1000 Free Monthly Credits', 'zip-ai' )
	);
	const progressText = ( 'disconnected' === zip_ai_react?.current_status
		? __( 'Reconnecting…', 'zip-ai' )
		: __( 'Getting Started…', 'zip-ai' )
	);
	const subText = sprintf(
		// Translators: %1$s is the opening link tag, %2$s is the closing link tag.
		__( 'Get started from %1$shere%2$s.', 'zip-ai' ),
		`<a class="zip-ai-sidebar__chat-window--placeholder-link" href="javascript:void(0);">`,
		'</a>',
	);

	// States required for the UI.
	const [ buttonLabel, setButtonLabel ] = useState( buttonText );
	const [ subHeading, setSubHeading ] = useState( __( 'The possibilities are endless!', 'zip-ai' ) );

	// Get the plugin details from the plugin that loaded this library.
	let pluginDetails = zip_ai_react?.collab_product_details;

	// If the plugin details are not an object, set the fallback values wherever needed.
	if ( 'object' !== typeof pluginDetails || null === pluginDetails ) {
		pluginDetails = {
			product_primary_color: '#007cba',
		};
	}

	// Extract common data from the plugin that loaded this library.
	const {
		product_name: pluginName,
		product_logo: pluginLogo,
		product_primary_color: pluginColor,
		ai_assistant_learn_more_url: pluginLearnMore,
	} = pluginDetails;

	return (
		<div className="zip-ai-sidebar__chat-window">
			<div className="zip-ai-sidebar__chat-window--placeholder">
				<div className="zip-ai-sidebar__chat-window--placeholder-logos">
					{ pluginLogo && (
						<>
							{ HTMLReactParser( pluginLogo ) }
							{ /* Render a plus sign */ }
							<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12.3125 5.75C12.3125 6.24219 11.9023 6.65234 11.4375 6.65234H7.5V10.5898C7.5 11.0547 7.08984 11.4375 6.625 11.4375C6.13281 11.4375 5.75 11.0547 5.75 10.5898V6.65234H1.8125C1.32031 6.65234 0.9375 6.24219 0.9375 5.75C0.9375 5.28516 1.32031 4.90234 1.8125 4.90234H5.75V0.964844C5.75 0.472656 6.13281 0.0625 6.625 0.0625C7.08984 0.0625 7.5 0.472656 7.5 0.964844V4.90234H11.4375C11.9023 4.875 12.3125 5.28516 12.3125 5.75Z" fill="#555d66" />
							</svg>
						</>
					) }
					{ ZipWPLogo( {
						width: 32,
						height: 32,
						color: '#ff580e',
					} ) }
				</div>
				<h3 className="zip-ai-sidebar__chat-window--placeholder-heading">
					{ pluginName
						? sprintf(
							/* translators: %s: Plugin Name */
							__( 'Build 10x Faster with %s AI', 'zip-ai' ),
							pluginName,
						)
						: __( 'Build 10x Faster with ZipWP', 'zip-ai' )
					}
				</h3>
				<p className="zip-ai-sidebar__chat-window--placeholder-subheading">
					{ pluginName
						? sprintf(
							/* translators: %s: Plugin Name */
							__( '%s offers AI features powered by ZipWP to help you build your website 10 times faster.', 'zip-ai' ),
							pluginName,
						)
						: __( 'ZipWP offers AI features to help you build your website 10 times faster.', 'zip-ai' )
					}

				</p>
				<div className="zip-ai-sidebar__chat-window--placeholder-grid">
					<div className="zip-ai-sidebar__chat-window--placeholder-grid-item">
						{ translucentSet.translateIcon( {
							width: 32,
							height: 32,
							color: pluginColor,
						} ) }
						<div className="zip-ai-sidebar__chat-window--placeholder-grid-item-heading">
							{ __( 'Translate Your Pages', 'zip-ai' ) }
						</div>
					</div>
					<div className="zip-ai-sidebar__chat-window--placeholder-grid-item">
						{ translucentSet.pencilIcon( {
							width: 32,
							height: 32,
							color: pluginColor,
						} ) }
						<div className="zip-ai-sidebar__chat-window--placeholder-grid-item-heading">
							{ __( 'Write Content for Pages', 'zip-ai' ) }
						</div>
					</div>
					<div className="zip-ai-sidebar__chat-window--placeholder-grid-item">
						{ translucentSet.codeIcon( {
							width: 32,
							height: 32,
							color: pluginColor,
						} ) }
						<div className="zip-ai-sidebar__chat-window--placeholder-grid-item-heading">
							{ __( 'Generate Custom Code', 'zip-ai' ) }
						</div>
					</div>
					<div className="zip-ai-sidebar__chat-window--placeholder-grid-item">
						{ translucentSet.layersIcon( {
							width: 32,
							height: 32,
							color: pluginColor,
						} ) }
						<div className="zip-ai-sidebar__chat-window--placeholder-grid-item-heading">
							{ __( 'Customize Templates', 'zip-ai' ) }
						</div>
					</div>
					<div className="zip-ai-sidebar__chat-window--placeholder-grid-item">
						{ translucentSet.descriptionIcon( {
							width: 32,
							height: 32,
							color: pluginColor,
						} ) }
						<div className="zip-ai-sidebar__chat-window--placeholder-grid-item-heading">
							{ __( 'Craft Product Descriptions', 'zip-ai' ) }
						</div>
					</div>
					<div className="zip-ai-sidebar__chat-window--placeholder-grid-item">
						{ translucentSet.chatBubbleIcon( {
							width: 32,
							height: 32,
							color: pluginColor,
						} ) }
						<div className="zip-ai-sidebar__chat-window--placeholder-grid-item-heading">
							{ __( 'Engage with Comments', 'zip-ai' ) }
						</div>
					</div>
				</div>
				<p className="zip-ai-sidebar__chat-window--placeholder-padded-content">
					{ subHeading }
				</p>
				<button
					className="zip-ai-sidebar__chat-window--placeholder-button"
					onClick={ ( event ) => authorizeZipAi( event, {
						setIsAuthorized,
						setButtonLabel,
						setSubHeading,
						setUserTeamName,
						setCreditDetails,
						setCreditClass,
						buttonLabels: {
							progress: progressText,
							success: __( 'Get Ready!', 'zip-ai' ),
							error: buttonText,
						},
						subHeadings: {
							progressWithLink: subText,
							success: __( 'The possibilities are endless!', 'zip-ai' ),
							error: __( 'Something went wrong, please try again.', 'zip-ai' ),
						},
					} ) }
				>
					{ buttonLabel }
				</button>
				{ pluginLearnMore && (
					<a
						className="zip-ai-sidebar__chat-window--placeholder-subheading zip-ai-sidebar__chat-window--placeholder-link"
						href={ pluginLearnMore }
						target="_blank" rel="noreferrer"
					>
						{ __( 'Learn more', 'zip-ai' ) }
					</a>
				) }
			</div>
		</div>
	);
};

export default AuthWindow;
