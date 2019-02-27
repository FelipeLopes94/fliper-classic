'use strict';

let jogador; //Variavel que vai receber o objeto "PLAYER"

let score = 0; //variavel que guardará o valor dos pontos;
// document.getElementById('playerScore').innerHTML = score; //adicinando os pontos ao DOM!

function resetGame(){ //Função para reiniciar os pontos.
    score = 0;
    document.getElementById('playerScore').innerHTML = score;
    
    
}

//Criando o Inimigo...
class Enemy {
    constructor(x,y){
        this.sprite = 'images/enemy-bug.png'
        this.x = x;
        this.y = y;
        this.speed = Math.floor((Math.random() * 100) + 100); //calculo para a velocidade do inimigo ser aleatoria.
    }
    //Atualizando a posição do inimigo.
    update(dt,jogador){
        if (this.x < 505) {
            this.x += (this.speed * dt);
        } 
        else {this.x = -70;}
        
        this.checaColisao(jogador);
        
        
    }
    //Metodo que Checa a colisão entre o Enemy e o Player  
    checaColisao(jogador){
        
        if(this.x < jogador.x + 30 && this.x + 60 > jogador.x && this.y < jogador.y + 60 && this.y + 40 > jogador.y) {
            //Se o inimigo colidir com o Player...
            resetGame(); //resetar os pontos
            jogador.reset(); //resetar a posição do jogador. 
            
        }  
    }
    
    render(){  //Renderizar a imagem do inimigo no local indicado.
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
}
//Criando o Player.
class Player {
    constructor(){
        this.sprite = 'images/char-boy.png'
        this.x = 202
        this.y = 405
    }
    
    reset(){ //Resetar a posição do player;
        this.x = 202;
        this.y = 405;
        
    }
    
    update(dt){ //Atualizar o Player conforme o jogo.
        if(this.y < 20){ //se chegar a Agua, que esta na posição 20 do canvas.
            score++; //adicionar 1 ponto ao placar
            document.getElementById('playerScore').innerHTML = score; //adicionar o ponto ao DOM.
            if(score >=5){  //Se os pontos forem maiores que 5.
                alert('VOCE GANHOU!') //informar que o jogo foi vencido.
                resetGame(); //reiniciar o jogo
            }
            
            this.reset(); //resetar a posição do player.
        }
        
    }
    
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //renderizar a posição do player no local informado.
    }
    
    handleInput(direction){  //metodo para movimentar o personagem.
        if(direction == 'left' && this.x > 0) {
            this.x -= 40;
        }
        if(direction == 'right' && this.x < 400) {
            this.x += 50;
        }
        if(direction == 'up' && this.y > 3) {
            this.y -= 50;
        }
        if(direction == 'down' && this.y < 400) {
            this.y += 50;
        }
    }
    
}
//Instanciando Objetos;

//Player
 jogador = new Player(); //Passando o objeto "PLAYER" para a variavel "JOGADOR"


//Instanciando os Inimigos

//Array de inimigos
let allEnemies = []
//Inimigos sendo adicionados ao array.
allEnemies =  [new Enemy(-70,55),new Enemy(-70,55) ,new Enemy(-70,140),new Enemy(-70,140),new Enemy(-70,220),new Enemy(-70,220)];



// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    jogador.handleInput(allowedKeys[e.keyCode]);
});
