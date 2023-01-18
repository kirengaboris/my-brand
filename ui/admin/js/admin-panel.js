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
    var myContent = tinymce.activeEditor.getContent();
    var topicName = topic.value;
    var tittleName = title.value;
   
    if(checkBlog(myContent,topicName,tittleName)){
        blog = {
            topic : topicName,
            title : tittleName,
            article : myContent
        }

        localStorage.setItem(tittleName,JSON.stringify(blog));
        location.href = "/ui/admin/preview-blog.html"  
    } 
})

function checkBlog (myContent,topicName,tittleName){
    let valid = true

    if(topicName == null || topic.value === ""){
        adminError1.innerHTML = "Topic is required";
        topic.classList.add("invalid-article");
        valid = false;
    }
    if(tittleName == null || title.value === ""){
        adminError2.innerHTML = "Title is required";
        title.classList.add("invalid-article");
        valid = false;
    }
    if(myContent == null || myContent === ""){
        adminError3.innerHTML = "Empty blog cannot be posted" 
        valid = false;  
    }
    if(myContent.length > 0 && myContent.length < 20){
        adminError3.innerHTML = "Blog too short"
        valid = false
    }
    
    return valid;
}