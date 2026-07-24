const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzR7sm16GEFPprJcbYIno6HPs3g--6jJke3Gv4n54qT3iY5VJ0bk1neHOATHpFonw-H/exec";

const form = document.getElementById("bookingForm");
const popup = document.getElementById("successPopup");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "⏳ جاري إرسال البيانات...";

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

        submitBtn.innerHTML = "✅ تم الحجز بنجاح";
        submitBtn.style.background = "#28a745";

        popup.style.display = "flex";

        const message =
`السلام عليكم

أنا اسمي: ${data.name}

طالب بالصف: ${data.grade}

لقد أتممت الحجز من خلال الموقع.`;

    let counter = 3;

const countdown = document.getElementById("countdown");

countdown.innerHTML = counter;

const timer = setInterval(() => {

    counter--;

    countdown.innerHTML = counter;

    if(counter <= 0){

        clearInterval(timer);

        popup.style.display = "none";

        window.open(
            `https://wa.me/201148131965?text=${encodeURIComponent(message)}`,
            "_blank"
        );

        form.reset();

        submitBtn.disabled = false;
        submitBtn.innerHTML = "🚀 تأكيد الحجز";
        submitBtn.style.background = "#0b3d91";

    }

},1000);
    } catch (error) {

        alert("حدث خطأ أثناء إرسال الحجز، حاول مرة أخرى.");

        submitBtn.disabled = false;
        submitBtn.innerHTML = "🚀 تأكيد الحجز";
        submitBtn.style.background = "#0b3d91";

        console.error(error);

    }

});
