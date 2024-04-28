import BandSiteApi from "./band-site-api.js";

const form = document.querySelector(".comment__form");
const BandApi = new BandSiteApi("37a62273-2e78-413f-befb-0357b75e2328");

const commentPost = document.createElement("div");
commentPost.classList.add("comment__post");
document.querySelector(".comment__formAndPost").appendChild(commentPost);


async function renderNewComments() {
    try {
        const comments = await BandApi.getComment();
        commentPost.innerHTML = "";
        comments.forEach(commentObj => {
            renderComments(commentObj);
    });
} catch (error) {
    console.log('Error', error);
}
}

function formatDate(timestamp) {
   const date = new Date(timestamp);
   const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`; 
   return formattedDate;
}

// function to renderComments
function renderComments(commentObj) {

const commentContainer = document.createElement("div");
commentContainer.classList.add("comment__container");

const commentIcon = document.createElement("div");
commentIcon.classList.add("comment__icon");

const commentMainComment = document.createElement("div");
commentMainComment.classList.add("comment__mainComment");

const commentNameDateDiv = document.createElement("div");
commentNameDateDiv.classList.add("comment__nameDate");

const commentName = document.createElement("h4");
commentName.classList.add("comment__name");
commentName.textContent = commentObj.name;

const commentContent = document.createElement("p");
commentContent.classList.add("comment__content");
commentContent.textContent = commentObj.comment;

const commentDate = document.createElement("time");
commentDate.classList.add("comment__date");
commentDate.innerText = formatDate(commentObj.timestamp);

commentPost.appendChild(commentContainer);
commentContainer.appendChild(commentIcon);
commentContainer.appendChild(commentMainComment);
commentMainComment.appendChild(commentNameDateDiv);
commentNameDateDiv.appendChild(commentName);
commentMainComment.appendChild(commentContent);
commentNameDateDiv.appendChild(commentDate);
}

renderNewComments();

form.addEventListener("submit", async (e) => {
    e.preventDefault()

//Getting the inputs from the form
const name = document.getElementById("nameInput").value;
const commentText = document.getElementById("commentInput").value;

//Obj for each comment
const newComment = {
    name : name,
    comment: commentText,
};

try {
    await BandApi.postComment(newComment);
    await renderNewComments();
    document.getElementById("nameInput").value = "";
    document.getElementById("commentInput").value = "";
} catch (error) {
    console.log("Error", error);
}
});