// Step 1: Adding a JS file to all pages
console.log("IT'S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Step 2.1: Get an array of all nav links into a variable
let navLinks = $$("nav a");

// Step 2.2: Find the link to the current page
let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

// Step 2.3: Add the 'current' class to the current page link
currentLink?.classList.add("current");

// Step 3.1: Adding the navigation menu
let pages = [
  { url: "", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "contact/", title: "Contact" },
  { url: "resume/", title: "Resume" },
  // Add more pages here
];

let nav = document.createElement("nav");
document.body.prepend(nav);

// Step 3.1: Create links for each page and add to nav
const ARE_WE_HOME = document.documentElement.classList.contains("home");
for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Adjust URL for non-home pages
  url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;

  // Create link
  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;
  nav.append(a);

  // Step 3.2: Add 'current' class and open external links in new tab
  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === location.pathname
  );
  if (a.host !== location.host) {
    a.target = "_blank";
  }
}

// Step 4: Dark mode switch
document.body.insertAdjacentHTML(
  "afterbegin",
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

// Step 4.3: Position the switcher at the top right
document.querySelector(".color-scheme").style.cssText = `
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 80%;
`;

// Step 4.4: Making the theme switcher functional
const select = document.getElementById("theme-switch");

select.addEventListener("input", function (event) {
  document.documentElement.style.setProperty(
    "color-scheme",
    event.target.value
  );
  localStorage.colorScheme = event.target.value; // Save user preference
});

// Step 4.5: Load saved user preference on page load
if ("colorScheme" in localStorage) {
  const savedScheme = localStorage.colorScheme;
  document.documentElement.style.setProperty("color-scheme", savedScheme);
  select.value = savedScheme; // Update the select element
}

// Contact Form (Optional) could be handled similarly as per the lab instructions.
