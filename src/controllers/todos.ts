// import {Request, Response, NextFunction} from "express" // replace with the next line
import { RequestHandler } from "express";

/* Every class automatically act as a type */
import { Todo } from "../models/todo";

// using type of Todo[] <-- from class "../models/todo"
const TODOS: Todo[] = [];

// export const createTodo = (req:Request, res:Response, next:NextFunction) => { // once replace the way importing, replace the next line too
export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({ message: "Create the todo", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ todo: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;

    const updateText = (req.body as { text: string }).text;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updateText);

    res.json({ message: "Update!", updateTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }

    TODOS.splice(todoIndex, 1);
    res.json({ message: "Todo deleted!" });
};
