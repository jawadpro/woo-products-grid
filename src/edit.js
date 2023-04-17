import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl , ToggleControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __experimentalGrid as Grid } from '@wordpress/components';

const Edit = ( { attributes, setAttributes } ) => {

	const options = [];
	const { data, limit , column , showImage , showPrice , acf } = attributes;  
	
	//Get All Products
	const products = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'product' , { per_page: limit , _embed: true, meta: '*'
	});
    }, []);

	if( products )
	{
		setAttributes( { data: products } );
		console.log(products);
	}

	const onColChange = ( value ) => {
		setAttributes( { column: parseInt( value ) } );
	};
	
	const onLimitChange = ( value ) => {
	setAttributes( { limit: parseInt( value ) } );
	};

	const onImageSwitchChange = ( value ) => {
		setAttributes( { showImage: !showImage } );
	};

	const onPriceSwitchChange = ( value ) => {
		setAttributes( { showPrice: !showPrice } );
	};

    return (
        <>

		<InspectorControls>
				<PanelBody title="Product Grid Settings">
				<TextControl
					label="Number of Products"
					value={ limit }
					onChange={ onLimitChange }
					type="number"
				/>

				<TextControl
					label="Number of Columns"
					value={ column }
					onChange={ onColChange }
					type="number"
				/>
				<ToggleControl
					label="Show Featured Image"
					checked={ showImage }
					onChange={ onImageSwitchChange }
				/>

				<ToggleControl
					label="Show Product Price"
					checked={ showPrice }
					onChange={ onPriceSwitchChange }
				/>

				<TextControl
					label="ACF Field ID"
					value={ acf }
					onChange={ (newValue) => setAttributes( { acf: newValue  } ) }
				/>

				</PanelBody>
		</InspectorControls>

			<div {...useBlockProps()}>
			{data.length == 0 ? <h3>Loading Products...</h3> : <Grid columns={ column }>
			{data.map( ( product ) => (
				<div className="editor-product" key={ product.id }>
					{showImage && (
					<img
						className="product__image"
						src={product._embedded["wp:featuredmedia"][0].source_url}
						alt={product.title.rendered}
					/>
					)}
					<a href={product.link}><h5 className="product__title">{ product.title.rendered }</h5></a>
					{showPrice && (
						<h5 className="product__price"><span>Price </span>${product.meta._price}</h5>
					)}

					{product.meta.fields && (
						<p className="product__custom_field">{product.meta.fields[acf]}</p>
					)}
				
				</div>
				) ) }
			</Grid>}
		   </div>
        </>
    );
};

export default Edit;
