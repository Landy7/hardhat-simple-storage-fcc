//deploy.js做的事情就是如何于smart contract进行交互，如何验证smart contract

//import
const { ethers, run, network } = require("hardhat"); //hardhat包括了ethers, hardhat可以跟踪comipled contract, ethers不会知道compiled contract
// the run allows us to run any hardhat tasks
//Async main
async function main() {
    // get the factory
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract.....");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`contract address: ${simpleStorage.address}`); // the address of this smart contract
    console.log(network.config);
    //in JS
    // 4 == 4 true
    // 4 == "4" true
    //4 === "4" false
    //sepolia testnet && 必须保证 etherscan apikey存在
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6); //等待transaction 已经 mined
        //verify the code
        await verify(simpleStorage.address, []); //当前contractargument还没有
    }

    const currentValue = await simpleStorage.retrieve(); //调用retrieve()
    console.log(`Current value is: ${currentValue}`);

    //update the currentValue:
    const transactionResponse = await simpleStorage.store(7); //调用store()
    await transactionResponse.wait(1); //等待transaction 已经 mined

    const updateValue = await simpleStorage.retrieve();
    console.log(`update Value is:${updateValue}`);
}

//这个verify只是用于验证etherscan上的network verify, 本地的hardhat network不需要使用verify function

//JavaScript声明function有两种方式，一种是直接使用function keyword,
//另一种是把 箭头匿名function 赋给了名为verify的变量

//const verify = async(contractAddress,args) => {
async function verify(contractAddress, args) {
    console.log("verifying the contract.....");
    //使用try_catch以免出现errors
    try {
        //这里可以输入不同的parameters, 需要在nomicFoundation/hardhat中去找verify的export
        //第二个paramters就是我们的object
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        //验证error message
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
