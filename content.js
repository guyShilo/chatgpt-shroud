const CLASS_NAME = ".flex.flex-col.gap-2.pb-2.text-gray-100.text-sm";
const GPT_SHROUD_CLASS_NAME = "GPT_SHROUD";

const hideElements = () => {
  // Select the elements using its classes
  const elements = document.querySelectorAll(CLASS_NAME);

  for (const element of elements) {
    if (element) {
      // Blur the element
      element.style.filter = "blur(5px)";
    }
  }

  const parentClassName = `${GPT_SHROUD_CLASS_NAME}_PARENT`;
  const getBadged = document.getElementsByClassName(parentClassName);

  if (!getBadged.length) {
    const badgeParent = document.createElement("div");
    badgeParent.className = parentClassName;
    badgeParent.style.position = "absolute";
    badgeParent.style.transform = "translate(-50%, -50%)";
    badgeParent.style.top = "45%";
    badgeParent.style.left = "45%";
    badgeParent.style.width = "100%";

    const badge = document.createElement("div");
    badge.className = GPT_SHROUD_CLASS_NAME;
    badge.innerHTML = "Hidden by ChatGPT Shroud 🛡️";
    badge.style.position = "absolute";
    badge.style.top = "0";
    badge.style.right = "0";
    badge.style.padding = "5px";
    badge.style.borderRadius = "3px";
    badge.style.fontWeight = "bold";

    badgeParent.appendChild(badge);

    const chatHistory = document.querySelector('[aria-label="Chat history"]');

    if (chatHistory) {
      chatHistory.appendChild(badgeParent);
    }
  }
};

const unhideElements = () => {
  // Select the elements using its classes
  const elements = document.querySelectorAll(CLASS_NAME);

  for (const element of elements) {
    if (element) {
      // Unblur the element
      element.style.filter = "none";
    }
  }

  // Remove the badge
  const badge = document.querySelector(`.${GPT_SHROUD_CLASS_NAME}`);
  if (badge && badge.parentNode) {
    badge.parentNode.removeChild(badge);
  }

  observer.disconnect();
};

// Start observing the document with the configured parameters
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    // If the addedNodes property has one or more nodes
    if (mutation.addedNodes.length) {
      hideElements();
    }
  }
});

// Call the function to hide the element
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command == "hideChat") {
    hideElements();
    observer.observe(document.body, { childList: true, subtree: true });
  } else if (request.command == "unhideChat") {
    unhideElements();
  }
});
