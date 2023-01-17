const topic = document.getElementById("topic");
const title = document.getElementById("title");
const article = document.getElementById("post");
const adminError1 = document.getElementById("admin-error1");
const adminError2 = document.getElementById("admin-error2");
const adminError3 = document.getElementById("admin-error3");
const previewBtn = document.getElementById("postbtn");
const articlesForm = document.getElementById("add-post-form");

articlesForm.addEventListener("submit", e =>{
    e.preventDefault();
    
    if(topic.value == null || topic.value === ""){
        adminError1.innerHTML = "Topic is required";
        topic.classList.add("invalid-article");
    }

    if(title.value == null || title.value === ""){
        adminError2.innerHTML = "Title is required";
        title.classList.add("invalid-article");
    }

    if(article.value == null || article.value === ""){
        adminError3.innerHTML = "Empty blog cannot be posted"
        article.classList.add("invalid-article");
    }

})