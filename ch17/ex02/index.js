const GITHUB_HOST = 'https://api.github.com';
const OPTIONS = ['-h', '--help', '-v', '--verbose'];

/**
 * JSON形式のリクエストを送信してレスポンスを取得する。
 * @param {string} url リクエストURL
 * @param {string} method HTTPメソッド
 * @param {string} accessToken アクセストークン
 * @param {object} requestBody リクエストボディ。ない場合はnull。
 * @param {boolean} verbose HTTPログを出力するかどうか
 * @returns {Promise<object>} レスポンス結果オブジェクト
 */
async function requestJson(
  url,
  method,
  accessToken,
  requestBody = null,
  verbose = true
) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
    'User-Agent': 'Node.js',
  };

  const options = {
    method,
    headers,
    body: requestBody ? JSON.stringify(requestBody) : null,
  };

  if (verbose) {
    console.log(
      `Http Req: [${method}] url=${url}, headers=${JSON.stringify(headers)}, body=${options.body}`
    );
  }

  try {
    const response = await fetch(url, options);
    const responseBody = await response.json();

    if (verbose) {
      console.log(
        `Http Res: code=${response.status}, headers=${JSON.stringify(response.headers)}, body=${JSON.stringify(responseBody)}`
      );
    }

    return {
      ok: response.ok,
      statusCode: response.status,
      header: response.headers,
      body: responseBody,
    };
  } catch (error) {
    console.error(`Error in requestJson: ${error.message}`);
    throw error;
  }
}

/**
 * Issueを生成する。
 * @param {string} owner オーナー名
 * @param {string} repo リポジトリ名
 * @param {string} accessToken アクセストークン
 * @param {string} title タイトル
 * @param {string} body 内容
 * @param {boolean} verbose HTTPログを出力するか
 * @returns {Promise<object>} 結果を表すオブジェクト
 */
export async function createIssue(
  owner,
  repo,
  accessToken,
  title,
  body,
  verbose = true
) {
  const url = `${GITHUB_HOST}/repos/${owner}/${repo}/issues`;
  const requestBody = { title, body };

  const result = await requestJson(
    url,
    'POST',
    accessToken,
    requestBody,
    verbose
  );
  if (result.ok) {
    return { ok: true };
  } else {
    return {
      ok: false,
      failureReason: {
        type: 'request_failure',
        statusCode: result.statusCode,
      },
    };
  }
}

/**
 * Issueをクローズする。
 * @param {string} owner オーナー名
 * @param {string} repo リポジトリ名
 * @param {string} accessToken アクセストークン
 * @param {string} issueNumber Issue番号
 * @param {boolean} verbose HTTPログを出力するか
 * @returns {Promise<object>} 結果を表すオブジェクト
 */
export async function closeIssue(
  owner,
  repo,
  accessToken,
  issueNumber,
  verbose = true
) {
  const url = `${GITHUB_HOST}/repos/${owner}/${repo}/issues/${issueNumber}`;
  const requestBody = { state: 'closed' };

  const result = await requestJson(
    url,
    'PATCH',
    accessToken,
    requestBody,
    verbose
  );
  if (result.ok) {
    return { ok: true };
  } else {
    return {
      ok: false,
      failureReason: {
        type: 'request_failure',
        statusCode: result.statusCode,
      },
    };
  }
}

/**
 * Issue一覧を取得する。
 * @param {string} owner オーナー名
 * @param {string} repo リポジトリ名
 * @param {string} accessToken アクセストークン
 * @param {boolean} verbose HTTPログを出力するか
 * @returns {Promise<object>} 結果を表すオブジェクト
 */
export async function listIssue(owner, repo, accessToken, verbose = true) {
  const url = `${GITHUB_HOST}/repos/${owner}/${repo}/issues`;

  const result = await requestJson(url, 'GET', accessToken, null, verbose);
  if (result.ok) {
    return {
      ok: true,
      issues: result.body.map((issue) => ({
        id: issue.number,
        title: issue.title,
      })),
    };
  } else {
    return {
      ok: false,
      failureReason: {
        type: 'request_failure',
        statusCode: result.statusCode,
      },
    };
  }
}
