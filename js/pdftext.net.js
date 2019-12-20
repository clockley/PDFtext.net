window.addEventListener("load", function () {
    var output = document.getElementById("output");
    let fileName;
    /*********/
    var form = document.getElementById("fileInputForm");
    form.addEventListener("change", function (event) {
        var serverSubmission = new FormData(form);
        if (serverSubmission.get("fileInputElement") == "") {
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "cgi-bin/pdftext.fcgi");
        xhr.onload = function (event1) {
            if (xhr.status == 200) {
                fileName = document.getElementById("fileInputElement").files[0].name + ".txt";
                output.value = JSON.parse(xhr.responseText).C;
            } else {
                alert("Unable to extract text from the selected file.");
            }
        };
        xhr.send(serverSubmission.get("fileInputElement"));
        event.preventDefault();
    });
    /*********/
    document.getElementById("downloadButton").addEventListener("click", function (event) {
        require(["FileSaver.min"], function () {
            window.saveAs(new File([output.value], fileName, { type: "text/plain", endings: "native" }));
        });
    });
    /*********/
});