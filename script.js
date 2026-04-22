/* Funkce pro šuplík analýzy */
window.toggleAnalysis = function() {
    const content = document.getElementById('analysis-content');
    const arrow = document.getElementById('analysis-arrow');
    
    if (content.style.display === "block") {
        content.style.display = "none";
        arrow.textContent = "▼";
    } else {
        content.style.display = "block";
        arrow.textContent = "▲";
    }
};

/* Systém barevných režimů */
window.setTheme = function(theme) {
    document.body.classList.remove('dark-mode', 'sand-mode');
    if (theme === 'dark') document.body.classList.add('dark-mode');
    if (theme === 'sand') document.body.classList.add('sand-mode');
    localStorage.setItem('gita_theme', theme);
};

/* Inicializace při načtení stránky */
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('gita_theme') || 'light';
    setTheme(savedTheme);
});