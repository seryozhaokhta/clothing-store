<!-- src/components/RegisterForm.vue -->

<template>
    <div class="register-form">
        <h2>{{ $t('register') }}</h2>
        <form @submit.prevent="register">
            <div>
                <label for="email">{{ $t('email') }}</label>
                <input v-model="email" type="email" id="email" required />
            </div>
            <div>
                <label for="password">{{ $t('password') }}</label>
                <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit">{{ $t('register') }}</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = () => {
    localStorage.setItem('user', JSON.stringify({ email: email.value }));
    router.push('/profile');
};
</script>

<style scoped>
.register-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: var(--background-color);
    color: var(--text-color);
}

.register-form label {
    display: block;
    margin-bottom: 5px;
}

.register-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
}

.register-form button {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.register-form button:hover {
    background-color: #555;
}
</style>
