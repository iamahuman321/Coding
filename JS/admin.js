  // Define admin credentials
  var admins = [
    { username: "iamahuman", password: "human" },
    { username: "iamamonke", password: "monke" },
    { username: "iamaalien", password: "alien" },
    { username: "iamacheese", password: "cheese" }
  ];

  // Function to submit feedback
  function submitFeedback(event) {
    event.preventDefault();

    var feedback = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    // Get existing feedbacks from localStorage
    var existingFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    // Add new feedback to the array
    existingFeedbacks.push(feedback);

    // Store the updated feedbacks back to localStorage
    localStorage.setItem("feedbacks", JSON.stringify(existingFeedbacks));

    // Clear the form fields
    document.getElementById("contactForm").reset();

    // Redirect to Thank You page
    window.location.href = "thanks.html";
  }

  // Function to display feedbacks
  function displayFeedbacks() {
    var authenticatedUser = localStorage.getItem("authenticatedUser");
    var feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    var feedbackList = document.getElementById("feedbackList");
    feedbackList.innerHTML = "";
    feedbacks.forEach(function (feedback, index) {
      if (authenticatedUser) {
        var li = document.createElement("li");
        li.classList.add("feedback-item");
        var namePara = document.createElement("p");
        namePara.textContent = "Name: " + feedback.name;
        var emailPara = document.createElement("p");
        emailPara.textContent = "Email: " + feedback.email;
        var messagePara = document.createElement("p");
        messagePara.textContent = "Feedback: " + feedback.message;
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "#00801c";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.borderRadius = "20px";
        deleteButton.onclick = function () {
          deleteFeedback(index);
        };
        li.appendChild(namePara);
        li.appendChild(emailPara);
        li.appendChild(messagePara);
        if (authenticatedUser) {
          li.appendChild(deleteButton);
        }
        feedbackList.appendChild(li);
      }
    });
  }

  // Function to handle login
  function login(event) {
    event.preventDefault();

    var username = document.getElementById("uname").value;
    var password = document.getElementById("psw").value;

    // Check if entered credentials match any admin's credentials
    var isAdmin = admins.some(function (admin) {
      return admin.username === username && admin.password === password;
    });

    if (isAdmin) {
      // Store authenticated user in localStorage
      localStorage.setItem("authenticatedUser", username);

      document.getElementById('id01').style.display = 'none'; // Hide the modal

      // Show the feedback section
      document.getElementById('feedbackSection').style.display = 'block';

      // Display existing feedbacks
      displayFeedbacks();
    } else {
      alert("Invalid username or password");
    }
  }

  // Function to logout
  function logout() {
    localStorage.removeItem("authenticatedUser");
    document.getElementById("feedbackSection").style.display = "none";
    displayFeedbacks(); // Clear feedbacks when logging out
  }

  // Function to delete a specific feedback
  function deleteFeedback(index) {
    var existingFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    existingFeedbacks.splice(index, 1);
    localStorage.setItem("feedbacks", JSON.stringify(existingFeedbacks));
    displayFeedbacks();
  }

  // Function to delete all feedbacks
  function deleteAllFeedback() {
    localStorage.removeItem("feedbacks");
    displayFeedbacks();
  }

  // Display feedbacks when the page loads
  window.onload = function () {
    var authenticatedUser = localStorage.getItem("authenticatedUser");
    if (authenticatedUser) {
      document.getElementById("feedbackSection").style.display = "block";
      displayFeedbacks();
    }
  }