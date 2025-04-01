document.addEventListener("DOMContentLoaded", function () {
    const clock = document.getElementById("clock");
    const dateDisplay = document.getElementById("date");
    const textColorPicker = document.getElementById("textColorPicker");
    const bgSpeedSlider = document.getElementById("bgSpeedSlider");
    const bgSpeedValue = document.getElementById("bgSpeedValue");
    const fontSelector = document.getElementById("fontSelector");
    const fontSizeSlider = document.getElementById("fontSizeSlider");
    const fontSizeValue = document.getElementById("fontSizeValue");
    const controls = document.getElementById("controls");
    const toggleControlsButton = document.getElementById("toggleControls");
    const toggleFormatButton = document.getElementById("toggleFormat");
    const changeBgButton = document.getElementById("changeBg");
    const toggleBgAutoCheckbox = document.getElementById("toggleBgAuto");
    let is24HourFormat = true;
    let bgAutoChange = true;

    const bg1 = document.querySelector(".bg1");

    const weekdays = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const year = now.getFullYear();
        const weekday = weekdays[now.getDay()];

        let ampm = "";
        if (!is24HourFormat) {
            ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
        }
        hours = hours.toString().padStart(2, "0");

        clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        dateDisplay.textContent = `${weekday}, ${day}.${month}.${year}`;
    }

    let backgroundIndex = 0;
    const backgrounds = [
        "backgrounds/background1.jpg",
        "backgrounds/background2.jpg",
        "backgrounds/background3.jpg",
        "backgrounds/background4.jpg",
        "backgrounds/background5.jpg"
    ];

    const images = backgrounds.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    function changeBackground() {
        if (!bgAutoChange) return;
        bg1.style.backgroundImage = `url('${images[backgroundIndex].src}')`;
        backgroundIndex = (backgroundIndex + 1) % images.length;
    }

    updateClock();
    setInterval(updateClock, 1000);

    let bgChangeSpeed = Math.max(20, bgSpeedSlider.value);
    let bgChangeInterval = setInterval(changeBackground, bgChangeSpeed * 1000);

    changeBackground();

    textColorPicker.addEventListener("input", () => {
        clock.style.color = textColorPicker.value;
        dateDisplay.style.color = textColorPicker.value;
    });

    fontSelector.addEventListener("change", () => {
        clock.style.fontFamily = fontSelector.value;
        dateDisplay.style.fontFamily = fontSelector.value;
    });

    fontSizeSlider.addEventListener("input", () => {
        let newSize = fontSizeSlider.value + "vw";
        fontSizeValue.textContent = fontSizeSlider.value;
        clock.style.fontSize = newSize;
        dateDisplay.style.fontSize = (fontSizeSlider.value / 3) + "vw";
    });

    bgSpeedSlider.addEventListener("input", () => {
        let newSpeed = Math.max(20, bgSpeedSlider.value);
        bgSpeedValue.textContent = newSpeed;
        clearInterval(bgChangeInterval);
        bgChangeInterval = setInterval(changeBackground, newSpeed * 1000);
    });

    toggleControlsButton.addEventListener("click", () => {
        controls.classList.toggle("hidden");
    });

    toggleFormatButton.addEventListener("click", () => {
        is24HourFormat = !is24HourFormat;
        updateClock();
    });

    changeBgButton.addEventListener("click", () => {
        bg1.style.backgroundImage = `url('${images[backgroundIndex].src}')`;
        backgroundIndex = (backgroundIndex + 1) % images.length;
    });

    toggleBgAutoCheckbox.addEventListener("change", () => {
        bgAutoChange = toggleBgAutoCheckbox.checked;
        if (bgAutoChange) {
            bgChangeInterval = setInterval(changeBackground, bgSpeedSlider.value * 1000);
        } else {
            clearInterval(bgChangeInterval);
        }
    });
});