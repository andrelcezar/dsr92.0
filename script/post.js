// script/post.js
// Renderiza o post salvo em localStorage (vindo de blog.html/allposts.html).
// O conteúdo completo vem do feed RSS de terceiros: é sanitizado com
// DOMPurify antes de entrar no DOM, e título/data são texto puro (textContent).

document.addEventListener('DOMContentLoaded', () => {
    const postTitleElement = document.getElementById('post-title');
    const postMetaElement = document.getElementById('post-meta');
    const postContentElement = document.getElementById('post-content');
    const titleTagElement = document.getElementById('post-title-tag');

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

    function showNotFound() {
        postTitleElement.textContent = 'Artigo não encontrado';
        postMetaElement.textContent = 'Você pode ter acessado esta página diretamente ou o post expirou.';

        postContentElement.innerHTML = '';
        const p = document.createElement('p');
        p.append('Por favor, volte para a ');
        const a = document.createElement('a');
        a.href = 'blog.html';
        a.textContent = 'página do blog';
        p.appendChild(a);
        p.append(' para selecionar um artigo.');
        postContentElement.appendChild(p);
    }

    let postData = null;
    try {
        postData = JSON.parse(localStorage.getItem('dsr9_current_post'));
    } catch (err) {
        postData = null;
    }

    if (!postData) {
        showNotFound();
        return;
    }

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    titleTagElement.textContent = (postData.title || 'Post') + ' | DSR9 Blog';
    postTitleElement.textContent = postData.title || 'Post';
    postMetaElement.textContent = `${formatDate(postData.pubDate)} | Por: ${postData.author || 'DSR9'}`;

    postContentElement.innerHTML = DOMPurify.sanitize(postData.content || '');

    const originalUrl = safeUrl(postData.link);
    if (originalUrl) {
        const originalLink = document.createElement('p');
        originalLink.style.cssText = 'display:block;margin-top:40px;text-align:right;';

        const a = document.createElement('a');
        a.href = originalUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.color = 'var(--color-secondary)';
        a.innerHTML = 'Ver artigo original na fonte <i class="fas fa-external-link-alt"></i>';

        originalLink.appendChild(a);
        postContentElement.appendChild(originalLink);
    }
});
