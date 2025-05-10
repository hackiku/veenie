// src/lib/sims/material/contexts/vehicleContext.svelte.ts
import { getContext, setContext } from 'svelte';

const VEHICLE_CONTEXT_KEY = 'material-vehicle';

export function createVehicleContext(initialVehicles = []) {
	// State
	let vehicles = $state(initialVehicles);
	let currentVehicle = $state(vehicles[0] || null);

	// Event callbacks for vehicle changes
	let callbacks = $state([]);

	// Handle setting a vehicle
	function setVehicle(vehicle) {
		if (!vehicle) return;

		currentVehicle = vehicle;

		// Notify any callbacks that vehicle changed
		for (let i = 0; i < callbacks.length; i++) {
			try {
				callbacks[i](vehicle);
			} catch (e) {
				console.error("Error in vehicle change callback:", e);
			}
		}
	}

	// Add callback for vehicle changes (this properly closes over the callbacks variable)
	function onVehicleChange(callback) {
		callbacks = [...callbacks, callback];

		return () => {
			callbacks = callbacks.filter(cb => cb !== callback);
		};
	}

	// Set available vehicles
	function setVehicles(newVehicles) {
		vehicles = newVehicles;

		// If no vehicle is selected but we have vehicles, select the first one
		if (!currentVehicle && newVehicles && newVehicles.length > 0) {
			setVehicle(newVehicles[0]);
		}
	}

	// Create the context object
	const context = {
		getVehicles: () => vehicles || [],
		getCurrentVehicle: () => currentVehicle,
		getCurrentType: () => currentVehicle?.type || 'balloon',
		setVehicle,
		onVehicleChange,
		setVehicles,

		// Get details of current vehicle in a unified format
		getVehicleDetails: () => {
			if (!currentVehicle) return {
				type: 'balloon',
				name: 'Default Balloon',
				mass: 1.0,
				buoyancy: 0.3,
				dragFactor: 0.05,
				dimensions: { radius: 1.0 }
			};

			return {
				type: currentVehicle.type || 'balloon',
				name: currentVehicle.name || 'Default Vehicle',
				mass: currentVehicle.data?.mass || 1.0,
				buoyancy: currentVehicle.data?.buoyancy || 0.3,
				dragFactor: currentVehicle.data?.dragFactor || 0.05,
				...(currentVehicle.data?.dimensions || {})
			};
		}
	};

	// Register the context
	setContext(VEHICLE_CONTEXT_KEY, context);

	return context;
}

export function getVehicleContext() {
	return getContext(VEHICLE_CONTEXT_KEY);
}