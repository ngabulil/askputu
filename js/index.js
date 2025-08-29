const swiper = new Swiper(".swiper", {
  spaceBetween: 0,
  speed: 5000,
  direction: "horizontal",
  autoplay: { delay: 0, disableOnInteraction: false },
  loop: true,
  freeMode: true,
  breakpoints: {
    300: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
  },
});
const clientSwiper = new Swiper(".client-swiper", {
  spaceBetween: 24,
  loop: true,
  slidesPerView: 3,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    767: {
      slidesPerView: 2,
    },
    300: {
      slidesPerView: 1,
    },
  },
});
const faqs = [
  {
    question: "What is Thinkstack's AI chatbot generator?",
    answer:
      "Thinkstack's AI chatbot generator is a platform that allows you to easily create custom AI-powered chatbots without coding...",
  },
  {
    question: "Is there a free plan?",
    answer: "Yes, Thinkstack offers a free plan with basic features.",
  },
  {
    question: "What AI models can I use with Thinkstack?",
    answer: "You can use large language models like GPT-3.5 and GPT-4.",
  },
  {
    question: "Can I integrate Thinkstack with my existing tools?",
    answer: "Yes, Thinkstack supports integration with many third-party tools.",
  },
  {
    question: "How do I create a chatbot with Thinkstack?",
    answer:
      "Simply sign up, select a model, and customize your chatbot using the builder.",
  },
];

const solutions = [
  {
    icon: "/assets/ecommerce.svg",
    title: "E-Commerce",
    img: "https://placehold.co/300x400?text=Chatbox+Placeholder",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    features: [
      "Chatbox 11",
      "Chatbox 2",
      "Chatbox 3",
      "Chatbox 4",
      "Chatbox 5",
    ],
  },
  {
    icon: "/assets/ecommerce.svg",
    title: "Healthcare",
    img: "https://placehold.co/300x400?text=Chatbox+Placeholder",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    features: [
      "Chatbox 12",
      "Chatbox 2",
      "Chatbox 3",
      "Chatbox 4",
      "Chatbox 5",
    ],
  },
  {
    icon: "/assets/ecommerce.svg",
    title: "Banking",
    img: "https://placehold.co/300x400?text=Chatbox+Placeholder",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    features: ["Chatbox 1", "Chatbox 2", "Chatbox 3", "Chatbox 4", "Chatbox 5"],
  },
  {
    icon: "/assets/ecommerce.svg",
    title: "Hospitaly",
    img: "https://placehold.co/300x400?text=Chatbox+Placeholder",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    features: ["Chatbox 1", "Chatbox 2", "Chatbox 3", "Chatbox 4", "Chatbox 5"],
  },
  {
    icon: "/assets/ecommerce.svg",
    title: "Retail",
    img: "https://placehold.co/300x400?text=Chatbox+Placeholder",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    features: ["Chatbox 1", "Chatbox 2", "Chatbox 3", "Chatbox 4", "Chatbox 5"],
  },
  {
    icon: "/assets/ecommerce.svg",
    title: "SaaS",
    img: "https://placehold.co/300x400?text=Chatbox+Placeholder",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    features: ["Chatbox 1", "Chatbox 2", "Chatbox 3", "Chatbox 4", "Chatbox 5"],
  },
];
let selectedIndex = 0;

function renderSolution(index) {
  const selected = solutions[index];
  document.getElementById("icon-img").src = selected.icon;
  document.getElementById("title-text").textContent = selected.title;
  document.getElementById("description-text").textContent =
    selected.description;
  document.getElementById("main-img").src = selected.img;

  // Update features
  const featuresList = document.getElementById("features-list");
  featuresList.innerHTML = "";
  selected.features.forEach((f) => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-2 lg-screen:text-sm";
    li.innerHTML = `<span class="text-lime-400">✔</span> ${f}`;
    featuresList.appendChild(li);
  });

  // Update category buttons
  const buttonContainer = document.getElementById("category-buttons");
  buttonContainer.innerHTML = "";
  solutions.forEach((s, i) => {
    const button = document.createElement("button");
    button.className =
      "px-4 py-3 rounded-md font-semibold lg-screen:text-sm " +
      (i === index
        ? "bg-lime-400 text-black"
        : "border border-white text-white");
    button.textContent = s.title;
    button.onclick = () => {
      selectedIndex = i;
      renderSolution(i);
    };
    buttonContainer.appendChild(button);
  });

  // Update Explore Button
  document.getElementById("explore-button").innerText =
    "Explore Next Solution : " +
    solutions[(index + 1) % solutions.length].title;
}

window.addEventListener("DOMContentLoaded", () => {
  renderSolution(selectedIndex);
  document.getElementById("explore-button").addEventListener("click", () => {
    selectedIndex = (selectedIndex + 1) % solutions.length;
    renderSolution(selectedIndex);
  });
});

const container = document.getElementById("faq-container");

faqs.forEach((faq, index) => {
  const item = document.createElement("div");
  item.className = "faq-item";

  const question = document.createElement("div");
  question.className = "faq-question";
  question.innerHTML = `
        <span>${faq.question}</span>
        <img src="./assets/chevron-right.svg" class="arrow"></img>
      `;

  const answer = document.createElement("div");
  answer.className = "faq-answer hidden";
  answer.textContent = faq.answer;

  item.addEventListener("click", () => {
    const isOpen = answer.classList.toggle("open");
    const arrow = question.querySelector(".arrow");
    item.classList.toggle("open", isOpen);
    arrow.classList.toggle("rotate", isOpen);
    if (!isOpen) {
      setTimeout(() => {
        answer.classList.toggle("hidden", !isOpen);
      }, 300);
    } else {
      answer.classList.toggle("hidden", !isOpen);
    }
  });

  item.appendChild(question);
  item.appendChild(answer);
  container.appendChild(item);
});
