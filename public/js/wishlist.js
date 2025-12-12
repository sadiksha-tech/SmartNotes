document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    let currentPage = 1;
    const limit = 6; // number of notes per page

    async function loadNotes(page) {
        try {
            const res = await fetch(`/api/notes?page=${page}&limit=${limit}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to load notes");
                return;
            }

            const list = document.getElementById("notes-list");
            list.innerHTML = "";

            // Render Notes
            data.notes.forEach(note => {
                const div = document.createElement("div");
                div.className = "note-card";
                div.innerHTML = `
                    <div class="note-content">
                        <strong>${note.title}</strong>
                        <p>${note.content}</p>
                    </div>
                `;
                list.appendChild(div);
            });

            // ------- PAGINATION -------
            const pageInfo = document.getElementById("pageInfo");
            pageInfo.innerText = `Page ${page} of ${data.totalPages}`;

            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");

            // Previous Button Logic
            if (page === 1) {
                prevBtn.disabled = false;
                prevBtn.onclick = () => {
                    // go to add-new-note section on page 1
                    window.location.href = "index.html"; 
                };
            } else {
                prevBtn.disabled = false;
                prevBtn.onclick = () => {
                    currentPage--;
                    loadNotes(currentPage);
                };
            }

            // Next Button Logic
            if (page >= data.totalPages) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
                nextBtn.onclick = () => {
                    currentPage++;
                    loadNotes(currentPage);
                };
            }

        } catch (err) {
            console.error(err);
            alert("Network error");
        }
    }

    loadNotes(currentPage);
});
