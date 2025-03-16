const prevTextbox = document.getElementById("prev-textbox");
const currTextbox = document.getElementById("curr-textbox");
const clearButton = document.getElementById("button-clear");
const equalButton = document.getElementById("button-equal");
const delButton = document.getElementById("button-del");
const numberButtons = document.querySelectorAll("button[data-number]");
const operatorButtons = document.querySelectorAll("button[data-operator]");

let calcString = "0";
let resetNumbers = false;

const operators = [...operatorButtons].map((button) => button.innerHTML);
const operatorsRegExp = new RegExp(`[${operators.join("\\")}]`);
const keydownButtons = {
	[clearButton.innerHTML]: clearButton,
	Delete: clearButton,
	[equalButton.innerHTML]: equalButton,
	Enter: equalButton,
	[delButton.innerHTML]: delButton,
	Backspace: delButton,
};
[...numberButtons].forEach((button) => (keydownButtons[button.innerHTML] = button));
[...operatorButtons].forEach((button) => (keydownButtons[button.dataset.operator] = button));

const handleEqualPressed = () => {
	if (calcString === "0") return;
	if (isOperator(-1)) calcString = calcString.slice(0, -1); // remove unnecessary operator
	calcString = calcString.replaceAll("÷", "/");
	calcString = calcString.replaceAll("×", "*");

	const result = eval(calcString).toString();
	if (result !== calcString) {
		changeCalcString(result);
		resetNumbers = true;
	}
};

const addNumber = (e) => {
	if (resetNumbers && !isOperator(-1)) changeCalcString("0");
	resetNumbers = false;
	const lastNumber = calcString.split(operatorsRegExp).at(-1);
	if (e.target.innerHTML === ".") {
		if (lastNumber.includes(".")) {
			// limit decimal points in numbers
			return;
		} else if (!calcString || isOperator(-1)) {
			// add 0 before empty decimal
			calcString += "0";
		}
	} else if (lastNumber === "0") {
		if (e.target.innerHTML === "0") return; // limit 0s
		if (!isNaN(Number(e.target.innerHTML)))
			// rewrite 0 if it is the first char
			return changeCalcString(calcString.slice(0, -1) + e.target.innerHTML);
	}
	changeCalcString(calcString + e.target.innerHTML);
};

const addOperator = (e) => {
	if (isOperator(-1)) {
		changeCalcString(calcString.slice(0, -1) + e.target.innerHTML);
	} else {
		changeCalcString(calcString + e.target.innerHTML);
	}
};

const clear = () => changeCalcString("0");

const del = () => changeCalcString(calcString.slice(0, -1) || "0");

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

document.addEventListener("keydown", function (event) {
	if (Object.keys(keydownButtons).includes(event.key)) {
		keydownButtons[event.key].click();
		keydownButtons[event.key].classList.add("buton-keydown");
		setTimeout(() => keydownButtons[event.key].classList.remove("buton-keydown"), 100);
		event.preventDefault();
	}
});

function changeCalcString(newValue) {
	calcString = newValue;
	currTextbox.innerHTML = newValue;
}

function isOperator(position) {
	return operators.includes(calcString.at(position));
}
