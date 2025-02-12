document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("fireChart").getContext("2d");

    // Fire Statistics Bar Chart
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["California", "Oregon", "Colorado", "Texas", "Florida"],
            datasets: [{
                label: "Number of Fires (Last Year)",
                data: [150, 85, 120, 60, 90], // Fire data
                backgroundColor: [
                    "red",         // Extreme - California
                    "#FFA500",     // Orange - Oregon
                    "red",         // Extreme - Colorado
                    "#FFD700",     // Yellow-Orange - Texas
                    "#FFA500"      // Orange - Florida
                ],
                borderColor: [
                    "darkred",
                    "darkorange",
                    "darkred",
                    "#DAA520",     // Golden Rod for Yellow-Orange border
                    "darkorange"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Number of Fires",
                        color: "#ffffff"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Regions",
                        color: "#ffffff"
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            }
        }
    });

    // Fire Notification System
    document.getElementById("notifyButton").addEventListener("click", function () {
        if (Notification.permission === "granted") {
            showNotification();
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    showNotification();
                }
            });
        }
    });

    function showNotification() {
        const notification = new Notification(" Fire Alert", {
            body: "Wildfire detected near Los Angeles! Stay alert.",
            icon: "https://cdn-icons-png.flaticon.com/512/2910/2910796.png"
        });

        notification.onclick = function () {
            window.open("https://www.google.com/maps/search/forest+fire+India");
        };
    }

    // Simulated Fire Alert Updates
    function updateFireAlerts() {
        const alertList = document.getElementById("alertList");
        alertList.innerHTML = ""; // Clear previous alerts

        const alerts = [
            " Fire reported in California!",
            " Wildfire spreading in Oregon!",
            " Controlled burn in Texas!",
            " Fire contained in Florida!"
        ];

        alerts.forEach(alert => {
            const li = document.createElement("li");
            li.textContent = alert;
            alertList.appendChild(li);
        });
    }

    // Call the function every 10 seconds to simulate real-time updates
    setInterval(updateFireAlerts, 10000);

    // Fire Reporting Function
    function reportFire() {
        let location = document.getElementById("location").value;
        if (location) {
            alert(" Fire reported at: " + location);
            document.getElementById("location").value = ""; // Clear input field
        } else {
            alert("Please enter a location!");
        }
    }

    function predictFireRisk() {
        let temperature = parseFloat(document.getElementById('temperature').value);
        let humidity = parseFloat(document.getElementById('humidity').value);
        let oxygen = parseFloat(document.getElementById('oxygen').value);
        let windSpeed = parseFloat(document.getElementById('windSpeed').value);
        let fireRisk = document.getElementById('fireRiskLevel');

        if (isNaN(temperature) || isNaN(humidity) || isNaN(oxygen) || isNaN(windSpeed)) {
            fireRisk.textContent = "Please enter all values!";
            fireRisk.className = "result";
            return;
        }

        let riskLevel = "";

        if (temperature > 40 || windSpeed > 30 || (oxygen > 21 && humidity < 20)) {
            riskLevel = "🔥 EXTREME";
            fireRisk.className = "result extreme";
        } else if ((temperature > 35 && windSpeed > 20) || (oxygen > 20 && humidity < 30)) {
            riskLevel = "🔴 HIGH";
            fireRisk.className = "result high";
        } else if ((temperature > 30 && windSpeed > 15) || (oxygen > 19 && humidity < 40)) {
            riskLevel = "🟠 MEDIUM";
            fireRisk.className = "result medium";
        } else {
            riskLevel = "🟢 LOW";
            fireRisk.className = "result low";
        }

        fireRisk.textContent = "Fire Risk Level: " + riskLevel;
    }

    document.getElementById('predictButton').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent form submission if within a form
        predictFireRisk();
    });

});