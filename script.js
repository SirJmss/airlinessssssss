/* Store booking data */
let trip = {};
let flight = null;
let traveler = {};

/* DOM elements */
const steps = document.querySelectorAll(".step");
const progressSteps = document.querySelectorAll(".progress-step");

/* Show a specific step and update progress bar */
function setStep(stepIndex) {
  steps.forEach((step, i) => step.classList.toggle("active", i === stepIndex));
  progressSteps.forEach((prog, i) => prog.classList.toggle("active", i <= stepIndex));
}

/* Handle booking form submission */
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  trip = {
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    date: document.getElementById("departDate").value
  };
  displayFlights();
  setStep(1);
});

/* Display available flights */
function displayFlights() {
  const flightList = document.getElementById("flightsList");
  flightList.innerHTML = "";
  const flights = [
    { id: "FL101", time: "8:00 AM", price: 2000 },
    { id: "FL202", time: "12:00 PM", price: 2500 }
  ];
  flights.forEach((f) => {
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div>
        <p>${trip.from} to ${trip.to}</p>
        <p>Flight: ${f.id}, ${f.time}</p>
      </div>
      <div>
        <p>₱${f.price}</p>
        <button class="btn-primary">Select</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      flight = f;
      setStep(2);
    });
    flightList.appendChild(card);
  });
}

/* Handle passenger form submission */
document.getElementById("passengerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  traveler = { name: document.getElementById("pName").value };
  displaySummary();
  setStep(3);
});

/* Display booking summary */
function displaySummary() {
  document.getElementById("summaryCard").innerHTML = `
    <p><strong>From:</strong> ${trip.from}</p>
    <p><strong>To:</strong> ${trip.to}</p>
    <p><strong>Flight:</strong> ${flight.id}</p>
    <p><strong>Date:</strong> ${trip.date}</p>
    <p><strong>Passenger:</strong> ${traveler.name}</p>
    <p><strong>Total:</strong> ₱${flight.price}</p>
  `;
}

/* Handle book now button */
document.getElementById("bookNow").addEventListener("click", () => {
  const toast = document.getElementById("toast");
  toast.textContent = `Booking Successful, ${traveler.name}!`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
  setStep(0);
});

/* Handle back buttons */
document.querySelectorAll(".prev").forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentStep = Array.from(steps).findIndex((s) => s.classList.contains("active"));
    if (currentStep > 0) setStep(currentStep - 1);
  });
});