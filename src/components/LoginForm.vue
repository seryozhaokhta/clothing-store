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
    max-width: 350px;
    margin: 50px auto;
    padding: 25px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: var(--background-color);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    /* Убедимся, что padding и ширина корректно рассчитываются */
}

.login-form label {
    margin-bottom: 5px;
    display: block;
}

.login-form input {
    width: 100%;
    /* Полная ширина контейнера */
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    /* Корректно учитываем padding */
}

.login-form button {
    width: 100%;
    /* Полная ширина для кнопки */
    padding: 12px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    box-sizing: border-box;
    /* Корректно учитываем padding */
}

.login-form button:hover {
    background-color: #555;
}

.login-form p {
    margin-top: 10px;
    text-align: center;
}

.login-form a {
    color: var(--primary-color);
    text-decoration: none;
}

.login-form a:hover {
    text-decoration: underline;
}
</style>
