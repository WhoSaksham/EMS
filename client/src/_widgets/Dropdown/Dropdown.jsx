import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import './dropdown.scss';

const Dropdown = (props) => {
    const { options = [], isDisabled, isClearable, isRequired, isLoading, isSearchable, name, onFocus, isRtl, onChange, label, placeholder, menuPosition } = props;

    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (name) {
            const foundOption = options?.find(option => option.value == name);  // eslint-disable-line eqeqeq
            if (foundOption) {
                setSelectedOption(foundOption?.value);
            }
        }
    }, [name, options]);

    const handleChange = (selectedOption) => {
        if (onChange) {
            onChange(selectedOption ? selectedOption.value : '');
        }
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            boxShadow: state.isFocused ? null : provided.boxShadow,
            borderColor: state.isFocused ? 'var(--border-light)' : provided.borderColor,
            '&:hover': {
                borderColor: state.isFocused ? 'var(--secondary)' : provided.borderColor,
            }
        })
    };

    return (
        <>
            <Form.Label className={isRequired && "is-required"} aria-label={label}>{label}</Form.Label>
            <Select
                className="basic-single mb-3"
                classNamePrefix="select"
                defaultValue={selectedOption}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name={name}
                menuPosition={menuPosition ?? "fixed"}
                options={options}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
                value={options?.filter(({ value }) => value == name)}
                onChange={handleChange}
                placeholder={`Select ${placeholder || "Value"}`}
                styles={customStyles}
                onFocus={onFocus}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    border: 0,
                    colors: {
                        ...theme.colors,
                        primary25: 'var(--border-light)',
                        primary: 'var(--primary)',
                    },
                })}
                {...props}
            />
        </>
    );
};

export default Dropdown;
