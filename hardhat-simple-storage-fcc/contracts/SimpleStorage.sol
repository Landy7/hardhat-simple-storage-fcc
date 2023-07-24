//SPDX-License-Identifier: MIT
//最好在第一行添加spdx license identifier,
//如果你没有的话可能一些compiler会提示warning
//MIT lincense 是约束最少的

//version 总是在top位置，this version more stable
//^表示可以接受比0.8.7新的version
//pragma solidity ^0.8.7;
pragma solidity ^0.8.8;

// pragma solidity >=0.8.7 < 0.9.0; //接受的version在范围[0.8.7, 0.9.0)

//很像class，但是和class不同的是：contract名称可以和文件名称不同
contract SimpleStorage {
    //four most basic types:
    //boolean uint(unsigned integer), int, address, bytes

    //默认值为0,public表示该variable公开
    //如果不表示为public, 那么该variable为private
    //该变量表示为public, 那么说明可以返回该变量的值
    uint256 favouriteNumber; //zero slot

    //相当于java实例化对象People
    //一个instance, 并且根据对应的attribute输入参数进行实例化
    //People public person = People({favouriteNumber:2,name:"randy"});
    //People public person2 = People({favouriteNumber:3,name:"a"});
    //People public person3 = People({favouriteNumber:4,name:"c"});

    //array of people
    //Dynamic array
    People[] public people;

    //each single name is going to map a specific number;
    //name是unique的
    //mapping initialize every single key with a blank or a null key
    //for uint256 is zero
    mapping(string => uint256) public nameToFavouriteNumber;

    //array of uint256
    //uint256[] public favouriteNumberList;

    //和C语言中的struct一样，相当于是一个新的object名为people
    //里面放入各种attribute
    struct People {
        uint256 favouriteNumber; //index: 0
        string name; //index: 1
    }

    //getter function
    //可以返回favouriteNumber的值
    function store(uint _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
        //因为非view or pure function调用了view or pure function
        //那么这个function就需要花费gas
        retrieve();
    }

    //另一种可以返回favouriteNumber的方式: 用view
    //调用pure, view 不用花费gas,因为只是查看state的值，并不会改变state的值
    //returns括号里的必须与变量的type值相匹配
    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    //add newperson into Person[]
    //calldata, memory, storage
    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        //添加新person, 方法一：
        people.push(People(_favouriteNumber, _name));
        // _name映射 _favouriteNumber
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}
