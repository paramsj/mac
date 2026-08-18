import {
    keys,
    expiryQueue,
    releaseQueue
} from "../dataStructures/dataStructures.js";

import {
    deleteKey,
    unblockKey
} from "./key.services.js";


const processEvents = () => {
    const now = Date.now();

    while ( expiryQueue.peek() && expiryQueue.peek().expiresAt <= now) {
        const event = expiryQueue.extractMin();

        const key = keys.get(event.keyId);

        // Key was already deleted
        if (!key) {
            continue;
        }

        // Ignore stale expiry event
        if (key.expiresAt !== event.expiresAt) {
            continue;
        }

        deleteKey(event.keyId);

        console.log(`Key ${event.keyId} expired`);
    }

    while (releaseQueue.peek() && releaseQueue.peek().releaseAt <= now) {
        const event = releaseQueue.extractMin();

        const key = keys.get(event.keyId);

        // Key was already deleted
        if (!key) {
            continue;
        }

        // Key was manually unblocked
        if (!key.isBlocked) {
            continue;
        }

        // Ignore stale release event
        if (key.releaseAt !== event.releaseAt) {
            continue;
        }

        unblockKey(event.keyId);

        console.log(
            `Key ${event.keyId} automatically released`
        );
    }
};


export const startScheduler = () => {
    setInterval(processEvents, 1000);
};