<stackLayout class="form">
  <label class="h2 text-center m-b-20" text="Registration" />
  
  <label class="label" text="Full Name" />
  <textField
    bind:text={formData.name}
    hint="Enter your full name"
    class="input input-rounded m-b-10"
  />

  <label class="label" text="Email" />
  <textField
    bind:text={formData.email}
    hint="Enter your email"
    keyboardType="email"
    class="input input-rounded m-b-10"
  />

  <label class="label" text="Phone" />
  <textField
    bind:text={formData.phone}
    hint="Enter your phone number"
    keyboardType="phone"
    class="input input-rounded m-b-20"
  />

  <button
    text="Start Chat"
    class="btn btn-primary btn-rounded"
    on:tap={handleSubmit}
  />
</stackLayout>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { UserData } from '../types/userData';

  const dispatch = createEventDispatcher<{ submit: UserData }>();

  let formData: UserData = {
    name: '',
    email: '',
    phone: ''
  };

  function handleSubmit() {
    if (formData.name && formData.email && formData.phone) {
      dispatch('submit', formData);
    }
  }
</script>

<style>
  .form {
    padding: 20;
  }
  .label {
    margin-bottom: 5;
    color: #666;
  }
</style>