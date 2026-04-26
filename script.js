const inputMemo = document.getElementById("inputMemo");
const outputMemo = document.getElementById("outputMemo");
const formatButton = document.getElementById("formatButton");
const formatType = document.getElementById("formatType");
const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");

formatButton.addEventListener("click", function () {
  const memo = inputMemo.value.trim();
  const selectedType = formatType.value;

  if (memo === "") {
    outputMemo.value = "業務メモを入力してください。";
    return;
  }

  let prompt = "";

  if (selectedType === "share") {
    prompt =
`以下の業務メモをもとに、社内共有用の文章を作成してください。

【目的】
関係者に状況を分かりやすく共有すること。

【トーン】
丁寧で簡潔にしてください。
必要以上に感情的な表現は避け、事実ベースで整理してください。

【含めてほしい内容】
・発生している事象
・現在確認できている内容
・必要に応じて確認すべき点
・今後の対応方針

【出力形式】
以下の見出しで整理してください。

【共有事項】
【確認事項】
【対応方針】

【業務メモ】
${memo}`;
  }

  if (selectedType === "consult") {
    prompt =
`以下の業務メモをもとに、上長へ相談する文章を作成してください。

【目的】
対応方針や判断が必要な点について、上長に確認すること。

【トーン】
丁寧で、簡潔かつ相談しやすい文章にしてください。
責任追及のような表現は避け、判断材料が伝わる内容にしてください。

【含めてほしい内容】
・発生している事象
・現時点で分かっていること
・判断に迷っている点
・上長に確認したいこと

【出力形式】
チャットやメールでそのまま送れる文章にしてください。
必要に応じて、以下の見出しを使ってください。

【事象】
【確認済みの内容】
【相談事項】

【業務メモ】
${memo}`;
  }

  if (selectedType === "reply") {
    prompt =
`以下の業務メモをもとに、相手へ送るチャット返信文を作成してください。

【目的】
相手に状況を説明し、必要な案内を行うこと。

【トーン】
丁寧で、相手に寄り添いつつ、事務的に整理してください。
強く言い切りすぎず、角が立たない表現にしてください。

【含めてほしい内容】
・相手へのお詫びまたは配慮
・現在確認できている事実
・案内できる範囲
・確認中の場合はその旨
・相手を責める表現を避けること

【出力形式】
チャットでそのまま送れる自然な文章にしてください。
長すぎず、読みやすくしてください。

【業務メモ】
${memo}`;
  }

  outputMemo.value = prompt;
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

clearButton.addEventListener("click", function () {
  inputMemo.value = "";
  outputMemo.value = "";
  formatType.value = "share";
});