const commentor = document.getElementById("name");
const comment = document.getElementById("comment");
const commentBtn = document.getElementById("commentbtn");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const commentsForm = document.getElementById("comment-form");

commentsForm.addEventListener("submit", e =>{
    e.preventDefault();

    if(commentor.value == null || commentor.value === ""){
        error1.innerHTML = "Name is required";
        commentor.classList.add("invalid-comments");
    }
    if(comment.value == null || comment.value === ""){
        error2.innerHTML = "Comment is required";
        comment.classList.add("invalid-comments");
    }
})