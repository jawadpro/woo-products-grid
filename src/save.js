const Save = ( { attributes } ) => {
    const { data, showImage, column , showPrice ,acf } = attributes;

    const products = data.map((product) => {
		return (
		  <div key={product.id} className="product">
			{showImage && (
			  <img
				className="product__image"
				src={product._embedded["wp:featuredmedia"][0].source_url}
				alt={product.title.rendered}
			  />
			)}
			<a href={product.link}><h5 className="product__title">{product.title.rendered}</h5></a>
			{showPrice && (
				<h5 className="product__price"><span>Price </span>${product.meta._price}</h5>
			)}
			{product.meta.fields && (
				<p className="product__custom_field">{product.meta.fields[acf]}</p>
			)}
				
		  </div>
		);
	  });
	
	  return (
		<div className="product-grid" style={`grid-template-columns: repeat(${column}, 1fr);`}>
		  {products}
		</div>
	  )
};

export default Save;
