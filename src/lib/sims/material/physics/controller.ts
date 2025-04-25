// src/lib/sims/material/physics/controller.ts
// import { Vector3 } from './flight';
// import type { Vector3 } from './flight';
import { Vector3 } from "three";

export interface ControlState {
	forward: boolean;
	backward: boolean;
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
}

export class ControllerModel {
	private controlState: ControlState;
	private thrustStrength: number;
	private verticalThrustStrength: number;

	constructor() {
		this.controlState = {
			forward: false,
			backward: false,
			left: false,
			right: false,
			up: false,
			down: false
		};

		this.thrustStrength = 0.05;
		this.verticalThrustStrength = 0.1;
	}

	setControlState(state: Partial<ControlState>): void {
		this.controlState = { ...this.controlState, ...state };
	}

	setThrustStrength(value: number): void {
		this.thrustStrength = value;
	}

	setVerticalThrustStrength(value: number): void {
		this.verticalThrustStrength = value;
	}

	calculateControlForce(): Vector3 {
		const moveX = (this.controlState.right ? 1 : 0) - (this.controlState.left ? 1 : 0);
		const moveZ = (this.controlState.backward ? 1 : 0) - (this.controlState.forward ? 1 : 0);
		const moveY = (this.controlState.up ? 1 : 0) - (this.controlState.down ? 1 : 0);

		return {
			x: moveX * this.thrustStrength,
			y: moveY * this.verticalThrustStrength,
			z: moveZ * this.thrustStrength
		};
	}
}