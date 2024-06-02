const numChildrenInput = document.getElementById('num-children');
const durationSelect = document.getElementById('duration');
const sponsorButton = document.getElementById('sponsor-now');
const costDisplay = document.getElementById('cost-display');

// Define cost per child per month
const costPerChild = 1000;

// Event listener for Sponsor Now button
sponsorButton.addEventListener('click', () => {
    const selectedDuration = durationSelect.value;
    const numChildren = parseInt(numChildrenInput.value);
    const durationInMonths = getDurationInMonths(selectedDuration); // Get duration in months

    // Calculate total cost
    const totalCost = costPerChild * numChildren * durationInMonths;

    // Display the cost
    costDisplay.textContent = `Total Cost: Rs${totalCost}`;

    // Perform any additional actions when the button is clicked
    // For example, submit the form or display a confirmation message
    console.log('Sponsor Now button clicked!');
});

// Helper function to convert duration to months
function getDurationInMonths(duration) {
    switch (duration) {
        case '1-month':
            return 1;
        case '6-months':
            return 6;
        case '1-year':
            return 12;
        default:
            return 0;
    }
}

function showConfirmation() {
    const confirmationMessage = document.querySelector('.confirmation-message');
    confirmationMessage.style.display = 'block';
}
