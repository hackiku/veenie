// src/lib/sims/material/core/bridge.ts

import type { World, RigidBody } from '@dimforge/rapier3d-compat';
import { getTimeSystem } from './systems/TimeSystem';
import { getEntityRegistry } from './entities/registry';
import type { BalloonState } from './entities/Balloon';
import { calculateAllForces } from './physics/forces';
import { calculateAtmosphericConditions } from './physics/atmosphere';
import type { Vector3 } from 'three';
import type { Entity } from './entities/registry';

/**
 * Interface for entity with Rapier physics binding
 */
export interface PhysicsEntity extends Entity {
	rigidBodyId?: number;
	collider?: any;
}

/**
 * Interface for mapping between entity IDs and Rapier rigid body IDs
 */
interface EntityPhysicsMap {
	entityToBody: Map<string, number>;
	bodyToEntity: Map<number, string>;
}

/**
 * Class that bridges between the Venus physics model and Rapier
 */
export class RapierBridge {
	private world: World;
	private registry = getEntityRegistry();
	private timeSystem = getTimeSystem();
	private entityMap: EntityPhysicsMap = {
		entityToBody: new Map<string, number>(),
		bodyToEntity: new Map<number, string>()
	};
	private paused: boolean = false;
	private atmosphereData: any[] = [];
	private windEnabled: boolean = true;
	private windIntensity: number = 1.0;

	/**
	 * Create a new Rapier physics bridge
	 * 
	 * @param world - Rapier physics world
	 * @param atmosphereData - Venus atmospheric data
	 */
	constructor(world: World, atmosphereData: any[] = []) {
		this.world = world;
		this.atmosphereData = atmosphereData;

		// Sync pause state with time system
		this.paused = this.timeSystem.isPaused();
		this.timeSystem.onPauseChange((paused) => {
			this.paused = paused;
		});
	}

	/**
	 * Initialize physics for an entity
	 * 
	 * @param entityId - Entity ID
	 * @param rigidBody - Rapier rigid body
	 */
	initPhysicsForEntity(entityId: string, rigidBody: RigidBody): void {
		// Store the mapping between entity and rigid body
		this.entityMap.entityToBody.set(entityId, rigidBody.handle);
		this.entityMap.bodyToEntity.set(rigidBody.handle, entityId);
	}

	/**
	 * Remove physics for an entity
	 * 
	 * @param entityId - Entity ID
	 */
	removePhysicsForEntity(entityId: string): void {
		const rigidBodyId = this.entityMap.entityToBody.get(entityId);
		if (rigidBodyId !== undefined) {
			this.entityMap.bodyToEntity.delete(rigidBodyId);
			this.entityMap.entityToBody.delete(entityId);
		}
	}

	/**
	 * Update physics state for all entities
	 * 
	 * @param delta - Time delta in seconds
	 */
	update(delta: number): void {
		if (this.paused || delta <= 0) {
			return;
		}

		// Get all physics entities
		const entities = this.registry.getAll<PhysicsEntity>();

		// Process each entity
		for (const entity of entities) {
			const rigidBodyId = this.entityMap.entityToBody.get(entity.id);
			if (rigidBodyId === undefined) continue;

			// Get the rigid body from Rapier
			const rigidBody = this.world.getRigidBody(rigidBodyId);
			if (!rigidBody) continue;

			// Special handling for balloons
			if ('properties' in entity) {
				this.updateBalloonPhysics(entity as BalloonState, rigidBody, delta);
			}
		}
	}

	/**
	 * Update physics for a balloon entity
	 * 
	 * @param balloon - Balloon entity
	 * @param rigidBody - Rapier rigid body
	 * @param delta - Time delta in seconds
	 */
	private updateBalloonPhysics(balloon: BalloonState, rigidBody: RigidBody, delta: number): void {
		// Get current position from Rapier
		const position = rigidBody.translation();

		// Calculate atmospheric conditions at current altitude
		const conditions = calculateAtmosphericConditions(
			this.atmosphereData,
			position.y,
			this.windEnabled,
			this.windIntensity,
			performance.now()
		);

		// Get current velocity from Rapier
		const velocity = rigidBody.linvel();

		// Calculate forces based on our Venus physics model
		const forces = calculateAllForces(
			balloon.properties.mass,
			balloon.properties.buoyancy * (1 + balloon.buoyancyControl * 0.2),
			balloon.properties.dragCoefficient,
			{ x: velocity.x, y: velocity.y, z: velocity.z },
			conditions,
			this.windEnabled,
			this.windIntensity
		);

		// Apply forces to Rapier rigid body
		rigidBody.addForce(
			{ x: forces.total.x, y: forces.total.y, z: forces.total.z },
			true
		);

		// Update entity state in registry
		this.registry.update<BalloonState>(balloon.id, (current) => ({
			...current,
			position: [position.x, position.y, position.z],
			velocity: [velocity.x, velocity.y, velocity.z],
			atmosphericConditions: conditions,
			forces: forces
		}));
	}

	/**
	 * Sync a Rapier rigid body with an entity's position
	 * 
	 * @param entityId - Entity ID
	 * @param position - New position
	 */
	syncEntityPosition(entityId: string, position: Vector3): void {
		const rigidBodyId = this.entityMap.entityToBody.get(entityId);
		if (rigidBodyId === undefined) return;

		const rigidBody = this.world.getRigidBody(rigidBodyId);
		if (!rigidBody) return;

		rigidBody.setTranslation(
			{ x: position.x, y: position.y, z: position.z },
			true
		);
	}

	/**
	 * Set whether wind effects are enabled
	 * 
	 * @param enabled - Whether wind is enabled
	 */
	setWindEnabled(enabled: boolean): void {
		this.windEnabled = enabled;
	}

	/**
	 * Set wind intensity multiplier
	 * 
	 * @param intensity - Wind intensity (0-2)
	 */
	setWindIntensity(intensity: number): void {
		this.windIntensity = Math.max(0, Math.min(2, intensity));
	}

	/**
	 * Set atmospheric data
	 * 
	 * @param data - Atmospheric data array
	 */
	setAtmosphereData(data: any[]): void {
		this.atmosphereData = data;
	}
}

/**
 * A singleton instance of the RapierBridge
 */
let bridgeInstance: RapierBridge | null = null;

/**
 * Get the singleton RapierBridge instance
 * 
 * @param world - Rapier physics world (only needed on first call)
 * @param atmosphereData - Venus atmospheric data (only needed on first call)
 * @returns The RapierBridge instance
 */
export function getRapierBridge(world?: World, atmosphereData?: any[]): RapierBridge {
	if (!bridgeInstance) {
		if (!world) {
			throw new Error('Rapier world is required when creating the bridge');
		}
		bridgeInstance = new RapierBridge(world, atmosphereData);
	}
	return bridgeInstance;
}

/**
 * Reset the RapierBridge instance (for testing or simulation reset)
 * 
 * @param world - New Rapier physics world
 * @param atmosphereData - New atmospheric data
 */
export function resetRapierBridge(world: World, atmosphereData: any[] = []): void {
	bridgeInstance = new RapierBridge(world, atmosphereData);
}