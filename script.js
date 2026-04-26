const inputMemo = document.getElementById("inputMemo");
const outputMemo = document.getElementById("outputMemo");
const formatButton = document.getElementById("formatButton");

formatButton.addEventListener("click", function () {
  const memo = inputMemo.value.trim();

  if (memo === "") {
    outputMemo.value = "業務メモを入力してください。";
    return;
  }

  const formattedMemo =
`【共有事項】
${memo}

【確認事項】
現時点で追加確認が必要な点があれば、関係者へ確認を行います。

【対応方針】
状況を整理のうえ、必要に応じて対応方針を確認します。`;

  outputMemo.value = formattedMemo;
});