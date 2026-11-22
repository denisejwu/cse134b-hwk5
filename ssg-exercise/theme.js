const themeButton = document.getElementById("theme-toggle");
function loadTheme(){
    try{
        return localStorage.getItem("theme");
    }catch (error){
        return null;
    }
}

function saveTheme(theme){
    try{
        localStorage.setItem("theme", theme);
    }catch{
        console.warn("The theme preference could not be saved.");
    }
}

function applyTheme(theme){
    document.documentElement.dataset.theme = theme;
    if(theme === "dark"){
        themeButton.textContent = "Switch to light theme";
    }else{
        themeButton.textContent = "Switch to dark theme";
    }
}

let currentTheme = "light";
if(loadTheme() === "dark"){
    currentTheme = "dark";
}
applyTheme(currentTheme);
themeButton.hidden = false;

themeButton.addEventListener("click", function(){
    if(currentTheme === "dark"){
        currentTheme = "light";
    }else{
        currentTheme = "dark";
    }
    applyTheme(currentTheme);
    saveTheme(currentTheme);
});
