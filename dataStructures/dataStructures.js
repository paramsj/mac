import { MinHeap } from "./MinHeap.js";

const keys = new Map();

const availableKeys = [];
const availableIndex = new Map();

const expiryQueue = MinHeap(
    (a, b) => a.expiresAt < b.expiresAt
);

const releaseQueue = MinHeap(
    (a, b) => a.releaseAt < b.releaseAt
);

export {keys , availableIndex , availableKeys , expiryQueue , releaseQueue};
