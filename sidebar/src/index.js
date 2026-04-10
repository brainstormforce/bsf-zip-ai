import { select } from '@wordpress/data';
import { useState, useEffect, useRef, createRoot } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, Popover, MenuItem } from '@wordpress/components';
import {
	AiSparkleIcon,
	AiSparkleTextIcon,
	BookCheckIcon,
	ContentAddIcon,
	ContentRemoveIcon,
	SmileyIcon,
	OpenIcon,
	ResetIcon,
} from '@Scripts/IconComponents';
import { getRandomNumber } from '@Scripts/Helpers';
import './styling.scss';

import { replace, registerFormatType } from '@wordpress/rich-text';
import { __, sprintf } from '@wordpress/i18n';
import ZipChatSidebar from './modal/Modal';

// Create the Default Constants
const name = 'zipai/chat';
const cssClass = 'zip-ai-highlighted';

// Create the sidebar root.
const sidebarElement = document.querySelector( '#zip-ai-sidebar' );
const adminTriggerElement = document.querySelector( '#zip-ai-sidebar-admin-trigger' );
const adminbarElement = document.querySelector( '#wp-admin-bar-zip-ai-assistant' );
const chatLogId = getRandomNumber();

// Common styling for filter SVGs.
const commonFilterSvgStyling = {
	fill: '#000',
};

const AIExtension = ( props ) => {
	// Destructure the required props.
	const {
		onChange,
		value = { text: '' },
		isRichText = true,
		isAdmin = false,
		setAdminIsOpen = null,
	} = props;

	// Set the required variables.
	const [ isOpen, setIsOpen ] = useState( false );
	const [ isActiveFormatAI, setActiveFormatAI ] = useState( false );
	const [ autoRun, setAutoRun ] = useState( 'not_set' );

	// Create a reference for the sidebar root.
	const sidebarRoot = useRef( null );

	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );

	// First run functionality.
	useEffect( () => {
		// If this is not a RichText, or if this is and adminbar trigger, Open the sidebar.
		if ( ! isRichText || isAdmin ) {
			shouldOpenModal();
		}
	}, [] );

	// UseEffect that runs when the sidebar visibility is altered.
	useEffect( () => {
		// Prevent body scrolling when the sidebar is open.
		if ( isOpen ) {
			document.body.style.overflow = 'hidden';
		}

		// Highlight the selected RichText if required.
		if ( isRichText && ! isAdmin && ! isOpen && isActiveFormatAI ) {
			const AIContent = { ...value };
			onChange( AIContent );
			setActiveFormatAI( false );
		}

		// If the sidebar is open, render the sidebar.
		const renderTimeout = setTimeout( () => {
			if ( isOpen ) {
				sidebarRoot.current = sidebarRoot.current ?? createRoot( isAdmin ? adminTriggerElement : sidebarElement );
				sidebarRoot.current?.render(
					<ZipChatSidebar
						chatLogId={ chatLogId }
						setIsOpen={ setIsOpen }
						setAdminIsOpen={ setAdminIsOpen }
						isSidebar={ ! isRichText && ! isAdmin }
						updateContent={ ( isRichText && ! isAdmin ) ? updateAIContent : null }
						currentText={ checkForDefaultValues( value.text ) }
						autoRun={ autoRun }
						setAutoRun={ setAutoRun }
					/>
				);
			}
		} );

		// Unmount the sidebar if it is closed.
		return () => {
			document.body.style.overflow = '';
			clearTimeout( renderTimeout );
			const root = sidebarRoot.current;
			sidebarRoot.current = undefined;

			setTimeout( () => {
				// Unmount the root component if it exists to clean up React nodes safely.
				if ( root && typeof root?.unmount === 'function' ) {
					root?.unmount();
				}
			} );
		};
	}, [ isOpen ] );

	// Function to update the RichText content.
	const updateAIContent = ( content ) => {
		let AIContent = { ...value };
		AIContent = replace( value, value.text, content );
		AIContent.start = 0;
		AIContent.end = 0;
		onChange( AIContent );
	};

	// Function to check if the modal should be opened or an error should be displayed.
	const shouldOpenModal = ( newAutoRun ) => {
		setIsOpen( true );
		const defaultValues = checkForDefaultValues( value.text );
		// check for default values and weather to open or run a specific command by setting autoRun
		if ( '' !== defaultValues && newAutoRun && 'open' !== newAutoRun && 'not_set' !== newAutoRun ) {
			setAutoRun( newAutoRun );
		}
		setIsPopoverVisible( false );
	};

	// Function to check for default values.
	const checkForDefaultValues = ( text ) => {
		// If this is an adminbar triggered modal, return the currently selected text from the window, if any.
		if ( isAdmin && ! isRichText ) {
			// Get the selection, and remove any whitespace or newline at the end.
			return document.getSelection().toString().trim().replace( /\n$/, '' ) || '';
		}

		if ( ! isRichText ) {
			return '';
		}

		const defaultValues = [
			'Your Attractive Heading',
			'Engage Your Visitors',
		];

		if ( defaultValues.includes( text ) ) {
			return '';
		}

		const AIContent = { ...value };
		if ( ( AIContent.start !== 0 || AIContent.end !== AIContent.text.length ) && ! isActiveFormatAI ) {
			onChange( AIContent );
			setActiveFormatAI( true );
		}

		return text;
	};

	// ZIP AI Stored tone in database.
	const lastUsedTone = zip_ai_react?.zip_ai_assistant_options?.last_used?.changeTone || undefined;

	const ToolbarPopupOption = () => {
		return (
			<>
				<Popover
					position="bottom center"
					focusOnMount="container"
					className="zip-ai-popover"
				>
					<MenuItem iconPosition="left" icon={ BookCheckIcon( commonFilterSvgStyling ) }
						onClick={ () => shouldOpenModal( 'fix_grammar' ) }>
						{ __( 'Fix Grammar', 'zip-ai' ) }
					</MenuItem>
					<MenuItem iconPosition="left" icon={ ResetIcon( commonFilterSvgStyling ) }
						onClick={ () => shouldOpenModal( 'rephrase' ) }>
						{ __( 'Rephrase', 'zip-ai' ) }
					</MenuItem>
					<MenuItem iconPosition="left" icon={ ContentRemoveIcon( commonFilterSvgStyling ) }
						onClick={ () => shouldOpenModal( 'make_shorter' ) }>
						{ __( 'Make Shorter', 'zip-ai' ) }
					</MenuItem>
					<MenuItem iconPosition="left" icon={ ContentAddIcon( commonFilterSvgStyling ) }
						onClick={ () => shouldOpenModal( 'make_longer' ) }>
						{ __( 'Make Longer', 'zip-ai' ) }
					</MenuItem>
					{ undefined !== lastUsedTone && (
						<MenuItem iconPosition="left" icon={ SmileyIcon( commonFilterSvgStyling ) }
							onClick={ () => shouldOpenModal( 'change_tone' ) }>
							{ sprintf(
								/* translators: %s: lastUsedTone label */
								__( 'Change Tone to %s', 'zip-ai' ), lastUsedTone.label ) }
						</MenuItem>
					) }
					<MenuItem iconPosition="left" icon={ OpenIcon( commonFilterSvgStyling ) }
						onClick={ () => shouldOpenModal( 'open' ) }>
						{ __( 'Something Else', 'zip-ai' ) }
					</MenuItem>
				</Popover>
			</>
		);
	};

	return isRichText ? (
		<BlockControls>
			<Toolbar className="zip-ai-toolbar" label="Zip AI">
				<ToolbarButton
					className="zip-ai-toolbar-button"
					onClick={ () => setIsPopoverVisible( ! isPopoverVisible ) }
					icon={ AiSparkleTextIcon() }
					label={ __( 'AI Assistant', 'zip-ai' ) }
				/>
				{ isPopoverVisible && (
					<ToolbarPopupOption />
				) }
			</Toolbar>
		</BlockControls>
	) : null;
};

