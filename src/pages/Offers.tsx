import { useEffect, useState } from "react";
import { Input } from "antd";
import { Offer } from "../interfaces/Offers";
import { Content } from "antd/es/layout/layout";
import OfferCard from "../components/offer/OfferCard";
import { getOfferAll, getOffersByName } from "../api/offer";
import { FaSearch } from "react-icons/fa";
import AppLayout from "../components/AppLayout";
import StoreOffers from "../components/store/StoreOffers";
import useStoresSearch from "../hooks/useStoreSearch";

const Offers = () => {
  const token = localStorage.getItem("token");
  const [recentOffers, setRecentOffers] = useState<Offer[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const { stores, refreshStores } = useStoresSearch({ token, search, filter });

  const handleMarkerClick = (store: any) => {
    console.log(store)
    setSelectedStore(store);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStore(null);
  };

  const handleGetAllOffers = async () => {
    try {
      const response = await getOfferAll(token);
      setRecentOffers(response);
    } catch (error) {}
  };

  //Search offers by name
  const onSearch = async () => {
    try {
      const response = await getOffersByName(token, search);
      setRecentOffers(response);
    } catch (error) {}
  }

  useEffect(() => {
    handleGetAllOffers();
    // eslint-disable-next-line
  }, []);

  return (
    <AppLayout>
        <div className="bg-white dark:bg-gray-800 p-6">
          <p className="text-xl">Ofertas</p>
        </div>
        <Content className="flex flex-col gap-4 p-8">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Ingrese un parámetro de búsqueda"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="rounded-full dark:from-gray-800 dark:to-gray-800 bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
              onClick={onSearch}
            >
              <FaSearch size={25} />
            </button>
          </div>
          <button
            className="rounded-full dark:from-gray-800 dark:to-gray-800 w-max bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
            onClick={handleGetAllOffers}
          >
            Limpiar filtros
          </button>
          <div className="flex gap-5 flex-wrap">
            {recentOffers.map((offer) => (
              <div onClick={() => handleMarkerClick(offer.store)} key={offer.store.idStore}>
                <OfferCard
                  key={offer.idOffer}
                  id={offer.idOffer}
                  productName={offer.name}
                  storeName={offer.store.name}
                  actualPrice={offer.priceNow}
                  previousPrice={offer.priceBefore}
                  endDate={offer.endDate}
                />
                </div>
            )).reverse()}
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
export default Offers;
