let allTutors = [];

function showTutors(page) {
    const parent = document.getElementById('tutor-column');

    getTutors().then(tutors => {
        allTutors = tutors;
        parent.innerHTML = '';
        tutors = tutors.slice(page * 3, Math.min((page + 1) * 3), tutors.length);
        for (const tutor of tutors) {
            parent.insertAdjacentHTML('beforeend', `<div class="col-md-4">
            <div class="card">
                <p style="margin-left: 10px;">Tutor ${tutor.id} - Name: ${tutor.name} - Qualifications: ${tutor.languages_offered.join(', ')} - 
                Experience: ${tutor.work_experience} years - Language level: ${tutor.language_level}</p>
            </div>
            </div>`)
        }
    })
}

let allCourses = [];

function showCourses(page) {
    const parent = document.getElementById('course-column');
    
    getCourses().then(courses => {
        allCourses = courses;
        parent.innerHTML = '';
        courses = courses.slice(page * 3, Math.min((page + 1) * 3), courses.length);

        for (const course of courses) {
            parent.insertAdjacentHTML('beforeend', `<div class="col-md-4">
                <div class="card">
                    <p style="margin-left: 10px;">${course.id}. ${course.name}</p>
                </div>
            </div>`)
        }
    })
}

function searchCourses(name, level) {
    const parent = document.getElementById('search-courses-column');
    
    getCourses().then(courses => {
        allCourses = courses;
        parent.innerHTML = '';
        for (const course of courses) {
            if ((name == '' || course.name.toLowerCase().includes(name.toLowerCase())) && level == course.level.toLowerCase()) {
                parent.insertAdjacentHTML('beforeend', `<div class="col-md-4">
                    <div class="card">
                        <p style="margin-left: 10px;">${course.id} - Name: ${course.name} - Level: ${course.level} - Teacher: ${course.teacher} - Week length: ${course.total_length}</p>
                    </div>
                </div>`)
            }
        }
    })
}

function searchTutors(qualifications, experience) {
    const parent = document.getElementById('tutor-search-column');

    getTutors().then(tutors => {
        parent.innerHTML = '';
        for (const tutor of tutors) {
            if ((qualifications.toLowerCase() == tutor.language_level.toLowerCase() || qualifications == 'all') && (experience == 'all' || 
                (experience == '1' && 0 <= tutor.work_experience && 3 >= tutor.work_experience) || (experience == '2' && 3 <= tutor.work_experience && 5 >= tutor.work_experience) ||
                (experience == '3' && 5 <= tutor.work_experience))) {
                parent.insertAdjacentHTML('beforeend', `<div class="col-md-4">
                <div class="card">
                    <p style="margin-left: 10px;">Tutor ${tutor.id} - Name: ${tutor.name} - Qualifications: ${tutor.languages_offered.join(', ')} - 
                    Experience: ${tutor.work_experience} years - Language level: ${tutor.language_level}</p>
                </div>
                </div>`)
                }
        }
    })
}

let page1 = 0;
let page2 = 0
showCourses(page1);
showTutors(page2)

document.addEventListener("DOMContentLoaded", function() {
    const openModalButton = document.querySelector('button[data-toggle="modal"]');
    const modalElement = document.getElementById('orderModal');
    const modal = new bootstrap.Modal(modalElement);
    const closeModalButton1 = modalElement.querySelector('.close2');
    const closeModalButton2 = document.getElementById('close-modal2');
    const closeModalButton3 = document.getElementById('close-modal1');
    const closeModalButton4 = document.querySelector('.close1');
    const previousCourses = document.getElementById('previous_courses');
    const nextCourses = document.getElementById('next_courses');
    const previousTutors = document.getElementById('previous_tutors');
    const nextTutors = document.getElementById('next_tutors');
    const userAccountButton = document.querySelector('#user-account');
    const userAccountModal = new bootstrap.Modal(document.getElementById('userAccountModal'));
    const formSearchCourses = document.querySelector('#search-courses form');
    const inputSearchCoursesName = formSearchCourses.querySelector('input[name="course_name"]');
    const selectSearchCoursesLevel = formSearchCourses.querySelector('select[name="level"]');
    const formTutorSearch = document.querySelector('#tutor-search form');
    const selectTutorSearchQualifications = formTutorSearch.querySelector('.form-control3');
    const selectTutorSearchExperience = formTutorSearch.querySelector('.form-control4');
    

    openModalButton.addEventListener('click', function() {
        modal.show();
    });

    formTutorSearch.addEventListener('submit', function(event) {
        event.preventDefault();

        const qualifications = selectTutorSearchQualifications.value;
        const experience = selectTutorSearchExperience.value;
        searchTutors(qualifications, experience)
    });

    formSearchCourses.addEventListener('submit', function(event) {
        event.preventDefault();

        const courseName = inputSearchCoursesName.value;
        const level = selectSearchCoursesLevel.value;
        
        searchCourses(courseName, level);
    });

    previousCourses.addEventListener('click', function() {
        page1 -= 1
        if (page1 < 0){
            page1 = 0
        }
        showCourses(page1);
    });

    nextCourses.addEventListener('click', function() {
        page1 += 1
        if (page1 > (Math.floor((allCourses.length + 2) / 3) - 1)){
            page1 = (Math.floor((allCourses.length + 2) / 3) - 1)
        }
        showCourses(page1);
    });

    previousTutors.addEventListener('click', function() {
        page2 -= 1
        if (page2 < 0){
            page2 = 0
        }
        showTutors(page2);
    });

    nextTutors.addEventListener('click', function() {
        page2 += 1
        if (page2 > (Math.floor((allTutors.length + 2) / 3) - 1)){
            page2 = (Math.floor((allTutors.length + 2) / 3) - 1)
        }
        showTutors(page2);
    });

    closeModalButton1.addEventListener('click', function() {
        modal.hide();
        resetForm();
    });

    closeModalButton2.addEventListener('click', function() {
        modal.hide();
        resetForm();
    });

    modalElement.addEventListener('click', function(event) {
        if (event.target === modalElement) {
            modal.hide();
            resetForm();
        }
    });

    const submitButton = document.getElementById('submit-request');
    submitButton.addEventListener('click', function() {
        const name = document.getElementById('your-name').value;
        const email = document.getElementById('email-address').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Your request has been submitted!');
            modal.hide();
            resetForm();
        } else {
            alert('Please fill in all fields!');
        }
    });

    function resetForm() {
        document.getElementById('order-form').reset();
    }

    userAccountButton.addEventListener('click', function(e) {
        e.preventDefault();
        userAccountModal.show();
    });

    closeModalButton3.addEventListener('click', function() {
        userAccountModal.hide()
    });

    closeModalButton4.addEventListener('click', function() {
        userAccountModal.hide()
    });

    const showRegisterButton = document.getElementById('show-register');
    showRegisterButton.addEventListener('click', function() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('userAccountModalLabel').textContent = 'User Registration';
    });

    const showLoginButton = document.getElementById('show-login');
    showLoginButton.addEventListener('click', function() {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('userAccountModalLabel').textContent = 'User Login';
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            alert('Login successful!');
            userAccountModal.hide();
            window.location.href = 'home.html';
        } else {
            alert('Please fill in all fields!');
        }
    });

    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert('Registration successful!');
                userAccountModal.hide();
                window.location.href = 'home.html';
            } else {
                alert('Passwords do not match!');
            }
        } else {
            alert('Please fill in all fields!');
        }
    });
});
