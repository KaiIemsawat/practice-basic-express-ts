"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
/* Every class automatically act as a type */
const todo_1 = require("../models/todo");
// using type of Todo[] <-- from class "../models/todo"
const TODOS = [];
// export const createTodo = (req:Request, res:Response, next:NextFunction) => { // once replace the way importing, replace the next line too
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Create the todo", createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todo: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updateText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updateText);
    res.json({ message: "Update!", updateTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: "Todo deleted!" });
};
exports.deleteTodo = deleteTodo;
