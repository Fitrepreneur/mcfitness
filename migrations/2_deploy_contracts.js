const MCFitCrowdsale = artifacts.require('./MCFitCrowdsale.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var startTime = 1522540800;
    var endTime = 1522540800;
    // rate = cost 1 ETH in USD (1ETH = $1410)
    var rate = 1410;
    var wallet = "0xF4B99E8d0841DF74A694F591293331C32E530D9B";
    var owner = "0x1602A1fB2085ded31bfC0b2d83Cf81E41fa5E358";

    deployer.deploy(MCFitCrowdsale, startTime, endTime, rate, wallet, owner);

};
