export interface Store {
  idStore: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  departament: {
    id: string;
    name: string;
  }; // Cambiado a un objeto
  municipality: {
    id: string;
    name: string;
  }; // Cambiado a un objeto
  direction: string;
  ownerName: string | undefined;
  website: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}
