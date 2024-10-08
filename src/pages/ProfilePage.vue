<!-- src/pages/ProfilePage.vue -->

<template>
    <div v-if="isAuthenticated">
        <div class="profile-header">
            <h1>{{ $t('profile') }}</h1>
            <button @click="logout" class="logout-button">{{ $t('logout') }}</button>
        </div>

        <div v-if="favoriteProducts.length > 0" class="product-grid">
            <div v-for="product in favoriteProducts" :key="product.id" class="product-card">
                <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.price }} {{ $t('currency') }}</p>
                    <div class="tags">
                        <span v-for="tag in product.tags" :key="tag" class="tag">{{ $t(tag) }}</span>
                        <span class="tag">{{ product.brand }}</span>
                        <span v-for="size in product.sizes" :key="size" class="tag">{{ size }}</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button @click="addToCart(product)">{{ $t('addToCart') }}</button>
                    <button @click="removeFromFavorites(product)">
                        <span class="remove-button">{{ $t('removeFromFavorites') }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p>{{ $t('noFavorites') }}</p>
        </div>
    </div>
    <div v-else>
        <LoginForm />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import LoginForm from '@/components/LoginForm.vue';

const cartStore = useCartStore();
const router = useRouter();
const user = JSON.parse(localStorage.getItem('user'));

const isAuthenticated = computed(() => !!user);
const favoriteProducts = ref([]);

// Загрузка избранных товаров из localStorage
if (isAuthenticated.value) {
    favoriteProducts.value = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
}

const addToCart = (product) => {
    cartStore.addToCart(product);
};

const removeFromFavorites = (product) => {
    product.isFavorite = false;
    favoriteProducts.value = favoriteProducts.value.filter((item) => item.id !== product.id);
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts.value));
};

const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
};
</script>

<style scoped>
.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
    background-color: var(--background-alt-color);
    border-radius: 10px;
}

.logout-button {
    background-color: #ff4d4f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.logout-button:hover {
    background-color: #ff7875;
}

.product-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;
}

.product-card {
    width: calc(33.333% - 20px);
    border: 1px solid #ddd;
    padding: 15px;
    background-color: var(--background-color);
    color: var(--text-color);
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-info {
    margin-bottom: 10px;
}

.product-actions {
    display: flex;
    justify-content: space-between;
}

.remove-button {
    color: red;
    cursor: pointer;
}

.remove-button:hover {
    text-decoration: underline;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 10px;
}

.tag {
    background-color: #f0f0f0;
    color: var(--text-color);
    border-radius: 3px;
    padding: 2px 8px;
    font-size: 12px;
}
</style>
