const executeCommandOnQuery = (command) => {
  chrome.tabs.query({ url: "*://chat.openai.com/*" }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, { command });
    }
  });
};

document
  .getElementById("hideButton")
  .addEventListener("click", () => executeCommandOnQuery("hideChat"));

document
  .getElementById("unhideButton")
  .addEventListener("click", () => executeCommandOnQuery("unhideChat"));
