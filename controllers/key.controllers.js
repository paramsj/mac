import {
    createKey,
    getAvailableKey,
    getKey,
    unblockKey,
    deleteKey,
    keepAlive
} from "../services/key.services.js";


export const generateKey = async (req, res) => {
    const key = createKey();

    res.status(201).json({
        keyId: key.id
    });
};


export const getAvailable = async (req, res) => {
    const key = getAvailableKey();

    if (!key) {
        return res.status(404).json({});
    }

    res.status(200).json({
        keyId: key.id
    });
};


export const getKeyInfo = async (req, res) => {
    const { id } = req.params;

    const key = getKey(id);

    if (!key) {
        return res.status(404).json({});
    }
    
    console.log(key);

    res.status(200).json({
        isBlocked: key.isBlocked,
        blockedAt: key.blockedAt,
        createdAt: key.createdAt,
        expiresAt : key.expiresAt,
    });
};


export const removeKey = async (req, res) => {
    const { id } = req.params;

    const success = deleteKey(id);

    if (!success) {
        return res.status(404).json({});
    }

    res.status(200).json({});
};


export const unblock = async (req, res) => {
    const { id } = req.params;

    const success = unblockKey(id);

    if (!success) {
        return res.status(404).json({});
    }

    res.status(200).json({});
};


export const keepAliveKey = async (req, res) => {
    const { id } = req.params;

    const success = keepAlive(id);

    if (!success) {
        return res.status(404).json({});
    }

    res.status(200).json({});
};