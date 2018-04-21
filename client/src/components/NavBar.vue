<template>
	<div class="head-nav">
      <div class="logo-drop">
        <menu-icon style="margin-right: 20px;" class="custom-class"></menu-icon>
        <a>Messanger</a>
      </div>
      <div style="color: white;">
        <user-icon style="color: white;" class="custom-class"></user-icon>
      </div>
    </div>
</template>

<script>
import { MenuIcon, MoreVerticalIcon, SendIcon, UserIcon } from 'vue-feather-icons'
import { mapState, mapMutations } from 'vuex'

export default {
	data: () => ({

	}),
	computed: {
		
	},
	methods: {
	
	},
	components: { MenuIcon, MoreVerticalIcon, SendIcon, UserIcon }
}
</script>

<style scoped>
.head-nav {
  max-width: 1210px;
  margin: 0 auto;
  padding: 15px 20px;
  background: #28baf0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-drop {
  color: white;
}
.logo-drop a {
  font-size: 18px;
  font-weight: 600;
}
</style>