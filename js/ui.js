// ===============================
// UI Elements
// ===============================

const subjectSelect = document.getElementById("subjectSelect");
const chapterSelect = document.getElementById("chapterSelect");
const lectureContainer = document.getElementById("lectureContainer");


// ===============================
// Subject List
// ===============================

function renderSubjects(subjects){

    subjectSelect.innerHTML =
    `<option value="">Choose Subject</option>`;

    subjects.forEach(subject=>{

        subjectSelect.innerHTML += `
            <option value="${subject.file}">
                ${subject.name}
            </option>
        `;

    });

}


// ===============================
// Chapter List
// ===============================

function renderChapters(chapters){

    chapterSelect.disabled = false;

    chapterSelect.innerHTML =
    `<option value="">Choose Chapter</option>`;

    chapters.forEach((chapter,index)=>{

        chapterSelect.innerHTML += `
            <option value="${index}">
                ${chapter.name}
            </option>
        `;

    });

}


// ===============================
// Lecture List
// ===============================

function renderLectures(lectures){

    lectureContainer.innerHTML = "";

    if(lectures.length===0){

        lectureContainer.innerHTML =
        `<div class="empty">
            No Lecture Available
        </div>`;

        return;

    }

    lectures.forEach(lecture=>{

        lectureContainer.innerHTML += `

        <div class="lecture-item">

            <span class="lecture-name">

                ${lecture.title}

            </span>

            <span class="lecture-date">

                ${lecture.date}

            </span>

        </div>

        `;

    });

}


// ===============================
// Empty Message
// ===============================

function showMessage(message){

    lectureContainer.innerHTML = `

    <div class="empty">

        ${message}

    </div>

    `;

}
