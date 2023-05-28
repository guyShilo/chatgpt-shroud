const CLASS_NAME = ".flex.flex-col.gap-2.pb-2.text-gray-100.text-sm";

const hideElements = () => {
  // Select the elements using its classes
  const elements = document.querySelectorAll(CLASS_NAME);

  for (const element of elements) {
    if (element) {
      // Blur the element
      element.style.filter = "blur(5px)";
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
};

// Start observing the document with the configured parameters
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    // If the addedNodes property has one or more nodes
    if (mutation.addedNodes.length) {
      const addedNode = mutation.addedNodes[0];
      // Check if addedNode is an element and className is defined
      if (
        addedNode.nodeType === Node.ELEMENT_NODE &&
        addedNode.className &&
        typeof addedNode.className === "string" &&
        addedNode.className.includes("gap-2")
      ) {
        console.log("new chat includes gap-2");
        hideElements();
      }
    }
  }
});

// Call the function to hide the element
hideElements();
observer.observe(document.body, { childList: true, subtree: true });

// Call the function to hide the element
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command == "hideChat") {
    hideElements();
    observer.observe(document.body, { childList: true, subtree: true });
  } else if (request.command == "unhideChat") {
    unhideElements();
    observer.disconnect();
  }
});
