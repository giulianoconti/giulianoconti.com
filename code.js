const aboutAge = document.querySelector(".about_age"),
  aboutCity = document.querySelector(".about_city"),
  aboutLink = document.querySelector("#about_link"),
  aboutNacionality = document.querySelector(".about_nacionality"),
  aboutName = document.querySelector(".about_name"),
  aboutSection = document.querySelector("#about"),
  aboutText = document.querySelector(".about_text"),
  aboutExperienceTitle = document.querySelector(".about_experience_title"),
  aboutExperienceTextBold = document.querySelector(".about_experience_text_bold"),
  aboutExperienceText = document.querySelector(".about_experience_text"),
  aboutTitle = document.querySelector(".about_title"),
  contactBtn = document.querySelector(".contact_btn"),
  contactForm = document.querySelector(".contact_form"),
  contactInput = document.querySelector(".contact_input"),
  contactLink = document.querySelector("#contact_link"),
  contactMessage = document.querySelector(".contact_message"),
  contactStatus = document.querySelector(".contact_status"),
  contactTextarea = document.querySelector(".contact_textarea"),
  homeBtn = document.querySelector(".home_btn"),
  homeBtnText = document.querySelector(".home_btn_text"),
  homeLink = document.querySelector("#home_link"),
  homeSubtitle = document.querySelector(".home_subtitle"),
  menu = document.querySelector(".nav_list"),
  menuBtn = document.querySelector(".menu_btn"),
  myAge = document.getElementById("myAge"),
  navbarAbout = document.querySelector(".navbar_about"),
  navbarContact = document.querySelector(".navbar_contact"),
  navbarHome = document.querySelector(".navbar_home"),
  navbarProjects = document.querySelector(".navbar_projects"),
  navBtnDarkmode = document.querySelector(".nav_btn_darkmode"),
  navOptions = document.querySelectorAll(".nav_option"),
  navOptions_list = document.querySelector(".nav_options_list"),
  navSelectImg = document.querySelector(".nav_select_img"),
  navSelectSpan = document.querySelector(".nav_select_span"),
  projectsButton = document.getElementsByClassName("projects_button"),
  projectsButtonNext = projectsButton[1],
  projectsButtonPrevious = projectsButton[0],
  projectsLink = document.querySelector("#projects_link"),
  projectsList = document.querySelector(".projects_list"),
  projectsSection = document.querySelector("#projects"),
  projectsTitle = document.querySelector(".projects_title"),
  projectsTouchScrollAnimation = document.querySelector(".projects_touch_scroll_animation");

let currentX,
  isDown = false,
  scrollLeft,
  startX,
  showMenu = false;

