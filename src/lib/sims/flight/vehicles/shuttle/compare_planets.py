import numpy as np
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Constants
G = 6.67430e-11  # Gravitational constant, m^3 kg^-1 s^-2

# Planet data
planets = {
    'Earth': {
        'mass': 5.972e24,  # kg
        'radius': 6371000,  # m
        'surface_gravity': 9.81,  # m/s^2
        'scale_height': 8500,  # m
        'surface_density': 1.225,  # kg/m^3
        'surface_temperature': 288,  # K
        'atmosphere_gas_constant': 287,  # J/(kg·K) for air
        'color': 'blue',
        'orbital_velocity_low': 7800  # m/s, approximate for LEO
    },
    'Venus': {
        'mass': 4.8675e24,  # kg
        'radius': 6051800,  # m
        'surface_gravity': 8.87,  # m/s^2
        'scale_height': 15900,  # m
        'surface_density': 65,  # kg/m^3
        'surface_temperature': 735,  # K
        'atmosphere_gas_constant': 188,  # J/(kg·K) for CO2
        'color': 'orange',
        'orbital_velocity_low': 7200  # m/s, approximate for low Venus orbit
    }
}

# Vehicle configurations
vehicle_configs = {
    'Earth_Rocket': {
        'dry_mass': 20000,  # kg
        'propellant_mass': 80000,  # kg
        'thrust': 1200000,  # N
        'isp': 360,  # s
        'cd': 0.3,
        'reference_area': 10,  # m^2
        'lift_to_drag': 0,  # No lift for a rocket
        'burn_rate': 280  # kg/s
    },
    'Venus_Shuttle': {
        'dry_mass': 30000,  # kg
        'propellant_mass': 50000,  # kg
        'thrust': 1000000,  # N
        'isp': 340,  # s
        'cd': 0.5,
        'reference_area': 200,  # m^2
        'lift_to_drag': 7.0,
        'burn_rate': 300  # kg/s
    }
}

def calculate_atmospheric_properties(planet, altitude):
    """Calculate atmospheric density and temperature at a given altitude"""
    # Simple exponential atmosphere model
    density = planet['surface_density'] * np.exp(-altitude / planet['scale_height'])
    
    # Linear temperature model (very simplified)
    if altitude < 100000:  # within 100km
        # Crude approximation - Venus has more complex temperature profile
        if planet == planets['Venus']:
            if altitude < 60000:  # Below 60km
                temp = planet['surface_temperature'] * (1 - 0.9 * altitude / 60000)
            else:
                temp = planet['surface_temperature'] * 0.1 * (1 - (altitude - 60000) / 40000)
        else:  # Earth
            temp = planet['surface_temperature'] * (1 - 0.5 * altitude / 100000)
    else:
        temp = planet['surface_temperature'] * 0.5
    
    return density, temp

def calculate_gravity(planet, altitude):
    """Calculate gravity at a given altitude"""
    r = planet['radius'] + altitude
    return G * planet['mass'] / (r * r)

