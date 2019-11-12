<style lang="scss" scoped>

  .wheel__greeting {
    display: block;
    min-height: 400px;
    text-align: center;
    margin-top: 54px;
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

  #arrow {
    cursor: pointer;
  }

</style>

<template>
  <div class="wheel">
    <div class="wheel__greeting">
      <h3>Torres Family wishes you</h3>
      <h2 id="info"></h2>
    </div>

    <div class="wheel__container">
      <svg class="wheel__device" id="wheel" width="458" height="458" version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
        <image xlink:href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/wheel-1.png" x="0" y="0" height="458px" width="458px"/>
      </svg>

      <svg class="wheel__arrow" id="arrow" width="122" height="77" version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
        <image xlink:href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/pin-1.png" x="0" y="0" height="77px" width="122px"/>
      </svg>
    </div>
  </div>
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
        'Merry Christmas',
        'Happy Holidays',
        'Yule Time Cheer',
        'All the best',
        'Best wishes',
        'Warmest wishes',
        'Christmas Greetings',
        'Cheers to the New Year'
      ];
      
      arrow.on('click', () => {

        var random = Math.floor(Math.random() * 800) + 600;
        var tl = new TimelineMax();
        tl 
          .to(wheel, 7, { rotation: "+=" + random, ease: Back.easeOut.config(1) })

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
            // TweenMax.to(info, 0.6, {
            //   opacity: 1,
            // })
          } 
        })

      })
      
      TweenMax.ticker.addEventListener("tick", update);
      
      function update() {
        
        var rotation = wheel[0]._gsTransform.rotation;     
        var angle = rotation - 360 * Math.floor(rotation / 360);     
        var index = Math.floor((360 - angle) / arc) % greetings.length;    
        var greeting = greetings[index];
        
        info.html(greeting);
      }
    },
  }
</script>
