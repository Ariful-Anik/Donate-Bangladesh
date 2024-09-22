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
    document.getElementById('historySection').classList.add('hidden');
})
historyBtn.addEventListener('click', function(){
    donationBtn.style.backgroundColor ='white';
    historyBtn.style.backgroundColor = 'rgb(180, 244, 97)';
    document.getElementById('donation-div').classList.add('hidden');
    document.getElementById('historySection').classList.remove('hidden');
})


// -------- Donation calculation ---------

const currentBalanceElement = document.getElementById('accountBalance');
let accountBalance = parseInt(currentBalanceElement.textContent.split(' ')[0]);


const donationButtons = document.querySelectorAll('.bg-lime-400');
console.log(donationButtons);
 // Get all donation buttons

// const historyDiv = document.getElementById('history-div');
// const donationHistory = [];

const historySection = document.getElementById('historySection');

// Function to update balance and history
function updateDonation(card, amount) {
    const currentAmountElement = card.querySelector('.text-gray-500');
    const currentAmount = parseInt(currentAmountElement.textContent);
    const newAmount = currentAmount + amount;

    currentAmountElement.textContent = `${newAmount} BDT`;
    accountBalance -= amount;
    currentBalanceElement.textContent = `${accountBalance} BDT`;



    // Add to history
    
    // Donated ${newAmount} BDT for ${this.parentNode.querySelector('h2').textContent} on ${new Date().toLocaleString()}
     
        console.log(historySection);
        const newHistory = document.createElement('div');
        console.log(newHistory);
        // newHistory.innerHTML = `${newAmount} Taka is  Donated for ${}  `;
        historySection.appendChild(newHistory);



    // const date = new Date();
    // donationHistory.push(`Donated ${amount} BDT on ${date.toLocaleString()}`);
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
        const messageTo = card.querySelector('#info');
        const message = messageTo.
        console.log(messageTo);

        const donationAmount = validateInput(inputValue);
        if (donationAmount) {
            updateDonation(card, donationAmount);
            // displayHistory();
            inputField.value = ''; // Clear input
        }
    });
});




