<template>
  <div>歌词部分</div>
</template>
<template>
  <div class='lyric_box'>
    <div class="til">{{title}}</div>
    <div class="lyric">
      <div class="lyric_list" :style="{transform:`translateY(${moveY}px)`}">
        <p v-for='(item,index) in lyricAry' ref='p' :key='index' :class='{active:activeIndex == index}'>{{item[1]}}</p>
      </div>
    </div>

  </div>
</template>
<style lang="less">
  .lyric_box {
    color: #fff;
    position: relative;
    font-size: 17px;
    height: 48vh;
    overflow: hidden;
    text-align: center;

    .til {
      height: 6vh;
      padding-top: 2vh;
    }

    .lyric {
      height: 40vh;
      color: #b3b0b0;
      overflow: hidden;
    }

    .lyric_list {
      transition: all 0.2s;
    }

    p {
      padding: 10px;
    }

    p.active {
      color: #fff;
    }
  }
</style>
<script>
  var p;
  export default {
    name: 'lyric',
    props: ["actmusic", "currentTime"],
    data: function () {
      return {

      }
    },
    methods: {
      strToTime(str) {
        let min = parseInt(str.split(":")[0]);
        let s = parseFloat(str.split(":")[1]);
        return (min * 60 + s);
      }
    },
    computed: {
      lyricAry: function () {
        let lyric = this.actmusic != null ? this.actmusic.lyric : "";
        lyric = lyric.split("\n");
        //console.log("歌词数组", lyric);
        let newlyric = [];
        // 将歌词数组 每个时间和歌词分开
        lyric.map((item, index) => {
          let ind = item.indexOf("]");
          // console.log("===" + ind);
          let newstr = [];
          newstr[0] = item.substring(1, ind);
          newstr[0] = this.strToTime(newstr[0]);
          // console.log(newstr[0]);
          newstr[1] = item.substr(ind + 1);
          newlyric.push(newstr);
          //return newstr;
        })
        console.log("处理过的歌词数组==>", newlyric.length);
        return newlyric;
      },
      title: function () {
        return this.actmusic != null ? this.actmusic.title : ''
      },
      activeIndex: function () {
        let temp = 0;
        let lyricAry = this.lyricAry;
        for (let i = 0; i < lyricAry.length; i++) {
          //console.log(lyricAry[i][0] + "<===>")
          //console.log("===>>>", i);
          if (i < (lyricAry.length - 1)) {
            // console.log("==2222===")
            if (lyricAry[i][0] < this.currentTime && lyricAry[i + 1][0] > this.currentTime) {
              //console.log("=====>", i)
              temp = i;
              //console.log("===>", i);
              break;
            }
          }
          if (i == (lyricAry.length - 1)) {
            console.log("===3333===");
            if (lyricAry[i][0] <= this.currentTime) {
              temp = i;
              //console.log("===>", i);
              break;
            }
          }

        }
        return temp;
        //currentTime获取的是秒
        //console.log("当前时间为==>", this.currentTime);


      },
      moveY: function () {
        console.log("yyyy====>", this.activeIndex)
        // console.log("",)
        if (p) {
          console.log("ccc==>", this.activeIndex * p.offsetHeight);
          return -this.activeIndex * p.offsetHeight;
        } else {
          return 0;
        }

      }
    },
    created() {
      // console.log("当前歌曲为==>", this.actmusic);

    },
    mounted() {
      // console.log("组件挂载到页面上");
      p = this.$refs.p[0];
      //console.log("获取dom元素", p);
    }
  }

</script>