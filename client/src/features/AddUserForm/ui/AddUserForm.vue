<script setup lang="ts">
import cls from './AddUserForm.module.scss'
import { Button, InputText, Message, Password, Select } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { Roles } from '@/shared/config/roles'
import { roleOptions, useCreateUser } from '@/entities/administration'
import type { AddUserFormValues, CreateUserPayload } from '../model/types.ts'
import { addUserFormResolver } from '../model/resolver.ts'

const initialValues: AddUserFormValues = {
  username: '',
  email: '',
  password: '',
  role: Roles.USER,
}

const { mutate: onMutateCreateUser, isPending } = useCreateUser()

const onSubmit = (e: FormSubmitEvent) => {
  if (!e.valid) return
  const values = e.values as AddUserFormValues

  const payload: CreateUserPayload = { ...values, avatar: null }

  onMutateCreateUser(payload)
}
</script>

<template>
  <Form
    v-slot="$form"
    :class="cls.add_user_form"
    :initialValues="initialValues"
    @submit="onSubmit"
    :resolver="addUserFormResolver"
  >
    <div :class="cls.add_user_form_field">
      <FormField name="username">
        <InputText name="username" placeholder="Enter username" fluid :disabled="isPending" />
      </FormField>
      <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
        {{ $form.username.error?.message }}
      </Message>
    </div>

    <div :class="cls.add_user_form__field">
      <FormField name="email">
        <InputText
          name="email"
          type="email"
          placeholder="Enter email"
          fluid
          :disabled="isPending"
        />
      </FormField>
      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
        {{ $form.email.error?.message }}
      </Message>
    </div>

    <div :class="cls.add_user_form__field">
      <FormField name="password">
        <Password
          name="password"
          placeholder="Enter password"
          :feedback="false"
          toggleMask
          fluid
          :disabled="isPending"
        />
      </FormField>
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
        {{ $form.password.error?.message }}
      </Message>
    </div>

    <div :class="cls.add_user_form__field">
      <FormField name="role">
        <Select
          name="role"
          :options="roleOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select role"
          fluid
          :disabled="isPending"
        />
      </FormField>
      <Message v-if="$form.role?.invalid" severity="error" size="small" variant="simple">
        {{ $form.role.error?.message }}
      </Message>
    </div>

    <div :class="cls.add_user_form_actions">
      <Button
        type="submit"
        label="Create"
        :loading="isPending"
        :disabled="!$form.valid || isPending"
      />
    </div>
  </Form>
</template>
