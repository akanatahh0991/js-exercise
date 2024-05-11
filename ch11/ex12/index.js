class FileOverSizeError extends Error {
    constructor(size) {
        super(`file size is over: ${size}`)
    }
    get name() {
        return "FileOverSizeError";
    }
}

const error = new FileOverSizeError(1000);
console.log(error.message, error.name)