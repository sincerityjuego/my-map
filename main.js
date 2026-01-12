// Create the map
const map = L.map('map').setView([12.8797, 121.7740], 6);

// Load map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Search bar logic
document.getElementById("searchBox").addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = e.target.value;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await res.json();

    if (!data.length) {
      alert("Place not found");
      return;
    }

    const place = data[0];
    map.setView([place.lat, place.lon], 14);

    showInfo(place.display_name, place.lat, place.lon);
  }
});

// Show info panel data
function showInfo(name, lat, lon) {
  document.getElementById("placeName").innerText = name;
  document.getElementById("placeDesc").innerText =
    "This area faces social and environmental challenges.";

  renderList("problems", [
    "Flooding",
    "Traffic congestion",
    "Waste management issues"
  ]);

  renderList("solutions", [
    "Volunteer in cleanups",
    "Support local NGOs",
    "Participate in community programs"
  ]);

  L.marker([lat, lon]).addTo(map)
    .bindPopup(name)
    .openPopup();
}

// Helper function
function renderList(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}
