const url = './data.json';
const navLinks = document.querySelectorAll('.main-nav__menu li a');
const activityCards = document.querySelector('.activity-cards');
let currentSetting = 'weekly';

async function getDashboardData(currentSetting) {
  const response = await fetch(url);
  const data = await response.json();

  const activityCardsHTMLString = data.map((activity, index) => {
    const cardTitle = activity.title;
    const currentHours = activity.timeframes[currentSetting].current;
    const previousHours = activity.timeframes[currentSetting].previous;

    return `
      <article class="card__${removeExtraSpaces(cardTitle).toLowerCase()}">
        <div class="activity-card__content">
            <div class="activity-card__header">
              <h2 class="activity-card__title">${cardTitle}</h2>
              <button class="btn" aria-label="${cardTitle} Menu">
                <svg class="btn-icon" aria-hidden="true">
                  <use href="#ellipsis"></use>
                </svg>
              </button>
            </div>
            <div class="activity-card__body">
              <h3 class="activity-card__current-time">${currentHours}hrs</h3>
              <p class="activity-card__previous-time">
                <span class="timeframe">${getMessage(currentSetting)}</span>
                &nbsp;–&nbsp;
                <span class="total-time">${previousHours}hrs</span>
              </p>
            </div>
          </div>
      </article>
    `
  }).join('');
  activityCards.innerHTML = activityCardsHTMLString;
}

// Change message based on time setting - Weekly is default time display
function getMessage(currentSetting) {
  switch (currentSetting) {
    case 'daily':
      return 'Yesterday';
      break;
    case 'monthly':
      return 'Last Month';
      break;  
    default:
      return 'Last Week';
      break;
  }
}

// Remove extra space from Self Care to create CSS class name of selfcare
function removeExtraSpaces(word) {
  newWord = word.replace(/\s+/g, '');
  return newWord;
}

function menuClick(e) {
  const activeMenuLink = document.querySelector('.active');

  // Add active class to current menu list item
  if (e.target !== activeMenuLink) {
    e.target.classList.add('active');
    e.target.setAttribute('aria-pressed', true);
    currentSetting = e.target.innerText.toLowerCase();
    getDashboardData(currentSetting);
    
    // Remove active class off previous menu list item
    activeMenuLink.classList.remove('active');
    activeMenuLink.setAttribute('aria-pressed', false);
  }
}

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', menuClick);
});

getDashboardData(currentSetting);
