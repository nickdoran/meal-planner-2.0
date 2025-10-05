import { useState } from "react";
import SearchBar from "../../components/SearchBar.jsx";
import SearchResults from "./SearchResults.jsx";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="mt-12 mb-6 mx-auto text-center">Search For Any Meal</h1>
      <div className="max-w-3xl mx-auto mb-12">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className=" flex flex-1 mx-auto px-4 mb-8 sm:px-6 lg:px-8 w-full max-w-7xl">
        <SearchResults searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Search;