const languages = {
  en: {
    navbar: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      languages: "Languages",
      language: "English",
      darkMode: "Dark Mode",
    },
    home: {
      subtitle: "Web developer",
      downloadBtn: "Download Resume",
    },
    about: {
      title: "About Me",
      name: "Name:",
      age: "Age:",
      nationality: "Nationality:",
      city: "City:",
      description:
        "I started studying programming in 2021, starting with HTML, CSS, and JavaScript.<br /> I created small projects with arduino using C++.<br /> In the year 2022 I mainly focused on Front-End development using React.<br /> I like programming, designing in Blender, creating 3D plans in SketchUp, going out with friends, playing paddle tennis, video games and riding my bike.",
      experienceTitle: "Experience",
      experienceTextBold: "FRONTEND DEVELOPER SSR | XLABS | 2022 - CURRENT",
      experienceText:
        "I developed reusable components. I designed and updated designs. I solved technical problems. I Produced cross-browser compatible websites.",
    },
    projects: {
      title: "My projects",
      github: "Project github",
      web: "Project website",
      previous: "Previous",
      next: "Next",
    },
    contact: {
      emailInput: "example@gmail.com",
      message: "Message",
      messageInput: "Hello, I would like to contact you for...",
      statusTextOk: "Thanks for your submission!",
      statusTextError: "Oops! There was a problem submitting your form.",
      send: "Send",
    },
  },
  es: {
    navbar: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
      languages: "Idiomas",
      language: "Español",
      darkMode: "Modo Oscuro",
    },
    home: {
      subtitle: "Desarrollador Web",
      downloadBtn: "Descargar CV",
    },
    about: {
      title: "Sobre Mí",
      name: "Nombre:",
      age: "Edad:",
      nationality: "Nacionalidad:",
      city: "Ciudad:",
      description:
        "Empecé a estudiar programación en 2021, iniciando por HTML, CSS y JavaScript.<br /> Creé proyectos pequeños con arduino utilizando C++.<br /> En el año 2022 me enfoqué principalmente en el desarrollo Front-End usando React.<br /> Me gusta programar, diseñar en Blender, crear planos 3D en SketchUp, juntarme con amigos, jugar padel, los videojuegos y andar en bici.",
      experienceTitle: "Experiencia",
      experienceTextBold: "DESARROLLADOR FRONTEND SSR | XLABS | 2022 - ACTUAL",
      experienceText:
        "Desarrollé componentes reutilizables. Diseñé y actualicé diseños. Resolví problemas técnicos. Produje sitios web compatibles con múltiples navegadores.",
    },
    projects: {
      title: "Mis Proyectos",
      github: "Github del proyecto",
      web: "Web del proyecto",
      previous: "Anterior",
      next: "Siguiente",
    },
    contact: {
      emailInput: "ejemplo@gmail.com",
      message: "Mensaje:",
      messageInput: "Buenas, me gustaría contactar contigo para...",
      statusTextOk: "¡Gracias por tu envío!",
      statusTextError: "¡Ups! Hubo un problema al enviar tu formulario.",
      send: "Enviar",
    },
  },
  pt: {
    navbar: {
      home: "Início",
      about: "Sobre mim",
      projects: "Projetos",
      contact: "Contato",
      languages: "Idiomas",
      language: "Português",
      darkMode: "Modo Escuro",
    },
    home: {
      subtitle: "Desenvolvedor Web",
      downloadBtn: "Baixar CV",
    },
    about: {
      title: "Sobre Mim",
      name: "Nome:",
      age: "Idade:",
      nationality: "Nacionalidade:",
      city: "Cidade:",
      description:
        "Comecei a estudar programação em 2021, iniciando por HTML, CSS e JavaScript.<br /> Criei projetos pequenos com arduino utilizando C++.<br /> No ano de 2022 me concentrei principalmente no desenvolvimento Front-End usando React.<br /> Gosto de programar, desenhar no Blender, criar planos 3D no SketchUp, sair com amigos, jogar padel, jogos de vídeo e andar de bicicleta.",
      experienceTitle: "Experiência",
      experienceTextBold: "DESENVOLVEDOR FRONTEND SSR | XLABS | 2022 - ATUAL",
      experienceText:
        "Desenvolvi componentes reutilizáveis. Desenhei e atualizei projetos. Resolvi problemas técnicos. Produzi sites compatíveis com vários navegadores.",
    },
    projects: {
      title: "Meus Projetos",
      github: "Github do projeto",
      web: "Web do projeto",
      previous: "Anterior",
      next: "Próximo",
    },
    contact: {
      emailInput: "exemplo@gmail.com",
      message: "Mensagem:",
      messageInput: "Olá, gostaria de entrar em contato com você para...",
      statusTextOk: "Obrigado pelo seu envio!",
      statusTextError: "Ops! Houve um problema ao enviar seu formulário.",
      send: "Enviar",
    },
  },
};

const activeMenu = () => {
  // This function adds the active class to the menu item that corresponds to the section that is currently visible on the screen
  if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 100) {
    // If the scroll is at the bottom of the page, the contact menu item is active
    removeAllActive();
    contactLink.classList.add("active");
  } else if (window.scrollY < aboutSection.offsetTop - aboutSection.offsetTop / 3) {
    // If the scroll is at the top of the page, the home menu item is active
    removeAllActive();
    homeLink.classList.add("active");
  } else if (window.scrollY < projectsSection.offsetTop - projectsSection.offsetTop / 3) {
    // If the scroll is in the about section, the about menu item is active
    removeAllActive();
    aboutLink.classList.add("active");
  } else {
    // Otherwise, the projects menu item is active
    removeAllActive();
    projectsLink.classList.add("active");
  }
};

