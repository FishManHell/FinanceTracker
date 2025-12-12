<script setup lang="ts">
import cls from './NavBar.module.scss'
import FinanceIcon from '@/shared/assets/icons/finance.svg'
import { Menu } from 'primevue'
import { computed } from 'vue'
import { sessionStore } from '@/entities/auth'
import { userStore } from "@/entities/user"
import { navbarItems } from '../model/navbarItems.ts'
import { AppRouters, RoutePaths } from '@/shared/config/router'
import { useRouter } from 'vue-router'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { UserAvatar } from '@/shared/ui/UserAvatar'

const user_store = userStore();
const session_store = sessionStore();
const router = useRouter();

const onLogout = () => {
  user_store.clearUser()
  session_store.logout()
  router.push(RoutePaths[AppRouters.SIGN_IN])
}

const filteredItems = computed(() => {
  return navbarItems.filter((item) => {
    if (item.separator) return true
    if (!item.roles || item.roles.length === 0) return true
    return user_store.user && item.roles.includes(user_store.user.role)
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
      <div :class="cls.navbar_footer">
        <div :class="cls.avatar_wrapper">
          <router-link :class="cls.avatar_link" :to="RoutePaths[AppRouters.PROFILE]">
            <UserAvatar :image="user_store.user?.avatar"/>
          </router-link>
          <div :class="cls.user_meta">
            <span>{{user_store.user?.username}}</span>
            <span>{{user_store.user?.role}}</span>
          </div>
        </div>
        <ThemeSwitcher/>
      </div>
    </template>
  </Menu>
</template>
