let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

themeButton.addEventListener("click", toggleDarkMode);

const petitionForm = document.getElementById("sign-petition");

petitionForm.addEventListener("submit", function(event) {
  event.preventDefault();
  validateForm();
});

document.addEventListener("DOMContentLoaded", function() {
  const petitionForm = document.getElementById("sign-petition");
  const closeModalButton = document.getElementById("close-modal-button");
  const thanksModal = document.getElementById("thanks-modal");
  const modalTextContainer = document.getElementById("modal-text-container");
  let scaleFactor = 1;
  let modalImage = document.getElementById("modal-image");
  let intervalId; // Variable to store the interval ID

  const scaleImage = () => {
    // Toggle the image size between a factor of 1 and 0.8
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;

    // Apply the scaleFactor to the image
    modalImage.style.transform = `scale(${scaleFactor})`;
  };

  const toggleModal = (person) => {
    const modal = document.getElementById("thanks-modal");
    const modalContent = document.querySelector(".modal-content");

    // Set the display style property of the entire modal to flex
    modal.style.display = "flex";

    // Set the textContent of the modal to a nice thank you message
    modalContent.innerHTML = `<div id="modal-text-container">
                              <p>Thank you so much ${person.name}! For your feedback!</p>
                              <button id="close-modal-button">Close</button>
                            </div>
                            <img id="modal-image" src="https://www.crownconnect.com/assets/ThankYou.jpg" />`;

    // Get the modal image after it's added to the DOM
    const modalImage = document.getElementById("modal-image");

    // Wait for the image to load
    modalImage.onload = () => {
      // Call scaleImage every half a second
      intervalId = setInterval(scaleImage, 500);
    };
  };
  // Function to handle form submission
  const handleFormSubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comments = document.getElementById("comments").value;

    // You can perform further actions with the form data here

    // Display a thank you message in the modal
    modalTextContainer.innerHTML = `<p>Thank you, ${name}, for your feedback!</p>
    <button id="close-modal-button">Close</button>`;

    // Show the modal
    thanksModal.style.display = "flex";

    // Add event listener to the close modal button
    const closeModalButtonInModal = document.getElementById("close-modal-button");
    closeModalButtonInModal.addEventListener("click", closeModal);

    // Set a timeout to hide the modal after 4 seconds (adjust as needed)
    setTimeout(() => {
      closeModal();
    }, 4000);

    // Clear the form
    petitionForm.reset();
  };

  // Function to close the modal
  const closeModal = function() {
    thanksModal.style.display = "none";
    clearInterval(intervalId); // Clear the interval when the modal is closed
  };

  // Add event listener to the form for form submission
  petitionForm.addEventListener("submit", handleFormSubmit);

  // Add event listener to the close modal button
  closeModalButton.addEventListener("click", closeModal);
});
