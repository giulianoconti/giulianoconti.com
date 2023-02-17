const myAge = document.getElementById("myAge");
const menuBtn = document.querySelector(".menu_btn");
const homeMenu = document.querySelector("#home_link");
const aboutMenu = document.querySelector("#about_link");
const projectsMenu = document.querySelector("#projects_link");
const contactMenu = document.querySelector("#contact_link");
const homeSection = document.querySelector("#home");
const aboutSection = document.querySelector("#about");
const projectsSection = document.querySelector("#projects");
const contactSection = document.querySelector("#contact");
const menu = document.querySelector(".nav_list");
const projectsList = document.querySelector(".projects_list");
const projectsButtonsContainer = document.querySelector(".projects_buttons_container");
const contactForm = document.querySelector(".contact_form");
let prevOrNextSectionRunning = false;
let showMenu = false;
let isMobile = false;
const navbarHome = document.querySelector(".navbar_home");
const navbarAbout = document.querySelector(".navbar_about");
const navbarProjects = document.querySelector(".navbar_projects");
const navbarContact = document.querySelector(".navbar_contact");
const navbarSubtitle = document.querySelector(".home_subtitle");
const homeBtnText = document.querySelector(".home_btn_text");
const aboutTitle = document.querySelector(".about_left_title");
const aboutName = document.querySelector(".about_name");
const aboutAge = document.querySelector(".about_age");
const aboutNacionality = document.querySelector(".about_nacionality");
const aboutCity = document.querySelector(".about_city");
const aboutLeftAbout = document.querySelector(".about_left_about");
const projectsTitle = document.querySelector(".projects_title");
const contactInput = document.querySelector(".contact_input");
const contactMessage = document.querySelector(".contact_message");
const contactTextarea = document.querySelector(".contact_textarea");

const languages = {
  en: {
    navbar: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
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
    },
    projects: {
      title: "My projects",
    },
    contact: {
      emailInput: "example@gmail.com",
      message: "Message",
      messageInput: "Hello, I would like to contact you for...",
    },
  },
  es: {
    navbar: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
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
    },
    projects: {
      title: "Mis Proyectos",
    },
    contact: {
      emailInput: "ejemplo@gmail.com",
      message: "Mensaje:",
      messageInput: "Buenas, me gustaría contactar contigo para...",
    },
  },
  pt: {
    navbar: {
      home: "Início",
      about: "Sobre mim",
      projects: "Projetos",
      contact: "Contato",
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
    },
    projects: {
      title: "Meus Projetos",
    },
    contact: {
      emailInput: "exemplo@gmail.com",
      message: "Mensagem:",
      messageInput: "Olá, gostaria de entrar em contato com você para...",
    },
  },
};

