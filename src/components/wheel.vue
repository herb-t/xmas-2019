<style lang="scss" scoped>
  .wheel {
    position: relative;
  }

  .wheel__greeting {
    display: block;
    min-height: 400px;
    text-align: center;
    padding-top: 54px;

    h3 {
      font-family: 'Medula One', 'Open Sans', Arial, Helvetica, sans-serif;
      font-size: 42px;
      letter-spacing: .75;
    }
  }

  .wheel__container {
    position: relative;
  }

  .wheel__device,
  .wheel__arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .wheel__device {
    width: 400px;
    height: 400px;

    @media (min-width: 600px) {
      width: 500px;
      height: 500px;
    }
  }

  .wheel__arrow {
    display: table;
    background-color: #ececec;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    transition: all .3s cubic-bezier(.25,.8,.25,1);

    &:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
  }

  .wheel__arrow span {
    color: #ef7561;
    font-family: 'Mountains of Christmas', 'Open Sans', cursive;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
    display: table-cell;
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  #arrow {
    cursor: pointer;
  }

  .disable-events {
    pointer-events: none;
  }

  #info {
    opacity: 0;
  }

  .intro-text {
    display: inline-block;
    opacity: 0;
    transform: translateY(16px);
  }

  .wheel__greeting--after {
    opacity: 0;
    transform: translateY(16px);
  }

  .overlay {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    padding: 32px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: url('../assets/xmas2019-bg.png')no-repeat center center;
    background-size: cover;
    z-index: 5;

    &__card {
      background: #fff;
      border: 12px solid #58bb97;
      border-radius: 6px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      width: 100%;
      max-width: 600px;
      height: 600px;
      text-align: center;

      opacity: 0;
      transform: translateY(42px);

      &-headline {
        font-family: 'Medula One', 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 32px;
        letter-spacing: .75;
        margin-top: 54px;
      }

      &-greeting {
        margin: 24px 0 36px;
      }
    }
  }

</style>

<template>
  <main class="layout">

    <div class="overlay">
      <div class="overlay__card">
        <div class="overlay__card-header">
          <h3 class="overlay__card-headline"></h3>
          <h2 class="overlay__card-greeting"></h2>
        </div>
        <div class="overlay__card-icon-container">
          <img src="" class="overlay__card-icon" alt="icon">
        </div>
      </div>
    </div>

    <div class="wheel">
      <div class="wheel__greeting">
        <div class="wheel__greeting--initial">
          <h3 class="intro-text">Spin&nbsp;</h3><h3 class="intro-text">the&nbsp;</h3><h3 class="intro-text">wheel&nbsp;</h3><h3 class="intro-text">to&nbsp;</h3><h3 class="intro-text">recieve&nbsp;</h3><h3 class="intro-text">a&nbsp;</h3><h3 class="intro-text">random&nbsp;</h3><h3 class="intro-text">Christmas&nbsp;</h3><h3 class="intro-text">greeting!&nbsp;</h3>
        </div>

        <div class="wheel__greeting--after">
          <h3>Torres Family wishes you</h3>
          <h2 id="info"></h2>
        </div>

      </div>

      <div class="wheel__container">

        <img src="../assets/xmas-wheel.png" class="wheel__device" id="wheel">

        <div class="wheel__arrow" id="arrow">
          <span>SPIN</span>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
  import $ from "jquery";
  import {TweenMax, TimelineMax} from 'gsap'
  import Draggable from 'gsap/Draggable'
  import {greetings} from './data/greetings.js'

  export default {
    name: 'wheel',
    data () {
      return {
        label: 'Da wheel'
      }
    },
    mounted: function() {
      const wheel = $('#wheel');
      const arrow = $('#arrow');
      const info = $("#info");
      
      let numItems = 8;
      let arc = 360 / numItems;

      TweenMax.set(wheel, { rotation: 360 });

      this._introAnim();

      arrow.on('click', () => {

        arrow.attr('data-spinning', 'is-spinning');

        TweenMax.to(info, 0.6, {
          opacity: 1,
          onComplete: () => {
            if ( arrow.attr('data-spinning') == 'is-spinning' ) {
              arrow.addClass('disable-events')
            }
          }
        });

        let random = Math.floor(Math.random() * 800) + 600;
        let spinningTl = new TimelineMax();

        spinningTl.to(wheel, 7, { 
          rotation: "+=" + random, 
          ease: Back.easeOut.config(1) 
        });

        TweenMax.to(spinningTl, 3.25, { 
          onComplete: () => {
            console.log('hide result view now')
            TweenMax.to(info, .5, {
              opacity: 0,
            })
          }
        })

        TweenMax.to(spinningTl, 4, {
          timeScale: 0, 
          ease: Power1.easeOut, 
          onComplete: () => {
            console.log('has ended')

            arrow.removeClass('disable-events');

            this._revealGreetingOverlay();
          } 
        })

      })
      
      TweenMax.ticker.addEventListener('tick', update);
      
      function update() {
        
        let rotation = wheel[0]._gsTransform.rotation;     
        let angle = rotation - 360 * Math.floor(rotation / 360);     
        let index = Math.floor((360 - angle) / arc) % greetings.length;    
        let greeting = greetings[index].text;
        
        info.html(greeting);
        $('.overlay__card-headline').html(greetings[index].heading)
        $('.overlay__card-greeting').html(greeting);
        $('.overlay__card-icon').attr('src', greetings[index].image);
        
      }
    },
    methods: {
      _introAnim: function() {
        const introTl = new TimelineMax({paused: true});

        introTl.staggerTo($('.intro-text'), 0.6, {
          y: 0,
          opacity: 1,
          ease: Back.easeOut
        }, 0.075)

        introTl.play();

        TweenMax.to(introTl, 2, { 
          onComplete: () => {

            introTl.reverse();

            TweenMax.to($('.wheel__greeting--after'), 0.6, {
              y: 0,
              delay: 1.25,
              opacity: 1,
              ease: Power4.easeOut
            })
          }
        });
      },
      _revealGreetingOverlay: function() {
        TweenMax.to($('.overlay'), 0.6, {
          opacity: 1,
          x: 0,
          ease: Power4.easeOut,
          onComplete: () => {
            TweenMax.to($('.overlay__card'), 0.3, {
              opacity: 1,
              y: 0,
              ease: Back.easeOut
            });
          }
        });
      },
    },
  }
</script>
