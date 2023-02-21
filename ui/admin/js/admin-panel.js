const adminError1 = document.getElementById('admin-error1');
const adminError2 = document.getElementById('admin-error2');
const adminError3 = document.getElementById('admin-error3');
const previewBtn = document.getElementById('postbtn');
const articlesForm = document.getElementById('add-post-form');
const reader = new FileReader();
const queriesOutput = document.getElementById('all-queries-container');
const noMessageDiv = document.getElementById('no-msg');
const newQueries = document.getElementById('new-queries');
const noNewMessagegDiv = document.getElementById('no-new-msg');
const blogsContainer = document.getElementById('blogsContainer');
const noBlogsMessageDiv = document.getElementById('no-blogs');

const createBlog = async (payload) => {
  try {
    const response = await fetch('https://boris-47i2.onrender.com/api/blogs', {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      location.reload();
    }
  } catch (error) {
    console.log(error.message);
  }
};

const { topic, title, post, file } = articlesForm;

articlesForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('topic', topic.value);
  formData.append('title', title.value);
  formData.append('content', tinymce.activeEditor.getContent());
  formData.append('image', file.files[0]);

  const isValid = checkBlog(
    topic.value,
    title.value,
    tinymce.activeEditor.getContent(),
  );
  if (isValid) {
    createBlog(formData);
  }
});

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
  blogsArray.forEach((element) => {
    noBlogsMessageDiv.style.display = 'none';
    if (blogsArray.length > 0) {
      noBlogsMessageDiv.style.display = 'none';

      blogsContainer.insertAdjacentHTML(
        'afterbegin',
        `
        <p class="blog1"> ${element.title}</p>
        <a href="/ui/admin/edit-blog.html#${element?._id}"><button id="editbtn-b1" type="button">Edit</button></a>
        <button id="deletebtn-b1" class="delete" type="button" data-id=${element?._id}>Delete</button>
    `,
      );
    }
  });
}
renderBlogs();

async function deleteBlog(blogId) {
  const url = `https://boris-47i2.onrender.com/api/blogs/${blogId}`;

  try {
    let res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    const data = await res.json();
    if (data.success === true) {
      location.reload();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function renderBlogs() {
  let blogs = await getBlogs();
  let blogsArray = blogs.data;
  blogsArray.forEach((element) => {
    noBlogsMessageDiv.style.display = 'none';
    if (blogsArray.length > 0) {
      noBlogsMessageDiv.style.display = 'none';

      blogsContainer.insertAdjacentHTML(
        'afterbegin',
        `
        <p class="blog1"> ${element.title}</p>
        <a href="/ui/admin/edit-blog.html#${element?._id}"><button id="editbtn-b1" type="button">Edit</button></a>
        <button id="deletebtn-b1" class="delete" type="button" data-id=${element?._id}>Delete</button>
    `,
      );

      const deleteButton = document.querySelector(`[data-id="${element._id}"]`);
      deleteButton.addEventListener('click', async () => {
        const response = await deleteBlog(element._id);
        deleteButton.parentElement.remove();
      });
    }
  });
}

async function getQueries() {
  const url = 'https://boris-47i2.onrender.com/api/queries';

  try {
    let res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
getQueries();
async function renderQueries() {
  let queriesArray = (await getQueries()) ?? [];
  queriesArray.forEach((element) => {
    noMessageDiv.style.display = 'none';

    if (element?.seen == false) {
      noNewMessagegDiv.style.display = 'none';

      newQueries.insertAdjacentHTML(
        'afterbegin',
        `
        <p class="q-name">Name: ${element.name}</p>
        <p class="q-email">Email: ${element.email}</p>
        <p class="q-message">Message: ${element.message}</p>
        <button class="mark-seen" type="button" data-id=${element?._id}>Mark as read</button>
        `,
      );

      const markSeen = document.querySelector('.mark-seen');
      console.log(markSeen);
      markSeen.addEventListener('click', () => {
        const id = markSeen.dataset.id;
        markAsRead(id);
      });
    } else {
      queriesOutput.insertAdjacentHTML(
        'afterbegin',
        `
        <p class="q-name">Name: ${element.name}</p>
        <p class="q-email">Email: ${element.email}</p>
        <p class="q-message">Message: ${element.message}</p>
        `,
      );
    }
  });
}
renderQueries();

const markAsRead = async (id) => {
  try {
    const response = await fetch(
      `https://boris-47i2.onrender.com/api/queries/${id}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      location.reload();
    }
  } catch (error) {
    console.log(error.message);
  }
};

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
