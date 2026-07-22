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