const prevTextbox = document.getElementById("prev-textbox");
const currTextbox = document.getElementById("curr-textbox");

const clearButton = document.getElementById("button-clear");
const equalButton = document.getElementById("button-equal");
const delButton = document.getElementById("button-del");

const numberButtons = document.querySelectorAll("button[data-number]");
const operatorButtons = document.querySelectorAll("button[data-operator]");

let calcString = "";
let resetNumbers = false;

const operators = [...operatorButtons].map((button) => button.innerHTML);

const handleEqualPressed = () => {
	if (calcString === "") return;
	if (isOperator(-1)) calcString = calcString.slice(0, -1);

	calcString = calcString.replaceAll("÷", "/");
	calcString = calcString.replaceAll("×", "*");
	changeCalcString(calculateResult());
	resetNumbers = true;
};

const calculateResult = () => eval(calcString).toString();

const addNumber = (e) => {
	if (resetNumbers && !isOperator(-1)) changeCalcString("");
	resetNumbers = false;
	if (e.target.innerHTML === ".") {
		if (calcString.includes(".")) {
			// limit decimal point count
			return;
		} else if (calcString.length === 0 || isOperator(-1)) {
			// add 0 before empty decimal
			calcString = calcString + "0";
		}
	}
	changeCalcString(calcString + e.target.innerHTML);
};

const addOperator = (e) => {
	if (calcString === "") return;
	if (isOperator(-1)) {
		changeCalcString(calcString.slice(0, -1) + e.target.dataset.operator);
	} else {
		changeCalcString(calcString + e.target.dataset.operator);
	}
};

const clear = () => changeCalcString("");

const del = () => changeCalcString(calcString.slice(0, -1));

// add event listeners
numberButtons.forEach((number) => {
	number.addEventListener("click", addNumber);
});
operatorButtons.forEach((number) => {
	number.addEventListener("click", addOperator);
});
clearButton.addEventListener("click", clear);
equalButton.addEventListener("click", handleEqualPressed);
delButton.addEventListener("click", del);

function changeCalcString(newValue) {
	calcString = newValue;
	if (calcString === "") {
		currTextbox.innerHTML = "0";
	} else {
		currTextbox.innerHTML = calcString;
	}
}

function isOperator(position) {
	return operators.includes(calcString.at(position));
}
