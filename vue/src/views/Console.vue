<template>
  <div class="home">
    <web-console/>
  </div>
</template>

<script>
// @ is an alias to /src
import WebConsole from '@/components/WebConsole.vue'

export default {
  name: 'console',
  components: {
    "web-console": WebConsole
  }
}
</script>
