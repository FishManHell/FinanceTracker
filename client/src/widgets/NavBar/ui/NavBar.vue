<script setup lang="ts">
import cls from './NavBar.module.scss'
import FinanceIcon from '@/shared/assets/icons/finance.svg'
import Menu from 'primevue/menu'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore/useAuthStore.ts'
import { navbarItems } from '../model/navbarItems.ts'
import { AppRouters, RoutePaths } from '@/shared/config/router'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const onLogout = () => {
  authStore.logout()
  router.push(RoutePaths[AppRouters.SIGN_IN])
}

const filteredItems = computed(() => {
  return navbarItems.filter((item) => {
    if (item.separator) return true
    if (!item.roles || item.roles.length === 0) return true
    return authStore.user && item.roles.includes(authStore.user.role)
  })
});

</script>

<template>
  <Menu :model="filteredItems" :class="cls.navbar">
    <template #start>
      <div :class="cls.navbar_header">
        <FinanceIcon />
        <div :class="cls.navbar_header_text">
          <span>Finance</span>
          <span>Tracker</span>
        </div>
      </div>
    </template>
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>

      <a
        v-else
        v-ripple
        v-bind="props.action"
        @click="item.label === 'Logout' ? onLogout() : null"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <div :class="cls.navbar_header_footer">
        <router-link :class="cls.avatar_wrapper" :to="RoutePaths[AppRouters.PROFILE]">
          <img v-if="authStore?.user && authStore?.user.avatar" :src="authStore?.user.avatar" alt="avatar"/>
          <i v-else class="pi pi-user" style="font-size: 2.5rem"/>
        </router-link>
      </div>
    </template>
  </Menu>
</template>
