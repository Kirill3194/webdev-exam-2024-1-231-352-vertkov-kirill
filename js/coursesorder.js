document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    const coursesTable = document.getElementById('coursesTable');
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    const searchButtonTutor = document.getElementById('searchButton');
    const searchButtonCourse = document.getElementById('searchCourseButton');
    const languageLevelSelect = document.getElementById('languageLevel');
    const languageLevelCourses = document.getElementById('courseLevel');
    const studentsNumberInput = document.getElementById('studentsNumber');
    const earlyRegistrationCheckbox = document.getElementById('earlyRegistration');
    const groupEnrollmentCheckbox = document.getElementById('groupEnrollment');
    const intensiveCourseCheckbox = document.getElementById('intensiveCourse');
    const supplementaryCheckbox = document.getElementById('supplementary');
    const personalizedCheckbox = document.getElementById('personalized');
    const excursionsCheckbox = document.getElementById('excursions');
    const assessmentCheckbox = document.getElementById('assessment');
    const interactiveCheckbox = document.getElementById('interactive');
    const totalCostElement = document.getElementById('totalCost');
    const lessonDurationInput = document.getElementById('lessonDuration');
    const totalCostElementTutor = document.getElementById('totalCost_tutor');
    const submitTutorSessionButton = document.getElementById('submitTutorSessionButton');

    let selectedTutor = null;
    let previousButton = null;
    let hourlyRate = 0;
    let duration = 0;
    let week_length = 0;
    let select_courses = 0;
    let price_per_hour_tutor = 0;

    function showTutors(languagelevel) {
        coursesTable.style.display = 'none';
        const parent = document.getElementById('resultsTableTurors');
    
        getTutors().then(tutors => {
            parent.innerHTML = '';
            tutors.forEach(tutor => {
                if (languagelevel.toLowerCase() == tutor.language_level.toLowerCase()){
                    parent.insertAdjacentHTML('beforeend', 
                    `<tr data-tutor-id="${tutor.id}" data-tutor-name="${tutor.name}">
                        <td>${tutor.id}</td>
                        <td>${tutor.name}</td>
                        <td>${tutor.language_level}</td>
                        <td>${tutor.languages_offered.join(', ')}</td>
                        <td>${tutor.work_experience}</td>
                        <td>${tutor.price_per_hour}</td>
                        <td><button class="btn btn-success select-button-tutor" data-tutor-name="${tutor.name}" data-price-per-hour="${tutor.price_per_hour}" data-select-tutor="${tutor.id}">Select</button></td>
                    </tr>`);
                }
            });

            const selectButtons = document.querySelectorAll('.select-button-tutor');
            selectButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tutorRow = button.closest('tr');
                    const tutorId = tutorRow.getAttribute('data-tutor-id');
                    tutorName = button.getAttribute('data-tutor-name');
                    price_per_hour_tutor = parseFloat(button.getAttribute('data-price-per-hour'));

                    if (selectedTutor === tutorId) {
                        selectedTutor = null;
                        button.classList.remove('btn-danger');
                        button.classList.add('btn-success');
                        coursesTable.style.display = 'none';
                    } else {
                        if (previousButton) {
                            previousButton.classList.remove('btn-danger');
                            previousButton.classList.add('btn-success');
                        }
                        selectedTutor = tutorId;
                        button.classList.remove('btn-success');
                        button.classList.add('btn-danger');
                        previousButton = button;
                    }
                    console.log(tutorName)
                    document.getElementById('teacherName2').value = tutorName;
                    document.getElementById('teacherName2').disabled = true;
                    const modal = new bootstrap.Modal(document.getElementById('tutorModal'));
                    modal.show();
                    lessonDurationInput.addEventListener('input', (event) => {
                        event.preventDefault();
                        duration_tutor = parseInt(document.getElementById('lessonDuration').value);
                        totalCost_tutor = duration_tutor * price_per_hour_tutor;
                        totalCostElementTutor.textContent = totalCost_tutor.toFixed(2);
                    });
                });
            });
        });
    }

    searchButtonTutor.addEventListener('click', function(event) {
        event.preventDefault();
        const languageLevel = languageLevelSelect.value;
        showTutors(languageLevel);
    });

    searchButtonCourse.addEventListener('click', function(event) {
        event.preventDefault();
        const languageLevel = languageLevelCourses.value;
        searchCourses(languageLevel);
    });

    function searchCourses(languagelevel) {
        document.getElementById('coursesTable').style.display = 'block';
        const parent = document.getElementById('coursesList');

        getCourses().then(courses => {
            parent.innerHTML = '';
            courses.forEach(course => {
                if (languagelevel.toLowerCase() == course.level.toLowerCase()) {
                    parent.insertAdjacentHTML('beforeend', 
                    `<tr>
                        <td>${course.name}</td>
                        <td>${course.teacher}</td>
                        <td>${course.level}</td>
                        <td>${course.total_length}</td>
                        <td>${course.week_length}</td>
                        <td>${course.course_fee_per_hour}</td>
                        <td>
                            <select class="form-select" id="data_course${course.id}">
                                ${course.start_dates.map(date => `<option value="${date}">${date}</option>`).join('')}
                            </select>
                        </td>
                        <td><button class="btn btn-primary select-button-courses" data-course-id="${course.id}" data-course-name="${course.name}" data-instructor-name="${course.teacher}" data-duration="${course.total_length}" data-hourly-rate="${course.course_fee_per_hour}" data-start-date="${course.start_dates[0]}" data-week-length="${course.week_length}" data-select-courses="${course.id}" data-bs-toggle="modal" data-bs-target="#modal">Select</button></td>
                    </tr>`);
                }
            });

            const courseSelectButtons = document.querySelectorAll('.select-button-courses');
            courseSelectButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const courseName = button.getAttribute('data-course-name');
                    const instructorName = button.getAttribute('data-instructor-name');
                    duration = parseInt(button.getAttribute('data-duration'));
                    hourlyRate = parseFloat(button.getAttribute('data-hourly-rate'));
                    const startDate = document.getElementById(`data_course${button.getAttribute('data-course-id')}`).value;
                    week_length = parseFloat(button.getAttribute('data-week-length'));
                    select_courses = parseInt(button.getAttribute('data-select-courses'));

                    document.getElementById('courseName').value = courseName;
                    document.getElementById('courseName').disabled = true;
                    document.getElementById('teacherName').value = instructorName;
                    document.getElementById('teacherName').disabled = true;
                    document.getElementById('duration').value = duration;
                    document.getElementById('duration').disabled = true;
                    document.getElementById('startDate').value = startDate.split('T')[0];
                    document.getElementById('startDate').disabled = true;
                    document.getElementById('time').value = startDate.split('T')[1].slice(0, 5);
                    document.getElementById('time').disabled = true;

                    const studentsNumber = studentsNumberInput.value;
                    updateTotalCost(studentsNumber);

                    modal.show();
                });
            });
        });
    }

    function updateTotalCost(studentsNumber) {
        let totalCost = hourlyRate * duration * studentsNumber * week_length;

        if (earlyRegistrationCheckbox.checked) {
            totalCost *= 0.9;
        }
        if (studentsNumber >= 5) {
            totalCost *= 0.85;
            groupEnrollmentCheckbox.checked = true;
        }
        if (studentsNumber < 5 && groupEnrollmentCheckbox.checked) {
            groupEnrollmentCheckbox.checked = false;
        }
        if (intensiveCourseCheckbox.checked) {
            totalCost *= 1.2;
        }
        if (supplementaryCheckbox.checked) {
            totalCost += 2000 * studentsNumber;
        }
        if (personalizedCheckbox.checked) {
            totalCost += 1500 * duration * studentsNumber;
        }
        if (excursionsCheckbox.checked) {
            totalCost *= 1.25;
        }
        if (assessmentCheckbox.checked) {
            totalCost += 300 * studentsNumber;
        }
        if (interactiveCheckbox.checked) {
            totalCost *= 1.5;
        }

        totalCostElement.textContent = totalCost.toFixed(2);
    }

        earlyRegistrationCheckbox.addEventListener('change', function() {
            updateTotalCost(studentsNumberInput.value);
        });
        groupEnrollmentCheckbox.addEventListener('change', function() {
            updateTotalCost(studentsNumberInput.value);
        });
        intensiveCourseCheckbox.addEventListener('change', function() {
            updateTotalCost(studentsNumberInput.value);
        });
        supplementaryCheckbox.addEventListener('change', function() {
            updateTotalCost(studentsNumberInput.value);
        });
        personalizedCheckbox.addEventListener('change', function() {
            updateTotalCost(studentsNumberInput.value);
        });
        excursionsCheckbox.addEventListener('change', function() {
            updateTotalCost(studentsNumberInput.value);
        });
        assessmentCheckbox.addEventListener('change', function() {
            updateTotalCost(studentsNumberInput.value);
        });
        interactiveCheckbox.addEventListener('change', function() {
            updateTotalCost(studentsNumberInput.value);
        });
        studentsNumberInput.addEventListener('input', function() {
            updateTotalCost(studentsNumberInput.value);
        });
    

    submitTutorSessionButton.addEventListener('click', function() {
        const tutorData = {
            tutor_id: selectedTutor,
            date_start: document.getElementById('startDate_tutor').value,
            time_start: document.getElementById('time_tutor').value,
            persons: parseInt(document.getElementById('studentsNumber_tutor').value),
            price: parseInt(totalCostElementTutor.textContent),
            duration: parseInt(document.getElementById('lessonDuration').value)
        };

        addOrder(tutorData).then(response => {
            console.log(response);
        });
    });

    document.getElementById('submitOrderButton').addEventListener('click', function() {
        const studentsNumber = studentsNumberInput.value;
        const courseData = {
            course_id: select_courses,
            date_start: document.getElementById('startDate').value,
            time_start: document.getElementById('time').value,
            persons: parseInt(studentsNumber),
            price: parseInt(totalCostElement.textContent),
            duration: duration * week_length,
            early_registration: earlyRegistrationCheckbox.checked,
            group_enrollment: groupEnrollmentCheckbox.checked,
            intensive_course: intensiveCourseCheckbox.checked,
            supplementary: supplementaryCheckbox.checked,
            personalized: personalizedCheckbox.checked,
            excursions: excursionsCheckbox.checked,
            assessment: assessmentCheckbox.checked,
            interactive: interactiveCheckbox.checked,
        };

        addOrder(courseData).then(response => {
            console.log(response);
        });
    });

    document.getElementById('searchType').addEventListener('change', function() {
        var searchType = this.value;
        if (searchType === 'tutor') {
            document.getElementById('tutorSearch').style.display = 'block';
            document.getElementById('courseSearch').style.display = 'none';
        } else if (searchType === 'course') {
            document.getElementById('tutorSearch').style.display = 'none';
            document.getElementById('courseSearch').style.display = 'block';
        }
    });
});
