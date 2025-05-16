const SelectCategory = ({ category, onChange, selectedCategories }) => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wybierz kategorię</label>
          <select
            name="category"
            multiple
            value={selectedCategories}
            onChange={onChange}
            className="w-full h-[120px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          >
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
  
        {selectedCategories.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2">Wybrane kategorie:</h3>
            <ul className="flex flex-wrap gap-2">
              {selectedCategories.map((catId) => {
                const catName =
                  category.find((c) => c.id === Number(catId))?.name || "Nieznana kategoria";
                return (
                  <li
                    key={catId}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                  >
                    {catName}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default SelectCategory;
  