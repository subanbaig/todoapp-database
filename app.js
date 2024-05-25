// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBMP19mo6EScPR9EkuOIVoY6dlMwtk390E",
    authDomain: "todo-app-22305.firebaseapp.com",
    databaseURL: "https://todo-app-22305-default-rtdb.firebaseio.com",
    projectId: "todo-app-22305",
    storageBucket: "todo-app-22305.appspot.com",
    messagingSenderId: "909421001840",
    appId: "1:909421001840:web:2bbb081679f4cd5d23c8b5"
  };

// Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  
  var db = firebase.database();

  // *************************************************************************
  var lit = document.getElementById("list");

  firebase.database().ref("Todos").on("child_added",function(data) {
    var liEle = document.createElement('li');
    
    var liTxt = document.createTextNode(data.val().value);
    
    liEle.appendChild(liTxt);
    
    lit.appendChild(liEle);
    
    var editBtnElemt = document.createElement('button');
    
    var editBtnTxt = document.createTextNode("Edit");
    
    editBtnElemt.appendChild(editBtnTxt);

    editBtnElemt.setAttribute("class",'edit')

    editBtnElemt.setAttribute("onclick",'editItem(this)')

    editBtnElemt.setAttribute("id", data.val().key)
    
    liEle.appendChild(editBtnElemt);
    
    var delBtnElemt = document.createElement('button');
    
    var delBtnTxt = document.createTextNode("Delete");
    
    delBtnElemt.appendChild(delBtnTxt);

    delBtnElemt.setAttribute("class",'del')

    delBtnElemt.setAttribute("onclick",'deleteItem(this)')

    delBtnElemt.setAttribute("id", data.val().key)
    
    liEle.appendChild(delBtnElemt);
});        

function addToDo(){
    var input = document.getElementById("taskInput");

    var key = Date.now().toString(26);

    var todos = {
        value: input.value,
        key,
    };

    firebase.database().ref("Todos/" + key).set(todos);

    input.value = "";
}

function deleteAll(){
    firebase.database().ref('Todos').remove();
    lit.innerHTML =" ";
}

function deleteItem(e){
    alert("You sure want to delete this!")
    firebase.database().ref(`Todos/${e.id}`).remove();
    e.parentNode.remove();
}
function editItem(e){
    var updateValue = prompt("Enter Updated Value",
        e.parentNode.firstChild.nodevalue);

        firebase.database().ref(`Todos/${e.id}`).set({
            key:e.id,
            value:updateValue,
        });

        window.location.reload(true);

        e.parentNode.firstChild.nodevalue = updateValue;
}