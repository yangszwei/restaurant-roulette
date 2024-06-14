interface Place {
	displayName: { text: string };
	formattedAddress: string;
}

export default defineEventHandler(async () => {
	const runtimeConfig = useRuntimeConfig();

	const request = {
		includedTypes: ['restaurant'],
		maxResultCount: 20,
		languageCode: 'zh-TW',
		locationRestriction: {
			circle: {
				center: { latitude: 25.1185042, longitude: 121.5210206 },
				radius: 1000.0,
			},
		},
	};

	const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Goog-Api-Key': runtimeConfig.googleMapsApiKey,
			'X-Goog-FieldMask': 'places.displayName,places.formattedAddress',
		},
		body: JSON.stringify(request),
	});

	const data = await response.json();

	if (!response.ok) {
		// eslint-disable-next-line no-console
		console.error('Failed to fetch places:', response.status, data);
		throw createError({ statusCode: response.status, statusMessage: 'Failed to fetch places' });
	}

	return data.places?.map((place: Place) => ({
		displayName: place.displayName?.text || null,
		formattedAddress: place.formattedAddress,
	}));
});
