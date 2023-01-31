(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:2876608,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

let inputCountry = document.getElementById('inputCountry');
let inputHouse = document.getElementById('inputHouse');
let inputPet = document.getElementById('inputPet')
let inputHand = document.getElementById('inputHand')
let inputBundesland = document.getElementById('inputBundesland')
let inputEasyQuestion = document.getElementById('inputEasyQuestion')
let nextButton = document.getElementById('nextButton')

let arrayOfInputs = [inputCountry, inputHouse, inputPet, inputHand, inputBundesland, inputEasyQuestion];

const container = document.getElementById('container')
let focusBlurObject = {};
let mouseOverOutObject = {};
let keyPressObject = {};
let tabBrowserFocusedObject = {};
let clickObject = {};
let browser; 

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

function onNextPage() {
  window.location.replace("../test-b/test-b.html");
  ws.close();
}

window.onload = function() {
	if(!window.location.hash) {
		window.location = window.location + '#loaded';
		window.location.reload();
	}
}
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
          siteName: 'TestEinfach', 
          browser: browser,
          session: localStorage.getItem('sessionID')
        }
        ws.send(JSON.stringify(focusBlurObject))
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
            siteName: 'TestEinfach', 
            browser: browser,
            click: event.click,
            session: localStorage.getItem('sessionID')
          }
          ws.send(JSON.stringify(clickObject))
      })
    })
}

//wenn jemand über ein Element hovert und drinnen ist 
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
          siteName: 'TestEinfach',
          session: localStorage.getItem('sessionID')
        }
      ws.send(JSON.stringify(mouseOverOutObject))
    })
  })
}

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
  function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

  sessionId = guidGenerator();


window.addEventListener('DOMContentLoaded', function() {
  ws.onopen = function() {
    localStorage.setItem('sessionID', sessionId);
     browser = detectBrowser()

     for (let index = 0; index < arrayOfInputs.length; index++) {
      listenerForFocusAndBlur(arrayOfInputs[index])
      listenerForKeyPress(arrayOfInputs[index])
      listenerForMouseOverAndOut(arrayOfInputs[index])
     }

     listenerForClick(nextButton)

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
          siteName: 'TestEinfach', 
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