// -------page switch ----

function redirection(className) {
    var buttons = document.querySelectorAll('.' + className);
    console.log(buttons);

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the current location
            var currentLocation = window.location.pathname;

            if (currentLocation === '/blog.html') {
                // Redirect to home if on blog page
                window.location.href = '/index.html';
            } else if(currentLocation === '/index.html') {
                // Redirect to blog if on home page
                window.location.href = '/blog.html';
            }
        });
    });
}

redirection('btn-blog');

// ----------Donation History button ---------

const donationBtn = document.getElementById('donation-btn');
donationBtn.style.backgroundColor = 'rgb(180, 244, 97)';
const historyBtn = document.getElementById('history-btn');
historyBtn.style.backgroundColor ='white';

donationBtn.addEventListener('click', function(){
    historyBtn.style.backgroundColor ='white';
    donationBtn.style.backgroundColor = 'rgb(180, 244, 97)';
    document.getElementById('donation-div').classList.remove('hidden');
    document.getElementById('history-div').classList.add('hidden');
})
historyBtn.addEventListener('click', function(){
    donationBtn.style.backgroundColor ='white';
    historyBtn.style.backgroundColor = 'rgb(180, 244, 97)';
    document.getElementById('donation-div').classList.add('hidden');
    document.getElementById('history-div').classList.remove('hidden');
})


// -------- Donation calculation ---------

const currentBalanceElement = document.getElementById('accountBalance');
let accountBalance = parseInt(currentBalanceElement.textContent.split(' ')[0]);
console.log(accountBalance); // Initial account balance

const donationButtons = document.querySelectorAll('.bg-lime-400'); // Get all donation buttons
const historyDiv = document.getElementById('history-div');
const donationHistory = [];

// Function to update balance and history
function updateDonation(card, amount) {
    const currentAmountElement = card.querySelector('.text-gray-500');
    const currentAmount = parseInt(currentAmountElement.textContent);
    const newAmount = currentAmount + amount;

    currentAmountElement.textContent = `${newAmount} BDT`;
    accountBalance -= amount;
    currentBalanceElement.textContent = `${accountBalance} BDT`;



    // Add to history
    const date = new Date();
    donationHistory.push(`Donated ${amount} BDT on ${date.toLocaleString()}`);
}

// Function to display history
function displayHistory() {
    historyDiv.innerHTML = donationHistory.map(entry => `<p>${entry}</p>`).join('');
}

// Input validation
function validateInput(inputValue) {
    const donationAmount = parseInt(inputValue);

    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return false;
    }

    if (donationAmount > accountBalance) {
        alert('Insufficient account balance.');
        return false;
    }

    return donationAmount;
}

// Event listener for donation buttons
donationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const card = event.target.closest('.flex-1'); // Get the card element
        const inputField = card.querySelector('input');
        const inputValue = inputField.value;

        const donationAmount = validateInput(inputValue);
        if (donationAmount) {
            updateDonation(card, donationAmount);
            displayHistory();
            inputField.value = ''; // Clear input
        }
    });
});




