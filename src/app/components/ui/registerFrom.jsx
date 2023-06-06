import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from '../../api'
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "", profession: '', sex: 'male', qualities: [] });
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));

    }, []);

    const handleChange = (target) => {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));

    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберете профессию'
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (

        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                onChange={handleChange}
                options={professions}
                defaultOption='Choose...'
                error={errors.profession}
                value={data.profession}
                label='Выберете профессию:' />
            <RadioField
                options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label='Выберете ваш пол'
            />
            <MultiSelectField onChange={handleChange} options={qualities} name='qualities' label='Выберете ваши качества' />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    )
}

export default RegisterForm;