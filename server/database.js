import WebSessionModel from "./models/WebSession.js";

export const getWebUser = async (token, sessionId) => {
    const webSession = await WebSessionModel.findOne({ token: token, sessionId: sessionId });
    return webSession;
}

export const createWebUser = async (token, sessionId, id) => {
    if (!token || !id) return;
    if (await getWebUser(token, sessionId)) return;

    const webSession = new WebSessionModel({
        token: token,
        id: id
    });
    await webSession.save().catch(e => console.log(e));
}

export const deleteWebUserByToken = async (token) => {
    await WebSessionModel.deleteOne({ token: token });
}

export const deleteWebUserBySessionId = async (sessionId) => {
    await WebSessionModel.deleteOne({ sessionId: sessionId });
}

export const deleteWebUserById = async (id, deleteOne = false) => {
    if (deleteOne) {
        await WebSessionModel.deleteOne({ id: id });
    } else {
        await WebSessionModel.deleteMany({ id: id });
    }
}

export const authorizeWebUser = async (token, sessionId, id) => {
    const webSession = await getWebUser(token, sessionId);
    return webSession && webSession.id === id;
}

export default {
    getWebUser,
    createWebUser,
    deleteWebUserByToken,
    deleteWebUserBySessionId,
    deleteWebUserById,
    authorizeWebUser
};