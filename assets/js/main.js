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
  skillsContentElements = document.querySelectorAll('.skills__content')

function toggleSkills() {
  let itemClass = this.className

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close'
  }
  if (itemClass === 'skills__content skills__close') {
    this.className = 'skills__content skills__open'
  }
}

skillsContentElements.forEach((el) => {
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

// Global variables to track animations
let activeAnimations = []
let isTypingActive = false

// Scroll Animation Observer
const scrollElements = document.querySelectorAll('.section__title, .section__subtitle, .scroll-animate, .skills__content, .qualification__data, .portfolio__content, .contact__information, .about__img, .about__card')

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
    }
  })

  // Check if about section is in view and trigger card animations
  const aboutSection = document.querySelector('.about.section')
  if (aboutSection && elementInView(aboutSection, 1.2)) {
    const aboutCards = document.querySelectorAll('.about__card')
    aboutCards.forEach((card, index) => {
      if (!card.classList.contains('active')) {
        setTimeout(() => {
          card.classList.add('active')
        }, index * 200) // 依次显示，每张卡片间隔200ms
      }
    })
  }
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



function typeWriter(element, text, speed = 50) {
  return new Promise((resolve, reject) => {
    if (!element) {
      resolve()
      return
    }

    element.style.opacity = '1'
    element.innerHTML = ''
    element.classList.add('typing-text')

    let i = 0
    let animationId

    function type() {
      // Check if animation should be stopped
      if (!isTypingActive) {
        element.classList.remove('typing-text')
        reject('Animation stopped')
        return
      }

      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        animationId = setTimeout(type, speed)
        // Track this animation
        activeAnimations.push(animationId)
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

function stopAllAnimations() {
  // Stop typing flag
  isTypingActive = false

  // Clear all active timeouts
  activeAnimations.forEach(id => clearTimeout(id))
  activeAnimations = []

  // Remove typing classes from all elements and reset their state
  document.querySelectorAll('.typing-text').forEach(el => {
    el.classList.remove('typing-text')
  })

  // Also reset typing texts elements specifically
  typingTexts.forEach(item => {
    if (item.element) {
      item.element.classList.remove('typing-text')
    }
  })
}

async function startTypingAnimation() {
  // Stop all existing animations first
  stopAllAnimations()

  // Enable typing
  isTypingActive = true

  const currentLang = getCurrentLanguage()

  // First delay for initial start
  await new Promise(resolve => setTimeout(resolve, 500))

  try {
    for (const item of typingTexts) {
      if (!isTypingActive) break // Check if we should stop

      const textToType = currentLang === 'cn' ? item.textCn : item.text
      await typeWriter(item.element, textToType, item.speed)
      // Small delay between each text for better visual flow
      if (isTypingActive) {
        await new Promise(resolve => setTimeout(resolve, 200))
      }
    }
  } catch (error) {
    // Animation was stopped, this is expected
  } finally {
    isTypingActive = false
  }
}



// Start typing animation when page loads
window.addEventListener('load', () => {
  // Ensure clean start
  stopAllAnimations()
  setTimeout(startTypingAnimation, 1000)
  // Also check scroll animations on load
  setTimeout(handleScrollAnimation, 100)
  setTimeout(handleScrollAnimation, 500)
})

// Debounce variable to prevent multiple rapid calls
let languageChangeTimeout = null

// Function to handle language change
function handleLanguageChange() {
  // Clear any existing timeout to prevent multiple rapid calls
  if (languageChangeTimeout) {
    clearTimeout(languageChangeTimeout)
  }

  // Immediately stop all animations
  stopAllAnimations()

  languageChangeTimeout = setTimeout(() => {
    // Reset all text elements
    typingTexts.forEach(item => {
      if (item.element) {
        item.element.style.opacity = '0'
        item.element.innerHTML = ''
        item.element.classList.remove('typing-text')
      }
    })

    // Reset about cards
    const aboutCards = document.querySelectorAll('.about__card')
    aboutCards.forEach(card => {
      card.classList.remove('active')
    })

    // Restart typing animation with increased delay
    setTimeout(startTypingAnimation, 800)

    // Re-trigger about card animations if section is visible
    setTimeout(() => {
      const aboutSection = document.querySelector('.about.section')
      if (aboutSection && elementInView(aboutSection, 1.2)) {
        const aboutCards = document.querySelectorAll('.about__card')
        aboutCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('active')
          }, index * 200)
        })
      }
    }, 1000)

    // Clear the timeout variable
    languageChangeTimeout = null
  }, 150)
}

// Restart typing animation when language changes (menu translate button)
document.getElementById('translate').addEventListener('click', handleLanguageChange)

// Add event listener for mobile translate button
const mobileTranslateBtn = document.getElementById('mobile-translate')
if (mobileTranslateBtn) {
  mobileTranslateBtn.addEventListener('click', () => {
    // Only trigger the menu translate button click
    // The handleLanguageChange will be called automatically by the translate button's event listener
    document.getElementById('translate').click()
  })
}

// Initial scroll animation check
document.addEventListener('DOMContentLoaded', () => {
  // Check animations multiple times to ensure they work
  handleScrollAnimation()
  setTimeout(handleScrollAnimation, 300)
  setTimeout(handleScrollAnimation, 600)
  setTimeout(handleScrollAnimation, 1000)

  // Manual check for about section after everything loads
  setTimeout(() => {
    const aboutSection = document.querySelector('.about.section')
    if (aboutSection && elementInView(aboutSection, 1.5)) {
      const aboutCards = document.querySelectorAll('.about__card')
      aboutCards.forEach((card, index) => {
        if (!card.classList.contains('active')) {
          setTimeout(() => {
            card.classList.add('active')
          }, index * 200)
        }
      })
    }
  }, 2000)
})

// Add resize listener to recheck animations
window.addEventListener('resize', () => {
  setTimeout(handleScrollAnimation, 100)
})