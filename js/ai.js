var accessToken = "4010c7ed8915432297a2004b5ba9b30a",
  baseUrl = "https://api.api.ai/v1/",
  $speechInput,
  $recBtn,
  recognition,
  messageRecording = "Recording...",
  messageCouldntHear = "I couldn't hear you, could you say that again?",
  messageInternalError = "Oh no, there has been an internal server error",
  messageSorry = "I'm sorry, I don't have the answer to that yet.";

textInput = document.getElementById("input");   

function onClick(){
    document.getElementById('output').innerHTML = "Hey";
    
}