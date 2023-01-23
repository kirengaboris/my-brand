const reviewBlog = document.getElementById("blog");
const postBtn = document.getElementById("postbtn");

let reviewArray = JSON.parse(localStorage.getItem("Review"))??[];

reviewArray.forEach(element => {

    reviewBlog.insertAdjacentHTML("afterbegin", `
        <article>
        <h1>${element.topic}</h1>
        <h2>${element.title}</h2>
        <img class="blog-pic" src=${element.image}>
        <p class="para">${element.article}</p>
        </article>
    `);
    
});

postBtn.addEventListener("click" , ()=>{
    location.href = "/index.html"  
})
