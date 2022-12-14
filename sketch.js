//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let movimentacaoYOponente;

//Dificuldade variavel do oponente
let dificuldadeOponente = 30;
let alteraDif;
let hora;
let minuto;
let segundo;
let tempo1 = 1;
let tempo2 = 2;
let difTempo12;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

//Carrego os sons a serem utilizados no jogo
function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

//Criando a area da tela do jogo
function setup() {
  createCanvas(600, 400);
  //Inicio a trilha de fundo e deixo em looping
  trilha.loop();
}

//Todas as functions são chamadas de dentro do draw
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  bolinhaNaoFicaPresa();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  defineDificuldade();
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  //mostraDificuldade();
}

//Faço o desenho da bolinha apartir da coordenada x e y
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

//Adiciono um valor a x e y repetidamente para que a impressão de movimento seja dada à bolinha, quanto maior o valor a ser adicionado mais rápido será a impressão do deslocamento
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

//Mudo a direção da bolinha caso atinja a borda multiplicando por -1 em x quando nas laterais e y quando em cima e embaixo
function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

//Para a bolinha não rebater por traz da raquete
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    XBolinha = 23
    }
}

//Desenha raquete na posição x e y pela largura e comprimento
function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

//Movimenta pela detecção da tecla pressionada e modificando a posição y da raquete
function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

//Para colisao da raquete, verifico se a bolinha está tocando a raquete quanto a proximidade x e perfil em y da raquete
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

//Verifica a colisão usando a biblioteca - não esquecer de declarar a biblioteca na index.html
function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,
 xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//Movimenta a raquete baseada na posição da bolinha mas gerando uma defasagem através da variável nível de dificuldade
function movimentaRaqueteOponente(){
//  movimentacaoYOponente = yBolinha -yRaqueteOponente - //raqueteComprimento / 2 - 30;
  movimentacaoYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - dificuldadeOponente;
  
  yRaqueteOponente += movimentacaoYOponente
}

//Defino a dificuldade modificando a variavel randomicamente a cada 5 segundos
function defineDificuldade(){
  tempo2 = tempoCorrente();
  difTempo12 = tempo2 - tempo1;
  if (difTempo12 > 5){
    alteraDif = true;
  }
  if (alteraDif){ 
    dificuldadeOponente = round(random(100));
    alteraDif = false;
    tempo1 = tempoCorrente();
  }
}

//Registro a hora, minuto e segundo atual no formato hhmmss
function tempoCorrente(){
  hora = hour()*10000;
  minuto = minute()*100;
  segundo = second();
  return hora+minuto+segundo;  
}

//Somente para teste do programa
function mostraDificuldade(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  text(dificuldadeOponente, 230, 26);
  text(tempo1, 100, 26);
  text(tempo2, 330, 26);
}

//Desenho os retangulos e insiro as variaveis de pontos
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

//Finalmente registra os pontos se a posicao da bolinha for menor que o limite da largura 
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
    xBolinha = 300;
    yBolinha = 200;
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
    xBolinha = 300;
    yBolinha = 200;
  }
}