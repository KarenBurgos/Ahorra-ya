import { useState, useEffect } from "react";
import {
  getAllStoresService,
  getStoresByDepartmentService,
  getStoresByMunicipalityService,
  getStoresByNameService,
} from "../api/stores";
import { Store } from "../interfaces/Stores";

interface UseStoresSearchParams {
  token: string | null;
  search: string;
  filter: string;
}

const useStoresSearch = ({ token, search, filter }: UseStoresSearchParams) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    if (!token) return;
    setLoading(true);

    try {
      let response: Store[];

      if (search) {
        switch (filter) {
          case "1": // Buscar por nombre
            response = await getStoresByNameService(token, search);
            break;
          case "2": // Buscar por departamento
            response = await getStoresByDepartmentService(token, search);
            break;
          case "3": // Buscar por municipio
            response = await getStoresByMunicipalityService(token, search);
            break;
          default:
            response = await getAllStoresService(token);
        }
      } else {
        response = await getAllStoresService(token);
      }

      setStores(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const refreshStores = () => {
    fetchStores();
  };

  useEffect(() => {
    fetchStores();
  }, [token]);

  return { stores, loading, refreshStores };
};

export default useStoresSearch;
