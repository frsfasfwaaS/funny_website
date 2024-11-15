const commands = {
    help: "Available commands: help, about, projects, contact, clear",
    about: "Hi, I'm Quix! I'm 1 trillion years old, passionate about programming, Firebase, and cybersecurity.",
    projects: "Opening projects page...",
    contact: "Discord: Quixotic.__.",
    clear: ""
};

const terminalContent = document.querySelector(".terminal-content");
const projectsModal = document.getElementById("projects-modal");
const maximizeButton = document.getElementById("maximize-button");
const closeButton = document.getElementById("close-button");
const modalDragArea = document.getElementById("modal-drag-area");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

// Ensure terminal is focusable
function focusTerminalInput() {
    const commandInput = document.querySelector("#command-input");
    if (commandInput) {
        commandInput.focus();
    }
}

// Function to type text in the terminal
function typeEffect(text, callback) {
    let index = 0;

    function type() {
        if (index < text.length) {
            const char = text[index++];
            const span = document.createElement("span");
            span.textContent = char;
            terminalContent.lastElementChild.append(span);
            setTimeout(type, 50);
        } else {
            if (callback) callback();
        }
    }

    type();
}

// Command Handler
function handleCommand(command) {
    const outputText = commands[command] || `Command not found: ${command}`;
    if (command === "clear") {
        terminalContent.innerHTML = "";
        return addInputLine();
    }

    if (command === "projects") {
        projectsModal.style.display = "block"; // Show modal
        return; // Prevent adding further input while modal is open
    }

    const outputLine = document.createElement("p");
    outputLine.className = "output";
    terminalContent.append(outputLine);

    typeEffect(outputText, () => {
        addInputLine();
    });
}

// Add a new input line to the terminal
function addInputLine() {
    const inputLine = document.createElement("div");
    inputLine.id = "input-line";

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = "quix@portfolio:~$";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "command-input";
    input.autofocus = true;

    inputLine.append(prompt, input);
    terminalContent.append(inputLine);

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = input.value.trim();
            input.remove();
            inputLine.remove();
            handleCommand(command);
        }
    });

    input.focus();
}

// Modal Controls
maximizeButton.addEventListener("click", () => {
    projectsModal.style.width = "100%";
    projectsModal.style.height = "100%";
    projectsModal.style.top = "0";
    projectsModal.style.left = "0";
});

closeButton.addEventListener("click", () => {
    projectsModal.style.display = "none"; // Properly hides the modal
    projectsModal.style.width = "80%"; // Reset dimensions
    projectsModal.style.height = "80%";
    projectsModal.style.top = "10%";
    projectsModal.style.left = "10%";
    focusTerminalInput(); // Focus terminal input after closing modal
});

// Dragging Logic
modalDragArea.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - projectsModal.offsetLeft;
    offsetY = e.clientY - projectsModal.offsetTop;
    modalDragArea.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        projectsModal.style.left = `${e.clientX - offsetX}px`;
        projectsModal.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        modalDragArea.style.cursor = "grab";
    }
});

// Initialize terminal and hide modal
projectsModal.style.display = "none"; // Ensure modal is hidden initially
addInputLine();
