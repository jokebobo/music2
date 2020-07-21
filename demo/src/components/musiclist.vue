<template>
  <div class="list">
    <ul>
      <li v-for="list in lists" :data-id="list.id" @click="changemusic(list.id)">{{list.title}}</li>
    </ul>
    <div class="close" @click="close">
      关闭
    </div>
  </div>


</template>
<script>
  export default {
    name: "list",
    props: ["musicList"],
    data: function () {
      return {
        lists: []
      }
    },
    mounted() {
      console.log("获取歌曲列表==》》》》", this.musicList)
      this.lists = this.musicList;
    },
    methods: {
      changemusic(msg) {
        //console.log("获取当前歌曲Id==>", msg);
        // 当前歌曲后台传递Id为 msg
        this.$emit("handchange", msg);
      },
      close() {
        console.log("关闭歌曲列表");
        this.$emit("close");
      }
    }
  }
</script>
<style>
  .list {
    position: fixed;
    left: 1%;
    bottom: 1vh;
    background: rgba(255, 255, 255, .9);
    width: 98%;
    z-index: 999;
    border-radius: 1vw;
    line-height: 5vh;
  }

  ul {
    box-sizing: border-box;
    line-height: 5vh;
    padding: 0 15px 15px;
  }

  ul li {
    border-bottom: 1px dashed #ccc;
    list-style: none;
  }

  .close {
    border-top: 1px solid #ccc;
  }
</style>