import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { getAllFavoritesService } from "../api/favorites";
import { Store } from "../interfaces/Stores";
import StoreCard from "../components/store/StoreCard";
import StoreOffers from "../components/store/StoreOffers";
import AppLayout from "../components/AppLayout";

const Favorites = () => {
  const token = localStorage.getItem("token");
  const [stores, setStores] = useState<Store[]>([]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const [updateStores, setUpdateStores] = useState(false);

  //Set selected store and open drawer
  const handleMarkerClick = (store: any) => {
    setSelectedStore(store);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStore(null);
  };

  const handleGetAllStores = async () => {
    try {
      const response = await getAllFavoritesService(token);
      console.log(response);
      if (response) {
        const filteredResponse = response.filter((store: any) => store !== null);
        console.log(filteredResponse);
        setStores(filteredResponse);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };
  

  useEffect(() => {
    handleGetAllStores();
    setUpdateStores(false);
  }, [updateStores]);

  return (
    <AppLayout>
      <div className="bg-white dark:bg-gray-800 p-6">
        <p className="text-xl">Tiendas favoritas</p>
      </div>
      <Content className="flex gap-8 p-8 flex-wrap">
        {stores.map((store) => (
          <div onClick={() => handleMarkerClick(store)}>
            <StoreCard
              id={store.idStore}
              name={store.name}
              departament={store.departament.name || "Sin Departamento"} // Cambiar "department" a "departament"
              municipality={store.municipality.name || "Sin Municipio"} // Validación adicional
            />
          </div>
        ))}
      </Content>
      <StoreOffers
        visible={drawerVisible}
        onClose={closeDrawer}
        store={selectedStore}
        handleUpdateStores={setUpdateStores}
        showMapButton={true}
      />
    </AppLayout>
  );
};
export default Favorites;
