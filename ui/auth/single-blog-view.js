const commentor = document.getElementById("name");
const comment = document.getElementById("comment");
const commentBtn = document.getElementById("commentbtn");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const commentsForm = document.getElementById("comment-form");
const commentsOutput = document.getElementById("comments-list");
const noComment = document.getElementById("no-comment");

commentsForm.addEventListener("submit", e =>{
    e.preventDefault();

    let commentorName = commentor.value;
    let theComment = comment.value;

    if(checkComment(commentorName,theComment)){
        commentsObject = {
            name: commentorName,
            comment: theComment
        }
        
        if(localStorage.getItem("Comments") == null){
            localStorage.setItem("Comments","[]");
        }

        let oldComments = JSON.parse(localStorage.getItem("Comments"));
        oldComments.push(commentsObject);
        localStorage.setItem("Comments",JSON.stringify(oldComments));
        location.reload(); 
    }   
})
let commentsArray = JSON.parse(localStorage.getItem("Comments"))

if(commentsArray.length > 0){
    for(let i = 0; i < commentsArray.length; i++){
        let pTag = document.createElement("p");
    
        pTag.innerHTML = "Name: "+ commentsArray[i].name +"<br>Comment: "+ commentsArray[i].comment;
        commentsOutput.appendChild(pTag);
    }
    noComment.style.display = "none"
}

function checkComment (commentorName,theComment){
    let validComment = true;

    if(commentorName == null || commentorName === ""){
        error1.innerHTML = "Name is required";
        commentor.classList.add("invalid-comments");
        validComment = false;
    }
    else{
        if(commentorName.length < 3){
            error1.innerHTML = "Too short for a name";
            commentor.classList.add("invalid-comments");
            validComment = false;
        }
    }

    if(theComment == null || theComment === ""){
        error2.innerHTML = "Comment is required";
        comment.classList.add("invalid-comments");
        validComment = false;
    }
    else{
        if(theComment.length < 4){
            error2.innerHTML = "Too short for a comment";
            comment.classList.add("invalid-comments");
            validComment = false;
        }
    }
    
    return validComment; 
}