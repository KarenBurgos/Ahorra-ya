import "leaflet/dist/leaflet.css";
import "../assets/style/AntDesignCustom.css";
import { Input } from "antd";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import OrangePin from "../assets/OrangePin.png";
import BluePin from "../assets/BluePin.png";
import { useState, useEffect } from "react";
import AddStoreForm from "../components/store/AddStoreForm";
import "react-toastify/dist/ReactToastify.css";
import { getAllStoresService } from "../api/stores";
import StoreOffers from "../components/store/StoreOffers";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeContext";

// Selected location icon
const icon = new Icon({
  iconUrl: OrangePin,
  iconSize: [30, 41],
});

// Store icon
const storeIcon = new Icon({
  iconUrl: BluePin,
  iconSize: [30, 41],
});

// Select spot in map to add store
function AddStore({ setOpen, position, setPosition, setSelectedPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setSelectedPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 p-3 rounded-md text-white shadow-md border-2 border-green-400"
        >
          Agregar tienda
        </button>
      </Popup>
    </Marker>
  );
}

const Map = () => {
  const state = useLocation().state;
  const token = localStorage.getItem("token");

  const [position, setPosition] = useState([13.7035233, -89.2116845]);
  const [openStoreForm, setOpenStoreForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [stores, setStores] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(13);
  const [updateStores, setUpdateStores] = useState(false);
  const { darkMode } = useTheme();

  const mapTheme = darkMode
    ? "https://api.mapbox.com/styles/v1/karenburgos/cm4maqh3p004h01ryh0u15jli/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2FyZW5idXJnb3MiLCJhIjoiY2x5dDlib3kzMHBjaTJpb2l5dmYwOGw1YyJ9.YsxdRu6U5wdveO4oSdWZkQ"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const handleGetAllStores = async () => {
    try {
      const data = await getAllStoresService(token);
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    handleGetAllStores();
  }, [updateStores]);

  // Get store location from URL or user location
  useEffect(() => {
    if (state?.location) {
      const [lat, lng] = state.location.split(",");
      setPosition([parseFloat(lat), parseFloat(lng)]);
      setZoom(16);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  // Select store and open drawer
  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStore(null);
  };

  // Search address in map
  const onSearch = async () => {
    const result = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
    );
    const data = await result.json();
    if (data.length > 0) {
      setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      setZoom(16);
    }
  };

  return (
    <AppLayout>
      {selectedPosition && (
        <AddStoreForm
          open={openStoreForm}
          setOpen={setOpenStoreForm}
          handleUpdateStores={handleGetAllStores}
          latitude={selectedPosition.lat}
          longitude={selectedPosition.lng}
        />
      )}
      <MapContainer center={position} zoom={zoom} className="h-screen w-full">
        <div className="absolute z-[500] mt-5 ml-20 w-10/12 flex gap-4">
          <Input
            placeholder="Ingrese una dirección"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            className="rounded-lg dark:from-gray-800 dark:to-gray-800 bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
            onClick={onSearch}
          >
            <FaSearch size={20} />
          </button>
        </div>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={mapTheme}
        />
        {stores.map((store) => (
          <Marker
            key={store.storeId}
            position={[store.latitude, store.longuitude]}
            icon={storeIcon}
            eventHandlers={{
              click: () => handleMarkerClick(store),
            }}
          />
        ))}
        <AddStore
          setOpen={setOpenStoreForm}
          position={selectedPosition}
          setPosition={setPosition}
          setSelectedPosition={setSelectedPosition}
        />
        <StoreOffers
          visible={drawerVisible}
          onClose={closeDrawer}
          store={selectedStore}
          handleUpdateStores={handleGetAllStores}
          showMapButton={false}
        />
      </MapContainer>
    </AppLayout>
  );
};

export default Map;
