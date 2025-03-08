// src/lib/sims/space/spaceKitController.ts
export class SpaceKitController {
	private simulation: any;
	private spaceObjects: Record<string, any> = {};
	private container: HTMLElement | null = null;

	initialize(container: HTMLElement, options: {
		initialFocus?: string;
		simulationSpeed?: number;
	} = {}) {
		if (!container) return;
		this.container = container;

		return import('spacekit.js').then(Spacekit => {
			this.simulation = new Spacekit.default.Simulation(container, {
				basePath: 'https://typpo.github.io/spacekit',
				startDate: new Date(),
				jdPerSecond: options.simulationSpeed || 1,
				camera: {
					initialPosition: [0, -30, 5],
				},
				debug: {
					showAxes: false,
					showGrid: false,
				},
			});

			this.initializeSkybox(Spacekit.default);
			this.initializePlanets(Spacekit.default);

			if (options.initialFocus) {
				setTimeout(() => this.focusOnPlanet(options.initialFocus!), 500);
			}

			return this;
		});
	}

	private initializeSkybox(Spacekit: any) {
		this.simulation.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);
	}

	private initializePlanets(Spacekit: any) {
		// Add the Sun
		this.spaceObjects.sun = this.simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);

		// Add planets
		this.addPlanet('mercury', Spacekit.SpaceObjectPresets.MERCURY);
		this.addPlanet('venus', Spacekit.SpaceObjectPresets.VENUS);
		this.addPlanet('earth', Spacekit.SpaceObjectPresets.EARTH);
		this.addPlanet('mars', Spacekit.SpaceObjectPresets.MARS);
		this.addPlanet('jupiter', Spacekit.SpaceObjectPresets.JUPITER);
		this.addPlanet('saturn', Spacekit.SpaceObjectPresets.SATURN);
		this.addPlanet('uranus', Spacekit.SpaceObjectPresets.URANUS);
		this.addPlanet('neptune', Spacekit.SpaceObjectPresets.NEPTUNE);

		// Add Earth's moon
		this.spaceObjects.moon = this.simulation.createObject('moon', {
			ephem: Spacekit.EphemPresets.MOON,
			labelText: 'Moon',
			particleSize: 2,
		});
	}

	private addPlanet(name: string, preset: any) {
		try {
			this.spaceObjects[name] = this.simulation.createObject(name, preset);
		} catch (error) {
			console.error(`Error adding planet ${name}:`, error);
		}
	}

	focusOnPlanet(planetName: string) {
		if (!this.spaceObjects[planetName] || !this.simulation) return;

		try {
			this.simulation.getViewer().followObject(this.spaceObjects[planetName], {
				enableTransition: true,
				distance: this.getPlanetViewDistance(planetName),
			});
		} catch (err) {
			console.error(`Error focusing on planet ${planetName}:`, err);
		}
	}

	setSimulationSpeed(speed: number) {
		if (!this.simulation) return;

		try {
			this.simulation.setJdPerSecond(speed);
		} catch (err) {
			console.error(`Error setting simulation speed:`, err);
		}
	}

	cleanup() {
		if (this.simulation) {
			try {
				this.simulation.stop();
				if (this.container) {
					while (this.container.firstChild) {
						this.container.removeChild(this.container.firstChild);
					}
				}
			} catch (error) {
				console.error('Error during cleanup:', error);
			}
		}
	}

	private getPlanetViewDistance(planet: string): number {
		const distanceMap: Record<string, number> = {
			'sun': 50,
			'mercury': 10,
			'venus': 15,
			'earth': 10,
			'mars': 10,
			'jupiter': 50,
			'saturn': 60,
			'uranus': 30,
			'neptune': 30,
			'moon': 2
		};
		return distanceMap[planet] || 20;
	}
}