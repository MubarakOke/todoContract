//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ToDo{
    struct Todo {
        uint256 id;
        bool isDone;
        string title;
        string description;
    }

    Todo[] private todos;
    uint256 private currentId= 0;

    modifier checkID(uint _id){
        if (!(_id <= todos.length)){
             revert("Todo ID doesnot exist");
        }
        _;
    }

    function createTodo(string memory _title, string memory _description) public {
        Todo memory newTodo = Todo(currentId, false, _title, _description);
        todos.push(newTodo);
        currentId++;
    }

    function toggleDoneStatus(uint256 _id) public checkID(_id) {
        todos[_id].isDone = !todos[_id].isDone;
    }

    function getTodo(uint256 _id) public view checkID(_id) returns (Todo memory){
        return todos[_id];
    }

    function getTodoAll() public view returns (Todo[] memory){
        return todos;
    }

    function deleteTodo(uint256 _id) public checkID(_id) {
        Todo storage todoToDelete= todos[_id];
        Todo storage endTodo= todos[todos.length - 1];
        endTodo.id= todoToDelete.id;

        todos[_id] = endTodo;
        todos.pop();
        currentId--;
    }

    function updateTitle(uint256 _id, string memory _title) public checkID(_id) {
        todos[_id].title =_title;
    }

    function updateDescription(uint256 _id, string memory _description) public checkID(_id) {
        todos[_id].description =_description;
    }
}