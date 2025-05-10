// src/lib/sims/material/core/entities/registry.ts

import type { BalloonState } from './Balloon';

/**
 * Type for entity with ID
 */
export type Entity = {
	id: string;
	[key: string]: any;
};

/**
 * Interface for the entity registry
 */
export interface EntityRegistry {
	/**
	 * All registered entities by ID
	 */
	entities: Map<string, Entity>;

	/**
	 * Register a new entity
	 * 
	 * @param entity - Entity to register
	 * @returns ID of the registered entity
	 */
	register: <T extends Entity>(entity: T) => string;

	/**
	 * Unregister an entity
	 * 
	 * @param id - ID of the entity to unregister
	 * @returns Whether the entity was successfully unregistered
	 */
	unregister: (id: string) => boolean;

	/**
	 * Get an entity by ID
	 * 
	 * @param id - ID of the entity to retrieve
	 * @returns The entity or undefined if not found
	 */
	get: <T extends Entity>(id: string) => T | undefined;

	/**
	 * Get all entities
	 * 
	 * @returns Array of all registered entities
	 */
	getAll: <T extends Entity>() => T[];

	/**
	 * Get all entities of a specific type
	 * 
	 * @param type - Type of entities to retrieve
	 * @returns Array of entities of the specified type
	 */
	getAllByType: <T extends Entity>(type: string) => T[];

	/**
	 * Update an entity
	 * 
	 * @param id - ID of the entity to update
	 * @param updater - Function that receives the current entity and returns the updated entity
	 * @returns The updated entity or undefined if not found
	 */
	update: <T extends Entity>(id: string, updater: (entity: T) => T) => T | undefined;

	/**
	 * Clear all entities
	 */
	clear: () => void;
}

/**
 * Create a new entity registry
 * 
 * @returns An entity registry instance
 */
export function createEntityRegistry(): EntityRegistry {
	const entities = new Map<string, Entity>();

	return {
		entities,

		register<T extends Entity>(entity: T): string {
			if (!entity.id) {
				throw new Error('Entity must have an id property');
			}

			entities.set(entity.id, entity);
			return entity.id;
		},

		unregister(id: string): boolean {
			return entities.delete(id);
		},

		get<T extends Entity>(id: string): T | undefined {
			return entities.get(id) as T | undefined;
		},

		getAll<T extends Entity>(): T[] {
			return Array.from(entities.values()) as T[];
		},

		getAllByType<T extends Entity>(type: string): T[] {
			return Array.from(entities.values())
				.filter(entity => entity.type === type) as T[];
		},

		update<T extends Entity>(id: string, updater: (entity: T) => T): T | undefined {
			const entity = entities.get(id) as T | undefined;

			if (!entity) {
				return undefined;
			}

			const updatedEntity = updater(entity);
			entities.set(id, updatedEntity);

			return updatedEntity;
		},

		clear(): void {
			entities.clear();
		}
	};
}

/**
 * A singleton instance of the entity registry
 */
let registryInstance: EntityRegistry | null = null;

/**
 * Get the singleton entity registry instance
 * 
 * @returns The entity registry instance
 */
export function getEntityRegistry(): EntityRegistry {
	if (!registryInstance) {
		registryInstance = createEntityRegistry();
	}

	return registryInstance;
}

/**
 * Reset the entity registry (for testing or simulation reset)
 */
export function resetEntityRegistry(): void {
	if (registryInstance) {
		registryInstance.clear();
	}
}