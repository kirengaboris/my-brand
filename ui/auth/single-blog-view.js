const href = new URL(location.href);
const postId = href.hash.replace('#', '');
const commentor = document.getElementById('name');
const commentBtn = document.getElementById('commentbtn');
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const commentsForm = document.getElementById('comment-form');
const commentsOutput = document.getElementById('comments-list');
const noComment = document.getElementById('no-comment');
const blogContainer = document.getElementById('blog-container');
const noBlog = document.getElementById('no-blog');
const featured = document.getElementById('featured');
const likeCheckBox = document.getElementById('likes');
const likeIcon = document.getElementById('like-icon');
var currentScale = 1;

async function getBlog() {
  const getBlogUrl = `https://boris-47i2.onrender.com/api/blogs/${postId}`;
  const getCommentsUrl = `https://boris-47i2.onrender.com/api/blogs/${postId}/comments`;

  try {
    //get the blog and comments concurrently
    const [blogResponse, commentsResponse] = await Promise.allSettled([
      fetch(getBlogUrl),
      fetch(getCommentsUrl),
    ]);
    //handle blog response
    if (blogResponse.status === 'rejected') {
      const error = blogResponse.reason;
      console.log(`Error when fetching blog ${error}`);
    } else if (blogResponse.status === 'fulfilled') {
      const blog = await blogResponse.value.json();
      // console.log(blog.data);
      const fetchedBlog = blog.data;

      blogContainer.insertAdjacentHTML(
        'afterbegin',
        `
            <article>
            <h1>${fetchedBlog.topic}</h1>
            <h2>${fetchedBlog.title}</h2>
            <img class="blog-pic" src=${fetchedBlog.image}>
            <p class="para">${fetchedBlog.content}</p>
            </article>
            `,
      );
      // handle comment response
      if (commentsResponse.status === 'rejected') {
        const error = commentsResponse.reason;
        console.log(`Error when fetching blog ${error}`);
      } else if (commentsResponse.status === 'fulfilled') {
        const comments = await commentsResponse.value.json();
        // console.log(comments.data);
        const blogComments = comments.data;

        blogComments.map(({ user, createdAt, comment }) => {
          if (user || createdAt || comment) {
            noComment.style.display = 'none';
            commentsOutput.insertAdjacentHTML(
              'afterbegin',
              `
           <p>Names: ${user.username}</p>
           <p>Comment: ${comment}</p>
           <p>Posted on: ${createdAt}</p><br/>
            `,
            );
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
getBlog();

const addComment = async (postId, payload) => {
  try {
    const response = await fetch(
      `https://boris-47i2.onrender.com/api/blogs/${postId}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ comment: payload }),
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
    } else {
      location.href = '/index.html#login';
    }
  } catch (error) {
    console.log(error.message);
  }
};

const { comment } = commentsForm;

commentsForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const theComment = comment.value;
  if (checkComment(theComment)) {
    addComment(postId, theComment);
  }
});

likeCheckBox.addEventListener('change', (e) => {
  if (likeCheckBox.checked) {
    currentScale = 1.5;
    likeIcon.style.transform = `scale(${currentScale})`;
  } else {
    likeIcon.style.transform = `scale(${currentScale})`;
    currentScale = 1;
  }
  const likesNumber = addLike(postId, likeCheckBox);
  blogsArray.map((blog) => {
    if (blog.blogId == postId) {
      blog.likes = likesNumber;
    }
  });
  localStorage.setItem('Blogs', JSON.stringify(blogsArray));
});

function checkComment(theComment) {
  let validComment = true;

  if (theComment == null || theComment === '') {
    error2.innerHTML = 'Comment is required';
    comment.classList.add('invalid-comments');
    validComment = false;
  } else {
    if (theComment.length < 4) {
      error2.innerHTML = 'Too short for a comment';
      comment.classList.add('invalid-comments');
      validComment = false;
    }
  }
  return validComment;
}

function postComment(postId, commentsObject) {
  const fetchedBlog = blogsArray.filter(({ blogId }) => blogId == `${postId}`);
  fetchedBlog[0].comments.push(commentsObject);

  return fetchedBlog[0].comments;
}
function addLike(postId, checkBox) {
  const fetchedBlog = blogsArray.filter(({ blogId }) => blogId == `${postId}`);
  let counter = 0;
  if (checkBox.checked) {
    counter++;
  } else {
    counter = 0;
  }
  fetchedBlog[0].likes.push(counter);
  return fetchedBlog[0].likes;
}
