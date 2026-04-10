/**
 * AI Assistant - Helper - Render the Filter Button.
 */

import { useState, useContext, useRef } from '@wordpress/element';
import { zipAiClassNames } from '@Scripts/Helpers';
import { SidebarContext } from './RenderChatLog';
import Select, { components } from 'react-select';

// Render the tooltop.
export const RenderTooltip = ( props ) => {
	const {
		details: {
			label,
			position = 'bottom',
		},
	} = props;

	return (
		<div className={ `zip-ai-sidebar__tooltip zip-ai-sidebar__tooltip-positioned--${ position }` }>
			<div className="zip-ai-sidebar__tooltip--content">
				{ label }
			</div>
		</div>
	);
};

// Render the chat-based generation button.
export const RenderShortcut = ( props ) => {
	const {
		shortcut: {
			label,
			id,
			icon = null,
			clickEvent = null,
			disabled = false,
			position = 'bottom',
		},
	} = props;

	const {
		hoveredButton,
		handleMouseEnter,
		handleMouseLeave,
	} = useContext( SidebarContext );

	return (
		<button
			className={ zipAiClassNames( [
				'zip-ai-sidebar__chat-bubble--shortcut',
				! icon && 'zip-ai-sidebar__chat-bubble--shortcut-no-icon',
			] ) }
			onClick={ clickEvent }
			disabled={ disabled }
			onMouseEnter={ () => handleMouseEnter( id ) }
			onMouseLeave={ handleMouseLeave }
		>
			{ /* Render the Icon if it exists, else render the label. */ }
			{ icon || label }
			{ /* If the icon exists, render the tooltip */ }
			{ ( icon && id === hoveredButton ) && <RenderTooltip details={ { label, position } } /> }
		</button>
	);
};

// Render the propmt.
export const RenderPrompt = ( props ) => {
	const {
		filter: {
			feature,
			possibilityText = '',
			clickEvent = null,
			classNames = [],
			disabled = false,
		},
	} = props;

	return (
		<button
			className={ zipAiClassNames( [
				'zip-ai-sidebar__prompt--button',
				...classNames,
			] ) }
			onClick={ clickEvent }
			disabled={ disabled }
		>
			<span className="zip-ai-sidebar__prompt--heading">{ feature }</span>
			<span className="zip-ai-sidebar__prompt--subheading">{ possibilityText }</span>
		</button>
	);
};

