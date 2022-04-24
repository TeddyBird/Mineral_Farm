<template>
    <div class="coupon" v-if="score >= 3">
        <div class="coupon-area">
            <span class="close" @click="resetGame"><i class="fa-solid fa-xmark"></i></span>
            <div class="coupon-img">
                <img src="../../assets/goddess_happy.png" alt="女神高興表情">
            </div>
            <div class="coupon-txt">
                <p>連續答對{{ score }}次太厲害了! 就送你優惠碼吧!</p>
                <p>優惠碼: <strong id="coupon">megami666</strong><button type="button" @click="copyCoupon">複製</button></p>
            </div>
        </div>
    </div>
    <div class="game-section">
        <div class="container">
            <div class="game">
                <img class="game-TV-bg" src="../../assets/TVbg.png" alt="電視背景圖">
                <img class="game-pad-bg" src="../../assets/pad.png" alt="平板背景圖">
                <div class="talk-section">
                    <div class="talk" v-if="gameStatus==='start'" @click="gameStatus='play'">
                        <p>嗨~ 和我一起玩數字猜大小遊戲吧!</p>
                        <p>數字範圍是0~9喔</p>
                        <span>點擊對話框開始遊戲<i class="fa-solid fa-caret-down"></i></span>
                        <div class="megami">
                            <img src="../../assets/goddess_everyday.png" alt="女神一般表情">
                        </div>
                    </div>
                    <template v-if="gameStatus === 'play' || gameStatus === 'continue'">
                        <div class="talk"  v-if = "runDown === 1">
                            <p>現在數字是{{ newNum }}，下個數字會比較...</p>
                            <div class="game-btn">
                                <button type="button" @click = "guessNum('big')">大</button>
                                <button type="button" @click = "guessNum('small')">小</button>
                            </div>
                            <div class="megami">
                                <img src="../../assets/goddess_everyday.png" alt="女神一般表情">
                            </div>
                        </div>
                        <template v-if = "runDown === 2">
                            <div class="talk" v-if ="gameResult ==='right'" @click = "runDown = 1">
                                <p>結果是{{ newNum }}，剛剛是{{ oldNum }}，你選的是{{ choice }}，所以...</p>
                                <p>答對啦!!繼續吧~~</p>
                                <span>點擊對話框繼續遊戲<i class="fa-solid fa-caret-down"></i></span>
                                <div class="megami">
                                    <img src="../../assets/goddess_happy.png" alt="女神高興表情">
                                </div>
                            </div>
                            <div class="talk" v-if ="gameResult ==='wrong'" @click="resetGame">
                                <p>結果是{{ newNum }}，剛剛是{{ oldNum }}，你選的是{{ choice }}，所以...</p>
                                <p>答錯囉，總共連續答對{{ score }}次，要再玩一次嗎?</p>
                                <span>點擊對話框重新遊戲<i class="fa-solid fa-caret-down"></i></span>
                                <div class="megami">
                                    <img src="../../assets/goddess_sad.png" alt="女神失望表情">
                                </div>
                            </div>
                            <div class="talk" v-if ="gameResult ==='nothing'" @click = "runDown = 1">
                                <p>結果是{{ newNum }}，剛剛是{{ oldNum }}，剛好一樣呢，再猜一次吧~</p>
                                <span>點擊對話框繼續遊戲<i class="fa-solid fa-caret-down"></i></span>
                                <div class="megami">
                                    <img src="../../assets/goddess_concerned.png" alt="女神驚訝表情">
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      newNum: '',
      oldNum: '',
      count: 0,
      score: 0,
      gameResult: '',
      gameStatus: 'start',
      choice: '',
      runDown: 1
    }
  },
  methods: {
    ramdemNumber () {
      this.newNum = Math.floor(Math.random() * 10)
    },
    guessNum (anw) {
      this.oldNum = this.newNum
      this.ramdemNumber()
      this.checkAnwser(anw)
      this.runDown = 2
    },
    checkAnwser (anw) {
      if (anw === 'big') {
        this.choice = '大'
        if (this.newNum > this.oldNum) {
          this.gameResult = 'right'
          this.count++
        } else if (this.newNum < this.oldNum) {
          this.gameResult = 'wrong'
          this.score = this.count
        } else {
          this.gameResult = 'nothing'
        }
      } else if (anw === 'small') {
        this.choice = '小'
        if (this.newNum < this.oldNum) {
          this.gameResult = 'right'
          this.count++
        } else if (this.newNum > this.oldNum) {
          this.gameResult = 'wrong'
          this.score = this.count
        } else {
          this.gameResult = 'nothing'
        }
      }
    },
    resetGame () {
      this.ramdemNumber()
      this.gameStatus = 'start'
      this.runDown = 1
      this.score = 0
      this.count = 0
    },
    copyCoupon () {
      const TextRange = document.createRange()
      TextRange.selectNode(document.getElementById('coupon'))
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(TextRange)
      document.execCommand('copy')
    }
  },
  mounted () {
    this.resetGame()
  }
}
</script>

