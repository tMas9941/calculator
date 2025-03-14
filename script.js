const prevTextbox = document.getElementById("prev-textbox");
const currTextbox = document.getElementById("curr-textbox");
const numbers = document.querySelectorAll("button[data-number]");
const operators = document.querySelectorAll("button[data-operator]");
const buttonClear = document.getElementById("button-clear");
const buttonEqual = document.getElementById("button-equal");

let operator = "";
let prevNumber = "";
let currNumber = 0;

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
	prevNumber = 0;
	currNumber = 0;
};

const calculateResult = () => {
	let result = operations[operator](prevNumber, currNumber);
	console.log("result  ", result);
	return result;
};

const addNumber = (e) => {
	if (e.target.textContent === "." && currTextbox.textContent.includes(".")) return;
	if (String(currNumber).length >= 16) return;
	currNumber = Number(currNumber + e.target.textContent.toString());
	currTextbox.innerText = currNumber;
};

const addOperator = (e) => {
	// console.log("e : ", e.target.dataset.operator);
	console.log("operator  ", operator);

	if (currNumber && operator) currTextbox.textContent = calculateResult();

	operator = e.target.dataset.operator;
	prevNumber = Number(currTextbox.textContent);
	currNumber = 0;

	prevTextbox.textContent = currTextbox.textContent + e.target.textContent;
	prevTextbox.scrollTo({
		left: 10000,
	});
};

const clear = () => {
	prevTextbox.textContent = "";
	currTextbox.textContent = 0;
	prevNumber = 0;
	currNumber = 0;
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
