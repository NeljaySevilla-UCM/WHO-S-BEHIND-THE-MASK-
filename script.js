const navToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const identityPortrait = document.querySelector('#identity-portrait');
const identityToggle = document.querySelector('#identity-toggle');
const identityStatus = document.querySelector('#identity-status');
const maskedPortrait = document.querySelector('#masked-portrait');
const realPortrait = document.querySelector('#real-portrait');
const backToTop = document.querySelector('#back-to-top');

backToTop.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
});

function closeMenu() {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
  siteNav.classList.remove('is-open');
}

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

identityToggle.addEventListener('click', () => {
  const isRevealed = identityToggle.getAttribute('aria-pressed') === 'true';
  if (identityToggle.disabled) return;

  if (isRevealed) {
    identityPortrait.classList.remove('is-revealed');
    identityToggle.setAttribute('aria-pressed', 'false');
    identityToggle.setAttribute('aria-label', 'Reveal the identity behind the mask');
    identityToggle.textContent = 'WHO’S BEHIND THE MASK?';
    identityStatus.textContent = 'IDENTITY: CLASSIFIED';
    maskedPortrait.setAttribute('aria-hidden', 'false');
    realPortrait.setAttribute('aria-hidden', 'true');
    return;
  }

  identityToggle.disabled = true;
  identityPortrait.classList.add('is-decrypting');
  identityStatus.textContent = 'DECRYPTING SECRET IDENTITY...';
  const decryptDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 900;
  window.setTimeout(() => {
    identityPortrait.classList.remove('is-decrypting');
    identityPortrait.classList.add('is-revealed');
    identityToggle.disabled = false;
    identityToggle.setAttribute('aria-pressed', 'true');
    identityToggle.setAttribute('aria-label', 'Mask identity again');
    identityToggle.textContent = 'MASK IDENTITY AGAIN ↺';
    identityStatus.textContent = 'IDENTITY CONFIRMED: NELJAY SEVILLA';
    maskedPortrait.setAttribute('aria-hidden', 'true');
    realPortrait.setAttribute('aria-hidden', 'false');
  }, decryptDuration);
});

const storyToggle = document.querySelector('#story-toggle');
const storyExtra = document.querySelector('#story-extra');
storyToggle.addEventListener('click', () => {
  const expanded = storyToggle.getAttribute('aria-expanded') === 'true';
  storyToggle.setAttribute('aria-expanded', String(!expanded));
  storyExtra.hidden = expanded;
  storyToggle.innerHTML = expanded
    ? 'Reveal my story <span aria-hidden="true">+</span>'
    : 'Close my story <span aria-hidden="true">−</span>';
});

const skillContent = {
  html: ['HTML', 'Used to give a web page meaningful structure and content.'],
  css: ['CSS', 'Used to shape the visual design, layout, and responsive behavior of a page.'],
  javascript: ['JAVASCRIPT', 'Used to create interactive web elements and dynamic behavior.'],
  python: ['PYTHON', 'A language I am learning for programming fundamentals and creative experiments.'],
  java: ['JAVA', 'A language I am learning to practice structured programming concepts.'],
  c: ['C / C++', 'Exploring core programming concepts through C and C++ basics.'],
  mysql: ['MYSQL', 'Learning database concepts and how structured information can be stored.'],
  ux: ['UI/UX + HCI', 'Thinking about how people understand, navigate, and use interactive systems.'],
  testing: ['SOFTWARE TESTING', 'Learning to check software behavior and improve quality.'],
  roblox: ['ROBLOX STUDIO', 'Exploring game development and interactive world-building.'],
  ai: ['AI-ASSISTED TOOLS', 'Experimenting with AI tools for creative content and development ideas.']
};
const skillTiles = document.querySelectorAll('.skill-tile');
const skillName = document.querySelector('#skill-name');
const skillDescription = document.querySelector('#skill-description');
const skillReadout = document.querySelector('.skill-readout');
skillTiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    skillTiles.forEach((item) => {
      const selected = item === tile;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const [name, description] = skillContent[tile.dataset.skill];
    skillName.textContent = name;
    skillDescription.textContent = description;
    skillReadout.classList.remove('pulse');
    requestAnimationFrame(() => skillReadout.classList.add('pulse'));
  });
});

