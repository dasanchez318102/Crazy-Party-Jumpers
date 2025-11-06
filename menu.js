// menu.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");

  // Hamburger show/hide
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }

  // Find top-level anchors that have a submenu (a + ul)
  const parentLinks = Array.from(
    document.querySelectorAll("#nav-menu > li > a")
  ).filter(a => a.nextElementSibling && a.nextElementSibling.tagName === "UL");

  // Add helper class for caret styling
  parentLinks.forEach(a => a.parentElement.classList.add("has-submenu"));

  // Helper to know if we're in mobile mode (matches your CSS breakpoint)
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  // Close all other submenus (optional, for accordion behavior)
  const closeSiblings = (li) => {
    const siblings = Array.from(li.parentElement.children).filter(el => el !== li);
    siblings.forEach(sib => {
      sib.classList.remove("open");
      const link = sib.querySelector(":scope > a");
      if (link) link.setAttribute("aria-expanded", "false");
    });
  };

  // Tap-to-toggle behavior on mobile
  parentLinks.forEach(a => {
    const li = a.parentElement;

    // a11y
    a.setAttribute("aria-haspopup", "true");
    a.setAttribute("aria-expanded", "false");

    a.addEventListener("click", (e) => {
      if (!isMobile()) {
        // Desktop: let hover CSS handle it; allow normal navigation
        return;
      }

      // Mobile: first tap opens submenu, second tap navigates
      if (!li.classList.contains("open")) {
        e.preventDefault();               // prevent navigation on first tap
        closeSiblings(li);                // optional: close others
        li.classList.add("open");
        a.setAttribute("aria-expanded", "true");
      } else {
        // already open -> allow navigation
      }
    });
  });

  // When resizing to desktop, clean up mobile state
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      document.querySelectorAll("#nav-menu li.open").forEach(li => {
        li.classList.remove("open");
        const link = li.querySelector(":scope > a");
        if (link) link.setAttribute("aria-expanded", "false");
      });
      // ensure menu is visible on desktop even if user hid it on mobile
      menu.classList.remove("show");
    }
  });
});
;