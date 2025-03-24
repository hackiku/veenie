// lib/core/types/simulation.ts
// Core simulation types

export type SimulationStatus = 'initializing' | 'running' | 'paused' | 'stopped';

export type SimulationConfig = {
  timeStep: number;       // seconds
  physicsAccuracy: number; // iterations per step
  startDate: Date;
  modules: string[];      // active simulation modules
};

export type SimulationCallback = (deltaTime: number, time: number) => void;
