document.addEventListener("DOMContentLoaded", function () {
  var currentSection = 0;
  var sections = document.querySelectorAll(".mainHeader");

  function showSection(index) {
    sections.forEach((section, i) => {
      section.style.display = i === index ? "block" : "none";
    });
  }

  // Toggle sections on page load
  showSection(currentSection);

  var radioButtons = document.querySelectorAll('input[name="section"]');
  radioButtons.forEach(function (radio, index) {
    radio.addEventListener("change", function () {
      currentSection = index;
      showSection(currentSection);
    });
  });

  // Add event listeners to icon labels for toggling radio buttons
  var iconLabels = document.querySelectorAll(".icon-label");
  iconLabels.forEach(function (label, index) {
    label.addEventListener("click", function () {
      radioButtons[index].checked = true;
      currentSection = index;
      showSection(currentSection);
    });
  });

  window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY || window.pageYOffset;

    for (var i = 0; i < sections.length; i++) {
      var sectionTop = sections[i].offsetTop;
      var sectionBottom = sectionTop + sections[i].offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        if (currentSection !== i) {
          currentSection = i;
          showSection(i);
          radioButtons[currentSection].checked = true;
        }
        break;
      }
    }
  });
});

function toggleNavbar() {
  var navbar = document.getElementById("navbar");
  var menuBtn = document.querySelector(".menu-btn");
  var closeBtn = document.querySelector(".close-btn");

  if (window.innerWidth >= 787) {
    // For screens wider than 787 pixels, no need to toggle, show navbar directly
    navbar.style.left = "0";
    menuBtn.style.display = "none";
    closeBtn.style.display = "none";
    document.body.style.overflow = "auto"; // Allow scrolling
  } else {
    // For screens narrower than 787 pixels, toggle navbar visibility
    if (navbar.style.left === "-80%") {
      // Open navbar
      navbar.style.left = "0";
      menuBtn.style.display = "none";
      closeBtn.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      // Close navbar
      navbar.style.left = "-80%";
      menuBtn.style.display = "block";
      closeBtn.style.display = "none";
      document.body.style.overflow = "auto"; // Allow scrolling
    }
  }
}

// Initial check on page load
toggleNavbar();

// Event listener for window resize
window.addEventListener("resize", toggleNavbar);
