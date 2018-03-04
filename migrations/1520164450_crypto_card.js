var CryptoCards = artifacts.require("CryptoCardsFactory");

module.exports = function(deployer) {
  deployer.deploy(CryptoCards);
};

