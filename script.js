const inputMemo = document.getElementById("inputMemo");
const outputMemo = document.getElementById("outputMemo");
const formatButton = document.getElementById("formatButton");
const formatType = document.getElementById("formatType");
const copyButton = document.getElementById("copyButton");

formatButton.addEventListener("click", function () {
  const memo = inputMemo.value.trim();
  const selectedType = formatType.value;

  if (memo === "") {
    outputMemo.value = "業務メモを入力してください。";
    return;
  }

  let formattedMemo = "";

  if (selectedType === "share") {
    formattedMemo =
`【共有事項】
${memo}

【確認事項】
現時点で追加確認が必要な点があれば、関係者へ確認を行います。

【対応方針】
状況を整理のうえ、必要に応じて対応方針を確認します。`;
  }

  if (selectedType === "consult") {
    formattedMemo =
`お疲れ様です。
以下の件について、対応方針をご相談させてください。

【事象】
${memo}

【確認したいこと】
本件について、今後の対応方針をご確認いただけますでしょうか。`;
  }

  if (selectedType === "todo") {
    formattedMemo =
`【TODO】
- メモ内容を確認する
- 関係者へ追加確認が必要か判断する
- 対応方針を整理する
- 必要に応じて上長へ相談する

【元メモ】
${memo}`;
  }

  outputMemo.value = formattedMemo;
});

copyButton.addEventListener("click", function () {
  const outputText = outputMemo.value.trim();

  if (outputText === "") {
    alert("コピーする文章がありません。");
    return;
  }

  navigator.clipboard.writeText(outputText);

  alert("コピーしました。");
});