document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous messages and errors
      formMessage.className = 'message';
      formMessage.textContent = '';
      clearErrorMessages();
      
      // Validate form
      if (validateForm()) {
          // Simulate form submission (in a real project, you would use fetch or AJAX)
          simulateSubmission();
      }
  });
  
  function validateForm() {
      let isValid = true;
      
      // Validate Name
      const name = document.getElementById('name').value.trim();
      if (name === '') {
          showError('nameError', 'Name is required');
          isValid = false;
      } else if (name.length < 2) {
          showError('nameError', 'Name must be at least 2 characters');
          isValid = false;
      }
      
      // Validate Email
      const email = document.getElementById('email').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
          showError('emailError', 'Email is required');
          isValid = false;
      } else if (!emailRegex.test(email)) {
          showError('emailError', 'Please enter a valid email');
          isValid = false;
      }
      
      // Validate Message
      const message = document.getElementById('message').value.trim();
      if (message === '') {
          showError('messageError', 'Message is required');
          isValid = false;
      } else if (message.length < 10) {
          showError('messageError', 'Message must be at least 10 characters');
          isValid = false;
      }
      
      return isValid;
  }
  
  function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
  }
  
  function clearErrorMessages() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(msg => {
          msg.textContent = '';
      });
  }
  
  function simulateSubmission() {
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate API call delay
      setTimeout(() => {
          // Show success message
          formMessage.className = 'message success';
          formMessage.textContent = 'Thank you! Your message has been sent successfully.';
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = 'Submit';
          
          // Hide message after 5 seconds
          setTimeout(() => {
              formMessage.className = 'message';
              formMessage.textContent = '';
          }, 5000);
      }, 1500);
  }
  
  // In a real project, you would replace simulateSubmission() with:
  /*
  function submitForm() {
      const formData = new FormData(contactForm);
      
      fetch('your-api-endpoint', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              // Show success message
              formMessage.className = 'message success';
              formMessage.textContent = data.message || 'Thank you! Your message has been sent successfully.';
              contactForm.reset();
          } else {
              // Show error message
              formMessage.className = 'message error';
              formMessage.textContent = data.message || 'There was an error sending your message.';
          }
      })
      .catch(error => {
          formMessage.className = 'message error';
          formMessage.textContent = 'There was an error sending your message.';
      })
      .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = 'Submit';
      });
  }
  */
});