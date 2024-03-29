import Select from 'react-select';
import PropTypes from 'prop-types'

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {

    const optionsArray = !Array.isArray(options) && typeof (options) === 'object' ?
        Object.keys(options).map(optionName => ({ label: options[optionName].name, value: options[optionName]._id })) : options

    const handleChange = (value) => {
        onChange({ name: name, value })
    }
    return (
        <div className="mb-4">
            <label className='form-label' htmlFor={name}>{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                defaultValue={defaultValue}
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={handleChange}
                name={name}
            />
        </div>
    );
}

MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
};

export default MultiSelectField;