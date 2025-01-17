document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    const selectButtonsContainer = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    const coursesTable = document.getElementById('coursesTable');
    const coursesList = document.getElementById('coursesList');
    const modal = new bootstrap.Modal(document.getElementById('modal'));

    let selectedTutor = null;
    let previousButton = null;

    // Example tutors data (you can replace this with actual data or fetch it dynamically)
    const tutorsData = [
        {
            id: 1,
            name: "Ivan Ivanov",
            level: "Intermediate",
            languages: "Russian, English",
            experience: 5,
            hourlyRate: 1000,
            profilePhoto: "profile1.jpg",
        },
        {
            id: 2,
            name: "Maria Petrova",
            level: "Advanced",
            languages: "Russian, German",
            experience: 8,
            hourlyRate: 1500,
            profilePhoto: "profile2.jpg",
        }
    ];

    // Example courses data (same structure as before)
    const coursesData = {
        "1": [
            {
                name: "English for Beginners",
                level: "Beginner",
                duration: 12,
                hoursPerWeek: 10,
                hourlyRate: 1000,
                availableDates: ["2025-02-01", "2025-02-10"],
                instructor: "Ivan Ivanov"
            },
            {
                name: "Advanced English Grammar",
                level: "Advanced",
                duration: 8,
                hoursPerWeek: 8,
                hourlyRate: 1200,
                availableDates: ["2025-03-01", "2025-03-10"],
                instructor: "Ivan Ivanov"
            }
        ],
        "2": [
            {
                name: "German Basics",
                level: "Beginner",
                duration: 10,
                hoursPerWeek: 12,
                hourlyRate: 1500,
                availableDates: ["2025-02-05", "2025-02-15"],
                instructor: "Maria Petrova"
            }
        ]
    };

    // Go back to dashboard
    backButton.addEventListener('click', function() {
        window.location.href = '/dashboard';
    });

    // Dynamically generate the tutor table
    function generateTutorTable() {
        tutorsData.forEach(tutor => {
            const row = document.createElement('tr');
            row.setAttribute('data-tutor-id', tutor.id);
            row.innerHTML = `
                <td>${tutor.name}</td>
                <td>${tutor.level}</td>
                <td>${tutor.languages}</td>
                <td>${tutor.experience}</td>
                <td>${tutor.hourlyRate}</td>
                <td><img src="${tutor.profilePhoto}" alt="${tutor.name}" class="profile-photo" style="width: 50px; height: 50px; border-radius: 50%"></td>
                <td><button class="btn btn-success select-button">Select</button></td>
            `;
            selectButtonsContainer.appendChild(row);
        });

        // Attach event listeners for the select buttons
        const selectButtons = document.querySelectorAll('.select-button');
        selectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tutorId = button.closest('tr').getAttribute('data-tutor-id');

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
                    displayCourses(tutorId);
                }
            });
        });
    }

    // Function to fill the modal with course information
function fillModal(courseName, instructorName, duration, hourlyRate, startDate) {
    // Fill in the modal fields
    document.getElementById('courseName').value = courseName;
    document.getElementById('teacherName').value = instructorName;
    document.getElementById('duration').value = `${duration} weeks`;
    document.getElementById('startDate').value = startDate || ''; // If startDate is not passed, leave it blank
}


    // Display courses for selected tutor
    // Display courses for selected tutor
function displayCourses(tutorId) {
    coursesList.innerHTML = '';
    coursesTable.style.display = 'none';

    const courses = coursesData[tutorId];
    if (courses) {
        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.instructor}</td>
                <td>${course.level}</td>
                <td>${course.duration}</td>
                <td>${course.hoursPerWeek}</td>
                <td>${course.hourlyRate}</td>
                <td>
                    <select class="form-select">
                        ${course.availableDates.map(date => `<option value="${date}">${date}</option>`).join('')}
                    </select>
                </td>
                <td><button class="btn btn-primary select-button" data-course-name="${course.name}" data-instructor-name="${course.instructor}" data-duration="${course.duration}" data-hourly-rate="${course.hourlyRate}" data-start-date="${course.availableDates[0]}" data-bs-toggle="modal" data-bs-target="#modal">Select</button></td>
            `;
            coursesList.appendChild(row);
        });

        // Show courses table
        coursesTable.style.display = 'block';
    }

    // Attach event listener to the "Select" buttons for each course
    const selectButtons = document.querySelectorAll('.select-button');
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseName = button.getAttribute('data-course-name');
            const instructorName = button.getAttribute('data-instructor-name');
            const duration = button.getAttribute('data-duration');
            const hourlyRate = button.getAttribute('data-hourly-rate');
            const startDate = button.getAttribute('data-start-date');

            // Pass all the necessary data to the fillModal function
            fillModal(courseName, instructorName, duration, hourlyRate, startDate);
        });
    });
}


    // Generate the tutor table on page load
    generateTutorTable();
});
