// src/lib/sims/space/utils/asset-check.ts

/**
 * Utility to verify SpaceKit assets are available
 * Add to your Space.svelte component to check assets before rendering
 */
export async function checkSpaceKitAssets() {
	if (typeof window === 'undefined') return { success: true, missing: [] };

	const requiredAssets = [
		'spacekit/skybox/eso_milkyway.jpg',
		'spacekit/sprites/smallparticle.png',
		'spacekit/sprites/lensflare0.png'
	];

	const missing: string[] = [];

	for (const asset of requiredAssets) {
		try {
			const response = await fetch(asset, { method: 'HEAD' });
			if (!response.ok) {
				missing.push(asset);
			}
		} catch (e) {
			missing.push(asset);
		}
	}

	return {
		success: missing.length === 0,
		missing
	};
}