document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("error-message");
     try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data    )
            localStorage.setItem("token", data.token);

            window.location.href = "index.html";

        } else {
            message.textContent = "Utilisateur / mot de passe ne sont pas correctes";

        }
    } catch (error) {
        message.textContent = "problem backend.";
    } 
});
