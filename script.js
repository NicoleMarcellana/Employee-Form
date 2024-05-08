document.addEventListener('DOMContentLoaded', function () {
    var dropArea = document.querySelector('.drop-area');
    var fileInput = document.querySelector('input[type="file"]');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFilesFromInput, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('highlight');
    }

    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;
        handleFiles(files);
    }

    function handleFilesFromInput(e) {
        var files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            dropArea.innerHTML = '';

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var fileUrl = URL.createObjectURL(file);

                var fileDiv = document.createElement('div');
                fileDiv.className = 'file-item';

                var fileElement;
                if (file.type.startsWith('image/')) {
                    fileElement = document.createElement('img');
                    fileElement.src = fileUrl;
                    fileElement.alt = file.name;
                } else {
                    fileElement = document.createElement('a');
                    fileElement.href = fileUrl;
                    fileElement.target = '_blank';
                    fileElement.textContent = file.name;

                    var icon;
                    if (file.type.startsWith('application/pdf')) {
                        icon = 'css/icon/pdf.png';
                    } else if (file.type.startsWith('application/msword') || file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                        icon = 'css/icon/word.png';
                    } else {
                        icon = 'css/icon/folder.png';
                    }
                    var iconElement = document.createElement('img');
                    iconElement.src = icon;
                    iconElement.alt = 'File Icon';
                    iconElement.className = 'file-icon';
                    fileDiv.appendChild(iconElement);
                }

                var deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button', 'clear';
                deleteButton.textContent = 'Delete', 'clear';

                deleteButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    fileDiv.remove();
                    URL.revokeObjectURL(fileUrl);

                    if (dropArea.querySelectorAll('.file-item').length === 0) {
                        dropArea.innerHTML = '<img src="css/icon/cloud-computing.png" class="imgupload">' +
                            '<span class="browse">Browse Files</span>' +
                            '<span></span>' +
                            '<span>Drag and drop files here</span>';
                    }
                });

                fileDiv.appendChild(fileElement);
                fileDiv.appendChild(deleteButton);

                dropArea.appendChild(fileDiv);
            }
        }
    }
});



document.addEventListener("DOMContentLoaded", function() {
    var otherWorkRadio = document.getElementById("work-choice-4");
    var otherWorkInput = document.getElementById("other-work");

    otherWorkRadio.addEventListener("change", function() {
        if (otherWorkRadio.checked) {
            otherWorkInput.style.display = "inline";
        } else {
            otherWorkInput.style.display = "none";
        }
    });

    var workRadios = document.querySelectorAll('[id^="work-choice-"]');
    workRadios.forEach(function(radio) {
        if (radio.id !== "work-choice-4") {
            radio.addEventListener("change", function() {
                otherWorkInput.style.display = "none";
            });
        }
    });

    var otherGenderRadio = document.getElementById("gender-choice-6");
    var otherGenderInput = document.getElementById("other-gender");

    otherGenderRadio.addEventListener("change", function() {
        if (otherGenderRadio.checked) {
            otherGenderInput.style.display = "inline";
        } else {
            otherGenderInput.style.display = "none";
        }
    });

    var genderRadios = document.querySelectorAll('[id^="gender-choice-"]');
    genderRadios.forEach(function(radio) {
        if (radio.id !== "gender-choice-6") {
            radio.addEventListener("change", function() {
                otherGenderInput.style.display = "none";
            });
        }
    });

    var otherDisabilityRadio = document.getElementById("disability-choice-10");
    var otherDisabilityInput = document.getElementById("other-disability");
    
    otherDisabilityRadio.addEventListener("change", function() {
        if (otherDisabilityRadio.checked) {
            otherDisabilityInput.style.display = "inline";
        } else {
            otherDisabilityInput.style.display = "none";
        }
    });

    var disabilityRadios = document.querySelectorAll('[id^="disability-choice-"]');
    disabilityRadios.forEach(function(radio) {
        if (radio.id !== "disability-choice-10") {
            radio.addEventListener("change", function() {
                otherDisabilityInput.style.display = "none";
            });
        }
    });

    var otherRaceRadio = document.getElementById("race-choice-8");
    var otherRaceInput = document.getElementById("other-race");
    
    otherRaceRadio.addEventListener("change", function() {
        if (otherRaceRadio.checked) {
            otherRaceInput.style.display = "inline";
        } else {
            otherRaceInput.style.display = "none";
        }
    });

    var raceRadios = document.querySelectorAll('[id^="race-choice-"]');
    raceRadios.forEach(function(radio) {
        if (radio.id !== "race-choice-8") {
            radio.addEventListener("change", function() {
                otherRaceInput.style.display = "none";
            });
        }
    });
});

function updateBarangays() {
    var city = document.getElementById("city").value;
    var cityDropdown = document.getElementById("city");
    var barangayDropdown = document.getElementById("barangay");
    barangayDropdown.innerHTML = '<option value="">Select Barangay</option>';
    if (city !== "") {
        if (data.hasOwnProperty(city)) {
            data[city].forEach(barangay => {
                var option = document.createElement("option");
                option.text = barangay;
                barangayDropdown.add(option);
            });
        } else {
            console.error("City not found in data.");
        }
    }
}

window.onload = function() {
    Object.keys(data).forEach(city => {
        var option = document.createElement("option");
        option.text = city;
        document.getElementById("city").add(option);
    });

    document.getElementById("city").addEventListener("change", updateBarangays);
};

