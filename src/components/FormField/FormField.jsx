import PropTypes from 'prop-types';

export const FormField = ({ label, id, name, type, register, error }) => {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} id={id} {...register(name)} />
            {error && <span>{error}</span>}
        </>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.func,
    error: PropTypes.string,
};
