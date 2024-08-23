let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const carouselSection = document.querySelector("#carousel");
const offcanvas = document.querySelector(".offcanvas");
const offcanvasTitle = document.querySelector(".offcanvas-title");
const btnClose = document.querySelector(".btn-close");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset;
  let carouselHeight = carouselSection.offsetHeight - navbar.offsetHeight;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-100px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;

  if (scrollTop > carouselHeight) {
    navbar.classList.remove("navbar-dark");
    navbar.classList.add("bg-light", "shadow-lg");

    offcanvas.classList.remove("bg-dark");
    offcanvasTitle.classList.remove("text-white");
    btnClose.classList.remove("btn-close-white");
  } else {
    navbar.classList.add("navbar-dark");
    navbar.classList.remove("bg-light", "shadow-lg");

    offcanvas.classList.add("bg-dark");
    offcanvasTitle.classList.add("text-white");
    btnClose.classList.add("btn-close-white");
  }

  sections.forEach((section) => {
    let sectionTop = section.offsetTop - navbar.offsetHeight;
    let sectionHeight = section.offsetHeight;
    let sectionId = section.getAttribute("id");

    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(sectionId)) {
          link.classList.add("active");
        }
      });
    }
  });
});

function handleSectionAnimation() {
  let scrollTop = window.pageYOffset;
  let windowHeight = window.innerHeight;

  sections.forEach((section) => {
    let sectionTop = section.offsetTop;
    let sectionBottom = sectionTop + section.offsetHeight;
    let reveals = section.querySelectorAll(".reveal");

    if (scrollTop + windowHeight > sectionTop && scrollTop < sectionBottom) {
      reveals.forEach((reveal, index) => {
        const delay = 700;

        setTimeout(() => {
          if (reveal.classList.contains("left")) {
            reveal.classList.add("active-left");
          } else if (reveal.classList.contains("right")) {
            reveal.classList.add("active-right");
          } else {
            reveal.classList.add("active-bottom");
          }
        }, index * delay);
      });
    }
  });
}

window.addEventListener("load", handleSectionAnimation);
window.addEventListener("scroll", handleSectionAnimation);
