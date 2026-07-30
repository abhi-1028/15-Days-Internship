// console.log("JavaScript is Connected")

const year= new Date().getFullYear();
document.querySelector(`.site-footer p`).innerHTML=
`&copy; ${year} Abhilash. All Rights Reserved`;

function getGreetings(){
    const hour = new Date().getHours();
    if (hour<12) return "Good Morning";
    if (hour<17) return "Good Afternoon";
    return "Good Evening";
}
const heroTitle = document.querySelector('.hero-section h1');
if (heroTitle){
    heroTitle.textContent = `Hi ${getGreetings()} 👋, I am Abhilash`
}

//Dark Mode
let themeBtn = document.querySelector(".theme-toggle");
function updateThemeIcon(theme) {
    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}
 
if (themeBtn) {
    let savedTheme = localStorage.getItem("theme") || "light";
    document.body.dataset.theme = savedTheme;
    updateThemeIcon(savedTheme);
    themeBtn.addEventListener("click", () => {
        let nextTheme =
        document.body.dataset.theme === "light"? "dark":"light";
        document.body.dataset.theme = nextTheme;
        localStorage.setItem("theme", nextTheme);
        updateThemeIcon(nextTheme); 
    });
}

let menuToggle = document.querySelector(".menu-toggle");
let navLinks = document.querySelector(".nav-link");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        menuToggle.setAttribute(
            "aria-expanded",
            navLinks.classList.contains("open")
        );
    });

    document.querySelectorAll(".nav-link a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

let header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

let sections = document.querySelectorAll("section[id]");
let navItems = document.querySelectorAll(".nav-link a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

//dynamic year
let footyear=document.querySelector(".footer-year");
if(footyear){
    footyear.textContent=new Date().getFullYear();
}

//project filter
let projects=[{id:1,name:"Eventify AI", category:"web", tech:["React", "API"]},
{id:2,name:"AI Personal Workout Builder", category:"web",tech:["Javascript"]},
{id:3,name:"Campus Connect+", category:"design",tech:["HTML","CSS"]}, 
{id:4,name:"Portfolio", category:"web", tech:["HTML","CSS","JavaScript","React"]}]
 
function renderProjects(filter="all"){
    let grid=document.querySelector(".project-grid");
    let filtered=filter==="all"?projects
    :projects.filter(p=>p.category===filter);
    grid.innerHTML=filtered.map(project=>`
        <article class="project-card">
            <div class="project-card-body">
                <h3>${project.name}</h3>
                <div class="project-tags">${project.tech.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
                <a href="#" class="btn btn-primary">View Project</a>          
            </div>
        </article>
    `).join("");
}

//filter button
document.querySelectorAll(".filter.btn").forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelectorAll(".filter.btn").forEach(b=>b.classList.remove('active'));
        btn.classList.add("active");
        renderProjects(btn.dataset.filter);
    });
});
 
renderProjects();

let form=document.querySelector("#contact");
function showError(input,message){
let group=input.closest('.form-group');
let existing=group.querySelector(".error-msg");
if(!existing){
    let errEL=document.createElement('span');
    errEL.className="error-msg";
    errEL.textContent=message;
    group.appendChild(errEL);
}
input.classList.add("error")
}

function clearErrors(){
    document.querySelectorAll(".error-msg").forEach(e=>e.remove());
    document.querySelectorAll(".error").forEach(e=>e.classList.remove('error'));
}

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    clearErrors();
    let name=form.querySelector("#name");
    let email=form.querySelector("#email")
    let message=form.querySelector("#msg")
 
    let valid=true;
 
    if(!name.value.trim()){
        showError(name,"Name is required")
        valid=false;
    }
    if(!email.value.includes("@")){
        showError(email,"Enter a valid email");
        valid=false
    }
    if(message.value.trim().length<25){
        showError(message,"Message must be at least 25 characters")
        valid=false;
    }
    if(valid){
        let btn=form.querySelector('button[type="submit"]');
        btn.textContent="Sending...";
        btn.disabled=true;
 
        await new Promise(resolve=>setTimeout(resolve,1500));
        btn.textContent="Message Sent Successfully ✅";
        form.reset();
        setTimeout(()=>{
            btn.textContent="Send Message";
            btn.disabled=false
        },3000);
    }
});