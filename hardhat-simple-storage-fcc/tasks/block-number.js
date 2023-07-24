const { task } = require("hardhat/config"); //hardhat/config里面有task function, 所以从hardhat/config里面引入task function

//task name: block-number
//task's description: Prints the current number

//task还有很多可以设置的，比如.addParam()可以输入调用该task时需要输入的参数
//.setAction():该function在做什么事情。
task("block-number", "Prints the current block number").setAction(
    //the JavaScript arrow function

    //以下两种方式定义blockTask function都可以
    //const blockTask = async function(Prameters....) => { function definition....}
    //async functiin blockTask(Prameters...) {function definition....}

    //下面的arrow function是匿名方法，因为没有设置名字
    //taskArgs我们这里没有设置：为空，hre为HardhatRuntimeEnvironment
    //hre can access a lot of packages that the harhat packages can
    //(hre也可以使用很多 require("hardhat")里面的function)
    async (taskArgs, hre) => {
        const blocknumber = await hre.ethers.provider.getBlockNumber();
        console.log(`current block Number : ${blocknumber}`); //输出当前的blocknumber
    }
);

module.exports = {}; //模块输出
