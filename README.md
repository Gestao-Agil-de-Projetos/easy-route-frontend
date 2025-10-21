# easy-route-frontend

Este repositório contém o **frontend da aplicação Easy Route**, construído com **React + Vite** seguindo a metodologia **Atomic Design** para organização de componentes.  

---

## 1. Como rodar a aplicação

### 1️⃣ Instalar dependências

```bash
npm install
# ou
yarn install
```

### 2️⃣ Rodar em modo desenvolvimento

```bash
npm run dev
```

### 3️⃣ Build para produção

```bash
npm run build
```

### 4️⃣ Pré-visualizar a build

```bash
npm run preview
```

## 2. Estrutura do Projeto

Abaixo está uma visão geral das pastas e arquivos principais do easy-route-frontend e suas funções:

```
easy-route-frontend
├─ public/              # Arquivos públicos (favicon, manifest, etc.)
├─ src/
│  ├─ assets/           # Arquivos estáticos (imagens, ícones, fontes)
│  ├─ components/       # Componentes (Atomic Design)
│  │   ├─ atoms/        # Componentes básicos (botões, inputs, labels)
│  │   ├─ molecules/    # Combinação de atoms (cards, form fields)
│  │   ├─ organisms/    # Combinação de molecules (navbar, sidebar)
│  │   ├─ templates/    # Estrutura de páginas/layouts
│  │   └─ pages/        # Páginas concretas (Home, Login, Dashboard)
│  ├─ contexts/         # Context API (AuthContext, ThemeContext, etc.)
│  ├─ hooks/            # Hooks customizados (useAuth, useFetch)
│  ├─ routes/           # Definição de rotas da aplicação
│  ├─ services/         # Comunicação com APIs externas (ex: axios)
│  ├─ styles/           # Estilos globais, temas, Tailwind configs
│  ├─ types/            # Tipagens globais (TypeScript)
│  ├─ utils/            # Funções utilitárias (helpers)
│  ├─ App.tsx           # Componente raiz da aplicação
│  └─ main.tsx          # Ponto de entrada do React + Vite
├─ .gitignore
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 3. Como Contribuir

Para manter o projeto organizado e consistente, siga as seguintes práticas ao contribuir:

### 1️⃣ Criar uma branch

- Sempre **baseie sua branch na `main` (ou `master`)**.
- Nomeie sua branch de acordo com o tipo de trabalho que está realizando:

| Tipo de trabalho             | Prefixo da branch | Exemplo        |
| ---------------------------- | ----------------- | -------------- |
| Nova funcionalidade          | `feature/0000`    | `feature/1234` |
| Correção de bug              | `bugfix/0000`     | `bugfix/4321`  |
| Débito técnico / refatoração | `debt/0000`       | `debt/9876`    |
| Correção urgente             | `hotfix/0000`     | `hotfix/1234`  |

> O número `0000` é opcional, mas pode ser usado para associar a uma issue ou tarefa.

### 2️⃣ Realizar as alterações

- Faça commits claros e descritivos.
- Separe commits por responsabilidade (uma mudança = um commit).

### 3️⃣ Abrir um Pull Request (PR)

- Sempre abra **PRs para a branch `main`**.
- Descreva no PR:
  - O que foi alterado
  - Por que a alteração é necessária
  - Qualquer detalhe de implementação ou instrução especial

### 4️⃣ Revisão e Merge

- Aguarde a revisão de outro contribuinte ou mantenedor.
- Após aprovação, o PR será mergeado na `main`.
- Evite merge direto na `main` sem PR.