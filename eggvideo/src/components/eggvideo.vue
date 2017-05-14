<style lang="sass">
    .video-container {
        position: relative;
        background: rgba(0, 0, 0, .2);
        overflow: hidden;
        #contrl-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 200px;
            z-index: 10000000000;
            img {
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
        #egg-video:-webkit-full-screen {
            background-color: transparent;
            position: relative;
            left: 0px;
            top: 0px;
            min-width: 0px;
            max-width: none;
            min-height: 0px;
            max-height: none;
            width: 100%;
            height: 100%;
            display: block;
            transform: none;
            margin: 0px !important;
            flex: 1 1 0% !important;
        }
        ::-webkit-media-controls {
            display: none !important;
        }
        video::-webkit-media-controls {
            display: none !important;
        }
        video::-webkit-media-controls-enclosure {
            display: none !important;
        }
        #bottom-contrl {
            height: 40px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 10000000000;
            .contrl-progress-line-outer {
                position: relative;
                top: -10px;
                height: 16px;
                width: 100%;
                -webkit-transition: all .2s ease-in;
                transition: all .2s ease-in;
                .contrl-video-time {
                    position: absolute;
                    height: 26px;
                    width: 50px;
                    background: #000;
                    border: 1px solid #555;
                    text-align: center;
                    line-height: 26px;
                    font-size: 14px;
                    color: #fff;
                    bottom: 16px;
                }
                .contrl-video-circle {
                    position: absolute;
                    height: 16px;
                    width: 16px;
                    /*background: url(../../inc/assets/ic_video_preview_knob.png) no-repeat center center;
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
                    .contrl-video-pre-rail {
                        height: 4px;
                        background: #FFE100;
                    }
                    .contrl-video-download-rail {
                        height: 4px;
                        background: #777;
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
                .contrl-full {
                    height: 24px;
                    width: 24px;
                    opacity: .5;
                    margin-left: 40px;
                    margin-top: 2px;
                    cursor: pointer;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                    &:hover {
                        opacity: 1;
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
                    cursor: pointer;
                    img {
                        display: block;
                        height: 100%;
                        width: 100%;
                    }
                }
            }
        }
    }

    .bottom-fade-enter-active {
        transition: all .5s linear;
    }

    .bottom-fade-leave-active {
        transition: all .5s linear;
    }

    .bottom-fade-enter,
    .bottom-fade-leave-active {
        transform: translateY(20px);
        opacity: 0;
    }
</style>
<template>
    <div class="container">
        <div class="video-container" :style="{height:parameter.height+'px' , width:parameter.width+'px'}" @mouseenter="mouseEnterVideo" @mouseleave="mouseLeaveVideo">
            <video id="egg-video" :poster="options.poster">
                <source v-for="source in sources" :src="source.src" :type="source.type">
                </source>
            </video>
            <div id="contrl-background" @click="play">
                <img v-show="!state.playing" src="../../inc/assets/bg-play.png" alt="" />
                <img v-show="state.waiting" src="../../inc/assets/loading.gif" alt="" />
            </div>
            <transition name="bottom-fade">
                <div id="bottom-contrl" v-show="state.showContrl">
                    <!-- 进度条 -->
                    <div class="contrl-progress-line-outer" @click="videoSlider">
                        <div class="contrl-video-rail">
                            <div class="contrl-video-pre-rail" :style="{width:video.contrlLeft+'px'}"></div>
                            <div class="contrl-video-download-rail" :style="{width:video.loaded+'px'}"></div>
                        </div>
                        <div class="contrl-video-time" :style="{ 'transform': `translate3d(${video.contrlTimeLeft}px, 0, 0)`}">{{state.currentTime}}</div>
                        <div class="contrl-video-circle" @mousedown="videoMove" :style="{ 'transform': `translate3d(${video.contrlLeft}px, 0, 0)`}"></div>
                    </div>
                    <div class="contrl-menu">
                        <!-- 播放按钮 -->
                        <div class="contrl-play-btn f-l" @click="play">
                            <img src="../../inc/assets/contrl_stop_p.png" alt="播放" v-show="state.playing" />
                            <img src="../../inc/assets/contrl_play_p.png" alt="暂停" v-show="!state.playing" />
                        </div>
                        <!-- 播放时间 -->
                        <div class="contrl-time f-l">
                            <span class="contrl-current-time">{{state.currentTime}}</span>
                            <span>/</span>
                            <span class="cotrl-duration-time">{{state.durationTime}}</span>
                        </div>
                        <div class="contrl-full f-r" @click="fullVideo">
                            <img src="../../inc/assets/ic_video_fullscreen_shrink_p.png" alt="">
                        </div>
                        <!-- 音量 -->
                        <div class="contrl-vol-outer f-r">
                            <div class="contrl-vol-line"></div>
                            <div class="contrl-vol-pre-line" :style="{width: vol.contrlLeft+'px'}"></div>
                            <div class="contrl-vol-circle" @mousedown="volMove" :style="{ 'transform': `translate3d(${vol.contrlLeft}px, 0, 0)`}"></div>
                        </div>
                        <!-- 音量icon -->
                        <div class="contrl-vol-icon f-r" @click="mutedVol">
                            <img v-if="vol.muted == 1" src="../../inc/assets/voice_low.png" alt="">
                            <img v-if="vol.muted == 2" src="../../inc/assets/voice_high.png" alt="">
                            <img v-if="!vol.muted" src="../../inc/assets/voice_no.png" alt="">
                        </div>
                    </div>
                </div>
            </transition>
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
                        isFullScreen: false

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
                    waiting: false,
                    currentTime: "00:00",
                    durationTime: "00:00",
                    durationStr: null,
                    showContrl: true,
                    isFull: false
                },
                tmp: {
                    contrlHideTimer: null
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
                    },
                    contrlLeft: 0,
                    contrlTimeLeft: 0,
                },
                vol: {
                    moving: false,
                    muted: true,
                    pos: {
                        innerWidth: 0,
                        current: 0,
                        start: 0,
                        width: 0,
                    },
                    contrlLeft: 0
                }
            }
        },
        mounted: function() {
            let that = this;
            that.$nextTick(function() {
                // 保证 this.$el 已经插入文档
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
                self.initAll();
                if (self.options.autoplay) {
                    self.play()
                }
                window.addEventListener('keydown', this.keydown, false);
            })
        },
        beforeDestroy() {
            document.body.removeEventListener('mousemove', this.mouseMoveAction)
            document.body.removeEventListener('mouseup', this.mouseUpAction)
        },
        methods: {
            initAll() {
                this.initVol()
                this.initVideo()
                this.initPlayer()
                const vol = this.options.volume || 0.9
                this.setVol(vol)
            },
            //初始化播放器
            initPlayer() {
                const $player = this.$el.getElementsByClassName('video-container')[0];
                let $videoHeight = document.getElementById("egg-video").clientHeight;
                document.getElementById("contrl-background").style.height = $videoHeight - 50 + "px";
                //播放器距边距离
                this.player.pos = $player.getBoundingClientRect();
                this.player.$player = $player;
            },
            initVideo() {
                let self = this;
                const $videoRail = this.$el.getElementsByClassName('contrl-video-rail')[0]
                const $videoDown = $videoRail.getElementsByClassName('contrl-video-download-rail')[0]
                this.$videoRail = $videoRail;
                this.video.pos.start = $videoRail.getBoundingClientRect().left;
                this.video.pos.innerWidth = self.$video.getBoundingClientRect().width;
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
            play() {
                this.state.playing = !this.state.playing;
                if (this.$video) {
                    if (this.state.playing) {
                        this.$video.play()
                        this.mouseLeaveVideo()
                        this.$video.addEventListener('timeupdate', this.timeline);
                        this.$video.addEventListener('waiting', (e) => {
                            this.state.waiting = true;
                        });
                        this.$video.addEventListener('playing', (e) => {
                            this.state.waiting = false;
                        });
                        this.$video.addEventListener('ended', (e) => {
                            this.state.playing = false
                            this.video.pos.current = 0
                            this.$video.currentTime = 0
                        });
                    } else {
                        this.$video.pause()
                    }
                }
            },
            timeline() {
                const percent = this.$video.currentTime / this.$video.duration;
                const x = this.video.pos.current;
                if (!this.video.moving) {
                    if (x >= 0 && x < this.video.pos.innerWidth - 16) {
                        this.video.pos.current = (this.video.pos.innerWidth * percent).toFixed(3);
                        this.video.contrlLeft = this.video.pos.current
                    } else {
                        // this.video.pos.current = this.video.pos.innerWidth - 16;
                        this.video.pos.current = (this.video.pos.innerWidth * percent).toFixed(3);
                        this.video.contrlLeft = this.video.pos.innerWidth - 16;
                    }
                    this.video.displayTime = timeParse(this.$video.currentTime);

                    if (x < 25) {
                        this.video.contrlTimeLeft = 0;
                    } else if (x > this.video.pos.innerWidth - 25) {
                        this.video.contrlTimeLeft = this.video.pos.innerWidth - 50;
                    } else {
                        this.video.contrlTimeLeft = this.video.pos.current - 16;
                    }
                }

            },
            videoMove(e) {
                this.initVideo()
                this.video.moving = true
            },
            mouseMoveAction(e) {
                if (this.video.moving) {
                    this.videoSlider(e)
                }
            },
            mouseUpAction() {
                this.video.moving = false;
            },
            videoSlider(e) {
                let self = this;
                const x = getMousePosition(e) - this.video.pos.start;
                if (x < 8) {
                    self.video.contrlLeft = 0;
                } else if (x > self.video.pos.innerWidth - 8) {
                    self.video.contrlLeft = self.video.pos.innerWidth - 16;
                } else {
                    self.video.contrlLeft = self.video.pos.current;
                }
                if (x < 25) {
                    self.video.contrlTimeLeft = 0;
                } else if (x > self.video.pos.innerWidth - 25) {
                    self.video.contrlTimeLeft = self.video.pos.innerWidth - 50;
                } else {
                    self.video.contrlTimeLeft = self.video.pos.current - 16;
                }
                if (x > 0 && x < self.video.pos.innerWidth - 8) {
                    self.video.pos.current = x - 8;
                    self.setVideoByTime((x - 8) / self.video.pos.innerWidth)
                } else if (x > this.video.pos.innerWidth - 8) {
                    self.video.pos.current = self.video.pos.innerWidth - 8;
                    self.setVideoByTime((x) / self.video.pos.innerWidth)
                }
            },
            volMove() {
                this.vol.moving = true;
            },
            mouseMoveVol(e) {
                if (this.vol.moving) {
                    this.volSlider(e);
                }
            },
            mouseUpVol() {
                this.vol.moving = false;
            },
            volSlider(e) {
                let self = this;
                if (self.vol.moving) {
                    const x = getMousePosition(e) - this.vol.pos.start;
                    if (x > 0 && x < self.vol.pos.innerWidth) {
                        self.vol.pos.current = x;
                        self.setVol(x / self.vol.pos.innerWidth);
                        self.vol.contrlLeft = self.vol.pos.current - 6;
                    }
                }
            },
            //设置静音
            mutedVol() {
                this.$video.muted = !this.$video.muted
                this.vol.muted = !this.$video.muted
            },
            setVol(val) {
                let self = this;
                if (self.$video) {
                    self.vol.pos.current = val * self.vol.pos.innerWidth;
                    self.vol.contrlLeft = self.vol.pos.current - 6;
                    self.vol.percent = val * 100
                    self.$video.volume = val
                }
                if (self.vol.percent > 50) {
                    self.vol.muted = 2;
                } else if (self.vol.percent > 0) {
                    self.vol.muted = 1;
                } else {
                    self.vol.muted = 0;
                }
            },
            setVideoByTime(percent) {
                this.$video.currentTime = Math.floor(percent * this.state.durationStr)
            },
            getTime() {
                let self = this;
                self.$video.addEventListener("durationchange", (e) => {
                    self.state.durationTime = timeParse(self.$video.duration);
                    self.state.durationStr = self.$video.duration;
                })

                self.$video.addEventListener("timeupdate", (e) => {
                        self.state.currentTime = timeParse(self.$video.currentTime);
                    })
                    // 下载事件
                self.$video.addEventListener('timeupdate', (e) => {
                    if (self.$video.buffered.length > 0) {
                        self.video.loaded = (-1 + (self.$video.buffered.end(0) / self.$video.duration)) * 100
                    }

                })
            },
            fullVideo() {
                let that = this;
                that.state.isFull = !that.state.isFull;
                that.$store.dispatch('IS_FULL', that.state.isFull);
                setTimeout(this.initPlayer, 80)
                if (this.state.isFull) {
                    var de = that.$video;
                    this.state.isFull = true
                    de.webkitRequestFullScreen()
                } else {
                    this.state.isFull = false
                    document.webkitCancelFullScreen()
                }

            },
            keydown(event) {
                let that = this;
                switch (event.keyCode) {
                    case 27:
                        this.state.isFull = false;
                        that.$store.dispatch('IS_FULL', that.state.isFull);
                        document.webkitCancelFullScreen();
                        setTimeout(this.initPlayer, 80)
                        break;
                    case 32:
                        that.play();
                        break;
                    default:

                }

            },
            //鼠标移入video
            mouseEnterVideo: function() {
                let self = this;
                if (self.tmp.contrlHideTimer) {
                    clearTimeout(self.tmp.contrlHideTimer)
                    self.tmp.contrlHideTimer = null
                }
                self.state.showContrl = true;
                self.tmp.contrlHideTimer = setTimeout(() => {
                    self.state.showContrl = false;
                }, 3000)
            },
            // //鼠标移出video
            mouseLeaveVideo: function() {
                let self = this;
                self.video.moving = false;
                self.vol.moving = false;
                if (self.tmp.contrlHideTimer) {
                    clearTimeout(self.tmp.contrlHideTimer);
                }
                self.tmp.contrlHideTimer = setTimeout(() => {
                    self.state.showContrl = false;
                }, 2000)
            }
        }
    }
</script>
