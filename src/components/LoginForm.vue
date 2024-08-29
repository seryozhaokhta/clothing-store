<!-- src/components/LoginForm.vue -->

<template>
    <div class="login-form">
        <h2>{{ $t('login') }}</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">{{ $t('email') }}</label>
                <input v-model="email" type="email" id="email" required />
            </div>
            <div>
                <label for="password">{{ $t('password') }}</label>
                <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit">{{ $t('login') }}</button>
        </form>
        <p>{{ $t('noAccount') }} <router-link to="/register">{{ $t('registerHere') }}</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email.value, password: password.value }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify({ email: email.value, token: data.token }));
            router.push('/profile');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error logging in');
    }
};
</script>

<style scoped>
.login-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: var(--background-color);
    color: var(--text-color);
}

.login-form label {

    margin-bottom: 5px;
}

.login-form input {
    width: calc(100% - 20px);
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.login-form button {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.login-form button:hover {
    background-color: #555;
}

p {
    margin-top: 10px;
    text-align: center;
}
</style>
