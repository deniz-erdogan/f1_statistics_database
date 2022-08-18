import * as React from 'react';
import { Box, Link } from '@mui/material';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';

import DeckGL from '@deck.gl/react';
import {LineLayer, ScatterplotLayer, ColumnLayer} from '@deck.gl/layers';

import {Map, StaticMap} from 'react-map-gl';



// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWF0YWxheTE3IiwiYSI6ImNsM2Vqdmt0NDBqMHIzZnByeHMyMDMxcHcifQ.drHzB3FwFTRF7jOR2PuZqQ';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 11,
  pitch: 10,
  bearing: 5
};

export default function Mmap({theme}) {
  const layers = [
		new ColumnLayer({
			id: 'column-layer',
			data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/hexagons.json',
			diskResolution: 12,
			radius: 250,
			extruded: true,
			pickable: true,
			elevationScale: 5000,
			getPosition: d => d.centroid,
			getFillColor: d => [48, 128, d.value * 255, 255],
			getLineColor: [0, 0, 0],
			getElevation: d => d.value
		})
  ];

  return (
		<Box>
			<DeckGL
				style={{width:"80%", height:"80%"}}
				initialViewState={INITIAL_VIEW_STATE}
				layers={layers}
				controller={true}
				getTooltip={
					({object}) => object && {
						html: `<p>height: ${object.value * 5000}m</p>`,
						style: {
							backgroundColor: '#f00',
							fontSize: '0.8em'
						},
					}
				}
				>
				<Map
					mapStyle={(theme === 'dark') ? "mapbox://styles/mapbox/dark-v10" : "mapbox://styles/mapbox/light-v10"}
					mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
				/>
			</DeckGL>
		</Box>
  );
}

/*
export default function Map(){
	const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(28.9784);
  const [lat] = useState(41.0082);
  const [zoom] = useState(1);
  const [API_KEY] = useState('16XtymI6fjPV2Qt9Wzo0');

	
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
		map.current.scrollZoom.disable();
		map.current = new DeckGL({
			mapStyle: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
			initialViewState: {
				longitude: -122.45,
				latitude: 37.8,
				zoom: 12
			},
			controller: true,
			layers: [
				new ScatterplotLayer({
					data: [
						{position: [-122.45, 37.8], color: [255, 0, 0], radius: 100}
					],
					getFillColor: d => d.color,
					getRadius: d => d.radius
				})
			]
		});
  });	


	// Viewport settings
	const INITIAL_VIEW_STATE = {
		longitude: -122.41669,
		latitude: 37.7853,
		zoom: 13,
		pitch: 0,
		bearing: 0
	};

	// Data to be used by the LineLayer
	const data = [
		{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
	];
	const layers = [
		new LineLayer({id: 'line-layer', data})
	];

	return (
		<Box width='80%' height='calc(100vh - 87px)' padding="20px">
			<Box ref={mapContainer} width='100%' height='100%'/>
			<Link href="https://www.maptiler.com" position='absolute' target="_blank" rel="noreferrer noopener" left='20px' bottom='20px' z-index='999'>
				<img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/>
			</Link>
		</Box>
	);
}

*/