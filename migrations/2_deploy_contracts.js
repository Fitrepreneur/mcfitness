const MCFitCrowdsale = artifacts.require('./MCFitCrowdsale.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    //var startTime = 1517443200; //01 Feb 2018, 00:00:00 GMT

    var startTime = 1516320000; //19 Jan 2018, 00:00:00 GMT
    var endTime = 1519862399; //28 Feb 2018, 23:59:59 GMT

    //var startTimePresale = 1516320000; //19 Jan 2018, 00:00:00 GMT
    //var endTimePresale = 1517443199; //31 Jan 2018, 23:59:59 GMT
    // rate = cost 1 ETH in USD (1ETH = $1410)
    var rate = 1410;
    var wallet = "0xF4B99E8d0841DF74A694F591293331C32E530D9B";
    var owner = "0xF4B99E8d0841DF74A694F591293331C32E530D9B";

    deployer.deploy(MCFitCrowdsale, startTime, endTime, rate, wallet);

};
