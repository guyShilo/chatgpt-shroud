const CLASS_NAME = ".flex.flex-col.gap-2.pb-2.text-gray-100.text-sm";
const GPT_SHROUD_CLASS_NAME = "GPT_SHROUD";

const createElement = (type, className, styles = {}) => {
  const element = document.createElement(type);
  element.className = className;
  applyStyles(element, styles);
  return element;
};

const applyStyles = (element, styles) => Object.assign(element.style, styles);

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
    // Add the badge
    const badgeParent = createElement(
      "div",
      `${GPT_SHROUD_CLASS_NAME}_PARENT`,
      {
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "45%",
        left: "45%",
        width: "100%",
      }
    );

    const badge = createElement("div", GPT_SHROUD_CLASS_NAME, {
      position: "absolute",
      top: "0",
      right: "0",
      padding: "5px",
      borderRadius: "3px",
      fontWeight: "bold",
    });

    badge.innerHTML = "Hidden by ChatGPT Shroud 🛡️";
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
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    // If the addedNodes property has one or more nodes
    if (mutation.addedNodes.length) {
      hideElements();
    }
  }
});

// Call the function to hide the element
chrome.runtime.onMessage.addListener((request) => {
  if (request.command == "hideChat") {
    hideElements();
    observer.observe(document.body, { childList: true, subtree: true });
  } else if (request.command == "unhideChat") {
    unhideElements();
  }
});
