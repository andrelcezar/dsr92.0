// script/blog-common.js
// Busca o feed RSS do blog (via proxy CORS) e renderiza os cards.
// Usado por blog.html (data-limit="6") e allposts.html (sem limite).
// Todo conteúdo vindo do feed é tratado como não confiável: nunca é
// injetado via innerHTML sem passar pelo DOMPurify, e nós montamos os
// cards com a API do DOM em vez de concatenar strings de HTML.

// document.currentScript só é válido de forma síncrona durante o parsing
// deste arquivo — precisa ser capturado aqui fora, antes do listener abaixo,
// senão já volta null quando o DOMContentLoaded dispara.
const limitAttr = document.currentScript
    ? document.currentScript.getAttribute('data-limit')
    : null;
const BLOG_POST_LIMIT = limitAttr ? parseInt(limitAttr, 10) : null;

document.addEventListener('DOMContentLoaded', () => {
    const rssUrl = 'https://dsr9.com/blog/feed/';
    const container = document.getElementById('blog-posts-container');
    const CORS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';
    const DEFAULT_IMAGE = './assets/placeholder/default-blog.jpg';
    const limit = BLOG_POST_LIMIT;

    function safeUrl(url) {
        try {
            const parsed = new URL(url, window.location.href);
            return (parsed.protocol === 'http:' || parsed.protocol === 'https:')
                ? parsed.href
                : null;
        } catch (err) {
            return null;
        }
    }

    function showMessage(text) {
        container.innerHTML = '';
        const msg = document.createElement('p');
        msg.className = 'loading-message';
        msg.textContent = text;
        container.appendChild(msg);
    }

    window.loadPost = function(index, itemLink) {
        const posts = JSON.parse(localStorage.getItem('dsr9_blog_posts') || '[]');
        const postData = posts[index];
        if (!postData) return;

        localStorage.setItem('dsr9_current_post', JSON.stringify(postData));

        const link = safeUrl(itemLink);
        if (postData.content && postData.content.length < 500) {
            if (link) window.open(link, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = 'post.html';
        }
    };

    function extractImage(content) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = DOMPurify.sanitize(content || '');
        const img = tempDiv.querySelector('img');
        return (img && safeUrl(img.src)) || DEFAULT_IMAGE;
    }

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    function cleanSnippet(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = DOMPurify.sanitize(html || '');
        let text = tempDiv.textContent || tempDiv.innerText || '';
        text = text.replace(/\s+/g, ' ').trim();
        return text.substring(0, 150) + '...';
    }

    function buildPostCard(item, index) {
        const postLink = item.link;
        const postTitle = item.title || 'Sem título';
        const postDate = formatDate(item.pubDate);
        const postSnippet = cleanSnippet(item.description || item.content);
        const imageUrl = safeUrl(item.thumbnail) || extractImage(item.content);

        const card = document.createElement('div');
        card.className = 'blog-post-card';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.loading = 'lazy';
        img.alt = `Imagem de capa do post: ${postTitle}`;
        img.addEventListener('error', () => {
            img.onerror = null;
            img.src = DEFAULT_IMAGE;
        }, { once: true });

        const contentDiv = document.createElement('div');
        contentDiv.className = 'card-content';

        const dateP = document.createElement('p');
        dateP.className = 'date';
        dateP.textContent = postDate;

        const h3 = document.createElement('h3');
        const titleLink = document.createElement('a');
        titleLink.href = '#';
        titleLink.textContent = postTitle;
        titleLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.loadPost(index, postLink);
        });
        h3.appendChild(titleLink);

        const snippetP = document.createElement('p');
        snippetP.className = 'snippet';
        snippetP.textContent = postSnippet;

        const readMore = document.createElement('a');
        readMore.href = '#';
        readMore.className = 'read-more';
        readMore.innerHTML = 'Leia Mais <i class="fas fa-arrow-right"></i>';
        readMore.addEventListener('click', (e) => {
            e.preventDefault();
            window.loadPost(index, postLink);
        });

        contentDiv.append(dateP, h3, snippetP, readMore);
        card.append(img, contentDiv);
        return card;
    }

    fetch(CORS_PROXY + encodeURIComponent(rssUrl))
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== 'ok' || !data.items || data.items.length === 0) {
                showMessage('Não foi possível carregar os posts do blog no momento.');
                return;
            }

            localStorage.setItem('dsr9_blog_posts', JSON.stringify(data.items));

            const items = limit ? data.items.slice(0, limit) : data.items;
            container.innerHTML = '';
            items.forEach((item, index) => {
                container.appendChild(buildPostCard(item, index));
            });
        })
        .catch(error => {
            console.error('Erro ao buscar o RSS:', error);
            showMessage('Erro ao carregar o feed de notícias. Verifique o console para mais detalhes.');
        });
});
