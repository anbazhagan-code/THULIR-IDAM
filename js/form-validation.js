// Form Validation for Contact Page
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Add input validation on blur
        const inputs = appointmentForm.querySelectorAll('input[required], select[required], textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
});

function validateForm() {
    const form = document.getElementById('appointmentForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove any existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('is-invalid');
    
    // Check if field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            errorMessage = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }
    }
    
    // Display error if any
    if (!isValid) {
        field.classList.add('is-invalid');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message invalid-feedback d-block';
        errorElement.textContent = errorMessage;
        field.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

function submitForm() {
    const form = document.getElementById('appointmentForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this to your server
    // For demo purposes, we'll simulate an API call
    setTimeout(() => {
        // Show success message
        submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
        submitButton.classList.remove('btn-primary');
        submitButton.classList.add('btn-success');
        
        // Show success alert
        showAlert('success', 'Thank you! Your appointment request has been sent successfully. We will contact you within 24 hours.');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-primary');
        }, 3000);
    }, 2000);
}

function showAlert(type, message) {
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type} alert-dismissible fade show`;
    alertElement.role = 'alert';
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    
    // Insert before form
    const form = document.getElementById('appointmentForm');
    form.parentElement.insertBefore(alertElement, form);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (alertElement.parentElement) {
            alertElement.remove();
        }
    }, 5000);
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            // Format as Indian phone number
            if (value.length >= 3 && value.length <= 5) {
                value = `${value.substring(0, 3)}-${value.substring(3)}`;
            } else if (value.length > 5) {
                value = `${value.substring(0, 3)}-${value.substring(3, 6)}-${value.substring(6)}`;
            }
            
            e.target.value = value;
        });
    }
});