const activeMenu = () => {
  const scrollY = window.scrollY;
  if (scrollY < aboutSection.offsetTop - aboutSection.offsetTop / 3) {
    removeAllActive();
    homeMenu.classList.add("active");
  } else if (scrollY < projectsSection.offsetTop - projectsSection.offsetTop / 3) {
    removeAllActive();
    aboutMenu.classList.add("active");
  } else if (scrollY < contactSection.offsetTop - contactSection.offsetTop / 4.5) {
    removeAllActive();
    projectsMenu.classList.add("active");
  } else {
    removeAllActive();
    contactMenu.classList.add("active");
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
};

const removeMenu = () => {
  // if menu is shown and the window is narrow
  if (showMenu && window.innerWidth <= 790) {
    // hide the menu
    menu.classList.remove("nav_list_active");
    menuBtn.classList.remove("d_none");
    showMenu = false;
  }
};

const handleLang = (lang = "es") => {
  fetchProjects(lang);
  navbarHome.textContent = languages[lang].navbar.home;
  navbarAbout.textContent = languages[lang].navbar.about;
  navbarProjects.textContent = languages[lang].navbar.projects;
  navbarContact.textContent = languages[lang].navbar.contact;
  navbarSubtitle.textContent = languages[lang].home.subtitle;
  homeBtnText.textContent = languages[lang].home.downloadBtn;
  aboutTitle.textContent = languages[lang].about.title;
  aboutName.textContent = languages[lang].about.name;
  aboutAge.textContent = languages[lang].about.age;
  aboutNacionality.textContent = languages[lang].about.nationality;
  aboutCity.textContent = languages[lang].about.city;
  aboutLeftAbout.innerHTML = languages[lang].about.description;
  projectsTitle.textContent = languages[lang].projects.title;
  contactInput.placeholder = languages[lang].contact.emailInput;
  contactMessage.textContent = languages[lang].contact.message;
  contactTextarea.placeholder = languages[lang].contact.messageInput;
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

const handleNextPrev = (type) => {
  if (!prevOrNextSectionRunning) {
    prevOrNextSectionRunning = true;
    if (type === "prev") {
      // If user is on the first project, scroll to the last project
      if (projectsList.scrollLeft === 0) {
        projectsList.scrollLeft = projectsList.scrollWidth - projectsList.clientWidth;
      } else {
        projectsList.scrollLeft -= projectsList.clientWidth;
      }
    } else {
      // If user is on the last project, scroll to the first project
      if (projectsList.scrollWidth - projectsList.scrollLeft === projectsList.clientWidth) {
        projectsList.scrollLeft = 0;
      } else {
        projectsList.scrollLeft += projectsList.clientWidth;
      }
    }
    setTimeout(
      () => {
        prevOrNextSectionRunning = false;
      },
      (projectsList.scrollLeft === 0 && type === "prev") || (projectsList.scrollWidth - projectsList.scrollLeft === projectsList.clientWidth && type === "next")
        ? 900
        : 500
    );
  }
};

const fetchProjects = async (lang = "es") => {
  const response = await fetch(`https://giuliannt.github.io/api/myProjects-${lang}.json`);
  const data = await response.json();
  projectsList.innerHTML = "";
  data.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.innerHTML = `
    <img class="project_img" src="${project.img}" alt="${project.title}"></img>
    <div class="project_info">
      <h3 class="project_title">${project.title}</h3>
      <p class="project_description">${project.description}</p>
      <div class="project_links">
        <a href="${project.hrefGithub}" target="_blank" rel="noreferrer" aria-label="link to ${project.title} github repository">
          <svg class="project_link_svg" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <a href="${project.hrefWeb}" target="_blank" rel="noreferrer" aria-label="link to ${project.title} website">
          <svg class="project_link_svg" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M3.51211712,15 L8.17190229,15 C8.05949197,14.0523506 8,13.0444554 8,12 C8,10.9555446 8.05949197,9.94764942 8.17190229,9 L3.51211712,9 C3.18046266,9.93833678 3,10.9480937 3,12 C3,13.0519063 3.18046266,14.0616632 3.51211712,15 L3.51211712,15 Z M3.93551965,16 C5.12590433,18.3953444 7.35207678,20.1851177 10.0280093,20.783292 C9.24889451,19.7227751 8.65216136,18.0371362 8.31375067,16 L3.93551965,16 L3.93551965,16 Z M20.4878829,15 C20.8195373,14.0616632 21,13.0519063 21,12 C21,10.9480937 20.8195373,9.93833678 20.4878829,9 L15.8280977,9 C15.940508,9.94764942 16,10.9555446 16,12 C16,13.0444554 15.940508,14.0523506 15.8280977,15 L20.4878829,15 L20.4878829,15 Z M20.0644804,16 L15.6862493,16 C15.3478386,18.0371362 14.7511055,19.7227751 13.9719907,20.783292 C16.6479232,20.1851177 18.8740957,18.3953444 20.0644804,16 L20.0644804,16 Z M9.18440269,15 L14.8155973,15 C14.9340177,14.0623882 15,13.0528256 15,12 C15,10.9471744 14.9340177,9.93761183 14.8155973,9 L9.18440269,9 C9.06598229,9.93761183 9,10.9471744 9,12 C9,13.0528256 9.06598229,14.0623882 9.18440269,15 L9.18440269,15 Z M9.3349823,16 C9.85717082,18.9678295 10.9180729,21 12,21 C13.0819271,21 14.1428292,18.9678295 14.6650177,16 L9.3349823,16 L9.3349823,16 Z M3.93551965,8 L8.31375067,8 C8.65216136,5.96286383 9.24889451,4.27722486 10.0280093,3.21670804 C7.35207678,3.81488234 5.12590433,5.60465556 3.93551965,8 L3.93551965,8 Z M20.0644804,8 C18.8740957,5.60465556 16.6479232,3.81488234 13.9719907,3.21670804 C14.7511055,4.27722486 15.3478386,5.96286383 15.6862493,8 L20.0644804,8 L20.0644804,8 Z M9.3349823,8 L14.6650177,8 C14.1428292,5.03217048 13.0819271,3 12,3 C10.9180729,3 9.85717082,5.03217048 9.3349823,8 L9.3349823,8 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  `;
    projectsList.appendChild(projectDiv);
  });
};

const isMobileOrNot = () => {
  if (mobileAndTabletCheck()) {
    projectsList.classList.add("projects_list_mobile");
    projectsButtonsContainer.classList.add("d_none");
  } else if (projectsList.classList.contains("projects_list_mobile")) {
    projectsList.classList.remove("projects_list_mobile");
    projectsButtonsContainer.classList.remove("d_none");
  }
};

window.mobileAndTabletCheck = function () {
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

window.addEventListener("scroll", activeMenu);

window.addEventListener("resize", () => {
  // reset the scroll position
  projectsList.scrollLeft = 0;
  // detect if the device is mobile
  isMobileOrNot();
});

window.onbeforeunload = () => {
  // reset contact form on page refresh
  contactForm.reset();
};

handleMyAge();

fetchProjects("es");

isMobileOrNot();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
}
