const themeButton = document.getElementById('theme-button');
let rotateFactor = 10;
const modalImage = document.getElementById('modal-image');
const closeButton = document.getElementById('close-button');

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    themeButton.textContent = document.body.classList.contains('dark-mode')
        ? 'Toggle Light Mode'
        : 'Toggle Dark Mode';
};

themeButton.addEventListener('click', toggleDarkMode);

const newParticipant = document.getElementById("rsvp-button");
const participantsList = document.getElementsByClassName("rsvp-participants");

const addParticipant = (person) => {
    if (!person.name || !person.state) return;
    const p = document.createElement('p');
    p.textContent = `🎟️ ${person.name} from ${person.state} has registered!`;
    if (participantsList.length > 0) {
        participantsList[0].appendChild(p);
        const rsvpCountElem = document.getElementById('rsvp-count');
        const count = participantsList[0].getElementsByTagName('p').length - 1;
        rsvpCountElem.textContent = `⭐ ${count} people have taken part in the revolution!`;
    }
}

const validateForm = (event) => {
    event.preventDefault();

    let containsErrors = false;
    const rsvpInputs = document.getElementById("rsvp-form").elements;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let person = {};

    for (let i = 0; i < rsvpInputs.length; i++) {
        const input = rsvpInputs[i];
        if (input.type != "Submit") {person[input.name] = input.value;}
        if (input.id === "email") {
            if (!emailRegex.test(input.value.trim())) {
                containsErrors = true;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        } else {
            if (input.value.length < 2) {
                containsErrors = true;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        }
    }

    if (!containsErrors) {
        addParticipant(person);
        for (let i = 0; i < rsvpInputs.length; i++) {
            rsvpInputs[i].value = "";
        }
        toggleModal(person);
    }
}

const toggleModal = (person) => {
    const modal = document.getElementById('success-modal');
    const modalContent = document.getElementById('modal-text');
    let intervalId = setInterval(animateImage, 500);
    modal.style.display = 'flex';
    modalContent.textContent = `
        Welcome to the revolution, ${person.name}! Keep an eye out for an email
        to ${person.email} with more details regarding the hackathon. 
        Thanks for registering to make a difference!
    `;
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 5000);
}

const animateImage = () => {
    if (rotateFactor === 10) {
        rotateFactor = -10;
    } else {
        rotateFactor = 10;
    }
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

const closeModal = () => {
        const modal = document.getElementById('success-modal');
        modal.style.display = "none";
    }
closeButton.addEventListener('click', closeModal);

newParticipant.addEventListener('click', validateForm);
