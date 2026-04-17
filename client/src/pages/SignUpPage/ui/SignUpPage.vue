<script setup lang="ts">
import { ref } from 'vue'
import cls from './SignUpPage.module.scss'
import { sessionStore } from '@/entities/auth'
import { useRegisterMutation } from '@/entities/auth'
import { AppRouters } from '@/shared/config/router'
import { router } from '@/shared/config/router/router'

import classNames from 'classnames'

const session_store = sessionStore()

const username = ref('')
const email = ref('')
const password = ref('')

const { mutate, isPending } = useRegisterMutation()

const handleRegister = () => {
  mutate({
    username: username.value,
    password: password.value,
    email: email.value,
  })
}

const goToLogin = () => router.push({ name: AppRouters.SIGN_IN })
</script>

<template>
  <div :class="cls.auth_page">
    <div :class="cls.card">
      <h2 :class="cls.title">Sign Up</h2>
      <input
        id="signup-username"
        name="username"
        autocomplete="username"
        :class="cls.input"
        v-model="username"
        placeholder="Username"
      />
      <input
        id="signup-email"
        name="email"
        type="email"
        autocomplete="email"
        :class="cls.input"
        v-model="email"
        placeholder="Email"
      />
      <input
        id="signup-password"
        name="password"
        type="password"
        autocomplete="new-password"
        :class="cls.input"
        v-model="password"
        placeholder="Password"
      />
      <button :class="cls.btn" @click="handleRegister" :disabled="isPending">Sign in</button>
      <p v-if="session_store.error" :class="cls.error">{{ session_store.error }}</p>
      <div :class="cls.divider" />
      <button :class="classNames(cls.secondary_btn, cls.btn)" @click="goToLogin">
        Already have an account ? Sign In
      </button>
    </div>
  </div>
</template>
