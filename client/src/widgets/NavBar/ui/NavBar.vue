<script setup lang="ts">
import cls from './NavBar.module.scss'
import FinanceIcon from '@/shared/assets/icons/finance.svg'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref } from 'vue'
import { AppRouters, RoutePaths } from '@/shared/config/router'
import { Roles, ALL_ROLES, ADMIN_ROLES } from '@/shared/config/roles'
import { useAuthStore } from '@/stores/useAuthStore/useAuthStore.ts'
import { useRouter } from "vue-router"

interface ItemProps extends MenuItem {
  route?: string;
  roles?: Roles[];
}

const authStore = useAuthStore();
const router = useRouter();

const items = ref<ItemProps[]>([
  { separator: true },
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: RoutePaths[AppRouters.DASHBOARD],
    roles: ALL_ROLES,
  },
  {
    label: 'Administration',
    icon: 'pi pi-user',
    route: RoutePaths[AppRouters.ADMINISTRATION],
    roles: ADMIN_ROLES,
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    route: '/',
    roles: ADMIN_ROLES,
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      authStore.logout()
      router.push(RoutePaths[AppRouters.SIGN_IN]);
    }
  },
])

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    if (item.separator) return true
    if (!item.roles || item.roles.length === 0) return true
    return authStore.user && item.roles.includes(authStore.user.role)
  })
})

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
        v-else-if="item.command"
        v-ripple
        v-bind="props.action"
        @click="(e) => item.command?.({ originalEvent: e, item })"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <div :class="cls.navbar_header_footer">
        <span> avatar </span>
        <span>name</span>
      </div>
    </template>
  </Menu>
</template>
