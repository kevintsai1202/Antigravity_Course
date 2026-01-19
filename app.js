// Main Application Logic
// Initialization is handled by app-init.js

// Code Block to Terminal Converter
function convertCodeBlocksToTerminals() {
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(pre => {
        if (pre.closest('.terminal-window')) return;

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

        header.appendChild(dotRed);
        header.appendChild(dotYellow);
        header.appendChild(dotGreen);

        const body = document.createElement('div');
        body.className = 'terminal-body';
        body.style.minHeight = 'auto';
        body.style.padding = '0';

        const parent = pre.parentNode;
        parent.insertBefore(terminalWindow, pre);
        body.appendChild(pre);
        terminalWindow.appendChild(header);
        terminalWindow.appendChild(body);

        pre.style.margin = '0';
        pre.style.background = 'transparent';
        pre.style.border = 'none';
        pre.style.padding = '1rem';
    });
}

// 0. Dynamic Sidebar Generation
function generateSidebar() {
    const tocNav = document.getElementById('toc');
    if (!tocNav) return;

    tocNav.innerHTML = ''; // Clear existing static links

    const sections = document.querySelectorAll('.module-section');

    sections.forEach(section => {
        // Main Chapter (H2)
        const h2 = section.querySelector('h2');
        if (h2) {
            const h2Link = document.createElement('a');
            h2Link.href = `#${section.id}`;
            h2Link.className = 'toc-link';
            h2Link.dataset.target = section.id;

            // Safe Split Logic
            const parts = h2.innerText.split('/');
            h2Link.innerText = parts.length > 1 ? parts[1].trim() : h2.innerText;

            // AI Effect: Trigger Scan on Click
            h2Link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(section.id);
                if (target) {
                    triggerScanEffect(target);
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });

            tocNav.appendChild(h2Link);
        }

        // Subsections (H3 inside glass-cards)
        const h3s = section.querySelectorAll('h3');
        h3s.forEach((h3, index) => {
            if (!h3.id) h3.id = `${section.id}-sub-${index}`;

            const h3Link = document.createElement('a');
            h3Link.href = `#${h3.id}`;
            h3Link.className = 'toc-link toc-sub-link';
            h3Link.dataset.target = h3.id;
            h3Link.innerText = h3.innerText;
            h3Link.innerText = h3.innerText;

            // AI Effect: Trigger Scan on Click
            h3Link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(h3Link.dataset.target);
                if (target) {
                    triggerScanEffect(target.closest('.glass-card') || target);
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });

            tocNav.appendChild(h3Link);
        });

        // Adjust H2 Link as well
        if (h2) {
            const h2Link = tocNav.querySelector(`a[data-target="${section.id}"]`);
            if (h2Link) {
                h2Link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.getElementById(section.id);
                    if (target) {
                        triggerScanEffect(target);
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        }
    });
}

