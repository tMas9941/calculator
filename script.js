const prevTextbox = document.getElementById("prev-textbox");
const currTextbox = document.getElementById("curr-textbox");
const numbers = document.querySelectorAll("button[data-number]");
const operators = document.querySelectorAll("button[data-operator]");
const buttonClear = document.getElementById("button-clear");
const buttonEqual = document.getElementById("button-equal");

let operator = "";
let prevNumber = null;
let currNumber = "0";

const operations = {
	add: (num1, num2) => num1 + num2,
	extract: (num1, num2) => num1 - num2,
	divide: (num1, num2) => num1 / num2,
	multiply: (num1, num2) => num1 * num2,
};

const handleEqualPressed = () => {
	if (!operator || !currNumber) return;
	prevTextbox.textContent = "";
	currTextbox.textContent = calculateResult();
	currTextbox.scrollTo({
		left: 10000,
	});
	operator = "";
	prevNumber = null;
	currNumber = "0";
};

const calculateResult = () => operations[operator](Number(prevNumber), Number(currNumber));

const addNumber = (e) => {
	if (e.target.textContent === ".") {
		// limit decimal point count
		if (currTextbox.textContent.includes(".")) {
			return;
		}
	} else if (currNumber === "0") {
		// replece starting 0 with new number
		currNumber = e.target.textContent;
		currTextbox.innerText = currNumber;
		return;
	}

	currNumber = currNumber + e.target.textContent; // add new number
	currTextbox.innerText = currNumber;
};

const addOperator = (e) => {
	if (currNumber && operator && prevNumber) currTextbox.textContent = calculateResult(); // calculate existing operation

	operator = e.target.dataset.operator;
	prevNumber = Number(currTextbox.textContent);
	currNumber = "0";

	prevTextbox.textContent = currTextbox.textContent + e.target.textContent;
	prevTextbox.scrollTo({
		left: 10000,
	});
};

const clear = () => {
	prevTextbox.textContent = "";
	currTextbox.textContent = "0";
	prevNumber = null;
	currNumber = "0";
};

// add event listeners
numbers.forEach((number) => {
	number.addEventListener("click", addNumber);
});

operators.forEach((number) => {
	number.addEventListener("click", addOperator);
});
buttonClear.addEventListener("click", clear);
buttonEqual.addEventListener("click", handleEqualPressed);
