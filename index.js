const blogList = document.getElementById("blogs");

let blogsArray = JSON.parse(localStorage.getItem("Blogs"))??[];

for (let i = 0; i < blogsArray.length; i++) {
    let blog = blogsArray[i];
    let blogCardEl = document.createElement("div");
    blogCardEl.classList.add("blog1");
    let blogLink =document.createElement("li")
    blogLink.classList.add("blog-view");
    blogLink.innerHTML = `<a href="/ui/client/single-blog-view.html#${blog.blogId}" target="_blank">Read More</a>`;
    blogList.appendChild(blogLink);
    blogCardEl.innerHTML = `<h1>${blog.topic}</h1>
                            <h2>${blog.title}</h2>
                            <p class="teaser">${blog.summary}</p>`;
    blogList.appendChild(blogCardEl);
}

// var blogContainerEl = document.getElementById("blog-container");
// for (var i = 0; i < blogList.length; i++) {
//     var blog = blogList[i];
//     var blogCardEl = document.createElement("div");
//     blogCardEl.classList.add("blog-card");
//     blogCardEl.innerHTML = `<h2>${blog.title}</h2>
//                             <p>${blog.summary}</p>
//                             <a href="${blog.link}" target="_blank">Read More</a>
//                             <p>By ${blog.author}</p>
//                             <div class="blog-card-footer">
//                                 <span>Comments: ${blog.comments}</span>
//                                 <span>Likes: ${blog.likes}</span>
//                             </div>`;
//     blogContainerEl.appendChild(blogCardEl);
// }





