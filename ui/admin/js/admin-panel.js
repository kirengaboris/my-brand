const topic = document.getElementById("topic");
const title = document.getElementById("title");
const adminError1 = document.getElementById("admin-error1");
const adminError2 = document.getElementById("admin-error2");
const adminError3 = document.getElementById("admin-error3");
const previewBtn = document.getElementById("postbtn");
const articlesForm = document.getElementById("add-post-form");
const images = document.getElementById("file");
const reader = new FileReader();

images.addEventListener("change", function(){

    reader.readAsDataURL(this.files[0])
})

articlesForm.addEventListener("submit", e =>{
    e.preventDefault();
    var myContent = tinymce.activeEditor.getContent();
    var topicName = topic.value;
    var tittleName = title.value;
   
    if(checkBlog(myContent,topicName,tittleName)){
        blog = {
            topic : topicName,
            title : tittleName,
            article : myContent,
            image : reader.result
        }

        if(localStorage.getItem("Blogs") == null){
            localStorage.setItem("Blogs","[]");
        }
        
        let oldBlogs = JSON.parse(localStorage.getItem("Blogs"));
        oldBlogs.push(blog);
        localStorage.setItem("Blogs",JSON.stringify(oldBlogs));
        location.href = "/ui/admin/preview-blog.html"  
    } 
})

function checkBlog (myContent,topicName,tittleName){
    let valid = true

    if(topicName == null || topicName === ""){
        adminError1.innerHTML = "Topic is required";
        topic.classList.add("invalid-article");
        valid = false;
    }
    else{
        if(topicName.length < 5){
            adminError1.innerHTML = "Topic is too short";
            topic.classList.add("invalid-article");
            valid = false;
        }
    }
    if(tittleName == null || tittleName === ""){
        adminError2.innerHTML = "Title is required";
        title.classList.add("invalid-article");
        valid = false;
    }
    else{
        if(tittleName.length < 5){
            adminError2.innerHTML = "Title is too short";
            title.classList.add("invalid-article");
            valid = false;
        }
    }
    if(myContent == null || myContent === ""){
        adminError3.innerHTML = "Empty blog cannot be posted" 
        valid = false;  
    }
    else{
        if(myContent.length > 0 && myContent.length < 20){
            adminError3.innerHTML = "Blog is too short"
            valid = false
        }
    }
    
    return valid;
}