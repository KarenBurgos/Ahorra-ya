import { useState } from "react";
import { Content } from "antd/es/layout/layout";
import StoreCard from "../components/store/StoreCard";
import StoreOffers from "../components/store/StoreOffers";
import AppLayout from "../components/AppLayout";
import SearchBar from "../components/SeacrhStore";
import useStoresSearch from "../hooks/useStoreSearch";

const Stores = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const { stores, refreshStores } = useStoresSearch({ token, search, filter });

  const handleMarkerClick = (store: any) => {
    setSelectedStore(store);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStore(null);
  };

  const handleClearFilters = () => {
    setSearch("");    // Limpiar búsqueda
    setFilter("1");   // Restablecer filtro
    refreshStores();  // Actualizar las tiendas
  };
  
  const noFilteredStoresMessage = stores.length === 0 && (search !== "" || filter !== "1")
  return (
    <AppLayout>
      <div className="bg-white dark:bg-gray-800 p-6">
        <p className="text-xl">Tiendas</p>
      </div>
      <Content className="flex flex-col gap-4 p-8">
        <SearchBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          onSearch={refreshStores}
        />
        <button
          className="rounded-full w-max dark:from-gray-800 dark:to-gray-800 bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
          onClick={handleClearFilters}
        >
          Limpiar filtros
        </button>
        <div className="flex gap-5 flex-wrap">
          {noFilteredStoresMessage && <p>No se encontraron tiendas</p>}
          {stores.map((store) => (
            <div onClick={() => handleMarkerClick(store)} key={store.idStore}>
              <StoreCard
                id={store.idStore}
                name={store.name}
                departament={store.departament.name || "Sin Departamento"}
                municipality={store.municipality.name || "Sin Municipio"}
              />
            </div>
          ))}
        </div>
      </Content>
      <StoreOffers
        visible={drawerVisible}
        onClose={closeDrawer}
        store={selectedStore}
        handleUpdateStores={refreshStores}
        showMapButton={true}
      />
    </AppLayout>
  );
};

export default Stores;
