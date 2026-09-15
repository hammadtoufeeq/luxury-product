function CategoryFilter(props) {
  return (
    <select className="category-filter" value={props.value} onChange={props.onChange}>
      <option value="">All Categories</option>
      <option value="Watches">Watches</option>
      <option value="Bags">Bags</option>
      <option value="Perfumes">Perfumes</option>
      <option value="Jewelry">Jewelry</option>
      <option value="Sunglasses">Sunglasses</option>
    </select>
  )
}
export default CategoryFilter;