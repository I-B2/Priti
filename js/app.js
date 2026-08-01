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

        renderSubjects(subjects);

        showMessage("Choose Subject");

    }

    catch(error){

        console.error(error);

        showMessage("Unable to load subjects.");

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

        showMessage("Choose Subject");

        return;

    }

    try{

        currentSubject=
        await loadSubject(subjectSelect.value);

        renderChapters(currentSubject.chapters);

        showMessage("Choose Chapter");

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

        showMessage("Choose Chapter");

        return;

    }

    const chapter=
    currentSubject.chapters[chapterSelect.value];

    renderLectures(chapter.lectures);

});