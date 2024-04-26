import bcryptjs from "bcryptjs";
import User from "../user/user.model.js";
import { generateToken } from "../helpers/generate-jwt.js";


export const login = async (req, res) => {
    let { userName, password } = req.body;
    let user = await User.findOne({ userName: userName });
    let passwordCorrect = bcryptjs.compareSync(password, user.password);
    if (passwordCorrect) {
        // Generar token
        let token = await generateToken(user._id);

        /* Guarda token en localStorage
        Sera funcional hasta que se corra con fron en navegador */

        //localStorage.setItem('userToken', token);
        global.userToken = token;

        return res.status(200).json({
            msg: "Login exitoso"
        });
    } else {
        return res.status(400).json({
            msg: "Contraseña incorrecta"
        });
    }

}