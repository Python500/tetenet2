const browserFrame = document.getElementById('browser-frame');
const addressBar = document.getElementById('address-bar');
const tabBar = document.getElementById('tab-bar');

let tabs = [];
let activeTabId = null;

function handleKey(e) {
  if (e.key === 'Enter') {
    updateActiveTabURL(addressBar.value);
  }
}

function updateActiveTabURL(url) {
  if (!url.startsWith('http')) {
    url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
  }
  const tab = tabs.find(t => t.id === activeTabId);
  if (tab) {
    tab.url = url;
    browserFrame.src = url;
  }
}

function reloadPage() {
  browserFrame.contentWindow.location.reload();
}

function goBack() {
  browserFrame.contentWindow.history.back();
}

function goForward() {
  browserFrame.contentWindow.history.forward();
}

function switchToTab(tabId) {
  tabs.forEach(tab => {
    tab.element.classList.remove('active');
    if (tab.id === tabId) {
      tab.element.classList.add('active');
      browserFrame.src = tab.url;
      addressBar.value = tab.url;
      activeTabId = tabId;
    }
  });
}

function closeTab(tabId) {
  const index = tabs.findIndex(t => t.id === tabId);
  if (index !== -1) {
    const tab = tabs[index];
    tabBar.removeChild(tab.element);
    tabs.splice(index, 1);

    // If the closed tab was active, switch to another
    if (activeTabId === tabId) {
      if (tabs.length > 0) {
        switchToTab(tabs[0].id);
      } else {
        browserFrame.src = 'about:blank';
        addressBar.value = '';
        activeTabId = null;
      }
    }
  }
}

function createNewTab(url = 'https://www.ghanaweb.com') {
  const id = Date.now().toString();
  const tabElement = document.createElement('div');
  tabElement.className = 'tab';
  tabElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showColorPicker(tabElement);
  });
  
  tabElement.innerHTML = `Tab ${tabs.length + 1} <span class="close">×</span>`;
  tabBar.appendChild(tabElement);

  const newTab = {
    id,
    element: tabElement,
    url
  };
  tabs.push(newTab);

  tabElement.addEventListener('click', () => switchToTab(id));
  tabElement.querySelector('.close').addEventListener('click', (e) => {
    e.stopPropagation();
    closeTab(id);
  });

  switchToTab(id);
}

// Create the first tab on load
createNewTab();

function showColorPicker(tabElement) {
  const colors = ['red', 'blue', 'green', 'purple', 'orange'];
  const menu = document.createElement('div');
  menu.style.position = 'absolute';
  menu.style.top = event.pageY + 'px';
  menu.style.left = event.pageX + 'px';
  menu.style.background = '#fff';
  menu.style.border = '1px solid #ccc';
  menu.style.padding = '5px';
  menu.style.zIndex = '1000';

  colors.forEach(color => {
    const btn = document.createElement('button');
    btn.style.background = color;
    btn.style.border = 'none';
    btn.style.margin = '2px';
    btn.style.width = '20px';
    btn.style.height = '20px';
    btn.title = color;
    btn.onclick = () => {
      tabElement.setAttribute('data-color', color);
      document.body.removeChild(menu);
    };
    menu.appendChild(btn);
  });

  document.body.appendChild(menu);

  document.addEventListener('click', function handler() {
    if (document.body.contains(menu)) {
      document.body.removeChild(menu);
      document.removeEventListener('click', handler);
    }
  });
}
window.onload = function() {
  document.body.classList.add('loaded');
};

window.onload = function() {
  // Start the progress bar and spinner animation
  simulateLoading();
};

function simulateLoading() {
  const progressBar = document.getElementById('progress-bar');
  const progressFill = document.getElementById('progress-bar-fill');
  const spinner = document.getElementById('spinner');

  progressBar.style.display = 'block'; // Show progress bar

  let progress = 0;
  const interval = setInterval(function() {
    progress += 10; // Increase progress by 10%
    progressFill.style.width = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      // Hide spinner and progress bar after loading
      spinner.style.display = 'none';
      progressBar.style.display = 'none';
      document.body.classList.add('loaded');
    }
  }, 300); // Adjust the speed of loading (300ms for each step)
}
window.onload = function() {
  // Start the progress bar and spinner animation
  simulateLoading();
};

function simulateLoading() {
  const progressBar = document.getElementById('progress-bar');
  const progressFill = document.getElementById('progress-bar-fill');
  const spinner = document.getElementById('spinner');
  const splashLogo = document.getElementById('splash-logo');
  
  progressBar.style.display = 'block'; // Show progress bar

  let progress = 0;
  const interval = setInterval(function() {
    progress += 10; // Increase progress by 10%
    progressFill.style.width = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      // Hide spinner and progress bar after loading
      spinner.style.display = 'none';
      progressBar.style.display = 'none';
      document.body.classList.add('loaded');
    }
  }, 300); // Adjust the speed of loading (300ms for each step)
  
  // Delay logo animation for better effect
  splashLogo.style.animation = 'logoAnimation 1.5s ease-out forwards';
}
function openUserProfile() {
  // For now, just show an alert, or replace this with your actual logic
  alert("User profile clicked!");
}
 
document.getElementById('search-bar').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();

    let url = document.getElementById('search-bar').value;

    // If it doesn't look like a URL, treat it as a search query
    if (!url.includes('.') || url.includes(' ')) {
      url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    document.getElementById('browser-frame').src = url;
  }
});

document.getElementById('search-bar').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();

    let input = document.getElementById('search-bar').value.trim();
    let url;

    if (input.startsWith("http://") || input.startsWith("https://")) {
      url = input;
    } else if (input.includes(".") && !input.includes(" ")) {
      url = "https://" + input;
    } else {
      url = "https://www.google.com/search?q=" + encodeURIComponent(input);
    }

    // Load the URL
    document.getElementById('browser-frame').src = url;

    // Hide the header and search bar
    document.querySelector('header').style.display = 'none';
    document.getElementById('search-container').style.display = 'none';
  }
});



