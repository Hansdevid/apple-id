document.addEventListener("DOMContentLoaded", () => {
  //Deklarasi index
  let currentIndex = 0;
  const items = document.querySelectorAll(".carousel-item");
  const controls = document.querySelectorAll(".carousel-control .items");
  function setClasses(newIndex) {
    items.forEach((item, i) => {
      item.classList.remove("active", "previous", "next", "move-left", "move-right", "enter-left", "enter-right");
      if (i === newIndex) {
        item.classList.add("active");
      } else if (i === (newIndex - 1 + items.length) % items.length) {
        item.classList.add("previous");
      } else if (i === (newIndex + 1) % items.length) {
        item.classList.add("next");
      }
    });
    controls.forEach((control, i) => {
      control.classList.toggle("active", i === newIndex);
    });

    currentIndex = newIndex;
  }

  function showSlide(newIndex) {
    if (newIndex === currentIndex) return;
    const currentSlide = items[currentIndex];
    const newSlide = items[newIndex];

    //transition direction
    const isNext = newIndex > currentIndex || (currentIndex === items.length - 1 && newIndex === 0);

    //remove existing transition
    currentSlide.classList.remove("move-left", "move-right", "enter-right", "enter-left");
    newSlide.classList.remove("move-left", "move-right", "enter-right", "enter-left");

    //apply Transition
    if (isNext) {
      currentSlide.classList.add("move-left");
      currentSlide.classList.add("move-right");
    } else {
      currentSlide.classList.add("enter-left");
      currentSlide.classList.add("enter-right");
    }
    setTimeout(() => {
      setClasses(newIndex);
    }, 500);
  }

  function goToNextSlide() {
    const newIndex = (currentIndex + 1) % items.length;
    showSlide(newIndex);
  }

  function goToPreviousSlide() {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(newIndex);
  }

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      const index = parseInt(control.getAttribute("data-index"));
      if (!isNaN(index)) {
        showSlide(index);
      }
    });
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("previous")) {
        goToPreviousSlide();
      } else if (item.classList.contains("next")) {
        goToNextSlide();
      }
    });
  });

  console.log("items-carousel", items);
  setClasses(0);
});

// Javascript Toggle menu
document.querySelector(".navbar-toggle").addEventListener("click", function () {
  const navbarMobile = document.getElementById("navbar-mobile");
  const closeToggle = document.getElementById("close-toggle");
  const isExpanded = this.getAttribute("aria-expanded") === "true";

  closeToggle.setAttribute("aria-expanded", !isExpanded);
  navbarMobile.classList.toggle("active");
  document.body.classList.toggle("overflow-hidden");
});

// Javascript toggle close
document.querySelector(".close-toggle").addEventListener("click", function () {
  const navbarMobile = document.getElementById("navbar-mobile");
  const closeToggle = document.getElementById("close-toggle");
  const isExpanded = this.getAttribute("aria-expanded") === "true";
  closeToggle.setAttribute("aria-expanded", !isExpanded);
  navbarMobile.classList.toggle("active");
  document.body.classList.toggle("overflow-hidden");
});

//Accordion
let accordion = document.getElementsByClassName("accordion");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
