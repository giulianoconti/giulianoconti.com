function closeMenu() {
  toggle.checked = false;
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-menu-open");
}

function openMenu() {
  toggle.checked = true;
  menuButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("nav-menu-open");
}
