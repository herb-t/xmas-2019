<style lang="scss">
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  body,
  html {
    height: 100%;
    width: 100%;
  }

  body {
    background: #ececec;
    background-image: url('./assets/xmas2019-bg-main.jpg');
    background-repeat: none;
    background-size: cover;
    background-position: center center;
    box-sizing: border-box;
    color: #202124;
    cursor: auto;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 1em;
    font-style: normal;
    font-weight: 300;
    line-height: 1.444;
    margin: 0;
    overflow-x: hidden;
    padding: 16px;
    position: relative;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  p, h1, h2, h3,
  h4, span, a {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: #cf6059;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  p,
  a,
  span {
    line-height: 1.71429;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: .25px;
  }
  h1,
  h2 {
    font-family: 'Mountains of Christmas',cursive;
    font-size: 56px;
    font-weight: 100;
  }

  h1 {
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 38px;
  }

  h2 {
    font-size: 28px;
    font-weight: 500;
    line-height: 1.25;
  }

  h3 {
    font-family: 'Mountains of Christmas',cursive;
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 28px;
  }

  h4 {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 24px;
  }

  /* 
  red: #ef7561
  green: #58bb97
  dark: #57595b
  offWhite: #ececec
  */
</style>

<template>
  <div id="app">
    <!-- <img src="./assets/xmas2019-bg-main.jpg"> -->
    <xmas_index></xmas_index>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <h1>{{ msg }}</h1> -->
  </div>

</template>

<script>
  import index from './components/index.vue'

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      xmas_index: index,
	  },
  }
</script>
