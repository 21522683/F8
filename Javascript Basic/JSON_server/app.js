
// muốn chạy dcd trước tiên phải start json server
// chạy: npm start 
var courseApi = 'http://localhost:3000/courses'

function start() {
    getCourses(renderCourses);

    handleCreateForm();

}
start()
function getCourses(callBack)
{
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callBack);
}
function renderCourses(courses)
{
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function (course) {
        return `
            <li class="course-item-${course.id}">
                <p>ID: ${course.id}</p>
                <h4>Name of course: ${course.name}</h4>
                <h3>Description: ${course.description}</h3>
                <button onclick="deleteCourse(${course.id})">Xóa</button>
                <button onclick="HandleUpdateCourse(${course.id})">Sửa</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}
function deleteCourse(id)
{
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function (course) {
            var courseItem = document.querySelector(`.course-item-${course.id}`)
            if (courseItem)
            {
                courseItem.remove();
            }
        });
}
function updateCourse (data, id, cb)
{
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi + "/" + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(cb)
}
function HandleUpdateCourse(id)
{
    var name = document.querySelector(`.course-item-` + id + ' h4').innerText;
    var des = document.querySelector(`.course-item-` + id + ' h3').innerText;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="description"]').value = des;
    var updateButton = document.querySelector('#update');
    updateButton.onclick = () => {
        var name_course = document.querySelector('input[name="name"]').value;
        var des_course = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name_course,
            description: des_course,
        };

        updateCourse(formData, id, function () {
            getCourses(renderCourses);
        });
    }
}
function createCourse(data, callback)
{
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
function handleCreateForm()
{
    var createButton = document.querySelector('#create');

    createButton.onclick = () => {
        var name_course = document.querySelector('input[name="name"]').value;
        var des_course = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name_course,
            description: des_course,
        };
        createCourse(formData, function (){
            getCourses(renderCourses);
        }); 
        
    }
}

