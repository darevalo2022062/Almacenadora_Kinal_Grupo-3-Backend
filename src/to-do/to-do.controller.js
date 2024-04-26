import ToDo from "./to-do.model.js";

export const createToDo = async (req, res) => {
    const { nameTask, status, dateBegin, dateEnd, description } = req.body;
    const nameUser = req.user._id 

    const newToDo = new ToDo({ nameTask, status, dateBegin, dateEnd, nameUser, description });

    const toDoSaved = await newToDo.save();
    res.status(201).json({
        message: "To-Do creado exitosamente",
        toDoSaved
    });
}
