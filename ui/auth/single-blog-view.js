const href = new URL(location.href)
console.log(href);
const postId = href.hash.replace("#","")
console.log(postId);
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
//    console.log(fetchedBlog);

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

    // for(let j = 0; j < fetchedBlog.length; j++){
    //     let h1 = document.createElement("h1");
    //     let h2 = document.createElement("h2");
    //     let img = document.createElement("img");
    //     img.classList.add("blog-pic");
    //     let paragraph = document.createElement("div");
    //     paragraph.classList.add("para");

    //     h1.innerHTML =fetchedBlog[j].topic;
    //     blogContainer.appendChild(h1);

    //     h2.innerHTML =fetchedBlog[j].title;
    //     blogContainer.appendChild(h2);

    //     img.innerHTML =fetchedBlog[j].image;
    //     img.setAttribute("src",fetchedBlog[j].image);
    //     blogContainer.appendChild(img);

    //     paragraph.innerHTML =fetchedBlog[j].article;
    //     blogContainer.appendChild(paragraph);

    //     if(fetchedBlog[j].comments.length > 0){
    //         for(let k = 0; k < fetchedBlog[j].comments.length; k++){
    //             let pTag = document.createElement("p");
            
    //             pTag.innerHTML = "Name: "+ fetchedBlog[j].comments[k].name +"<br>Comment: "+ fetchedBlog[j].comments[k].comment +" Posted at: "+ fetchedBlog[j].comments[k]?.createdAt?.toLocaleString("en-GB")+"<br/>"
    //             commentsOutput.appendChild(pTag);
    //         }
    //         noComment.style.display = "none"
    //     }
        
        
    // }

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
            createdAt : new Date(Date.now())
        }
       const response = postComment(postId,commentsObject);
       console.log(response);
        console.log('This is the state of the blogs array in l.stogage after posting a comment: ', blogsArray);

        blogsArray.map( (blog) =>{
            if(blog.blogId == postId){
                console.log("i am here")
                blog.comments = response;
            }
        })
        console.log("i am the final state of blogs array", blogsArray);
        
        localStorage.setItem("Blogs", JSON.stringify(blogsArray));
        location.reload();
        // if(localStorage.getItem("Comments") == null){
        //     localStorage.setItem("Comments","[]");
        // }

        // let oldComments = JSON.parse(localStorage.getItem("Comments"));
        // oldComments.push(commentsObject);
        // localStorage.setItem("Comments",JSON.stringify(oldComments));
        // location.reload(); 
    }   
})
// let commentsArray = JSON.parse(localStorage.getItem("Comments"))??[];




// console.log(blogsArray)

// if(blogsArray.length > 0){
//     for(let j = 0; j < blogsArray.length; j++){
//         let h1 = document.createElement("h1");
//         let h2 = document.createElement("h2");
//         let img = document.createElement("img");
//         img.classList.add("blog-pic");
//         let paragraph = document.createElement("div");
//         paragraph.classList.add("para");

//         h1.innerHTML = blogsArray[j].topic;
//         blogContainer.appendChild(h1);

//         h2.innerHTML = blogsArray[j].title;
//         blogContainer.appendChild(h2);

//         img.innerHTML = blogsArray[j].image;
//         img.setAttribute("src", blogsArray[j].image);
//         blogContainer.appendChild(img);

//         paragraph.innerHTML = blogsArray[j].article;
//         blogContainer.appendChild(paragraph);
//     }

// }
// else{

// }

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
    console.log('This is the comments object passed as a param: ', commentsObject);
    const fetchedBlog = blogsArray.filter(({blogId}) => blogId == `${postId}`)
    console.log('This is the fetched blog when trying to comment: ', fetchedBlog);
    fetchedBlog[0].comments.push(commentsObject);
    console.log('This is the state of the fetched blog after being comment on: ', fetchedBlog);

    return fetchedBlog[0].comments;
}
