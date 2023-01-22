const blogList = document.getElementById("blogList");

let blogsArray = JSON.parse(localStorage.getItem("Blogs"))??[];

let blogContainer = document.createElement("div");
    blogContainer.classList.add("blog-container");
    blogContainer.classList.add("swiper-wrapper");

for (let i = 0; i < blogsArray.length; i++) {
    let blog = blogsArray[i];
    let blogCardEl = document.createElement("div");
    blogCardEl.classList.add("blog");
    let singleBlog = document.createElement("div");
    singleBlog.classList.add("single-blog");
    singleBlog.classList.add("swipe-slider");
    
    let blogLink =document.createElement("li")
    blogLink.classList.add("blog-view");
    blogCardEl.innerHTML = `<h1>${blog.topic}</h1>
                            <h2>${blog.title}</h2>
                            <p class="teaser">${blog.summary}</p>`;
    singleBlog.appendChild(blogCardEl);
    blogLink.innerHTML = `<a href="/ui/client/single-blog-view.html#${blog.blogId}" target="_blank">Read More</a>`;
    singleBlog.appendChild(blogLink);
    blogContainer.appendChild(singleBlog);
}

blogList.appendChild(blogContainer);


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