const removeAllActive = () => {
  // This function removes the active class from all menu items
  const menuItems = document.querySelectorAll(".nav_link");
  menuItems.forEach((item) => item.classList.remove("active"));
};

const toggleMenu = () => {
  // If window is less than 790px wide, and menu is not shown, show menu
  if (window.innerWidth <= 790 && !showMenu) {
    menu.classList.add("nav_list_active");
    menuBtn.classList.add("d_none");
    showMenu = true;
  } else {
    // Otherwise, hide menu
    menu.classList.remove("nav_list_active");
    menuBtn.classList.remove("d_none");
    showMenu = false;
  }
  navOptions_list.classList.contains("activeLanguage") && showOrHideOptions();
};

const showOrHideOptions = () => {
  // Show & hide options list
  const isActive = navOptions_list.classList.contains("activeLanguage");
  navOptions_list.classList.toggle("activeLanguage", !isActive);
  navSelectImg.src = isActive ? "/assets/arrow_down.svg" : "/assets/arrow_up.svg";
};

const removeMenuAndLanguage = () => {
  // If menu is shown and the window is narrow
  if (showMenu && window.innerWidth <= 790) {
    // Hide the menu
    menu.classList.remove("nav_list_active");
    menuBtn.classList.remove("d_none");
    showMenu = false;
  }
  if (navOptions_list.classList.contains("activeLanguage")) {
    // If options list is shown, hide it
    navOptions_list.classList.remove("activeLanguage");
    navSelectImg.src = "/assets/arrow_down.svg";
  }
};

const handleDarkModeBtn = () => {
  // This function toggles the dark mode
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  localStorage.setItem("darkMode", !isDarkMode);
  handleDarkModeSaved();
};

const handleDarkModeSaved = () => {
  // This function checks if dark mode is saved in localStorage
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  // Add or remove dark class to html
  document.querySelector("html").classList.toggle("dark", isDarkMode);
  // Change theme-color meta tag
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDarkMode ? "#000000" : "#ffffff");
};

const handleLang = (lang = "es") => {
  // This function changes the language of the page
  localStorage.setItem("language", lang);
  aboutAge.textContent = languages[lang].about.age;
  aboutCity.textContent = languages[lang].about.city;
  aboutExperienceText.innerHTML = languages[lang].about.experienceText;
  aboutExperienceTextBold.innerHTML = languages[lang].about.experienceTextBold;
  aboutExperienceTitle.textContent = languages[lang].about.experienceTitle;
  aboutNacionality.textContent = languages[lang].about.nationality;
  aboutName.textContent = languages[lang].about.name;
  aboutText.innerHTML = languages[lang].about.description;
  aboutTitle.textContent = languages[lang].about.title;
  contactBtn.textContent = languages[lang].contact.send;
  contactBtn.title = languages[lang].contact.send;
  contactInput.placeholder = languages[lang].contact.emailInput;
  contactMessage.textContent = languages[lang].contact.message;
  contactTextarea.placeholder = languages[lang].contact.messageInput;
  homeBtn.title = languages[lang].home.downloadBtn;
  homeBtnText.textContent = languages[lang].home.downloadBtn;
  homeSubtitle.textContent = languages[lang].home.subtitle;
  navbarAbout.textContent = languages[lang].navbar.about;
  navbarAbout.title = languages[lang].navbar.about;
  navbarContact.textContent = languages[lang].navbar.contact;
  navbarContact.title = languages[lang].navbar.contact;
  navbarHome.textContent = languages[lang].navbar.home;
  navbarHome.title = languages[lang].navbar.home;
  navbarProjects.textContent = languages[lang].navbar.projects;
  navbarProjects.title = languages[lang].navbar.projects;
  navBtnDarkmode.title = languages[lang].navbar.darkMode;
  navSelectSpan.textContent = languages[lang].navbar.language;
  navSelectSpan.title = languages[lang].navbar.languages;
  projectsButtonNext.title = languages[lang].projects.next;
  projectsButtonPrevious.title = languages[lang].projects.previous;
  projectsTitle.textContent = languages[lang].projects.title;
  document.querySelector("html").lang = lang;
  navOptions_list.classList.contains("activeLanguage") && showOrHideOptions();
  fetchProjects(lang);
};

