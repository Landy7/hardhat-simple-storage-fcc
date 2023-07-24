//hardhat.config.js 配置如何上链等信息，与blockchain交互,以及如何和hardhat框架进行交互
//require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); //用于添加env里面的密钥
require("@nomiclabs/hardhat-etherscan"); //添加etherscan做programatic verify
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */

//这样双重设置，保证该参数都有正确的值
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/xk5MLCNT4UM9gHEeeJ2WGD71iIkurDFe"; //Sepolia rpc url
const PRIVATE_KEY = process.env.PRIVATE_KEY; //这个部分一定要加密处理。
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; //Etherscan API
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY; //COINMARKETCAP API-KEY

const proxyUrl = "http://127.0.0.1:15236"; // change to yours, With the global proxy enabled, change the proxyUrl to your own proxy link. The port may be different for each client.
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent(proxyUrl);
setGlobalDispatcher(proxyAgent);

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        //连接到 sepolia network
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        local: {
            //不需要输入accounts,因为yarn hardhat nodes命令之后已经产生了20个fake accounts
            //你可以理解为这里已经填充了accounts
            url: "http://127.0.0.1:8545/",
            chainId: 31337, //hardhat network的ChainID
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true, //每次test的时候都会run gasreporter
        outputFile: "gas-report.txt", //导出报告
        noColors: true, //不设置颜色
        currency: "USD", //可以看到不同链花费的gas fee兑换成美元是多少。
        coinmarketcap: COINMARKETCAP_API_KEY, // coinmarketcap的api-key(也是需要注册),用于获得不同链对于USD的实时汇率
        token: "MATIC",
    },
    solidity: "0.8.18",
};
