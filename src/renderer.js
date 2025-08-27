function createExperienceHTML(job) {
    const descriptionList = `<ul>${job.desc.map(item => `<li>${item}</li>`).join('')}</ul>`;

    return `
        <div class="experience">
            <p class="date">${job.date}</p>
            <p class="job-title">${job.title}</p>
            <p class="company-name">${job.company}</p>
            <div class="job-description">${descriptionList}</div>
        </div>
    `;
}

function createEducationHTML(edu) {
    return `
        <div class="education">
            <p class="date">${edu.date}</p>
            <p class="job-title">${edu.title}</p>
            <p class="company-name">${edu.institute}</p>
        </div>
    `;
}

export function renderContent(data) {
    const experienceContainer = document.getElementById('experience-list');
    const educationContainer = document.getElementById('education-list');

    experienceContainer.innerHTML = '';
    educationContainer.innerHTML = '';

    data.jobs.forEach(job => {
        experienceContainer.innerHTML += createExperienceHTML(job);
    });

    data.schools.forEach(edu => {
        educationContainer.innerHTML += createEducationHTML(edu);
    });
}
