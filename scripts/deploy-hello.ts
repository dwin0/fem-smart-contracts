import "@nomiclabs/hardhat-ethers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

async function deploy(): Promise<Contract> {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy();
  await hello.deployed();

  return hello;
}

async function sayHello(hello: Contract) {
  console.log(`Say hello: ${await hello.hello()}`);
}

deploy().then(sayHello);
