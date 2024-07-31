import { useState } from "react";
import { X } from "lucide-react";

function DropdownSearchBox({ data, onSelect, selectedItems }) {
  const [query, setQuery] = useState("");
  const [isFocused, setFocused] = useState(false);

  const filterItems = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .filter((item) => !selectedItems.includes(item));

  const visibleItems =
    query.length > 0 ? filterItems.slice(0, 10) : filterItems.slice(0, 3);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (item) => {
    onSelect([...selectedItems, item]);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleRemoveItem = (item) => {
    onSelect(selectedItems.filter((i) => i !== item));
  };

  return (
    <div
      id="dropdown-menu"
      className="rounded-md p-3 ring-1 ring-black ring-opacity-5"
    >
      <div className="max-h-52 rounded-md  overflow-auto">
        <input
          id="search-input"
          className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          onFocus={handleFocus}
        />

        {isFocused ? (
          visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <div
                key={item}
                onClick={() => handleItemClick(item)}
                className=" border-b-2 bg-white block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              >
                {item}
              </div>
            ))
          ) : (
            <p className="px-4 py-2  text-error">No more items</p>
          )
        ) : null}

        {/* {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <div
              key={item}
              onClick={() => handleItemClick(item)}
              className=" border-b-2 bg-white block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
            >
              {item}
            </div>
          ))
        ) : (
          <p className="px-4 py-2  text-error">No more items</p>
        )} */}
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {selectedItems.map((item) => (
            <div
              key={item}
              className="bg-primary hover:bg-error cursor-pointer px-2 rounded-md text-white  flex gap-1 items-center"
              onClick={() => handleRemoveItem(item)}
            >
              <span className="text-sm">{item}</span>
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
