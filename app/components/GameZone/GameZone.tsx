import { memo, useEffect } from 'react';
import Board from '../Board/Board';
import Counter from '../Counter/Counter';
import Options from '../Options/Options';
import ResetGame from '../ResetGame/ResetGame';
import Timer from '../Timer/Timer';
import styles from './GameZone.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/store/store';
import { initializeBoard } from '~/store/gameSlice';

interface GameZoneProps {
    sizeX: number;
    sizeY: number;
    size: number;
    bombs: number;
}

const GameZone: React.FC<GameZoneProps> = memo(function GameZone({ sizeX, sizeY, size, bombs }) {

    const dispatch = useDispatch();
    const { sizeArea } = useSelector((state: RootState) => state.game);

    useEffect(() => {
        if (sizeArea.length === 0) {
            dispatch(initializeBoard({ sizeX, sizeY, bombs }))
        }
    }, [sizeX, sizeY, sizeArea, bombs, dispatch])

    return (
        <div className={styles.gameZone}>
            <div className={styles.panel}>
                <Counter />
                <ResetGame />
                <Options />
                <Timer />
            </div>
            <Board
                sizeX={sizeX}
                sizeY={sizeY}
                size={size}
                bombs={bombs}
            />

        </div>
    )
})

export default GameZone;