let selectedCategory = "0";

const portfolioSection = document.getElementById("portfolio");
// getting works using the api
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works", {
    method: "GET",
  });
  return response.json();
}

// injecting works into  the html
const gallery = document.querySelector(".gallery");
function displayWorks(works) {
  gallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    // insert image
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);

    // insert title
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);

    if (selectedCategory === "0") {
      gallery.appendChild(figure);
    } else {
      if (selectedCategory === `${work.categoryId}`) {
        gallery.appendChild(figure);
      }
    }
  });
}
const works = await getWorks();

displayWorks(works);

// where getting the list of categories
const categories = new Set();

works.forEach((work) => {
  categories.add(JSON.stringify(work.category));
});

// injecting works into  the html
const categoriesDiv = document.querySelector(".categories");

categories.forEach((categoryString) => {
  const category = JSON.parse(categoryString);
  const button = document.createElement("button");

  button.id = "category";
  button.value = category.id;
  button.textContent = category.name;

  categoriesDiv.appendChild(button);
});

document.querySelectorAll("#category").forEach((button) => {
  button.addEventListener("click", function (event) {
    let element = event.target;

    let attributeValue = element.getAttribute("value");
    selectedCategory = attributeValue;
    displayWorks(works);
    setSelectedClass();
  });
});

function setSelectedClass() {
  document.querySelectorAll("#category").forEach((button) => {
    let attributeValue = button.getAttribute("value");

    if (selectedCategory === attributeValue) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
}

// check if logged in
const loginElement = document.querySelector(
  'li a[href="login.html"]'
).parentElement;
const token = localStorage.getItem("token");

// Remove the "login" <li> element
if (loginElement && token.length > 0) {
  loginElement.remove();

  const logoutElement = document.createElement("li");
  logoutElement.innerHTML = '<p id="logout">Logout</p>';

  const parentElement = document.querySelector("ul");
  if (parentElement) {
    const secondElement = parentElement.children[2];
    if (secondElement) {
      parentElement.insertBefore(logoutElement, secondElement);
    } else {
      parentElement.appendChild(logoutElement);
    }
  }
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

//// modal management
let openedModal = null;

const openModal = (e) => {
  e.preventDefault();

  const target = document.querySelector(e.target.getAttribute("href"));

  target.style.display = null;

  openedModal = target;
  // openedModal.addEventListener("click", closeModal);
  openedModal
    .querySelector(".modal-close-button")
    .addEventListener("click", closeModal);
  console.log(e.target.getAttribute("id"));

  if (e.target.getAttribute("href") === "#edit-modal") {
    console.log("lalala");
    displayModalWorks();
  }
};

const closeModal = (e) => {
  if (openedModal === null) return;
  e.preventDefault();

  //const target = document.querySelector(e.target.getAttribute("href"));

  openedModal.style.display = "none";
  // openedModal.removeEventListener("click", closeModal);
  openedModal
    .querySelector(".modal-close-button")
    .removeEventListener("click", closeModal);
  openedModal = null;

  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = null;
};

document.querySelectorAll(".js-modal").forEach((element) => {
  console.log("target");

  element.addEventListener("click", openModal);
});

function displayModalWorks() {
  console.log("lalala");
  const modalGallery = document.querySelector(".modal-gallery");
  works.forEach((work) => {
    const figure = document.createElement("figure");
    // insert image
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);

    if (selectedCategory === "0") {
      modalGallery.appendChild(figure);
    } else {
      if (selectedCategory === `${work.categoryId}`) {
        modalGallery.appendChild(figure);
      }
    }
  });
  /* 
function displayWorks(works) {
  gallery.innerHTML = "";
  
} */
}
