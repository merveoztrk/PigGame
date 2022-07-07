"use strict";
//Öğelerin seçilmesi
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");
const imgballoon = document.querySelector(".balloon")

let scores, currentScore, activePlayer, playing;
//Başlangıç koşulları
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  // imgballoon.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  document.querySelector(".balloon").style.display="none";

};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Zarın atılması
btnRoll.addEventListener("click", function () {

  //1. Random zarların üretilmesi
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (playing) {
  //2. Üretilen zarın gösterimi
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  //3. Zarda bir(1) gelip gelmemesinin kontrol edilmesi
  if (dice !== 1) {
    //Şu anki skora zarın değerinin eklenmesi
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

  } else {
    //Sıranın diğer oyuncuya geçmesi
    switchPlayer();
    
  }}
});

btnhold.addEventListener('click', function(){
if (playing) { //playing state variable'dır ve yaygın kullanımdır
 //1. Aktif oyuncunun şu anki puanına ekleme yapma
  scores[activePlayer] += currentScore;
  //score[1] = scores[1] + currentScore 
  document.getElementById(`score--${activePlayer}`).textContent = 
  scores[activePlayer];

//2.Oyuncuların puanının 100den büyük eşit durumunu kontrol etme 
if (scores[activePlayer] >= 100) {
//Oyun biter 
playing = false; //Yeterli puan sağlandığında oynamaya devam edilmeyecek
diceEl.classList.add('hidden'); //Zarları kazanınca yok etmeyi hidden add ile sağlandı
    
      // imgballoon.classList.remove("hidden");
      document.querySelector(`.balloon--${activePlayer}`).style.display="inline-block";

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

       

    } else {

      //Diğer oyuncaya sıra geçer
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
