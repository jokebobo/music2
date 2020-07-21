<template>
  <div>
    <component :is="comname"></component>
  </div>
</template>
<script>
  import load from '../components/load'
  import detail from '../components/detail'
  export default {
    data: function () {
      return {
        comname: load
      }
    },
    created() {
      window.onload = () => {
        setTimeout(() => {
          this.comname = detail;
        }, 500)
      }
    }
  }
</script>