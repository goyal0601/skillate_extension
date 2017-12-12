// Inform the background page that
// this tab should have a page-action

const $ = window.$;

chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction'
});
const monthNames = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
};
function monthNameToInteger(monthName) {
  return monthNames[monthName];
}
function getCurrentInformations() {
  const name = $('.pv-top-card-section__name').text();

  const currentLocation = $('.pv-top-card-section__location').text().trim();

  const currentTitle = $('.pv-top-card-section__headline').text().trim();

  const currentCompany = $('.pv-top-card-section__company').text().trim();
  return { name, currentLocation, currentTitle, currentCompany };
}
function getContactInformations() {
  const contactButtonToClick = $('.contact-see-more-less'); //clicks on the button for hidden information
  if (contactButtonToClick) {
    contactButtonToClick.click();
  }
  const email = $(
        '.ci-email .pv-contact-info__ci-container .pv-contact-info__contact-item'
    )
        .text()
        .trim();
  const twitter = $('.ci-twitter').find('ul li.pv-contact-info__ci-container a');
  let twitteLink = '';
  if (twitter) {
    twitteLink = twitter.attr('href');
  }
  const contactNumber = $(
        '.ci-phone .pv-contact-info__ci-container .pv-contact-info__contact-item'
    )
        .text()
        .trim();
  return { email, contactNumber, twitteLink };
}
function getExperiences() {
  function experienceHtmlToExperience(experienceHtml) {
    const classExperience = $(experienceHtml);
    const title = classExperience.find('.pv-entity__summary-info h3').text();
    const experienceOrg = classExperience
            .find('.pv-entity__secondary-title')
            .text();
    const location = classExperience
            .find('.pv-entity__location')
            .text()
            .replace('Location', '')
            .trim();
    const description = classExperience
            .find('.pv-entity__description')
            .text()
            .trim();
    let timeElements = classExperience
            .find('.pv-entity__date-range')
            .text()
            .trim();
    let startMonth = -1;
    let startYear = -1;
    let endMonth = -1;
    let endYear = -1;
    let isCurrent = false;
    if (timeElements) {
      timeElements = timeElements.replace('Dates Employed', '').trim();
      timeElements = timeElements.split(' – ');
      let startDate = timeElements[0];
      let endDate = timeElements[1];
      startDate = startDate.split(' ');
      startMonth = startDate[0];
      startMonth = monthNameToInteger(startMonth);
      startYear = startDate[1];
      if (endDate === 'Present') {
        isCurrent = true;
      } else {
        endDate = endDate.split(' ');
        endMonth = endDate[0];
        endMonth = monthNameToInteger(endMonth);
        endYear = endDate[1];
      }
    }

    const experience = {
      title,
      experienceOrg,
      location,
      description,
      startMonth,
      startYear,
      endMonth,
      endYear,
      isCurrent
    };

    return experience;
  }
  const experiencesList = $.makeArray($('.experience-section').find('ul li'));
  const experiences = experiencesList.map(experienceHtmlToExperience);
  return experiences;
}
function getEducations() {
  function educationHtmlToEducation(educationHtml) {
    const classEducation = $(educationHtml);
    const educationOrg = classEducation.find('.pv-entity__school-name').text();
    const degree = classEducation
            .find('.pv-entity__degree-name .pv-entity__comma-item')
            .text();
    const grade = classEducation
            .find('.pv-entity__grade .pv-entity__comma-item')
            .text();
    const description = classEducation
            .find('.pv-entity__extra-details .pv-entity__description')
            .text()
            .trim();
    const major = classEducation
            .find('.pv-entity__fos .pv-entity__comma-item')
            .text();
    let timeElements = classEducation.find('.pv-entity__dates').text();
    let startYear = -1;
    let endYear = -1;
    if (timeElements) {
      timeElements = timeElements
                .replace('Dates attended or expected graduation', '')
                .trim();
      timeElements = timeElements.split(' – ');
      startYear = timeElements[0];
      endYear = timeElements[1];
    }

    const education = {
      educationOrg,
      degree,
      major,
      grade,
      timeElements,
      startYear,
      endYear,
      description
    };

    return education;
  }

  const educationsList = $.makeArray($('.education-section').find('ul li'));
  const educations = educationsList.map(educationHtmlToEducation);
  return educations;
}
function getPublications() {
  const publicationButtonToClick = $(
        '.publications .pv-accomplishments-block__expand'
    );
  if (publicationButtonToClick) {
    publicationButtonToClick.click();
  }

  function publicationHtmlToPublication(publicationHtml) {
    const classPublication = $(publicationHtml);
    const title = classPublication
            .find('.pv-accomplishment-entity__title')
            .text()
            .replace('publication title', '')
            .trim();
    const description = classPublication
            .find('.pv-accomplishment-entity__description')
            .text()
            .replace('publication description', '')
            .trim();
    const publisher = classPublication
            .find('.pv-accomplishment-entity__publisher')
            .text()
            .replace('publication description', '')
            .trim();
    let timeElements = classPublication
            .find('.pv-accomplishment-entity__date')
            .text()
            .trim();

    let publicationYear = -1;
    let publicationMonth = -1;
    let publicationDay = -1;

    if (timeElements) {
      timeElements = timeElements.replace('publication date', '').trim();
      timeElements = timeElements.split(' ');
      if (timeElements.length === 1) {
        publicationYear = timeElements[0];
      } else if (timeElements.length === 2) {
        publicationMonth = timeElements[0];
        publicationMonth = monthNameToInteger(publicationMonth);
        publicationYear = timeElements[1];
      } else {
        publicationMonth = timeElements[0];
        publicationMonth = monthNameToInteger(publicationMonth);
        publicationDay = timeElements[1].replace(',', '');
        publicationYear = timeElements[2];
      }
    }
    const publication = {
      title,
      timeElements,
      publication: publisher,
      publicationYear,
      publicationMonth,
      publicationDay,
      description
    };

    return publication;
  }

  const publicationsList = $.makeArray($('.publications').find('ul li'));
  const publications = publicationsList.map(publicationHtmlToPublication);
  return publications;
}
function getProjects() {
  const projectButtonToClick = $('.projects .pv-accomplishments-block__expand');
  if (projectButtonToClick) {
    projectButtonToClick.click();
  }
  function projectHtmlToProject(projectHtml) {
    const classProject = $(projectHtml);
    let name = classProject
            .find('.pv-accomplishment-entity__title')
            .text()
            .trim();
    name = name.substr(name.indexOf(' ') + 8);
    const description = classProject
            .find('.pv-accomplishment-entity__description')
            .text()
            .replace('Project description', '')
            .trim();
    let timeElements = classProject
            .find('.pv-accomplishment-entity__date')
            .text()
            .trim();

    let startMonth = -1;
    let startYear = -1;
    let endMonth = -1;
    let endYear = -1;
    let isCurrent = false;
    if (timeElements) {
            //timeElements = timeElements.replace("Dates Employed", "").trim();
      timeElements = timeElements.split(' – ');
      let startDate = timeElements[0];
      let endDate = timeElements[1];
      startDate = startDate.split(' ');
      startMonth = startDate[0];
      startMonth = monthNameToInteger(startMonth);
      startYear = startDate[1];
      if (endDate === 'Present') {
        isCurrent = true;
      } else {
        endDate = endDate.split(' ');
        endMonth = endDate[0];
        endMonth = monthNameToInteger(endMonth);
        endYear = endDate[1];
      }
    }
    const project = {
      name,
      timeElements,
      startYear,
      startMonth,
      endYear,
      endMonth,
      isCurrent,
      description
    };

    return project;
  }

  const projectsList = $.makeArray($('.projects').find('ul li'));
  const projects = projectsList.map(projectHtmlToProject);
  return projects;
}
function getSkills() {
  const skillButtonToClick = $('.pv-skills-section__additional-skills');
  if (skillButtonToClick) {
    skillButtonToClick.click();
  }
  function skillHtmlToSkill(skillHtml) {
    const skill = $(skillHtml).text();
    return skill;
  }

  const skillsList = $.makeArray(
        $('.pv-featured-skills-section').find('.pv-skill-entity__skill-name')
    );
  const skills = skillsList.map(skillHtmlToSkill);
  return skills;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log('message come here', msg, sender);
    // First, validate the message's structure
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    console.log('resume extraction process started');
    const resume = {};
        //var currentInformation = getCurrentInformation

    const currentInformations = getCurrentInformations();
    resume.name = currentInformations.name;
    resume.currentLocation = currentInformations.currentLocation;
    resume.currentTitle = currentInformations.currentTitle;
    resume.currentCompany = currentInformations.currentCompany;
    const contactInformations = getContactInformations();
    resume.email = contactInformations.email;
    resume.contactNumber = contactInformations.contactNumber;
    resume.twitteLink = contactInformations.twitteLink;
    const experiences = getExperiences();
    resume.experiences = experiences;
    const educations = getEducations();
    resume.educations = educations;
    const publications = getPublications();
    resume.publications = publications;
    const projects = getProjects();
    resume.projects = projects;
    const skills = getSkills();
    resume.skills = skills;

    const url = window.location.href;
    resume.url = url;

    console.log('sending back resume', resume);

    const domInfo = {
      resume
    };

        // Directly respond to the sender (popup),
        // through the specified callback */
    callback(domInfo);
  }
});
