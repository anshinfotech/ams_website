

document.addEventListener('DOMContentLoaded', function () {
  // Fetch courses
  fetch('https://amsbackendlive.onrender.com/api/v1/getallService')
    .then(response => response.json())
    .then(data => {
      const courseSection = document.getElementById('course-section');
      if (data.services && Array.isArray(data.services)) {
        data.services.forEach(course => {
          const courseDiv = document.createElement('div');
          courseDiv.className = 'course fade-in';
          courseDiv.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <img src='${course.coverImage}' alt='${course.title} Cover Image'>
          `;
          courseSection.appendChild(courseDiv);
          setTimeout(() => courseDiv.classList.add('visible'), 100);
        });
      } else {
        console.error('Courses data is not an array:', data);
      }
    })
    .catch(error => console.error('Error fetching courses:', error));

  // Fetch team members
  fetch('https://amsbackendlive.onrender.com/api/v1/team/getAllTeamMembers')
    .then(response => response.json())
    .then(data => {
      const teamSection = document.getElementById('team-section');
      if (data.teamMembers && Array.isArray(data.teamMembers)) {
        data.teamMembers.forEach(member => {
          const memberDiv = document.createElement('div');
          memberDiv.className = 'team-member fade-in';
          memberDiv.innerHTML = `
            <img src='${member.coverImage}' alt='${member.name} Cover Image'>
            <h4>${member.name}</h4>
            <p>${member.designation}</p>
            <p>Experience: ${member.yearOfExperience} years</p>
          `;
          teamSection.appendChild(memberDiv);
          setTimeout(() => memberDiv.classList.add('visible'), 100);
        });
      } else {
        console.error('Team members data is not an array:', data);
      }
    })
    .catch(error => console.error('Error fetching team members:', error));
});
