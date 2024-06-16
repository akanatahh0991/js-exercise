import * as fs from "node:fs";

/**
 * `fs.readdir`のPromise版。pathおよびoptionsの仕様は下記リンク先の`fs.readdir`の仕様を引き継ぐ。
 * https://nodejs.org/docs/latest-v18.x/api/fs.html#fsreaddirpath-options-callback 
 */
export function readdir(path, options) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, options, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files)
        })
    })
}

/**
 * `fs.stat`のPromise版。pathおよびoptionsの仕様は下記リンク先の`fs.stat`の仕様を引き継ぐ。
 * https://nodejs.org/docs/latest-v18.x/api/fs.html#fsstatpath-options-callback
 */
export function stat(path, options) {
    return new Promise((resolve, reject) => {
        fs.stat(path, options, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats);
        })
    })
}

