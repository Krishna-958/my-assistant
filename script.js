document.addEventListener('DOMContentLoaded', (event) => {
    let btn = document.querySelector("#btn");
    let content = document.querySelector("#content");
    let voice = document.querySelector("#voice")

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.lang = 'hi-IN'; // English (India)
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.volume = 1;
        window.speechSynthesis.speak(text_speak);
    }

    btn.addEventListener('click', () => {
        let text = content.value;
        speak(text);
        btn.style.display="none"
        voice.style.display="block"
    });

    // Ensure Speech Recognition is compatible
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error("Speech Recognition API not supported in this browser.");
    } else {
        let recognition = new SpeechRecognition();

        recognition.onresult = function(event) {
          let currentIndex = event.resultIndex
          let transcript=event.results[currentIndex][0].transcript
          content.innerText=transcript
          takeCommand(transcript.toLowerCase())
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error detected: ', event.error);
        };

        recognition.onstart = function() {
            console.log('Speech recognition service has started');
        };

        recognition.onspeechend = function() {
            console.log('Speech recognition service has stopped');
        };

        btn.addEventListener('click', () => {
            recognition.start();
        });
    }

    function takeCommand(message){
        btn.style.display="flex"
        voice.style.display="none"
        if(message.includes("hello")|| message.includes("hey")){
           speak("hello sir,what can i help you?")
        }
        else if(message.includes("who are you")|| message.includes("hu r u")){
            speak("I am virtual assistant ,created by krishna sir")
        }
        else if(message.includes("open youtube")||message.includes("opening youtube")){
            speak("opening youtube...")
            window.open("https://www.youtube.com/","_blank")
        }
        else if(message.includes("open google")||message.includes("opening google")){
            speak("opening google...")
            window.open("https://www.google.com/","_blank")
        }
        else if(message.includes("open instagram")||message.includes("opening instagram")){
            speak("opening instagram...")
            window.open("https://www.instagram.com/","_blank")
        }
        else if(message.includes("open calculator")||message.includes("opening calculator")){
            speak("opening calculator...")
            window.open("calculator://")
        }
        else if(message.includes("open whatsapp")||message.includes("opening whatsapp")){
            speak("opening whatsapp...")
            window.open("whatsapp://")
        }
        else if(message.includes("time")){
            let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
            speak(time)
        }
        else if(message.includes("date")){
            let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
            speak(date)
        }
        else if(message.includes("open spotify")||message.includes("opening spotify")){
            speak("opening spotify...")
            window.open("spotify://")
        }
        else if(message.includes("open edge")||message.includes("open microsoft edge")){
            speak("opening microsoft edge...")
            window.open("microsoft-edge:http://www.yourwebsite.com")
        }
        else{
           let finalText= "this is what i found on internet regarding" + message.replace("nova","")||message.replace("novo","")
            speak(finalText)
            window.open(`https://www.google.com/search?q=${message.replace("nova","")}`,"_blank")
        }
    }
});

