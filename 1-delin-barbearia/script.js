let headerNav = document.getElementById("header-nav");
let menu = document.getElementById("menu-ul");
let menuItems = document.querySelectorAll(".menu-ul a");
let slider = document.getElementsByClassName("slider")[0];
let slides = document.getElementsByClassName("slides")[0];
let radioSlide = document.getElementsByClassName("radio-slide");
let time = null;

//---------- Menu hamburguer----------//

function openNav() {
  headerNav.style.top = 0;
}

function closeNav() {
  headerNav.style.top = "-100vh";
}

for (let m of menu.children) {
  m.addEventListener("click", closeNav);
  m.addEventListener("click", scrollToId);
}

function scrollToId(event) {
  event.preventDefault();
  const element = event.target;
  const id = element.getAttribute("href");
  const section = document.querySelector(id).offsetTop;
  window.scroll(0, section - 120);
}

//---------- Slider Mobile----------//

function sliderControl(add, rem1, rem2) {
  radioSlide[add].classList.add("radio-checked");
  radioSlide[rem1].classList.remove("radio-checked");
  radioSlide[rem2].classList.remove("radio-checked");
}

function clickRadio(radio) {
  slider.removeAttribute("onscroll");
  clearTimeout(time);
  if (window.innerWidth <= 768) {
    if (radio.getAttribute("id") == "r1") {
      slider.scrollLeft = 0;
      sliderControl(0, 1, 2);
    } else if (radio.getAttribute("id") == "r2") {
      slider.scrollLeft = 350;
      sliderControl(1, 0, 2);
    } else if (radio.getAttribute("id") == "r3") {
      slider.scrollLeft = 700;
      sliderControl(2, 0, 1);
    }
  } else {
    if (radio.getAttribute("id") == "r1") {
      slider.scrollLeft = 0;
      sliderControl(0, 1, 2);
    } else if (radio.getAttribute("id") == "r2") {
      slider.scrollLeft = 700;
      sliderControl(1, 0, 2);
    } else if (radio.getAttribute("id") == "r3") {
      slider.scrollLeft = 1400;
      sliderControl(2, 0, 1);
    }
  }

  time = setTimeout(() => {
    slider.setAttribute("onscroll", "scrollSlide()");
  }, 1000);
}

function scrollSlide() {
  if (window.innerWidth <= 768) {
    if (slider.scrollLeft >= 0 && slider.scrollLeft <= 300) {
      sliderControl(0, 1, 2);
    } else if (slider.scrollLeft > 300 && slider.scrollLeft <= 525) {
      sliderControl(1, 0, 2);
    } else if (slider.scrollLeft > 525) {
      sliderControl(2, 0, 1);
    }
  } else {
    if (slider.scrollLeft <= 342.5) {
      sliderControl(0, 1, 2);
    } else if (slider.scrollLeft <= 685 || slider.scrollLeft <= 1027.5) {
      sliderControl(1, 0, 2);
    } else if (slider.scrollLeft <= 1370) {
      sliderControl(2, 0, 1);
    }
  }
}

//---------- Slider Tablet or Higher Resolutions----------//

// Script para desabilitar scroll do windows //

function preventDefault(e) {
  e.preventDefault();
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    }),
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// --------------------------------------------

slider.addEventListener("mouseenter", () => {
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
});

slider.addEventListener("mouseleave", () => {
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
});

function scrollSlides(event) {
  if (event.deltaY > 0) {
    slider.scrollLeft += 685;
  } else {
    slider.scrollLeft -= 685;
  }
}
