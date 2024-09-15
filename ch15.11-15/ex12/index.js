document.querySelector("#uploadButton").addEventListener("click", async () => {
  const fileInput = document.querySelector("#fileInput");
  const accessToken = document.querySelector("#accessToken").value;
  const file = fileInput.files[0];

  if (!accessToken) {
    alert("アクセストークンを入力してください");
    return;
  }

  if (!file) {
    alert("アップロードするファイルを選択してください");
    return;
  }

  if (file.size > 4 * 1024 * 1024) {
    alert("ファイルサイズは4MB以下にしてください");
    return;
  }

  try {
    await uploadFileToOneDrive(file, accessToken);
    alert("ファイルが正常にアップロードされました");
  } catch (error) {
    console.error("アップロードエラー:", error);
    alert("ファイルのアップロードに失敗しました");
  }
});

async function uploadFileToOneDrive(file, accessToken) {
  const fileName = file.name;
  const url = `https://graph.microsoft.com/v1.0/me/drive/root:/document/${fileName}:/content`;
  const contentType = file.type;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": contentType,
    },
    body: file,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`アップロードエラー: ${JSON.stringify(error)}`);
  }

  return await response.json();
}
