<template>
  <div class="home">
    <web-console/>
  </div>
</template>

<script>
// @ is an alias to /src
import WebConsole from '@/components/WebConsole.vue'

export default {
  name: 'Home',
  components: {
    "web-console": WebConsole
  }
}
</script>
