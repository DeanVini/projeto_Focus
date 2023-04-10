
//FUNÇÃO DE CALCULO DO TEMPO DO CRONOMETRO
//=======================================================================================================================================================
function timerNumber(){
  let timeElement = document.querySelector("#timerNumber")
  let reactiveTime = timeElement.innerHTML; //peguei o elemento dentro da h1 no id timerNumber, para que o algoritmo receba sempre a entrada do html
  console.log(reactiveTime);

  let minutes = parseInt(reactiveTime); // pego o primeiro inteiro da string gerada por reactiveTime (verifique o log do console)
  console.log(minutes);

  reactiveTime = reactiveTime.toString().replace(minutes, ''); // removo os minutos, pois ele ja foi definido
  reactiveTime = reactiveTime.toString().replace(':', ''); //removo os dois pontos, para que sobre apenas os segundos
  
  let seconds = parseInt(reactiveTime);
  console.log(seconds); //Veja o log do console

  if(minutes == 0 && seconds == 0){   // algoritmo simples de contagem de tempo
    clearInterval(intervalArm);
    clearInterval(intervalPath);
    reactiveTime = null;

    goToNext();
  }
  else{

    if(seconds == 0){
      minutes --;
      seconds = 59;
  
      if(minutes < 10){
        timeElement.innerHTML = '0' + minutes + ':' + seconds;
      }
      else{timeElement.innerHTML = minutes + ':' + seconds};  // o elemento que está dentro do h1 no html será minutos : segundos
      
      console.log("if", minutes, seconds);
    }
    else{
      seconds--;
      
      if(seconds < 10 && minutes < 10){
        timeElement.innerHTML = '0' + minutes + ':' + '0' + seconds;
      }
      else{
        if(seconds < 10){
          timeElement.innerHTML = minutes + ':' + '0' + seconds;
        }
        else{
          if(minutes < 10){
            timeElement.innerHTML = '0' + minutes + ':' + seconds;
          }
          else{
            timeElement.innerHTML = minutes + ':' + seconds; 
          }
        }
      }
    }
  }
}
//================================================================================================================================

/*num está fora para que seu valor não fique interno em uma função
  e possa ser alterado a cada intervalo de tempo */
const AREA_BASE = 283;
let courrentArea = AREA_BASE;
function actualPath(path){
  let firstTime = 0;

  title = document.getElementById("titulo").innerHTML;

  if(title == "FOCUS"){firstTime = 25;}
  else{firstTime = 5;};

  subVal = 283*0.1/(firstTime*60); //regra de três simples para desobrir o valor proporcional do intervalo (0.1 segundos) com o dasharray

  console.log(subVal);
  courrentArea = courrentArea - subVal; // subtrai o valor especificado do num
  path.style.strokeDasharray = courrentArea + ' 283' // atualiza o atributo strokeDasharray com o novo valor de num
   // imprime o valor atual de num no console para fins de depuração
}


function clickStart(){
  let path = document.getElementById("pathRemaning");

  intervalArm = setInterval(timerNumber, 1000);
  
  intervalPath = setInterval(()=>{
    actualPath(path); //a cada 100 milisegundos atualiza o decrementamendo do circulo externo
  }, 100);

  let b1 = document.querySelector("#startCondition");
  let b2 = document.querySelector("#stopCondition");

  b1.style.display = 'none'; //start desaparece 
  b2.style.display = 'inline-block'; //pause aparece
}

function clickStop(){
  timeAt = document.getElementById("timerNumber").innerHTML;
  if(timeAt != "25:00" || timeAt != "05:00"){
    clearInterval(intervalArm);
    clearInterval(intervalPath);
  }

  let b1 = document.querySelector("#startCondition");
  let b2 = document.querySelector("#stopCondition");

  b1.style.display = 'inline-block'; //start aparece
  b2.style.display = 'none'; //pause deparece

  actualTime = document.getElementById("timerNumber").innerHTML;

  showPausedTime(actualTime);
}


const acColor = {
  info:{
    color: "green"
  }
};

let coloredPath = acColor.info.color;


//Função para ir para o break do pomodoro quando clicar em next ou o tempo acabar;
/*=========================================================================================================================================================*/
function goToNext(){
  tituloElem = document.getElementById("titulo");
  tituloStr = tituloElem.innerHTML;

  basePathInfos = document.getElementById("basePath");

  timeElem = document.getElementById("timerNumber");

  console.log(tituloStr);

  if(tituloStr == "FOCUS"){
    if(timeElem.innerHTML != "25:00"){
      clickStop();
    }

    tituloElem.innerHTML = "BREAK";
    document.body.style.backgroundColor = "#1366bf";
    timeElem.innerHTML = "05:00";

    basePathInfos.style.stroke = "#4f7eaf"

    courrentArea = AREA_BASE
    let path = document.getElementById("pathRemaning");
    path.style.strokeDasharray = `${AREA_BASE} ${AREA_BASE}`;

    clickStart();

  }
  else{
    if(timeElem != "05:00"){
      clickStop();
    }

    tituloElem.innerHTML = "FOCUS";
    document.body.style.backgroundColor = "#af3434";
    timeElem.innerHTML = "25:00";

    basePathInfos.style.stroke = "#ad5858"

    courrentArea = AREA_BASE
    let path = document.getElementById("pathRemaning");
    path.style.strokeDasharray = `${AREA_BASE} ${AREA_BASE}`;

    clickStart();
  }
}

function showPausedTime(actualTime){
  const recElem = document.getElementById("pauseCheck");
  const newList = document.createElement("li");

  const pauseTime = document.createTextNode(actualTime);

  newList.appendChild(pauseTime);

  recElem.insertBefore(newList, recElem.children[0]);
}
