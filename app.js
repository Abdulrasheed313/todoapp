var list = document.getElementById("list")

firebase.database().ref('todos').on('child_added',function(data){
    //creat li/////

var li = document.createElement('li')

var liText = document.createTextNode(data.val().value)
li.appendChild(liText)
li.setAttribute("class","list")





///creat del button///

 var delBtn = document.createElement("button")
 var delText = document.createTextNode("DELETE")
 delBtn.appendChild(delText)
  li.appendChild(delBtn)
  delBtn.setAttribute("class","btn")
  delBtn.setAttribute('id',data.val().key)
  delBtn.setAttribute("onclick","deleteItem(this)")
  

  ////edit button///

  var editBtn = document.createElement("button")
  var editText = document.createTextNode("EDIT")
  editBtn.appendChild(editText)
  editBtn.setAttribute("class","btn")
  editBtn.setAttribute('id',data.val().key)
  editBtn.setAttribute("onclick","editItem(this)")
  

li.appendChild(editBtn)

    list.appendChild(li)
   
//     console.log(li)
})

function addTodo(){
    var todoApp = document.getElementById("todo-app")
    var database = firebase.database().ref('todos')
    var key = database.push().key;
   

var todo = {
    value: todoApp.value,
    key: key
}
    database.child(key).set(todo)
    todoApp.value = ""


}
function deleteItem(d){
    firebase.database().ref('todos').child(d.id).remove()
    d.parentNode.remove()
}
function editItem(e){
    var valu = prompt("ENTER YOUR EDIT", e.parentNode.firstChild.nodeValue)                  ;
   var editTodo = {
       value: valu,
       key: e.id
   }
   firebase.database().ref('todos').child(e.id).set(editTodo)
    
     e.parentNode.firstChild.nodeValue = valu;
    

 }

function deleteAll(){
    firebase.database().ref('todos').remove()
    list.innerHTML = ""
}

