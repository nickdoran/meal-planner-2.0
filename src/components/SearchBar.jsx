import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-slate-200 rounded-3xl p-2 flex items-center gap-3 w-full max-w-full sm:w-[300px] md:w-[500px] lg:w-[1000px] xl:w-[1200px] mx-auto">
      <Search />
      <form className="w-full">
        <input
          type="text"
          placeholder="Search for meals..."
          className="w-full bg-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
