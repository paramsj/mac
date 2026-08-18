class ApiKey {
    constructor(id) {
        const now = Date.now();
        this.id = id;
        this.createdAt = now;                   
        this.expiresAt = now + 5 * 60 * 1000; 
        this.isBlocked = false;
        this.blockedAt = null;
        this.releaseAt = null;
    }
}

export { ApiKey };