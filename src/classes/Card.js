class Card {
	constructor(_identity, _price, _name, _onSale){
		this.identity = _identity;
		this.price = _price;
		this.name = _name;
		this.onSale = _onSale;	
	}
	 

	setName(_name){
		this.name = _name;
	}
	setIdentity(_identity){
		this.identity = _identity;
	}
	setPrice(_price){
		this.price = _price;
	}
	setOnSale(_onSale){
		this.onSale = _onSale;
	}

	getPriceFromWei(){
		return window.web3.fromWei(this.price, 'ether');
	}
}
export default Card;