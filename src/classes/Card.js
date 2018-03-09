function Card(_name, _identity) {
	this.name = _name;
	this.identity = _identity;

	function setName(_name){
		this.name = _name;
	}
	function setIdentity(_identity){
		this.identity = _identity;
	}
}
export default Card;