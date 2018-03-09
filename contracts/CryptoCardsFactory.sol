pragma solidity ^0.4.4;

import "./Ownable.sol";
import "../libraries/math/SafeMath.sol";
contract CryptoCardsFactory is Ownable {
  
  using SafeMath for uint256;
  event NewCard(uint id,string _name, uint _identity);
  struct Card{
  	uint256 identity;
  	string name;
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

  function createCard(string _name, uint256 _identity) external {


  	uint id = cards.push(Card(_identity, _name))- 1;

    cardOwner[id] = msg.sender;
    ownedCards[msg.sender].push(id); 
    ownedCardsIndex[id] = ownedCards[msg.sender].length;
    totalTokens = totalTokens.add(1);

    NewCard(id, _name, _identity);
  }


}
