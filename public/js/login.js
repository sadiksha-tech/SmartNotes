document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("loginBtn");

    btn.addEventListener("click", async () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);
            alert("Login successful!");

            window.location.href = "index.html";

        } catch (err) {
            alert("Network error");
        }
    });
});
