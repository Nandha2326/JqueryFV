// Using Jquery
// Getting Form tag

const myForm = $("form");
myForm.on('submit', e => {
    e.preventDefault();
    checkInputs();
})
$('#datetimepicker').datepicker({
    dateFormat: 'yy-mm-dd',
    timeFormat: 'HH:mm',
    changeMonth: true,
    changeYear: true,
    yearRange: "-24:-18",
    minDateTime: "1/01/1999 2:00 PM",
    maxDateTime: "9/12/2005 2:00 PM",

});


function checkInputs() {

    // getting ids value in variables and Trimming the spaces
    const fnamevalue = $("#fname").val().trim();
    const lnamevalue = $("#lname").val().trim();
    const emailvalue = $("#email").val().trim();
    const MobileNovalue = $("#MobileNo").val().trim();
    const Agevalue = $("#Age").val().trim();
    const AddressValue = $("#Addre").val().trim();
    const QualificationValue = $("#Qualification").val().trim();
    const ProfileValue = $('#ProfilePic').val().trim();

    // for checkBox
    const LocateValue = $('input[name="Locate"]:checked').val();
    const GenderValue = $('input[name="gender"]:checked').val();
    const SkillsValue = $('[name="Skills"]:checked').val();
    const AgreeValue = $('[name="agree"]:checked').val();
    //to Validate firstnameValue
    if (fnamevalue == "") {
        $('#alert-fname').removeClass('alert-None ');
    }
    else {
        if (fnamevalue.length < 6) {
            $('#alert-fname2').removeClass('alert-None ');

        }
        else {
            $('#alert-fname2').addClass('alert-None');

        }
        $('#alert-fname').addClass('alert-None');
    }

    //to Validate LastnameValue
    if (lnamevalue == "") {
        $('#alert-lname').removeClass('alert-None ');
    }
    else {
        $('#alert-lname').addClass('alert-None');
    }

    //to Validate EmailValue
    const check1 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailvalue == "") {
        $('#alert-email').removeClass('alert-None ');

    }
    else if (!check1.test(emailvalue)) {
        $('#alert-email1').removeClass('alert-None');
        $('#alert-email').addClass('alert-None');
    }
    else {
        $('#alert-email').addClass('alert-None ');
        $('#alert-email1').addClass('alert-None');
    }



    //to Validate MobileNo
    const check2 = /^[0-9]{10}$/;
    if (MobileNovalue == "") {
        $('#alert-MobileNo').removeClass('alert-None');
    }

    else if (!check2.test(MobileNovalue)) {

        $('#alert-MobileNo').removeClass('alert-None');
    }
    else {
        $('#alert-MobileNo').addClass('alert-None');
    }

    //to Validate AgeValue
    if (Agevalue == "") {
        $('#alert-Age').removeClass('alert-None');
    }
    else {
        $('#alert-Age').addClass('alert-None');
    }

    //to  Validate Address
    if (AddressValue == "") {
        $('#alert-Address').removeClass('alert-None');
    }
    else {
        $('#alert-Address').addClass('alert-None');
    }

    // to validate Date of Birth
    const dateInput = $('#datetimepicker').val().trim();
    const enteredDate = new Date(dateInput);
    const today = new Date();
    const minAge = 18;
    const maxAge = 24;

    // Calculate the age based on the entered date and today's date
    let age = today.getFullYear() - enteredDate.getFullYear();
    enteredDate.setFullYear(today.getFullYear());

    // If the birthday hasn't occurred yet this year, decrease the age by 1
    if (today < enteredDate) {
        age--;
    }
    if (dateInput === '') {
        $('#alert-Date').removeClass('alert-None');

    } else if (isNaN(enteredDate.getTime()) || age < minAge || age >= maxAge) {
        $('#alert-Date1').removeClass('alert-None');
        $('#alert-Date').addClass('alert-None');
    }
    else {
        $('#alert-Date1').addClass('alert-None');
    }
    //to  Validate Locate
    if (!LocateValue) {
        $('#alert-Locate').removeClass('alert-None');
    }
    else {
        $('#alert-Locate').addClass('alert-None');
    }
    //to  Validate Gender
    if (!GenderValue) {
        $('#alert-Gender').removeClass('alert-None');
    }
    else {
        $('#alert-Gender').addClass('alert-None');
    }

    //to  Validate Gender
    if (!SkillsValue) {
        $('#alert-Skills').removeClass('alert-None');
    }
    else {
        $('#alert-Skills').addClass('alert-None');
    }

    // to  Validate AgreeValue
    if (!AgreeValue) {
        $('#alert-Agree').css('color', 'red');
    }
    else {
        $('#alert-Agree').css('color', 'green');
    }

    //to  Validate QualificationValue
    if (!QualificationValue) {
        $('#alert-Qual').removeClass('alert-None');
    }
    else {
        $('#alert-Qual').addClass('alert-None');
    }

    //to  Validate Profile
    if (ProfileValue === "") {
        $("#alert-Profile").removeClass('alert-None');
    }
    else {
        $("#alert-Profile").addClass('');
    }
}

// to upload image and Delete
const Prof = $('#Prof');
$('.bt').on('click', function () {
    deleteImage();
});

$('#ProfilePic').on('change', function () {
    changeImage(this);
});

