document.addEventListener("DOMContentLoaded", function () {

    const nameInput = document.getElementById("comment-name");
    const textInput = document.getElementById("comment-text");
    const submitButton = document.getElementById("comment-submit");
    const commentList = document.getElementById("comment-list");

    if (!nameInput || !textInput || !submitButton || !commentList) {
        return;
    }


    let comments = [];

    try {
        const data = localStorage.getItem("alexComments");

        if (data) {
            comments = JSON.parse(data);
        }

    } catch (error) {
        comments = [];
    }


    function saveComments() {
        try {
            localStorage.setItem(
                "alexComments",
                JSON.stringify(comments)
            );
        } catch (error) {
            console.log("Komentar gagal disimpan.");
        }
    }


    function displayComments() {

        commentList.innerHTML = "";

        if (comments.length === 0) {

            const empty = document.createElement("div");

            empty.className = "no-comments";

            empty.textContent = "Belum ada komentar.";

            commentList.appendChild(empty);

            return;
        }


        comments.forEach(function (comment) {

            const item = document.createElement("div");

            item.className = "comment-item";


            /* NAMA DAN TANGGAL */

            const top = document.createElement("div");

            top.className = "comment-top";


            const name = document.createElement("div");

            name.className = "comment-name";

            name.textContent = comment.name;


            const date = document.createElement("div");

            date.className = "comment-date";

            date.textContent = comment.date;


            top.appendChild(name);

            top.appendChild(date);


            /* ISI KOMENTAR */

            const text = document.createElement("div");

            text.className = "comment-text";

            text.textContent = comment.text;


            /* BAGIAN TOMBOL */

            const actions = document.createElement("div");

            actions.className = "comment-actions";


            /* TOMBOL LIKE */

            const likeButton = document.createElement("button");

            likeButton.type = "button";

            likeButton.className = "like-button";


            if (comment.liked) {
                likeButton.classList.add("liked");
            }


            const heart = document.createElement("span");

            heart.textContent = "❤️";


            const count = document.createElement("span");

            count.textContent = comment.likes;


            likeButton.appendChild(heart);

            likeButton.appendChild(count);


            likeButton.addEventListener("click", function () {

                if (comment.liked) {

                    comment.likes--;
                    comment.liked = false;

                } else {

                    comment.likes++;
                    comment.liked = true;

                }

                saveComments();

                displayComments();

            });


            /* TOMBOL HAPUS */

            const deleteButton = document.createElement("button");

            deleteButton.type = "button";

            deleteButton.className = "delete-button";

            deleteButton.textContent = "🗑️ Hapus";


            deleteButton.addEventListener("click", function () {

                const yakin = confirm(
                    "Yakin mau hapus komentar ini?"
                );


                if (!yakin) {
                    return;
                }


                comments = comments.filter(function (data) {

                    return data.id !== comment.id;

                });


                saveComments();

                displayComments();

            });


            /* MASUKKAN TOMBOL */

            actions.appendChild(likeButton);

            actions.appendChild(deleteButton);


            /* MASUKKAN SEMUA KE KOMENTAR */

            item.appendChild(top);

            item.appendChild(text);

            item.appendChild(actions);

            commentList.appendChild(item);

        });

    }


    /* =========================
       TAMBAH KOMENTAR
    ========================== */

    function addComment() {

        const name = nameInput.value.trim();

        const text = textInput.value.trim();


        if (!name) {

            alert("Nama belum diisi.");

            nameInput.focus();

            return;
        }


        if (!text) {

            alert("Komentarnya belum diisi.");

            textInput.focus();

            return;
        }


        const comment = {

            id: Date.now(),

            name: name,

            text: text,

            likes: 0,

            liked: false,

            date: new Date().toLocaleDateString(
                "id-ID",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            )

        };


        comments.unshift(comment);

        saveComments();

        displayComments();


        nameInput.value = "";

        textInput.value = "";

        nameInput.focus();

    }


    /* =========================
       TOMBOL KIRIM
    ========================== */

    submitButton.addEventListener(
        "click",
        addComment
    );


    /* =========================
       CTRL + ENTER
    ========================== */

    textInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.ctrlKey &&
                event.key === "Enter"
            ) {

                addComment();

            }

        }
    );


    displayComments();

});
