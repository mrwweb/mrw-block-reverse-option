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
        attributes: { rowReverse },
        setAttributes
    } = props;

	return (
		<InspectorControls>
            <Panel>
                <PanelBody>
                    <PanelRow>
                        <ToggleControl
                            __nextHasNoMarginBottom
                            label="Reverse Column Order"
                            help={
                                rowReverse
                                    ? 'Last column is first on small screens'
                                    : ''
                            }
                            checked={ rowReverse }
                            onChange={ (newValue) => {
                                setAttributes( {rowReverse: newValue} );
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
    return attributes.rowReverse ? 'has-row-reverse' : '';
}

registerBlockExtension(
	'core/columns',
	{
		extensionName: 'mrw-block-reverse-option',
        blockName: 'core/columns',
		attributes: {
			rowReverse: {
				type: 'boolean',
				default: false,
			},
		},
		classNameGenerator: generateClassNames,
		Edit: BlockEdit,
	}
);
