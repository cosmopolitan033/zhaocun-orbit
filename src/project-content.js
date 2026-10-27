// Fictional mission programme; all values are editable scenario data, not live telemetry.
export const programme = {
  name: 'The Aster programme',
  description: 'A mission concept for the worlds just beyond our reach. Follow the flight plan, examine the observatory, and build an observation sequence of your own.',
  missions: [
    { id: 'OR–01', name: 'Ring survey', orbit: 'Equatorial pass', altitude: '8,400 km', duration: '42 days', view: 0, objective: 'Map the gaps, density and structure of Aster’s ring system across a complete observation cycle.', instrument: 'Wide-field imager', power: '640 W', data: '18 GB / pass', path: 'M20 105 C60 15 200 15 240 105 S420 195 470 105', note: 'A broad, stable pass keeps the planet and its rings in frame. Start here to establish the overall shape of the system.' },
    { id: 'OR–02', name: 'Atmosphere study', orbit: 'Close polar pass', altitude: '2,100 km', duration: '28 days', view: 1, objective: 'Observe cloud bands and changing illumination along the boundary between the day and night sides.', instrument: 'Spectral scanner', power: '780 W', data: '24 GB / pass', path: 'M30 170 C100 -50 180 260 250 70 S400 10 470 150', note: 'A closer perspective reveals the procedural surface. The selected flight profile prioritises detailed atmospheric observations.' },
    { id: 'OR–03', name: 'Night-side watch', orbit: 'Terminator crossing', altitude: '5,600 km', duration: '36 days', view: 2, objective: 'Compare the illuminated limb with the planet’s shadow and study the geometry of scattered light.', instrument: 'Low-light camera', power: '520 W', data: '12 GB / pass', path: 'M25 130 C120 130 90 20 220 35 S280 190 380 160 S440 70 475 75', note: 'Track the silhouette of the world as it moves into shadow. This profile is designed around contrast, rather than surface detail.' },
  ],
  phases: [
    { code: 'T−30', title: 'Define the question', text: 'Choose the region and observation objective. The payload and flight profile follow the scientific question.', detail: 'MISSION DESIGN / TARGET SELECTION' },
    { code: 'T+00', title: 'Establish the orbit', text: 'Transition from the wide survey into the selected viewing geometry. Confirm attitude and instrument orientation.', detail: 'INSERTION / CAMERA ALIGNMENT' },
    { code: 'T+01', title: 'Observe & compare', text: 'Move between viewpoints, adjust the rotation speed and pause the world to compare light, surface and rings.', detail: 'OBSERVATION / CONTROLLED COMPARISON' },
    { code: 'T+42', title: 'Bring the plan home', text: 'Export a portable mission brief containing your chosen profile, instrument and observation priority.', detail: 'MISSION BRIEF / JSON EXPORT' },
  ],
  systems: [
    ['01', 'Optical payload', 'Three observation profiles', 'Wide-field imagery, spectral scanning and low-light observation each answer a different question.'],
    ['02', 'Attitude & guidance', 'Three controlled viewpoints', 'Overview, close orbit and night side provide a clear progression from context to detail.'],
    ['03', 'Flight operations', 'Operator-controlled rotation', 'Pause motion for inspection or change the orbit speed to compare the planet from a moving viewpoint.'],
  ],
};
