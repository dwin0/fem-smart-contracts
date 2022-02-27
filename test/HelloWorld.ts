// 1. setup
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello", function () {
  it("should say hi", async function () {
    // 2. deploy the contract
    // "HelloWorld" -> contract name, not file name
    const HelloWorld = await ethers.getContractFactory("HelloWorld");

    // deploy on temporary test network
    const hello = await HelloWorld.deploy();
    await hello.deployed();

    expect(await hello.hello()).to.equal("Hello, World");
  });
});
