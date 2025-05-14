import GameZone from '~/components/GameZone/GameZone';
import styles from './Hard.module.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetGame } from '~/store/gameSlice';

export function meta({ }) {
    return [
        { title: 'Тяжелый уровень' }
    ]
}

const Hard = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetGame())
    }, [dispatch])

    const sizeX: number = 32;
    const sizeY: number = 16;
    const size: number = sizeX * sizeY;
    const bombs: number = 100;

    return (
        <div className={styles.hard}>
            <div className={styles.gameContainer}>
                <GameZone
                    sizeX={sizeX}
                    sizeY={sizeY}
                    size={size}
                    bombs={bombs}
                />
            </div>
        </div>
    )
}

export default Hard;