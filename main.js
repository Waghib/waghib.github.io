const audio = document.getElementById("audioPlayer");
const loader = document.getElementById("preloader");
const backToTopButton = document.getElementById("backtotopbutton");
const mobileToggleMenu = document.getElementById("mobiletogglemenu");
const burgerBars = [
  document.getElementById("burger-bar1"),
  document.getElementById("burger-bar2"),
  document.getElementById("burger-bar3"),
];
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
const mobileNavItems = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

function playpause() {
  const soundSwitch = document.getElementById("switchforsound");

  if (!audio || !soundSwitch) return;

  if (soundSwitch.checked) {
    audio.play().catch(() => {
      soundSwitch.checked = false;
    });
  } else {
    audio.pause();
  }
}

function visualmode() {
  document.body.classList.toggle("light-mode");

  document.querySelectorAll(".needtobeinvert").forEach((element) => {
    element.classList.toggle("invertapplied");
  });

  const isLightMode = document.body.classList.contains("light-mode");
  const profileImage = document.querySelector(".dp img");
  const rotatingText = document.querySelector(".txt-rotate");

  if (profileImage) {
    profileImage.src = "src/webp/about-me-img1.webp";
  }

  if (rotatingText) {
    rotatingText.style.color = isLightMode ? "#7B5CD1" : "#333";
  }
}

function hamburgerMenu() {
  document.body.classList.toggle("stopscrolling");
  mobileToggleMenu?.classList.toggle("show-toggle-menu");
  burgerBars[0]?.classList.toggle("hamburger-animation1");
  burgerBars[1]?.classList.toggle("hamburger-animation2");
  burgerBars[2]?.classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
  document.body.classList.remove("stopscrolling");
  mobileToggleMenu?.classList.remove("show-toggle-menu");
  burgerBars[0]?.classList.remove("hamburger-animation1");
  burgerBars[1]?.classList.remove("hamburger-animation2");
  burgerBars[2]?.classList.remove("hamburger-animation3");
}

function scrolltoTopfunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openURL() {
  window.open("src/pdf/waghib_cv.pdf", "_blank", "noopener,noreferrer");
}

function updateActiveNav() {
  let currentSection = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  mobileNavItems.forEach((item) => {
    item.classList.toggle(
      "activeThismobiletab",
      item.classList.contains(currentSection)
    );
  });

  navItems.forEach((item) => {
    item.classList.toggle("activeThistab", item.classList.contains(currentSection));
  });
}

function updateBackToTopButton() {
  if (!backToTopButton) return;

  backToTopButton.style.display = window.scrollY > 400 ? "block" : "none";
}

function handleScroll() {
  updateActiveNav();
  updateBackToTopButton();
}

function initPreloader() {
  if (loader) {
    loader.style.display = "none";
  }

  document.querySelector(".hey")?.classList.add("popup");
}

function initFooterPupils() {
  const pupils = Array.from(document.getElementsByClassName("footer-pupil"));
  if (!pupils.length) return;

  const pupilStartPoint = -10;
  const pupilRangeX = 20;
  const pupilRangeY = 15;
  let mouseXEndPoint = window.innerWidth;
  let mouseYEndPoint = window.innerHeight;

  window.addEventListener("mousemove", (event) => {
    const fracXValue = event.clientX / mouseXEndPoint;
    const fracYValue = event.clientY / mouseYEndPoint;
    const translateX = pupilStartPoint + fracXValue * pupilRangeX;
    const translateY = pupilStartPoint + fracYValue * pupilRangeY;

    pupils.forEach((pupil) => {
      pupil.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  });

  window.addEventListener("resize", () => {
    mouseXEndPoint = window.innerWidth;
    mouseYEndPoint = window.innerHeight;
  });
}

function initTextRotation() {
  const elements = document.getElementsByClassName("txt-rotate");

  Array.from(elements).forEach((element) => {
    const toRotate = element.getAttribute("data-rotate");
    const period = element.getAttribute("data-period");

    if (toRotate) {
      new TxtRotate(element, JSON.parse(toRotate), period);
    }
  });
}

function initCursor() {
  const cursorInner = document.getElementById("cursor-inner");
  const cursorOuter = document.getElementById("cursor-outer");
  const interactiveElements = document.querySelectorAll("a,label,button,[data-project-url]");

  if (!cursorInner || !cursorOuter) return;

  document.addEventListener("mousemove", (event) => {
    const posX = `${event.clientX}px`;
    const posY = `${event.clientY}px`;

    cursorInner.style.left = posX;
    cursorInner.style.top = posY;
    cursorOuter.style.left = posX;
    cursorOuter.style.top = posY;

    cursorOuter.animate(
      {
        left: posX,
        top: posY,
      },
      { duration: 500, fill: "forwards" }
    );
  });

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorInner.classList.add("hover");
      cursorOuter.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      cursorInner.classList.remove("hover");
      cursorOuter.classList.remove("hover");
    });
  });
}

function initProjectCards() {
  document.querySelectorAll("[data-project-url]").forEach((card) => {
    const openProject = () => {
      window.open(card.dataset.projectUrl, "_blank", "noopener,noreferrer");
    };

    card.addEventListener("mouseenter", () => {
      card.classList.add("project-card-active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("project-card-active");
    });

    card.addEventListener("focusin", () => {
      card.classList.add("project-card-active");
    });

    card.addEventListener("focusout", () => {
      card.classList.remove("project-card-active");
    });

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      openProject();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openProject();
    });
  });
}

function initTechStackMarquee() {
  const stack = document.querySelector(".tech-stack-wrapper");
  if (!stack || stack.dataset.marqueeReady === "true") return;

  Array.from(stack.children).forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.removeAttribute("data-aos");
    stack.appendChild(clone);
  });

  stack.dataset.marqueeReady = "true";
}

function initProjectScrollStack() {
  const stack = document.querySelector(".project-boxes-div");
  const cards = Array.from(stack?.querySelectorAll(":scope > .project-box-wrapper") || []);

  if (!stack || cards.length < 2) return;

  stack.classList.add("project-scroll-stack");

  cards.forEach((card, index) => {
    card.removeAttribute("data-aos");
    card.classList.add("project-stack-card");
    card.style.setProperty("--project-stack-index", index + 1);
  });
}

const TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.isDeleting = false;
  this.tick();
};

TxtRotate.prototype.tick = function () {
  const currentIndex = this.loopNum % this.toRotate.length;
  const fullText = this.toRotate[currentIndex];

  if (this.isDeleting) {
    this.txt = fullText.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullText.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullText) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(() => {
    this.tick();
  }, delta);
};

window.addEventListener("load", () => {
  initPreloader();
  initTextRotation();
});

window.addEventListener("scroll", handleScroll, { passive: true });

document.addEventListener(
  "contextmenu",
  (event) => {
    if (event.target.nodeName === "IMG") {
      event.preventDefault();
    }
  },
  false
);

initFooterPupils();
initCursor();
initProjectCards();
initProjectScrollStack();
initTechStackMarquee();
handleScroll();

console.log(
  "%c Designed and Developed by Waghib Ahmad ",
  "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;"
);
