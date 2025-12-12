<script setup lang="ts">
import { ref } from 'vue'
import cls from "./SignUpPage.module.scss"
import { sessionStore } from '@/entities/auth'
import { useRegisterMutation } from '@/entities/auth'
import { AppRouters, router } from '@/shared/config/router'
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

const goToLogin = () => router.push({ name: AppRouters.SIGN_IN });

</script>

<template>
  <div :class="cls.signup_page">
    <div :class="cls.card">
      <h2 :class="cls.title">Sign Up</h2>
      <input :class="cls.input" v-model="username" placeholder="Username" />
      <input :class="cls.input" v-model="email" placeholder="Email" />
      <input :class="cls.input" v-model="password" type="password" placeholder="Password" />
      <button :class="cls.btn" @click="handleRegister" :disabled="isPending">Sign in</button>
      <p v-if="session_store.error" :class="cls.error">{{ session_store.error }}</p>
      <div :class="cls.divider" />
      <button :class="classNames(cls.back_btn, cls.btn)" @click="goToLogin">Already have an account ? Sign In</button>
    </div>
  </div>
</template>
