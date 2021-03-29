<template>
    <header class="main-header">
        <h1 @click="getStyleElement">TODO</h1>
    </header>
</template>
<script>
export default {
  methods: {
    getStyleElement () {
      console.log('----' + this.$style.mainHeader)
    }
  }
}
</script>
<style>
.main-header{
    text-align: center;
}
.main-header h1{
    font-size: 100px;
    color: rgb(66, 66, 66,0.4);
    font-weight: 100;
    margin: 20px;
}
</style>
