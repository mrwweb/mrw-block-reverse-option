import { registerBlockExtension } from '@10up/block-components';
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import '../css/editor-styles.scss'

/**
 * BlockEdit
 *
 * a react component that will get mounted in the editor when the block
 * is selected. It is recommended to use Slots like `BlockControls` or
 * `InspectorControls` in here to put settings into the blocks
 * toolbar or sidebar.
 * 
 * @param {object} props block props
 * @returns {JSX}
 */
function BlockEdit(props) {
	const {
		attributes: { blockReverse = false, layout: { type: layout = null } = {} },
		setAttributes,
		name
	} = props;

	// partial backwards compatibility
	// class .has-row-reverse will need to be manually removed to remove style
	if ( props?.attributes?.className?.includes( 'has-row-reverse' ) ) {
		setAttributes( {blockReverse: true} );
	}

	/* Only applies to Rox and Stack, not Group or Grid */
	if( name === 'core/group' && layout !== 'flex' ) {
		return;
	}

	let label, help;
	if ( name === 'core/group' ) {
		label = "Reverse Block Order";
		help = "When the reading order of blocks doesn't match the visual order. Useful in limited circumstances for responsible and accessibility needs."
	} else {
		label = "Reverse Column Order";
		help = "Columns will stack right-to-left instead of left-to-right on small screens."
	}

	return (
		<InspectorControls>
			<Panel>
				<PanelBody>
					<PanelRow>
						<ToggleControl
							__nextHasNoMarginBottom
							label={label}
							help={help}
							checked={ blockReverse }
							onChange={ (newValue) => {
								setAttributes( {blockReverse: newValue} );
							} }
						/>
					</PanelRow>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}

/**
 * generateClassNames
 *
 * a function to generate the new className string that should
 * get added to the wrapping element of the block.
 *
 * @param {object} attributes block attributes
 * @returns {string}
 */
function generateClassNames(attributes) {
	const { blockReverse } = attributes;
	return blockReverse ? 'has-block-reverse' : '';
}

registerBlockExtension(
	'core/columns',
	{
		extensionName: 'mrw-block-reverse-option',
		blockName: 'core/columns',
		attributes: {
			blockReverse: {
				type: 'boolean',
				default: false,
			},
		},
		classNameGenerator: generateClassNames,
		Edit: BlockEdit,
	}
);

registerBlockExtension(
	'core/group',
	{
		extensionName: 'mrw-block-reverse-option',
		blockName: 'core/group',
		attributes: {
			blockReverse: {
				type: 'boolean',
				default: false,
			},
		},
		classNameGenerator: generateClassNames,
		Edit: BlockEdit,
	}
);
