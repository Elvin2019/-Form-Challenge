document.addEventListener("DOMContentLoaded", (event) => {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const commentsInput = document.getElementById("comments");
    const emailInput = document.getElementById("email");
    const submitButton = document.getElementById("submit");
    const messageElement = document.getElementById("message");

    const subscribeNewsInput = document.getElementById("subscribeNews");

    let isChecked = false;
    subscribeNewsInput.addEventListener("change", (event) => {
        isChecked = event.target.checked;
        if (isChecked) {
            emailInput.parentElement.style.display = "block";
        } else {
            emailInput.parentElement.style.display = "none";
        }
    });

    const checkSubmitButton = () => {
        if (firstNameInput.value && lastNameInput.value) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    };

    firstNameInput.addEventListener("input", checkSubmitButton);
    lastNameInput.addEventListener("input", checkSubmitButton);

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const userData = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            comment: commentsInput.value,
            isSubscribed: isChecked,
        };
        if (userData.isSubscribed) {
            userData.email = emailInput.value;
        }

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                messageElement.textContent = "Thanks for your submission!";
                messageElement.style.color = "green";
                messageElement.style.fontWeight = "bold";
                clearForm();
            })
            .catch((error) => {
                messageElement.textContent = "Submission failed. Please try again.";
                messageElement.style.color = "red";
                messageElement.style.fontWeight = "bold";
            });
    });

    function clearForm() {
        firstNameInput.value = "";
        lastNameInput.value = "";
        commentsInput.value = "";
        emailInput.value = "";
        subscribeNewsInput.checked = false;
        emailInput.parentElement.style.display = "none";
        submitButton.disabled = true;
    }
});
