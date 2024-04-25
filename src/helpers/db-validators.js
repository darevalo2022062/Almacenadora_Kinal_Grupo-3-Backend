import User from '../user/user.model.js'

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if (!existeUsuario) {
        throw new Error(`El ID: ${id} No existe`);
    }
}

export const existenteUsername = async (userName = '') => {
    const existeUsername = await User.findOne({ userName });

    if (existeUsername) {
        throw new Error(`El username ${userName} ya fue registrado`);
    }
}