// Render the filter.
const RenderFilter = ( props ) => {
	const {
		filter: {
			id,
			icon = null,
			feature,
			clickEvent = null,
			disabled = false,
			options = [],
			position = 'top',
		},
		type = 'button',
	} = props;

	// Get the context values for the hover state.
	const {
		hoveredButton,
		handleMouseEnter,
		handleMouseLeave,
		setHoveredButton,
		currentDropdown,
		setCurrentDropdown,
		setOpenDropdownNode,
	} = useContext( SidebarContext );

	// A value state required for specifc filter types, and an inputValue state required for the dropdown search.
	const [ value, setValue ] = useState( null );
	const dropdownSearchRef = useRef( null );

	// State for the menu list height and refs for the dropdown.
	const [ maxMenuHeight, setMaxMenuHeight ] = useState( '360px' );
	const dropdownRef = useRef( null );
	const reactSelectRef = useRef( null );

	// The Filter Button Render.
	const renderButton = () => (
		<RenderShortcut shortcut={ {
			label: feature,
			id,
			icon,
			clickEvent,
			disabled,
			position,
		} } />
	);

	// A basic function that returns null - used for ensuring certain React Select functions are not called.
	const ReturnNull = () => null;

	// The Filter Select Render.
	const renderSelect = ( useSearch = true ) => {
		// The Control Container for the Select Filters.
		const Control = ( remainingProps ) => (
			components.Control && <components.Control { ...remainingProps } />
		);

		// The Dropdown indicator for the Select Filters.
		const DropdownIndicator = ( { children, ...remainingProps } ) => (
			components.DropdownIndicator && (
				<components.DropdownIndicator { ...remainingProps }>
					{ icon }
					{ children }
				</components.DropdownIndicator>
			)
		);

		// The Menu Container for the Select Filters.
		const Menu = ( { children, ...remainingProps } ) => {
			return components.Menu && (
				<components.Menu { ...remainingProps }>
					<div className="zip-ai-sidebar__chat-bubble--interaction-dropdown-title">{ feature }</div>
					{ useSearch && (
						<>
							<div
								className="zip-ai-sidebar__chat-bubble--interaction-dropdown-search"
								ref={ dropdownSearchRef }
							>
								{ /* The actual value for the search. */ }
								<span className="zip-ai-sidebar__chat-bubble--interaction-dropdown-search-value"></span>
								{ /* The simulated blinking cursor. */ }
								<span className="zip-ai-sidebar__chat-bubble--interaction-dropdown-search-cursor" />
								{ /* The placeholder text */ }
								<span className="zip-ai-sidebar__chat-bubble--interaction-dropdown-search-placeholder">Search…</span>
							</div>
						</>
					) }
					{ children }
				</components.Menu>
			);
		};

		// Common colors used for the React Select styling.
		const dropdownColors = {
			primary: '#007cba',
			icon: '#64748b',
			border: '#e6e7e9',
			background: '#f2f5f7',
			text: '#50575e',
			white: '#fff',
			transparent: 'transparent',
		};

		// Common font styling for the React Select
		const commonFontStyling = {
			fontFamily: 'Inter',
			fontSize: '0.75rem',
			fontWeight: '400',
			lineHeight: '1rem',
		};

		// Styles for the Select Filters.
		const styles = {
			// The Select Control Wrapper.
			container: ( provided ) => ( {
				...provided,
				maxWidth: '24px',
				zIndex: 99999,
			} ),
			// The Select Control, with provided and destructured state.
			control: ( provided, { isDisabled } ) => ( {
				...provided,
				...commonFontStyling,
				minHeight: '24px',
				height: '24px',
				width: '24px',
				cursor: 'pointer',
				opacity: isDisabled ? '0.5' : '1',
				backgroundColor: dropdownColors.transparent,
				color: isDisabled ? dropdownColors.border : dropdownColors.icon,
				border: 'none',
				display: 'flex',
				alignItems: 'center',
				boxShadow: 'none',
				zIndex: 99999,
			} ),
			// The Menu of the Select Control.
			menu: ( provided ) => ( {
				...provided,
				right: 0,
				width: 'auto',
				minWidth: '150px',
				border: `1px solid ${ dropdownColors.border }`,
				borderRadius: '6px',
				boxShadow: '0 4px 8px -2px rgba( 16, 24, 40, 0.1 ), 0 2px 4px -2px rgba( 16, 24, 40, 0.06 )',
				zIndex: 99999,
			} ),
			// The Menu List of the Select Control.
			menuList: ( provided ) => ( {
				...provided,
				maxHeight: maxMenuHeight,
			} ),
			// The Value Side of the Select Control.
			valueContainer: ( provided ) => ( {
				...provided,
				height: '24px',
				padding: 0,
				display: 'flex',
				overflow: 'hidden',
			} ),
			// The Input Area of the Select Control.
			input: ( provided ) => ( {
				...provided,
				height: '24px',
				padding: 0,
				margin: 0,
			} ),
			// The Selected Value of the Select Control.
			singleValue: ( provided ) => ( {
				...provided,
				maxWidth: 0,
			} ),
			// The Dropdown Indicator.
			dropdownIndicator: ( provided, { isDisabled } ) => ( {
				...provided,
				padding: '4px',
				opacity: '1 !important',
				color: isDisabled ? dropdownColors.border : dropdownColors.icon,
				'&:hover': {
					color: isDisabled ? dropdownColors.border : dropdownColors.icon,
					backgroundColor: dropdownColors.background,
				},
				'&:active': {
					color: isDisabled ? dropdownColors.border : dropdownColors.icon,
					backgroundColor: dropdownColors.background,
				},
			} ),
			// The Containers that wrap the indicators.
			indicatorsContainer: ( provided ) => ( {
				...provided,
				color: dropdownColors.icon,
				height: '24px',
			} ),
			// The Option value.
			option: ( provided ) => ( {
				...provided,
				...commonFontStyling,
			} ),
		};

		// Function to reset the dropdown value after using it in the click event.
		const updateDropdownValue = ( option ) => {
			clickEvent( option );
			setValue( null );
		};

		// Function to update the cosmetic input field in the dropdown when the value is changed, without closing the dropdown.
		const handleInputChange = ( inputValue ) => {
			// If the dropdown search ref does not exist, abandon ship.
			if ( ! dropdownSearchRef?.current ) {
				return;
			}

			// Get the input and placeholder elements of the dropdown search ref.
			const searchBox = dropdownSearchRef.current;
			const searchBoxValue = searchBox.children[ 0 ];
			const searchBoxPlaceholder = searchBox.children[ searchBox.children.length - 1 ];

			// Update the placeholedr and input elements according to the current input value.
			if ( inputValue ) {
				searchBoxValue.innerHTML = inputValue;
				searchBoxPlaceholder.innerHTML = '';
			} else {
				searchBoxValue.innerHTML = '';
				searchBoxPlaceholder.innerHTML = 'Search…';
			}
		};

		// Function to handle the mouse exit event only if required.
		const handleDropdownMouseLeave = () => ( ( id === currentDropdown ) ? null : handleMouseLeave() );

		// Function to handle opening the menu.
		const handleMenuOpen = () => {
			if ( ! dropdownRef?.current ) {
				return;
			}

			// If the dropdown ref exists, update the context so that it can later be blurred.
			if ( reactSelectRef?.current ) {
				setOpenDropdownNode( reactSelectRef.current );
			}

			// Get the filter row's position, and if it's near the end shrink the menu list.
			const filterRow = dropdownRef.current.parentNode;
			const filterRowDimensions = filterRow.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

			// IF this list is overflowing, get the viewport height and subtract the bottom position of the dropdown triggerm and 120px for the custom heading area.
			if ( ( filterRowDimensions.bottom + 360 ) > ( viewportHeight ) ) {
				// If this does not have a search, we can increase the height safely by px.
				const searchDifference = useSearch ? 0 : 28;
				setMaxMenuHeight( `${ viewportHeight - filterRowDimensions.bottom - 80 + searchDifference }px` );
			} else {
				setMaxMenuHeight( '360px' );
			}
			setCurrentDropdown( id );
		};

		return (
			<div
				className={ zipAiClassNames( [
					'zip-ai-sidebar__chat-bubble--interaction-dropdown',
					'zip-ai-sidebar__chat-bubble--shortcut',
					disabled && 'zip-ai-sidebar__chat-bubble--interaction-dropdown-disabled',
				] ) }
				onMouseEnter={ () => {
					if ( id !== currentDropdown ) {
						handleMouseEnter( id );
					}
				} }
				onMouseLeave={ handleDropdownMouseLeave }
				ref={ dropdownRef }
			>
				<Select
					placeholder=""
					options={ options }
					value={ value }
					onChange={ ( option ) => updateDropdownValue( option ) }
					onInputChange={ ( inputValue ) => handleInputChange( inputValue ) }
					onMenuOpen={ () => handleMenuOpen() }
					onMenuClose={ () => {
						setCurrentDropdown( null );
						setHoveredButton( null );
					} }
					isDisabled={ disabled }
					isSearchable={ useSearch }
					isMulti={ false }
					menuPosition="fixed"
					menuPlacement="auto"
					components={ {
						ClearIndicator: ReturnNull,
						Control,
						DropdownIndicator,
						IndicatorSeparator: ReturnNull,
						Menu,
					} }
					styles={ styles }
					classNamePrefix="zip-ai-select"
					ref={ reactSelectRef }
				/>
				{ ( ! disabled && id === hoveredButton && id !== currentDropdown ) && <RenderTooltip details={ { label: feature, position } } /> }
			</div>
		);
	};

	// Render the required filter.
	switch ( type ) {
		case 'select':
			return renderSelect();
		case 'select-without-search':
			return renderSelect( false );
		default:
			return renderButton();
	}
};

export default RenderFilter;
