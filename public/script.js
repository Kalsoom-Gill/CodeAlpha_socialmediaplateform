async function loadPosts() {
  const res = await fetch("/posts");

  const posts = await res.json();

  let html = "";

  posts.forEach((post) => {
    html += `
        <div class="post">

            <h4>Post #${post.id}</h4>

            <p>${post.content}</p>

            <button onclick="likePost(${post.id})">
            Like
            </button>

            <button onclick="followUser()">
            Follow
            </button>

            <div class="comment-box">

                <input
                type="text"
                id="comment-${post.id}"
                placeholder="Write Comment">

                <button onclick="addComment(${post.id})">
                Add Comment
                </button>

            </div>

        </div>
        `;
  });

  document.getElementById("posts").innerHTML = html;
}

async function registerUser() {
  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });

  alert("User Registered");
}

async function addPost() {
  const content = document.getElementById("postText").value;

  await fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: 1,
      content,
    }),
  });

  document.getElementById("postText").value = "";

  loadPosts();
}

async function likePost(id) {
  await fetch("/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: id,
    }),
  });

  alert("Post Liked");
}

async function addComment(postId) {
  const comment = document.getElementById(`comment-${postId}`).value;

  await fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: postId,
      comment,
    }),
  });

  alert("Comment Added");
}

async function followUser() {
  await fetch("/follow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      follower_id: 1,
      following_id: 2,
    }),
  });

  alert("User Followed");
}

loadPosts();
