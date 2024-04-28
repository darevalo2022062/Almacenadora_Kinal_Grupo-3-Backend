import ToDo from "./to-do.model.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from "../user/user.model.js";

export const createToDo = async (req, res) => {
    console.log("HEaders: ", req.headers);
    const { nameTask, status, dateBegin, dateEnd, nameUser, description } = req.body;
    let toDoSaved = null;
    const newToDo = new ToDo({ nameTask, status, dateBegin, dateEnd, nameUser, description });
    await newToDo.save();
    /* const user = await User.findById(userId);
     const nameUser = user.firstName + " " + user.lastName;
     console.log("Se obtiene un nombre: " + nameUser);*/


    res.status(201).json({
        message: "To-Do creado exitosamente",
    });
}

export const viewToDo = async (req, res) => {
    const toDo = await ToDo.find();
    res.status(200).json({
        toDo
    });
}
