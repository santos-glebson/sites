let headerNav = document.getElementById("header-nav");
let menu = document.getElementById("menu-ul");
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
}

//---------- Slider----------//

function sliderControl(add, rem1, rem2) {
  radioSlide[add].classList.add("radio-checked");
  radioSlide[rem1].classList.remove("radio-checked");
  radioSlide[rem2].classList.remove("radio-checked");
}

function clickRadio(radio) {
  slider.removeAttribute("onscroll");
  clearTimeout(time);
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
  time = setTimeout(() => {
    slider.setAttribute("onscroll", "scrollSlide()");
  }, 1000);
}

function scrollSlide() {
  if (slider.scrollLeft >= 0 && slider.scrollLeft <= 175) {
    sliderControl(0, 1, 2);
  } else if (slider.scrollLeft > 175 && slider.scrollLeft <= 525) {
    sliderControl(1, 0, 2);
  } else if (slider.scrollLeft > 525) {
    sliderControl(2, 0, 1);
  }
}
