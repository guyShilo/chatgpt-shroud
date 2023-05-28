const executeCommandOnQuery = (command) => {
  chrome.tabs.query({ url: "*://chat.openai.com/*" }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, { command });
    }
  });
};

const addListener = (id, command) => {
  document
    .getElementById(id)
    .addEventListener("click", () => executeCommandOnQuery(command));
};

addListener("hideButton", "hideChat");
addListener("unhideButton", "unhideChat");
