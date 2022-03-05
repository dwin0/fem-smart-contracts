import { ethers } from "ethers";

// access to metamask (handles communication to contract)
function getEth() {
  // @ts-ignore
  const eth = window.ethereum;
  if (!eth) {
    throw new Error("Install metamask");
  }

  return eth;
}

async function hasAccounts(): Promise<boolean> {
  const eth = getEth();
  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];

  return Boolean(accounts && accounts.length);
}

async function requestAccounts(): Promise<string[]> {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];

  return accounts;
}

async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error("run failed");
  }

  const hello = new ethers.Contract(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    ["function hello() public pure returns (string memory)"],
    new ethers.providers.Web3Provider(getEth())
  );

  document.body.innerHTML = await hello.hello();
}

run();
