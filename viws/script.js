const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const API_URL = `${CORS_PROXY}${encodeURIComponent(
  "https://amsbackendlive.onrender.com/api/v1/course/getAllCourse"
)}`;

const API_TESTIMONIAL_URL = `${CORS_PROXY}${encodeURIComponent(
  "https://amsbackendlive.onrender.com/api/v1/testimonials/getAllTestimonials"
)}`;

console.log(API_URL);

// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const coursesContainer = document.getElementById("courses-container");

// Toggle Mobile Menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Fetch and display courses
async function fetchCourses() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);

    if (data.success && data.courses) {
      displayCourses(data.courses);
    } else {
      coursesContainer.innerHTML = `<p class="error">Failed to load courses.</p>`;
    }
  } catch (error) {
    coursesContainer.innerHTML = `<p class="error">Failed to load courses. Please try again later.</p>`;
  }
}

// Display courses in the grid with a "See More Details" button
// Display courses in the grid with a "See More Details" button
function displayCourses(courses) {
  coursesContainer.innerHTML = courses
    .map(
      (course) => `
        <div class="course-card">
          <img src="${
            course.coverImage || "https://via.placeholder.com/300x200"
          }" 
               alt="${course.title}" 
               class="course-image">
          <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Price:</strong> $${course.courseFees}</p>
            <button class="cta-button" onclick="viewCourse('${
              course._id
            }')">See More Details</button>
          </div>
        </div>
      `
    )
    .join("");
}

// Redirect to a new page with the course ID as a query parameter
function viewCourse(courseId) {
  window.location.href = `course-details.html?id=${courseId}`;
}

// Toggle course details visibility
function toggleDetails(courseId) {
  const detailsElement = document.getElementById(`details-${courseId}`);
  if (detailsElement) {
    detailsElement.classList.toggle("hidden");
  }
}


// View individual course
function viewCourse(courseId) {
  alert(`Viewing course with ID: ${courseId}`);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Initialize the application
document.addEventListener("DOMContentLoaded", fetchCourses);

/////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const teamContainer = document.getElementById("team_inner");

  // Fetch data from the backend
  fetch(API_TESTIMONIAL_URL)
    .then((response) => response.json())
    .then((teamMember) => {
      teamMember.data.forEach((team, index) => {
        // Create a card for each team member
        const teamCard = document.createElement("div");
        teamCard.classList.add("carousel-item");
        if (index === 0) {
          teamCard.classList.add("active"); // Make the first item active
        }
        const starsHTML = generateStars(team.rating);
        teamCard.innerHTML = `
         <div class="boxx" class="d-block w-100">
           
        <div class="pic">
          ${team.image ? `<img src="${team.image}" alt="${team.name}">` : ""}
        </div>
        <div class="boxx2">
        <div class="text">
            ${team.name}</div>
        <div class="text2">${team.role}</div>
        <div class="stars">
                ${starsHTML}
        </div>
         <div class="para"> ${team.description}</div>
        </div>
       
        </div>
        `;

        teamContainer.appendChild(teamCard);
      });
    })
    .catch((error) => {
      teamContainer.innerHTML =
        "<p>Failed to load team data. Please try again later.</p>";
      console.error("Error fetching team data:", error);
    });
});

function generateStars(rating) {
  const totalStars = 5; // Total number of stars (fixed at 5)
  let starsHTML = "";

  // Generate filled stars and empty stars based on the rating
  for (let i = 1; i <= totalStars; i++) {
    starsHTML += `<div class="star ${i <= rating ? "filled" : "empty"}"></div>`;
  }

  return starsHTML;
}
