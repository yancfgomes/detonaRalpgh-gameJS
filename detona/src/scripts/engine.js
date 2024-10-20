const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
    },
    values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      currentTime: 60,
    },
    actions: {
      timerId: null, // Inicializa como null
      countDownTimerId: null, // Inicializa como null
    },
  };
  
  // Função para diminuir o tempo e verificar o fim do jogo
  function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
  
    if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      alert("Game Over! O seu resultado foi: " + state.values.result);
    }
  }
  
  // Função para tocar o som ao acertar o "enemy"
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
  
  // Função para sortear o quadrado onde o "enemy" vai aparecer
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  // Função para adicionar o listener de "clique" nos quadrados
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }
      });
    });
  }
  
  // Função de inicialização do jogo
  function initialize() {
    addListenerHitBox();
  
    // Inicia os temporizadores apenas na inicialização
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
  }
  
  // Inicia o jogo
  initialize();
  