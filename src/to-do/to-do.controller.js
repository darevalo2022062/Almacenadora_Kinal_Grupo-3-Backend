import ToDo from "./to-do.model.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

export const createToDo = async (req, res) => {
    const { nameTask, description, status, dateBegin, dateEnd } = req.body;
    //const token = localStorage.getItem('userToken');
    const token = global.userToken;
    const tokenDecifred = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const nameUser = new mongoose.Types.ObjectId(tokenDecifred.id);

    const newToDo = new ToDo({ nameTask, status, dateBegin, dateEnd, nameUser, description });

    const toDoSaved = await newToDo.save();
    res.status(201).json({
        message: "To-Do creado exitosamente",
        toDoSaved
    });
}
