function mouseDownHandler(event) {
    if (!window.confirm("Do you really want to sign out?")) {
        event.preventDefault();
        event.stopPropagation();
        return;
    } else {
        location.replace("/logout");
    }
}


function onLoad(event) {
    if (!signoutEl) {
        signoutEl = document.querySelector('[href="/logout"]');
        addClickListener(signoutEl, event.type);
    }
}

document.addEventListener("DOMContentLoaded", onLoad);
document.addEventListener("load", onLoad);

// Function to add the event listener to the sign out element
function addClickListener(signoutEl, eventType) {
    if (signoutEl) {
        signoutEl.addEventListener('mousedown', mouseDownHandler, true);
        console.info("Sign out click event listener added successfully.");
    } else {
        console.warn('Could not find the "Sign out" button element on', eventType);
    }
}

// Create a MutationObserver to watch for creation of the sign out element
const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('href') && node.getAttribute('href') === '/logout') {
                    addClickListener(node, "mutation observe match");
                    observer.disconnect(); // Stop observing once the element is found
                    return;
                }
            }
        }
    }
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });

// Try to add the event listener immediately in case the element is already in the DOM
var signoutEl = document.querySelector('[href="/logout"]');
if (signoutEl) {
    addClickListener(signoutEl, "script run");
    observer.disconnect(); // Stop observing if the element is already found
}
