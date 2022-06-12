"use strict";

// Selecting elements
const quizButton = document.querySelector(".quiz");
const flagsQuizSection = document.querySelector(".flags-quiz");
const quizLayout = document.querySelector(".quiz-layout");
const closeQuizButton = document.querySelector(".quiz-close");

// Flags quiz async function
const flags = async function () {
  try {
    // Accessing all data from the API
    const flagsAPI = await fetch("https://restcountries.com/v2/all");
    const flagsData = await flagsAPI.json();

    // Declare an empty array to collect all country names
    const flagsArray = [];
    // Looping over the flagsData json to push country names into flagsArray
    flagsData.forEach(function (flags) {
      flagsArray.push(flags.name);
    });

    // Generate a random number to pick a country name from the flagsArray
    const flagRandomNumber = Math.floor(Math.random() * 250);

    // Accessing country names data from the API
    const flagsByNameAPI = await fetch(
      // Passing the flagsArray with the generated random number into the country name
      `https://restcountries.com/v2/name/${flagsArray[flagRandomNumber]}`
    );
    const [flagsByNameData] = await flagsByNameAPI.json();

    // Collecting the random name that was passed as the image to be the correct answer
    const correctAnswer = flagsByNameData.name;

    // Declare an empty array to push four random choices to the choices buttons
    const choices = [];

    // Using a basic for loop to iterate over the flagsArray four times only
    // The reason for this is to pass four random countries into the Choices array
    for (let i = 0; i < 4; i++) {
      if (
        // Making sure the choices is not the correct answer and it's not undefined
        flagsArray[Math.floor(Math.random() * 250)] !== correctAnswer ||
        flagsArray[Math.floor(Math.random() * 250)] !== "undefined"
      ) {
        choices.push(flagsArray[Math.floor(Math.random() * 250)]);
      }
    }

    // Generating a random number from 0 to 3
    // To choose randomly which position in the choices array to pass the correct answer into it
    const choicesRandomNumber = Math.floor(Math.random() * 4);

    // Passing the correct answer randomly to one of the choices button
    choices[choicesRandomNumber] = correctAnswer;

    // Creating HTML elements for the quiz to insert inside the flagsQuizSection
    const html = `
  <section class="flags">
  <div class="flags-number">
    <p class="question-number">10/10</p>
  </div>

  <div>
    <img
      class="flag-img"
      src="${flagsByNameData.flag}"
      alt="flags images"
    />
  </div>

  <div class="choices-div">
    <button class="choices">${choices[0]}</button>
    <button class="choices">${choices[1]}</button>
    <button class="choices">${choices[2]}</button>
    <button class="choices">${choices[3]}</button>
  </div>

  <div class="next-done-button">
    <button class="next-done">NEXT</button>
  </div>
</section>
  `;

    // Inserting the HTML elements into the flags-quiz section using AdjacentHTML
    quizLayout.insertAdjacentHTML("afterbegin", html);

    // Selecting Elements after the quiz has been revealed
    const choicesButton = document.querySelectorAll(".choices");
    const nextDone = document.querySelector(".next-done");
    const flagsContainer = document.querySelector(".flags");

    // Disabling the next button before the user click for an answer
    nextDone.classList.add("disabled");
    nextDone.disabled = true;

    // Declaring empty arrays to use to retrieve the correct and incorrect answers
    const correctArray = [];
    const incorrectArray = [];

    // iterating over the buttons
    choicesButton.forEach(function (button) {
      // Retreiving and pushing the correct and incorrect answers to be used when the user click one of the choices
      if (button.textContent === correctAnswer) {
        correctArray.push(button);
      } else if (button.textContent !== correctAnswer) {
        incorrectArray.push(button);
      }

      // Adding an event handler for each of the choices buttons
      button.addEventListener("click", function () {
        // If the user clicked the correct answer
        if (button.textContent === correctAnswer) {
          button.classList.add("correct");
          incorrectArray[0].classList.add("disabled");
          incorrectArray[1].classList.add("disabled");
          incorrectArray[2].classList.add("disabled");

          incorrectArray[0].disabled = true;
          incorrectArray[1].disabled = true;
          incorrectArray[2].disabled = true;

          // Enable the next-done button when the user clicked for and answer
          nextDone.classList.remove("disabled");
          nextDone.disabled = false;
        }

        // If the user clicked one of the incorrect answers
        if (button.textContent !== correctAnswer) {
          button.classList.add("incorrect");
          button.disabled = true;
          correctArray[0].disabled = true;
          correctArray[0].classList.add("correct");

          if (button.textContent === incorrectArray[0].textContent) {
            incorrectArray[1].classList.add("disabled");
            incorrectArray[2].classList.add("disabled");

            incorrectArray[1].disabled = true;
            incorrectArray[2].disabled = true;
          } else if (button.textContent === incorrectArray[1].textContent) {
            incorrectArray[0].classList.add("disabled");
            incorrectArray[2].classList.add("disabled");

            incorrectArray[0].disabled = true;
            incorrectArray[2].disabled = true;
          } else if (button.textContent === incorrectArray[2].textContent) {
            incorrectArray[0].classList.add("disabled");
            incorrectArray[1].classList.add("disabled");

            incorrectArray[0].disabled = true;
            incorrectArray[1].disabled = true;
          }

          // Enable the next-done button when the user clicked for and answer
          nextDone.classList.remove("disabled");
          nextDone.disabled = false;
        }
      });
    });

    // When the user click next for the next flag
    nextDone.addEventListener("click", function () {
      flagsContainer.parentNode.removeChild(flagsContainer);
      flags();
    });

    const closeQuiz = function () {
      flagsContainer.parentNode.removeChild(flagsContainer);
      flagsQuizSection.classList.add("hidden");
    };

    // When the user click the close button
    closeQuizButton.addEventListener("click", closeQuiz);

    // When the user press the Esc button on the keyboard
    document.addEventListener("keydown", function (event) {
      if (event.code === "Escape") {
        closeQuiz();
      }
    });
  } catch (err) {
    console.error(err);
  }
};
// Event handler when the user click on the flag quiz button to start the quiz
quizButton.addEventListener("click", function () {
  flagsQuizSection.classList.remove("hidden");
  flags();
});
