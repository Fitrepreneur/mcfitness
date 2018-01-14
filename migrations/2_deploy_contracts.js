const MCFitCrowdsale = artifacts.require('./MCFitCrowdsale.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var startTime = 1522540800;
    var endTime = 1522540800;
    var rate = 20;
    var wallet = "0xaa347ae50194bd91a4641658f56611edead0d993";

    deployer.deploy(MCFitCrowdsale, startTime, endTime, rate, wallet);

};
