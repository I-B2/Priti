// ===============================
// Load Subject List
// ===============================

async function loadSubjects(){

    const response = await fetch("data/subjects.json");

    if(!response.ok){

        throw new Error("subjects.json not found");

    }

    return await response.json();

}


// ===============================
// Load Subject File
// ===============================

async function loadSubject(file){

    const response = await fetch("data/" + file);

    if(!response.ok){

        throw new Error(file + " not found");

    }

    return await response.json();

}