var Students = [
    {   
        id: 1,
        name: "Linh",
        score: {
            js: 8,
            android: 9.0
        },
        class: "PNV20A"
    },
    {
        id: 2,
        name: "Hân",
        score: {
            js: 7,
            android: 9.0
        },
        class: "PNV20B"
    },
    {
        id: 3,
        name: "Huy",
        score: {
            js: 6,
            android: 8.0
        },
        class: "PNV20A"
    },
    {
        id: 4,
        name: "Bảo",
        score: {
            js: 8,
            android: 9.0
        },
        class: "PNV20B"
    }
]


ListStudents = JSON.parse(localStorage.getItem ('items'));
if(ListStudents === null || ListStudents === undefined){
    localStorage.setItem('items', JSON.stringify(Students));
    ListStudents =JSON.parse(localStorage.getItem ('items'))
}
console.log(ListStudents);
console.log(Students);

// function generateStudentsHtml (student, index) {    
//     var rankCondition=(parseInt(student.androidScore)+ parseInt(student.jsScore))/2;
//     var rank="";
//     var color="gray";
//     if(rankCondition>8){
//         rank="Very Good";
//         color="#d9c707"
//     }
//     return `


function generateStudentsHtml (student) {  
    var avrScore = (student.score.js + student.score.android)/2;
    var color ="";
    if(avrScore>8)  {
        color = "yellow";
    } else if(avrScore >7){
        color = "green";
    }
    else color = "grey";
    return `
    <tr>
        <th scope="row">${student.id}</th>
        
        <td><input style="border-width:0px;border:none; type="text" id="${student.id}-name" value="${student.name}" readonly></td>
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-class" value="${student.class}" readonly>
        </td>
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-js" value="${student.score.js}" readonly></td>
        </td>
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-android" value="${student.score.android}" readonly></td>
        </td>
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-android" value="${((student.score.js)+(student.score.android))/2}" readonly></td>
        </td>
        <td>
            
            <input style="background-color:${color}; border-width:0px;border:none; type="text" id="${student.id}-android" 
            value=` + ranking(student) + `  readonly></td>
        </td>
        <td>
            <a class="" style="color: green" onClick="editStudent(event, '${student.id}')" ><i class="fa fa-pencil edit" id="edit${student.id}"  aria-hidden="true"></i><a>
            <a style="color: blue" onclick = "editStudentClick(${student.id})"><i class="fa fa-floppy-o save" aria-hidden="true" id="save${student.id}" hidden "></i></a>
            <a class="" style="color: red" onClick="deleteStudent(event, '${student.id}')" ><i class="fa fa-trash-o" id="delete"  aria-hidden="true"></i></a>
            
        <td>
    </tr>
    `;
}



function ranking(student){
    var avrScore = (student.score.js + student.score.android)/2; 
    if(avrScore > 8){
        return "Verygood";
    }else if(avrScore > 7){
        return "Good";
    }else return "Normal";

}


function loadStudent(data){    
    let studentHtml = data.reduce((html, Student) => html += this.generateStudentsHtml(Student), "");
    document.getElementById('studentList').innerHTML = studentHtml;
}

//click add students: 

function addStudentClick()  {
    let idSt = parseInt(document.getElementById("idStudent").value);
    let nameSt = document.getElementById("studentName").value;
    let classSt = document.getElementById("className").value;
    let jsScoreSt = parseFloat(document.getElementById("jsScore").value);
    let androidScoreSt = parseFloat(document.getElementById("androidScore").value);

    if(nameSt===""){
        document.getElementById("error").innerHTML="Invalid name";
    }
    if(jsScoreSt>10 || jsScoreSt<0){
        document.getElementById("error1").innerHTML="Invalid JS score";
    }
    if(androidScoreSt>10 || androidScoreSt<0){
        document.getElementById("error2").innerHTML="Invalid Android score";
    }
    if(nameSt!="" && jsScoreSt >=0 && jsScoreSt <= 10 && androidScoreSt >=0 && androidScoreSt <= 10){
        saveNewStudent(idSt, nameSt, jsScoreSt, androidScoreSt, classSt);
    }
    
}


function addNewStudent ()  {
    document.getElementById("addStudent").style.display="block";
    document.getElementById("showInforStudents").style.display="none";
}


//save infor new student
function saveNewStudent(id, name, js, android, className) {
    
    let newStudent = {
        id: id,
        name: name,
        score: {
            js: js,
            android: android
        },
        class: className
    }
    console.log(1, newStudent);
    console.log(2, ListStudents);
    console.log(3, Students);


    ListStudents.push(newStudent);
    localStorage.setItem('items', JSON.stringify(ListStudents));
    this.loadStudent(ListStudents);
    document.getElementById("idStudent").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("className").value = "";
    document.getElementById("jsScore").value = "";
    document.getElementById("androidScore").value = "";

    
    document.getElementById("addStudent").style.display="none";
    document.getElementById("showInforStudents").style.display="block";

   
}


function deleteStudent(id)  {
    var result = confirm("Are you sure to delete?");
    if(result){
        let index = ListStudents.findIndex(k=>k.id==id)
        console.log(index)
        ListStudents.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(ListStudents));
        this.loadStudent(ListStudents);
    }
}

//edit infor student

function editStudent(event,id) {
    var index = ListStudents.findIndex(k=>k.id == id);
    //console.log(index);
    var edit = document.getElementById("edit"+id);
    var save = document.getElementById("save"+id);
    edit.setAttribute("hidden", false);
    save.removeAttribute("hidden");

    var name = document.getElementById(id + "-name");
    var classSt = document.getElementById(id + "-class");
    var js = (document.getElementById(id + "-js"));
    var android = document.getElementById(id + "-android");

    classSt.removeAttribute("readonly");
    name.removeAttribute("readonly");
    js.removeAttribute("readonly");
    android.removeAttribute("readonly");
}


editStudentClick = (id) => {
    let index = ListStudents.findIndex(k=>k.id == id); 
    //Phương thức findIndex() trả về chỉ số (index) của
    //  phần tử đầu tiên trong mảng thỏa mãn hàm truyền vào. 
    //  Nếu không phần tử nào thỏa mãn, phương thức trả lại -1.
    let nameStEdited = document.getElementById(id + "-name").value;
    let classNameEdited = document.getElementById(id + "-class").value;
    let jsScoreEdited = parseFloat(document.getElementById(id + "-js").value);
    let androidScoreEdited = parseFloat(document.getElementById(id + "-android").value);
    ListStudents[index].name = nameStEdited;
    ListStudents[index].class = classNameEdited;
    ListStudents[index].score.js = jsScoreEdited;
    ListStudents[index].score.android = androidScoreEdited;

    console.log(classNameEdited)
    localStorage.setItem('items', JSON.stringify(ListStudents));
    loadStudent(ListStudents);
    
}


function searchStudent() {
    let nameSearh = document.getElementById("search").value;
    let resultSearch = ListStudents.filter(item => item.name.search(nameSearh) != -1);
    return resultSearch;
}


function search(){
    loadStudent(searchStudent());
}

loadStudent(ListStudents);

function sortStudentByName(){
    localStorage.setItem('items', JSON.stringify(ListStudents.sort(compareName)));
    this.loadStudent(ListStudents);
}



function compareName(namea, nameb) {
    const name1 = namea.name.toUpperCase();
    const name2 = nameb.name.toUpperCase();
    
    let comparison = 0;
    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
}
