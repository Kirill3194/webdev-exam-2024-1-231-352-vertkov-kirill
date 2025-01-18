document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    const coursesTable = document.getElementById('coursesTable');
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    const searchButtonTutor = document.getElementById('searchButton');
    const languageLevelSelect = document.getElementById('languageLevel');
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

    let selectedTutor = null;
    let previousButton = null;
    let hourlyRate = 0; // Ставка за час курса
    let duration = 0; // Продолжительность курса
    let week_length = 0;
    let select_courses = 0;


    // Show tutors based on language level
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
                        <td><button class="btn btn-success select-button">Select</button></td>
                    </tr>`);
                }
            });

            // Add event listeners to all select buttons
            const selectButtons = document.querySelectorAll('.select-button');
            selectButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tutorRow = button.closest('tr');
                    const tutorId = tutorRow.getAttribute('data-tutor-id');
                    const tutorName = tutorRow.getAttribute('data-tutor-name');

                    if (selectedTutor === tutorId) {
                        // If same tutor clicked again, reset
                        selectedTutor = null;
                        button.classList.remove('btn-danger');
                        button.classList.add('btn-success');
                        coursesTable.style.display = 'none';
                    } else {
                        // Reset previous button and hide previous courses
                        if (previousButton) {
                            previousButton.classList.remove('btn-danger');
                            previousButton.classList.add('btn-success');
                        }
                        selectedTutor = tutorId;
                        button.classList.remove('btn-success');
                        button.classList.add('btn-danger');
                        previousButton = button;

                        // Show courses of selected tutor
                        searchCourses(tutorName);
                    }
                });
            });
        });
    }

    searchButtonTutor.addEventListener('click', function(event) {
        event.preventDefault();  // Отменяем стандартное поведение кнопки
        const languageLevel = languageLevelSelect.value;
        showTutors(languageLevel);  // Вызов функции для отображения репетиторов
    });

    // Search and display courses taught by the selected tutor
    function searchCourses(tutorName) {
        const parent = document.getElementById('coursesList');
        coursesTable.style.display = 'none';
        coursesTable.style.display = 'block';

        getCourses().then(courses => {
            parent.innerHTML = '';
            courses.forEach(course => {
                if (tutorName.toLowerCase() == course.teacher.toLowerCase()){
                    parent.insertAdjacentHTML('beforeend', 
                    `<tr>
                        <td>${course.name}</td>
                        <td>${course.teacher}</td>
                        <td>${course.level}</td>
                        <td>${course.total_length}</td>
                        <td>${course.week_length}</td>
                        <td>${course.course_fee_per_hour}</td>
                        <td>
                            <select class="form-select">
                                ${course.start_dates.map(date => `<option value="${date}">${date}</option>`).join('')}
                            </select>
                        </td>
                        <td><button class="btn btn-primary select-button" data-course-name="${course.name}" data-instructor-name="${course.teacher}" data-duration="${course.total_length}" data-hourly-rate="${course.course_fee_per_hour}" data-start-date="${course.start_dates[0]}" data-week-length="${course.week_length}" data-select-courses="${course.id}" data-bs-toggle="modal" data-bs-target="#modal">Select</button></td>
                    </tr>`);

                }
            });

            // Add event listeners to all course select buttons
            const courseSelectButtons = document.querySelectorAll('.select-button');
            courseSelectButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Get the data from the selected button
                    const courseName = button.getAttribute('data-course-name');
                    const instructorName = button.getAttribute('data-instructor-name');
                    duration = parseInt(button.getAttribute('data-duration'));
                    hourlyRate = parseFloat(button.getAttribute('data-hourly-rate'));
                    const startDate = button.getAttribute('data-start-date');
                    week_length = parseFloat(button.getAttribute('data-week-length'));
                    select_courses = parseInt(button.getAttribute('data-select-courses'));

                    // Fill modal fields with the course data
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

                    // Set the number of students and update cost
                    const studentsNumber = studentsNumberInput.value;
                    updateTotalCost(studentsNumber);

                    // Open modal
                    modal.show();
                });
            });
        });
    }

    // Function to calculate and update the total cost
    function updateTotalCost(studentsNumber) {
        let totalCost = hourlyRate * duration * studentsNumber * week_length; // Base cost

        // Apply discounts and surcharges based on selected checkboxes
        if (earlyRegistrationCheckbox.checked) {
            totalCost *= 0.9; // Early registration discount (10%)
        }
        if (groupEnrollmentCheckbox.checked) {
            totalCost *= 0.85; // Group discount (15%)
        }
        if (intensiveCourseCheckbox.checked) {
            totalCost *= 1.2; // Intensive course surcharge (20%)
        }
        if (supplementaryCheckbox.checked) {
            totalCost += 2000 * studentsNumber; // Additional materials
        }
        if (personalizedCheckbox.checked) {
            totalCost += 1500 * duration * studentsNumber; // Personalized lessons surcharge
        }
        if (excursionsCheckbox.checked) {
            totalCost *= 1.25; // Cultural excursions surcharge (25%)
        }
        if (assessmentCheckbox.checked) {
            totalCost += 300 * studentsNumber; // Language assessment surcharge
        }
        if (interactiveCheckbox.checked) {
            totalCost *= 1.5; // Interactive platform surcharge (50%)
        }

        // Update the total cost display
        totalCostElement.textContent = totalCost.toFixed(2);

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
    }

    // Add order
    document.getElementById('submitOrderButton').addEventListener('click', function() {
        const studentsNumber = studentsNumberInput.value;
        console.log(studentsNumber);
        const courseData = {
            "course_id": select_courses,
            "date": document.getElementById('startDate').value,
            "time": document.getElementById('time').value,
            "persons": parseInt(studentsNumber),
            "price": parseInt(totalCostElement.textContent),
            "early_registration": earlyRegistrationCheckbox.checked,
            "group_enrollment": groupEnrollmentCheckbox.checked,
            "intensive_course": intensiveCourseCheckbox.checked,
            "supplementary": supplementaryCheckbox.checked,
            "personalized": personalizedCheckbox.checked,
            "excursions": excursionsCheckbox.checked,
            "assessment": assessmentCheckbox.checked,
            "interactive": interactiveCheckbox.checked,
        };
        console.log(courseData);

        addOrder(courseData).then(response => {
            // Обработка ответа от сервера
            console.log(response);
        });
    });
});
