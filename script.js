const inputMemo = document.getElementById("inputMemo");
const outputMemo = document.getElementById("outputMemo");
const formatButton = document.getElementById("formatButton");
const formatType = document.getElementById("formatType");
const toneType = document.getElementById("toneType");
const outputType = document.getElementById("outputType");

const noGuess = document.getElementById("noGuess");
const separateFacts = document.getElementById("separateFacts");
const askMissing = document.getElementById("askMissing");
const readyToUse = document.getElementById("readyToUse");

const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");

function getToneInstruction(tone) {
  if (tone === "polite") {
    return "丁寧で、相手に失礼のない自然な文章にしてください。";
  }

  if (tone === "simple") {
    return "簡潔で、要点がすぐ分かる文章にしてください。不要な前置きは控えてください。";
  }

  if (tone === "soft") {
    return "やわらかめで、相手に配慮が伝わる文章にしてください。きつい表現は避けてください。";
  }

  if (tone === "formal") {
    return "フォーマルで、ビジネス文書として違和感のない文章にしてください。";
  }

  if (tone === "gentle-refusal") {
    return "相手に配慮しつつ、対応が難しい点はやんわり伝える文章にしてください。強く拒絶する表現は避けてください。";
  }

  return "丁寧で分かりやすい文章にしてください。";
}

function getOutputInstruction(output) {
  if (output === "natural") {
    return "自然な文章として、そのまま使える形で出力してください。";
  }

  if (output === "bullet") {
    return "箇条書きで、要点が分かりやすい形に整理してください。";
  }

  if (output === "email") {
    return "件名と本文を含めたメール形式で出力してください。";
  }

  if (output === "chat") {
    return "チャットでそのまま送れる、短めで読みやすい文章にしてください。";
  }

  if (output === "report") {
    return "報告書のように、見出しを使って整理された形式で出力してください。";
  }

  return "自然な文章として出力してください。";
}

function getAdditionalInstructions() {
  const instructions = [];

  if (noGuess.checked) {
    instructions.push("不明点は勝手に補完せず、分からない点は分からないと扱ってください。");
  }

  if (separateFacts.checked) {
    instructions.push("事実として確認できている内容と、推測・判断が必要な内容を分けてください。");
  }

  if (askMissing.checked) {
    instructions.push("情報が不足している場合は、文章作成前に確認すべき質問も提示してください。");
  }

  if (readyToUse.checked) {
    instructions.push("出力は、必要に応じてそのまま業務で使える文章に整えてください。");
  }

  if (instructions.length === 0) {
    return "特になし。";
  }

  return instructions.map(function (instruction) {
    return `・${instruction}`;
  }).join("\n");
}

formatButton.addEventListener("click", function () {
  const memo = inputMemo.value.trim();
  const selectedType = formatType.value;
  const selectedTone = toneType.value;
  const selectedOutput = outputType.value;

  const toneInstruction = getToneInstruction(selectedTone);
  const outputInstruction = getOutputInstruction(selectedOutput);
  const additionalInstructions = getAdditionalInstructions();

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
${toneInstruction}

【含めてほしい内容】
・発生している事象
・現在確認できている内容
・必要に応じて確認すべき点
・今後の対応方針

【出力形式】
${outputInstruction}

【追加指示】
${additionalInstructions}

【業務メモ】
${memo}`;
  }

  if (selectedType === "consult") {
    prompt =
`以下の業務メモをもとに、上長へ相談する文章を作成してください。

【目的】
対応方針や判断が必要な点について、上長に確認すること。

【トーン】
${toneInstruction}
責任追及のような表現は避け、判断材料が伝わる内容にしてください。

【含めてほしい内容】
・発生している事象
・現時点で分かっていること
・判断に迷っている点
・上長に確認したいこと

【出力形式】
${outputInstruction}

【追加指示】
${additionalInstructions}

【業務メモ】
${memo}`;
  }

  if (selectedType === "reply") {
    prompt =
`以下の業務メモをもとに、相手へ送るチャット返信文を作成してください。

【目的】
相手に状況を説明し、必要な案内を行うこと。

【トーン】
${toneInstruction}
角が立たない表現にしてください。

【含めてほしい内容】
・相手へのお詫びまたは配慮
・現在確認できている事実
・案内できる範囲
・確認中の場合はその旨
・相手を責める表現を避けること

【出力形式】
${outputInstruction}

【追加指示】
${additionalInstructions}

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
  toneType.value = "polite";
  outputType.value = "natural";
  noGuess.checked = true;
  separateFacts.checked = true;
  askMissing.checked = true;
  readyToUse.checked = true;
});