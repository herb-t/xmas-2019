<style lang="scss" scoped>
  .wheel {
    position: relative;
  }

  .overlay {
    opacity: 0;
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
  }

  .wheel__greeting {
    display: block;
    min-height: 400px;
    text-align: center;
    padding-top: 54px;

    h3 {
      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
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

</style>

<template>
  <main class="layout">

    <div class="overlay"></div>

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
        <!-- <svg class="wheel__device" id="wheel" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
          <image xlink:href="../assets/xmas-wheel.png" x="0" y="0" />
        </svg> -->
        <img src="../assets/xmas-wheel.png" class="wheel__device" id="wheel">

        <div class="wheel__arrow" id="arrow">
          <span>SPIN</span>
        </div>

        <!-- <svg class="wheel__arrow" id="arrow" width="122" height="77" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
          <image xlink:href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/pin-1.png" x="0" y="0" height="77px" width="122px"/>
        </svg> -->
      </div>
    </div>
  </main>
</template>

<script>
  import $ from "jquery";
  import {TweenMax, TimelineMax} from 'gsap'
  import Draggable from 'gsap/Draggable'

  export default {
    name: 'wheel',
    data () {
      return {
        label: 'Da wheel'
      }
    },
    mounted: function() {
      var wheel = $('#wheel');
      var arrow = $('#arrow');
      var info = $("#info");
      
      var numItems = 8;
      var arc = 360 / numItems;
      
      TweenMax.set(wheel, { rotation: 360 });

      var greetings = [
        {
          text: 'Merry Christmas',
          image: 'static/images/logo.png'
        },
        {
          text: 'Happy Holidays',
          image: 'static/images/icon-fpo.png'
        },
        {
          text: 'Yule Time Cheer',
          image: 'static/images/logo.png'
        },
        {
          text: 'All the best',
          image: 'static/images/icon-fpo.png'
        },
        {
          text: 'Best wishes',
          image: 'static/images/logo.png'
        },
        {
          text: 'Warmest wishes',
          image: 'static/images/icon-fpo.png'
        },
        {
          text: 'Chistmas Greetings',
          image: 'static/images/logo.png'
        },
        {
          text: 'Cherrs to the New Year',
          image: 'static/images/icon-fpo.png'
        }
      ];

      const introTl = new TimelineMax({paused: true});

      introTl.staggerTo($('.intro-text'), 0.6, {
        y: 0,
        opacity: 1,
        ease: Back.easeOut
      }, 0.075)

      introTl.play();

      // setTimeout(() => {
      //   introTl.reverse();
      // }, 2000)

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
        })


      // TweenMax.staggerTo($('.intro-text'), 0.4, {
      //   y: 0,
      //   opacity: 1,
      //   ease: Back.easeOut
      // }, 0.25)
      
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

        var random = Math.floor(Math.random() * 800) + 600;
        var tl = new TimelineMax();

        tl.to(wheel, 7, { 
          rotation: "+=" + random, 
          ease: Back.easeOut.config(1) 
        })

        TweenMax.to(tl, 3, { 
          onComplete: () => {
            console.log('hide result view now')
            // TweenMax.to(info, 0.6, {
            //   opacity: 0,
            // })
          }
        })

        TweenMax.to(tl, 4, {
          timeScale:0, 
          ease: Power1.easeOut, 
          delay: 3, 
          onComplete: () => {
            console.log('has ended')

            arrow.removeClass('disable-events');
            // arrow.trigger('click');

            TweenMax.to($('.overlay'), 0.6, {
              opacity: 1,
              x: 0,
              ease: Power4.easeOut
            })
          } 
        })

      })
      
      TweenMax.ticker.addEventListener("tick", update);
      
      function update() {
        
        var rotation = wheel[0]._gsTransform.rotation;     
        var angle = rotation - 360 * Math.floor(rotation / 360);     
        var index = Math.floor((360 - angle) / arc) % greetings.length;    
        var greeting = greetings[index].text;
        
        info.html(greeting);
        // $('#icon').attr('src', greetingz[index].image);
      }
    },
  }
</script>
