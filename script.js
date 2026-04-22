/* ========================================= 
   1. FUNKCE PRO ŠUPLÍK ANALÝZY 
   ========================================= */
   window.toggleAnalysis = function() {
    const content = document.getElementById('analysis-content');
    const arrow = document.getElementById('analysis-arrow');
    
    // Podíváme se, jestli je šuplík zrovna schovaný (none) nebo vidět (block)
    if (content.style.display === "block") {
        content.style.display = "none";
        arrow.textContent = "▼";
    } else {
        content.style.display = "block";
        arrow.textContent = "▲";
    }
};

/* ========================================= 
   2. SYSTÉM BAREVNÝCH REŽIMŮ (Light / Dark / Sand) 
   ========================================= */
window.setTheme = function(theme) {
    // Odstraníme staré režimy a nastavíme nový
    document.body.classList.remove('dark-mode', 'sand-mode');
    if (theme === 'dark') document.body.classList.add('dark-mode');
    if (theme === 'sand') document.body.classList.add('sand-mode');
    
    // Uložíme si volbu do paměti prohlížeče
    localStorage.setItem('gita_theme', theme);
};

/* ========================================= 
   3. NAČÍTÁNÍ TEXTŮ Z JSONU 
   ========================================= */

// Funkce, která najde v textu __ a udělá z nich kurzívu (<i>)
function formatTranslation(text) {
    return text.replace(/__(.*?)__/g, '<i>$1</i>');
}

// Funkce, která najde v textu ** a udělá z nich barevné slovo (<strong>)
function formatBold(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// Hlavní funkce, která "vysází" verš na stránku
async function loadVerse(verseId) {
    try {
        // 1. Sáhneme si pro data do souboru data.json
        const response = await fetch('data.json');
        const data = await response.json();
        const verse = data[verseId];

        // 2. Najdeme naši "nástěnku" (kontejner) v index.html
        const container = document.getElementById('content-container');
        
        // 3. Vytvoříme HTML kód verše a vložíme ho tam
        container.innerHTML = `
            <div class="verse-section">
                <div class="verse-text-container">
                    <div class="iast" style="font-size: 1.25em; margin-bottom: 10px;">${verse.iast}</div>
                    
                    <div class="verse-interpretation">
                        <p class="vocabulary">${formatBold(verse.vocabulary)}</p>
                        <p class="translation">${formatTranslation(verse.translation)}</p>
                    </div>
                </div>

                <!-- Šuplík analýzy podle tvých pravidel -->
                <div class="analysis-container">
                    <div class="analysis-header" onclick="toggleAnalysis()">
                        <span>Komentáře a analýza</span>
                        <span id="analysis-arrow">▼</span>
                    </div>
                    <div id="analysis-content" class="analysis-content">
                        <p>${formatTranslation(formatBold(verse.analysis))}</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Nepodařilo se načíst data z JSONu:", error);
    }
}

/* ========================================= 
   4. SPUŠTĚNÍ PŘI NAČTENÍ STRÁNKY 
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Načteme barvy, které měl uživatel naposledy [2]
    const savedTheme = localStorage.getItem('gita_theme') || 'light';
    setTheme(savedTheme);

    // Automaticky zobrazíme první verš (klíč "1_1" v JSONu)
    loadVerse('1_1');
});