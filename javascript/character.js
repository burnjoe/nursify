document.addEventListener("DOMContentLoaded", function () {
  const startBtns = document.querySelectorAll(".btn-start");
  const playerNameSpans = document.querySelectorAll(".playerName");
  const patientNameSpan = document.querySelector("#patient-info .name");
  const patientAgeSpan = document.querySelector("#patient-info .age");
  const patientSexSpan = document.querySelector("#patient-info .sex");
  const patientInfoSection = document.querySelector("#patient-info");
  const nameInput = document.getElementById("nameInput");

  let currentSection = document.querySelector("section.enter-a-name");

  // Hide all sections other than the first one initially
  const sectionsToHide = document.querySelectorAll("section:not(.enter-a-name)");
  sectionsToHide.forEach(function (section) {
    section.style.display = "none";
  });

  startBtns.forEach(function (startBtn) {
    startBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const playerName = nameInput.value.trim(); // Trim whitespace

      // Check if the name is empty
      if (playerName === "") {
        alert("Please enter your name before proceeding.");
        return; // Prevent further execution
      }

      // Update the playerNameSpans with the entered playerName
      playerNameSpans.forEach(function (span) {
        span.textContent = playerName;
      });

      // Save name to local storage
      localStorage.setItem("playerName", playerName);

      console.log("Player name:", playerName);

      // Show the next section
      const nextSection = currentSection.nextElementSibling;
      if (nextSection) {
        currentSection.style.display = "none"; // Hide the current section
        currentSection = nextSection; // Update current section
        nextSection.style.display = "block"; // Show the next section
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // const characterLinks = document.querySelectorAll(".character-link");
  // characterLinks.forEach(function (link) {
  //   link.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     const characterName = this.textContent.trim();
  //     console.log("Selected character:", characterName);

  //     // Update patient information section with selected character's details
  //     if (patientInfoSection) {
  //       switch (characterName) {
  //         case "Ana":
  //           patientNameSpan.textContent = "Ana";
  //           patientAgeSpan.textContent = "15 years old";
  //           patientSexSpan.textContent = "Female";
  //           break;
  //         case "May":
  //           patientNameSpan.textContent = "May";
  //           patientAgeSpan.textContent = "17 years old";
  //           patientSexSpan.textContent = "Female";
  //           break;
  //         case "Mark":
  //           patientNameSpan.textContent = "Mark";
  //           patientAgeSpan.textContent = "25 years old";
  //           patientSexSpan.textContent = "Male";
  //           break;
  //         case "John":
  //           patientNameSpan.textContent = "John";
  //           patientAgeSpan.textContent = "16 years old";
  //           patientSexSpan.textContent = "Male";
  //           break;
  //         default:
  //           // Handle default case if necessary
  //           break;
  //       }
  //     }

  //     // Show the next section
  //     const nextSection = currentSection.nextElementSibling;
  //     if (nextSection) {
  //       currentSection.style.display = "none"; // Hide the current section
  //       currentSection = nextSection; // Update current section
  //       nextSection.style.display = "block"; // Show the next section
  //       nextSection.scrollIntoView({ behavior: "smooth" });
  //     }
  //   });
  // });

  // Disable scrolling
  window.addEventListener("scroll", function (event) {
    event.preventDefault();
  });
});
