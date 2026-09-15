function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img className="product-image" src={props.image} alt={props.name} />
      </div>
      <div className="product-info">
        <span className="product-category">{props.category}</span>
        <h3 className="product-name">{props.name}</h3>
        <p className="product-price">${props.price.toLocaleString()}</p>
        <button className="view-btn" onClick={props.onView}>View</button>
      </div>
    </div>
  )
}
export default ProductCard;