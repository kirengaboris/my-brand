const blogList = document.getElementById('blogs');
const noBlogListMessage = document.getElementById('no-blog-list');

let blogContainer = document.createElement('div');
blogContainer.classList.add('blog-container');

async function getBlogs() {
  const url = 'https://boris-47i2.onrender.com/api/blogs';

  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
getBlogs();
async function renderBlogs() {
  let blogs = await getBlogs();
  let blogsArray = blogs.data;
  if (blogsArray.length > 0) {
    noBlogListMessage.style.display = 'none';
    for (let i = 0; i < blogsArray.length; i++) {
      let blog = blogsArray[i];
      let blogCardEl = document.createElement('div');
      blogCardEl.classList.add('blog');
      let singleBlog = document.createElement('div');
      singleBlog.classList.add('single-blog');

      let blogLink = document.createElement('li');
      blogLink.classList.add('blog-view');
      blogCardEl.innerHTML = `<h1>${blog.topic}</h1>
                                <h2>${blog.title}</h2>
                                <p class="teaser">${
                                  blog.content.substring(0, 200) + '...'
                                }</p>`;
      singleBlog.appendChild(blogCardEl);
      blogLink.innerHTML = `<a href="/ui/client/single-blog-view.html#${blog._id}" target="_blank">Read More</a>`;
      singleBlog.appendChild(blogLink);
      blogContainer.appendChild(singleBlog);
    }
    blogList.appendChild(blogContainer);
  }
}
renderBlogs();
