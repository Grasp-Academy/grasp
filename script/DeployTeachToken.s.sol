// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { TeachToken } from "src/TeachToken.sol";

contract TeachTokenScript is Script {

  function run() external {
        // Load the deployer's private key from the environment variables
        uint256 deployerPrivateKey = vm.envUint("ACCOUNT_PRIVATE_KEY");

        // Start broadcasting the transaction using the deployer's private key
        vm.startBroadcast(deployerPrivateKey);

        // Load the initial owner address from the environment variables
        address initialOwner = vm.envAddress("INITIAL_OWNER");

        // Deploy the TeachToken contract with the configurable initial owner
        TeachToken teachToken = new TeachToken(initialOwner);

        // End broadcasting the transaction
        vm.stopBroadcast();

        // Log the address of the deployed contract
        console.log("Teach Token Contract deployed to:", address(teachToken));
        console.log("Initial owner set to:", initialOwner);
    }
}
