pragma solidity ^0.4.4;

import "./Ownable.sol";
import "../libraries/math/SafeMath.sol";
contract CryptoCardsFactory is Ownable {
  
  using SafeMath for uint256;
  //event NewCard(uint id,string _name, uint _identity);
  struct Card{
  	uint256 price;
    string identity;
  	string name;
    bool onSale;
    

  }	
  Card[] public cards;

  // Mapping from token ID to owner
  mapping (uint256 => address) internal cardOwner;

  // Mapping from token ID to approved address
  mapping (uint256 => address) internal cardApprovals;

  // Mapping from owner to list of owned token IDs
  mapping (address => uint256[]) internal ownedCards;

  // Mapping from token ID to index of the owner tokens list
  mapping(uint256 => uint256) internal ownedCardsIndex;

  // Total amount of tokens
  uint256 internal totalTokens;

  function getAllCards() external view returns(uint[]) {
    uint[] memory ids = new uint[](cards.length);
    uint counter = 0;
    for(uint i = 0; i < cards.length; i++){
      ids[counter] = i;
      counter++;
    }
    return ids;
  }

  function countCardsOnSale() private view returns(uint){
    uint counter = 0;
    for(uint i = 0; i < cards.length; i++){
      if(cards[i].onSale){
        counter++;
      }
    }
    return counter;
  }

  function getCardsOnSale() external view returns(uint[]) {


    uint[] memory ids = new uint[](countCardsOnSale());
    uint counter = 0;
    for(uint i = 0; i < cards.length; i++){
      if(cards[i].onSale){
        ids[counter] = i;
        counter++;
      }
    }
    return ids;
  }



  function getCardById(uint id) external view returns(uint256, string, string, bool){
    return (cards[id].price, cards[id].identity, cards[id].name, cards[id].onSale);
  }

  function createCard(uint256 _price, string _identity, string _name,  bool _onSale) external onlyOwner {


  	uint id = cards.push(Card(_price,_identity, _name, _onSale))- 1;

    cardOwner[id] = msg.sender;
    ownedCards[msg.sender].push(id); 
    ownedCardsIndex[id] = ownedCards[msg.sender].length;
    totalTokens = totalTokens.add(1);

    //NewCard(id, _name, _identity);
  }


}
