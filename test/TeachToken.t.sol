// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Test } from "forge-std/Test.sol";
import { TeachToken } from "src/TeachToken.sol";

contract TeachTokenTest is Test {
  TeachToken public instance;

  function setUp() public {
    address initialOwner = vm.addr(1);
    instance = new TeachToken(initialOwner);
  }

  function testName() public view {
    assertEq(instance.name(), "Teach");
  }

  function testSymbol() public view {
    assertEq(instance.symbol(), "TEACH");
  }

  function testDecimals() public view {
    assertEq(instance.decimals(), 18);
  }

  function testTotalSupply() public view {
    assertEq(instance.totalSupply(), 69000000 * 10**18);
  }

  function testInitialOwner() public view {
    assertEq(instance.owner(), vm.addr(1));
  }

  function testInitialBalance() public view {
    assertEq(instance.balanceOf(vm.addr(1)), 69000000 * 10**18);
  }
}
