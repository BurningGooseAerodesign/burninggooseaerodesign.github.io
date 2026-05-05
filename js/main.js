// ============= DATA =============
const COURSES = [
  "Eng. Elétrica","Eng. Mecânica","Eng. de Produção","Eng. Civil",
  "Ciência da Computação","Eng. Produção","Física"
];
const AREAS = [
  "Aerodinâmica","Estruturas","Desempenho","Sistemas Embarcados","Estabilidade e Controle","Elétrica",
  "Cargas","Marketing","Recursos Humanos","Gestão de Recursos"
];
const FIRST = ["Henry","Ana","Pedro","Mariana","João","Carolina","Felipe","Júlia","Gabriel","Beatriz","Rafael","Larissa","Bruno","Camila","Matheus","Sofia","Thiago","Isabela","Henrique","Letícia","Vitor","Amanda","Diego","Bianca","Gustavo"];
const LAST  = ["Barbosa","Souza","Oliveira","Pereira","Lima","Costa","Ferreira","Almeida","Ribeiro","Carvalho","Martins","Rocha","Gomes","Araújo","Barbosa","Cardoso","Moreira","Pinto","Correia","Teixeira"];

const MEMBERS = Array.from({ length: 50 }, (_, i) => ({
  name: `${FIRST[i % FIRST.length]} ${LAST[(i*3) % LAST.length]}`,
  course: COURSES[i % COURSES.length],
  area: AREAS[i % AREAS.length],
}));

// 👉 NOVO: mapa de fotos
const photos = {
  "Henry Barbosa": "images/members/henry.jpg",
  "Ana Souza": "images/ana.jpg",
  "Pedro Oliveira": "images/pedro.jpg"
};

// 👉 NOVO: aplica fotos aos membros
MEMBERS.forEach(m => {
  if (photos[m.name]) {
    m.photo = photos[m.name];
  }
});

const PRODUCTS = [
  { id:"camiseta", name:"Camiseta Oficial", image:"images/products/camiseta.jpg", price:79.9 },
  { id:"moletom", name:"Moletom Burning Goose", image:"images/products/moletom.jpg", price:189.9 },
  { id:"caneca", name:"Caneca Goose", image:"images/products/caneca.jpg", price:39.9 },
  { id:"adesivos", name:"Pack de Adesivos", image:"images/products/adesivos.jpg", price:19.9 },
  { id:"bone", name:"Boné Bordado", image:"images/products/bone.jpg", price:69.9 },
  { id:"garrafa", name:"Garrafa Térmica", image:"images/products/garrafa.jpg", price:89.9 },
];

const ORDER_FORM_URL = "https://forms.gle/your-order-form"; // troque pelo seu Google Forms

const avatarFor = (name) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=1e3a5f,2a4a7f,ff7a1a&radius=50`;

const fmtBRL = (n) => "R$ " + n.toFixed(2).replace(".", ",");

// ============= NAVBAR =============
function initNavbar() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll);

  const toggle = nav.querySelector(".nav-toggle");
  const menu = nav.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
  }
}

// ============= RENDER: index previews =============
function renderMembersPreview() {
  const root = document.getElementById("members-preview");
  if (!root) return;
  root.innerHTML = MEMBERS.slice(0, 8).map(m => memberCardHTML(m)).join("");
}
function renderProductsPreview() {
  const root = document.getElementById("products-preview");
  if (!root) return;
  root.innerHTML = PRODUCTS.slice(0, 3).map(p => `
    <a href="products.html" class="product-preview">
      <div class="img-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy" width="768" height="768"></div>
      <div class="row">
        <div class="pname" style="font-family:'Space Grotesk';font-weight:700">${p.name}</div>
        <div class="price" style="color:var(--primary);font-weight:700">${fmtBRL(p.price)}</div>
      </div>
    </a>
  `).join("");
}

// ============= RENDER: members.html =============
function memberCardHTML(m) {
  return `
    <div class="member-card">
      <div class="avatar">
        <img src="${m.photo || avatarFor(m.name)}" alt="${m.name}" loading="lazy">
      </div>
      <div class="name">${m.name}</div>
      <div class="course">${m.course}</div>
      <div class="area">${m.area.toUpperCase()}</div>
    </div>`;
}
function renderMembersPage() {
  const grid = document.getElementById("members-grid");
  const filterBar = document.getElementById("members-filter");
  if (!grid || !filterBar) return;

  const areas = ["Todos", ...Array.from(new Set(MEMBERS.map(m => m.area)))];
  let active = "Todos";

  const renderFilters = () => {
    filterBar.innerHTML = areas.map(a =>
      `<button class="chip ${a === active ? "active" : ""}" data-area="${a}">${a}</button>`
    ).join("");
    filterBar.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        active = btn.dataset.area;
        renderFilters();
        renderGrid();
      });
    });
  };
  const renderGrid = () => {
    const list = active === "Todos" ? MEMBERS : MEMBERS.filter(m => m.area === active);
    grid.innerHTML = list.map(memberCardHTML).join("");
  };
  renderFilters();
  renderGrid();
}

// ============= RENDER: products.html =============
function renderProductsPage() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card">
      <div class="img-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy" width="768" height="768"></div>
      <div class="body">
        <div class="head">
          <div class="pname">${p.name}</div>
          <div class="price">${fmtBRL(p.price)}</div>
        </div>
        <a href="${ORDER_FORM_URL}?produto=${encodeURIComponent(p.name)}"
           target="_blank" rel="noopener noreferrer"
           class="btn btn-primary">Comprar</a>
      </div>
    </div>
  `).join("");
}

// ============= CONTACT FORM =============
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    if (btn) btn.textContent = "Mensagem enviada ✓";
    form.reset();
  });
}

// ============= FOOTER YEAR =============
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ============= BOOT =============
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderMembersPreview();
  renderProductsPreview();
  renderMembersPage();
  renderProductsPage();
  initContactForm();
  initFooterYear();
});

function initMusic() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  const startMusic = () => {
    audio.play()
      .then(() => console.log("Música tocando"))
      .catch(err => console.log("Erro:", err));

    document.removeEventListener("pointerdown", startMusic);
  };

  document.addEventListener("pointerdown", startMusic);
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderMembersPreview();
  renderProductsPreview();
  renderMembersPage();
  renderProductsPage();
  initContactForm();
  initFooterYear();

  initMusic(); // 👈 ADICIONA ISSO
});

