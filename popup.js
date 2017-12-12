function sendToServer(resume) {
    var data = JSON.stringify(resume.resume);
    var url = "http://localhost:8080/extensions/add-resume";
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            var skillateLink = result.id;
            $("#skillateLink").val(skillateLink);
            console.log(result);
        }
    });

    // $.post(
    //     url,
    //     data,
    //     function(result) {
    //         console.log(result);
    //     },
    //     "json"
    // );
}

$("#sendResume").click(function() {
    console.log("button clicked");
    // ...query for the active tab...
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        function(tabs) {
            // ...and send a request for the DOM info...
            chrome.tabs.sendMessage(
                tabs[0].id,
                { from: "popup", subject: "DOMInfo" },
                // ...also specifying a callback to be called
                //    from the receiving end (content script)
                sendToServer
            );
        }
    );
});

function setDOMInfo(resume) {
    var url = "http://localhost:8080/extensions/add-resume";
}

// // Once the DOM is ready...
// window.addEventListener("DOMContentLoaded", function() {
//     // ...query for the active tab...
//     chrome.tabs.query(
//         {
//             active: true,
//             currentWindow: true
//         },
//         function(tabs) {
//             // ...and send a request for the DOM info...
//             chrome.tabs.sendMessage(
//                 tabs[0].id,
//                 { from: "popup", subject: "DOMInfo" },
//                 // ...also specifying a callback to be called
//                 //    from the receiving end (content script)
//                 setDOMInfo
//             );
//         }
//     );
// });
