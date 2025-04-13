// src/lib/server/db/schema.ts

import { pgTable, serial, text, integer, jsonb, timestamp, real, boolean } from 'drizzle-orm/pg-core';

// User accounts
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

// Simulation sessions
export const simSessions = pgTable('sim_sessions', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => users.id),
	startedAt: timestamp('started_at').defaultNow().notNull(),
	endedAt: timestamp('ended_at'),
	settings: jsonb('settings').notNull() // Store simulation settings
});

// Probe/lander telemetry data
export const probeTelemetry = pgTable('probe_telemetry', {
	id: serial('id').primaryKey(),
	sessionId: integer('session_id').references(() => simSessions.id),
	timestamp: timestamp('timestamp').notNull(),
	altitude: real('altitude').notNull(),
	latitude: real('latitude').notNull(),
	longitude: real('longitude').notNull(),
	temperature: real('temperature'),
	pressure: real('pressure'),
	windSpeed: real('wind_speed'),
	status: text('status')
});

// Saved simulation states
export const savedStates = pgTable('saved_states', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => users.id),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	planetState: jsonb('planet_state').notNull(),
	atmosphereState: jsonb('atmosphere_state').notNull(),
	probeState: jsonb('probe_state'),
	isPublic: boolean('is_public').default(false)
});



// Add to your schema.ts file
export const celestialBodies = pgTable('celestial_bodies', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	type: text('type').notNull(),
	data: jsonb('data').notNull()
});

export const atmosphericData = pgTable('atmospheric_data', {
	id: serial('id').primaryKey(),
	bodyId: integer('body_id').references(() => celestialBodies.id),
	altitude: real('altitude').notNull(),
	data: jsonb('data').notNull()
});

export const vehicles = pgTable('vehicles', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull(),
	data: jsonb('data').notNull()
});

export const materials = pgTable('materials', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	category: text('category').notNull(),
	data: jsonb('data').notNull()
});

// This one is mentioned in services.ts but not used in seed.ts
export const missions = pgTable('missions', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	status: text('status').notNull(),
	startDate: timestamp('start_date'),
	endDate: timestamp('end_date'),
	data: jsonb('data')
});