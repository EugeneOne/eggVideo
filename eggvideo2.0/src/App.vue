<template>
    <div id="app">
        <h1>{{ msg }}</h1>
        <div class="container">
          <my-video id="myvideo" :sources="video.sources" :options="video.options"></my-video>
          <egg-video :parameter="eggvideo.parameter" :sources="eggvideo.sources"></egg-video>
      </div>
    </div>
</template>

<script>
    import myVideo from './components/video.vue'
    import eggVideo from './components/eggvideo.vue'
    export default {
        data() {
                return {
                    // note: changing this line won't causes changes
                    // with hot-reload because the reloaded component
                    // preserves its current state and we are modifying
                    // its initial state.
                    msg: 'Hello Vue!',
                    video: {
                        sources: [{
                            src: '../source/布莱克书店.花絮.Black.Books.S03.Extras.CN.DVDrip.720X400-YYeTs人人影视.mp4',
                            type: 'video/mp4'
                        }],
                        options: {
                            autoplay: true,
                            volume: 0.6,
                            poster: 'http://covteam.u.qiniudn.com/poster.png'
                        }
                    },
                    eggvideo: {
                        // parameter: {
                        //     height: "",
                        //     width: ""
                        // }
                        sources: [{
                            src: '../source/布莱克书店.花絮.Black.Books.S03.Extras.CN.DVDrip.720X400-YYeTs人人影视.mp4',
                            type: 'video/mp4'
                        }],
                        options: {
                            autoplay: true,
                            volume: 0.6,
                            poster: 'http://covteam.u.qiniudn.com/poster.png'
                        }
                    }
                }
            },
            components: {
                myVideo,
                eggVideo
            }
    }
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
    egg-video{
        margin: 0 auto;
    }
    .f-l{
        float: left;
    }
    .f-r{
        float: right;
    }
    #myvideo{
        height: 539px;
        width: 960px;
    }
</style>
