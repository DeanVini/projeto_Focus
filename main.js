
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
      if(seconds < 10){
        timeElement.innerHTML = minutes + ':' + '0' + seconds;
      }
      else{timeElement.innerHTML = minutes + ':' + seconds;}
      console.log("else", minutes, seconds);
    }
  }

}


let num = 283;
let currentNum = num;

function actualPath(path){
  subVal = 283*0.1/1500;

  currentNum = currentNum - subVal; // subtrai o valor especificado do num
  path.style.strokeDasharray = currentNum + ' 283' // atualiza o atributo strokeDasharray com o novo valor de num
  console.log("Tempo atual do Path:", currentNum); // imprime o valor atual de num no console para fins de depuraçã
}


function clickStart(){
  let path = document.getElementById("pathRemaning");

  intervalArm = setInterval(timerNumber, 1000);
  
  intervalPath = setInterval(()=>{
    actualPath(path);
  }, 100);

  let b1 = document.querySelector("#startCondition");
  let b2 = document.querySelector("#stopCondition");

  b1.style.display = 'none';
  b2.style.display = 'inline-block';
}

function clickStop(){
  clearInterval(intervalArm);
  clearInterval(intervalPath);

  let b1 = document.querySelector("#startCondition");
  let b2 = document.querySelector("#stopCondition");

  b1.style.display = 'inline-block';
  b2.style.display = 'none';
}


const acColor = {
  info:{
    color: "green"
  }
};

let coloredPath = acColor.info.color;
