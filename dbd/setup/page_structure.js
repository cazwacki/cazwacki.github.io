const upper_structure = document.createElement('template');

// video background
upper_structure.innerHTML += `
<br />
<div id="video-filter">
</div>
<img id="bg-img" src="images/background-backup.webp">
<video muted loop autoplay id="bg-video">
    <source src="images/background.mp4" type="video/mp4">
</video>`;

// nav bar
upper_structure.innerHTML += `
<header id="header">
    <div id="credit">
        <h1 id="name" class="h6 fw-normal text-light">Charles Zawacki</h1>
    </div>
    <div id="branding">
        <a href="index.html"><img width=64px height=64px src="images/dbd_small.png">
            <h1 class="h2 fw-normal">DBD Hub & Build Tools</h1>
        </a>
    </div>
    <div id="hamburger">
    </div>
</header>`;

document.body.prepend(upper_structure.content);

// footer
const lower_structure = document.createElement('template');

lower_structure.innerHTML += `
<footer id="footer">
        <br />
        <div class="mx-auto row justify-content-center footer-row">
            <div class="col">
                <a href="https://charles.zawackis.com" target="_blank">More About Me</a>
            </div>
            <div class="col">
                <p>Hope you enjoy the build generator!</p>
            </div>
            <div class="col">
                <a href="https://deadbydaylight.fandom.com" target="_blank">Dead By Daylight Wiki</a>
            </div>
        </div>
        <div class="mx-auto row justify-content-center footer-row">
            <div class="col">
                <a href="https://github.com/cazwacki" target="_blank">GitHub</a>
            </div>
            <div class="col">
                <a href="https://hits.seeyoufarm.com"><img
                    src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fcharles.zawackis.com%2Fdbd%2F&count_bg=%23BA854C&title_bg=%231D1D1D&icon=&icon_color=%239E9E9E&title=Daily+%2F+Total+Visits&edge_flat=false" /></a>
                <p> </p>
            </div>
            <div class="col">
                <a href="https://forum.deadbydaylight.com/en/categories/p6" target="_blank">Dead By Daylight Forums</a>
            </div>
        </div>
        <div class="mx-auto row justify-content-center footer-row">
            <div class="col">
                <a href="https://www.linkedin.com/in/charleszawacki/" target="_blank">LinkedIn</a>
            </div>
            <div class="col">
                <a href="https://www.paypal.com/donate?business=DUMTYDP6XGF9E&no_recurring=0&item_name=Tip+me+if+you+like+my+work%21+Appreciate+you%21&currency_code=USD"
                    target="_blank">Tip jar, if you really like my work!</a>
            </div>
            <div class="col">
                <a href="https://twitter.com/DeadByBHVR" target="_blank">Dead By Daylight Twitter</a>
            </div>
        </div>
        <br />
</footer>`;

document.body.append(lower_structure.content);
