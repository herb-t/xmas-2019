<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
   -->
    <svg id="wheel" width="458" height="458" version="1.1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
      <image xlink:href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/wheel-1.png" x="0" y="0" height="458px" width="458px"/>
    </svg>

    <svg id="arrow" width="122" height="77" version="1.1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
      <image xlink:href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/pin-1.png" x="0" y="0" height="77px" width="122px"/>
    </svg>

    <div id="info"></div>

  </div>

</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function() {
    var wheel = $('#wheel');
   var arrow = $('#arrow');
   var info = $("#info");
   
   var numItems = 8;
   var arc = 360 / numItems;
   
   TweenLite.set(wheel, { rotation: 360 });
   
   var prizes = [
     "Shirt",
     "Free Bucket",
     "Night Out #1",
     "Je Vangt Bot",
     "BioScoop Tickets",
     "Night Out #2",
     "Free Spin",
      "HMH Tickets"
   ];
   
   arrow.on('click', () => {
     
      // var random = Math.floor(Math.random() * 8000) + 6000;
      var random = Math.floor(Math.random() * 800) + 600;
      var tl = new TimelineMax();
      tl 
         .to(wheel, 7, { rotation: "+=" + random, ease: Back.easeOut.config(1) })

      TweenLite.to(tl, 4, { onComplete: () => {
        console.log('fade me out maybe')
      } })

      TweenLite.to(tl, 4, {timeScale:0, ease: Power1.easeOut, delay: 3, onComplete: () => {
        console.log('has ended')
      } })
   })
   
   TweenLite.ticker.addEventListener("tick", update);
   
   function update() {
     
     var rotation = wheel[0]._gsTransform.rotation;     
     var angle = rotation - 360 * Math.floor(rotation / 360);     
     var index = Math.floor((360 - angle) / arc) % prizes.length;    
     var prize = prizes[index];
     
     info.html("Current Prize = " + prize);
   }
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

body {
  overflow: hidden;
}

#wheel,
#arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

#arrow {
  cursor: pointer;
}

#info {
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
  pointer-events: none;
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
}
</style>
