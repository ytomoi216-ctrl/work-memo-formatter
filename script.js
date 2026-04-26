const inputMemo = document.getElementById("inputMemo");
const outputMemo = document.getElementById("outputMemo");
const formatButton = document.getElementById("formatButton");

formatButton.addEventListener("click", function () {
  const memo = inputMemo.value;

  outputMemo.value = memo;
});