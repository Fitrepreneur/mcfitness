var MCFitCrowdsale = artifacts.require("./MCFitCrowdsale.sol");

contract('MCFitCrowdsale', (accounts) => {
    var contract;
    var wallet = "0xF4B99E8d0841DF74A694F591293331C32E530D9B";
    var rate = 1410*140;
    var buyWei = 5 * 10**17;
    var rateNew = 1410*140;
    var buyWeiNew = 5 * 10**17;

it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await MCFitCrowdsale.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        //console.log("contract address = " + contract.address);
        assert.notEqual(undefined, contract.address);
    });

    it('verification of receiving Ether', async ()  => {
        var totalAllocatedBefore = await contract.totalAllocated.call();
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var weiRaisedBefore = await contract.weiRaised.call();
        //console.log("totalAllocated = " + totalAllocatedBefore);

        await contract.buyTokens(accounts[2],{from:accounts[2], value:buyWei});

        var totalAllocatedAfter = await contract.totalAllocated.call();
        //console.log("totalAllocatedAfter = " + totalAllocatedAfter);
        assert.isTrue(totalAllocatedBefore < totalAllocatedAfter);
        assert.equal(0, totalAllocatedBefore);
        assert.equal(rate*buyWei, totalAllocatedAfter);

        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(rate*buyWei, balanceAccountTwoAfter);

        var weiRaisedAfter = await contract.weiRaised.call();
        //console.log("weiRaisedAfter = " + weiRaisedAfter);
        assert.isTrue(weiRaisedBefore < weiRaisedAfter);
        assert.equal(0, weiRaisedBefore);
        assert.equal(buyWei, weiRaisedAfter);

        var depositedAfter = await contract.getDeposited.call(accounts[2]);
        //console.log("DepositedAfter = " + depositedAfter);
        assert.equal(buyWei, depositedAfter);

        var balanceAccountThreeBefore = await contract.balanceOf(accounts[3]);
        await contract.buyTokens(accounts[3],{from:accounts[3], value:buyWeiNew});
        var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        assert.isTrue(balanceAccountThreeBefore < balanceAccountThreeAfter);
        assert.equal(0, balanceAccountThreeBefore);
        //console.log("balanceAccountThreeAfter = " + balanceAccountThreeAfter);
        //assert.equal(rateNew*buyWeiNew, balanceAccountThreeAfter);


});

    it('verification close smart contract', async ()  => {
            var curBalance = await contract.currentBalance.call();
            //console.log("current balance (before close) = " + curBalance);

            //console.log("Tested Close smart contract");
            var weiRaisedBefore = await contract.weiRaised.call();
            assert.equal(buyWei + buyWeiNew, weiRaisedBefore);

            await contract.close({from:accounts[0]});

            var mintingFinished = await contract.mintingFinished.call();
            assert.equal(true, mintingFinished );
            var state = await contract.state.call();
            assert.equal(1,state);

            var isFinalized = await contract.isFinalized.call();
            assert.equal(true, isFinalized);
    });

    it('mint to special funds', async ()  => {
        var balanceBefore = await contract.balanceOf(wallet);
        //console.log("balanceBefore = " + balanceBefore);
        assert.equal(6.5e+26, balanceBefore);
        await contract.mintToSpecialFund(wallet,{from:accounts[0]});
        var balanceAfter = await contract.balanceOf(wallet);
        assert.equal(2*6.5e+26, balanceAfter);
        //console.log("balanceAfter = " + balanceAfter);
    });

    it('get current balance', async ()  => {
        var curBalance = await contract.currentBalance.call();
        assert.equal(0, curBalance);
        //console.log("current balance = " + curBalance);
    });


});



