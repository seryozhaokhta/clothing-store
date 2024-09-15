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

const register = async () => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email.value, password: password.value })
        })

        if (!response.ok) {
            throw new Error('Registration failed')
        }

        const data = await response.json()
        alert(data.message)  // Сообщение об успешной регистрации
        router.push('/login')
    } catch (error) {
        console.error('Error:', error)
        alert('Error registering user')
    }
}
</script>

<style scoped>
.register-form {
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

.register-form label {
    display: block;
    margin-bottom: 5px;
}

.register-form input {
    width: 100%;
    /* Полная ширина контейнера */
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    /* Корректно учитываем padding */
}

.register-form button {
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

.register-form button:hover {
    background-color: #555;
}
</style>
