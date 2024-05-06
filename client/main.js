
function showContent(element_id)
{
    let temp = document.getElementById(element_id);
    let clon = temp.content.cloneNode(true);
    const parent = document.getElementById("container");
    parent.appendChild(clon);
   
}
function hideContent(element_id)
{
 const parent = document.getElementById("container");
 const child = document.getElementById(element_id);
 const throwawayNode=parent.removeChild(child);
   
}
showContent("entrence1");
showContent("entrence2");
const login_buttom = document.getElementById("button_login");
const signup_buttom = document.getElementById("button_sign_up");
login_buttom.addEventListener('click' , ()=>{
    hideContent("entrenceDiv");
    showContent("Login1");
    showContent("Login2");
    
})
signup_buttom.addEventListener('click' , ()=>{
    hideContent("entrenceDiv");
    showContent("Sign_up1");
    showContent("Sign_up2");
   
})
/*
button_log_in.addEventListener('click' , ()=>{
    hideContent("Login");

})
button_sign_up.addEventListener('click' , ()=>{
    hideContent("Sign_up");
    
})*/