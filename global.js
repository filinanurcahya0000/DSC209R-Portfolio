console.log("IT'S ALIVE!");

// Function to select elements
function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// Create an array of page objects
let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/index.html', title: 'Projects' },
    { url: 'contact/index.html', title: 'Contact' },
    { url: 'resume/index.html', title: 'Resume' },
    { url: 'https://github.com/filinanurcahya0000/DSC209R-Portfolio', title: 'GitHub Profile' }
];

// Create a <nav> element and prepend it to the body
let nav = document.createElement('nav');
document.body.prepend(nav);

// Check if we are on the home page
const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Iterate over the pages array to create links
for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Adjust URL for non-home pages
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    // Create a link element
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Highlight the current page link
    a.classList.toggle('current', a.host === location.host && a.pathname === location.pathname);

    // Open external links in a new tab
    if (a.host !== location.host) {
        a.target = "_blank"; // Opens GitHub link in a new tab
    }

    // Append the link to the nav
    nav.append(a);
}

// Navigation logic for the current page highlighting
let navLinks = $$("nav a");
let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
);
currentLink?.classList.add("current");

// Theme switcher setup
document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
        Theme:
        <select id="theme-switch">
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>
    `
);

// Position the switcher at the top right
document.querySelector(".color-scheme").style.cssText = `
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 80%;
`;

// Theme switcher event listener
const select = document.getElementById("theme-switch");
select.addEventListener("input", function (event) {
    const selectedScheme = event.target.value;
    document.documentElement.style.setProperty("color-scheme", selectedScheme);
    localStorage.colorScheme = selectedScheme; // Save user preference
});

// Load saved user preference on page load
if ("colorScheme" in localStorage) {
    const savedScheme = localStorage.colorScheme;
    document.documentElement.style.setProperty("color-scheme", savedScheme);
    select.value = savedScheme; // Update the select element
}
