const form = document.querySelector(".comment__form");
// Default three comments
const commentArray = [
    {name: "Victor Pinto", 
    comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."},
    {name: "Christina Cabrera",
    comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."},
    {name: "Isaac Tadesse",
    comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."}
];

const commentPost = document.createElement("div");
commentPost.classList.add("comment__post");
document.querySelector(".comment").appendChild(commentPost);

function renderNewComments() {
    commentPost.innerHTML = "";
    commentArray.forEach(commentObj => {
        renderComments(commentObj);
    });
}


// function to renderComments
function renderComments(commentObj) {

const commentContainer = document.createElement("div");
commentContainer.classList.add("comment__container");

const commentName = document.createElement("h4");
commentName.textContent = commentObj.name;

const commentContent = document.createElement("p");
commentContent.textContent = commentObj.comment;

commentContainer.appendChild(commentName);
commentContainer.appendChild(commentContent);
commentPost.appendChild(commentContainer);
}

renderNewComments();

form.addEventListener("submit", (e) => {
    e.preventDefault()

//Getting the inputs from the form
const name = document.getElementById("nameInput").value;
const commentText = document.getElementById("commentInput").value;

//Obj for each comment
const newComment = {
    name : name,
    comment: commentText
};

commentArray.push(newComment);
renderNewComments();
document.getElementById("nameInput").value = "";
document.getElementById("commentInput").value = "";

});
console.log(commentArray);

  