let booking = {};
let selectedFlight = null;
let passenger = {};

// Get all steps and progress indicators
const steps = document.querySelectorAll(".step");
const progress = document.querySelectorAll(".progress-step");

// Show a specific step by index (0 = Booking, 1 = Flights, 2 = Passenger, 3 = Summary)
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
  progress.forEach((prog, i) => {
    prog.classList.toggle("active", i <= index);
  });
}

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  booking = {
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    depart: document.getElementById("departDate").value
  };
  showFlights();
  showStep(1);
});

// Show available flights
function showFlights() {
  const list = document.getElementById("flightsList");
  list.innerHTML = "";
  const flights = [
    { no: "FL101", time: "8:00 AM", price: 2000 },
    { no: "FL202", time: "12:00 PM", price: 2500 }
  ];
  flights.forEach((flight) => {
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div>
        <p>${booking.from} to ${booking.to}</p>
        <p>Flight: ${flight.no}, ${flight.time}</p>
      </div>
      <div>
        <p>₱${flight.price}</p>
        <button class="btn-primary">Select</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      selectedFlight = flight;
      showStep(2);
    });
    list.appendChild(card);
  });
}

// Handle passenger form submission
document.getElementById("passengerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  passenger = {
    name: document.getElementById("pName").value
  };
  showSummary();
  showStep(3);
});

// Show booking summary
function showSummary() {
  const card = document.getElementById("summaryCard");
  card.innerHTML = `
    <p><strong>From:</strong> ${booking.from}</p>
    <p><strong>To:</strong> ${booking.to}</p>
    <p><strong>Flight:</strong> ${selectedFlight.no}</p>
    <p><strong>Date:</strong> ${booking.depart}</p>
    <p><strong>Passenger:</strong> ${passenger.name}</p>
    <p><strong>Total:</strong> ₱${selectedFlight.price}</p>
  `;
}

// Handle book now button
document.getElementById("bookNow").addEventListener("click", () => {
  const toast = document.getElementById("toast");
  toast.innerHTML = `Booking Successful, ${passenger.name}!`;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
  showStep(0);
});

// Handle back buttons
document.querySelectorAll(".prev").forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentStep = Array.from(steps).findIndex((s) => s.classList.contains("active"));
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });
});