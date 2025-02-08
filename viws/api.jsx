

document.addEventListener('DOMContentLoaded', function () {
  // Fetch courses
  fetch('https://amsbackendlive.onrender.com/api/v1/getallService')
    .then(response => response.json())
    .then(data => {
      const coursesContainer = document.getElementById('coursesContainer');
      if (!coursesContainer) {
        console.error('Courses container not found');
        return;
      }

      // Access the services array from the response
      const services = data.services;
      if (!services || !Array.isArray(services)) {
        console.error('Invalid courses data format:', data);
        return;
      }

      services.forEach(course => {
        if (!course) return;
        
        const card = document.createElement('div');
        card.className = 'card fade-in';
        card.innerHTML = `
          <img src="${course.coverImage || 'https://placehold.co/600x400?text=Course+Image'}" alt="${course.title || 'Course'}" class="card-img">
          <div class="card-content">
            <h3 class="card-title">${course.title || 'Course Title'}</h3>
            <p class="card-text">${course.description || 'No description available'}</p>
            <a href="#" class="card-link">Read more</a>
          </div>
        `;
        coursesContainer.appendChild(card);
        setTimeout(() => card.classList.add('visible'), 100);
      });
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
      const coursesContainer = document.getElementById('coursesContainer');
      if (coursesContainer) {
        coursesContainer.innerHTML = '<p>Error loading courses. Please try again later.</p>';
      }
    });

  // Fetch team members
  fetch('https://amsbackendlive.onrender.com/api/v1/team/getAllTeamMembers')
    .then(response => response.json())
    .then(data => {
      const teamContainer = document.getElementById('teamContainer');
      if (!teamContainer) {
        console.error('Team container not found');
        return;
      }

      // Access the teamMembers array from the response
      const teamMembers = data.teamMembers;
      if (!teamMembers || !Array.isArray(teamMembers)) {
        console.error('Invalid team data format:', data);
        return;
      }

      teamMembers.forEach(member => {
        if (!member) return;

        const card = document.createElement('div');
        card.className = 'card fade-in';
        card.innerHTML = `
          <img src="${member.coverImage || 'https://placehold.co/600x400?text=Team+Member'}" alt="${member.name || 'Team Member'}" class="card-img">
          <div class="card-content">
            <h3 class="card-title">${member.name || 'Team Member'}</h3>
            <h4 class="card-subtitle">${member.designation || 'Role'}</h4>
            <p class="card-text">${member.yearOfExperience ? member.yearOfExperience + ' years of experience' : 'Experience information not available'}</p>
          </div>
        `;
        teamContainer.appendChild(card);
        setTimeout(() => card.classList.add('visible'), 100);
      });
    })
    .catch(error => {
      console.error('Error fetching team members:', error);
      const teamContainer = document.getElementById('teamContainer');
      if (teamContainer) {
        teamContainer.innerHTML = '<p>Error loading team members. Please try again later.</p>';
      }
    });
});

