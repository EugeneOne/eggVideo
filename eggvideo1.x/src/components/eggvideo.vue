<style lang="sass">
    .video-container {
        position: relative;
        background: rgba(0, 0, 0, .2);
        #contrl-background{
            position: absolute;
            top: 0;
            width: 100%;
            height: 200px;
            img{
                display: block;
                height: 60px;
                width: 60px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -15px;
                margin-left: -15px;
                cursor: pointer;
            }
        }
        #egg-video {
            height: 100%;
            width: 100%;
            vertical-align: bottom;
        }
        #bottom-contrl {
            height: 40px;
            width: 100%;
            position: absolute;
            bottom: 0;
            background: rgba(0, 0, 0, .5);
            .contrl-progress-line-outer {
                position: relative;
                top: -10px;
                height: 16px;
                width: 100%;
                overflow: hidden;
                -webkit-transition: all .2s ease-in;
                transition: all .2s ease-in;
                .contrl-video-circle {
                    position: absolute;
                    height: 16px;
                    width: 16px;
                    /*background: url(../img/ic_video_preview_knob.png) no-repeat center center;
                    background-size: cover;*/
                    background: #fff;
                    border-radius: 100%;
                    cursor: pointer;
                }
                .contrl-video-rail {
                    width: 100%;
                    height: 4px;
                    background: #555;
                    position: absolute;
                    top: 50%;
                    margin-top: -2px;
                    .contrl-video-pre-rail{
                        height: 4px;
                        background: #FFE100;
                    }
                }
            }
            .contrl-menu {
                width: 100%;
                height: 33px;
                position: absolute;
                bottom: 0;
                padding: 0 20px;
                box-sizing: border-box;
                .contrl-play-btn {
                    width: 13px;
                    height: 16px;
                    margin-top: 5px;
                    margin-right: 33px;
                    opacity: 0.5;
                    cursor: pointer;
                    &:hover {
                        opacity: 1;
                    }
                    img {
                        display: block;
                        width: 13px;
                        height: 16px;
                    }
                }
                .contrl-time {
                    margin-top: 6px;
                    height: 14px;
                    line-height: 14px;
                    span {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #FFFFFF;
                    }
                    .cotrl-duration-time {
                        /*color: rgba(0, 0, 0, .5)*/
                    }
                }
                .contrl-vol-outer {
                    height: 12px;
                    min-width: 72px;
                    margin-top: 7px;
                    position: relative;
                    margin-left: 10px;
                    .contrl-vol-line {
                        width: 72px;
                        height: 2px;
                        position: absolute;
                        top: 50%;
                        margin-top: -1px;
                        background: #979797;
                    }
                    .contrl-vol-pre-line {
                        height: 2px;
                        position: absolute;
                        top: 50%;
                        margin-top: -1px;
                        background: #FFE100;
                    }
                    .contrl-vol-circle {
                        position: absolute;
                        width: 12px;
                        height: 12px;
                        border-radius: 100%;
                        background: #fff;
                        cursor: pointer;
                    }
                }
                .contrl-vol-icon {
                    height: 16px;
                    width: 16px;
                    margin-top: 4px;
                    img {
                        display: block;
                        height: 100%;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="container">
        <div class="video-container" :style="{height:parameter.height+'px' , width:parameter.width+'px'}" @mouseenter="mouseEnterVideo" @mouseleave="mouseLeaveVideo">
            <div id="contrl-background" @click="play">
                <img v-show="!state.playing" src="../img/bg-play.png" alt="" />
            </div>
            <video id="egg-video" :poster="options.poster">
                <source v-for="source in sources" :src="source.src" :type="source.type">
                </source>
            </video>
            <div id="bottom-contrl" v-show="state.showContrl">
                <!-- 进度条 -->
                <div class="contrl-progress-line-outer">
                    <div class="contrl-video-rail">
                        <div class="contrl-video-pre-rail" :style="{width:video.pos.current+'px'}"></div>
                        <div class="contrl-video-download-rail"></div>
                    </div>
                    <div class="contrl-video-circle" @click="videoSlider" @mousedown="videoMove" :style="{ 'transform': `translate3d(${video.pos.current}px, 0, 0)`}"></div>
                </div>
                <div class="contrl-menu">
                    <!-- 播放按钮 -->
                    <div class="contrl-play-btn f-l" @click="play">
                        <img src="../img/contrl_stop_p.png" alt="播放" v-show="state.playing" />
                        <img src="../img/contrl_play_p.png" alt="暂停" v-show="!state.playing" />
                    </div>
                    <!-- 播放时间 -->
                    <div class="contrl-time f-l">
                        <span class="contrl-current-time">{{state.currentTime}}</span>
                        <span>/</span>
                        <span class="cotrl-duration-time">{{state.durationTime}}</span>
                    </div>
                    <!-- 音量 -->
                    <div class="contrl-vol-outer f-r">
                        <div class="contrl-vol-line"></div>
                        <div class="contrl-vol-pre-line" :style="{width: vol.pos.current+'px'}"></div>
                        <div class="contrl-vol-circle" @click="clickVol" @mousedown="volMove" :style="{ 'transform': `translate3d(${vol.pos.current}px, 0, 0)`}"></div>
                    </div>
                    <!-- 音量icon -->
                    <div class="contrl-vol-icon f-r">
                        <img src="../img/voice_low.png" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>
<script>
    const getMousePosition = function(e, type = 'x') {
        if (type === 'x') {
            return e.pageX
        }
        return e.pageY
    }
    const pad = (val) => {
        val = Math.floor(val)
        if (val < 10) {
            return '0' + val
        }
        return val + ''
    }
    const timeParse = (sec) => {
        let min = 0
        min = Math.floor(sec / 60)
        sec = sec - min * 60
        return pad(min) + ':' + pad(sec)
    }
    export default {
        props: {
            parameter: {
                type: Object,
                default () {
                    return {
                        height: 348,
                        width: 620
                    }
                }
            },
            sources: Array,
            options: {
                type: Object,
                default () {
                    return {
                        autoplay: true,
                        volume: 0.9,
                        poster: '',
                        displayTime: "00:00",

                    }
                }
            }
        },
        data() {
            return {
                $video: null,
                $videoRail: null,
                $volRail: null,
                state: {
                    playing: false,
                    currentTime: "00:00",
                    durationTime: "00:00",
                    durationStr: null,
                    showContrl: true,
                },
                tmp: {
                    contrlHideTimer:null
                },
                player: {
                    $player: null,
                    pos: null
                },
                video: {
                    loaded: 0,
                    moving: false,
                    pos: {
                        start: 0,
                        width: 0,
                        innerWidth: 0,
                        current: 0
                    }
                },
                vol: {
                    moving: false,
                    pos: {
                        innerWidth: 0,
                        current: 0,
                        start: 0,
                        width: 0,
                    }
                }
            }
        },
        ready() {
            let self = this;
            let $video = document.getElementById('egg-video');
            let $videoHeight = document.body.getElementsByClassName("video-container")[0].clientHeight;
            this.$video = $video;
            document.body.addEventListener('mousemove', this.mouseMoveAction, false);
            document.body.addEventListener('mouseup', this.mouseUpAction, false);
            // 音量
            document.body.getElementsByClassName("contrl-vol-outer")[0].addEventListener('mousemove', this.mouseMoveVol, false);
            document.body.getElementsByClassName("contrl-vol-outer")[0].addEventListener('mouseup', this.mouseUpVol, false);
            document.getElementById("contrl-background").style.height = $videoHeight - 50 + "px";
            self.init();
            if(self.options.autoplay){
                self.play()
            }
        },
        beforeDestroy() {
            document.body.removeEventListener('mousemove', this.mouseMoveAction)
            document.body.removeEventListener('mouseup', this.mouseUpAction)
        },
        methods: {
            init () {
                this.initVol()
                this.initVideo()
                this.initPlayer()
                // const vol = this.options.volume || 0.9
                // this.setVol(vol)
            },
            //初始化播放器
            initPlayer () {
                const $player = this.$el.getElementsByClassName('video-container')[0];
                //播放器距边距离
                this.player.pos = $player.getBoundingClientRect();
                this.player.$player = $player;
            },
            initVideo (){
                let self = this;
                const $videoRail = this.$el.getElementsByClassName('contrl-video-rail')[0]
                const $videoDown = $videoRail.getElementsByClassName('contrl-video-download-rail')[0]
                this.$videoRail = $videoRail;
                this.video.pos.start = $videoRail.getBoundingClientRect().left;
                this.video.pos.innerWidth = $videoDown.getBoundingClientRect().width;
                this.video.pos.width = $videoRail.getBoundingClientRect().width - this.video.pos.innerWidth;
                self.getTime();
            },
            initVol() {
                let self = this;
                const $volRail = this.$el.getElementsByClassName('contrl-vol-line')[0];
                this.$volRail = $volRail;
                this.vol.pos.start = $volRail.getBoundingClientRect().left;
                this.vol.pos.innerWidth = $volRail.getBoundingClientRect().width;
                this.vol.pos.width = $volRail.getBoundingClientRect().width - this.vol.pos.innerWidth;
            },
            play () {
                this.state.playing = !this.state.playing;
                if (this.$video) {
                    if (this.state.playing) {
                        this.$video.play()
                        this.mouseLeaveVideo()
                        this.$video.addEventListener('timeupdate', this.timeline)
                        this.$video.addEventListener('ended', (e) => {
                            this.state.playing = false
                            this.video.pos.current = 0
                            this.$video.currentTime = 0
                        })
                    } else {
                        this.$video.pause()
                    }
                }
            },
            timeline () {
                const percent = this.$video.currentTime / this.$video.duration;
                const x = getMousePosition() - this.video.pos.start;
                if(x > 0 && x < this.video.pos.innerWidth - 8) {
                    this.video.pos.current = (this.video.pos.innerWidth * percent).toFixed(3)
                } else {
                    self.video.pos.current = self.video.pos.innerWidth - 8;
                }
                this.video.displayTime = timeParse(this.$video.currentTime)
            },
            mouseMoveAction(e) {
                if (this.video.moving) {
                    this.videoSlider(e)
                }
            },
            mouseUpAction(){
                this.video.moving = false;
            },
            mouseMoveVol(e){
                this.volSlider(e)
            },
            mouseUpVol(){
                this.vol.moving = false;
            },
            videoSlider(e) {
                let self = this;
                const x = getMousePosition(e) - this.video.pos.start;
                if (x > 0 && x < this.video.pos.innerWidth - 8) {
                    self.video.pos.current = x - 8;
                    self.setVideoByTime((x - 8) / self.video.pos.innerWidth)
                } else if(x > this.video.pos.innerWidth - 8){
                    self.video.pos.current = self.video.pos.innerWidth - 8;
                    self.setVideoByTime((x) / self.video.pos.innerWidth)
                }
            },
            clickVol() {
                // console.log("click");
                // this.vol.moving = true;
            },
            volMove() {
                this.vol.moving = true;
            },
            volSlider(e) {
                let self = this;
                if(self.vol.moving) {
                    const x = getMousePosition(e) - this.vol.pos.start;
                    if (x > 6 && x < self.vol.pos.innerWidth) {
                        self.vol.pos.current = x - 6;
                        // self.setVol(x / self.vol.pos.innerWidth)
                    }
                }
            },
            setVol(val) {
                let self = this;
                if (self.$video) {
                    self.vol.pos.current = val * self.vol.pos.width
                    self.vol.percent = val * 100
                    self.$video.volume = val
                }
            },
            setVideoByTime (percent) {
                this.$video.currentTime = Math.floor(percent * this.state.durationStr)
            },
            videoMove (e) {
                this.initVideo()
                this.video.moving = true
            },
            getTime (){
                let self = this;
                self.$video.addEventListener("durationchange",(e) => {
                    self.state.durationTime = timeParse(self.$video.duration);
                    self.state.durationStr = self.$video.duration;
                })

                self.$video.addEventListener("timeupdate",(e) => {
                    self.state.currentTime = timeParse(self.$video.currentTime);
                })
                // 下载事件
                self.$video.addEventListener("progress",(e) => {
                })
            },
            //鼠标移入video
            mouseEnterVideo: function() {
                // console.log(111);
                // let self = this;
                // if (self.tmp.contrlHideTimer) {
                //     clearTimeout(self.tmp.contrlHideTimer)
                //     self.tmp.contrlHideTimer = null
                // }
                // self.state.showContrl = true;
            },
            // //鼠标移出video
            mouseLeaveVideo: function() {
                let self = this;
                self.video.moving = false
                // if (self.tmp.contrlHideTimer) {
                //     clearTimeout(self.tmp.contrlHideTimer);
                // }
                // self.tmp.contrlHideTimer = setTimeout(() => {
                //     self.state.showContrl = false;
                // },2000)
            }
        }
    }
</script>
