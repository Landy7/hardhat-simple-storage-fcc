const { ethers } = require("hardhat");
const { assert, expect } = require("chai"); //导入chai库，用于验证。

//two parameters: "string",function, 该function可以是匿名function,也可以非匿名。
//下面是两种匿名function编写形式
//descibe("SimpleStorage",() => {})
//const 和 let 只能使用在块作用域中
describe("SimpleStorage", function () {
    //首先需要deploy the smart contract

    //需要把variables提到beforeEach()外面，用于后面it()调用
    //外层不能用const, 需要用let
    let simpleStorageFactory;
    let simpleStorage;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    //是不是部署simplestorage之后初始值为0
    it("Should start with the favorite number of 0", async function () {
        //数据类型为bigNumber,需要转换成string
        const currentValue = await simpleStorage.retrieve(); //得到的值
        const expectedValue = "0"; //期望的值
        //assert (用的更多，更多的去验证syntax)
        assert.equal(currentValue.toString(), expectedValue); //验证是否值一样
        //expect
        //expect(currentValue.toString()).to.equal(expectedValue); //验证是否值一样，和上面是一样的。
    });

    //当调用store函数时，更新数字为7
    //const 和 let 只能使用在块作用域中, 所以上面和这里是两个不同的作用块，之间没有任何联系

    //it.only(......)表示只运行该test
    it("Should update when we call store", async function () {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue); //存储期望的值
        await transactionResponse.wait(1); //给mined时间

        const currentValue = await simpleStorage.retrieve(); //一定要加await
        assert.equal(currentValue.toString(), expectedValue); //看store()存储的值和我们期望的值是否一致
    });

    //test addPerson()
    // it.only("Should add Person when we call addPerson()", async function () {
    //     const expectedName = "randy";
    //     const expectedFavouriteNumber = 6;
    //     const transactionResponse = await simpleStorage.addPerson(
    //         expectedName,
    //         expectedFavouriteNumber
    //     );
    //     await transactionResponse.wait(1); //给mined时间
    //     const currentName = await simpleStorage.people[0].name;
    //     assert.equal(currentName, expectedName);
    // });

    //测试每个function花费多少gas fee
}); //describe is the keyword that hardhat mocha could recogonize.
