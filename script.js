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
  swingSpiderDrop();
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
});

function closeMenu() {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
  siteNav.classList.remove('is-open');
  document.querySelector('#hanging-spider')?.classList.remove('is-menu-open');
}

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('is-open', !isOpen);
  document.querySelector('#hanging-spider')?.classList.toggle('is-menu-open', !isOpen);
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

const activeWebEffects = new Set();
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const svgNamespace = 'http://www.w3.org/2000/svg';
const maxActiveWebEffects = 3;

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS(svgNamespace, name);
  Object.entries(attributes).forEach(([attribute, value]) => element.setAttribute(attribute, value));
  return element;
}

document.addEventListener('click', (event) => {
  if (reducedMotionQuery.matches || !(event.target instanceof Element)) return;

  while (activeWebEffects.size >= maxActiveWebEffects) {
    const oldestEffect = activeWebEffects.values().next().value;
    activeWebEffects.delete(oldestEffect);
    oldestEffect.remove();
  }

  const clickX = Number.isFinite(event.clientX) ? event.clientX : window.innerWidth / 2;
  const clickY = Number.isFinite(event.clientY) ? event.clientY : window.innerHeight / 2;
  const size = 36 + Math.random() * 18;
  const rotation = Math.random() * 24 - 12;
  const spokeCount = 12;
  const effect = createSvgElement('svg', {
    class: 'web-click-effect',
    viewBox: `0 0 ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`,
    'aria-hidden': 'true',
    focusable: 'false'
  });
  const webPosition = createSvgElement('g', {
    class: 'web-impact-position',
    transform: `translate(${clickX} ${clickY}) rotate(${rotation})`
  });
  const web = createSvgElement('g', { class: 'web-impact' });

  const spokes = Array.from({ length: spokeCount }, (_, index) => ({
    angle: (Math.PI * 2 * index) / spokeCount + (Math.random() - .5) * .045,
    length: size * (.94 + Math.random() * .12)
  }));
  spokes.forEach((spoke, index) => {
    const strand = createSvgElement('path', {
      class: 'web-impact-strand web-impact-radial',
      d: `M 0 0 L ${Math.cos(spoke.angle) * spoke.length} ${Math.sin(spoke.angle) * spoke.length}`
    });
    strand.style.setProperty('--draw-delay', `${Math.round(index * 7 + Math.random() * 24)}ms`);
    strand.style.setProperty('--strand-opacity', `${.58 + Math.random() * .3}`);
    web.append(strand);
    strand.style.setProperty('--strand-length', String(strand.getTotalLength()));
  });

  [0.19, 0.34, 0.5, 0.67, 0.83, 1].forEach((ringRatio, ringIndex) => {
    const points = spokes.map((spoke) => {
      const radius = spoke.length * ringRatio;
      return {
        angle: spoke.angle,
        radius,
        x: Math.cos(spoke.angle) * radius,
        y: Math.sin(spoke.angle) * radius
      };
    });
    let path = `M ${points[0].x} ${points[0].y}`;
    points.forEach((point, index) => {
      const next = points[(index + 1) % points.length];
      let nextAngle = next.angle;
      if (index === points.length - 1) nextAngle += Math.PI * 2;
      const middleAngle = (point.angle + nextAngle) / 2;
      const curve = (point.radius + next.radius) * (.5 + (Math.random() - .5) * .025);
      path += ` Q ${Math.cos(middleAngle) * curve} ${Math.sin(middleAngle) * curve} ${next.x} ${next.y}`;
    });
    const strand = createSvgElement('path', {
      class: 'web-impact-strand web-impact-ring',
      d: `${path} Z`
    });
    strand.style.setProperty('--draw-delay', `${100 + ringIndex * 34}ms`);
    strand.style.setProperty('--strand-opacity', `${.62 + Math.random() * .26}`);
    strand.style.setProperty('--strand-width', `${ringIndex === 0 ? .68 : .78 + Math.random() * .16}`);
    web.append(strand);
    strand.style.setProperty('--strand-length', String(strand.getTotalLength()));
  });

  web.append(createSvgElement('circle', { class: 'web-impact-center', cx: '0', cy: '0', r: '1.25' }));
  webPosition.append(web);
  effect.append(webPosition);
  document.body.append(effect);
  activeWebEffects.add(effect);
  web.addEventListener('animationend', (animationEvent) => {
    if (animationEvent.target !== web) return;
    activeWebEffects.delete(effect);
    effect.remove();
  });
  window.setTimeout(() => {
    activeWebEffects.delete(effect);
    effect.remove();
  }, 1700);
});

const hangingSpider = document.querySelector('#hanging-spider');
const hangingSpiderButton = document.querySelector('#hanging-spider-button');
const hangingSpiderSilk = document.querySelector('.hanging-spider-silk');
const spiderReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let spiderIsMoving = false;
let spiderCrawlOffset = 0;
let spiderThreadHeight = 82;
let spiderSwingPhase = null;
const spiderHomeThreadHeight = 82;

