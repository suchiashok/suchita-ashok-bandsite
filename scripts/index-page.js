import BandSiteApi from "./band-site-api.js";

const form = document.querySelector(".comment__form");
const BandApi = new BandSiteApi("37a62273-2e78-413f-befb-0357b75e2328");
// Default three comments
// const commentArray = [
//     {name: "Victor Pinto", 
//     comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//     date: "11/02/2023"},
//     {name: "Christina Cabrera",
//     comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//     date: "10/28/2023"},
//     {name: "Isaac Tadesse",
//     comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//     date: "10/20/2023"}
// ];

const commentPost = document.createElement("div");
commentPost.classList.add("comment__post");
document.querySelector(".comment").appendChild(commentPost);


// function renderNewComments() {
//     commentPost.innerHTML = "";
//     commentArray.forEach(commentObj => {
//         renderComments(commentObj);
//     });
// }

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
commentDate.textContent = commentObj.date;

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
const dateLabel = document.getElementById("date").value;

//Obj for each comment
const newComment = {
    name : name,
    comment: commentText,
    date: dateLabel
};

// commentArray.unshift(newComment);
// renderNewComments();
// document.getElementById("nameInput").value = "";
// document.getElementById("commentInput").value = "";

// });
// console.log(commentArray);
try {
    await BandApi.postComment(newComment);
    await renderNewComments();
    document.getElementById("nameInput").value = "";
    document.getElementById("commentInput").value = "";
} catch (error) {
    console.log("Error", error);
}
});