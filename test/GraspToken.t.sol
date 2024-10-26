// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Test } from "forge-std/Test.sol";
import { GraspToken } from "src/GraspToken.sol";

contract GraspTokenTest is Test {
  GraspToken public instance;

  function setUp() public {
    address initialOwner = vm.addr(1);
    instance = new GraspToken(initialOwner);
  }

  function testName() public view {
    assertEq(instance.name(), "Grasp");
  }

  function testSymbol() public view {
    assertEq(instance.symbol(), "GRASP");
  }

  function testDecimals() public view {
    assertEq(instance.decimals(), 18);
  }

  function testTotalSupply() public view {
    assertEq(instance.totalSupply(), 42000000000 * 10**18);
  }

  function testInitialOwner() public view {
    assertEq(instance.owner(), vm.addr(1));
  }

  function testInitialBalance() public view {
    assertEq(instance.balanceOf(vm.addr(1)), 42000000000 * 10**18);
  }
}
