var accessToken = "4010c7ed8915432297a2004b5ba9b30a",
  baseUrl = "https://api.api.ai/v1/",
  $speechInput,
  $recBtn,
  recognition,
  messageRecording = "Recording...",
  messageCouldntHear = "I couldn't hear you, could you say that again?",
  messageInternalError = "Oh no, there has been an internal server error",
  messageSorry = "I'm sorry, I don't have the answer to that yet.";

document.getElementById("input").addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        onClick();
    }
});
function onClick(){
    var textInput = document.getElementById("input");
    if(textInput.value != ""){
        document.getElementById("response").innerHTML = document.getElementById("response").innerHTML + textInput.value + "\n";
        textInput.value = "";
        document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
        send();
    }
}

function send() {
    var text = $("#input").val();
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),

        success: function(data) {
            var answer = JSON.stringify(data.result.fulfillment.speech, undefined, 2);
            answer = answer.slice(1,answer.length-2);
            setResponse(answer);
        },
        error: function() {
            setResponse("Internal Server Error");
        }
    });
    setResponse("Loading...");
}

function setResponse(val) {
    $("#response").text(val);
}