document.addEventListener('DOMContentLoaded', () => {
    generateSidebar();
    setupSmoothScroll();
    setupQuizzes();
    setupTimer();
    setupThemeToggle();
    setupScrollSpy();
    setup3DEffects();
    createParticles();
    setupSidebarToggle();
    setupCopyButtons();
    setupStartLearning();
    startTerminalEffect();
    convertCodeBlocksToTerminals();
});

// Code Block to Terminal Converter
function convertCodeBlocksToTerminals() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(pre => {
        // Skip if already in a terminal window (like the hero one)
        if (pre.closest('.terminal-window')) return;

        // Create Terminal Header
        const terminalWindow = document.createElement('div');
        terminalWindow.className = 'terminal-window';
        terminalWindow.style.marginTop = '1rem';
        terminalWindow.style.marginBottom = '1rem';

        const header = document.createElement('div');
        header.className = 'terminal-header';

        const dotRed = document.createElement('div');
        dotRed.className = 'terminal-dot dot-red';
        const dotYellow = document.createElement('div');
        dotYellow.className = 'terminal-dot dot-yellow';
        const dotGreen = document.createElement('div');
        dotGreen.className = 'terminal-dot dot-green';

        // Optional: Add Language Label if data-lang exists
        const lang = pre.getAttribute('data-lang');
        if (lang) {
            const title = document.createElement('div');
            title.innerText = lang;
            title.style.marginLeft = 'auto'; // Push to right
            title.style.color = '#888';
            title.style.fontSize = '0.8rem';
            title.style.fontFamily = 'sans-serif';
            header.appendChild(dotRed);
            header.appendChild(dotYellow);
            header.appendChild(dotGreen);
            header.appendChild(title);
        } else {
            header.appendChild(dotRed);
            header.appendChild(dotYellow);
            header.appendChild(dotGreen);
        }

        const body = document.createElement('div');
        body.className = 'terminal-body';
        body.style.minHeight = 'auto'; // Adjust for content
        body.style.padding = '0'; // reset padding for pre

        // Move pre into body
        const parent = pre.parentNode;
        parent.insertBefore(terminalWindow, pre);
        body.appendChild(pre);
        terminalWindow.appendChild(header);
        terminalWindow.appendChild(body);

        // Reset pre margin to avoid double spacing
        pre.style.margin = '0';
        pre.style.background = 'transparent';
        pre.style.border = 'none';
        pre.style.padding = '1rem';
    });
}