const modeMessages = {
  inventor: 'Building ideas, testing possibilities, and creating something new.',
  developer: 'Debugging problems one line of code at a time.',
  explorer: 'Discovering strange places, new technologies, and unexplored ideas.'
};
const modeOptions = document.querySelectorAll('.mode-option');
const modeMessage = document.querySelector('#mode-message');
modeOptions.forEach((option) => {
  option.addEventListener('click', () => {
    modeOptions.forEach((item) => {
      const selected = item === option;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    modeMessage.textContent = modeMessages[option.dataset.mode];
    modeMessage.animate(
      [{ opacity: 0.35, transform: 'translateY(3px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 240, easing: 'ease-out' }
    );
  });
});

const facts = [
  'The underwater game concept mixes exploration, equipment upgrades, collectible creatures, and boss encounters.',
  'NexTime is a school facility booking system concept focused on making reservations more organized.',
  'My mysterious geography project explores unusual places through AI-assisted cinematic storytelling.',
  'My learning areas range from HTML, CSS, and JavaScript to database concepts, testing, and game development.',
  'A useful interface starts with a simple question: what does the person using it need to do next?'
];
const senseButton = document.querySelector('#sense-button');
const senseOutput = document.querySelector('#sense-output');
let previousFact = -1;
senseButton.addEventListener('click', () => {
  let factIndex = Math.floor(Math.random() * facts.length);
  if (facts.length > 1 && factIndex === previousFact) factIndex = (factIndex + 1) % facts.length;
  previousFact = factIndex;
  senseOutput.textContent = facts[factIndex];
  senseOutput.classList.remove('has-fact');
  requestAnimationFrame(() => senseOutput.classList.add('has-fact'));
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const progressBar = document.querySelector('#progress-bar');
let scrollQueued = false;
function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    window.requestAnimationFrame(updateScrollState);
    scrollQueued = true;
  }
}, { passive: true });
updateScrollState();

const sectionLinks = document.querySelectorAll('.site-nav a[href^="#"]:not(.nav-connect)');
const observedSections = [...sectionLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
          link.classList.toggle('is-active', active);
        });
      }
    });
  }, { rootMargin: '-22% 0px -62% 0px' });
  observedSections.forEach((section) => activeObserver.observe(section));
}

const systemIntro = document.querySelector('#system-intro');
if (systemIntro) {
  const introMessage = document.querySelector('#intro-message');
  const introAccess = document.querySelector('#intro-access');
  const introProgress = document.querySelector('.intro-progress-track');
  const introProgressBar = document.querySelector('#intro-progress-bar');
  const introProgressLabel = document.querySelector('#intro-progress-label');
  const introPhase = document.querySelector('#intro-phase');
  const introSkip = document.querySelector('#intro-skip');
  const bootKey = 'spider-nel-system-boot-seen';
  const bootSteps = [
    ['INITIALIZING SPIDER SYSTEM...', 0],
    ['ESTABLISHING CONNECTION...', 12],
    ['SCANNING IDENTITY...', 28],
    ['ANALYZING PROFILE...', 46],
    ['STUDENT PROFILE DETECTED', 63],
    ['IDENTITY: NELJAY SEVILLA', 78],
    ['CLASSIFICATION: BSIT STUDENT', 92],
    ['STATUS: ACCESS GRANTED', 100]
  ];
  let hasSeenIntro = false;
  try {
    hasSeenIntro = sessionStorage.getItem(bootKey) === 'true';
  } catch {
    hasSeenIntro = false;
  }

  if (hasSeenIntro) {
    systemIntro.hidden = true;
  } else {
    systemIntro.hidden = false;
    document.documentElement.classList.add('intro-active');
    document.querySelectorAll('body > :not(#system-intro)').forEach((element) => {
      element.inert = true;
    });
    try {
      sessionStorage.setItem(bootKey, 'true');
    } catch {
      // Keep the intro usable when browser storage is unavailable.
    }

    let stepTimer;
    let finishTimer;
    let failsafeTimer;
    let finished = false;
    function finishIntro(skip = false) {
      if (finished) return;
      finished = true;
      clearTimeout(stepTimer);
      clearTimeout(finishTimer);
      clearTimeout(failsafeTimer);
      document.removeEventListener('keydown', handleIntroKeydown);
      if (!skip) systemIntro.classList.add('is-finishing');
      const hideDelay = skip ? 0 : 500;
      setTimeout(() => {
        systemIntro.hidden = true;
        document.documentElement.classList.remove('intro-active');
        document.querySelectorAll('body > :not(#system-intro)').forEach((element) => {
          element.inert = false;
        });
        document.querySelector('#hero-title')?.focus({ preventScroll: true });
      }, hideDelay);
    }

    function showBootStep(index) {
      const [message, progress] = bootSteps[index];
      introMessage.textContent = message;
      introProgress.setAttribute('aria-valuenow', String(progress));
      introProgressBar.style.width = `${progress}%`;
      introProgressLabel.textContent = `${String(progress).padStart(2, '0')}%`;
      introPhase.textContent = `BOOT SEQUENCE / ${String(index + 1).padStart(2, '0')}—08`;
      if (index === bootSteps.length - 1) {
        systemIntro.classList.add('is-granted');
        introAccess.hidden = false;
        finishTimer = setTimeout(() => finishIntro(), 500);
        return;
      }
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      stepTimer = setTimeout(() => showBootStep(index + 1), reducedMotion ? 110 : 400);
    }

    introSkip.addEventListener('click', () => finishIntro(true));
    function handleIntroKeydown(event) {
      if (event.key === 'Escape' && !finished) {
        event.preventDefault();
        finishIntro(true);
      }
    }
    document.addEventListener('keydown', handleIntroKeydown);
    introSkip.focus({ preventScroll: true });
    failsafeTimer = setTimeout(() => finishIntro(true), 4600);
    showBootStep(0);
  }
}
