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

export const editToDo = async (req, res) => {
    try {
        const { id } = req.params;
        const { __v, _id, status, ...rest } = req.body;
        const taskEdited = await ToDo.findOne({ _id: id });

        if (!taskEdited) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        if (!taskEdited.status) {
            return res.status(404).json({
                message: "Tarea no está activa"
            });
        }
        await ToDo.findByIdAndUpdate(id, rest);

        res.status(200).json({
            message: "Tarea actualizada exitosamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al actualizar la tarea"
        });
    }
}