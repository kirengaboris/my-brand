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

async function updateBlog(postId, payload) {
  const url = `https://boris-47i2.onrender.com/api/blogs/${postId}`;
  try {
    let res = await fetch(url, {
      method: 'PATCH',
      body: payload,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.success === true) {
      location.href = '/index.html#blogs';
    }
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
      const formData = new FormData();
      formData.append('topic', topic.value);
      formData.append('title', title.value);
      formData.append('content', tinymce.activeEditor.getContent());
      formData.append('image', file.files[0]);
      updateBlog(postId, formData);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchBlog(postId);

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
