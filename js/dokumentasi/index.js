import {
  daftarContent,
  daftarLoginContent,
  loginContent,
} from "./daftar-login.js";
import { gettingStartedContent } from "./getting-started.js";
import { pengenalanContent } from "./pengenalan.js";

let lastVisibleId = null;
let searchQuery = "";
const mobileNav = document.getElementById("mobile-nav");
const hamburgerBtn = document.getElementById("hamburger-btn");
const closeBtn = document.querySelector(
  "#mobile-nav img[src='assets/close.svg']"
);

hamburgerBtn.addEventListener("click", () => {
  mobileNav.classList.remove("hidden");
  mobileNav.classList.add("block");
  document.body.style.overflow = "hidden";
});

const closeMobileNav = () => {
  mobileNav.classList.add("hidden");
  mobileNav.classList.remove("block");
  document.body.style.overflow = "auto";
};

closeBtn.addEventListener("click", closeMobileNav);

// Menambahkan ID unik ke setiap item secara rekursif
function assignUniqueIds(docs, parentId = "") {
  docs.forEach((item, index) => {
    item.id =
      parentId + (item.title || item.placeholder || "item") + "_" + index;
    if (item.children) {
      assignUniqueIds(item.children, item.id + "-");
    }
  });
}

function findItemById(docs, id) {
  for (const item of docs) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function findBreadcrumbPath(docs, id, path = []) {
  for (const item of docs) {
    const newPath = [...path, item];
    if (item.id === id) return newPath;
    if (item.children) {
      const childPath = findBreadcrumbPath(item.children, id, newPath);
      if (childPath) return childPath;
    }
  }
  return null;
}

function collectOpenedParents(items, query, parents = [], result = new Set()) {
  for (const item of items) {
    const currentPath = [...parents, item];

    const isMatch =
      item.title?.toLowerCase().includes(query) ||
      item.placeholder?.toLowerCase().includes(query);

    if (isMatch) {
      currentPath.slice(0, -1).forEach((p) => result.add(p.id));
    }

    if (item.children) {
      collectOpenedParents(item.children, query, currentPath, result);
    }
  }

  return result;
}

// Data
const docs = [
  {
    title: "Getting Started",
    content: gettingStartedContent,
    scrollContents: [
      { id: "getting-started", title: "Getting Started" },
      { id: "fitur-ai-getting", title: "Fitur AI Getting" },
    ],
  },
  {
    placeholder: "Start Here",
    children: [
      {
        title: "Pengenalan",
        content: pengenalanContent,
        scrollContents: [
          { id: "pengenalan", title: "Pengenalan" },
          { id: "fitur-ai-pengenalan", title: "Fitur AI Pengenalan" },
        ],
      },
      {
        title: "Daftar & Login",
        content: daftarLoginContent,
        scrollContents: [
          { id: "daftar-login", title: "Daftar & Login" },
          { id: "fitur-ai-daftar-login", title: "Fitur AI Daftar & Login" },
        ],
        children: [
          {
            title: "Highlight",
            content: daftarContent,
            scrollContents: [
              { id: "daftar", title: "Daftar" },
              { id: "fitur-ai-daftar", title: "Fitur AI Daftar" },
            ],
          },
          {
            title: "Login",
            content: loginContent,
            scrollContents: [
              { id: "login", title: "Login" },
              { id: "fitur-ai-login", title: "Fitur AI Login" },
            ],
          },
        ],
      },
      {
        title: "Test Highlight",
        content: daftarLoginContent,
        scrollContents: [
          { id: "daftar-login", title: "Daftar & Login" },
          { id: "fitur-ai-daftar-login", title: "Fitur AI Daftar & Login" },
        ],
        children: [
          {
            title: "Highlight",
            content: daftarContent,
            scrollContents: [
              { id: "daftar", title: "Daftar" },
              { id: "fitur-ai-daftar", title: "Fitur AI Daftar" },
            ],
          },
          {
            title: "Login",
            content: loginContent,
            scrollContents: [
              { id: "login", title: "Login" },
              { id: "fitur-ai-login", title: "Fitur AI Login" },
            ],
          },
        ],
      },
    ],
  },
];

assignUniqueIds(docs);

// Ambil dari URL saat load
const urlParams = new URLSearchParams(window.location.search);
let selectedId = urlParams.get("id") || docs[0].id;
let openedParents = new Set();

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="text-lime-400">$1</span>`);
}

function setSelected(id) {
  selectedId = id;

  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set("id", id);
  window.history.replaceState({}, "", newUrl);

  renderSidebar("sidebar");
  renderSidebar("mobile-sidebar");
  closeMobileNav();
}

function createChevron(isOpen, itemId, targetId) {
  const img = document.createElement("img");
  img.src = "../assets/chevron-right.svg";
  img.className = isOpen ? "rotate-90 cursor-pointer" : "cursor-pointer";

  img.addEventListener("click", (e) => {
    e.stopPropagation();
    if (openedParents.has(itemId)) {
      openedParents.delete(itemId);
    } else {
      openedParents.add(itemId);
    }
    renderSidebar(targetId);
  });

  return img;
}

function createSubItem(item, targetId) {
  const isSelected = selectedId === item.id;
  const button = document.createElement("button");
  button.className = "py-2 px-3 rounded-lg text-left w-full cursor-pointer";
  if (isSelected) {
    button.classList.add("font-medium", "bg-[#E0E0E0]/30");
  }
  button.innerHTML = highlightText(item.title, searchQuery);
  button.addEventListener("click", () => {
    setSelected(item.id);
    if (targetId === "mobile-sidebar") {
      mobileNav.classList.add("hidden");
    }
  });
  return button;
}

function createItem(item, targetId) {
  const container = document.createElement("div");
  container.className = "flex flex-col gap-1";

  const hasChildren = Array.isArray(item.children);
  const isOpen = openedParents.has(item.id);
  const isSelected = selectedId === item.id;

  const header = document.createElement("div");
  header.className =
    "py-2 px-3 rounded-lg flex items-center gap-2 justify-between cursor-pointer";
  if (isSelected) {
    header.classList.add("font-medium", "bg-[#E0E0E0]/30");
  }

  const label = document.createElement("div");
  label.innerHTML = highlightText(item.title, searchQuery);
  label.className = "cursor-pointer";
  header.appendChild(label);

  if (hasChildren) {
    header.appendChild(createChevron(isOpen, item.id, targetId));
  }

  header.addEventListener("click", () => {
    setSelected(item.id);
    if (hasChildren) {
      openedParents.has(item.id)
        ? openedParents.delete(item.id)
        : openedParents.add(item.id);
      renderSidebar(targetId);
    }
  });

  container.appendChild(header);

  if (hasChildren) {
    const childContainer = document.createElement("div");
    childContainer.className =
      "border-l border-[#E0E0E0] pl-3 ml-3 " +
      (isOpen ? "flex flex-col gap-1" : "flex-col gap-1 hidden");

    item.children.forEach((child) => {
      const childElement = child.children
        ? createItem(child, targetId)
        : createSubItem(child, targetId); // ✅ FIX: render child
      childContainer.appendChild(childElement);
    });

    container.appendChild(childContainer);
  }

  return container;
}

function filterDocs(items, query) {
  if (!query) return items;

  return items
    .map((item) => {
      let match =
        item.title?.toLowerCase().includes(query) ||
        item.placeholder?.toLowerCase().includes(query);

      const children = item.children ? filterDocs(item.children, query) : [];

      if (match || children.length > 0) {
        return {
          ...item,
          children: children.length > 0 ? children : item.children,
        };
      }

      return null;
    })
    .filter(Boolean);
}

function renderSidebar(targetId = "sidebar") {
  const container = document.getElementById(targetId);
  container.innerHTML = "";

  const filteredDocs = filterDocs(docs, searchQuery);
  if (searchQuery) {
    openedParents = collectOpenedParents(docs, searchQuery);
  }

  if (filteredDocs.length === 0) {
    const notFound = document.createElement("div");
    notFound.className = "py-2 px-3 text-[#E0E0E0]/60 italic";
    notFound.innerText = "Not Found";
    container.appendChild(notFound);
  } else {
    filteredDocs.forEach((item) => {
      if (item.title && !item.children) {
        const isSelected = selectedId === item.id;
        const button = document.createElement("button");
        button.className =
          "py-2 px-3 rounded-lg w-full text-left cursor-pointer" +
          (isSelected ? " font-medium bg-[#E0E0E0]/30" : "");
        button.innerHTML = highlightText(item.title, searchQuery);
        button.addEventListener("click", () => {
          setSelected(item.id);
          mobileNav.classList.add("hidden"); // close on mobile click
        });
        container.appendChild(button);
      } else if (item.placeholder && item.children) {
        const placeholder = document.createElement("div");
        placeholder.className = "py-2 px-3 rounded-lg font-bold";
        placeholder.innerText = item.placeholder;
        container.appendChild(placeholder);
        item.children.forEach((child) => {
          container.appendChild(createItem(child, targetId));
        });
      }
    });
  }

  // Only render desktop-specific content when rendering for desktop
  const selectedItem = findItemById(docs, selectedId);
  const contentDoc = document.getElementById("content-doc");
  contentDoc.innerHTML =
    selectedItem?.content || "<p class='text-white'>Tidak ada konten</p>";

  document.querySelectorAll("#content-doc [id]").forEach((section) => {
    observer.observe(section);
  });

  renderOnThisPage(selectedItem?.scrollContents || []);

  const breadcrumbContainer = document.getElementById("breadcrumb");
  breadcrumbContainer.innerHTML = "";

  const path = findBreadcrumbPath(docs, selectedId);
  if (path && path.length) {
    path.forEach((item, index) => {
      if (!item?.title) return;

      if (breadcrumbContainer.childNodes.length > 0) {
        const chevron = document.createElement("img");
        chevron.src = "../assets/chevron-right.svg";
        breadcrumbContainer.appendChild(chevron);
      }

      const isLast = index === path.length - 1;
      if (isLast) {
        const span = document.createElement("span");
        span.innerText = item.title;
        span.className = "text-[#BAFD02] font-medium";
        breadcrumbContainer.appendChild(span);
      } else {
        const button = document.createElement("button");
        button.innerHTML = highlightText(item.title, searchQuery);
        button.className = "text-[#BAFD02] font-medium cursor-pointer";
        button.addEventListener("click", () => setSelected(item.id));
        breadcrumbContainer.appendChild(button);
      }
    });
  }
}

function renderOnThisPage(scrollContents = []) {
  const container = document.getElementById("on-this-page");
  container.innerHTML = "";

  scrollContents.forEach((section) => {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.innerText = section.title;
    link.dataset.sectionId = section.id;
    link.className = "text-[#E0E0E0]";
    container.appendChild(link);
  });
}

const visibleSections = new Set();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        visibleSections.add(id);
      } else {
        visibleSections.delete(id);
      }
    });

    const visibleArray = Array.from(visibleSections);
    const currentId =
      visibleArray.length > 0
        ? visibleArray[visibleArray.length - 1]
        : lastVisibleId;

    if (currentId) lastVisibleId = currentId;

    const links = document.querySelectorAll("#on-this-page a");
    links.forEach((link) => {
      const sectionId = link.dataset.sectionId;
      if (sectionId === currentId) {
        link.classList.add("font-bold");
      } else {
        link.classList.remove("font-bold");
      }
    });
  },
  {
    root: null,
    rootMargin: "-80px 0px 0px 0px",
    threshold: 0.2,
  }
);

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar("sidebar");
  renderSidebar("mobile-sidebar");
});
document.getElementById("search").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderSidebar();
});
document.getElementById("search-mobile").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderSidebar("mobile-sidebar");
});
