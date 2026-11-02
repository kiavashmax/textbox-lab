// ---- theme toggle ----
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn.querySelector(".theme-icon");
const themeLabel = themeBtn.querySelector(".theme-label");
const metaTheme = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const isLight = theme === "light";
    themeIcon.innerHTML = isLight ? "&#9728;" : "&#9790;";
    themeLabel.textContent = isLight ? "Light" : "Dark";
    metaTheme.setAttribute("content", isLight ? "#f4f4f5" : "#0a0a0a");
    try { localStorage.setItem("tbl-theme", theme); } catch (e) {}
}

const saved = (() => {
    try { return localStorage.getItem("tbl-theme"); } catch (e) { return null; }
})();
applyTheme(saved === "light" ? "light" : "dark");

themeBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
});

// ---- reveal cards ----
const cards = document.querySelectorAll(".card");
const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

cards.forEach((c, i) => {
    c.style.animationDelay = (i * 40) + "ms";
    io.observe(c);
});

// ---- magnetic border ----
document.querySelectorAll(".magnet-wrap").forEach((wrap) => {
    wrap.addEventListener("pointermove", (e) => {
        const r = wrap.getBoundingClientRect();
        wrap.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        wrap.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
    wrap.addEventListener("pointerleave", () => {
        wrap.style.setProperty("--mx", "50%");
        wrap.style.setProperty("--my", "50%");
    });
});

// ---- copy CSS ----
function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// these variables are what the extracted rules may reference
const ROOT_VARS = [
    "--bg:#0a0a0a",
    "--bg-gradient:radial-gradient(circle at 50% 0%,#141414 0%,#0a0a0a 60%)",
    "--surface:#111",
    "--surface-2:#1a1a1a",
    "--border:#1e1e1e",
    "--border-strong:#333",
    "--hover:#333",
    "--fg:#e8e8e8",
    "--muted:#666",
    "--gold:#f7d354",
    "--gold-dim:rgba(247,211,84,.45)",
    "--gold-faint:rgba(247,211,84,.15)"
].join(";");

function extractCSS(key) {
    const re = new RegExp("\\." + "(?:demo-)?" + escapeRe(key) + "(?![a-zA-Z0-9_])");
    const found = [];

    for (const sheet of document.styleSheets) {
        let rules;
        try { rules = sheet.cssRules } catch (e) { continue }
        if (!rules) continue;
        for (const rule of rules) {
            if (rule.selectorText && re.test(rule.selectorText)) {
                found.push(rule.cssText);
            } else if (rule.type === 7 && rule.name && rule.name.toLowerCase().includes(key.toLowerCase())) {
                found.push(rule.cssText);
            }
        }
    }

    if (!found.length) return "";

    return "/* theme variables (add once to your :root) */\n:root{" + ROOT_VARS + "}\n\n" + found.join("\n\n");
}

document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
        const key = btn.dataset.key;
        const css = extractCSS(key);
        if (!css) return;

        try {
            await navigator.clipboard.writeText(css);
        } catch (e) {
            const ta = document.createElement("textarea");
            ta.value = css;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }

        btn.classList.add("copied");
        btn.textContent = "Copied";
        setTimeout(() => {
            btn.classList.remove("copied");
            btn.textContent = "Copy CSS";
        }, 1400);
    });
});