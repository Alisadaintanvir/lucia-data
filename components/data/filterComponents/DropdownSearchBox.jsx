import Link from "next/link";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

function DropdownSearchBox({ data, onSelect }) {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    onSelect(selectedItems);
  }, [selectedItems, onSelect]);

  const filterItems = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .filter((item) => !selectedItems.includes(item));

  const visibleItems = filterItems.slice(0, 3);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev;
      }

      return [...prev, item];
    });
  };

  const handleRemoveItem = (item) => {
    setSelectedItems((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div
      id="dropdown-menu"
      className="rounded-md p-3 ring-1 ring-black ring-opacity-5"
    >
      <div className=" rounded-md ">
        <input
          id="search-input"
          className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
        />

        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <div
              key={item}
              onClick={() => handleItemClick(item)}
              className="rounded-md border-b-2"
            >
              <Link
                href={`/data?country=${item}`}
                className="bg-white block px-4 py-2  text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer "
              >
                {item}
              </Link>
            </div>
          ))
        ) : (
          <p className="px-4 py-2  text-error">No more items</p>
        )}
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {selectedItems.map((item) => (
            <div
              key={item}
              className="bg-primary hover:bg-error cursor-pointer px-2 rounded-md text-white text-sm flex gap-1 items-center"
              onClick={() => handleRemoveItem(item)}
            >
              <span>{item}</span>
              <span>
                <X size={14} />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownSearchBox;
