const BILL_INPUT = document.getElementById("bill_input");
const CUSTOM_INPUT = document.getElementById("custom_input");
const NUM_OF_PEOPLE_INPUT = document.getElementById("num_of_people");
const TOTAL_PER_PERSON_DIGIT = document.getElementById("total_per_person");
const ERROR_MESSAGE = document.getElementById("error_message");
const TIP_AMOUNT_PER_PERSON_DIGIT = document.getElementById("tip_amount_per_person");
const BUTTONS = document.querySelectorAll(".btn");
const RESET_BTN = document.getElementById("resetBtn");
let prevButton = null;

// Add event listeners to prevent leading zeros
removeLeadingZeros(BILL_INPUT);
removeLeadingZeros(NUM_OF_PEOPLE_INPUT);





// Event listener to activate reset button when bill input is not empty
BILL_INPUT.addEventListener("keyup", activateButton, false);

// Event listener for number of people input
NUM_OF_PEOPLE_INPUT.addEventListener("keyup", customCalculation, false);

// Event listener for reset button click
RESET_BTN.addEventListener("click", Reset, false);

//Event lister to remove leading zero's
BILL_INPUT.addEventListener("input", removeLeadingZeros, false);

// Event listeners for button clicks
BUTTONS.forEach((button) => {
  button.addEventListener("click", (e) => {
    addActiveClass(e);
    button_calculation(e);
  }, false);
});


// Function to reset to default values
function activateButton() {
  let isBilledValid = parseFloat(BILL_INPUT.value) > 0;
  RESET_BTN.toggleAttribute("disabled", !isBilledValid);
  RESET_BTN.classList.toggle("disabled", !isBilledValid);
}



// Function to reset to default values
function Reset(e) {
  [BILL_INPUT.value, CUSTOM_INPUT.value, NUM_OF_PEOPLE_INPUT.value] = ["", "", ""];
  [TOTAL_PER_PERSON_DIGIT.textContent, TIP_AMOUNT_PER_PERSON_DIGIT.textContent] = ["$0.00", "$0.00"];
  BUTTONS.forEach((button) => button.classList.remove("active"));
  NUM_OF_PEOPLE_INPUT.classList.remove("error");
  e.target.setAttribute("disabled", true);
  e.target.classList.add("disabled");
  ERROR_MESSAGE.textContent = "";
}



// Function to calculate total per person
function Calculate_Total_Per_Person(tip_percentage) {
  const DEFAULT_VALUE = "$0.00";
  
  if (BILL_INPUT.value === "0" || BILL_INPUT.value === 0) {
    return DEFAULT_VALUE;
  }

  const NUMPEOPLEVALUE = parseFloat(NUM_OF_PEOPLE_INPUT.value);

  if(NUMPEOPLEVALUE === 0 || isNaN(NUMPEOPLEVALUE)){
    handleInvalidInput("Can't be zero");
    return DEFAULT_VALUE;
  }

  NUM_OF_PEOPLE_INPUT.classList.remove("error");
  ERROR_MESSAGE.textContent = "";

  const TIP = BILL_INPUT.value * tip_percentage;
  const TOTAL =  parseFloat(BILL_INPUT.value) + TIP;
  const TOTAL_PER_PERSON = TOTAL / NUM_OF_PEOPLE_INPUT.value;

  return `$${TOTAL_PER_PERSON.toFixed(2)}`;
}





// Function to calculate tip per person
function Calculate_Tip_per_person(tip_percentage) {
  const DEFAULT_VALUE = "$0.00";

  if (BILL_INPUT.value === "0" || BILL_INPUT.value === 0) {
    return DEFAULT_VALUE;
  }

  if (NUM_OF_PEOPLE_INPUT.value === "0" || NUM_OF_PEOPLE_INPUT.value == 0) {
    handleInvalidInput("Can't be zero");
    return DEFAULT_VALUE;
  }

  NUM_OF_PEOPLE_INPUT.classList.remove("error");
  ERROR_MESSAGE.textContent = "";

  const TIP = BILL_INPUT.value * tip_percentage;
  const TIP_PER_PERSON = TIP / NUM_OF_PEOPLE_INPUT.value;

  return `$${TIP_PER_PERSON.toFixed(2)}`;
}



// Function to handle the custom input calculations
function customCalculation() {
  const TIP_PERCENTAGE = CUSTOM_INPUT.value / 100;
  updateValues(TIP_PERCENTAGE);
}



// Function to update values based on tip percentage
function updateValues(tip_percentage){
  const TIP = Calculate_Tip_per_person(tip_percentage);
  TIP_AMOUNT_PER_PERSON_DIGIT.textContent = TIP;

  const TOTAL = Calculate_Total_Per_Person(tip_percentage);
  TOTAL_PER_PERSON_DIGIT.textContent = TOTAL;
}




// Function to handle invalid input
function handleInvalidInput(message) {
  ERROR_MESSAGE.textContent = message;
  NUM_OF_PEOPLE_INPUT.classList.add("error");
}



function button_calculation(e) {
  let tip_percentage = parseInt(e.target.value) / 100;

  //call total_per_person and tip_per_person only if when the key up is fired
  NUM_OF_PEOPLE_INPUT.addEventListener(
    "keyup",
    (e) => {
      let tip, total;
      //calculate tip_per_person
      tip = Calculate_Tip_per_person(tip_percentage);
      TIP_AMOUNT_PER_PERSON_DIGIT.textContent = tip;

      //calculate total_per_person
      total = Calculate_Total_Per_Person(tip_percentage);
      TOTAL_PER_PERSON_DIGIT.textContent = total;
    },
    false
  );
}




//Function to add active class
function addActiveClass(e) {
  const isButton = e.target.nodeName === "INPUT";

  if (!isButton) {
    return;
  }

  e.target.classList.add("active");

  if (prevButton !== null) {
    prevButton.classList.remove("active");
  }

  prevButton = e.target;
}




// Function to remove leading zeros from input
function removeLeadingZeros(inputElement) {

  let hasLeadingZero = false;

  inputElement.addEventListener('input', function(event) {
    let inputValue = event.target.value;

    //checks if the input starts with zero
    if(/^/.test(inputValue) && !hasLeadingZero){
      hasLeadingZero = true;
    }

    //convert to a number without leading zero
    const numericValue = parseInt(inputValue, 10);

    //update the input value
    if(!isNaN(numericValue)){
      event.target.value = numericValue;
    }else{
      event.target.value = ''; //set to empty if not a valid number
    }

    // Update the input value
    //event.target.value = inputValue;
  });
}