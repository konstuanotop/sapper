import { useEffect } from 'react';
import styles from './Easy.module.scss'
import GameZone from '~/components/GameZone/GameZone';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame } from '~/store/gameSlice';
import type { RootState } from '~/store/store';

export function meta({ }) {
    return [
        { title: 'Легкий уровень' }
    ]
}

const Easy = () => {

    const dispatch = useDispatch();
    const { sizeArea } = useSelector((state: RootState) => state.game)

    useEffect(() => {
        dispatch(resetGame())
    }, [dispatch])

    const sizeX: number = 8;
    const sizeY: number = 8;
    const size: number = sizeX * sizeY;
    const bombs: number = 10;

    return (
        <div className={styles.easy}>
            {
                sizeArea ? <GameZone
                    sizeX={sizeX}
                    sizeY={sizeY}
                    size={size}
                    bombs={bombs}
                /> : <div>Loading</div>
            }
        </div>
    )
}

export default Easy;