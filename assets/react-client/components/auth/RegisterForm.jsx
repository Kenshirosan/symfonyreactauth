import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../providers/user';
import FetchReq from '../../../lib/FetchReq';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const history = useHistory();
    const [, dispatch] = useContext(UserContext);

    const setEmailText = e => {
        setEmail(e.target.value);
    };

    const setPasswordText = e => {
        setPassword(e.target.value);
    };

    const submitForm = async e => {
        e.preventDefault();

        let token = document.head.querySelector(
            'meta[name="registration-csrf-token"]'
        ).content;

        const data = {
            'registration_form[email]': email,
            'registration_form[plainPassword]': password,
            'registration_form[agreeTerms]': agreeTerms,
            'registration_form[_token]': token,
        };

        try {
            const apiToken = await new FetchReq('/register').make().post(data);

            if (apiToken) {
                await dispatch({ type: 'LOAD_USER', payload: apiToken });

                history.push('/login');

                return;
            }
        } catch (error) {
            console.log(error.message);
            console.log(error);
            alert('Something Went Wrong');
        }
    };

    return (
        <form
            onSubmit={submitForm}
            name="registration_form"
            method="POST"
            className="form"
        >
            <div>
                <label htmlFor="registration_form_email" className="required">
                    Email
                </label>
                <input
                    value={email}
                    onChange={setEmailText}
                    type="text"
                    id="registration_form_email"
                    name="registration_form[email]"
                    required="required"
                    maxLength="180"
                    className="form-control"
                />
            </div>
            <div>
                <label
                    htmlFor="registration_form_plainPassword"
                    className="required"
                >
                    Password
                </label>
                <input
                    value={password}
                    onChange={setPasswordText}
                    type="password"
                    id="registration_form_plainPassword"
                    name="registration_form[plainPassword]"
                    required="required"
                    autoComplete="new-password"
                    className="form-control"
                />
            </div>
            <div className="checkbox mt-1">
                <div>
                    <label
                        className="me-2 required"
                        htmlFor="registration_form_agreeTerms"
                    >
                        Agree terms
                    </label>
                    <input
                        checked={agreeTerms}
                        onChange={() => setAgreeTerms(!agreeTerms)}
                        type="checkbox"
                        id="registration_form_agreeTerms"
                        name="registration_form[agreeTerms]"
                        required="required"
                        className="form-check-input mb-3"
                        value="1"
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
