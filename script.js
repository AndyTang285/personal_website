
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

    // Show navbar almost immediately
    if (window.scrollY > 20) {
        navbar.classList.add("visible");
    } else {
        navbar.classList.remove("visible");
    }

    // Shrink logic: Different thresholds for Mobile vs Desktop
    const isMobile = window.innerWidth < 768;
    const shrinkThreshold = isMobile ? 200 : 700;

    if (window.scrollY > shrinkThreshold) {
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

// --- LIGHTBOX FUNCTIONALITY ---

// Get the lightbox elements
const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementsByClassName('lightbox-close')[0];

// Select all images specifically inside the modal image boxes
const projectImages = document.querySelectorAll('.modal-img-box img');

// Add click event to all project images
projectImages.forEach(img => {
    img.addEventListener('click', function() {
        lightbox.style.display = "block";
        lightboxImg.src = this.src;
    });
});

// Close when clicking the X
closeBtn.onclick = function() {
    lightbox.style.display = "none";
}

// Close when clicking strictly outside the image (on the black background)
lightbox.addEventListener('click', function(e) {
    if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
    }
});


const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent standard page reload
        status.innerHTML = "Sending...";
        
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = "Thanks! Your message has been sent.";
                form.reset(); // Clear the form inputs
            } else {
                status.innerHTML = "Oops! There was a problem submitting your form.";
            }
        } catch (error) {
            status.innerHTML = "Oops! There was a problem submitting your form.";
        }
    });