function waitForSpiderTransition(element, property, duration) {
  return new Promise((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(fallback);
      element.removeEventListener('transitionend', handleTransitionEnd);
      resolve();
    };
    const handleTransitionEnd = (event) => {
      if (event.target === element && event.propertyName === property) finish();
    };
    const fallback = window.setTimeout(finish, duration + 100);
    element.addEventListener('transitionend', handleTransitionEnd);
  });
}

function pauseSpider(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

function setSpiderThreadHeight(height) {
  spiderThreadHeight = height;
  hangingSpider.style.setProperty('--thread-height', `${height}px`);
}

function animateSpiderThreadTo(targetHeight, duration) {
  return new Promise((resolve) => {
    const startHeight = spiderThreadHeight;
    const startTime = performance.now();
    const getTargetHeight = typeof targetHeight === 'function' ? targetHeight : () => targetHeight;

    function animateFrame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = progress < .5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2;
      const destination = getTargetHeight();
      setSpiderThreadHeight(startHeight + (destination - startHeight) * easedProgress);

      if (progress < 1) {
        window.requestAnimationFrame(animateFrame);
      } else {
        setSpiderThreadHeight(getTargetHeight());
        resolve();
      }
    }

    window.requestAnimationFrame(animateFrame);
  });
}

function spiderBottomThreadHeight() {
  return Math.max(spiderHomeThreadHeight, window.innerHeight - 20);
}

function swingSpiderDrop() {
  if (spiderIsMoving) return;

  spiderIsMoving = true;
  hangingSpider.classList.add('is-moving', 'is-swinging');
  hangingSpiderButton.setAttribute('aria-pressed', 'true');
  hangingSpider.classList.remove('is-crawling', 'is-turned');
  spiderCrawlOffset = 0;
  hangingSpider.style.setProperty('--crawl-offset', '0px');

  if (spiderReducedMotion.matches) {
    setSpiderThreadHeight(spiderHomeThreadHeight);
    hangingSpider.classList.remove('is-moving', 'is-swinging');
    hangingSpiderButton.setAttribute('aria-pressed', 'false');
    spiderIsMoving = false;
    return;
  }

  spiderSwingPhase = 'descending';
  animateSpiderThreadTo(spiderBottomThreadHeight, 1050)
    .then(async () => {
      spiderSwingPhase = 'bottom';
      setSpiderThreadHeight(spiderBottomThreadHeight());
      await pauseSpider(260);
      spiderSwingPhase = 'ascending';
      await animateSpiderThreadTo(spiderHomeThreadHeight, 900);
    })
    .finally(() => {
      spiderSwingPhase = null;
      setSpiderThreadHeight(spiderHomeThreadHeight);
      hangingSpider.classList.remove('is-moving', 'is-swinging');
      hangingSpiderButton.setAttribute('aria-pressed', 'false');
      spiderIsMoving = false;
    });
}

window.addEventListener('resize', () => {
  if (spiderSwingPhase === 'bottom') setSpiderThreadHeight(spiderBottomThreadHeight());
});

hangingSpiderButton.addEventListener('click', async () => {
  if (spiderIsMoving) return;
  spiderIsMoving = true;
  hangingSpider.classList.add('is-moving');
  hangingSpiderButton.setAttribute('aria-pressed', 'true');

  spiderCrawlOffset = spiderCrawlOffset === 0 ? -58 : 0;
  if (spiderReducedMotion.matches) {
    hangingSpider.style.setProperty('--crawl-offset', `${spiderCrawlOffset}px`);
    hangingSpider.classList.toggle('is-turned');
    spiderIsMoving = false;
    hangingSpider.classList.remove('is-moving');
    hangingSpiderButton.setAttribute('aria-pressed', 'false');
    return;
  }

  setSpiderThreadHeight(8);
  await waitForSpiderTransition(hangingSpiderSilk, 'height', 420);
  hangingSpider.classList.add('is-crawling');
  hangingSpider.style.setProperty('--crawl-offset', `${spiderCrawlOffset}px`);
  await waitForSpiderTransition(hangingSpider, 'transform', 480);
  hangingSpider.classList.remove('is-crawling');
  hangingSpider.classList.toggle('is-turned');
  await pauseSpider(180);
  setSpiderThreadHeight(spiderHomeThreadHeight);
  await waitForSpiderTransition(hangingSpiderSilk, 'height', 420);
  hangingSpider.classList.remove('is-moving');
  spiderIsMoving = false;
  hangingSpiderButton.setAttribute('aria-pressed', 'false');
});

