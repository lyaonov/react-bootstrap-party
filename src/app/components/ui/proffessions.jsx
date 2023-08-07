import { useProffession } from "../../hooks/useProffession";
import PropTypes from 'prop-types'

const Proffessions = ({ id }) => {

    const { getProffession, isLoading } = useProffession();

    const proffession = getProffession(id);

    return isLoading ? 'loading...' : proffession.name;
}

Proffessions.propTypes = {
    id: PropTypes.string
}

export default Proffessions;