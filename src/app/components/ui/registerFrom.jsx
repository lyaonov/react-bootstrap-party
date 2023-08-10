import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";
import CheckBoxField from "../common/form/checkBoxField";

import { useQuality } from "../../hooks/useQuality";
import { useProffession } from '../../hooks/useProffession'

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "", profession: '', sex: 'male', qualities: [], license: false });
    const [errors, setErrors] = useState({});
    const { proffessions: professions } = useProffession();
    const { qualitys: qualities } = useQuality();
    console.log(professions);

    const handleChange = (target) => {
        console.log(target)
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
        },
        license: {
            isRequired: {
                message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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
        const newData = {...data, qualities: data.qualities.map(q => q.value)}
        console.log(newData)
        if (!isValid) return;
    };

    const qualitiesList = qualities.map((qual) => ({ label: qual.name, value: qual._id }))
    const proffessionsList = professions.map((prof) => ({ label: prof.name, value: prof._id }))


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
                name='profession'
                onChange={handleChange}
                options={proffessionsList}
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
            <MultiSelectField defaultValue={data.qualities} onChange={handleChange} options={qualitiesList} name='qualities' label='Выберете ваши качества' />
            <CheckBoxField value={data.license} onChange={handleChange} name='license' error={errors.license} >Подтвердить <a>лицензионное соглашение</a></CheckBoxField>
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