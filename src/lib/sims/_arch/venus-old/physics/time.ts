// src/lib/sims/venus/physics/time.ts

/**
 * Time utilities for Venus simulation
 * Handles Julian Date calculations and time-based phenomena
 */

// Julian Date utilities
export class JulianDate {
	// Constants
	static J2000 = 2451545.0; // Julian Date for January 1, 2000, at 12:00 UTC
	static DAYS_PER_JULIAN_CENTURY = 36525;
	static SECONDS_PER_DAY = 86400;

	/**
	 * Convert a standard JavaScript Date to Julian Date
	 */
	static fromDate(date: Date): number {
		// Formula from Astronomical Almanac
		const y = date.getUTCFullYear();
		const m = date.getUTCMonth() + 1;
		const d = date.getUTCDate();
		const h = date.getUTCHours();
		const min = date.getUTCMinutes();
		const sec = date.getUTCSeconds();

		// Calculate day fraction
		const dayFraction = (h + min / 60 + sec / 3600) / 24;

		// Date to Julian Day Number algorithm
		const jdn =
			(367 * y) -
			Math.floor(7 * (y + Math.floor((m + 9) / 12)) / 4) -
			Math.floor(3 * (Math.floor((y + (m - 9) / 7) / 100) + 1) / 4) +
			Math.floor(275 * m / 9) +
			d + 1721028.5 + dayFraction;

		return jdn;
	}

	/**
	 * Convert Julian Date to standard JavaScript Date
	 */
	static toDate(julianDate: number): Date {
		// Julian Date to Date conversion
		const jd = julianDate + 0.5;
		const z = Math.floor(jd);
		const f = jd - z;

		let a = z;
		if (z >= 2299161) {
			const alpha = Math.floor((z - 1867216.25) / 36524.25);
			a = z + 1 + alpha - Math.floor(alpha / 4);
		}

		const b = a + 1524;
		const c = Math.floor((b - 122.1) / 365.25);
		const d = Math.floor(365.25 * c);
		const e = Math.floor((b - d) / 30.6001);

		// Day with fraction
		const day = b - d - Math.floor(30.6001 * e) + f;
		// Month
		const month = e < 14 ? e - 1 : e - 13;
		// Year
		const year = month > 2 ? c - 4716 : c - 4715;

		// Extract day and day fraction
		const dayInt = Math.floor(day);
		const dayFrac = day - dayInt;

		// Hours, minutes, seconds
		const hours = Math.floor(dayFrac * 24);
		const minutes = Math.floor((dayFrac * 24 - hours) * 60);
		const seconds = Math.floor(((dayFrac * 24 - hours) * 60 - minutes) * 60);

		return new Date(Date.UTC(year, month - 1, dayInt, hours, minutes, seconds));
	}

	/**
	 * Calculate the difference in days between two Julian Dates
	 */
	static diffDays(jd1: number, jd2: number): number {
		return Math.abs(jd1 - jd2);
	}

	/**
	 * Calculate Julian centuries since J2000 (used in astronomical calculations)
	 */
	static centuriesSinceJ2000(jd: number): number {
		return (jd - JulianDate.J2000) / JulianDate.DAYS_PER_JULIAN_CENTURY;
	}

	/**
	 * Get local sidereal time at a given longitude and Julian Date
	 * @param jd Julian Date
	 * @param longitude Longitude in degrees (East positive)
	 * @returns Local sidereal time in degrees
	 */
	static getLocalSiderealTime(jd: number, longitude: number): number {
		const t = JulianDate.centuriesSinceJ2000(jd);

		// Greenwich Mean Sidereal Time in degrees
		let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) +
			0.000387933 * t * t - t * t * t / 38710000;

		// Normalize to range [0, 360)
		gmst = gmst % 360;
		if (gmst < 0) gmst += 360;

		// Add longitude to get local sidereal time
		let lst = gmst + longitude;
		lst = lst % 360;
		if (lst < 0) lst += 360;

		return lst;
	}
}

/**
 * Venus rotational and orbital mechanics
 */
