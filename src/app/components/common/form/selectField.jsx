import PropTypes from 'prop-types'

const SelectField = ({ label, value, onChange, defaultOption, options, error }) => {
    const optionsArray = !Array.isArray(options) && typeof(options) === 'object' ?
        Object.keys(options).map(optionName => ({ name: options[optionName].name, value: options[optionName]._id })) : options
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label html-for="validationCustom04" className="form-label">{label}</label>
            <select className={getInputClasses()} id="validationCustom04" required value={value} name="profession" onChange={onChange} >
                <option disabled value="">{defaultOption}</option>
                {
                    optionsArray && optionsArray.map(option => <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>)
                }
            </select>
            {error && <div className="invalid-feedback">
                {error}
            </div>}
        </div>

    );
}

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
};

export default SelectField;