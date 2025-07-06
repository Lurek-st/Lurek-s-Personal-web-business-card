/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  // 点击每个菜单链接后收起菜单栏
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
  skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
  let itemClass = this.parentNode.className

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close'
  }
  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills__open'
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    console.log('click disparado')
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active')
    })
    target.classList.add('qualification__active')

    tabs.forEach(tab => {
      tab.classList.remove('qualification__active')
    })
    tab.classList.add('qualification__active')
  })
})


/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  sections.forEach(current => {
    const sectionHeight = current.clientHeight
    const sectionTop = current.getBoundingClientRect().top;
    const sectionId = current.getAttribute('id')
    // section 位于视口中间时添加样式 active-link
    if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight >= window.innerHeight / 2) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById('header')
  if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME & LANGUAGE====================*/

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'
const language = 'cn'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== WEB3 ANIMATIONS ====================*/

// Scroll Animation Observer
const scrollElements = document.querySelectorAll('.section__title, .section__subtitle, .scroll-animate, .skills__content, .qualification__data, .portfolio__content, .contact__information, .about__img')

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top
  const elementVisible = elementTop <= ((window.innerHeight || document.documentElement.clientHeight) / dividend)
  return elementVisible
}

const displayScrollElement = (element) => {
  element.classList.add('active')
}

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.1)) {  // 更容易触发
      displayScrollElement(el)

      // Check if this is the about section and start typing animation
      if (el.classList.contains('about') && el.classList.contains('section')) {
        // Only start once by checking if content is empty
        const aboutDesc = document.querySelector('.about__description')
        if (aboutDesc && aboutDesc.innerHTML.trim() === '') {
          setTimeout(startAboutTypingAnimation, 800)
        }
      }
    }
  })
}

// Debug function to manually show elements (remove after testing)
const forceShowAllElements = () => {
  scrollElements.forEach((el) => {
    displayScrollElement(el)
  })
}

// Throttle scroll events for better performance
let ticking = false
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScrollAnimation()
      ticking = false
    })
    ticking = true
  }
})

// Typing Effect
const typingTexts = [
  {
    element: document.querySelector('.home__title'),
    text: 'Hi, I\'m Lurek',
    textCn: '你好，我是 Lurek',
    delay: 500,
    speed: 80
  },
  {
    element: document.querySelector('.home__subtitle'),
    text: 'CityU-DG UG Student',
    textCn: 'CityU-DG UG Student',
    delay: 0,
    speed: 60
  },
  {
    element: document.querySelector('.home__description'),
    text: 'High level experience in web design and development knowledge, producing quality work.',
    textCn: 'AI工具专家，Web3开发数字游民，港城大创新创业者',
    delay: 0,
    speed: 50
  }
]

// About section typing texts  
const aboutTypingTexts = [
  {
    text: 'As a Digital Nomad, I specialize in providing remote support to North American B2B clients using AI tools.',
    textCn: '作为一名数字游民，我专注于使用AI工具为北美B端客户提供各类远程支持。',
    speed: 50
  },
  {
    text: 'I am also a Web2&3 Developer with extensive experience in web design and development.',
    textCn: '同时，我也是一名Web2&3开发者，拥有丰富的网页设计和开发经验。',
    speed: 50
  },
  {
    text: 'As an Innovation Community Leader, I am dedicated to fostering an innovative and entrepreneurial atmosphere on campus.',
    textCn: '作为创新创业社群领袖，致力于构建校内创新创业氛围。',
    speed: 50
  }
]

function typeWriter(element, text, speed = 50) {
  return new Promise((resolve) => {
    if (!element) {
      resolve()
      return
    }

    element.style.opacity = '1'
    element.innerHTML = ''
    element.classList.add('typing-text')

    let i = 0
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      } else {
        element.classList.remove('typing-text')
        resolve()
      }
    }
    type()
  })
}

function getCurrentLanguage() {
  return localStorage.getItem('lang') || 'en'
}

async function startTypingAnimation() {
  const currentLang = getCurrentLanguage()

  // First delay for initial start
  await new Promise(resolve => setTimeout(resolve, 500))

  for (const item of typingTexts) {
    const textToType = currentLang === 'cn' ? item.textCn : item.text
    await typeWriter(item.element, textToType, item.speed)
    // Small delay between each text for better visual flow
    await new Promise(resolve => setTimeout(resolve, 200))
  }
}

async function startAboutTypingAnimation() {
  const currentLang = getCurrentLanguage()
  const aboutElement = document.querySelector('.about__description')

  if (!aboutElement) return

  // Clear existing content and prepare for typing
  aboutElement.style.opacity = '1'
  aboutElement.classList.add('active')
  aboutElement.innerHTML = ''

  for (let i = 0; i < aboutTypingTexts.length; i++) {
    const item = aboutTypingTexts[i]
    const textToType = currentLang === 'cn' ? item.textCn : item.text

    // Create a span for each sentence with highlight styling
    const span = document.createElement('span')
    span.className = 'highlight'
    aboutElement.appendChild(span)

    await typeWriter(span, textToType, item.speed)

    // Add line breaks between sentences except for the last one
    if (i < aboutTypingTexts.length - 1) {
      aboutElement.appendChild(document.createElement('br'))
      aboutElement.appendChild(document.createElement('br'))
      // Small delay between sentences
      await new Promise(resolve => setTimeout(resolve, 300))
    }
  }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  setTimeout(startTypingAnimation, 1000)
  // Also check scroll animations on load
  setTimeout(handleScrollAnimation, 100)
  setTimeout(handleScrollAnimation, 500)
})

// Restart typing animation when language changes
document.getElementById('translate').addEventListener('click', () => {
  setTimeout(() => {
    // Reset all text elements
    typingTexts.forEach(item => {
      if (item.element) {
        item.element.style.opacity = '0'
        item.element.innerHTML = ''
      }
    })

    // Reset about description
    const aboutDesc = document.querySelector('.about__description')
    if (aboutDesc) {
      aboutDesc.style.opacity = '0'
      aboutDesc.innerHTML = ''
    }

    // Restart typing animation
    setTimeout(startTypingAnimation, 500)

    // Restart about typing if about section is visible
    setTimeout(() => {
      const aboutSection = document.querySelector('.about.section')
      if (aboutSection && elementInView(aboutSection, 1.1)) {
        setTimeout(startAboutTypingAnimation, 1000)
      }
    }, 600)
  }, 100)
})

// Initial scroll animation check
document.addEventListener('DOMContentLoaded', () => {
  // Check animations multiple times to ensure they work
  handleScrollAnimation()
  setTimeout(handleScrollAnimation, 300)
  setTimeout(handleScrollAnimation, 600)
  setTimeout(handleScrollAnimation, 1000)
})

// Add resize listener to recheck animations
window.addEventListener('resize', () => {
  setTimeout(handleScrollAnimation, 100)
})