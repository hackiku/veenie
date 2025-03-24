// lib/core/types/position.ts
// Position and coordinate types

export type Coordinates = {
  x: number;
  y: number;
  z: number;
};

export type VenusCoordinates = {
  altitude: number;   // km above Venus surface
  latitude: number;   // degrees
  longitude: number;  // degrees
};

export type OrbitalElements = {
  semiMajorAxis: number;  // km
  eccentricity: number;
  inclination: number;    // degrees
  longAscendingNode: number; // degrees
  argOfPeriapsis: number; // degrees
  meanAnomaly: number;    // degrees
  epoch: Date;            // reference time
};
