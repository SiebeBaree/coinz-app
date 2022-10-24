import WebUser from "./models/WebUser.js";

export const getWebUser = async (token) => {
    const webUser = await WebUser.findOne({ token: token });
    return webUser;
}

export const createWebUser = async (token, id) => {
    if (!token || !id) return;

    const webUser = new WebUser({
        token: token,
        id: id
    });
    await webUser.save().catch(e => console.log(e));
}

export const deleteWebUserByToken = async (token) => {
    await WebUser.deleteOne({ token: token });
}

export const deleteWebUserById = async (id, deleteOne = false) => {
    if (deleteOne) {
        await WebUser.deleteOne({ id: id });
    } else {
        await WebUser.deleteMany({ id: id });
    }
}

export const authorizeWebUser = async (token, id) => {
    const webUser = await getWebUser(token);
    return webUser && webUser.id === id;
}

export default {
    getWebUser,
    createWebUser,
    deleteWebUserByToken,
    deleteWebUserById,
    authorizeWebUser
};