def simulate_ascent(planet, vehicle, start_altitude=0, max_time=1000, dt=1.0):
    """Simulate ascent from given altitude with specified vehicle configuration"""
    # Initialize
    time_points = []
    altitude_points = []
    velocity_points = []
    delta_v_points = []
    mass_points = []
    thrust_points = []
    drag_points = []
    lift_points = []
    remaining_propellant_points = []
    acceleration_points = []
    
    # Initial conditions
    current_time = 0
    current_altitude = start_altitude
    current_horizontal_velocity = 0  # Initial horizontal velocity
    current_vertical_velocity = 0    # Initial vertical velocity
    
    if planet == planets['Venus']:
        # For Venus, start with superrotation velocity (300 km/h)
        current_horizontal_velocity = 300 * 1000 / 3600  # Convert to m/s
    
    current_mass = vehicle['dry_mass'] + vehicle['propellant_mass']
    remaining_propellant = vehicle['propellant_mass']
    delta_v = 0
    
    # Ascent loop
    while current_time < max_time and remaining_propellant > 0:
        # Get atmospheric properties
        density, temp = calculate_atmospheric_properties(planet, current_altitude)
        
        # Calculate current gravity
        gravity = calculate_gravity(planet, current_altitude)
        
        # Get current velocity magnitude
        current_velocity = np.sqrt(current_horizontal_velocity**2 + current_vertical_velocity**2)
        
        # Calculate thrust
        thrust = min(vehicle['thrust'], vehicle['burn_rate'] * vehicle['isp'] * 9.81)
        thrust_points.append(thrust)
        
        # Calculate drag in velocity direction
        drag = 0.5 * density * current_velocity**2 * vehicle['reference_area'] * vehicle['cd']
        drag_points.append(drag)
        
        # Calculate lift perpendicular to velocity
        lift = drag * vehicle['lift_to_drag']
        lift_points.append(lift)
        
        # Simplified ascent profile with gravity turn
        # Start vertical, then gradually pitch over
        pitch_time = 100  # seconds until pitch reaches 45 degrees
        if current_time < pitch_time:
            pitch_angle = 90 - (45 * current_time / pitch_time)  # Linear from 90 to 45 degrees
        else:
            pitch_angle = 45 - (45 * (current_time - pitch_time) / 200)  # Continue to 0 degrees
            pitch_angle = max(0, pitch_angle)
        
        pitch_radians = pitch_angle * np.pi / 180
        
        # Calculate thrust components
        thrust_vertical = thrust * np.sin(pitch_radians)
        thrust_horizontal = thrust * np.cos(pitch_radians)
        
        # Calculate lift components (perpendicular to velocity)
        velocity_angle = np.arctan2(current_vertical_velocity, current_horizontal_velocity) if current_velocity > 0 else 0
        lift_vertical = lift * np.cos(velocity_angle)
        lift_horizontal = lift * np.sin(velocity_angle)
        
        # Calculate drag components (opposite to velocity direction)
        drag_factor = drag / current_velocity if current_velocity > 0 else 0
        drag_vertical = -drag_factor * current_vertical_velocity
        drag_horizontal = -drag_factor * current_horizontal_velocity
        
        # Calculate accelerations
        vertical_accel = (thrust_vertical + lift_vertical + drag_vertical) / current_mass - gravity
        horizontal_accel = (thrust_horizontal + lift_horizontal + drag_horizontal) / current_mass
        
        # Update velocities
        current_vertical_velocity += vertical_accel * dt
        current_horizontal_velocity += horizontal_accel * dt
        
        # Update altitude
        current_altitude += current_vertical_velocity * dt
        
        # Update time and record data
        current_time += dt
        
        # Update mass and propellant
        propellant_used = vehicle['burn_rate'] * dt
        propellant_used = min(propellant_used, remaining_propellant)  # Don't use more than available
        remaining_propellant -= propellant_used
        current_mass = vehicle['dry_mass'] + remaining_propellant
        
        # Calculate delta-V increment (simplified rocket equation for this timestep)
        if propellant_used > 0:
            delta_v_increment = vehicle['isp'] * 9.81 * np.log(current_mass / (current_mass - propellant_used))
            delta_v += delta_v_increment
        
        # Record all data
        time_points.append(current_time)
        altitude_points.append(current_altitude / 1000)  # km
        velocity_points.append(current_velocity)
        delta_v_points.append(delta_v)
        mass_points.append(current_mass)
        remaining_propellant_points.append(remaining_propellant)
        acceleration_points.append(np.sqrt(vertical_accel**2 + horizontal_accel**2))
        
        # Safety check - don't let altitude go negative
        if current_altitude < 0:
            break
        
        # Stop if we've reached a ridiculously high altitude (simulation error)
        if current_altitude > 1000000:  # 1000 km
            break
    
    return {
        'time': np.array(time_points),
        'altitude': np.array(altitude_points),
        'velocity': np.array(velocity_points),
        'delta_v': np.array(delta_v_points),
        'mass': np.array(mass_points),
        'thrust': np.array(thrust_points),
        'drag': np.array(drag_points),
        'lift': np.array(lift_points),
        'remaining_propellant': np.array(remaining_propellant_points),
        'acceleration': np.array(acceleration_points),
        'final_horizontal_velocity': current_horizontal_velocity,
        'final_vertical_velocity': current_vertical_velocity
    }

