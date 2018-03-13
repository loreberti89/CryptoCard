class Card {
	constructor(_price, _identity, _name, _onSale, _imageBase64){
		this.price = _price;
		this.identity = _identity;
		this.name = _name;
		this.onSale = _onSale;
		this.imageBase64 = _imageBase64;	
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