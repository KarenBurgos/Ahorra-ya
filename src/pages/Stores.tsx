import { useEffect, useState } from "react";
import { Input, Layout, Select } from "antd";
import SideMenu from "../components/Menu";
import { Content } from "antd/es/layout/layout";
import {
  getAllStoresService,
  getStoresByDepartmentService,
  getStoresByMunicipalityService,
  getStoresByNameService,
} from "../api/stores";
import { Store } from "../interfaces/Stores";
import StoreCard from "../components/StoreCard";
import { FaSearch } from "react-icons/fa";
import StoreOffers from "../components/StoreOffers";
import AppLayout from "../components/AppLayout";
import { Department } from '../interfaces/Departments';

const items = [
  {
    value: "1",
    label: "Nombre",
  },
  {
    value: "2",
    label: "Departamento",
  },
  {
    value: "3",
    label: "Municipio",
  },
];

const Stores = () => {
  const token = localStorage.getItem("token");
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("1");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  
  const [updateStores, setUpdateStores] = useState(false);

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
      const response = await getAllStoresService(token);
      console.log(response[0].departament);
      setStores(response);
    } catch (error) {
      console.error(error);
    }
  };  

  const handleChangeFilter = (key: string) => {
    setFilter(key);
  };

  const onSearch = async () => {
    if (search === "") {
      return;
    }
    switch (filter) {
      case "1":
        try {
          const storesByName = await getStoresByNameService(token, search);
          setStores(storesByName);
        } catch (error) {}
        break;
      case "2":
        try {
          const storesByDepartment = await getStoresByDepartmentService(
            token,
            search
          );
          setStores(storesByDepartment);
        } catch (error) {}
        break;
      case "3":
        try {
          const storesByMunicipality = await getStoresByMunicipalityService(
            token,
            search
          );
          setStores(storesByMunicipality);
        } catch (error) {}
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleGetAllStores();
    setUpdateStores(false);
  }, [updateStores]);

  return (
    <AppLayout>
        <div className="bg-white dark:bg-gray-800 p-6">
          <p className="text-xl">Tiendas</p>
        </div>
        <Content className="flex flex-col gap-4 p-8">
          <div className="flex items-center gap-4">
            <span className="md:flex w-full gap-4">
              <Input
                placeholder="Ingrese un parámetro de búsqueda"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
              <Select
                placeholder="Filtrar por"
                onChange={handleChangeFilter}
                options={items}
                className="w-full md:w-1/6"
              />
            </span>
            
            <button
              className="rounded-full dark:from-gray-800 dark:to-gray-800 bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
              onClick={onSearch}
            >
              <FaSearch size={25} />
            </button>
          </div>
          <button
            className="rounded-full w-max dark:from-gray-800 dark:to-gray-800 bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
            onClick={handleGetAllStores}
          >
            Limpiar filtros
          </button>
          <div className="flex gap-5 flex-wrap">
  {stores.map((store) => (
    <div onClick={() => handleMarkerClick(store)} key={store.idStore}>
      <StoreCard
        id={store.idStore}
        name={store.name}
        departament={store.departament.name || "Sin Departamento"} // Cambiar "department" a "departament"
        municipality={store.municipality.name || "Sin Municipio"} // Validación adicional
      />
    </div>
  ))}
</div>

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


export default Stores;
