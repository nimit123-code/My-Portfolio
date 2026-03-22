# CSS Enhancement Assignment Report
**Name**: Nimit Goel  
**GitHub Repository Link**: [Insert Your GitHub Repo Link Here]

## Overview of Improvements

In this assignment, I applied modern CSS methodologies and principles to completely redesign my personal resume website into a premium, "$100k" style professional portfolio. The goal was to establish a bold, startup-operator persona while demonstrating proficiency in layout structuring, responsive design, and CSS interactivity.

Here are the key improvements made:

### 1. Typography & Readability
- **Google Fonts Integration**: Replaced standard system fonts with two modern sans-serif typefaces from Google Fonts. Used **'Outfit'** for bold, clean headings, and **'Inter'** for highly legible body text.
- **Visual Hierarchy**: Implemented consistent font sizing (`clamp()` for fluid typography), distinct font weights, and letter-spacing to separate the hero section, section titles, reading text, and subtle labels (eyebrows).

### 2. Color Palette & Theming
- **Premium Dark Theme**: Designed a deep dark background (`#050505`) with a slightly lighter surface background (`#0a0a0a`) instead of a harsh pure black.
- **Gradient Accents**: Utilized CSS pseudo-elements and text-masking (`-webkit-background-clip: text`) to apply vibrant indigo, purple, and teal linear gradients to specific text spans, providing a high-end tech/startup aesthetic.
- **Consistent CSS Variables**: Managed the entire color scheme via a `:root` variable configuration to maintain consistency throughout the stylesheets and enable easy global theme updates.

### 3. Selectors & Layout Positioning
- **Flexbox & CSS Grid**: Extensively used CSS Flexbox for aligning the navigation bar items and contact cards. Implemented CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))`) to create a perfectly responsive project/experience card layout that self-adjusts based on viewport width.
- **Semantic Selectors**: Structured CSS rules cleanly using class selectors (e.g., `.project-card`, `.timeline-item`) and avoided deep nesting to keep specificity manageable and the code DRY.
- **Fixed & Absolute Positioning**: Added a fixed navigation bar with a glassmorphic background that triggers on scroll. Also positioned an absolute hidden Three.js `<canvas>` layer for a 3D background behind the hero section content.

### 4. Advanced Interactivity & Visual Effects (The "$100k" Look)
- **Glassmorphism**: Applied `backdrop-filter: blur(16px)` combined with semi-transparent backgrounds and subtle borders (`rgba(255, 255, 255, 0.08)`) on project cards and contact sections to create frosted glass aesthetics.
- **Custom Cursor Configuration**: Designed a dual custom cursor (`.cursor-dot` and `.cursor-outline`) that replaces the default pointer. The CSS hides the native cursor (`cursor: none;`) and Javascript updates the absolute position of our custom CSS cursors.
- **3D Animations & Data Selectors**: Included 3D tilt and rotate transformations on project cards triggered on mousemove, paired with CSS transitions for smooth resting states. Also imported a `three.js` particle background script as a dynamic touch to the landing hero component.

### 5. Responsive Design
- Built following a mobile-first approach, using media queries (`@media (max-width: 768px)`, etc.) to toggle the navigation links behind a flex-based hamburger menu.
- Adjusted padding, font-sizes, and layout grids (turning 2-column grids into 1-column grids) to gracefully degrade the UI on smartphones and tablets.

## Conclusion
The redesigned HTML & CSS structure meets all assignment requirements, effectively demonstrating modern CSS layout capabilities, thematic consistency, and advanced interactive selectors to massively enhance the resume website’s user experience.

## Resume PDF (GitHub — no `assets/` folder needed)
Put **`resume.pdf` in the same folder as `index.html`** (repository root). The download button uses `href="resume.pdf"`; on GitHub Pages, `main.js` rewrites it to `/<repo-name>/resume.pdf` automatically. You only need to upload/commit that single PDF file with your site files.