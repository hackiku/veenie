<!-- src/lib/sims/venus/bodies/VenusProbe.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Vector3, BufferGeometry, LineBasicMaterial, Color } from 'three';
  import { applyWindForces } from '../physics/windModel';
  import { 
    getTemperatureAtAltitude, 
    getPressureAtAltitude 
  } from '../data/atmosphere';
  
  // Props using runes
  let { 
    initialAltitude = 70,  // km
    initialLatitude = 0,   // degrees
    initialLongitude = 0,  // degrees
    planetRadius = 6051.8, // km
    scale = 0.001,
    visible = true,
    simulationSpeed = 1,   // time acceleration
    telemetryCallback = undefined as ((data: ProbeTelemetry) => void) | undefined
  } = $props<{
    initialAltitude?: number;
    initialLatitude?: number;
    initialLongitude?: number;
    planetRadius?: number;
    scale?: number;
    visible?: boolean;
    simulationSpeed?: number;
    telemetryCallback?: ((data: ProbeTelemetry) => void) | undefined;
  }>();
  
  // Probe specifications
  const probeSpecs = {
    mass: 250,             // kg (based on Venera landers)
    crossSectionalArea: 2, // m² (approximate)
    dragCoefficient: 0.8,  // dimensionless
    parachuteArea: 15,     // m², when deployed
    parachuteDeployed: false,
    heatShieldAttached: true,
    balloonVolume: 5,      // m³ (if equipped with balloon)
    balloonInflated: false,
    rocketThrust: 0,       // N (current thrust if equipped with rockets)
    thrusting: false,
    thrustDirection: new Vector3(0, 1, 0) // Default is up
  };
  
  // State
  let probe = $state({
    // Position (spherical coordinates)
    altitude: initialAltitude,
    latitude: initialLatitude,
    longitude: initialLongitude,