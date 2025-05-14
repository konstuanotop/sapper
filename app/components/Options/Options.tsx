import { Link } from 'react-router';
import styles from './Options.module.scss';
import { useDispatch } from 'react-redux';
import { resetGame } from '~/store/gameSlice';

const Options = () => {

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(resetGame())
    }

    return (
        <Link
            to={'/sapper'}
            className={`${styles.link} ${styles.btn}`}
            aria-label='Options'
            onClick={handleClick}
        ></Link>
    )
}

export default Options;