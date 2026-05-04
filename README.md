# Burning Goose Aerodesign — Site estático

Site institucional da equipe **Burning Goose Aerodesign (UFPR)** em HTML/CSS/JavaScript puro, pronto para hospedagem em qualquer servidor estático (Apache, Nginx, GitHub Pages, Vercel, Netlify, hospedagem cPanel, etc.).

## Estrutura

```
burning-goose-site/
├── index.html          # Página inicial (hero, história, galeria, previews, processo, patrocinadores, contato)
├── members.html        # Página da equipe (50 membros + filtro por área)
├── products.html       # Página da loja (materiais com botão "Comprar")
├── css/
│   └── styles.css      # Design system completo (azul + laranja, Space Grotesk + Inter)
├── js/
│   └── main.js         # Navbar, render dinâmico de membros e produtos, formulário de contato
└── images/
    ├── site/           # Logo, hero, imagens da galeria
    ├── members/        # (avatares carregados via DiceBear API — substituir por fotos reais aqui)
    └── products/       # Fotos dos produtos da loja
```

## Como publicar

### Opção 1 — Servidor tradicional (Apache, Nginx, cPanel)
Basta enviar **todos os arquivos e pastas** para a raiz pública do servidor (`public_html/`, `www/`, `htdocs/` etc.). Não precisa de build.

### Opção 2 — GitHub Pages
1. Crie um repositório e suba a pasta `burning-goose-site/`.
2. Em **Settings → Pages**, escolha a branch e a pasta raiz.

### Opção 3 — Netlify / Vercel (drag & drop)
Arraste a pasta inteira na dashboard. Pronto.

### Teste local
```bash
# Python 3
python3 -m http.server 8000
# ou Node
npx serve .
```
Abra http://localhost:8000

## Personalizações rápidas

- **Formulário de pedidos** (loja): edite `js/main.js` → constante `ORDER_FORM_URL` com o link do seu Google Forms.
- **Membros reais**: edite o array `MEMBERS` em `js/main.js`. Para usar fotos reais ao invés dos avatares gerados, troque a função `avatarFor(name)` por `images/members/<nome>.jpg`.
- **Produtos**: edite o array `PRODUCTS` em `js/main.js` (id, nome, imagem, preço).
- **Patrocinadores**: edite os blocos `.sponsor` em `index.html`.
- **Email/redes sociais**: nos rodapés e seção de contato dos três HTMLs.

## Tecnologia

- HTML5 semântico
- CSS puro com variáveis (sem framework)
- JavaScript vanilla (sem dependências de build)
- Fontes: Google Fonts (Space Grotesk + Inter)
- Avatares: [DiceBear API](https://www.dicebear.com)

Sem `npm install`. Sem build. Sem servidor Node. Apenas arquivos estáticos.
