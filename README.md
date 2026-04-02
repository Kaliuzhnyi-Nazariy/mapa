# Mapa

## Demo
https://mapa-app.onrender.com/

## About
Mapa is an interactive map application that allows users to create, manage, and explore custom markers. The project focuses on solving real-world challenges related to map interactions, state synchronization, and UI responsiveness.
It demonstrates my ability to integrate external libraries like Mapbox with React, manage complex UI state, and design scalable frontend architecture.

## Tech Stack
Frontend
•	React (Hooks, refs, controlled components) 
•	TypeScript 
•	Redux Toolkit (global state management) 
•	TanStack Query (server state & async handling) 
•	Mapbox GL JS (interactive map rendering) 
•	Tailwind CSS (utility-first styling) 
Backend
•	Node.js 
•	Express.js
•	TypeScript

## Features
- create marks on map by clicking on map
- ability to find places near the chosen mark
- ability to find user location 
- Fly to a selected marker from the list
- Highlight selected marker in UI and sync with map
- Responsive design

## How to run
```bash
# backend
cd backend
npm install
npm run dev

# frontend
cd frontend
npm install
npm run dev
```

## Architecture and decisions

### Separation of concerns
Redux Toolkit manages global UI state such as markers and selection.  
TanStack Query handles server state and API communication.

### Map abstraction
A custom hook (`useInitMap`) isolates Mapbox logic from the UI layer.  
Refs are used to store the map instance and avoid unnecessary re-renders.

### Event handling
Map click handling is decoupled using callback refs.  
Map clicks and marker clicks are distinguished using DOM inspection.

### Marker lifecycle
Markers are created and removed manually.  
Redux state is synchronized with markers rendered by Mapbox.

### UI synchronization
The map, sidebar, and modals stay in sync.  
The selected marker is scrolled into view using refs.

## Challenges

### Synchronizing map markers with UI state
Mapbox renders markers outside of React, so they are not part of the virtual DOM.  
Markers had to be managed manually and synchronized with Redux state.

### Handling map vs marker clicks
The application needs to distinguish between:
- clicking on the map (create marker)
- clicking on an existing marker (open menu)

This was solved using DOM inspection with `closest(".mapboxgl-marker")`.

### Scrolling selected marker into view
When a marker is selected on the map, it should be highlighted and visible in the list.  
This was implemented using refs, controlled scrolling, and temporary highlight state.

### Managing async updates and UI consistency
After creating or deleting markers, both the map and UI must stay consistent.  
This was handled using Redux Toolkit and re-rendering markers based on updated state.

## Future improvements
- Add support for uploading photos
- Improve user account features
