// src/lib/physics/coordinates/venusCoordinates.ts

// Type definitions for clarity
export interface SphericalCoordinate {
	latitude: number;   // degrees north
	longitude: number;  // degrees east
	altitude: number;   // meters above surface
}

export interface CartesianCoordinate {
	x: number;  // east/west in meters
	y: number;  // altitude in meters
	z: number;  // north/south in meters
}

export interface WindData {
	longitude: number;  // longitude displacement in degrees
	speed: number;      // wind speed in m/s
}

/**
 * Venus coordinate system that handles conversion between global spherical 
 * coordinates (latitude, longitude, altitude) and local cartesian coordinates
 */
export class VenusCoordinateSystem {
	// Venus physical parameters
	private readonly venusRadius: number;           // meters
	private readonly venusCircumference: number;    // meters

	// Reference point 
	public referencePoint: SphericalCoordinate;

	// Size of local cartesian patch (in meters)
	private readonly localGridSize: number;

	// Cached conversion factors for efficiency
	private degreesPerMeterLatitude: number;
	private degreesPerMeterLongitude: number;

	constructor() {
		// Venus physical parameters in meters
		this.venusRadius = 6052000; // 6052 km
		this.venusCircumference = 2 * Math.PI * this.venusRadius;

		// Start with default reference at prime meridian on equator
		this.referencePoint = {
			latitude: 0,    // degrees north
			longitude: 0,   // degrees east
			altitude: 0     // meters above surface
		};

		// Size of local cartesian patch (in meters)
		this.localGridSize = 500000; // 500 km in meters

		// Cached conversion factors - initialize
		this.degreesPerMeterLatitude = 360 / this.venusCircumference;
		// Longitude conversion depends on latitude, will be set in updateReferencePoint
		this.degreesPerMeterLongitude = 0;

		// Initialize longitude conversion factor based on equator
		this.updateReferencePoint(0, 0);
	}

	/**
	 * Update the reference point for the local coordinate system
	 * @param latitude Latitude in degrees
	 * @param longitude Longitude in degrees
	 */
	public updateReferencePoint(latitude: number, longitude: number): void {
		this.referencePoint.latitude = latitude;
		this.referencePoint.longitude = longitude;

		// Pre-compute conversion factors for efficiency
		// Degrees longitude per meter depends on latitude (circles get smaller near poles)
		const latitudeRadians = latitude * (Math.PI / 180);
		const radiusAtLatitude = this.venusRadius * Math.cos(latitudeRadians);

		// At equator this is the same as degreesPerMeterLatitude
		// Near poles, this value increases as circumference decreases
		this.degreesPerMeterLongitude = 360 / (2 * Math.PI * radiusAtLatitude);
	}

	/**
	 * Convert global spherical coordinates to local cartesian
	 */
	public sphericalToLocal(
		latitude: number,
		longitude: number,
		altitude: number
	): CartesianCoordinate {
		// Calculate difference from reference point
		const latDiff = latitude - this.referencePoint.latitude;
		const lonDiff = longitude - this.referencePoint.longitude;

		// Convert to meters (x = east/west, z = north/south)
		const z = latDiff / this.degreesPerMeterLatitude;
		const x = lonDiff / this.degreesPerMeterLongitude;
		const y = altitude; // altitude directly maps to y

		return { x, y, z };
	}

	/**
	 * Convert local cartesian coordinates to global spherical
	 */
	public localToSpherical(
		x: number,
		y: number,
		z: number
	): SphericalCoordinate {
		// Calculate lat/lon differences
		const latDiff = z * this.degreesPerMeterLatitude;
		const lonDiff = x * this.degreesPerMeterLongitude;

		// Add to reference point
		const latitude = this.referencePoint.latitude + latDiff;
		const longitude = this.referencePoint.longitude + lonDiff;
		const altitude = y; // y directly maps to altitude

		// Normalize longitude to -180 to +180
		const normalizedLongitude = ((longitude + 180) % 360) - 180;

		return {
			latitude,
			longitude: normalizedLongitude,
			altitude
		};
	}

	/**
	 * Check if local coordinates are close to the edge of the current patch
	 * and update reference point if needed
	 */
	public updateGridIfNeeded(localX: number, localZ: number): CartesianCoordinate {
		const edgeThreshold = this.localGridSize * 0.4; // 40% of grid size

		if (Math.abs(localX) > edgeThreshold || Math.abs(localZ) > edgeThreshold) {
			// We're getting close to the edge of our grid
			// Get current global position
			const global = this.localToSpherical(localX, 0, localZ);

			// Set this as our new reference point
			this.updateReferencePoint(global.latitude, global.longitude);

			// Return the new local coordinates (should be near origin now)
			return {
				x: 0,
				y: 0,
				z: 0
			};
		}

		// No change needed
		return { x: localX, y: 0, z: localZ };
	}

	/**
	 * Calculate distance between two spherical coordinates (in meters)
	 */
	public greatCircleDistance(
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number
	): number {
		// Convert to radians
		const lat1Rad = lat1 * (Math.PI / 180);
		const lon1Rad = lon1 * (Math.PI / 180);
		const lat2Rad = lat2 * (Math.PI / 180);
		const lon2Rad = lon2 * (Math.PI / 180);

		// Haversine formula
		const dLat = lat2Rad - lat1Rad;
		const dLon = lon2Rad - lon1Rad;
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1Rad) * Math.cos(lat2Rad) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return this.venusRadius * c; // Returns distance in meters
	}

	/**
	 * Account for atmospheric superrotation
	 * Returns the displacement due to wind over time
	 */
	public calculateSuperrotationDisplacement(
		altitude: number,
		timeSeconds: number
	): WindData {
		// Model superrotation speed based on altitude (simplified)
		// Peak around 65-70km altitude with ~100 m/s
		const altitudeKm = altitude / 1000; // Convert to km for the formula
		let windSpeed = 0;

		if (altitudeKm < 40) {
			// Lower atmosphere, winds increase with altitude
			windSpeed = altitudeKm * 2.5; // m/s
		} else if (altitudeKm <= 70) {
			// Cloud layer with strongest winds
			windSpeed = 100 * Math.sin(Math.PI * (altitudeKm - 40) / 60); // m/s, peaks at ~100 m/s
		} else {
			// Upper atmosphere, winds decrease with altitude
			windSpeed = Math.max(0, 100 - (altitudeKm - 70) * 5); // m/s
		}

		// Calculate displacement distance in meters
		const displacementM = windSpeed * timeSeconds;

		// Convert to longitude displacement (always eastward)
		const lonDisplacement = displacementM * (360 / this.venusCircumference);

		return {
			longitude: lonDisplacement,
			speed: windSpeed // Return speed in m/s for reference
		};
	}
}

// Create and export a singleton instance
export const venusCoordinates = new VenusCoordinateSystem();