export class OrbitalMechanics {
	// Venus physical constants
	static VENUS_RADIUS = 6051.8; // km
	static VENUS_ROTATION_PERIOD = -243.025; // days (negative = retrograde)
	static VENUS_AXIAL_TILT = 177.3; // degrees
	static VENUS_SIDEREAL_ORBIT = 224.7; // Earth days
	static VENUS_SEMIMAJOR_AXIS = 108.21; // million km
	static VENUS_ORBIT_ECCENTRICITY = 0.0068;

	/**
	 * Calculate Venus rotation angle at a given Julian Date
	 * @param julianDate Julian Date to calculate for
	 * @returns Rotation angle in radians
	 */
	static getVenusRotation(julianDate: number): number {
		// Get days since J2000
		const daysSinceJ2000 = julianDate - JulianDate.J2000;

		// Venus rotates retrograde (clockwise when viewed from above the north pole)
		// Negative rotation period means retrograde rotation
		const rotationRate = 360 / Math.abs(this.VENUS_ROTATION_PERIOD); // degrees per day

		// Calculate total rotation in degrees (retrograde)
		const totalRotation = daysSinceJ2000 * rotationRate;

		// Convert to radians and apply retrograde direction
		const rotationRadians = (totalRotation % 360) * (Math.PI / 180);

		// Apply retrograde direction
		return -rotationRadians;
	}

	/**
	 * Calculate Venus position in its orbit around the Sun
	 * @param julianDate Julian Date to calculate for
	 * @returns Position vector {x, y, z} in millions of km
	 */
	static getVenusOrbitalPosition(julianDate: number): { x: number; y: number; z: number } {
		// Get centuries since J2000 for orbital elements
		const T = JulianDate.centuriesSinceJ2000(julianDate);

		// Mean anomaly of Venus (simplified)
		const M = 50.4 + 360 * (julianDate - JulianDate.J2000) / this.VENUS_SIDEREAL_ORBIT;
		const MRad = M * Math.PI / 180;

		// Eccentric anomaly (approximation)
		const E = MRad + this.VENUS_ORBIT_ECCENTRICITY * Math.sin(MRad);

		// Position in orbital plane
		const x = this.VENUS_SEMIMAJOR_AXIS * (Math.cos(E) - this.VENUS_ORBIT_ECCENTRICITY);
		const y = this.VENUS_SEMIMAJOR_AXIS * Math.sqrt(1 - this.VENUS_ORBIT_ECCENTRICITY * this.VENUS_ORBIT_ECCENTRICITY) * Math.sin(E);

		// Orbital inclination simplification (approx 3.4° to ecliptic)
		const inclinationRad = 3.4 * Math.PI / 180;

		return {
			x: x,
			y: y * Math.cos(inclinationRad),
			z: y * Math.sin(inclinationRad)
		};
	}

	/**
	 * Calculate the solar illumination angle at a specific point on Venus
	 * @param latitude Latitude in degrees
	 * @param longitude Longitude in degrees
	 * @param julianDate Julian Date to calculate for
	 * @returns Illumination angle in radians (0 = noon, π = midnight)
	 */
	static getSolarIlluminationAngle(latitude: number, longitude: number, julianDate: number): number {
		// Convert to radians
		const latRad = latitude * Math.PI / 180;
		const lonRad = longitude * Math.PI / 180;

		// Get Venus rotation
		const rotationAngle = this.getVenusRotation(julianDate);

		// Calculate Venus sub-solar point
		// This is highly simplified - proper calculation would account for
		// Venus orbital position relative to the Sun

		// Sub-solar longitude changes with rotation
		const subSolarLon = -rotationAngle; // Simplified, assumes Sun directly over equator

		// Calculate angular distance from sub-solar point
		const angularDistance = Math.acos(
			Math.sin(0) * Math.sin(latRad) +
			Math.cos(0) * Math.cos(latRad) * Math.cos(lonRad - subSolarLon)
		);

		return angularDistance;
	}

