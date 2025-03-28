document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling with Active Link Highlighting
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            
            document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Dark Mode Toggle with Smooth Transition
    const toggleButton = document.createElement('button');
    toggleButton.textContent = "🌙 Dark Mode";
    toggleButton.classList.add('theme-toggle');
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.textContent = "☀️ Light Mode";
            localStorage.setItem('theme', 'dark');
        } else {
            toggleButton.textContent = "🌙 Dark Mode";
            localStorage.setItem('theme', 'light');
        }
    });

    // Load Theme Preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = "☀️ Light Mode";
    }

    // Project Filter with Dynamic Search Feedback
    const filterInput = document.createElement('input');
    filterInput.placeholder = "Search Projects...";
    filterInput.classList.add('project-filter');
    document.getElementById('projects').prepend(filterInput);
    
    const noResults = document.createElement('p');
    noResults.textContent = "No projects found.";
    noResults.style.display = "none";
    noResults.classList.add('no-results');
    document.getElementById('projects').appendChild(noResults);
    
    filterInput.addEventListener('keyup', function () {
        let filterValue = filterInput.value.toLowerCase();
        let matches = 0;
        document.querySelectorAll('.project').forEach(project => {
            let text = project.textContent.toLowerCase();
            if (text.includes(filterValue)) {
                project.style.display = 'block';
                matches++;
            } else {
                project.style.display = 'none';
            }
        });
        noResults.style.display = matches === 0 ? 'block' : 'none';
    });

    // Animations on Scroll with Fade-In Effect
    const elements = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

// Dark Mode CSS
const style = document.createElement('style');
style.innerHTML = `
    .dark-mode {
        background-color: #121212;
        color: #f4f4f4;
        transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
    }
    .dark-mode section {
        background: #1e1e1e;
        color: #f4f4f4;
        box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    section {
        opacity: 0;
        transform: translateY(20px);
    }
    .theme-toggle {
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        background-color: #333;
        color: white;
        border: none;
        transition: background-color 0.3s;
    }
    .theme-toggle:hover {
        background-color: #555;
    }
    .project-filter {
        display: block;
        margin: 20px auto;
        padding: 10px;
        width: 80%;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1em;
    }
    .no-results {
        text-align: center;
        font-style: italic;
        color: #888;
    }
    nav ul li a.active {
        color: yellow;
        text-decoration: underline;
    }
`;
document.head.appendChild(style);
