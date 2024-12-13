import { Input, Select } from "antd";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  onSearch: () => void;
}

const items = [
  { value: "1", label: "Nombre" },
  { value: "2", label: "Departamento" },
  { value: "3", label: "Municipio" },
];

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, filter, setFilter, onSearch }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="md:flex w-full gap-4">
        <Input
          placeholder="Ingrese un parámetro de búsqueda"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Select
          placeholder="Filtrar por"
          value={filter}
          onChange={setFilter}
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
  );
};

export default SearchBar;