// Sidebar Toggle
function setupSidebarToggle() {
    const btn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content'); // Assuming .main-content exists

    if (btn && sidebar && mainContent) {
        const icon = btn.querySelector('i');

        btn.addEventListener('click', function () {
            sidebar.classList.toggle('collapsed');

            // Adjust main content margin on desktop
            if (window.innerWidth >= 768) {
                if (sidebar.classList.contains('collapsed')) {
                    mainContent.style.marginLeft = '0';
                } else {
                    // Sidebar is sticky/flex, margin might be auto handled by flex
                    // Actually css says .sidebar width becomes 0. Flexbox handles it.
                    mainContent.style.marginLeft = '0';
                }
            }

            // Toggle Icon
            if (icon) { // Ensure icon exists
                if (sidebar.classList.contains('collapsed')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-arrow-right');
                } else {
                    icon.classList.remove('fa-arrow-right');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Mobile Init: Collapse by default
        if (window.innerWidth < 768) {
            sidebar.classList.add('collapsed');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-arrow-right');
                icon.classList.add('fa-bars');
            }
        }
    }
}

// 1. Smooth Scroll
function setupSmoothScroll() {
    document.addEventListener('click', function (e) {
        // ONLY target anchor links, not all clicks (fixes <details> toggle)
        if (e.target.closest('a[href^="#"]')) {
            const link = e.target.closest('a[href^="#"]');
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// 2. Study Timer (Flip Clock)
let isTimerRunning = false;
let timerId = null;
let timerSeconds = 0;

function setupTimer() {
    const startBtn = document.getElementById('startTimer');
    const pauseBtn = document.getElementById('pauseTimer');

    if (startBtn && pauseBtn) {
        startBtn.addEventListener('click', () => startTimer());
        pauseBtn.addEventListener('click', () => pauseTimer());
    }
}

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    timerId = setInterval(() => {
        timerSeconds++;
        updateFlipClock(timerSeconds);
    }, 1000);
}

function pauseTimer() {
    if (!isTimerRunning) return;
    isTimerRunning = false;
    clearInterval(timerId);
}

function updateFlipClock(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');

    updateFlipDigit('m1', m[0]);
    updateFlipDigit('m2', m[1]);
    updateFlipDigit('s1', s[0]);
    updateFlipDigit('s2', s[1]);
}

function updateFlipDigit(id, newValue) {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.querySelector('.top');
    const bottom = el.querySelector('.bottom');
    const topFlip = el.querySelector('.top-flip');
    const bottomFlip = el.querySelector('.bottom-flip');

    const currentValue = top.innerText;
    if (newValue === currentValue) return;

    // Update content for animation
    topFlip.innerText = currentValue;
    bottomFlip.innerText = newValue;

    // Trigger Animation
    el.classList.remove('flip-animate');
    void el.offsetWidth; // Trigger Reflow
    el.classList.add('flip-animate');

    // Update static content after animation (approx)
    setTimeout(() => {
        top.innerText = newValue;
        bottom.innerText = newValue;
        topFlip.innerText = newValue;
    }, 300); // Halfway through or end
}

// Setup Start Learning Button
function setupStartLearning() {
    const btn = document.getElementById('startLearningBtn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            // Smooth scroll is handled by global listener
            // Just start timer
            startTimer();
        });
    }
}

// 3. Theme Toggle
function setupThemeToggle() {
    const btn = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        if (btn) btn.innerText = '☀️';
    }

    if (btn) {
        btn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            if (current === 'light') {
                html.removeAttribute('data-theme');
                btn.innerText = '🌙';
                localStorage.setItem('theme', 'dark');
            } else {
                html.setAttribute('data-theme', 'light');
                btn.innerText = '☀️';
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// 4. Sidebar Scroll Spy & Progress Bar
function setupScrollSpy() {
    const targets = document.querySelectorAll('.module-section, h3');
    const tocLinks = document.querySelectorAll('.toc-link');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    // Set of currently intersecting IDs
    const visibleIds = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleIds.add(entry.target.id);
            } else {
                visibleIds.delete(entry.target.id);
            }
        });

        // Determine "Active" ID
        let activeId = null;
        const visibleH3s = [];
        const visibleSections = [];

        targets.forEach(t => {
            if (visibleIds.has(t.id)) {
                if (t.tagName === 'H3') visibleH3s.push(t);
                else visibleSections.push(t);
            }
        });

        if (visibleH3s.length > 0) {
            activeId = visibleH3s[0].id;
        } else if (visibleSections.length > 0) {
            activeId = visibleSections[0].id;
        }

        if (activeId) {
            tocLinks.forEach(l => l.classList.remove('active'));
            const activeLink = document.querySelector(`.toc-link[data-target="${activeId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }

    }, {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0
    });

    targets.forEach(t => observer.observe(t));

    // Progress Bar (based on scroll percentage)
    window.addEventListener('scroll', () => {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        const scrollTop = window.scrollY;
        const docHeight = mainContent.scrollHeight - window.innerHeight;
        let percent = Math.round((scrollTop / docHeight) * 100);
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;

        if (progressBar) progressBar.style.width = `${percent}%`;
        if (progressText) progressText.innerText = `${percent}%`;
    });
}

// 5. 3D Effects (Disabled)
function setup3DEffects() {
    // Effect disabled per user request
}

// 6. Particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';

        const size = Math.random() * 10 + 2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;

        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;

        const duration = Math.random() * 10 + 5;
        p.style.setProperty('--duration', `${duration}s`);

        container.appendChild(p);
    }
}

// 7. Quiz Logic
function setupQuizzes() {
    const quizData = {
        mod1: [
            {
                question: "Vibe Coding 的核心哲學是什麼？",
                options: ["精通所有語法細節", "憑藉直覺與感覺，專注於目標", "完全不寫任何一行程式碼"],
                correct: 1
            },
            {
                question: "Antigravity 的全域規則 (Global Rules) 儲存在哪裡？",
                options: [".agent/rules/GEMINI.md", "~/.gemini/GEMINI.md", "project/rules.json"],
                correct: 1
            },
            {
                question: "MCP 的全名是什麼？",
                options: ["Model Context Protocol", "Master Control Program", "Multi-Core Processing"],
                correct: 0
            },
            {
                question: "如何喚醒 Agent Manager？",
                options: ["Cmd/Ctrl + C", "Cmd/Ctrl + E", "Cmd/Ctrl + P"],
                correct: 1
            },
            {
                question: "哪一個 Artifact 用於追蹤任務進度？",
                options: ["task.md", "walkthrough.md", "clippy.doc"],
                correct: 0
            }
        ],
        mod2: [
            {
                question: "Vibe Coding 五部曲的第一步是什麼？",
                options: ["開始寫 Code", "建立 Task List", "撰寫 PRD (需求文件)"],
                correct: 2
            },
            {
                question: "哪一個工具用於下載 YouTube 影片？",
                options: ["ffmpeg", "yt-dlp", "pandoc"],
                correct: 1
            },
            {
                question: "自訂 Skills 應該放在哪個目錄？",
                options: ["skills/", ".agent/skills/", "~/.gemini/skills/"],
                correct: 1
            }
        ]
    };


    // Render Quizzes
    Object.keys(quizData).forEach(moduleId => {
        const container = document.getElementById(`quiz-${moduleId}`);
        if (!container) return;

        const questions = quizData[moduleId];

        container.innerHTML = `<h3>🧠 隨堂測驗</h3>`;

        questions.forEach((q, index) => {
            const qEl = document.createElement('div');
            qEl.className = 'quiz-question';

            const title = document.createElement('h4');
            title.innerText = `${index + 1}. ${q.question}`;
            qEl.appendChild(title);

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';

            const feedback = document.createElement('div');
            feedback.className = 'quiz-feedback';
            feedback.style.marginTop = '10px';
            feedback.style.minHeight = '1.2em';
            feedback.style.fontFamily = 'Fira Code, monospace';

            q.options.forEach((opt, optIndex) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-btn';
                btn.innerText = opt;

                btn.addEventListener('click', () => {
                    // Reset all buttons in this question
                    const allBtns = optionsDiv.querySelectorAll('.quiz-btn');
                    allBtns.forEach(b => {
                        b.classList.remove('correct', 'incorrect');
                        b.disabled = false; // Optional: disable after answer? User might want to retry. Use feedback style instead.
                    });

                    if (optIndex === q.correct) {
                        btn.classList.add('correct');
                        feedback.innerText = ">> SYSTEM: ACCESS GRANTED";
                        feedback.style.color = '#27c93f';
                        // Disable interactions for this question to prevent spamming? 
                        // Let's keep it interactive but clear.
                    } else {
                        btn.classList.add('incorrect');
                        feedback.innerText = ">> SYSTEM: CRITICAL ERROR - ACCESS DENIED";
                        feedback.style.color = '#ff5f56';
                    }
                });

                optionsDiv.appendChild(btn);
            });
            qEl.appendChild(optionsDiv);
            qEl.appendChild(feedback);
            container.appendChild(qEl);
        });
    });
}

// 8. Copy to Clipboard
function setupCopyButtons() {
    const preBlocks = document.querySelectorAll('pre');
    preBlocks.forEach(pre => {
        // Return if already wrapped
        if (pre.parentElement.classList.contains('code-wrapper')) return;

        // Create Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';

        // Insert wrapper before pre
        pre.parentNode.insertBefore(wrapper, pre);

        // Move pre into wrapper
        wrapper.appendChild(pre);

        // Create Button
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.innerHTML = '<i class="fas fa-copy"></i>';
        btn.title = 'Copy to clipboard';
        btn.setAttribute('aria-label', '複製程式碼');

        // Click Event
        btn.addEventListener('click', async () => {
            const code = pre.querySelector('code');
            if (!code) return;

            try {
                await navigator.clipboard.writeText(code.innerText);

                // Success Feedback
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                    btn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
                btn.innerHTML = '<i class="fas fa-times"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }
        });

        wrapper.appendChild(btn);
    });
}

// AI Effect Logic
function triggerScanEffect(element) {
    // Remove existing if any
    element.classList.remove('scanning');

    // Add overlay if not present
    if (!element.querySelector('.scan-overlay')) {
        const overlay = document.createElement('div');
        overlay.classList.add('scan-overlay');
        element.appendChild(overlay);
        // Ensure relative positioning
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
    }

    // Trigger reflow
    void element.offsetWidth;

    // Add class to start animation
    element.classList.add('scanning');

    // Remove class after animation (approx 1.5s)
    setTimeout(() => {
        element.classList.remove('scanning');
    }, 1500);
}

// Terminal Typing Effect
function startTerminalEffect() {
    const typeWriterElement = document.getElementById('typeWriter');
    if (!typeWriterElement) return;

    const sequence = [
        { text: 'human_intent = "Build an amazing website"', delay: 50, type: 'cmd' },
        { text: '\n', delay: 300 },
        { text: 'Analyzing requirements...', delay: 20, type: 'output' },
        { text: '\n', delay: 100 },
        { text: 'Generating code modules...', delay: 20, type: 'output' },
        { text: '\n', delay: 100 },
        { text: '[SUCCESS] Landing Page generated.', delay: 20, type: 'success' },
        { text: '\n', delay: 100 },
        { text: 'user@antigravity:~$ ', delay: 20, type: 'prompt' }
    ];

    let stepIndex = 0;
    let charIndex = 0;

    function typeNext() {
        if (stepIndex >= sequence.length) return;

        const step = sequence[stepIndex];

        if (charIndex < step.text.length) {
            const char = step.text.charAt(charIndex);

            // Create span if needed for styling
            if (step.type && charIndex === 0) {
                // Determine class based on type
                let className = 'cmd-text'; // default
                if (step.type === 'output') className = 'output-text';
                if (step.type === 'success') className = 'success-text';
                if (step.type === 'prompt') className = 'cmd-text';

                const span = document.createElement('span');
                span.className = className;
                typeWriterElement.appendChild(span);
            }

            // Append to the last span
            if (typeWriterElement.lastChild) {
                typeWriterElement.lastChild.textContent += char;
            } else {
                typeWriterElement.textContent += char;
            }

            charIndex++;
            setTimeout(typeNext, step.delay);
        } else {
            stepIndex++;
            charIndex = 0;
            setTimeout(typeNext, 300); // Pause between steps
        }
    }

    // Start after initial delay
    setTimeout(typeNext, 1000);
}
