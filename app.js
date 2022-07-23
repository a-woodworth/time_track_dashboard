const navLinks = document.querySelectorAll('.main-nav__menu li a');
const activityCards = document.querySelector('.activity-cards');

// Update message for time period on card
const timeText = {
  'daily'   : 'Yesterday',
  'weekly'  : 'Last Week',
  'monthly' : 'Last Month' 
}

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', menuClick);
});

function menuClick(e) {
  const activeMenuLink = document.querySelector('.active');

  // Add active class to current menu list item
  if (e.target !== activeMenuLink) {
    e.target.classList.add('active');
    e.target.setAttribute('aria-pressed', true);
    
    // Remove active class off previous menu list item
    activeMenuLink.classList.remove('active');
    activeMenuLink.setAttribute('aria-pressed', false);
  }
}
