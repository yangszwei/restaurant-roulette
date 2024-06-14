<script setup lang="ts">
	import { ref } from 'vue';

	const { data: places } = await useFetch<{ displayName: string; formattedAddress: string }[]>('/api/places');
	const selectedPlace = ref<{ displayName: string; formattedAddress: string } | null>(null);
	const spinning = ref(false);

	useHead({
		title: '餐廳輪盤',
	});

	const spin = () => {
		spinning.value = true;
		const duration = 3000; // duration of the spin in milliseconds
		const interval = 100; // interval between changes
		const startTime = Date.now();
		const spinInterval = setInterval(() => {
			if (!places.value) {
				spinning.value = false;
				return;
			}
			const elapsedTime = Date.now() - startTime;
			if (elapsedTime >= duration) {
				clearInterval(spinInterval);
				spinning.value = false;
				selectedPlace.value = places.value[Math.floor(Math.random() * places.value.length)];
			} else {
				selectedPlace.value = places.value[Math.floor(Math.random() * places.value.length)];
			}
		}, interval);
	};
</script>

<template>
	<div class="mt-12 flex flex-col items-center justify-center">
		<h1 class="mb-4 text-2xl font-bold">Restaurant Roulette</h1>
		<p class="mb-8 text-center">幫你決定晚餐要吃什麼！</p>
		<div
			class="relative mb-5 flex h-36 w-72 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-gray-100"
		>
			<div v-if="selectedPlace" class="text-center">
				<h2 class="text-xl font-bold">{{ selectedPlace.displayName }}</h2>
				<p class="text-sm">{{ selectedPlace.formattedAddress }}</p>
			</div>
		</div>
		<button
			:disabled="spinning"
			class="rounded bg-blue-500 px-4 py-2 text-lg text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
			@click="spin"
		>
			旋轉
		</button>
	</div>
</template>
