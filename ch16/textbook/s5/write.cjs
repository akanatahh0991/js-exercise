function write(stream, chunk) {
    const hasMoreRoom = stream.write(chunk);

    if (hasMoreRoom) {
        return Promise.resolve(null);
    } else {
        return new Promise(resolve => {
            stream.once("drain", resolve);
        })
    }
}

/**
 * source.pipe(destination)と同じ内容を実装したもの
 * @param {ReadableStream} source 
 * @param {WritableStream} destination 
 */
async function copy(source, destination) {
    destination.on("error", () => process.exit());

    for await (const chunk of source) {
        await write(destination, chunk);
    }
}