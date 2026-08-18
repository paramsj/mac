import { keys , availableIndex , availableKeys , expiryQueue , releaseQueue } from "../dataStructures/dataStructures.js";
import { ApiKey } from "../models/ApiKey.js";

function generateId() {
    return crypto.randomUUID();
}

function createKey() {
    const id = generateId();
    
    const key = new ApiKey(id);

    keys.set(id , key);

    availableIndex.set(id , availableKeys.length);
    availableKeys.push(id);

    expiryQueue.insert({
        keyId : id,
        expiresAt : key.expiresAt
    });
    return key;
}

function getAvailableKey() {
    if(availableKeys.length===0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * availableKeys.length);

    const keyId = availableKeys[randomIndex];

    const key = keys.get(keyId);

    key.isBlocked = true;
    key.blockedAt = Date.now();
    key.releaseAt = key.blockedAt + 60*1000;

    removeAvailableKey(keyId);
    releaseQueue.insert({
        keyId,
        releaseAt : key.releaseAt
    });

    return key;
};


function removeAvailableKey(keyId) {
    const index = availableIndex.get(keyId);

    if (index === undefined) {
        return false;
    }

    const lastIndex = availableKeys.length - 1;
    const lastKeyId = availableKeys[lastIndex];

    if (index !== lastIndex) {
        availableKeys[index] = lastKeyId;
        availableIndex.set(lastKeyId, index);
    }

    availableKeys.pop();
    availableIndex.delete(keyId);

    return true;
}

function addAvailableKey(keyId) {
    if (availableIndex.has(keyId)) {
        return;
    }

    availableIndex.set(
        keyId,
        availableKeys.length
    );

    availableKeys.push(keyId);
}

function getKey(id) {
    return keys.get(id) || null;
}

function unblockKey(id) {
    const key = keys.get(id);

    if (!key) {
        return false;
    }

    if (!key.isBlocked) {
        return true;
    }

    key.isBlocked = false;
    key.blockedAt = null;
    key.releaseAt = null;

    addAvailableKey(id);

    return true;
}

function deleteKey(id) {
    const key = keys.get(id);

    if (!key) {
        return false;
    }

    if (!key.isBlocked) {
        removeAvailableKey(id);
    }

    keys.delete(id);

    return true;
}


function keepAlive(id) {
    const key = keys.get(id);

    if (!key) {
        return false;
    }

    key.expiresAt =
        Date.now() + 5 * 60 * 1000;

    expiryQueue.insert({
        keyId: id,
        expiresAt: key.expiresAt
    });

    return true;
}

export {
    createKey,
    getAvailableKey,
    getKey,
    unblockKey,
    deleteKey,
    keepAlive
};