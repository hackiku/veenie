// lib/core/types/physics.ts
// Physics state types

import { Coordinates } from './position';

export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export type PhysicsState = {
  position: Coordinates;
  velocity: Vector3;
  acceleration: Vector3;
  forces: Record<string, Vector3>;
  mass: number;
};

export type AtmosphericState = {
  density: number;         // kg/m³
  pressure: number;        // Pa
  temperature: number;     // K
  composition: Record<string, number>; // % by volume
  windVector: Vector3;     // m/s
};
