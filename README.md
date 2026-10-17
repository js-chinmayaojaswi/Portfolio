# 🌐 J S Chinmaya Ojaswi &mdash; Personal Developer Portfolio

A fast, lightweight, and modern developer portfolio website built with a **Clean Minimal Modern** aesthetic, complete with instantaneous **Dark Mode and Light Mode** switching. Personalized with Chinmaya's verified engineering credentials, award-winning hackathon prototypes, and verified certificates.

---

## 🎯 Design Philosophy & Highlights

- **Dual-Theme Architecture (Dark & Light):**
  - **Dark Mode:** Deep charcoal/slate palette (`#090d16`), dark card surfaces (`#0f172a`), subtle hairline borders, crisp white text, and electric blue/cyan accents (`#38bdf8`).
  - **Light Mode:** Off-white/pearl palette (`#f8fafc`), clean white cards, dark charcoal text (`#0f172a`), and consistent blue accents (`#0284c7`).
  - **Zero-FOUC:** Pre-render inline script prevents theme flicker on reload.
  - **Auto-Sync:** Persists user selection in `localStorage` and respects OS system preferences (`prefers-color-scheme`).
- **Recruiter-Ready Technical Showcase:**
  - Highlights authentic engineering projects and hackathons: AI Chat Bot (🏆 Ignite 2.0 Winner), INFUSION 5.0 (SIH 2026), Cepheus GDG Hackathon, and IEEE Technotsav 24h Hackathon.
- **Interactive Document Lightbox:** Full-resolution modal viewer for all 8 verified credentials and certificates.
- **Pure Client-Side Vanilla Stack:** Built with pure HTML5, Tailwind CSS (CDN with `darkMode: 'class'`), custom CSS (`style.css`), vanilla JavaScript (`script.js`), and Lucide icons.
- **Zero Build Steps:** No Node.js, Webpack, or npm required. Open `index.html` in any browser or double-click to view immediately.
- **One-Click Email Copy & Direct Mail Form:** Instant clipboard copy for `js.c.ojaswi01@gmail.com` with toast feedback, plus pre-filled email client dispatch.
- **Automated CI/CD Deployment:** GitHub Pages static deployment configured via `.github/workflows/static.yml`.
- **Fully Responsive:** Looks sharp across mobile, tablet, and widescreen desktop monitors.

---

## 📁 File Structure

```text
Portfolio/
├── .github/workflows/
│   └── static.yml                 # Automated GitHub Pages deployment workflow
├── profile.jpg                    # 👤 Official professional headshot / profile photo
├── cert-ignite-winner.jpg         # 🏆 Winner - Ignite Idea to Proto 2.0 Expo (AI Chat Bot)
├── cert-sih-infusion.png          # 🇮🇳 INFUSION 5.0 - Internal Smart India Hackathon (SIH 2026)
├── cert-ieee-technotsav.jpg       # ⚡ "TECHNOTSAV" 24-Hour Hackathon - IEEE CIS & VVCE
├── cert-gdg-hackathon.jpg         # 🚀 "Cepheus" Hackathon - Google Developer Groups
├── cert-web-dev.jpg               # 🌐 Web Development & GitHub Course - IUCEE EWB-MCE
├── cert-java-excelr.jpg           # ☕ Java Programming Fundamentals (30h) - ExcelR EdTech
├── cert-research-catalyst.jpg     # 🔬 Youth Research Catalyst - ME-RIISE Foundation
├── cert-ignite-participation.png  # 💡 Ignite Idea to Proto 2.0 Participation - ME-RIISE
├── index.html                     # Main clean minimal portfolio entrypoint (Dark/Light mode)
├── style.css                      # Modern typography, dark/light variables, and lightbox styles
├── script.js                      # Client-side theme toggle, lightbox, mobile menu, and clipboard copy
└── README.md                      # Project documentation and deployment guide
```

---

## 👤 Personal Profile Integrated

* **Name:** J S Chinmaya Ojaswi
* **College:** Malnad College of Engineering (MCE), Hassan, Karnataka (Autonomous, Affiliated with VTU)
* **Degree:** B.E. in Computer Science & Engineering (2025 &ndash; 2029 &bull; 2nd Year, 3rd Semester)
* **Secondary School (Class X):** Hassan Public School, Sathyamangala, Hassan (CBSE &bull; Completed 2023)
* **Location:** Hassan, Karnataka, India
* **Email:** `js.c.ojaswi01@gmail.com`
* **GitHub:** [github.com/js-chinmayaojaswi](https://github.com/js-chinmayaojaswi)
* **LinkedIn:** [linkedin.com/in/j-s-chinmaya-ojaswi-103889364](https://www.linkedin.com/in/j-s-chinmaya-ojaswi-103889364)

---

## 🚀 How to Run Locally

Simply double-click [`index.html`](file:///c:/Users/jscoj/OneDrive/Desktop/portfolio/index.html) or run in PowerShell:
```powershell
Start-Process "c:\Users\jscoj\OneDrive\Desktop\portfolio\index.html"
```

---

## 🌐 Instant GitHub Deployment & Sync

To update your live portfolio anytime in the future:
```bash
git add .
git commit -m "update: portfolio improvements"
git push origin main
```
GitHub Actions will automatically build and publish the changes to your live site at `https://js-chinmayaojaswi.github.io/Portfolio/`!
