import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("Lock", function () {
    async function deployOneYearLockFixture() {  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const ToDo = await ethers.getContractFactory("ToDo");
      const toDo = await ToDo.deploy();
  
      return { toDo };
    }
  
    describe("Deployment", function () {
      it("Should set the right unlockTime", async function () {
        const { toDo, unlockTime } = await loadFixture(deployOneYearLockFixture);
  
        expect(await lock.unlockTime()).to.equal(unlockTime);
      });
  
      it("Should set the right owner", async function () {
        const { lock, owner } = await loadFixture(deployOneYearLockFixture);
  
        expect(await lock.owner()).to.equal(owner.address);
      });
  
      it("Should receive and store the funds to lock", async function () {
        const { lock, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );
  
        expect(await ethers.provider.getBalance(lock.target)).to.equal(
          lockedAmount
        );
      });
  
      it("Should fail if the unlockTime is not in the future", async function () {
        // We don't use the fixture here because we want a different deployment
        const latestTime = await time.latest();
        const Lock = await ethers.getContractFactory("Lock");
        await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
          "Unlock time should be in the future"
        );
      });
    });
  });
  