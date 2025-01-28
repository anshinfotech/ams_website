// API Endpoints
const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const API  = {
  createCourse: `${CORS_PROXY}${encodeURIComponent(
    "https://amsbackendlive.onrender.com/api/v1/course/Create"
  )}`,
  getAllCourse: `${CORS_PROXY}${encodeURIComponent(
    "https://amsbackendlive.onrender.com/api/v1/course/getAllCourse"
  )}`,
  getSingleCourse: `${CORS_PROXY}${encodeURIComponent(
    "https://amsbackendlive.onrender.com/api/v1/course/getSingleCourse"
  )}`,
  updateCourse: `${CORS_PROXY}${encodeURIComponent(
    "https://amsbackendlive.onrender.com/api/v1/course/updateCourse"
  )}`,
  deleteCourse: `${CORS_PROXY}${encodeURIComponent(
    "https://amsbackendlive.onrender.com/api/v1/course/deleteCourse"
  )}`,
};

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
    const response = await fetch(API.getAllCourse, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    console.log("API Data:", data);

    if (data.success && data.courses) {
      displayCourses(data.courses);
    } else {
      console.error("Failed to fetch courses. API Response:", data);
      coursesContainer.innerHTML = `<p class="error">Failed to load courses. Server response: ${
        data.message || "Unknown error"
      }</p>`;
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    coursesContainer.innerHTML = `
            <p class="error">
                Failed to load courses. This might be due to CORS restrictions. 
                Please ensure you're running this on a proper web server or try using a CORS browser extension.
            </p>`;
  }
}

// Display courses in the grid
function displayCourses(courses) {
  coursesContainer.innerHTML = courses
    .map(
      (course) => `
        <div class="course-card">
            <img src="${
              course.coverImage || "https://via.placeholder.com/300x200"
            }" 
                 alt="${course.title}" 
                 class="course-image"
                 onerror="this.src='https://via.placeholder.com/300x200'">
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <div class="course-details">
                    <p><strong>Duration:</strong> ${course.duration}</p>
                    <p><strong>Domain:</strong> ${course.domain}</p>
                    <p><strong>Subject:</strong> ${course.subject}</p>
                    <p class="course-price">
                        <strong>Price:</strong> $${course.courseFees}
                        ${
                          course.discountendfees
                            ? `<span class="discount">$${course.discountendfees} off!</span>`
                            : ""
                        }
                    </p>
                </div>
                <button class="cta-button" onclick="viewCourse('${
                  course._id
                }')">Learn More</button>
            </div>
        </div>
    `
    )
    .join("");
}

// View individual course
async function viewCourse(courseId) {
  try {
    const response = await fetch(`${API.getSingleCourse}/${courseId}`);
    const data = await response.json();

    if (data.success && data.course) {
      // Implement course detail view logic here
      alert("Course details coming soon!");
    } else {
      console.error("Failed to fetch course details:", data.message);
    }
  } catch (error) {
    console.error("Error fetching course details:", error);
  }
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
document.addEventListener("DOMContentLoaded", () => {
  fetchCourses();
});

// Add scroll event listener for navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)";
    navbar.style.boxShadow = " box-shadow: 0 2px 10px rgb(255, 255, 255)";
  } else {
    navbar.style.background = "black";
    navbar.style.boxShadow = "box-shadow: 0 2px 10px rgb(255, 255, 255)";
  }
});
