const apiUrl = "https://dummyjson.com/products/",
  $cards = document.querySelector(".cards"),
  $template = document.getElementById("template").content,
  $fragment = document.createDocumentFragment();

const loadProds = async (url) => {
  try {
    $cards.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="loading..."/>`;

    const prods = await fetch(url)
      .then((res) => res.json())
      .then((res) => res.products);

    if (!prods) throw { status: 500, statusText: "Error API fetch" };

    prods.forEach((prod) => {
      $template.querySelector("img").src = prod.images
        ? prod.images[0]
        : "./assets/noimage.png";
      $template.querySelector("img").alt = prod.title;
      $template.querySelector("figcaption").textContent = prod.title;
      $template.querySelector("p").textContent = prod.description;
      $template.querySelector("h3").textContent = prod.price;

      let $clone = document.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $cards.innerHTML = "";
    $cards.appendChild($fragment);
  } catch (error) {
    let message = error.statusText;
    $cards.innerHTML = `<p>Error #${error.status} - ${error.statusText}`;
  }
};

const hamburguerMenu = (panelBtn, panel, menuLink) => {
  document.addEventListener("click", (e) => {
    if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
      document.querySelector(panel).classList.toggle("is-active");
      document.querySelector(panelBtn).classList.toggle("is-active");
    }

    if (e.target.matches(menuLink) || e.target.matches(`${menuLink} *`)) {
      console.log("apreta");
      document.querySelector(panel).classList.remove("is-active");
      document.querySelector(panelBtn).classList.remove("is-active");
    }
  });
};

/*  - - Slides - - */
let slideIndex = 0;

const showSlides = () => {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
};

// Login Modal
const $loginModal = document.querySelector(".dialog-login-modal");

document
  .querySelector("[data-id='login-modal-open']")
  .addEventListener("click", () => $loginModal.showModal());
document
  .querySelector("[data-id='login-modal-close']")
  .addEventListener("click", () => $loginModal.close());

document.addEventListener("DOMContentLoaded", (e) => {
  loadProds(apiUrl);

  hamburguerMenu(".panel-btn", ".panel", ".menu-a");

  showSlides();
});
