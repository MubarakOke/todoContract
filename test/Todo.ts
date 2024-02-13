import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("Lock", function () {
    async function deployToDo() {  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const ToDo = await ethers.getContractFactory("ToDo");
      const toDo = await ToDo.deploy();
  
      return { toDo };
    }
  
    describe("Deployment", function () {
      it("Should create and get todo", async function () {
        const { toDo } = await loadFixture(deployToDo);
        const title= "test title";
        const description= "test description";

        await toDo.createTodo(title, description)
        const returnedTodo= await toDo.getTodo(0)

        expect(returnedTodo[2]).to.equal(title);
        expect(returnedTodo[3]).to.equal(description);
      });

      it("Should update title", async function () {
        const { toDo } = await loadFixture(deployToDo);
        const title= "test title";
        const description= "test description";

        await toDo.createTodo(title, description);

        const newTitle= "test title 2";
        await toDo.updateTitle(0, newTitle)

        const returnedTodo= await toDo.getTodo(0)
        expect(returnedTodo[2]).to.equal(newTitle);
      });

      it("Should update description", async function () {
        const { toDo } = await loadFixture(deployToDo);
        const title= "test title";
        const description= "test description";

        await toDo.createTodo(title, description);

        const newDescription= "test description 2";
        await toDo.updateTitle(0, newDescription)

        const returnedTodo= await toDo.getTodo(0)
        expect(returnedTodo[2]).to.equal(newDescription);
      });

      it("Should delete todo", async function () {
        const { toDo } = await loadFixture(deployToDo);
        const title= "test title";
        const description= "test description";

        await toDo.createTodo(title, description);

        const newDescription= "test description 2";
        await toDo.deleteTodo(0)

        const returnedTodos= await toDo.getTodoAll()
        expect(returnedTodos.length).to.equal(0);
      });
    });
  });
  