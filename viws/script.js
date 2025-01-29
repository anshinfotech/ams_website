const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const API_URL = `${CORS_PROXY}${encodeURIComponent(
  "https://amsbackendlive.onrender.com/api/v1/course/getAllCourse"
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

    if (data.success && data.courses) {
      displayCourses(data.courses);
    } else {
      coursesContainer.innerHTML = `<p class="error">Failed to load courses.</p>`;
    }
  } catch (error) {
    coursesContainer.innerHTML = `<p class="error">Failed to load courses. Please try again later.</p>`;
  }
}

// Display courses in the grid
function displayCourses(courses) {
  coursesContainer.innerHTML = courses
    .map(
      (course) => `
        <div class="course-card">
          <img src="${course.coverImage || "https://via.placeholder.com/300x200"}" 
               alt="${course.title}" 
               class="course-image">
          <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Price:</strong> $${course.courseFees}</p>
            <button class="cta-button" onclick="viewCourse('${course._id}')">Learn More</button>
          </div>
        </div>
      `
    )
    .join("");
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