<style lang="scss">
.coupon{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .coupon-area{
        width: 30%;
        background-color: rgb(143, 200, 102);
        border-radius: 10px;
        border: 5px solid white;
        position: relative;
        .close{
            width: 50px;
            height: 50px;
            display: block;
            border-radius: 50%;
            color: white;
            background-color: rgb(16, 17, 17);
            position: absolute;
            top: -15px;
            right: -15px;
            text-align: center;
            font-size: 32px;
            &:hover{
                .fa-xmark{
                    transform: rotate(180deg);
                    transition: transform 1s;
                }
            }
        }
        .coupon-img{
            width: 80%;
            margin: auto;
            img{
                width: 100%;
                vertical-align: middle;
            }
        }
        .coupon-txt{
            padding: 20px;
            text-align: center;
            font-family: 'cwTeXYen', 'Noto Sans TC', sans-serif;
            p{
                font-size: 24px;
                font-weight: 600;
                strong{
                    color: red;
                    margin-right: 10px;
                }
                button{
                    border: none;
                    border-radius: 5px;
                    font-size: 18px;
                }
            }
        }
    }
}
.game-section{
    padding: 30px 0;
    background-image: url(../../assets/bg_pattern_brick.png);
    min-height: calc(100vh - 210px);
    font-family: 'cwTeXYen', 'Noto Sans TC', sans-serif;
    .game{
        position: relative;
        background-image: url(../../assets/Goddess_Introduction.png);
        background-size: cover;
        .game-TV-bg{
            width: 100%;
            object-fit: cover;
        }
        .game-pad-bg{
            width: 100%;
            object-fit: cover;
            display: none;
        }
        .talk-section{
            width: 97.65%;
            height: 40%;
            background-color: #F3E8C5;
            position: absolute;
            z-index: 3;
            bottom: 5.3%;
            left: 50%;
            transform: translateX(-50%);
            .talk{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                text-align: center;
                justify-content: center;
                p{
                    margin-bottom: 0;
                    font-size: 28px;
                    font-weight: 600;
                    padding: 10px 0;
                }
                span{
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    animation: sparkle 1.5s linear infinite;
                    white-space: nowrap;
                    .fa-caret-down{
                        margin-left: 5px;
                    }
                }
                .game-btn{
                    button{
                        border: none;
                        border-radius: 50%;
                        font-size: 28px;
                        font-weight: 600;
                        width: 45px;
                        height: 45px;
                        &:first-child{
                            margin-right: 45px;
                        }
                    }
                }
            }
            &::before{
                content: '';
                position: absolute;
                background-image: url(../../assets/bk_left.png);
                background-size: cover;
                z-index: -1;
                top: 0;
                left: 0;
                width: 13%;
                height: 73%;
            }
            &::after{
                content: '';
                position: absolute;
                background-image: url(../../assets/bk_right.png);
                background-size: cover;
                z-index: -1;
                top: 0;
                right: 0;
                width: 13%;
                height: 73%;
            }
            .megami{
                width: 32%;
                position: absolute;
                top: -130%;
                right: 36%;
                z-index: 2;
                img{
                    width: 100%;
                    vertical-align: middle;
                }
            }
        }
    }
}
@media screen and (max-width:992px) {
    .coupon{
        .coupon-area{
            width: 50%;
            .coupon-img{
                width: 80%;
            }
        }
    }
  .game-section{
      .game{
          .game-TV-bg{
              display: none;
          }
          .game-pad-bg{
              display: block;
          }
          .talk-section{
              width: 89.3%;
              height: 44%;
              bottom: 10.3%;
              .talk{
                  padding: 10px;
                  p{
                      margin-bottom: 0;
                      font-size: 28px;
                      font-weight: 600;
                      padding: 10px 0;
                  }
              }
              &::before{
                  width: 20%;
                  height: 36%;
              }
              &::after{
                  width: 20%;
                  height: 36%;
              }
              .megami{
                  width: 53%;
                  top: -71.5%;
                  right: 26%;
              }
          }
      }
  }
}
@media screen and (max-width:576px) {
    .coupon{
        .coupon-area{
            width: 70%;
            .coupon-img{
                width: 80%;
            }
        }
    }
  .game-section{
      .game{
          .talk-section{
              .talk{
                  p{
                      font-size: 18px;
                  }
                  .game-btn{
                      button{
                          font-size: 24px;
                          width: 40px;
                          height: 40px;
                      }
                  }
              }
          }
      }
  }
}

@keyframes sparkle {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
