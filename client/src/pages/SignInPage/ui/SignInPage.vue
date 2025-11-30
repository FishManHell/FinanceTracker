<script setup lang="ts">
import { ref } from 'vue'
import classNames from 'classnames'
import cls from "./SignInPage.module.scss"
import { useAuthStore } from '@/stores/useAuthStore/useAuthStore.ts'
import { useLoginMutation } from '@/entities/auth'
import { AppRouters, router } from '@/shared/config/router'

const authStore = useAuthStore()

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

      <p v-if="authStore.error" :class="cls.error">{{ authStore.error }}</p>

      <div :class="cls.divider" />

      <button :class="classNames(cls.signup_btn, cls.btn)" @click="goToRegister">Sign Up</button>
    </div>
  </div>
</template>
