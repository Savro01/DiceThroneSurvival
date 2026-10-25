export function initialiserZones() {
    const conteneurZones = document.getElementById("zones");

    // Cercle temporaire pour tester le fonctionnement
    const cercleTest = document.createElement("div");

    cercleTest.classList.add("zone");

    cercleTest.style.left = "64.4%";
    cercleTest.style.top = "45.4%";

    conteneurZones.appendChild(cercleTest);
}
