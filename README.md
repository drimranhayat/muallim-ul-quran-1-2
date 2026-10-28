# معلم القرآن — امتحانی تیاری (Muallim-ul-Quran Exam Prep)

A static, lesson-wise exam-preparation website for **معلم القرآن** by Dr. Ubaid-ur-Rahman Bashir.
A landing page lists both books; each book opens its own complete, lesson-by-lesson content.

| Book | Content | Lessons |
|------|---------|---------|
| **حصہ اول** (`book1/`) | Unit 1 – easy Quranic words · Unit 2 – prefix letters · Unit 3 – words with their nature & relation, sample paper (pp. 1–103) | 44 |
| **حصہ دوم** (`book2/`) | Unit 4 – attached pronouns & particles · Unit 5 – plural pronouns, demonstratives, Quranic idioms, model papers (pp. 2–113) | 42 |

* Arabic text → **Amiri**; Urdu text → **Jameel Noori Nastaleeq** (both bundled in `assets/fonts/`, no CDN needed)
* Per lesson: **Study** · **Exercises** (tap-to-reveal answers) · **Quiz** · **Flashcards**
* **Colour-coded languages**: Arabic (green, fully vowelled), Urdu (crimson), English (blue)
* **⚙ Settings (ترتیبات)** – the user controls the whole site: harakat / English / Urdu on-off, auto-show answers, page / Arabic / Urdu / English sizes, line spacing, card and page width, the three language colours, theme (auto / light / dark), default quiz length, and reset of settings or progress. Settings are saved in the browser and shared by the landing page and both books.
* **Exam practice** page in each book: random MCQs (6 question types, Arabic ↔ Urdu ↔ English)
* Progress ("lesson done") is stored per book in `localStorage`; dark mode; mobile friendly; printable

## Run locally
No build step:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Publish on GitHub Pages
1. Push this folder to a GitHub repo (branch `main`).
2. *Settings → Pages → Source: **GitHub Actions*** (`.github/workflows/pages.yml` deploys automatically), or *Deploy from a branch → main / (root)*.

## Structure
```
index.html              landing page (both books)
assets/css/style.css    styles + @font-face
assets/js/app.js        router, renderer, quiz, flashcards (shared)
assets/js/settings.js   user settings panel (shared)
assets/fonts/           Amiri (OFL), Jameel Noori Nastaleeq
book1/ , book2/         index.html + data/ (unit files, en.js English meanings, meta.js)
```
Lesson kinds: *vocab*, *plural*, *grammar* (rule + phrase groups + exercises). Add or fix content by editing the data files only.

## Important notes on content
* The books leave most meanings and all exercise answers blank. The **Urdu meanings, translations and answers, and all English meanings, were added by the site author** for study and should be checked against the books / your teacher before the exam.
* Content was transcribed from scanned pages. Some low-resolution items in **Book 2** (notably lessons 8, 11, 16, 17, the blurry verses on p. 111, a few words of the model-paper word list such as سُعُرٌ and الْغَابِرِينَ, and one item in lesson 22) were read with best effort and may differ slightly from print.
* **Page 101 of the Book 1 scan is missing**, so lesson 9 of Unit 3 is only a placeholder built from its neighbours.
* The Jameel Noori Nastaleeq font file is large (~9.6 MB); the first load may take a moment.

## Credits & licences
Book content © its author/publisher — used here only as study notes. Amiri: SIL OFL 1.1. Jameel Noori Nastaleeq: see the font's own licence.
