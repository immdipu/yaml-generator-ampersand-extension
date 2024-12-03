/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select, { type StylesConfig } from "react-select";

interface ProviderOption {
  value: string;
  label: string;
}

interface ProviderSelectorProps {
  providers: Record<string, any>;
  selectedProvider: string;
  onSelect: (provider: string) => void;
}

const ProviderSelectorComponent: React.FC<ProviderSelectorProps> = ({
  providers,
  selectedProvider,
  onSelect,
}) => {
  const providerOptions: ProviderOption[] = Object.keys(providers).map(
    (key) => ({
      value: providers[key].name,
      label: providers[key].displayName,
    })
  );

  const handleChange = (selectedOption: ProviderOption | null) => {
    if (selectedOption) {
      onSelect(selectedOption.value);
    }
  };

  const customStyles: StylesConfig<ProviderOption, false> = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#00000000",
      borderColor: "#282d5a",
      fontSize: "13px",
      borderWidth: "1px",
      borderRadius: "0.29rem",
      "&:hover": {
        borderColor: "#282d5a",
      },
      outline: state.isFocused ? "0px solid #282d5a" : "none",
      border: state.isFocused ? "1px solid #282d5a" : "1px solid #282d5a",
      boxShadow: state.isFocused ? "0 0 0 1px #282d5a" : "none",
      scrollbarColor: "#17193a",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isFocused ? "#6122e7" : "#17193a",
      color: "white",
      fontSize: "0.875rem",
      "&:hover": {
        backgroundColor: "#6122e7",
      },
      scrollbarColor: "#17193a",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "#d4d4d4",
      fontSize: "0.875rem",
      fontWeight: "normal",
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      color: "#d4d4d4",
      fontSize: "13px",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "17193a",
      scrollbarColor: "#17193a",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: "#a3a3a3",
      fontSize: "13px",
    }),
  };

  return (
    <div className="">
      <h2 className="input_label label">Select Provider</h2>
      <Select<ProviderOption>
        className="basic-single"
        classNamePrefix="select"
        value={
          providerOptions.find((option) => option.value === selectedProvider) ||
          null
        }
        isClearable={true}
        isSearchable={true}
        name="provider"
        options={providerOptions}
        onChange={handleChange}
        placeholder="Select a provider..."
        styles={customStyles}
      />
    </div>
  );
};

export default ProviderSelectorComponent;
