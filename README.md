# DSR9 2.0 - Cibersegurança e Serviços Gerenciados

Este repositório contém o código-fonte do site institucional da **DSR9**, uma empresa especializada em **Cibersegurança e Serviços Gerenciados (MDR)**, focada em excelência técnica e proteção de ambientes complexos.

O projeto foi construído com uma arquitetura **HTML, CSS e JavaScript Vanilla**, visando máxima performance, leveza e facilidade de manutenção.

---

## 🚀 Visão Geral do Projeto

O objetivo principal deste projeto é servir como um *website* moderno, rápido e responsivo para a DSR9.

**Principais Seções:**

* **Header & Navegação:** Menu fixo e responsivo, incluindo um CTA para o serviço de MDR (Monitoração, Detecção e Resposta).
* **Hero Section:** Apresentação da proposta de valor focada em MDR.
* **Sobre a DSR9:** Detalhes da *expertise* e credenciais da empresa.
* **Contadores de Credibilidade:** Estatísticas animadas para construir confiança (Anos de Expertise, Colaboradores, etc.).
* **Soluções:** *Overview* das áreas de atuação (Ransomware, LGPD, Zero Trust, etc.).
* **Parceiros:** Carrossel infinito de logos de parceiros estratégicos.
* **DNA Técnico:** Destaque para a qualificação da equipe com um *slider* de certificações.
* **Formulário de Contato:** Captura de leads com simulação de envio.
* **Footer:** Informações de contato e links úteis.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica e acessível.
* **CSS3:** Estilização, variáveis de cor (`:root`), e animações (Keyframes para carrosséis).
    * **Metodologia:** Utiliza uma abordagem de responsividade baseada em *Media Queries*.
* **JavaScript (Vanilla JS):**
    * **Animação de Contadores:** Uso de `requestAnimationFrame` para animações fluidas e performáticas.
    * **Navegação Mobile:** Lógica para *toggle* do menu de hambúrguer.
    * **Carrosséis:** Lógica de duplicação de conteúdo para o efeito de *loop* infinito (combinado com CSS).
    * **Formulário:** Simulação de envio com feedback visual.
* **Font Awesome:** Para ícones.
* **Michroma:** Família de fontes utilizada para o design.

---

## ✨ Melhorias e Ajustes Realizados

Com base na versão inicial, foram implementadas as seguintes melhorias para otimizar o site:

1.  **Performance & Otimização JS:**
    * A animação dos contadores (`.counter-number`) foi reescrita para usar `requestAnimationFrame` em conjunto com **Intersection Observer**, garantindo que a animação só ocorra quando o elemento estiver visível na tela e com máxima fluidez.
    * Lógica aprimorada para fechar o menu mobile ao clicar em um link.
2.  **SEO & Acessibilidade:**
    * Adição de *meta tags* essenciais (`description`, `keywords`).
    * Uso da tag `alt` em todas as imagens (logomarcas, certificações).
    * Melhoria nos atributos `aria-label` e `aria-expanded` para acessibilidade (menu e formulário).
3.  **Estrutura HTML & Semântica:**
    * Correções de *links* de imagem para uma estrutura de pastas mais clara (`./assets/logo/`, `./assets/cert/`).
    * Uso de elementos semânticos (`<header>`, `<main>`, `<section>`, `<footer>`).
4.  **Estilização (CSS):**
    * Ajustes finos no layout do `footer` para melhor responsividade em *tablet* e *desktop* (uso de `grid`).
    * Correção de seletores CSS e padronização de variáveis.

---

## 💻 Como Rodar Localmente

Este é um projeto **front-end estático** e pode ser executado diretamente em seu navegador.

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/andrelcezar/dsr92.0.git](https://github.com/andrelcezar/dsr92.0.git)
    ```
2.  **Navegue até a Pasta:**
    ```bash
    cd dsr92.0
    ```
3.  **Abra o Arquivo:**
    Abra o arquivo `index.html` diretamente em seu navegador.

    > **Dica:** Para simular um ambiente de servidor (se necessário para testes mais avançados de formulário ou APIs), você pode usar extensões como **Live Server** no VS Code.

---

## 🗺️ Estrutura de Arquivos
