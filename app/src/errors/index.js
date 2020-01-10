export class PromiseError extends Error {
    constructor(promise) {
        super('pending');
        this.promise = promise;
    }
}