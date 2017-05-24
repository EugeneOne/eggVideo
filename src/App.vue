<template>
    <div id="app">
        <h1>{{ msg }}</h1>
        <div class="container">
          <egg-video :parameter="eggvideo.parameter" :sources="eggvideo.sources" :options="eggvideo.options"></egg-video>
      </div>
    </div>
</template>

<script>
    import eggVideo from './components/eggvideo.vue'
    export default {
        name: 'app',
        data() {
            return {
                msg: "eggVideo",
                eggvideo: {
                    parameter: {
                        height: "300",
                        width: "500"
                    },
                    sources: [{
                        src: '../source/布莱克书店.花絮.Black.Books.S03.Extras.CN.DVDrip.720X400-YYeTs人人影视.mp4',
                        type: 'video/mp4'
                    }],
                    options: {
                        autoplay: true,
                        volume: "0.6",
                        poster: '',
                        isFullScreen: true
                    }
                }
            }
        },
        components: {
            eggVideo
        }
    }
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }

    egg-video {
        margin: 0 auto;
    }

    .f-l {
        float: left;
    }

    .f-r {
        float: right;
    }

    #myvideo {
        height: 539px;
        width: 960px;
    }
</style>
