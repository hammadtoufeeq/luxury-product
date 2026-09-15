function SearchBox(props) {
  return <input className="search-box" type="text" placeholder="Search luxury items..." value={props.value} onChange={props.onChange} />
}
export default SearchBox;