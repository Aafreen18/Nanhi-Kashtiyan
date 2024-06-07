function updateSponsorshipDetails() {
    var numOfChildren = parseInt(document.getElementById("children").value);
    var duration = parseInt(document.getElementById("duration").value);
    var currency = document.getElementById("currency").value;

    var sponsorshipDetails = document.getElementById("sponsorship-details");
    if (numOfChildren && duration && currency) {
        var debitAmount = calculateDebitAmount(numOfChildren, duration, currency);
        sponsorshipDetails.innerHTML = "I commit to sponsor " + numOfChildren + " children for " + duration + " month(s). Please debit " + getCurrencySymbol(currency) + debitAmount + " from my credit card/bank account.";
    } else {
        sponsorshipDetails.innerHTML = "Please select the number of children, duration, and currency to see sponsorship details.";
    }
}

// Function to get currency symbol
function getCurrencySymbol(currency) {
    switch(currency) {
        case "INR":
            return "INR ";
        case "USD":
            return "$";
        case "AUD":
            return "AUD ";
        case "EUR":
            return "EUR ";
        case "GBP":
            return "GBP ";
        case "CAD":
            return "CAD ";
        case "JPY":
            return "JPY ";
        case "CHF":
            return "CHF ";
        case "CNY":
            return "CNY ";
        case "RUB":
            return "RUB ";
        case "BRL":
            return "BRL ";
        case "KRW":
            return "KRW ";
        // Add more cases for additional currencies if needed
        default:
            return "";
    }
}

// Function to calculate debit amount based on currency, number of children, and duration
function calculateDebitAmount(numOfChildren, duration, currency) {
    switch(currency) {
        case "INR":
            return 11880 * numOfChildren * duration;
        case "USD":
            return 200 * numOfChildren * duration;
        case "AUD":
            return 280 * numOfChildren * duration;
        case "EUR":
            return 180 * numOfChildren * duration;
        case "GBP":
            return 160 * numOfChildren * duration;
        case "CAD":
            return 260 * numOfChildren * duration;
        case "JPY":
            return 22000 * numOfChildren * duration;
        case "CHF":
            return 220 * numOfChildren * duration;
        case "CNY":
            return 1300 * numOfChildren * duration;
        case "RUB":
            return 15000 * numOfChildren * duration;
        case "BRL":
            return 1050 * numOfChildren * duration;
        case "KRW":
            return 218000 * numOfChildren * duration;
        // Add more cases for additional currencies if needed
        default:
            return 0;
    }
}

// Event listeners to update sponsorship details on select change
document.getElementById("children").addEventListener("change", updateSponsorshipDetails);
document.getElementById("duration").addEventListener("change", updateSponsorshipDetails);
document.getElementById("currency").addEventListener("change", updateSponsorshipDetails);

// Initial update on page load
updateSponsorshipDetails();





//payment
document.getElementById('rzp-button1').onclick = async function(e) {
    e.preventDefault();
    console.log('Pay button clicked');

    var numOfChildren = parseInt(document.getElementById("children").value);
    var duration = parseInt(document.getElementById("duration").value);
    var currency = document.getElementById("currency").value;
    var debitAmount = calculateDebitAmount(numOfChildren, duration, currency);

    let paymentDate = document.getElementById("exampleDate").value;
    let fName = document.getElementById("exampleFirstname").value;
    let lName = document.getElementById("exampleLastname").value;
    let fullName = fName + " " + lName;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("contact").value;

    // Fetch new order ID from server
    let response = await fetch('http://localhost:3000/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            debitAmount: debitAmount,
            currency: currency,
            fullName:fullName,
            paymentDate:paymentDate
        })
    })
    
    let orderData = await response.json();
    console.log(orderData.order);

    // Initialize Razorpay options with the new order ID
    var options = {
        "key": "rzp_test_LYgLgs5QgO5IZj", // Enter the Key ID generated from the Dashboard
        "amount": orderData.amount, // Amount is in currency subunits. Default currency is INR.
        "currency": orderData.currency,
        "name": "Nanhi Kashtiyan", //your business name
        "description": "Test Transaction",
        "order_id": orderData.order, // This is the new Order ID from the server the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)

            // Send email upon successful payment
            var templateParams = {
                to_name: 'Nanhi Kashtiyan',
                from_name: fullName,
                message: fullName + " has sponsored " + numOfChildren + " child/children for " + duration + " month/s with " + currency + " " + debitAmount + ". Email : " + email
            };
            
            emailjs.send('service_nk7uf5m', 'template_m90jt67', templateParams)
            .then(response => {
                  console.log('SUCCESS!', response.status, response.text);
                  document.getElementById('info-form').reset();
              }, error => {
                  console.error('FAILED...', error);
              }); 
        },
        "prefill": {
            "name": fullName, //your customer's name
            "email": email, //your customer's email
            "contact": contact,//your customer's contact
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}