	/**
	 * Check if a point on Venus is in daylight
	 * @param latitude Latitude in degrees
	 * @param longitude Longitude in degrees
	 * @param julianDate Julian Date to calculate for
	 * @returns Boolean indicating daylight (true) or night (false)
	 */
	static isInDaylight(latitude: number, longitude: number, julianDate: number): boolean {
		const illuminationAngle = this.getSolarIlluminationAngle(latitude, longitude, julianDate);
		// If illumination angle is less than π/2 (90°), point is in daylight
		return illuminationAngle < Math.PI / 2;
	}
}

/**
 * Mission timeline events and phases
 */
export class MissionTimeline {
	// Mission date boundaries
	static MISSION_START_DATE = new Date('2025-01-01');
	static MISSION_END_DATE = new Date('2035-12-31');
	static MISSION_START_JD = JulianDate.fromDate(this.MISSION_START_DATE);
	static MISSION_END_JD = JulianDate.fromDate(this.MISSION_END_DATE);

	// Key mission events
	static MISSION_EVENTS = [
		{
			name: "Mission Launch",
			date: new Date("2025-06-15"),
			julianDate: JulianDate.fromDate(new Date("2025-06-15")),
			description: "Launch of the initial Venus atmospheric probe mission"
		},
		{
			name: "Venus Orbit Insertion",
			date: new Date("2025-12-10"),
			julianDate: JulianDate.fromDate(new Date("2025-12-10")),
			description: "Spacecraft enters Venus orbit to begin observation phase"
		},
		{
			name: "Atmospheric Probe Deployment",
			date: new Date("2026-02-01"),
			julianDate: JulianDate.fromDate(new Date("2026-02-01")),
			description: "Release of initial atmospheric probes into Venus cloud layer"
		},
		{
			name: "First Habitation Module",
			date: new Date("2028-03-15"),
			julianDate: JulianDate.fromDate(new Date("2028-03-15")),
			description: "Launch of first colonial habitat module to Venus orbit"
		},
		{
			name: "Cloud Colony Initialization",
			date: new Date("2030-07-01"),
			julianDate: JulianDate.fromDate(new Date("2030-07-01")),
			description: "Beginning of permanent habitation in Venus cloud layer"
		},
		{
			name: "Colony Expansion",
			date: new Date("2033-04-20"),
			julianDate: JulianDate.fromDate(new Date("2033-04-20")),
			description: "Launch of expansion modules for the cloud colony"
		},
		{
			name: "Full Operational Status",
			date: new Date("2035-01-01"),
			julianDate: JulianDate.fromDate(new Date("2035-01-01")),
			description: "Cloud colony reaches full operational status"
		}
	];

	/**
	 * Get the current mission phase based on date
	 */
	static getMissionPhase(julianDate: number): string {
		if (julianDate < JulianDate.fromDate(new Date("2025-12-10"))) {
			return "Transit Phase";
		} else if (julianDate < JulianDate.fromDate(new Date("2026-02-01"))) {
			return "Orbital Observation";
		} else if (julianDate < JulianDate.fromDate(new Date("2028-03-15"))) {
			return "Initial Exploration";
		} else if (julianDate < JulianDate.fromDate(new Date("2030-07-01"))) {
			return "Habitat Construction";
		} else if (julianDate < JulianDate.fromDate(new Date("2035-01-01"))) {
			return "Colony Establishment";
		} else {
			return "Full Operation";
		}
	}

	/**
	 * Get the nearest upcoming event
	 */
	static getNextEvent(julianDate: number): typeof MissionTimeline.MISSION_EVENTS[0] | null {
		const futureEvents = this.MISSION_EVENTS.filter(event => event.julianDate > julianDate);
		if (futureEvents.length === 0) return null;

		return futureEvents.reduce((nearest, event) =>
			event.julianDate < nearest.julianDate ? event : nearest
			, futureEvents[0]);
	}

	/**
	 * Check if date is within mission timeframe
	 */
	static isWithinMissionTimeframe(julianDate: number): boolean {
		return julianDate >= this.MISSION_START_JD && julianDate <= this.MISSION_END_JD;
	}
}