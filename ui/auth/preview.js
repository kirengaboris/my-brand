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

let blog = reviewArray[0];
postBtn.addEventListener("click" , ()=>{
    let oldBlogs = JSON.parse(localStorage.getItem("Blogs"))??[];
    oldBlogs.push(blog);
    localStorage.setItem("Blogs",JSON.stringify(oldBlogs));
    location.href = "/index.html"    
})
