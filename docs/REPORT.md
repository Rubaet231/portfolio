# Personal Portfolio Website – Assignment Report

---
**Cover Page**

| | |
|---|---|
| **Name** | Rubaet Khandokar |
| **Student ID** | ___ |
| **Batch / Section** | ___ / ___ |
| **Course** | ___ (Course code: ___) |
| **Course Teacher** | ___ |
| **Submission Date** | ___ |

File name: `StudentID_Portfolio.pdf`

---

## 1. Introduction

This report describes my personal portfolio website, a multi-page site I built with HTML5, CSS3,
JavaScript, jQuery and AJAX, and deployed on Netlify. The site presents my education, skills,
research and projects, achievements and certificates, and has a contact form so that visitors
can reach me. All content is my own and comes from my CV.

## 2. Part-A: Planning & Website Structure

### 2.1 What the website is, audience and design choice
The website is my online CV as a Computer Science & Engineering student and software developer.
The **target audience** is recruiters, internship providers, research supervisors, my teachers
and classmates. I chose a clean dark-blue and white design with one accent colour (sky blue)
because it looks professional, keeps text easy to read, and puts focus on content. A sticky top
menu lets visitors reach any page in one click, and the layout is responsive so it works on phones.

### 2.2 Sitemap

```
                    ┌──────────────┐
                    │  Home        │ index.html
                    └──────┬───────┘
        ┌───────────┬──────┴──────┬───────────────┐
        ▼           ▼             ▼               ▼
   ┌────────┐  ┌──────────┐  ┌──────────────┐  ┌─────────┐
   │ About  │  │ Projects │  │ Achievements │  │ Contact │
   └────────┘  └──────────┘  └──────────────┘  └─────────┘
 about.html   projects.html  achievements.html contact.html
```
Every page has the same navigation bar, so each page links to all other pages.
*(Tip: redraw this in draw.io or on paper and insert the image.)*

### 2.3 Wireframe of the Home page

```
+------------------------------------------------------------+
| Rubaet.dev        Home  About  Projects  Achievements  Contact |
+------------------------------------------------------------+
|  Hello, I am                         |   _________         |
|  RUBAET KHANDOKAR                    |  /         \        |
|  <typing role text>                  | |  PHOTO    |       |
|  short introduction...               |  \_________/        |
|  [View My Work]  [Contact Me]        |                     |
+------------------------------------------------------------+
|  WHAT I DO                                                  |
|  [Software Dev]   [CV Research]   [Web Development]         |
+------------------------------------------------------------+
|  HIGHLIGHTS  • GPA 5.00  • TAKE-OFF finalist  • ...         |
+------------------------------------------------------------+
|  © 2026 Rubaet Khandokar · GitHub · DIU                     |
+------------------------------------------------------------+
```

### 2.4 Purpose of each page
- **Home (index.html):** First impression – name, photo, role, short intro, what I do and highlights.
- **About (about.html):** Detailed profile – education table, skill bars, tools, leadership roles with photos.
- **Projects (projects.html):** Shows my projects as cards loaded with AJAX, with category filter buttons and a summary table.
- **Achievements (achievements.html):** Lists awards and scholarships and shows certificate images in a clickable gallery.
- **Contact (contact.html):** Contact details and a validated contact form that sends messages through Netlify Forms.

## 3. Part-B: Implementation

### 3.1 Structure and requirements checklist
| Requirement | Where it is used |
|---|---|
| 3+ linked pages, common menu | 5 pages, same `<nav>` on each |
| doctype, html, head, title, body | Every page |
| Headings h1–h3, paragraphs | All pages |
| Ordered list `<ol>` | About (leadership), Achievements (awards) |
| Unordered list `<ul>` | Home (highlights), About (tools), Contact |
| Images | Profile photo, lab/club photos, certificates |
| Internal links | Navigation, "View My Work", "See all achievements" |
| External links | GitHub, DIU website (open in new tab) |
| Table | Education table (About), Project summary (Projects) |
| Form | Contact page |
| jQuery + AJAX | `js/main.js`, `data/projects.json` |

### 3.2 Code snippet explanations

**Snippet 1 – Common navigation (HTML)**
```html
<nav class="container nav">
  <a href="index.html" class="logo">Rubaet<span>.dev</span></a>
  <button class="menu-toggle" aria-label="Open menu">&#9776;</button>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li> ...
  </ul>
</nav>
```
*What it does:* creates the menu that appears on every page. *Why:* `<nav>` tells browsers and
screen readers this is the main navigation, and a `<ul>` of links is the standard way to mark
up a menu. The ☰ button opens the menu on small screens.

