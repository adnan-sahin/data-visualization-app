<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>
          <data-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import DataView from "./components/DataView";
export default {
  name: "app",
  components: {
    DataView
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
