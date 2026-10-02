"use strict";

/* Required pure validation functions */
function isValidStudentNumber(value) {
    const trimmedValue = String(value).trim();
    return /^\d{2}-\d{4}-\d{3}$/.test(trimmedValue);
}

function isValidPassword(value) {
    const password = String(value);

    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[@$!]/.test(password) &&
        !/\s/.test(password)
    );
}

/* Required CommonJS exports for Node/autograder testing */
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

/* Browser code is guarded for Node compatibility */
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("registrationForm");

        const fullName = document.getElementById("fullName");
        const studentNumber = document.getElementById("studentNumber");
        const email = document.getElementById("email");
        const mobileNumber = document.getElementById("mobileNumber");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const course = document.getElementById("course");
        const terms = document.getElementById("terms");

        const fullNameError = document.getElementById("fullNameError");
        const studentNumberError = document.getElementById("studentNumberError");
        const emailError = document.getElementById("emailError");
        const mobileNumberError = document.getElementById("mobileNumberError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        const courseError = document.getElementById("courseError");
        const termsError = document.getElementById("termsError");
        const passwordFeedback = document.getElementById("passwordFeedback");

        const successMessage = document.getElementById("successMessage");
        const registrationSummary = document.getElementById("registrationSummary");

        const summaryName = document.getElementById("summaryName");
        const summaryStudentNumber = document.getElementById("summaryStudentNumber");
        const summaryEmail = document.getElementById("summaryEmail");
        const summaryMobileNumber = document.getElementById("summaryMobileNumber");
        const summaryCourse = document.getElementById("summaryCourse");

        function setError(input, errorElement, message) {
            errorElement.textContent = message;
            input.setAttribute("aria-invalid", message ? "true" : "false");
        }

        function clearError(input, errorElement) {
            errorElement.textContent = "";
            input.setAttribute("aria-invalid", "false");
        }

        function validateFullName() {
            const value = fullName.value.trim();

            if (!value) {
                setError(fullName, fullNameError, "Full name is required.");
                return false;
            }

            if (value.length < 2) {
                setError(fullName, fullNameError, "Full name must contain at least two characters.");
                return false;
            }

            clearError(fullName, fullNameError);
            return true;
        }

        function validateStudentNumber() {
            const value = studentNumber.value.trim();

            if (!value) {
                setError(studentNumber, studentNumberError, "Student number is required.");
                return false;
            }

            if (!isValidStudentNumber(value)) {
                setError(studentNumber, studentNumberError, "Enter a student number in the format 24-1234-123.");
                return false;
            }

            clearError(studentNumber, studentNumberError);
            return true;
        }

        function validateEmail() {
            const value = email.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!value) {
                setError(email, emailError, "Email address is required.");
                return false;
            }

            if (!emailPattern.test(value)) {
                setError(email, emailError, "Enter a valid email address such as student@example.com.");
                return false;
            }

            clearError(email, emailError);
            return true;
        }

        function validateMobileNumber() {
            const value = mobileNumber.value.trim();
            const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

            if (!value) {
                setError(mobileNumber, mobileNumberError, "Mobile number is required.");
                return false;
            }

            if (!mobilePattern.test(value)) {
                setError(mobileNumber, mobileNumberError, "Enter 09 followed by 9 digits or +639 followed by 9 digits.");
                return false;
            }

            clearError(mobileNumber, mobileNumberError);
            return true;
        }

        function validatePassword() {
            if (!password.value) {
                setError(password, passwordError, "Password is required.");
                return false;
            }

            if (!isValidPassword(password.value)) {
                setError(password, passwordError,
                    "Password must be at least 8 characters with an uppercase letter, a digit, and @, $, or !. No spaces allowed.");
                return false;
            }

            clearError(password, passwordError);
            return true;
        }

        function updatePasswordFeedback() {
            const value = password.value;

            if (!value) {
                passwordFeedback.textContent = "";
                passwordFeedback.className = "password-feedback";
                return;
            }

            if (isValidPassword(value)) {
                passwordFeedback.textContent = "✓ Password meets all requirements.";
                passwordFeedback.className = "password-feedback valid";
                return;
            }

            const requirements = [];

            if (value.length < 8) requirements.push("at least 8 characters");
            if (!/[A-Z]/.test(value)) requirements.push("one uppercase letter");
            if (!/\d/.test(value)) requirements.push("one digit");
            if (!/[@$!]/.test(value)) requirements.push("one of @, $, or !");
            if (/\s/.test(value)) requirements.push("no spaces");

            passwordFeedback.textContent = "Needs: " + requirements.join(", ") + ".";
            passwordFeedback.className = "password-feedback invalid";
        }

        function validateConfirmPassword() {
            if (!confirmPassword.value) {
                setError(confirmPassword, confirmPasswordError, "Please confirm your password.");
                return false;
            }

            if (confirmPassword.value !== password.value) {
                setError(confirmPassword, confirmPasswordError, "Passwords do not match.");
                return false;
            }

            clearError(confirmPassword, confirmPasswordError);
            return true;
        }

        function validateCourse() {
            if (course.value !== "BSIT" && course.value !== "BSCS") {
                setError(course, courseError, "Please select BSIT or BSCS.");
                return false;
            }

            clearError(course, courseError);
            return true;
        }

        function validateTerms() {
            if (!terms.checked) {
                setError(terms, termsError, "You must agree to the terms before registering.");
                return false;
            }

            clearError(terms, termsError);
            return true;
        }

        function validateAllFields() {
            return [
                validateFullName(),
                validateStudentNumber(),
                validateEmail(),
                validateMobileNumber(),
                validatePassword(),
                validateConfirmPassword(),
                validateCourse(),
                validateTerms()
            ].every(Boolean);
        }

        function displaySummary() {
            summaryName.textContent = fullName.value.trim();
            summaryStudentNumber.textContent = studentNumber.value.trim();
            summaryEmail.textContent = email.value.trim();
            summaryMobileNumber.textContent = mobileNumber.value.trim();
            summaryCourse.textContent = course.value;

            successMessage.textContent =
                "Registration details validated successfully!";

            successMessage.hidden = false;
            registrationSummary.hidden = false;
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (validateAllFields()) {
                displaySummary();
            } else {
                successMessage.textContent = "";
                successMessage.hidden = true;
                registrationSummary.hidden = true;

                const firstInvalid = form.querySelector('[aria-invalid="true"]');
                if (firstInvalid) firstInvalid.focus();
            }
        });

        password.addEventListener("input", () => {
            updatePasswordFeedback();

            if (password.value) validatePassword();
            if (confirmPassword.value) validateConfirmPassword();
        });

        fullName.addEventListener("blur", validateFullName);
        studentNumber.addEventListener("blur", validateStudentNumber);
        email.addEventListener("blur", validateEmail);
        mobileNumber.addEventListener("blur", validateMobileNumber);
        confirmPassword.addEventListener("blur", validateConfirmPassword);

        studentNumber.addEventListener("input", () => {
            if (studentNumber.value) validateStudentNumber();
        });

        email.addEventListener("input", () => {
            if (email.value) validateEmail();
        });

        mobileNumber.addEventListener("input", () => {
            if (mobileNumber.value) validateMobileNumber();
        });

        confirmPassword.addEventListener("input", () => {
            if (confirmPassword.value) validateConfirmPassword();
        });

        course.addEventListener("change", validateCourse);
        terms.addEventListener("change", validateTerms);

        form.addEventListener("reset", () => {
            setTimeout(() => {
                clearError(fullName, fullNameError);
                clearError(studentNumber, studentNumberError);
                clearError(email, emailError);
                clearError(mobileNumber, mobileNumberError);
                clearError(password, passwordError);
                clearError(confirmPassword, confirmPasswordError);
                clearError(course, courseError);
                clearError(terms, termsError);

                passwordFeedback.textContent = "";
                passwordFeedback.className = "password-feedback";

                successMessage.textContent = "";
                successMessage.hidden = true;

                summaryName.textContent = "";
                summaryStudentNumber.textContent = "";
                summaryEmail.textContent = "";
                summaryMobileNumber.textContent = "";
                summaryCourse.textContent = "";

                registrationSummary.hidden = true;
            }, 0);
        });

        successMessage.hidden = true;
        registrationSummary.hidden = true;
    });
}
