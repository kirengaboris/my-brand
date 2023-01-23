const href = new URL(location.href);
const postId = href.hash.replace("#","");
const commentor = document.getElementById("name");
const comment = document.getElementById("comment");
const commentBtn = document.getElementById("commentbtn");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const commentsForm = document.getElementById("comment-form");
const commentsOutput = document.getElementById("comments-list");
const noComment = document.getElementById("no-comment");
const blogContainer = document.getElementById("blog-container");
const noBlog = document.getElementById("no-blog");
const featured = document.getElementById("featured");
const likeCheckBox = document.getElementById("likes");

let blogsArray = JSON.parse(localStorage.getItem("Blogs"))??[];

function featuredPosts(postId){
   const featuredPosts = blogsArray.filter(({blogId}) => blogId != postId)
    featuredPosts.map(({blogId,title}) =>{
        featured.insertAdjacentHTML("afterbegin",`
        <a class="section1" href="/ui/client/single-blog-view.html#${blogId}" target="_blank">${title}</a>
        `)
    })    
}
featuredPosts(postId)

function fetchBlog(postId){
   const fetchedBlog = blogsArray.filter(({blogId}) => blogId == postId)

   if(fetchedBlog){

    fetchedBlog.map((blog) => {
        blogContainer.insertAdjacentHTML("afterbegin",
        `
        <article>
        <h1>${blog.topic}</h1>
        <h2>${blog.title}</h2>
        <img class="blog-pic" src=${blog.image}>
        <p class="para">${blog.article}</p>
        </article>
        `)

        blog.comments.map(({name,createdAt,comment}) =>{

           if(name || createdAt || comment){
            noComment.style.display = "none"
            commentsOutput.insertAdjacentHTML("afterbegin",
            `
           <p>Names: ${name}</p>
           <p>Comment: ${comment}</p>
           <p>Posted on: ${createdAt}</p><br/>
            `)
           } 
        }) 
    })
}
}
fetchBlog(postId)

commentsForm.addEventListener("submit", e =>{
    e.preventDefault();

    let commentorName = commentor.value;
    let theComment = comment.value;

    if(checkComment(commentorName,theComment)){
        commentsObject = {
            name: commentorName,
            comment: theComment,
            commentsId : crypto.randomUUID(),
            postId : postId,
            createdAt : new Date(Date.now()).toLocaleString()
        }
       const response = postComment(postId,commentsObject);

        blogsArray.map( (blog) =>{
            if(blog.blogId == postId){
                console.log("i am here")
                blog.comments = response;
            }
        })
        
        localStorage.setItem("Blogs", JSON.stringify(blogsArray));
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

function postComment(postId, commentsObject){
    const fetchedBlog = blogsArray.filter(({blogId}) => blogId == `${postId}`)
    fetchedBlog[0].comments.push(commentsObject);

    return fetchedBlog[0].comments;
}
