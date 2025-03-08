declare module 'spacekit.js' {
	export class Simulation {
		constructor(
			container: HTMLElement,
			options: {
				basePath?: string;
				startDate?: Date;
				jdPerSecond?: number;
				camera?: {
					initialPosition?: [number, number, number];
					enableDrift?: boolean;
				};
				debug?: {
					showAxes?: boolean;
					showGrid?: boolean;
					showStats?: boolean;
				};
				useLoadingBar?: boolean;
				unitsPerAu?: number;
				particleTextureUrl?: string | null;
				enableSun?: boolean;
			}
		);

		createObject(name: string, options: any): any;
		getViewer(): any;
		setJdPerSecond(speed: number): void;
		stop(): void;
	}

	export class Ephem {
		constructor(
			options: {
				a: number;
				epoch: number;
				e: number;
				i: number;
				om: number;
				w: number;
				ma: number;
			},
			unit?: string
		);
	}

	export const SpaceObjectPresets: {
		SUN: any;
		MERCURY: any;
		VENUS: any;
		EARTH: any;
		MARS: any;
		JUPITER: any;
		SATURN: any;
		URANUS: any;
		NEPTUNE: any;
	};

	export const SkyboxPresets: {
		NASA_TYCHO: any;
	};
}