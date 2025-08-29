const faqs = [
  {
    question: "Apakah bisa bayar pakai kartu kredit?",
    answer:
      "Ya, pembayaran bisa dilakukan menggunakan kartu kredit. Jika tidak ingin menggunakan kartu kredit, Anda juga bisa membayar melalui QRIS atau Virtual Account dari BCA, Mandiri, BNI, dan bank lainnya.",
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
