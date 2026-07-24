// جاهز لإضافة ربط Google Sheets لاحقًا.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzR7sm16GEFPprJcbYIno6HPs3g--6jJke3Gv4n54qT3iY5VJ0bk1neHOATHpFonw-H/exec";

const form = document.getElementById("bookingForm");
const popup = document.getElementById("successPopup");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.innerText = "جاري إرسال الحجز...";

    const data = {
        name: form.name.value,
        phone: form.phone.value,
        stage: form.stage.value,
        grade: form.grade.value,
        address: form.address.value,
        notes: form.notes.value
    };

    try {

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        popup.style.display = "flex";

        const message =
`السلام عليكم

أنا اسمي: ${data.name}

طالب بالصف: ${data.grade}

لقد أتممت الحجز من خلال الموقع.`;

        setTimeout(() => {

            window.open(
                `https://wa.me/201148131965?text=${encodeURIComponent(message)}`,
                "_blank"
            );

            form.reset();

            popup.style.display = "none";

            submitBtn.disabled = false;
            submitBtn.innerText = "إرسال الحجز";

        }, 2500);

    } catch (error) {

        alert("حدث خطأ أثناء إرسال الحجز.");

        submitBtn.disabled = false;
        submitBtn.innerText = "إرسال الحجز";

        console.error(error);

    }

});
