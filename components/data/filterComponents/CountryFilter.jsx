import Link from "next/link";

function CountryFilter({ selectedCountries, onCountryChange }) {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    onCountryChange(value, checked);
  };
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">Country</label>
      <div className="select-country flex gap-5">
        <Link href="/data/?country=Bangladesh">
          <input
            type="checkbox"
            value="United States"
            checked={selectedCountries.includes("United States")}
            onChange={handleCheckboxChange}
          />
        </Link>
        <label className="text-sm font-semibold">USA</label>
      </div>

      <div className="select-country flex gap-5">
        <input
          type="checkbox"
          value="Bangladesh"
          checked={selectedCountries.includes("Bangladesh")}
          onChange={handleCheckboxChange}
        />
        <label className="text-sm font-semibold">Bangladesh</label>
      </div>
    </div>
  );
}

export default CountryFilter;
