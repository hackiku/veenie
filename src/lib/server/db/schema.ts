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