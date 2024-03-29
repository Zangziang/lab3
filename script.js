'use strict';
const account1 = {
  owner: 'PTH',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
   
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'PTHL',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const euroToUSD = 1.1; //1.23

const formatMovementsDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed < 7) return `${daysPassed} days ago`;
  if (daysPassed === 7) return '1 week ago';
  // else {
  //   console.log(daysPassed);
  //   const day = `${date.getDate()}`.padStart(2, '0'); //Will add zero at the start and maximum digit will be 2
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0); //Will add zero at the start and maximum digit  will be 2
  //   const year = date.getFullYear();
  // return `${day} / ${month} / ${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

//Formatting Movement currency
const formatCurrency = function (value, locale, currency) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  //lets make the container empty so it does not have any html elements inside 
  containerMovements.innerHTML = '';
  //Adding sort
  const movementSorts = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; //slice is to create a copy of movements array

  movementSorts.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formattedMovements = formatCurrency(
      movement,
      acc.locale,
      acc.currency
    );

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type} </div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovements}</div> 
      </div> 
   `;
    //.toFixed(2) : The toFixed() method formats a number using fixed-point notation.
    //inserting an html by using "insertAdjacentHTML" and it takes 2 perimeters one is ftn & other is the htm element you wanna insert it 😀
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);
console.log(containerMovements.innerHTML);

//REDUCE METHOD
//accumulator acts as SNOWBALL
const calculateDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (accum, movement) {
    console.log(accum, movement);
    return accum + movement;
  }, 0); //  0 is because we want to give Accum an initial value of 0
  const formattedMovements = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );

  labelBalance.textContent = `${formattedMovements}`;
};

const calculateDisplaySummary = function (acc) {
  //Deposits total
  const incomes = acc.movements
    .filter(movement => movement > 0)
    .map(movement => movement * euroToUSD)
    .reduce((accum, movement) => accum + movement, 0);
  // const formattedMovements = formatCurrency(
  //   acc.balance,
  //   acc.locale,
  //   acc.currency
  // );
  labelSumIn.textContent = formatCurrency(
    Math.round(incomes),
    acc.locale,
    acc.currency
  );
  console.log(incomes);
  //Withdrawals total
  const outGoing = movements
    .filter(movement => movement < 0)
    .map(movement => movement * euroToUSD)
    .reduce((accum, movement) => Math.abs(accum + movement, 0));
  labelSumOut.textContent = formatCurrency(
    Math.round(outGoing),
    acc.locale,
    acc.currency
  );
  //Interest =  1.2% of deposits
  const interest = movements
    .filter(movement => movement > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter((int, index, arr) => int >= 1)
    .reduce((accum, inter) => accum + inter, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

// const user = 'Steven Thomas Williams'; //stw
// const username = user.toLowerCase().split(' ');
// console.log(username);

//change the normal funtion 👉🏽 🏹Function: just remove the function keyword & replaceit with => before {}
const createUsernames = function (userAccounts) {
  console.log(userAccounts); //It will give the whole array of accounts with the values of each element too

  userAccounts.forEach(function (userAccount) {
    userAccount.username = userAccount.owner
      .toLowerCase()
      .split(' ') //create an array
      .map(name => name[0])
      .join(''); //Change the array and join it will no space
    console.log(userAccount.username);
  });
};

createUsernames(accounts);
console.log(accounts);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDepositsInUSD = movements
  .filter((mov, index, arr) => {
    console.log(mov, index, arr);
    return mov > 0;
  })
  .map((mov, index, arr) => {
    console.log(arr, mov);
    return mov * euroToUSD;
  })
  .reduce((accum, mov) => {
    console.log(accum, mov);
    return accum + mov;
  });
console.log(totalDepositsInUSD);

//Update UI
const updateUI = function (acc) {
  //display the movements
  displayMovements(acc);
  //display the balance
  calculateDisplayBalance(acc);
  //display the sumary
  calculateDisplaySummary(acc);
};
//LOGIN TO GET STARTED
let currentAccount, timer;

//Logout Timer
const startLogOutTimer = function () {
  const tick = () => {
    //Change the time to minutes and seconds
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //each call print the remaining time
    labelTimer.textContent = `${min}:${sec}`;

    //when the time is equal to 0 logout the person
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Time out, Log in to get started`;
      containerApp.style.opacity = 0;
    }
    //decrease it 1 sec
    time--;
  };
  //set the time to 5 minutes
  let time = 120;
  tick();

  const timer = setInterval(tick, 1000); //call the time every second
  return timer; //To use it globally
};

//Event Handler
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //Prevent the form from submitting
  console.log(`login Button is clicked`);
  //Using find method
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    console.log('LOGIN');
    //display the UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0] //split just take the first name [0]
    }!`;

    containerApp.style.opacity = 100;
    //Creating the current balance Date
    // const now = new Date();
    //Creating a week days
    // const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat'];
    // const day = weekDays[now.getDay()]; //WeekDay[3] = Wed
    // //Now if the date and month is a single digit then we use padStart
    // const date = `${now.getDate()}`.padStart(2, '0'); //Will add zero at the start and maximum digit will be 2
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); //Will add zero at the start and maximum digit  will be 2
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${date} / ${month} / ${year}`;
    //Experimenting API
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit', //08 not only 8
      month: 'long', //not like 12 it will give December , 'short' 👉🏽Dec
      year: 'numeric', //2020 not just 20
      weekday: 'long', // Wednesday , 'short' 👉🏽 Wed
    };
    //Let suppose I want to put local time
    //Use this navigator if your api doesnot have a local time 👇🏽
    // const locale = navigator.language;
    // console.log(locale); //en-US
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //International time format of english US
    // labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now); //International time format of english US

    //CLEAR THE INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value = '';
    //remove the input blinking from the pin field:

    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
});
//Tranfer Money
btnTransfer.addEventListener('click', function (e) {
  //Prevent the form from submitting
  e.preventDefault();
  const amount = +inputTransferAmount.value;

  console.log(amount);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(recieverAccount);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    // console.log('money transfered');
    currentAccount.movements.push(-amount); //minus the amount from your account
    recieverAccount.movements.push(+amount); //add the amount from your account
    currentAccount.movementsDates.push(new Date().toISOString()); //add transfer date
    recieverAccount.movementsDates.push(new Date().toISOString()); //add recieved date
    // Update UI
    updateUI(currentAccount);
    //Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});
//Request a loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Loan Button is clicked');
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //"Any" deposits > 10% and when we use "Any" it means that we have to use some
    //if any of the deposit is true then do this 👇🏽
    //Add the amount to the current account
    setTimeout(function () {
      //Loan to get accepted by the bank in 2500mseconds or 2.5 seconds
      currentAccount.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString()); //add loan date

      updateUI(currentAccount);
      //Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

//Delete the account of current user
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete button');
  //correct user name
  //correct pin
  console.log(currentAccount.username, inputCloseUsername.value);

  console.log(currentAccount.pin);
  console.log(inputClosePin.value);
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    console.log('Yes, both are equal');
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    console.log(index);
    //Deelete the account
    accounts.splice(index, 1); //index and a remove 1 array
    containerApp.style.opacity = 0; //logout the user
  }
  //Clear the input field
  inputCloseUsername.value = inputClosePin.value = '';
});

//Button for the SORT
let sorted = false;
btnSort.addEventListener('click', function (e) {
  console.log('Sort button is clicked');
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted); //!sorted = true
  sorted = !sorted; //false = true and true to false
});

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('€', '') //it will replace the the € with nothing and give you an array when you click on total amount at the top
  );
  console.log(movementUI);
});
