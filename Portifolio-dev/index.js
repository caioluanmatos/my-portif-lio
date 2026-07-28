document.addEventListener("DOMContentLoaded", function () {
  /* ==========================================
     1. Theme Switcher (Dark/Light Mode)
     ========================================== */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Check stored preference or system settings, default to dark
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.className = "fas fa-sun";
  } else {
    document.body.classList.remove("light-mode");
    themeIcon.className = "fas fa-moon";
  }

  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    
    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("portfolio-theme", "light");
      themeIcon.className = "fas fa-sun";
    } else {
      localStorage.setItem("portfolio-theme", "dark");
      themeIcon.className = "fas fa-moon";
    }
  });

  /* ==========================================
     2. Typing Effect (Hero Section)
     ========================================== */
  const words = [
    "Desenvolvedor Full Stack",  
    "UI/UX Enthusiast",
    "Criador de Interfaces",
    "Apaixonado por Tecnologia"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetweenWords = 2000;
  const typingTextEl = document.getElementById("typing-text");

  function typeEffect() {
    if (!typingTextEl) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenWords);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
    }
  }

  // Inicia o efeito após 500ms
  setTimeout(typeEffect, 500);

  /* ==========================================
     3. Particles.js Configuration
     ========================================== */
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#5dd62c" }, // Usa a cor principal de acento
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" }
        },
        opacity: {
          value: 0.35,
          random: true,
          anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 130,
          color: "#5dd62c",
          opacity: 0.15,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.35 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ==========================================
     4. Navigation Smooth Scrolling Adjustments
     ========================================== */
  const navbar = document.getElementById("navbar");
  const scrollOffset = navbar ? navbar.offsetHeight : 70;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* ==========================================
     5. Unified Form Validation & WhatsApp Submission
     ========================================== */
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();

      // Validação básica de segurança
      if (!nome || !email || !mensagem) {
        alert("⚠️ Por favor, preencha todos os campos antes de enviar.");
        return;
      }

      // Validação de formato de e-mail simples
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("⚠️ Por favor, digite um e-mail comercial válido.");
        return;
      }

      // WhatsApp Formatting & Number
      const numero = "5521971088704"; // Caio Luan's official number
      const saudacao = "🚀 *NOVO CONTATO DO PORTFÓLIO* 🚀\n\n";
      const corpo = `👤 *Nome:* ${nome}\n✉️ *E-mail:* ${email}\n\n💬 *Mensagem:*\n${mensagem}`;
      
      // Encode properly for URL
      const textoEncoded = encodeURIComponent(saudacao + corpo);
      const url = `https://wa.me/${numero}?text=${textoEncoded}`;

      // Toast feedback e redirecionamento
      alert(`Obrigado, ${nome}! Sua mensagem foi validada. Redirecionando para o WhatsApp...`);
      window.open(url, "_blank");

      // Limpa formulário
      form.reset();
    });
  }

  /* ==========================================
     6. GitHub Dynamic Projects Fetch & Fallback
     ========================================== */
  const projetosContainer = document.getElementById("projetos-api");

  // Fallbacks locais caso a API falhe ou dê Rate Limit
  const fallbackProjects = [
    {
      name: "Portifolio-dev",
      description: "Meu portfólio pessoal e landing page construída com HTML5, CSS3, e JavaScript moderno. Design focado em performance, interações ricas e acessibilidade.",
      language: "CSS",
      stargazers_count: 5,
      forks_count: 1,
      html_url: "https://github.com/caioluanmatos/Portifolio-dev",
      homepage: "https://caioluanmatos.github.io/Portifolio-dev/"
    },
    {
      name: "Gerador-de-Senhas-JS",
      description: "Uma ferramenta dinâmica e interativa para geração de senhas seguras customizáveis com critérios de tamanho, caracteres especiais e números.",
      language: "JavaScript",
      stargazers_count: 3,
      forks_count: 0,
      html_url: "https://github.com/caioluanmatos",
      homepage: null
    },
    {
      name: "Calculadora-Responsiva",
      description: "Calculadora moderna construída com grid responsivo em CSS e lógica dinâmica em Javascript, suportando operações matemáticas tradicionais.",
      language: "HTML",
      stargazers_count: 2,
      forks_count: 0,
      html_url: "https://github.com/caioluanmatos",
      homepage: null
    }
  ];

  function renderProjects(repos) {
    if (!projetosContainer) return;
    
    // Limpa skeletons ou conteúdo antigo
    projetosContainer.innerHTML = "";

    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "projeto-card";

      // Trunca descrições excessivamente longas
      const desc = repo.description || "Sem descrição disponível. Projeto desenvolvido com muito foco e melhores práticas de Full Stack.";

      // Links condicionais para ver demo
      const homepageLink = repo.homepage 
        ? `<a href="${repo.homepage}" target="_blank" title="Visualizar Live Demo" aria-label="Demo Online"><i class="fas fa-external-link-alt"></i></a>` 
        : "";

      card.innerHTML = `
        <div class="projeto-header">
          <i class="far fa-folder folder"></i>
          <div class="projeto-stats">
            <span><i class="far fa-star"></i> ${repo.stargazers_count || 0}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count || 0}</span>
          </div>
        </div>
        <div class="projeto-body">
          <h3>${repo.name}</h3>
          <p>${desc}</p>
        </div>
        <div class="projeto-footer">
          <span class="projeto-lang">${repo.language || "Full Stack"}</span>
          <div class="projeto-links">
            <a href="${repo.html_url}" target="_blank" title="Ver Código-Fonte no GitHub" aria-label="GitHub"><i class="fab fa-github"></i></a>
            ${homepageLink}
          </div>
        </div>
      `;

      projetosContainer.appendChild(card);
    });
  }

  // Faz a requisição na API do GitHub
  fetch("https://api.github.com/users/caioluanmatos/repos")
    .then(res => {
      if (!res.ok) throw new Error("Erro na requisição da API");
      return res.json();
    })
    .then(data => {
      // Filtra repositórios que NÃO são forks, ordena por data de update e pega no máximo 6
      const repos = data
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);

      if (repos.length === 0) {
        renderProjects(fallbackProjects);
      } else {
        renderProjects(repos);
      }
    })
    .catch(err => {
      console.warn("GitHub API rate limit ou erro de rede. Utilizando repositórios de fallback.", err);
      renderProjects(fallbackProjects);
    });
});
