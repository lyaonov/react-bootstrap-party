import { useQuality } from "../../hooks/useQuality";
import PropTypes from 'prop-types'

const Qualitys = ({ id }) => {

    const { getQuality, isLoading } = useQuality();

    const Quality = getQuality(id);

    return isLoading ? 'loading...' : Quality.map((qual) => <span key={qual.name} className={"badge m-1 bg-" + qual.color}>
        {qual.name}
    </span>);
}

Qualitys.propTypes = {
    id: PropTypes.array
}

export default Qualitys;