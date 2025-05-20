// src/lib/physics/coordinates/venusCoordinates.ts

export class VenusCoordinateSystem {
	constructor() {
		// Venus physical parameters
		this.venusRadius = 6052000; // km
		this.venusCircumference = 2 * Math.PI * this.venusRadius; // km

		// Reference point for local coordinates (defaults to "prime meridian" at equator)
		this.referencePoint = {
			latitude: 0,      // degrees north
			longitude: 0,     // degrees east
			altitude: 0       // km above surface
		};

		// Size of local cartesian patch (in km)
		this.localGridSize = 500;

		// Cached conversion factors
		this.degreesPerKmLatitude = 360 / (2 * Math.PI * this.venusRadius);
		this.updateReferencePoint(0, 0);
	}

	/**
	 * Update the reference point for the local coordinate system
	 */
	updateReferencePoint(latitude, longitude) {
		this.referencePoint.latitude = latitude;
		this.referencePoint.longitude = longitude;

		// Pre-compute conversion factors for efficiency
		// Degrees longitude per km depends on latitude (circles get smaller near poles)
		const latitudeRadians = latitude * (Math.PI / 180);
		const radiusAtLatitude = this.venusRadius * Math.cos(latitudeRadians);
		this.degreesPerKmLongitude = 360 / (2 * Math.PI * radiusAtLatitude);
	}

	/**
	 * Convert global spherical coordinates to local cartesian
	 */
	sphericalToLocal(latitude, longitude, altitude) {
		// Calculate difference from reference point
		const latDiff = latitude - this.referencePoint.latitude;
		const lonDiff = longitude - this.referencePoint.longitude;

		// Convert to kilometers (x = east/west, z = north/south)
		const z = latDiff / this.degreesPerKmLatitude;
		const x = lonDiff / this.degreesPerKmLongitude;
		const y = altitude; // altitude directly maps to y

		return { x, y, z };
	}

	/**
	 * Convert local cartesian coordinates to global spherical
	 */
	localToSpherical(x, y, z) {
		// Calculate lat/lon differences
		const latDiff = z * this.degreesPerKmLatitude;
		const lonDiff = x * this.degreesPerKmLongitude;

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
	updateGridIfNeeded(localX, localZ) {
		const edgeThreshold = this.localGridSize * 0.4; // 40% of grid size

		if (Math.abs(localX) > edgeThreshold || Math.abs(localZ) > edgeThreshold) {
			// We're getting close to the edge of our grid
			// Get current global position
			const global = this.localToSpherical(localX, 0, localZ);

			// Set this as our new reference point
			this.updateReferencePoint(global.latitude, global.longitude);

			// Return the new local coordinates (should be near origin now)
			return this.sphericalToLocal(global.latitude, global.longitude, global.altitude);
		}

		// No change needed
		return { x: localX, y: 0, z: localZ };
	}

	/**
	 * Calculate distance between two spherical coordinates (km)
	 */
	greatCircleDistance(lat1, lon1, lat2, lon2) {
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

		return this.venusRadius * c;
	}

	/**
	 * Account for atmospheric superrotation
	 * Returns the displacement due to wind over time
	 */
	calculateSuperrotationDisplacement(altitude, timeSeconds) {
		// Model superrotation speed based on altitude (simplified)
		// Peak around 65-70km altitude with ~100 m/s
		const altitudeKm = altitude;
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

		// Convert to km/s
		const windSpeedKmS = windSpeed / 1000;

		// Calculate displacement distance
		const displacementKm = windSpeedKmS * timeSeconds;

		// Convert to longitude displacement (always eastward)
		const lonDisplacement = displacementKm * (360 / this.venusCircumference);

		return {
			longitude: lonDisplacement,
			speed: windSpeed // Return speed in m/s for reference
		};
	}
}

// Create and export a singleton instance
export const venusCoordinates = new VenusCoordinateSystem();