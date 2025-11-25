export interface Marker {
  id: string;
  name: string;
  position: { lng: number; lat: number };
  owner_id?: string;
}