const handleLangSaved = () => {
  // This function gets the language saved in localStorage
  handleLang(localStorage.getItem("language") || "es");
};

const handleMyAge = () => {
  // Create date objects for today and my birthday
  const today = new Date();
  const birthDate = new Date("2001-03-07");

  // Calculate my age
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Display my age
  myAge.innerHTML = age;
};

const fetchProjects = async (lang = "es") => {
  // This function fetches the projects from the API
  const response = await fetch(`https://giulianoconti.github.io/api/myProjects-${lang}.json`);
  const data = await response.json();
  projectsList.innerHTML = "";
  // For each project, create a div and append it to the projects list
  data.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.innerHTML = `
    <img class="project_img" src="${project.img}" alt="${project.title}"></img>
    <div class="project_info">
      <p class="project_number">${project.id} / ${data.length}</p>
      ${
        project.technologies
          ? `
          <div class="project_technologies">
            ${project.technologies
              .map((tech) => `<img class="project_technology_img" src="${tech.img}" title="${tech.title}" alt="${tech.title}"></img>`)
              .join("")}
          </div>
          `
          : ""
      }
      <h3 class="project_title">${project.title}</h3>
      <p class="project_description">${project.description}</p>
      <div class="project_links">
        <a class="project_link" href="${project.hrefGithub}" title="Github" target="_blank" rel="noreferrer" aria-label="link to ${
      project.title
    } github repository">
          <svg class="project_link_svg" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            ></path>
          </svg>
          ${languages[lang].projects.github}
        </a>
        ${
          project.hrefWeb
            ? `
            <a class="project_link" href="${project.hrefWeb}" title="Web" target="_blank" rel="noreferrer" aria-label="link to ${project.title} website">
              <svg class="project_link_svg" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M3.51211712,15 L8.17190229,15 C8.05949197,14.0523506 8,13.0444554 8,12 C8,10.9555446 8.05949197,9.94764942 8.17190229,9 L3.51211712,9 C3.18046266,9.93833678 3,10.9480937 3,12 C3,13.0519063 3.18046266,14.0616632 3.51211712,15 L3.51211712,15 Z M3.93551965,16 C5.12590433,18.3953444 7.35207678,20.1851177 10.0280093,20.783292 C9.24889451,19.7227751 8.65216136,18.0371362 8.31375067,16 L3.93551965,16 L3.93551965,16 Z M20.4878829,15 C20.8195373,14.0616632 21,13.0519063 21,12 C21,10.9480937 20.8195373,9.93833678 20.4878829,9 L15.8280977,9 C15.940508,9.94764942 16,10.9555446 16,12 C16,13.0444554 15.940508,14.0523506 15.8280977,15 L20.4878829,15 L20.4878829,15 Z M20.0644804,16 L15.6862493,16 C15.3478386,18.0371362 14.7511055,19.7227751 13.9719907,20.783292 C16.6479232,20.1851177 18.8740957,18.3953444 20.0644804,16 L20.0644804,16 Z M9.18440269,15 L14.8155973,15 C14.9340177,14.0623882 15,13.0528256 15,12 C15,10.9471744 14.9340177,9.93761183 14.8155973,9 L9.18440269,9 C9.06598229,9.93761183 9,10.9471744 9,12 C9,13.0528256 9.06598229,14.0623882 9.18440269,15 L9.18440269,15 Z M9.3349823,16 C9.85717082,18.9678295 10.9180729,21 12,21 C13.0819271,21 14.1428292,18.9678295 14.6650177,16 L9.3349823,16 L9.3349823,16 Z M3.93551965,8 L8.31375067,8 C8.65216136,5.96286383 9.24889451,4.27722486 10.0280093,3.21670804 C7.35207678,3.81488234 5.12590433,5.60465556 3.93551965,8 L3.93551965,8 Z M20.0644804,8 C18.8740957,5.60465556 16.6479232,3.81488234 13.9719907,3.21670804 C14.7511055,4.27722486 15.3478386,5.96286383 15.6862493,8 L20.0644804,8 L20.0644804,8 Z M9.3349823,8 L14.6650177,8 C14.1428292,5.03217048 13.0819271,3 12,3 C10.9180729,3 9.85717082,5.03217048 9.3349823,8 L9.3349823,8 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z"
                ></path>
              </svg>
              ${languages[lang].projects.web}
            </a>
            `
            : ""
        }
      </div>
    </div>
  `;
    projectsList.appendChild(projectDiv);
  });
};

