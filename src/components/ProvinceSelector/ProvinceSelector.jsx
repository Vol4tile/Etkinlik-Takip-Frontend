import { provinces } from "../../assets/provinces";

const ProvinceSelector = ({ selectedProvince, setSelectedProvince }) => {
  const handleProvinceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedProvince(selectedValue);
  };

  return (
    <div className="province">
      <label htmlFor="provinceSelect" style={{ color: "white" }}>
        İle göre filtrele :{" "}
      </label>
      <select
        id="provinceSelect"
        value={selectedProvince}
        onChange={handleProvinceChange}
      >
        <option value="">İl seçin</option>
        {provinces.map((province, index) => (
          <option key={index} value={province}>
            {province}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceSelector;
