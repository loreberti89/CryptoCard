var CryptoCards = artifacts.require("CryptoCardOwnership");

module.exports = function(deployer) {
  deployer.deploy(CryptoCards);
};