const handleSubmit = async (e) => {
  // Prevent the default form submit behavior
  e.preventDefault();
  const currentLanguage = localStorage.getItem("language") || "es";
  // Get the form data
  const data = new FormData(e.target);
  // Send a POST request
  try {
    const response = await fetch(e.target.action, {
      method: contactForm.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok) {
      // If successful, show the success message and reset the form
      contactStatus.innerHTML = languages[currentLanguage].contact.statusTextOk;
      contactForm.reset();
    } else {
      // If not successful, show the error message
      contactStatus.innerHTML = languages[currentLanguage].contact.statusTextError;
    }
  } catch (error) {
    // If there is an error, show the error message
    contactStatus.innerHTML = languages[currentLanguage].contact.statusTextError;
  }
};

const removeScrollAnimationAndEventListener = () => {
  // Remove div with project_touch_scroll_animation class
  projectsTouchScrollAnimation.classList.add("d_none");
  // Remove event listener
  projectsList.removeEventListener("scroll", () => {});
};

const previousProject = () => {
  // Scroll to the previous project
  if (projectsList.scrollLeft === 0) {
    projectsList.scrollLeft = projectsList.scrollWidth - projectsList.offsetWidth;
  } else {
    projectsList.scrollLeft -= projectsList.offsetWidth;
  }
};

const nextProject = () => {
  // Scroll to the next project
  if (projectsList.scrollLeft > projectsList.scrollWidth - projectsList.offsetWidth - 100) {
    projectsList.scrollLeft = 1;
  } else {
    projectsList.scrollLeft += projectsList.offsetWidth;
  }
};

projectsList.addEventListener("mousedown", (e) => {
  // Catch the initial position of the mouse in projectsList
  isDown = true;
  startX = e.touches?.[0]?.pageX || e.pageX;
  scrollLeft = projectsList.scrollLeft;
});

projectsList.addEventListener("mousemove", (e) => {
  // Catch the current position of the mouse in projectsList
  e.preventDefault();
  if (!isDown) return;
  currentX = e.touches?.[0]?.pageX || e.pageX;
  const distanceX = currentX - startX;
  projectsList.scrollLeft = scrollLeft - distanceX;
});

projectsList.addEventListener("mouseup", () => {
  // Check if the mouse has moved more than 50px
  isDown = false;
  if (Math.abs(currentX - startX) > 50) {
    if (currentX > startX) {
      previousProject();
    } else {
      nextProject();
    }
  }
});

projectsList.addEventListener("mouseleave", () => (isDown = false));

projectsList.addEventListener("scroll", removeScrollAnimationAndEventListener);

window.addEventListener("scroll", activeMenu);

window.mobileAndTabletCheck = function () {
  // Check if the device is mobile or tablet
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

handleDarkModeSaved();

handleLangSaved();

handleMyAge();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
}
