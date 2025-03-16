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
const operatorsRegExp = new RegExp(`[${operators.join("\\")}]`);

const handleEqualPressed = () => {
	if (calcString === "") return;
	if (isOperator(-1)) calcString = calcString.slice(0, -1); // remove unnecessary operator
	calcString = calcString.replaceAll("÷", "/");
	calcString = calcString.replaceAll("×", "*");

	const result = calculateResult();
	if (result !== calcString) {
		changeCalcString(result);
		resetNumbers = true;
	}
};

const calculateResult = () => eval(calcString).toString();

const addNumber = (e) => {
	if (resetNumbers && !isOperator(-1)) changeCalcString("");
	resetNumbers = false;
	if (e.target.innerHTML === ".") {
		const lastNumber = calcString.split(operatorsRegExp).at(-1);
		if (lastNumber.includes(".")) {
			// limit decimal points in numbers
			return;
		} else if (!calcString || isOperator(-1)) {
			// add 0 before empty decimal
			calcString += "0";
		}
	} else if (e.target.innerHTML === "0" && calcString === "0") return;
	changeCalcString(calcString + e.target.innerHTML); // limit 0s
};

const addOperator = (e) => {
	if (calcString === "") return;
	if (isOperator(-1)) {
		changeCalcString(calcString.slice(0, -1) + e.target.innerHTML);
	} else {
		changeCalcString(calcString + e.target.innerHTML);
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

document.addEventListener("keydown", function (event) {
	console.log("key  ", event.key);
	// console.log(numberButtons[0]);

	const keydownCommands = {
		// ...Object.fromEntries([...numberButtons.entries()]),

		[clearButton.innerHTML]: clearButton,
		Delete: clearButton,
		[equalButton.innerHTML]: equalButton,
		Enter: equalButton,
		[delButton.innerHTML]: delButton,
		Backspace: delButton,
	};
	[...numberButtons].forEach((button) => (keydownCommands[button.innerHTML] = button));
	[...operatorButtons].forEach((button) => (keydownCommands[button.dataset.operator] = button));

	if (Object.keys(keydownCommands).includes(event.key)) {
		console.log("event.key ", event.key);
		keydownCommands[event.key].click();
		keydownCommands[event.key].classList.add("buton-keydown");
		setTimeout(() => keydownCommands[event.key].classList.remove("buton-keydown"), 100);
		event.preventDefault();
	}
});
