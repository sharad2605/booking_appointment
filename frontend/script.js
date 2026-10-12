
const API_URL = "http://localhost:3000/users";

const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");
const usersList = document.getElementById("usersList");

// POST API: Register a user
bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
       
    };

    try {
        await axios.post(API_URL, userData);

        message.textContent = "Appointment booked successfully!";
        message.style.color = "green";

        bookingForm.reset();
        getUsers();
    } catch (error) {
        console.error(error);

        message.textContent =
            error.response?.data?.message || "Failed to book appointment.";
        message.style.color = "red";
    }
});

// GET API: Display all users
async function getUsers() {
    try {
        const response = await axios.get(API_URL);
        usersList.innerHTML = "";

        response.data.forEach((user) => {
            const card = document.createElement("div");
            card.className = "user-card";

            const details = document.createElement("p");
            details.textContent =
                `Name: ${user.name} | Email: ${user.email} | Phone: ${user.phone}`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";
            deleteButton.addEventListener("click", () => deleteUser(user.id));

            card.append(details, deleteButton);
            usersList.appendChild(card);
        });

        if (response.data.length === 0) {
            usersList.textContent = "No users registered yet.";
        }
    } catch (error) {
        console.error(error);
        usersList.textContent = "Could not load users. Check that the backend is running.";
    }
}

// DELETE API: Remove a user
async function deleteUser(id) {
    try {
        await axios.delete(`${API_URL}/${id}`);
        message.textContent = "User deleted successfully!";
        message.style.color = "green";

        getUsers();
    } catch (error) {
        console.error(error);
        message.textContent = "Failed to delete user.";
        message.style.color = "red";
    }
}

// Load users when the page opens
getUsers();