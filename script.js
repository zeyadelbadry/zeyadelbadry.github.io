const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzR7sm16GEFPprJcbYIno6HPs3g--6jJke3Gv4n54qT3iY5VJ0bk1neHOATHpFonw-H/exec";

const form = document.getElementById("bookingForm");
const popup = document.getElementById("successPopup");
const submitBtn = form.querySelector("button");

//=========================
// الصفوف حسب المرحلة
//=========================

const stageSelect = document.getElementById("stage");
const gradeSelect = document.getElementById("grade");

const grades = {

    "ابتدائي":[
        "الثالث الابتدائي",
        "الرابع الابتدائي",
        "الخامس الابتدائي",
        "السادس الابتدائي"
    ],

    "إعدادي":[
        "الأول الإعدادي",
        "الثاني الإعدادي",
        "الثالث الإعدادي"
    ]

};

stageSelect.addEventListener("change",()=>{

    gradeSelect.innerHTML='<option value="">اختر الصف</option>';

    if(!stageSelect.value) return;

    grades[stageSelect.value].forEach((grade)=>{

        gradeSelect.innerHTML +=
        `<option value="${grade}">
        ${grade}
        </option>`;

    });

});
//=========================
// إرسال النموذج
//=========================

form.addEventListener("submit", async function(e){

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

    try{

        await fetch(SCRIPT_URL,{

            method:"POST",
            mode:"no-cors",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        popup.style.display="flex";

        submitBtn.innerHTML="✅ تم الحجز بنجاح";
        submitBtn.style.background="#28a745";

        const message =
`السلام عليكم

أنا اسمي: ${data.name}

طالب بالصف: ${data.grade}

لقد أتممت الحجز من خلال الموقع.`;

        let counter = 3;

        const countdown =
        document.getElementById("countdown");

        countdown.innerHTML = counter;

        const timer = setInterval(()=>{

            counter--;

            countdown.innerHTML = counter;

            if(counter<=0){

                clearInterval(timer);

                popup.style.display="none";

                window.open(
                    `https://wa.me/201148131965?text=${encodeURIComponent(message)}`,
                    "_blank"
                );

                form.reset();

                gradeSelect.innerHTML =
                '<option value="">اختر الصف</option>';

                submitBtn.disabled=false;
                submitBtn.innerHTML="🚀 تأكيد الحجز";
                submitBtn.style.background="";

            }

        },1000);

    }catch(error){

        alert("حدث خطأ أثناء إرسال الحجز.");

        submitBtn.disabled=false;
        submitBtn.innerHTML="🚀 تأكيد الحجز";
        submitBtn.style.background="";

        console.error(error);

    }

});
//=========================
// الشريط المتحرك
//=========================

const marquee = document.querySelector(".marquee");

if(marquee){

    let position = window.innerWidth;

    function moveBanner(){

        position -= 1.5;

        marquee.style.right = position + "px";

        if(position < -marquee.offsetWidth){

            position = window.innerWidth;

        }

        requestAnimationFrame(moveBanner);

    }

    moveBanner();

}
const images = document.querySelectorAll(".gallery img");

const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const counter = document.getElementById("imageCounter");

let currentIndex = 0;

function updateViewer(){

    viewerImage.style.opacity = "0";
    viewerImage.style.transform = "scale(.96)";

    setTimeout(()=>{

        viewerImage.src = images[currentIndex].src;

        counter.innerHTML = ${currentIndex + 1} / ${images.length};

        viewerImage.style.opacity = "1";
        viewerImage.style.transform = "scale(1)";

    },150);

}

function openImage(src){

    currentIndex =
    [...images].findIndex(img=>img.src===src);

    updateViewer();

    imageViewer.style.display="flex";

}

function closeImage(){

    imageViewer.style.display="none";

}

function nextImage(e){

    e.stopPropagation();

    currentIndex++;

    if(currentIndex>=images.length){

        currentIndex=0;

    }

    updateViewer();

}

function prevImage(e){

    e.stopPropagation();

    currentIndex--;

    if(currentIndex<0){

        currentIndex=images.length-1;

    }

    updateViewer();

}

imageViewer.addEventListener("click",function(e){

    if(e.target===imageViewer){

        closeImage();

    }
});
document.addEventListener("keydown",function(e){
    if(imageViewer.style.display!=="flex") return;
    if(e.key==="ArrowRight") nextImage(e);
    if(e.key==="ArrowLeft") prevImage(e);
    if(e.key==="Escape") closeImage();
});
