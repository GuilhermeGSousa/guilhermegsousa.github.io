"use strict";
var accessToken = "8dc52f1a17394ceb8bfb96e9ef860990",
  baseUrl = "https://api.api.ai/v1/",
  $speechInput,
  $recBtn,
  recognition,
  messageRecording = "Recording...",
  messageCouldntHear = "I couldn't hear you, could you say that again?",
  messageInternalError = "Oh no, there has been an internal server error",
  messageSorry = "I'm sorry, I don't have the answer to that yet.";
var $contactForm = $('#contact-form');

document.getElementById("input").addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        onClick();
    }
});
function onClick(){
    var textInput = document.getElementById("input");
    
    if(textInput.value != ""){
        send();
        textInput.value = "";
        document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
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
            answer = answer.slice(1,answer.length-1);
            setResponse(answer);
            console.log(data.result.action);
            if(!data.result.actionIncomplete){
                if(data.result.action == "mail.send"){
                    sendMail(data.result.parameters.Mail, data.result.parameters.Text);
                }
            }
        },
        error: function() {
            setResponse("Internal Server Error");
        }
    });
    setResponse("Thinking...");
}

function setResponse(val) {
    $("#response").text(val);
}

function sendMail(mailAddress, message){
    document.getElementById("reply").value=mailAddress;
    document.getElementById("message").value=message;
    document.forms["contact-form"].submit();
}