const terminalForm = document.querySelector('#terminal-form');
const terminalInput = document.querySelector('#terminal-input');
const terminalOutput = document.querySelector('#terminal-output');
const terminalClear = document.querySelector('#terminal-clear');
const terminalSuggestions = document.querySelector('.terminal-suggestions');
const terminalCommandHistory = [];
let terminalHistoryIndex = 0;

function appendTerminalEntry(command, response, links = []) {
  const entry = document.createElement('div');
  entry.className = 'terminal-entry';

  if (command !== null) {
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-command-line';
    const prompt = document.createElement('span');
    prompt.textContent = 'guest@spider-nel:~$';
    const commandText = document.createElement('span');
    commandText.textContent = command;
    commandLine.append(prompt, commandText);
    entry.append(commandLine);
  }

  const responseText = document.createElement('p');
  responseText.className = 'terminal-response';
  responseText.textContent = response;
  entry.append(responseText);

  if (links.length > 0) {
    const linkList = document.createElement('div');
    linkList.className = 'terminal-response-links';
    links.forEach(({ label, href, external = false }) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      linkList.append(link);
    });
    entry.append(linkList);
  }

  terminalOutput.append(entry);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function runTerminalCommand(input) {
  const command = input.trim();
  if (!command) return;

  terminalCommandHistory.push(command);
  terminalHistoryIndex = terminalCommandHistory.length;
  const normalizedCommand = command.toLowerCase();
  if (normalizedCommand === 'clear') {
    terminalOutput.replaceChildren();
    return;
  }

  let response;
  let links = [];
  switch (normalizedCommand) {
    case 'help':
      response = [
        'Available commands:',
        'help     List commands',
        'about    About Neljay',
        'skills   Technical skills',
        'projects Project links',
        'contact  Contact channels',
        'whoami   Identify this session',
        'date     Show today\'s date',
        'clear    Clear terminal output',
        'sudo     Request admin access'
      ].join('\n');
      break;
    case 'about':
      response = 'I\'m Neljay Sevilla, a BSIT student interested in coding, technology, and building interactive digital projects.';
      break;
    case 'skills':
      response = 'HTML, CSS, JavaScript, Python, Java, C/C++, MySQL, UI/UX + HCI, software testing, Roblox Studio, and AI-assisted tools. I\'m continuing to learn, with several areas at the fundamentals stage.';
      break;
    case 'projects':
      response = 'NexTime is a school facility booking system concept. Sea Urchin Hunting is my Roblox underwater sea-urchin game concept. Browse the project section or open the linked demos.';
      links = [
        { label: 'PROJECTS SECTION', href: '#missions' },
        { label: 'NEX TIME DEMO', href: 'https://nextimee.netlify.app/', external: true },
        { label: 'SEA URCHIN HUNTING', href: 'https://www.roblox.com/games/113408492560861/Sea-Urchin-Hunting', external: true }
      ];
      break;
    case 'contact':
      response = 'Use one of these existing channels to get in touch:';
      links = [
        { label: 'EMAIL · neljaynewyt12@gmail.com', href: 'mailto:neljaynewyt12@gmail.com' },
        { label: 'GITHUB · NeljaySevilla-UCM', href: 'https://github.com/NeljaySevilla-UCM', external: true },
        { label: 'FACEBOOK · neljay.sevilla', href: 'https://www.facebook.com/neljay.sevilla', external: true },
        { label: 'INSTAGRAM · neljayzenn', href: 'https://www.instagram.com/neljayzenn/', external: true }
      ];
      break;
    case 'whoami':
      response = 'Guest session detected. Welcome to the SPIDER-NEL system.';
      break;
    case 'date':
      response = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(new Date());
      break;
    case 'sudo':
      response = 'Administrator access unavailable. Nice try, though.';
      break;
    default:
      response = `Command not found: ${command}. Type "help" to see the available commands.`;
  }

  appendTerminalEntry(command, response, links);
}

appendTerminalEntry(null, 'SYSTEM READY // Type help or choose a command below to explore.');
terminalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  runTerminalCommand(terminalInput.value);
  terminalInput.value = '';
});

terminalInput.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && terminalHistoryIndex > 0) {
    event.preventDefault();
    terminalHistoryIndex -= 1;
    terminalInput.value = terminalCommandHistory[terminalHistoryIndex];
    terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
  } else if (event.key === 'ArrowDown' && terminalHistoryIndex < terminalCommandHistory.length) {
    event.preventDefault();
    terminalHistoryIndex += 1;
    terminalInput.value = terminalCommandHistory[terminalHistoryIndex] || '';
    terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
  }
});

terminalSuggestions.querySelectorAll('[data-terminal-command]').forEach((button) => {
  button.addEventListener('click', () => {
    runTerminalCommand(button.dataset.terminalCommand);
    terminalInput.value = '';
    terminalInput.focus();
  });
});

terminalClear.addEventListener('click', () => {
  terminalOutput.replaceChildren();
  terminalInput.focus();
});