function changeImage(input) {
    const file = input.files[0];
    const fileType = file.type;

    $("#dropFiles").removeClass('bor');
    $("#alert-Profile").addClass('alert-None');
    $(".toremove").addClass('alert-None');
    const validImageTypes = ['image/jpeg', 'image/png'];
    if (validImageTypes.includes(fileType)) {

        const reader = new FileReader();//calling a function fileReader
        reader.readAsDataURL(input.files[0]);//recieving the upload image

        reader.onload = function (e) {
            Prof.append(`<img src="${e.target.result}" alt="Uploaded image">
        <a class="bt" onclick="deleteImage()"><i class="fa-solid fa-trash rr"></i></a>`);
        };
    }
    else if (file.type === "application/pdf") {

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function (e) {
            Prof.append(`<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/800px-PDF_file_icon.svg.png" alt="Uploaded Image">
<a class="bt" onclick="deleteImage()"><i class="fa-solid fa-trash rr"></i></a>`);

        };
    }
    // Perform text file validation
    else if (fileType === 'text/plain') {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            Prof.append(`<img src="./pic/fileUploaded.svg" alt="Uploaded image">
            <a class="bt" onclick="deleteImage()"><i class="fa-solid fa-trash rr"></i></a>`);
        };
    }
    else if (file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function (e) {
            Prof.append(`<img src="./pic/docs.webp" alt="Uploaded Image">
<a class="bt" onclick="deleteImage()"><i class="fa-solid fa-trash rr"></i></a>`);

        };
    }
    else {
        alert("Invalid file type. Please upload an image or a text file.");
        $("#ProfilePic").val("");
        $("#alert-Profile").removeClass('alert-None');
        $("#dropFiles").addClass('bor');
        $(".toremove").removeClass('alert-None');
    }
}
// DROP AND DRAG
$(document).ready(function () {
    $("#dropFiles").on('dragenter', function (ev) {
        // Entering drop area. Highlight area
        $("#dropFiles").addClass("highlightDropArea");
    });

    $("#dropFiles").on('dragleave', function (ev) {
        // Going out of drop area. Remove Highlight
        $("#dropFiles").removeClass("highlightDropArea");
    });

    $("#dropFiles").on('drop', function (ev) {
        // Dropping files
        ev.preventDefault();
        ev.stopPropagation();
        // Clear previous messages
        $("#messages").empty();
        if (ev.originalEvent.dataTransfer) {
            if (ev.originalEvent.dataTransfer.files.length) {
                let droppedFiles = ev.originalEvent.dataTransfer.files;
                for (var i = 0; i < droppedFiles.length; i++) {

                    $("#dropFiles").removeClass('bor');
                    $(".toremove").addClass('alert-None');
                    $("#alert-Profile").addClass('alert-None');

                    const file = droppedFiles[i];
                    const fileType = file.type;
                    const validImageTypes = ['image/jpeg', 'image/png'];
                    if (fileType == "text/plain") {
                        $("#messages").append("<br /><b>Dropped File:</b> " + droppedFiles[i].name);
                        const reader = new FileReader();
                        reader.readAsText(file);

                        reader.onload = function (e) {
                            Prof.append(`<img src="https://assets.dryicons.com/uploads/icon/svg/6176/eb9a89e8-ef53-4cff-beeb-c04dc3f0ebcb.svg" alt="Uploaded Image">
                <a class="bt" onclick="deleteImage()"><i class="fa-solid fa-trash rr"></i></a>`);

                        };
                    }

                    else if (file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                        $("#messages").append("<br /><b>Dropped File:</b> " + droppedFiles[i].name);
                        const reader = new FileReader();
                        reader.readAsText(file);

                        reader.onload = function (e) {
                            Prof.append(`<img src="./pic/docs.webp" alt="Uploaded Image">
                <a class="bt" onclick="deleteImage()"><i class="fa-solid fa-trash rr"></i></a>`);

                        };
                    }
                    else if (file.type === "application/pdf") {
                        $("#messages").append("<br /><b>Dropped File:</b> " + droppedFiles[i].name);
                        const reader = new FileReader();
                        reader.readAsText(file);

                        reader.onload = function (e) {
                            Prof.append(`<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/800px-PDF_file_icon.svg.png" alt="Uploaded Image">
                <a class="bt" onclick="deleteImage()"><i class="fa-solid fa-trash rr"></i></a>`);

                        };
                    }
                    else if (validImageTypes.includes(fileType)) {
                        $("#messages").append("<br /><b>Dropped File:</b> " + droppedFiles[i].name);
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function (e) {
                            Prof.append(`<img src="${e.target.result}" alt="Uploaded Image">
                <a class="bt" onclick="deleteImage()"><i class="fa-solid fa-trash rr"></i></a>`)
                        }
                    }
                    else {
                        alert("Invalid File TYPE");
                        $("#alert-Profile").removeClass('alert-None');
                        $("#dropFiles").addClass('bor');
                        $(".toremove").removeClass('alert-None');
                    }
                }
            }
        }

        $("#dropFiles").removeClass("highlightDropArea");
        return false;
    });

    $("#dropFiles").on('dragover', function (ev) {
        ev.preventDefault();
    });
})

// delete Function
function deleteImage() {
    Prof.html('');
    $('#ProfilePic').val('');
    $('#messages').empty();
    $("#alert-Profile").removeClass('alert-None');
    $(".toremove").removeClass('alert-None');
    $("#dropFiles").addClass('bor');
}
