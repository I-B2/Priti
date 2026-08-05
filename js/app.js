// =====================================
// App Data
// =====================================

let currentSubject = null;

// =====================================
// Start App
// =====================================

init();

async function init(){

    try{

        const subjects = await loadSubjects();

        console.log(subjects);
        renderSubjects(subjects);

        showMessage("Choose Heading");

    }

    catch(error){

        console.error(error);

        showMessage("Pahle Heading Choose kariye💚.");

    }

}

// =====================================
// Subject Changed
// =====================================

subjectSelect.addEventListener("change", async ()=>{

    lectureContainer.innerHTML="";

    chapterSelect.innerHTML=
    `<option value="">Choose Chapter</option>`;

    chapterSelect.disabled=true;

    if(subjectSelect.value===""){

        showMessage("Choose Heading");

        return;
    }

    if (subjectSelect.value === " ") {

    const pass = prompt("🔒 Date Password Enter Kare");

    if (pass !== "1234") {
        alert("Wrong Password!");
        subjectSelect.selectedIndex = 0;
        showMessage("Choose Heading");
        return;
    }
}
    try{

        currentSubject=
        await loadSubject(subjectSelect.value);

        renderChapters(currentSubject.chapters);

        showMessage("Choose Topic");

    }

    catch(error){

        console.error(error);

        showMessage("Unable to load chapter.");

    }

});

// =====================================
// Chapter Changed
// =====================================

chapterSelect.addEventListener("change",()=>{

    if(chapterSelect.value===""){

        showMessage("Choose Topic");

        return;

    }

    const chapter=
    currentSubject.chapters[chapterSelect.value];

    renderLectures(chapter.lectures);

});
