<template>
  <div id="my-app">
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
    color: #333;
  }
</style>