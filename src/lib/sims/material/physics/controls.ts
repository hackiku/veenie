// physics/controls.ts

import { createPhysicsContext } from './context.svelte'

const physics: any = createPhysicsContext();

export function setupKeyboardControls(physics) {
	const keyState = { w: false, a: false, s: false, d: false };

	window.addEventListener('keydown', (e) => {
		if (e.key.toLowerCase() in keyState) {
			keyState[e.key.toLowerCase()] = true;
		}
	});

	window.addEventListener('keyup', (e) => {
		if (e.key.toLowerCase() in keyState) {
			keyState[e.key.toLowerCase()] = false;
		}
	});

	// Return a function that applies forces based on key state
	return () => {
		if (!physics.rigidBody || physics.paused) return;

		const force = { x: 0, y: 0, z: 0 };
		const strength = 0.05; // Adjust as needed

		if (keyState.w) force.z -= strength;
		if (keyState.s) force.z += strength;
		if (keyState.a) force.x -= strength;
		if (keyState.d) force.x += strength;

		physics.rigidBody.applyImpulse(force, true);
	};
}