// The AI Sidebar Panel Trigger.
const SidebarTrigger = () => {
	const getSidebarStore = 'widgets' !== zip_ai_react.is_widgets_page ? window?.wp?.editPost : null;
	if ( ! getSidebarStore || ! getSidebarStore?.PluginSidebar || ! getSidebarStore?.PluginSidebarMoreMenuItem ) {
		return null;
	}
	const PluginSidebar = getSidebarStore.PluginSidebar;
	const PluginSidebarMoreMenuItem = getSidebarStore.PluginSidebarMoreMenuItem;
	// If the PluginSidebar or PluginSidebarMoreMenuItem is still not available, then return null for WP lower version.
	if ( 'function' !== typeof PluginSidebarMoreMenuItem || 'function' !== typeof PluginSidebar ) {
		return null;
	}
	return (
		<>
			{ /* Page Settings Icon. */ }
			<PluginSidebarMoreMenuItem target="zip-ai-page-settings-panel" icon={ AiSparkleIcon() }>
				{ __( 'AI Assistant', 'zip-ai' ) }
			</PluginSidebarMoreMenuItem>

			{ /* Page Settings Area. */ }
			<PluginSidebar
				isPinnable={ true }
				icon={ AiSparkleIcon() }
				name="zip-ai-page-settings-panel"
				title={ __( 'AI Assistant', 'zip-ai' ) }
				className={ 'zip-ai-sidebar' }
			>
				<AIExtension { ...{ isRichText: false } } />
			</PluginSidebar>
		</>
	);
};

// The AI Admin-bar Trigger.
const AdminbarTrigger = () => {
	const [ adminIsOpen, setAdminIsOpen ] = useState( false );

	// First run functionality.
	useEffect( () => {
		adminbarElement.addEventListener( 'click', ( event ) => {
			event.preventDefault();
			setAdminIsOpen( true );
		} );
	}, [] );

	return adminIsOpen ? <AIExtension { ...{ isRichText: false, isAdmin: true, setAdminIsOpen } } /> : null;
};

// Register the required codes only if needed.
if ( zip_ai_react?.is_ai_assistant_enabled ) {
	// Register the AI Format Type for Rich Texts if it's not in the widget customizer.
	// This will be removed once we create our own custom sidebar instead of using the WP Modal.
	if ( ! zip_ai_react?.is_customize_preview ) {
		registerFormatType( name, {
			tagName: 'span',
			className: cssClass,
			edit: AIExtension,
			title: __( 'AI Assistant', 'zip-ai' ),
		} );
	}

	// Register the sidebar if this is the editor or the full site editor.
	if ( select( 'core/editor' ) ) {
		registerPlugin( 'zip-ai-page-level-settings', { render: SidebarTrigger } );
	}

	// If the adminbar element exists, add the AI Extension component to it, and then replace the link inside it to render the component..
	if ( adminTriggerElement && adminbarElement ) {
		const adminBarRoot = createRoot( adminTriggerElement );
		adminBarRoot.render( <AdminbarTrigger /> );
	}

	// Function to remove the locally stored chatlog if it exists.
	const clearStoredChatLog = () => {
		localStorage.removeItem( `zipAiPreservedChatlog${ chatLogId }` );
	};

	// Remove the locally stored chatlog on page unload.
	window.addEventListener( 'beforeunload', clearStoredChatLog );
}
