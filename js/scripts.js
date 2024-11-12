async function initMap() {
  const { Map, Circle, InfoWindow } = await google.maps.importLibrary("maps");

  const customMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }
  ];

  const chicago = { lat: 41.8781, lng: -87.6298 };
  const map = new Map(document.getElementById("map"), {
    center: chicago,
    zoom: 12,
    styles: customMapStyle,
  });

  const places = [
    {
      position: { lat: 41.8841, lng: -87.6278 },
      title: "Chicago Cultural Center",
      description: "My favorite place in Downtown to enjoy the architecture and have a coffee there.",
      color: "#ff0000"
    },
    {
      position: { lat: 41.9214, lng: -87.6513 },
      title: "Lincoln Park",
      description: "I love the cafes and the neighbourhood of this place",
      color: "#00ecff"
    },
    {
      position: { lat: 41.8881, lng: -87.6487 },
      title: "Sawada Coffee",
      description: "The cafe has best ambience so far for me. You should try their Military Coffee for sure! ",
      color: "#8900ff"
    }
  ];

  places.forEach(place => {
    const circle = new Circle({
      strokeColor: place.color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: place.color,
      fillOpacity: 0.50,
      map,
      center: place.position,
      radius: 200,
    });

    const infoWindow = new InfoWindow({
      content: `
      <div class="info-window-content">
        <h3 class="info-window-title">${place.title}</h3>
        <p class="info-window-description">${place.description}</p>
      </div>
    `
    });

    circle.addListener("click", () => {
      infoWindow.setPosition(place.position); 
      infoWindow.open(map);
    });
  });

  const styleControlDiv = document.createElement("div");
  styleControlDiv.innerHTML = `<button class="map-style-button">Change map style</button>`;
  styleControlDiv.addEventListener("click", () => {
    map.setOptions({ styles: map.get("styles") ? null : customMapStyle });
  });
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControlDiv);
}

google.maps.importLibrary("maps").then(initMap);

// For Slider
document.addEventListener("DOMContentLoaded", () => {
  console.log("Slider script loaded.");

  const slides = document.querySelectorAll(".slide");
  console.log("Slides found:", slides.length);

  if (slides.length === 0) {
    console.error("No slides found. Check your HTML.");
    return;
  }

  let currIndex = 0;
  const interval = 3000;

  function show(idx) {
    console.log("Showing slide index:", idx);

    if (idx >= slides.length) currIndex = 0;
    if (idx < 0) currIndex = slides.length - 1;

    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === currIndex) slide.classList.add("active");
    });
  }

  function nextSlide() {
    currIndex++;
    show(currIndex);
  }

  function prevSlide() {
    currIndex--;
    show(currIndex);
  }

  show(currIndex);
  setInterval(nextSlide, interval);

  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
});

