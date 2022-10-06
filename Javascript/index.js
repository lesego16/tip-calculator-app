const bill = document.getElementById("bill_input");
const custom = document.getElementById("custom_input");
const number_of_people = document.getElementById("num_of_people");
const total_per_person_digit = document.getElementById("total_per_person");
const error_message = document.getElementById("error_message");
const tip_amount_per_person_digit = document.getElementById(
  "tip_amount_per_person"
);
const buttons = document.querySelectorAll(".btn");
const reset_btn = document.getElementById("resetBtn");
let prevButton = null;
const tip_calculator = document.querySelectorAll("tip_calculator");

buttons.forEach((button) =>
  button.addEventListener("click", button_calculation, false)
);

//activate reset button if bill input is not empty
bill.addEventListener("keyup", activateButton, false);
function activateButton() {
  if (bill.value != 0 && bill.value != "0") {
    reset_btn.removeAttribute("disabled", "");
    reset_btn.classList.remove("disabled");
  } else {
    reset_btn.setAttribute("disabled", "");
    reset_btn.classList.add("disabled");
  }
}

//reset to default
reset_btn.addEventListener("click", Reset, false);
function Reset(e) {
  bill.value = "";
  custom.value = "";
  number_of_people.value = "";
  total_per_person_digit.textContent = "$0.00";
  tip_amount_per_person_digit.textContent = "$0.00";
  buttons.forEach((button) => button.classList.remove("active"));
  number_of_people.classList.remove("error");
  e.target.setAttribute("disabled", "");
  e.target.classList.add("disabled");

  error_message.textContent = "";
}

function Calculate_Total_Per_Person(tip_percentage) {
  let tip, total, total_per_person, total_per_person_, default_value;

  default_value = "$0.00";

  tip = bill.value * tip_percentage;
  total = parseFloat(bill.value) + tip;

  total_per_person = total / number_of_people.value;
  total_per_person_ = "$" + total_per_person.toFixed(2);

  if (bill.value == "0" || bill.value == 0) {
    return default_value;
  }

  if (number_of_people.value == "0" || number_of_people.value == 0) {
    error_message.textContent = "Can't be zero";
    number_of_people.classList.add("error");
    return default_value;
  }

  number_of_people.classList.remove("error");
  error_message.textContent = "";
  return total_per_person_;
}

function Calculate_Tip_per_person(tip_percentage) {
  let tip, tip_per_person_, tip_per_person, default_value;

  default_value = "$0.00";

  tip = bill.value * tip_percentage;

  tip_per_person_ = tip / number_of_people.value;
  tip_per_person = "$" + tip_per_person_.toFixed(2);

  if (bill.value == "0" || bill.value == 0) {
    return default_value;
  }

  if (number_of_people.value == "0" || number_of_people.value == 0) {
    error_message.textContent = "Can't be zero";
    number_of_people.classList.add("error");
    return default_value;
  }

  number_of_people.classList.remove("error");
  error_message.textContent = "";

  return tip_per_person;
}

number_of_people.addEventListener("keyup", custom_calculation, false);
function custom_calculation() {
  let tip, total, tip_percentage;
  tip_percentage = custom.value / 100;

  //calculate tip_per_person
  tip = Calculate_Tip_per_person(tip_percentage);
  tip_amount_per_person_digit.textContent = tip;

  //calculate total_per_person
  total = Calculate_Total_Per_Person(tip_percentage);
  total_per_person_digit.textContent = total;
}

function button_calculation(e) {
  let tip_percentage = parseInt(e.target.value) / 100;

  //call total_per_person and tip_per_person only if when the key up is fired
  number_of_people.addEventListener(
    "keyup",
    (e) => {
      let tip, total;
      //calculate tip_per_person
      tip = Calculate_Tip_per_person(tip_percentage);
      tip_amount_per_person_digit.textContent = tip;

      //calculate total_per_person
      total = Calculate_Total_Per_Person(tip_percentage);
      total_per_person_digit.textContent = total;
    },
    false
  );
}

/*add active class on button click then remove 
          active class from the previous button when another button is clicked*/
buttons.forEach((button) =>
  button.addEventListener("click", addActiveClass, false)
);
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
