document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("add-note-btn");

    addBtn.addEventListener("click", async () => {
        const title = document.getElementById("note-title").value.trim();
        const content = document.getElementById("note-content").value.trim();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            window.location.href = "login.html";
            return;
        }

        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to add note");
                return;
            }

            alert("Note added successfully!");

            // 🔥 Redirect to notes list page
            window.location.href = "wishlist.html"; 
            // or replace with your page that shows existing notes
            // e.g.: "notes.html" or "index.html"

        } catch (err) {
            alert("Network error");
        }
    });
});
