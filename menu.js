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





  // Get items that have dropdowns
  const submenuItems =
    document.querySelectorAll(".has-submenu");


  // Loop through each dropdown
  submenuItems.forEach((item) => {

    const link =
      item.querySelector(":scope > a");


    link.addEventListener("click", (event) => {

      // Only do this on mobile
      if (window.innerWidth <= 768) {

        event.preventDefault();

        item.classList.toggle("open");

      }

    });

  });




  // these are button for selected amount of guest
const guest50 = document.querySelector("#guest50");
const guest100 = document.querySelector("#guest100");

// these are tighed to the pricing for each package
const essentialPrice = document.querySelector("#essential");
const signaturePrice = document.querySelector("#signature")
const luxuryPrice = document.querySelector("#luxury");

// 3. SELECT ALL GUEST COUNTS

const guestCounts = document.querySelectorAll(".guest-count");
const guestButtons = document.querySelectorAll(".guest-btn");

const packages = {
  essential: {
    50: 1200,
    100: 1500,
  },

  signature: {
    50: 2000,
    100: 2500,
  },

  luxury: {
    50: 3000,
    100: 3700,
  }
};



function updatePrices(guests) {

  essentialPrice.textContent =
    "$" + packages.essential[guests].toLocaleString();

  signaturePrice.textContent =
    "$" + packages.signature[guests].toLocaleString();

  luxuryPrice.textContent =
    "$" + packages.luxury[guests].toLocaleString();


  // Update all three guest counts

  guestCounts.forEach((count) => {
    count.textContent = guests;
  });


  // Remove active class from all buttons

  guestButtons.forEach((button) => {
    button.classList.remove("active");
  });


  // Add active class to selected button

  if (guests === 50) {
    guest50.classList.add("active");
  }

  else if (guests === 100) {
    guest100.classList.add("active");
  }


}


// 6. BUTTON EVENT LISTENERS

guest50.addEventListener("click", () => {
  updatePrices(50);
});

guest100.addEventListener("click", () => {
  updatePrices(100);
});



