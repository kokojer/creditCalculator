//----ТЕКСТОВЫЕ ИНПУТЫ-----------------------------------
const totalCost = document.querySelector('#total-cost'),
	firstContribution = document.querySelector('#first-contribution'),
	termCredit = document.querySelector('#term-credit');

//----Рейндж ИНПУТЫ-----------------------------------
const totalCostRange = document.querySelector('#total-cost-range'),
	firstContributionRange = document.querySelector('#first-contribution-range'),
	termCreditRange = document.querySelector('#term-credit-range');

//----РЕЗУЛЬТАТЫ-----------------------------------
const totalAmountOfСredit = document.querySelector('#amount-of-credit'),
	totalMonthlyPayment = document.querySelector('#monthly-payment'),
	totalRecomendedIncome = document.querySelector('#recomended-income');

//----Все рейндж-----------------------------------
const inputsRange = document.querySelectorAll('input[type="range"]');

//----Все инпуты(не рейнджи)-----------------------------------
const inputsNumber = document.querySelectorAll('input[type="number"]');

//----Все кнопки с процентной ставкой-----------------------------------
const bankBtns = document.querySelectorAll('.bank');

//---Все процентные ставки банков------------------------------------------------------------
const precent = document.querySelectorAll('.bank__percent');


const assignValue = () => {
	totalCost.value = totalCostRange.value;
	firstContribution.value = firstContributionRange.value;
	termCredit.value = termCreditRange.value;
}
const assignValueReversed = () => {
	totalCostRange.value = totalCost.value;
	firstContributionRange.value = firstContribution.value;
	termCreditRange.value = termCredit.value;
}

assignValue();

const banks = [
	{
		name: 'alfa',
		precents: precent[0].textContent.match(/[\d.]+/)[0],
	},
	{
		name: 'sber',
		precents: precent[1].textContent.match(/[\d.]+/)[0],
	},
	{
		name: 'pochta',
		precents: precent[2].textContent.match(/[\d.]+/)[0],
	},
	{
		name: 'tinkoff',
		precents: precent[3].textContent.match(/[\d.]+/)[0],
	},
];

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
	bank.addEventListener('click', () => {
		for (let item of bankBtns) {
			item.classList.remove('active-bank');
		}
		bank.classList.add('active-bank');
		takeActiveBank(bank);
	})
}

const takeActiveBank = currentActive => {
	const dataAttrValue = currentActive.dataset.name;
	const currentBank = banks.find(bank => bank.name === dataAttrValue);
	currentPrecent = currentBank.precents;
	calculation(totalCost.value, firstContribution.value, termCredit.value);
};

for (let input of inputsRange) {
	input.addEventListener('input', () => {
		assignValue();
		calculation(totalCost.value, firstContribution.value, termCredit.value);
	})
}

for (let input of inputsNumber) {
	input.addEventListener('input', () => {
		assignValueReversed();
		calculation(totalCost.value, firstContribution.value, termCredit.value);
	})
}

const calculation = (totalCost = 0, firstContribution = 100000, termCredit = 1) => {
	//EП - ЕЖЕМЕСЯЧНЫЙ ПЛАТЕЖ
	//РК - РАЗМЕР КРЕДИТА
	//ПС - ПРОЦЕНТНАЯ СТАВКА
	//КМ - КОЛИЧЕСТВО МЕСЯЦЕВ

	//ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ

	let monthlyPayment;  //EП
	let lounAmount = totalCost - firstContribution; //РК
	let interestRate = currentPrecent; //ПС
	let numberOfYears = termCredit; //КОЛИЧЕСВО ЛЕТ
	let numberOfMonth = 12 * numberOfYears; //КМ

	monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonth) / numberOfMonth;
	const monthlyPaymentArounded = Math.round(monthlyPayment);
	if (monthlyPaymentArounded < 0) {
		return false;
	} else {
		totalAmountOfСredit.innerHTML = `${lounAmount}₽`;
		totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded}₽`;
		totalRecomendedIncome.innerHTML = `От ${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)}₽`;
	}
}