<template>
  <v-app>
    <v-toolbar app color=#7CC1CF>
      <v-toolbar-title class="headline text-uppercase">
        <span>BrainJobs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="#"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
       <v-flex lg12 sm2>
      <v-overflow-btn
            :items="dropdown_font"
            label="Dropdown"
            target="_blank"
          ></v-overflow-btn>
          </v-flex>
    </v-toolbar>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>