def plot_comparison(results, title="Earth vs Venus Delta-V Comparison"):
    """Plot delta-V and related parameters over time for multiple simulation results"""
    # Create subplot figure
    fig = make_subplots(
        rows=2, cols=2,
        subplot_titles=("Delta-V Over Time", "Altitude Over Time", 
                         "Velocity Over Time", "Remaining Propellant"),
        specs=[[{}, {}], [{}, {}]],
        shared_xaxes=True
    )
    
    # Add traces for each result
    for name, result in results.items():
        planet_name = name.split('_')[0]
        color = planets[planet_name]['color']
        
        # Delta-V plot
        fig.add_trace(
            go.Scatter(x=result['time'], y=result['delta_v'], name=name, line=dict(color=color)),
            row=1, col=1
        )
        
        # Altitude plot
        fig.add_trace(
            go.Scatter(x=result['time'], y=result['altitude'], name=name, line=dict(color=color, dash='dot')),
            row=1, col=2
        )
        
        # Velocity plot
        fig.add_trace(
            go.Scatter(x=result['time'], y=result['velocity'], name=name, line=dict(color=color, dash='dashdot')),
            row=2, col=1
        )
        
        # Remaining propellant
        fig.add_trace(
            go.Scatter(x=result['time'], y=result['remaining_propellant'], name=name, line=dict(color=color, dash='longdash')),
            row=2, col=2
        )
    
    # Add reference lines for orbital velocities
    for planet_name, planet in planets.items():
        if f"{planet_name}_Rocket" in results or f"{planet_name}_Shuttle" in results:
            fig.add_trace(
                go.Scatter(
                    x=[0, max(max(r['time']) for r in results.values())],
                    y=[planet['orbital_velocity_low'], planet['orbital_velocity_low']],
                    name=f"{planet_name} Orbital Velocity",
                    line=dict(color=planet['color'], dash='dash', width=1),
                    showlegend=True
                ),
                row=2, col=1
            )
    
    # Update layout
    fig.update_layout(
        title=title,
        height=800,
        legend_title="Vehicles",
        template="plotly_white"
    )
    
    # Update axes
    fig.update_xaxes(title_text="Time (s)")
    fig.update_yaxes(title_text="Delta-V (m/s)", row=1, col=1)
    fig.update_yaxes(title_text="Altitude (km)", row=1, col=2)
    fig.update_yaxes(title_text="Velocity (m/s)", row=2, col=1)
    fig.update_yaxes(title_text="Propellant (kg)", row=2, col=2)
    
    return fig

def run_simulations(venus_altitude=50000):
    """Run simulations for all configurations and plot results"""
    results = {}
    
    # Earth rocket from surface
    results['Earth_Rocket'] = simulate_ascent(
        planets['Earth'], 
        vehicle_configs['Earth_Rocket'],
        start_altitude=0
    )
    
    # Venus shuttle from specified altitude
    results['Venus_Shuttle'] = simulate_ascent(
        planets['Venus'], 
        vehicle_configs['Venus_Shuttle'],
        start_altitude=venus_altitude
    )
    
    # Plot results
    fig = plot_comparison(results)
    fig.show()
    
    # Print summary with more realistic information
    print("\nSIMULATION SUMMARY")
    print("=================")
    for name, result in results.items():
        max_idx = len(result['time']) - 1
        planet_name = name.split('_')[0]
        planet = planets[planet_name]
        
        print(f"\n{name}:")
        print(f"  Burn time: {result['time'][max_idx]:.1f} seconds")
        print(f"  Final altitude: {result['altitude'][max_idx]:.1f} km")
        print(f"  Final velocity: {result['velocity'][max_idx]:.1f} m/s")
        print(f"  Delta-V achieved: {result['delta_v'][max_idx]:.1f} m/s")
        
        # Calculate orbital velocity at final altitude
        final_altitude_m = result['altitude'][max_idx] * 1000
        orbital_v = np.sqrt(G * planet['mass'] / (planet['radius'] + final_altitude_m))
        
        print(f"  Orbital velocity needed: {orbital_v:.1f} m/s")
        velocity_deficit = orbital_v - result['velocity'][max_idx]
        print(f"  Velocity deficit to orbit: {velocity_deficit:.1f} m/s")
        
        # Calculate remaining delta-V needed using rocket equation
        if velocity_deficit > 0:
            remaining_mass = result['mass'][max_idx]
            exhaust_velocity = vehicle_configs[name]['isp'] * 9.81
            mass_ratio = np.exp(velocity_deficit / exhaust_velocity)
            propellant_needed = remaining_mass - (remaining_mass / mass_ratio)
            
            print(f"  Propellant needed to reach orbit: {propellant_needed:.1f} kg")
            
            if 'remaining_propellant' in result:
                remaining_propellant = result['remaining_propellant'][max_idx]
                if remaining_propellant >= propellant_needed:
                    print(f"  Can reach orbit with {remaining_propellant - propellant_needed:.1f} kg propellant to spare")
                else:
                    print(f"  Cannot reach orbit: {propellant_needed - remaining_propellant:.1f} kg propellant shortfall")

def add_vehicle(name, based_on, **kwargs):
    """Add a new vehicle configuration based on an existing one with modifications"""
    vehicle_configs[name] = vehicle_configs[based_on].copy()
    for key, value in kwargs.items():
        vehicle_configs[name][key] = value
    return name

# Example usage
if __name__ == "__main__":
    # Default Venus altitude of 50km
    run_simulations(venus_altitude=50000)
    
    # Add more vehicle configurations as needed
    # Example:
    # add_vehicle('Venus_High_Propellant', 'Venus_Shuttle', propellant_mass=100000)
    # add_vehicle('Venus_High_LD', 'Venus_Shuttle', lift_to_drag=12, propellant_mass=70000)
    
    # Try different Venus altitude
    # run_simulations(venus_altitude=60000)  # 60km launch altitude