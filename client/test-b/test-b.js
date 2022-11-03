(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:2876608,hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

const divCookies = $('#cookies')
const errors = $('.error')
const error6 = $('#error6');
const error4 = $('#error4');
let inputHobby = document.getElementById('inputHobby');
let inputCancelor = document.getElementById('inputCancelor');
let inputTemperature = document.getElementById('inputTemperature');
let inputDays = document.getElementById('inputDays');
let inputRivers = document.getElementById('inputRiver');
let inputDifficultQuestion = document.getElementById('inputDifficultQuestion');
let nextButton = document.getElementById('nextButton');
let clickHere = document.getElementById('clickHere');
let alibiClick = document.getElementById('alibiClick');
let buttonYes = document.getElementById('buttonYes');
const ws = new WebSocket('ws://3.127.18.23:3000');

let arrayOfClicks = [nextButton, clickHere, alibiClick, buttonYes];

let arrayOfInputs = [inputHobby, inputCancelor, inputTemperature, inputDays, inputRivers, inputDifficultQuestion];

const container = document.getElementById('container')
let focusBlurObject = {};
let mouseOverOutObject = {};
let keyPressObject = {};
let tabBrowserFocusedObject = {};
let clickObject = {};
let browser; 

divCookies.hide();

for(let i=0;i<errors.length;i++){
let errorMessages = errors[i]
errorMessages.style.display = 'none';
}

setInterval(function() {
divCookies.fadeIn()
}, 5000);

function detectBrowser() {

let userAgent = navigator.userAgent;
let browserName;

if (userAgent.match(/chrome|chromium|crios/i)) {
  browserName = "Chrome";
} else if (userAgent.match(/firefox|fxios/i)) {
  browserName = "Firefox";
} else if (userAgent.match(/safari/i)) {
  browserName = "Safari";
} else if (userAgent.match(/opr\//i)) {
  browserName = "Opera";
} else if (userAgent.match(/edg/i)) {
  browserName = "Edge";
} else if (userAgent.match(/android/i)) {
  browserName = "Android";
} else if (userAgent.match(/iphone/i)) {
  browserName = "iPhone";
} else {
  browserName = "Unknown";
}
return browserName
}

//bei focus müssen wir noch herausfinden ob er über tab oder click gegangen ist 
function listenerForFocusAndBlur(element) {
['focus', 'blur'].forEach(elementEvents => {
  element.addEventListener(elementEvents, event => {
      focusBlurObject = {
        id: event.srcElement.id,
        height: window.innerHeight,
        width: window.innerWidth,
        srcElement: event.srcElement,
        timeStamp: event.timeStamp,
        type: event.type,
        siteName: 'TestSchwer', 
        browser: browser,
        session: localStorage.getItem('sessionID')
      }
     ws.send(JSON.stringify(focusBlurObject))
  })
})
}

//wenn jemand über ein Element hovert und drinnen ist 
//wenn jemand über ein Element hovert und rausgeht --> denke wenn der Timestamp zu aneinnander ist --> einfach fallen lassen die Daten 
function listenerForMouseOverAndOut(element) {
['mouseover', 'mouseout'].forEach(elementEvents => {
  element.addEventListener(elementEvents, event => {
    mouseOverOutObject = {
        id: event.srcElement.id,
        height: window.innerHeight,
        width: window.innerWidth,
        clientX: event.clientX,
        clientY: event.clientY,
        timeStamp: event.timeStamp,
        type: event.type,
        siteName: 'TestSchwer',
        session: localStorage.getItem('sessionID')
      }
   ws.send(JSON.stringify(mouseOverOutObject))
  })
})
}

function listenerForClick(element) {
  ['click'].forEach(elementEvents => {
      element.addEventListener(elementEvents, event => {
          clickObject = {
            id: event.srcElement.id,
            height: window.innerHeight,
            width: window.innerWidth,
            srcElement: event.srcElement,
            timeStamp: event.timeStamp,
            type: event.type,
            siteName: 'TestSchwer', 
            browser: browser,
            click: event.click,
            session: localStorage.getItem('sessionID')
          }
          console.log(clickObject)
          ws.send(JSON.stringify(clickObject))
      })
    })
}

// hier müssen wir leider den Abstrich machen, dass Backspace nicht nur einmal gesendet wird sondern mehrere Male wenn man länger drauf bleibt.
function listenerForKeyPress(element) {
['keydown'].forEach(elementEvents => {
  element.addEventListener(elementEvents, event => {
    if(event.key === 'Backspace') {
    keyPressObject = {
      id: event.srcElement.id,
      height: window.innerHeight,
      width: window.innerWidth,
      key: event.key,
      timeStamp: event.timeStamp,
      type: event.type,
      siteName: 'TestEinfach',
      session: localStorage.getItem('sessionID')
      }
      ws.send(JSON.stringify(keyPressObject))
      }
   })
  })
}


window.addEventListener('DOMContentLoaded', function() {
ws.onopen = function() {
   browser = detectBrowser()

   for (let index = 0; index < arrayOfInputs.length; index++) {
    listenerForFocusAndBlur(arrayOfInputs[index])
    listenerForKeyPress(arrayOfInputs[index])
    listenerForMouseOverAndOut(arrayOfInputs[index])
   }

   for(let i = 0; i < arrayOfClicks.length; i++) {
    listenerForClick(arrayOfClicks[i])
   }

  // das bezieht sich wirklich nur aufs window
  Object.keys(window).forEach(key => {
    if(/^on(focus|blur|scroll)/.test(key)) {
      window.addEventListener(key.slice(2), event => {
        console.log(event)
      tabBrowserFocusedObject = {
        id: 'window',
        height: window.innerHeight,
        width: window.innerWidth,
        timeStamp: event.timeStamp,
        type: event.type,
        siteName: 'TestSchwer', 
        browser: browser,
        scroll: event.scroll,
        session: localStorage.getItem('sessionID')
      }
      ws.send(JSON.stringify(tabBrowserFocusedObject))
      })
    } 
  })
  console.log('Connected to Client');
}
});


function onButtonNoProblem() {
divCookies.remove()
}

function onCheckForInputFields() {
for (let index = 0; index < arrayOfInputs.length; index++) {
  if(inputDifficultQuestion.value && inputTemperature.value.includes('°')) {
    window.location.href = "../result-screen/result-screen.html";
  } else if (arrayOfInputs[index].value === '') {
    error6.fadeIn()
  } else if (!inputTemperature.value.includes('°')) {
    error4.fadeIn()
  }
  }
}

function onCheckForInputFieldsFertigButton() {
  for (let index = 0; index < arrayOfInputs.length; index++) {
    if(inputDifficultQuestion.value && inputTemperature.value.includes('°')) {
      document.getElementById('nextButton').style.display = 'none';
      document.getElementById('nextButton2').style.display = 'block';
    } else if (arrayOfInputs[index].value === '') {
      error6.fadeIn()
    } else if (!inputTemperature.value.includes('°')) {
      error4.fadeIn()
    }
  }
}