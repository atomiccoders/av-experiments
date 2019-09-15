const btn = document.querySelector('.talk');
const content = document.querySelector('#content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition;

greetings = ['Dzisiaj jestem mniej wkurzona niż zwykle...', 'Nie masz ciekawszych zajęć?', 'Co cię to obchodzi, kmiotku?', 'Zajmij się sobą!'];
weather = ['Wstań i wyjrzyj przez okno leniuchu.', 'Może padać, albo nie...', 'I tak siedzisz cały dzień w domu...'];

btn.addEventListener('click', () => {
  recognition.start();
  setTimeout(() => {
    recognition.stop();
    console.log('Koniec gadania...');
  }, 3000);
})

recognition.onstart = () => {
  console.log('Zacznij mówić...');
}

recognition.onresult = event => {
  console.log(event);
  const current = event.resultIndex
  const text = event.results[current][0].transcript;
  content.value = text;

  readOutLoud(text);
}

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.lang = 'pl-PL';
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  speech.text = "Nie wiem o co ci chodzi...";

  message = message.toLowerCase();
  if(message.includes('witaj') || message.includes('cześć') || message.includes('siema')) {
    speech.text = 'Czego ode mnie chcesz?';
  }
  if(message.includes('co słychać') || message.includes('jak się') || message.includes('co u')) {
    speech.text = greetings[Math.floor(Math.random() * greetings.length)];
  }

  if(message.includes('pogoda')) {
    speech.text = weather[Math.floor(Math.random() * weather.length)];
  }

  window.speechSynthesis.speak(speech);
}