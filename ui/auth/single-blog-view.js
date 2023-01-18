const commentor = document.getElementById("name");
const comment = document.getElementById("comment");
const commentBtn = document.getElementById("commentbtn");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const commentsForm = document.getElementById("comment-form");

commentsForm.addEventListener("submit", e =>{
    e.preventDefault();

    let commentorName = commentor.value;
    let theComment = comment.value;

    if(checkComment(commentorName,theComment)){
        commentsObject = {
            name: commentorName,
            comment: theComment
        }

        localStorage.setItem(commentorName, JSON.stringify(commentsObject));
        location.reload();
    }   
})

function checkComment (commentorName,theComment){
    let validComment = true;

    if(commentorName == null || commentorName === ""){
        error1.innerHTML = "Name is required";
        commentor.classList.add("invalid-comments");
        validComment = false;
    }

    if(theComment == null || theComment === ""){
        error2.innerHTML = "Comment is required";
        comment.classList.add("invalid-comments");
        validComment = false;
    }
    
    return validComment; 
}