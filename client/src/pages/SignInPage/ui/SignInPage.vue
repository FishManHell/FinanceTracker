<script setup lang="ts">
import { ref } from 'vue'
import classNames from 'classnames'
import cls from './SignInPage.module.scss'
import { sessionStore } from '@/entities/auth'

import { useLoginMutation } from '@/entities/auth'
import { AppRouters } from '@/shared/config/router'
import { router } from '@/shared/config/router/router'

const session_store = sessionStore()

const username = ref('')
const password = ref('')

const { mutate, isPending } = useLoginMutation()

const handleLogin = () => mutate({ username: username.value, password: password.value })

const goToRegister = () => router.push({ name: AppRouters.SIGN_UP })
</script>

<template>
  <div :class="cls.auth_page">
    <div :class="cls.card">
      <h1 :class="cls.title">Sign In</h1>
      <input
        id="signin-username"
        name="username"
        autocomplete="username"
        :class="cls.input"
        v-model="username"
        placeholder="Username"
      />
      <input
        id="signin-password"
        name="password"
        type="password"
        autocomplete="current-password"
        :class="cls.input"
        v-model="password"
        placeholder="Password"
      />
      <button :class="cls.btn" @click="handleLogin" :disabled="isPending">Login</button>
      <p v-if="session_store.error" :class="cls.error">{{ session_store.error }}</p>
      <div :class="cls.divider" />
      <button :class="classNames(cls.secondary_btn, cls.btn)" @click="goToRegister">Sign Up</button>
    </div>
  </div>
</template>
