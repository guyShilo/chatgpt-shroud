document.getElementById("hideButton").addEventListener("click", function () {
  chrome.tabs.query({ url: "*://chat.openai.com/*" }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, { command: "hideChat" });
    }
  });
});

document.getElementById("unhideButton").addEventListener("click", function () {
  chrome.tabs.query({ url: "*://chat.openai.com/*" }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, { command: "unhideChat" });
    }
  });
});
