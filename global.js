// Check for existing color scheme and apply it
if ("colorScheme" in localStorage) {
    const savedScheme = localStorage.colorScheme;
    document.documentElement.setAttribute('data-theme', savedScheme); // Set theme
}

// Create dark mode switcher
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

// Add event listener to the select element
const select = document.getElementById("theme-switch");
select.addEventListener('input', function (event) {
    const theme = event.target.value;
    document.documentElement.style.setProperty('color-scheme', theme); // Change theme
    localStorage.setItem('colorScheme', theme); // Save user preference
});

// Set the initial value of the select based on the saved preference
select.value = localStorage.colorScheme || "light dark"; // Default to Automatic
