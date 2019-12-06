

let createMineralButton = document.querySelector('#create-mineral-button')
let createMineralDiv = document.querySelector('#create-mineral-div')
let mineralForm = document.querySelector('#mineral-form')


let commentListDiv = document.createElement('div')
commentListDiv.id = "comment-list-div"



// create a new mineral event listener on the form
mineralForm.addEventListener("submit", (event) => {
    event.preventDefault()

    newMineralName = event.target.name.value
    newMineralDesc = event.target.description.value
    newMineralURL = event.target.url.value

    fetch(`http://localhost:3000/minerals`, {
     method:'POST',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
        "name": newMineralName,
        "url": newMineralURL,
        "likes": 0,
        "description": newMineralDesc
      })
    })
    .then(resp => resp.json())
    .then(newMineral => {
        appendMineralsToPage(newMineral)
        // callback to function below
        mineralForm.reset()
    })

})
// create new mineral event listener END



// get all the minerals fetch function
let fetchMinerals = () => {
    
    fetch(`http://localhost:3000/minerals`)
    .then(resp => resp.json())
    .then((minerals) =>{
        minerals.forEach((mineral) => {
        appendMineralsToPage(mineral)
        // callback to function below
        }) 
    })
}
// end fetch function
fetchMinerals()




// start function APPEND MINERALS
let appendMineralsToPage = (mineral) => {


    let allMineralsDiv = document.querySelector('#all-minerals')

    let mineralUl = document.createElement('ul')
    let mineralLi = document.createElement('li')
   

    // name of mineral
    let mineralNameH2 = document.createElement('h2')
    mineralNameH2.innerText = mineral.name
    mineralNameH2.className = "mineralNameH2"

    // mineral image
    let imgLiDiv = document.createElement('div')
    let mineralImg = document.createElement("img")
    mineralImg.src = mineral.url
    imgLiDiv.className = "mineral-li-div"

    // mineral description
    let descPara = document.createElement('p')
    let mineralDesc = mineral.description
    descPara.append(mineralDesc)

    // like button
    let likeMineral = document.createElement('h5')
    likeMineral.innerText = `LIKE This Mineral! (Current: ${mineral.likes})`
    likeMineral.id = "like-btn"

    // delete button
    let deleteMineral = document.createElement('h5')
    deleteMineral.innerText = "DELETE This Mineral"
    deleteMineral.id = "delete-btn"

    // comment section
    let commentAreaTitle = document.createElement('h6')
    commentAreaTitle.innerText = "Like This Mineral? Leave A Comment!"
    commentAreaTitle.id = "comment-area-title"
    let commentAreaForm = document.createElement('form')
    commentAreaForm.id = "comment-area-form"
    let commentAreaBox = document.createElement('input')
    commentAreaBox.id = "comment-area"
    commentAreaBox.name = 'mineralComment'
    let commentSubmit = document.createElement('input')
    commentSubmit.setAttribute("type", "submit")

    // container of created comments div
    let commentsTitle = document.createElement('h5')
    commentsTitle.className = "comments-title"
    commentsTitle.innerText = "Comments:"

    let holdCommentsdiv = document.createElement('div')
    holdCommentsdiv.className = "hold-comments-div"

    // DOM slapping
    commentAreaForm.append(commentAreaBox, commentSubmit)
    allMineralsDiv.append(mineralUl)
    imgLiDiv.append(mineralImg)
    mineralUl.append(mineralLi)  
    mineralLi.append(mineralNameH2, imgLiDiv, descPara, likeMineral, commentAreaTitle, commentAreaForm, commentsTitle, holdCommentsdiv, deleteMineral) 
    

    // creating a comment event listener
    commentAreaForm.addEventListener("submit", (event) => {
        event.preventDefault()

        let commentValue = event.target.mineralComment.value
    
        
        fetch(`http://localhost:3000/comments`, {
        method:'POST',
        headers: { 
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
         body: JSON.stringify({
            mineral_id: mineral.id,
            comment: commentValue
        })
        })
        .then(resp => resp.json())
        .then((newComment) => {
            createComment(newComment)
            // callback to function below
            commentAreaForm.reset() 
        })
 
    })
    // creating comment event listener END




    // iteration through mineral comments 
    mineral.comments.forEach(comment => {
       
        let commentUl = document.createElement('ul')
        let commentLi = document.createElement('li')
        commentLi.innerText = comment.comment
        
        // comment delete button
        let commentDeleteButton = document.createElement("button")
        commentDeleteButton.innerText = "Delete Comment"

        holdCommentsdiv.append(commentUl)
        commentUl.append(commentLi)
        commentLi.append(commentDeleteButton)


        // delete button per comment event listener
        commentDeleteButton.addEventListener("click", (event) => {
        
            commentLi.remove()
            
            fetch(`http://localhost:3000/comments/${comment.id}`, {
            method:'DELETE'
            })
              
        })
        //  comment delete event listener END

    })
    // iteration of mineral comments end


    

    // LIKE button event listener
    likeMineral.addEventListener("click", () => {
        
    mineral.likes = mineral.likes + 1

    fetch(`http://localhost:3000/minerals/${mineral.id}`, {
    method:'PATCH',
    headers: { 
        'Content-type': 'application/json',
        'accept': 'application/json'
        },
        body: JSON.stringify({
            likes: mineral.likes
        })
    })
    .then(resp => resp.json())
    .then((updatedlikes) => {
        likeMineral.innerText = `Like This Mineral! (Total Likes: ${mineral.likes})`
        })

    })
    // like button event listner END



    // DELETE button event listener
    deleteMineral.addEventListener("click", (event) => {

        mineralLi.remove()
        
        fetch(`http://localhost:3000/minerals/${mineral.id}`, {
        method:'DELETE'
        })
        
    }) 

}
// creating mineral end of function



// create comment function start
let createComment = (newComment) => {
    let commentLi = document.createElement('li')
    commentLi.innerText = newComment.comment
}
// create comment end of function