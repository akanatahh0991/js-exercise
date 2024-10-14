import * as https from "https";

const GITHUB_HOST = 'api.github.com'
const OPTIONS = ['-h', '--help', '-v', '--verbose']

/**
 * request/responseのボディがJsonのhttps通信のリクエストをおこなう。
 * @param {obj} options httpsをリクエストで使用するオプション
 * @param {string} requestBody リクエストボディ。ない場合はnullを指定すること。
 * @param {boolean} verbose Httpログを出力するかどうか
 * @returns {Promise<obj>} レスポンスの結果を格納したオブジェクト
 */
async function requestJson(options, requestBody, verbose = true) {
    return new Promise((resolve, reject) => {
        if (verbose) {
            console.log(`Http Req: [${options.method}] headers=${JSON.stringify(options.headers)}, body=${requestBody}`)
        }
        const req = https.request(options)
        if (requestBody) {
            req.write(requestBody)
        }
        req.end();
        req.on("error", e => reject(e));
        req.on("response", res => {
            res.setEncoding("utf-8");
            let body = "";
            res.on("data", chunk => { body += chunk;});
            res.on("end", () => {
                try {
                    if(verbose) {
                        // 本当はログのフィルタリングをしたほうがいいが、今回はしない。
                        console.log(`Http Res: code=${res.statusCode}, header=${JSON.stringify(res.headers)}, body=${body}`)
                    }
                    resolve({
                        ok: (res.statusCode >= 200 && res.statusCode <= 299),
                        statusCode: res.statusCode,
                        header: res.headers,
                        body: JSON.parse(body),
                    });
                } catch (e) {
                    reject(e);
                }
            })
        })
    })
}

async function createIssue(owner, repo, accessToken, title, body, verbose) {
    const jsonBodyText = JSON.stringify({title, body})
    const options = {
        method:  'POST',
        hostname: GITHUB_HOST,
        path:`/repos/${owner}/${repo}/issues`,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(jsonBodyText),
            "User-Agent": "Node.js"
        }
    }
    try {
        const result = await requestJson(options, jsonBodyText, verbose);
        if (result.ok) {
            console.log("creating issue is success.")
        } else {
            console.log(`creating issue is failed: statusCode=${result.statusCode}`)
        }
    } catch(e) {
        console.log(`creating issue is failed: message=${e.message}`)
    }
}

async function closeIssue(owner, repo, accessToken, issueNumber, verbose) {
    const jsonBodyText = JSON.stringify({state: 'closed'})
    const options = {
        method:  'PATCH',
        hostname: GITHUB_HOST,
        path:`/repos/${owner}/${repo}/issues/${issueNumber}`,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(jsonBodyText),
            "User-Agent": "Node.js"
        }
    }
    try {
        const result = await requestJson(options, jsonBodyText, verbose);
        if (result.ok) {
            console.log("closing issue is success.")
        } else {
            console.log(`closing issue is failed: statusCode=${result.statusCode}`)
        }
    } catch(e) {
        console.log(`closing issue is failed: message=${e.message}`)
    }
}

async function listIssue(owner, repo, accessToken, verbose) {
    const options = {
        method:  'GET',
        hostname: GITHUB_HOST,
        path:`/repos/${owner}/${repo}/issues`,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "Node.js"
        }
    }
    try {
        const result = await requestJson(options, null, verbose);
        if (result.ok) {
            console.log(`list issue: ${result.body.map((issue) => `Id=${issue.number} Title=${issue.title} `)}`)
        } else {
            console.log(`list issue is failed: statusCode=${result.statusCode}`)
        }
    } catch(e) {
        console.log(`list issue is failed: message=${e.message}`)
    }
}

function showHelp() {
    console.log(`
        Usage:
            node index.js <command> <option>
        Command:
            - Create Issue
            create_issue <owner> <repo> <token> <title> <body>
            - Close Issue
            close_issue <owner> <repo> <token> <issueNumber>
            - List Issue
            list_issue <owner> <repo> <token>
        Option:
            - Show Http Logs
            -v, --verbose
            - Show Help
            --h, --help
    `)
}

(async() => {
    if (process.argv.includes('-h') || process.argv.includes('--help')) {
        showHelp();
        return;
    }
    let verbose = false
    if (process.argv.includes('-v') || process.argv.includes('--verbose')) {
        verbose = true;
    }
    
    const command = process.argv.slice(2).filter((arg) => !OPTIONS.includes(arg));
    
    const type = command[0];
    const owner = command[1];
    const repo = command[2];
    const token = command[3];
    
    if (type === 'create_issue' && command.length === 6) {
        const title = command[4];
        const body = command[5];
        createIssue(owner, repo, token, title, body, verbose);
    } else if (type === 'close_issue' && command.length === 5) {
        const issueNumber = command[4];
        closeIssue(owner, repo, token, issueNumber, verbose);
    } else if (type === 'list_issue' && command.length === 4) {
        listIssue(owner, repo, token, verbose);
    } else {
        showHelp()
    }
})();

