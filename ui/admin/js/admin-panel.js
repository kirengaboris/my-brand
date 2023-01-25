const topic = document.getElementById("topic");
const title = document.getElementById("title");
const adminError1 = document.getElementById("admin-error1");
const adminError2 = document.getElementById("admin-error2");
const adminError3 = document.getElementById("admin-error3");
const previewBtn = document.getElementById("postbtn");
const articlesForm = document.getElementById("add-post-form");
const images = document.getElementById("file");
const reader = new FileReader();
const queriesOutput = document.getElementById("all-queries-container");
const noMessageDiv = document.getElementById("no-msg");
const newQueries = document.getElementById("new-queries");
const noNewMessagegDiv = document.getElementById("no-new-msg");
const blogsContainer = document.getElementById("blogsContainer");
const noBlogsMessageDiv = document.getElementById("no-blogs");

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
            image : reader.result,
            blogId : crypto.randomUUID(),
            summary : myContent.substring(0, 200)+ "...",
            comments : [],
            likes : []
        }
        let review = [];
        review.push(blog)
        localStorage.setItem("Review",JSON.stringify(review));
        location.href = "/ui/admin/preview-blog.html"  
    } 
})

let blogsArray = JSON.parse(localStorage.getItem("Blogs"))??[]

blogsArray.forEach(element =>{
    noBlogsMessageDiv.style.display = "none"
    if(blogsArray.length > 0){
        noBlogsMessageDiv.style.display = "none"

        blogsContainer.insertAdjacentHTML("afterbegin",`
        <p class="blog1"> ${element.title}</p>
        <a href="/ui/admin/edit-blog.html#${element?.blogId}"><button id="editbtn-b1" type="button">Edit</button></a>
        <button id="deletebtn-b1" class="delete" type="button" data-id=${element?.blogId}>Delete</button>
    `)
    }
});

const deleteBlogBtn = [...document.getElementsByClassName("delete")];

deleteBlogBtn.forEach(button =>{
    button.addEventListener("click", e =>{
        let targetedId = button.dataset.id;
        let updatedBlogs = blogsArray.filter(object => object.blogId !== targetedId);
        localStorage.setItem("Blogs",JSON.stringify(updatedBlogs));
        location.reload();
    })
});

let queriesArray = JSON.parse(localStorage.getItem("Queries"))??[];

queriesArray.forEach(element => {
    noMessageDiv.style.display = "none"

    if(element?.seen == false){
        noNewMessagegDiv.style.display = "none"

        newQueries.insertAdjacentHTML("afterbegin", `
        <p class="q-name">Name: ${element.names}</p>
        <p class="q-email">Email: ${element.theEmail}</p>
        <p class="q-message">Message: ${element.theMessage}</p>
        <button class="mark-seen" type="button" data-id=${element?.id}>Mark as read</button>
        `);
    }
    else{
        queriesOutput.insertAdjacentHTML("afterbegin", `
        <p class="q-name">Name: ${element.names}</p>
        <p class="q-email">Email: ${element.theEmail}</p>
        <p class="q-message">Message: ${element.theMessage}</p>
        `);
    }
});

const deleteBtns = [...document.getElementsByClassName("mark-seen")];

deleteBtns.forEach(button => {
    button.addEventListener("click", e =>{
        const targetBtn = e.currentTarget.dataset.id;
        markSeen(targetBtn);
    })
})

function markSeen (messageId){
    queriesArray.forEach((element) => {
        if(element.id == messageId){
            element.seen = true;
        }
    }
    );
    localStorage.setItem("Queries",JSON.stringify(queriesArray));
    location.reload();
}

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
