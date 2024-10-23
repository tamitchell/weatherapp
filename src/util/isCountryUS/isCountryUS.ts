interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

const CONTINENTAL_US: BoundingBox = {
  north: 49.38,
  south: 24.52,
  east: -66.93,
  west: -125.0,
};

const ALASKA: BoundingBox = {
  north: 71.5388,
  south: 51.0,
  east: -140.0,
  west: -179.9,
};

const HAWAII: BoundingBox = {
  north: 22.5,
  south: 18.5,
  east: -154.5,
  west: -161.0,
};

function isInBoundingBox(lat: number, lng: number, box: BoundingBox): boolean {
  return (
    lat >= box.south && lat <= box.north && lng >= box.west && lng <= box.east
  );
}

export function isCountryUS(lat: number, lng: number): boolean {
  return (
    isInBoundingBox(lat, lng, CONTINENTAL_US) ||
    isInBoundingBox(lat, lng, ALASKA) ||
    isInBoundingBox(lat, lng, HAWAII)
  );
}
