/* Variables que utiliza Ccapture.js*/
let frameLength = 120
let canvas
let running = false

/* Variables que utiliza el conversor de notas*/
let nota
let letra
let aprobado = [0, 128, 0]
let medio = [255, 235, 59]
let reprobado = [255, 0, 0]
let alto = 50
let tipo = 50
let velo = 10
let altoStar = 270
let anchoStar = 250

function setup() {

  /*Setup para Ccapture.js*/
  frameRate(60)
  let canvasP5=createCanvas(600, 450)
  canvas = canvasP5.canvas

  /*Setup para conversor de notas*/

  background(255)
  fill(255)
  stroke(0)
  rect(0, 0, width, height)
  // random de nota cada vez que recarga
  nota = random(10.1)
  // equivalencias de notas
  if (nota >= 9.5) {
    letra = 'A'
  } else if (nota >= 8.5) {
    letra = 'A-'
  } else if (nota >= 7.5) {
    letra = 'B+'
  } else if (nota >= 6.5) {
    letra = 'B'
  } else if (nota >= 5.5) {
    letra = 'B-'
  } else if (nota >= 4.5) {
    letra = 'C+'
  } else if (nota >= 4) {
    letra = 'C'
  } else {
    letra = 'D'
  }
  // rectangulo para carga
  rectMode(CENTER)
  rect(width / 2, 320, 202, 20)
}

function draw() {
  /*Codigo necesario para el funcionamiento de Ccapture.js*/
  if (!running) {
    capturer.start();
    running = true;
  }
  
  /*Codigo necesario para el funcionamiento del conversor */

  fill(0)
  noStroke()

  // primer texto
  textStyle(NORMAL)
  textAlign(CENTER)
  textSize(tipo / 3)
  textAlign(width / 2)
  text('Si la nota numérica es', width / 2, alto)

  // texto de la NOTA Alfabética
  textStyle(BOLD)
  textSize(tipo)
  // nf() formatea numeros
  text(nf(nota, 1, 1), width / 2, alto + 50)

  // segundo texto
  textStyle(NORMAL)
  textSize(tipo / 3)
  text('la nota alfabética equivalente es', width / 2, alto + 100)

  // texto de la NOTA numérica
  textStyle(BOLD)
  textSize(tipo)
  text(letra, width / 2, alto + 150)

  // Crea las estrellas según la nota y colorea la barra
  if (nota >= 7.5) {
    fill(aprobado)
    star(anchoStar - 20, altoStar)
    star(anchoStar + 40, altoStar)
    star(anchoStar + 100, altoStar)
  } else if (nota >= 4) {
    fill(medio)
    star(anchoStar, altoStar)
    star(anchoStar + 80, altoStar)
  } else {
    fill(reprobado)
    star(anchoStar + 40, altoStar)
  }

  // animación de la barra
  velo = velo + 5
  rect(width / 2, 320, velo, 18)
  if (velo == 200) {
    velo = velo * -1
  }
  /* Más codigo necesario para el funcionamiento de Ccapture.js*/

  if(frameCount<frameLength){
    capturer.capture(canvas)
  }else if(frameCount === frameLength){
    noLoop()
    capturer.stop()
    capturer.save()
  }
}

function star(x, y) {
  beginShape()
  vertex(x, y)
  vertex(x + 7.5, y - 12.5)
  vertex(x + 15, y)
  vertex(x + 27.5, y)
  vertex(x + 17.5, y + 10)
  vertex(x + 22.5, y + 22.5)
  vertex(x + 7.5, y + 15)
  vertex(x - 7.5, y + 22.5)
  vertex(x - 2.5, y + 10)
  vertex(x - 12.5, y)
  endShape(CLOSE)
}