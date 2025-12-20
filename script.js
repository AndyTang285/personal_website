
const text = "Hi, I'm Andy!"; 
const speed = 120; 
const type_text = document.querySelector("#type-text");
const cursor = document.querySelector(".cursor");

function typeText(element, text, speed, callback) {
    let index = 0;
    function typeNextChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);

            index++;
            setTimeout(typeNextChar, speed);
        } else {
            if (callback) callback();
        }
    }

    typeNextChar();
}

window.addEventListener("load", () => {typeText(type_text, text, speed)});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector("#navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("visible");
    } else {
        navbar.classList.remove("visible");
    }

    if (window.scrollY > 700) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

// booting animation
const bootMessages = [
    "> booting portfolio...",
    "> compiling shaders...",
    "> linking assets...",
    "> initializing renderer...",
    "> allocating memory...",
    "> loading VR scene...",
    "> syncing project files...",
    "> mounting filesystem...",
    "> optimizing build pipeline...",
    "> scanning modules..."
];


const bootMsgOutput = document.querySelector(".status");

window.addEventListener("load", () => {
    let i = 0;
    function typeNextMessage() {
        typeText(bootMsgOutput, bootMessages[i], speed, ()=> {
            setTimeout(() => {
                bootMsgOutput.textContent = "";
                i = (i + 1) % bootMessages.length;
                typeNextMessage();
            }, 750);
        });
    }

    typeNextMessage();
});


//card management
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("#navbar button");
    const cards = document.querySelectorAll(".card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetClass = button.dataset.target; //"about", "projects", "contacts"
            cards.forEach(card => card.classList.remove("active")); //hide all cards
            const targetCard = document.querySelector(`.card.${targetClass}`);
            if (targetCard) {
                targetCard.classList.add("active");
            }

        }); 
    });
});

//projects typing animation
const projectsSubtitle = "> selected builds & experiments...";
const projectsTypeText = document.querySelector(".projectsTypeText");

window.addEventListener("load", () => {
    typeText(projectsTypeText, projectsSubtitle, speed);
});


/* --- PASTE THIS AT THE BOTTOM OF script.js --- */

// Function to SHOW a specific window
function openModal(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Function to HIDE a specific window
function closeModal(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Optional: Close modal if clicking outside the box (on the dark background)
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});