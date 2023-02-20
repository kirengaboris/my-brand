const topic = document.getElementById('topic');
const title = document.getElementById('title');
const imagePreview = document.getElementById('preview-image');
const adminError1 = document.getElementById('admin-error1');
const adminError2 = document.getElementById('admin-error2');
const adminError3 = document.getElementById('admin-error3');
const previewBtn = document.getElementById('postbtn');
const articlesForm = document.getElementById('add-post-form');
const images = document.getElementById('file');
const reader = new FileReader();
const href = new URL(location.href);
const postId = href.hash.replace('#', '');

async function updateBlog(updatedBlog) {
  const url = `https://boris-47i2.onrender.com/api/blogs/${postId}`;
  try {
    let res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBlog),
    });
    const updatedData = await res.json();
    console.log(updatedData);
  } catch (error) {
    console.error(error);
  }
}

async function fetchBlog(blogId) {
  const url = `https://boris-47i2.onrender.com/api/blogs/${blogId}`;
  try {
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    const fetchedBlog = await res.json();

    currentBlog = fetchedBlog;
    editingBlog = currentBlog.data;
    console.log(editingBlog);

    const { topic, title, post, file } = articlesForm;
    topic.value = editingBlog.topic;
    title.value = editingBlog.title;
    post.innerHTML = editingBlog.content;
    console.log(editingBlog.content);
    console.log(post);
    file.result = editingBlog.image;

    articlesForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const updatedBlog = {
        id: currentBlog.data.id,
        topic: topic.value,
        title: title.value,
        content: post.value,
        image: file.files[0],
      };
      updateBlog(updatedBlog);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchBlog(postId);

// let currentBlog = null;

// async function fetchBlog(blogId) {
//   const url = `https://boris-47i2.onrender.com/api/blogs/${blogId}`;
//   try {
//     let res = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//       },
//     });
//     const fetchedBlog = await res.json();

//     currentBlog = fetchedBlog;
//     editingBlog = currentBlog.data;
//     console.log(editingBlog);

//     const { topic, title, post, image } = articlesForm;
//     topic.value = editingBlog.topic;
//     title.value = editingBlog.title;
//     post.value = editingBlog.content;
//     console.log(editingBlog.content);
//     console.log(post);
//     image.result = editingBlog.image;
//   } catch (error) {
//     console.error(error);
//   }
// }
// fetchBlog(postId);

// let blogsArray = JSON.parse(localStorage.getItem("Blogs"))??[];

// let currentBlog = null;

// function fetchBlog(postId){
//     const fetchedBlog = blogsArray.filter(({blogId}) => blogId == postId)
//     if(fetchedBlog){

//         currentBlog = fetchedBlog;
//         const { topic, title, content, image} = articlesForm;
//         fetchedBlog.map((blog) => {
//             imagePreview.src= blog.image;
//             topic.value = blog.topic;
//             title.value = blog.title;
//             content.value = blog.article;
//             image.result = blog.image;
//         })
//     }
// }
//  fetchBlog(postId)

// images.addEventListener("change", function(){
//     reader.readAsDataURL(this.files[0])
// })

// articlesForm.addEventListener("submit", e =>{
//     e.preventDefault();
//     var myContent = tinymce.activeEditor.getContent();
//     var topicName = topic.value;
//     var tittleName = title.value;

//     if(checkBlog(topicName,tittleName,myContent)){
//         blog = {
//             ...currentBlog[0],
//             topic : topicName,
//             title : tittleName,
//             article : myContent,
//             image : reader.result,
//             summary : myContent.substring(0, 200)+ "...",
//         }

//         const index = blogsArray.findIndex(blog => blog.blogId === currentBlog[0].blogId);
//         blogsArray[index] = blog;
//         localStorage.setItem("Blogs", JSON.stringify(blogsArray));
//         location.href = "/index.html"
//     }
// })

function checkBlog(topicName, tittleName, myContent) {
  let valid = true;

  if (topicName == null || topicName === '') {
    adminError1.innerHTML = 'Topic is required';
    topic.classList.add('invalid-article');
    valid = false;
  } else {
    if (topicName.length < 5) {
      adminError1.innerHTML = 'Topic is too short';
      topic.classList.add('invalid-article');
      valid = false;
    }
  }
  if (tittleName == null || tittleName === '') {
    adminError2.innerHTML = 'Title is required';
    title.classList.add('invalid-article');
    valid = false;
  } else {
    if (tittleName.length < 5) {
      adminError2.innerHTML = 'Title is too short';
      title.classList.add('invalid-article');
      valid = false;
    }
  }
  if (myContent == null || myContent === '') {
    adminError3.innerHTML = 'Empty blog cannot be posted';
    valid = false;
  } else {
    if (myContent.length > 0 && myContent.length < 20) {
      adminError3.innerHTML = 'Blog is too short';
      valid = false;
    }
  }
  return valid;
}
