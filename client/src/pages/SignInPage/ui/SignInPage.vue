<script setup lang="ts">
import { ref } from 'vue'
import classNames from 'classnames'
import cls from "./SignInPage.module.scss"
import { sessionStore } from '@/entities/auth'

import { useLoginMutation } from '@/entities/auth'
import { AppRouters, router } from '@/shared/config/router'

const session_store = sessionStore()

const username = ref('')
const password = ref('')

const { mutate, isPending } = useLoginMutation()

const handleLogin = () => mutate({ username: username.value, password: password.value })

const goToRegister = () => router.push({ name: AppRouters.SIGN_UP })
</script>

<template>
  <div :class="cls.signin_page">
    <div :class="cls.card">
      <h1 :class="cls.title">Sign In</h1>
      <input :class="cls.input" v-model="username" placeholder="Username" />
      <input :class="cls.input" v-model="password" type="password" placeholder="Password" />
      <button :class="cls.btn" @click="handleLogin" :disabled="isPending">Login</button>
      <p v-if="session_store.error" :class="cls.error">{{ session_store.error }}</p>
      <div :class="cls.divider" />
      <button :class="classNames(cls.signup_btn, cls.btn)" @click="goToRegister">Sign Up</button>
    </div>
  </div>
</template>