**Snippet 2 – Loading projects with AJAX (jQuery)**
```js
$.ajax({ url: "data/projects.json", dataType: "json" })
  .done(function (projects) {
    $.each(projects, function (i, p) {
      $grid.append('<article class="card" data-category="' + p.category + '">' + ... );
    });
  })
  .fail(function () { $grid.html("<p>Sorry, projects could not be loaded.</p>"); });
```
*What it does:* reads my project list from a JSON file and builds a card for each project.
*Why:* data is kept separate from the page, so to add a new project I only edit the JSON file.
The `.fail()` part shows a friendly message if loading fails.

**Snippet 3 – Contact form validation (jQuery)**
```js
$("#contact-form").on("submit", function (e) {
  e.preventDefault();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#email").val())) { $("#email-err").show(); ok = false; }
  ...
  $.ajax({ url: "/", type: "POST", data: $f.serialize() })
    .done(function () { $("#form-msg").text("Thank you! Your message has been sent."); });
});
```
*What it does:* checks name, email, radio, dropdown and message before sending, then submits the
form to Netlify with AJAX so the page does not reload. *Why:* it stops empty or wrong data and
gives the user instant feedback.

**Snippet 4 (bonus) – Responsive layout (CSS)**
```css
@media (max-width: 800px) {
  .nav-links { display: none; flex-direction: column; }
  .nav-links.open { display: flex; }
  .hero-grid, .two-col { grid-template-columns: 1fr; }
}
```
*What it does:* on screens smaller than 800px, the menu collapses and two-column layouts become one column.

### 3.3 Screenshots
*(Insert your own screenshots here: Home, About, Projects, Achievements, Contact – desktop view,
plus one mobile view.)*

## 4. Part-C: Form, Testing & Justification

### 4.1 Contact form
The form on `contact.html` contains: text input (name), email input, radio buttons (I am a
Recruiter / Student / Other), a dropdown `<select>` (subject), a `<textarea>` (message), a
checkbox (send updates) and a submit button. It uses Netlify Forms (`data-netlify="true"`), so
submissions appear in my Netlify dashboard without writing a server.

### 4.2 Browser testing
| Test | Google Chrome | Mozilla Firefox | Microsoft Edge |
|---|---|---|---|
| Layout & colours | Correct | Correct | Correct |
| Navigation links | Work | Work | Work |
| Typing effect / animations | Smooth | Smooth | Smooth |
| AJAX projects load | Works (on Netlify / local server) | Works | Works |
| Form validation messages | Shown | Shown | Shown |
| Mobile view (DevTools) | Menu collapses | Menu collapses | Menu collapses |

*Observation:* the site looked almost the same in all browsers because I used standard CSS
(Flexbox and Grid). Small differences: Firefox shows form controls (dropdown, radio) with its own
style, and focus outlines look slightly different. *(Edit with what you actually saw.)*

### 4.3 Problems faced and solutions
1. **AJAX did not work when opening the file directly.** When I double-clicked `projects.html`,
   the projects did not load because browsers block AJAX requests on `file://` pages.
   *Solution:* I tested with a local server (VS Code Live Server) and on Netlify, where it works.
   I also added a `.fail()` message.
2. **Menu did not fit on mobile screens.** The five links overflowed on small phones.
   *Solution:* I added a media query and a ☰ button that toggles the menu with jQuery.
3. **Form submitted without proper data.** At first the form could be sent empty.
   *Solution:* I added jQuery validation with error messages for each field.

### 4.4 Justification of design choices
- I used **semantic tags** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
  instead of only `<div>`s, because they make the code easier to read and help search engines and
  screen readers understand the page.
- I used a **`<table>`** only for real tabular data (education, project summary), not for layout;
  layout is done with CSS Grid/Flexbox, which is the modern and responsive approach.
- I used **`<ol>`** where order matters (awards, roles) and **`<ul>`** where it does not.
- I used **one external CSS file and one JS file** for all pages, so the design stays consistent and is easy to change.
- **jQuery** makes DOM changes, events and AJAX short and readable, and we learned it in class.
- **Netlify** gives free hosting with HTTPS and built-in form handling.

### 4.5 Future improvements
- Add a dark/light theme switch.
- Add a blog page about my research.
- Add live demo and GitHub links for every project.
- Improve accessibility (keyboard support for the lightbox) and compress images for faster loading.
- Use a framework like React for reusable components.

## 5. Conclusion
Building this portfolio helped me practise HTML structure, CSS layout, jQuery, AJAX and form
handling, and deploying a real site. The finished website gives a clear, professional picture of
my education, skills, research and achievements, and I can keep it updated as I grow.

## 6. References
- GitHub repository: https://github.com/Rubaet231/___
- Live demo: https://____.netlify.app
- jQuery documentation: https://api.jquery.com/
- MDN Web Docs: https://developer.mozilla.org/
- Netlify Forms documentation: https://docs.netlify.com/forms/setup/
