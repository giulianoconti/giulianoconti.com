(function () {
  var toggle = document.getElementById("nav-toggle");
  var menu = document.querySelector(".nav-container-menu");
  var menuButton = document.querySelector(".nav-container-button");
  var menuLinks = document.querySelectorAll(".nav-container-menu-link");

  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.checked = false;
    setAriaExpanded(false);
    document.body.classList.remove("nav-menu-open");
  }

  function setAriaExpanded(open) {
    if (menuButton) menuButton.setAttribute("aria-expanded", open);
  }

  // Sync aria-expanded and body class with checkbox state
  toggle.addEventListener("change", function () {
    setAriaExpanded(toggle.checked);
    if (toggle.checked) {
      document.body.classList.add("nav-menu-open");
    } else {
      document.body.classList.remove("nav-menu-open");
    }
  });

  // Close when clicking a menu link (same-page anchor or navigation)
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.checked) closeMenu();
  });

  // Initial state
  setAriaExpanded(!!toggle.checked);
})();
