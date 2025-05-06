import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBoard, handleFirstClick, generateBombs, openBlock, stopTimer, winGame, openAfterFirstClick } from '../../store/gameSlice';
import Block from '../Block/Block';
import styles from './Board.module.scss';
import type { RootState } from '../../store/store';

interface BoardProps {
    sizeX: number;
    sizeY: number;
    size: number;
    bombs: number;
}

const Board: React.FC<BoardProps> = memo(function Board({ sizeX, sizeY, size, bombs }) {
    const dispatch = useDispatch();

    const {
        sizeArea,
        bombArea,
        firstClick,
        clickId,
        openedBlocks,
        values,
        flagsIds,
        isWin
    } = useSelector((state: RootState) => state.game)

    useEffect(() => {
        document.documentElement.style.setProperty('--sizeX', sizeX.toString());
        document.documentElement.style.setProperty('--sizeY', sizeY.toString());
    }, [sizeX, sizeY])

    useEffect(() => {
        dispatch(initializeBoard({ sizeX, sizeY, bombs }));
    }, [sizeX, sizeY, bombs, dispatch])

    useEffect(() => {
        if (!firstClick) {
            dispatch(generateBombs())
        }
    }, [firstClick, clickId, dispatch])

    useEffect(() => {
        if (!firstClick && bombArea.length > 0) {
            dispatch(openAfterFirstClick());
        }
    }, [firstClick, bombArea.length, dispatch])

    const handleBlockClick = useCallback((id: number) => {
        if (openedBlocks.includes(id)) return;

        if (firstClick) {
            dispatch(handleFirstClick(id));
            return;
        }

        dispatch(openBlock(id))

    }, [dispatch, firstClick, openedBlocks])

    useEffect(() => {
        if (flagsIds.every((id) => bombArea.includes(id)) && flagsIds.length == bombArea.length && bombArea.length > 0) {
            if (!isWin) {
                dispatch(stopTimer())
                dispatch(winGame())
            }
        }

        if (openedBlocks.length === size - bombArea.length) {
            if (!isWin) {
                dispatch(stopTimer())
                dispatch(winGame())
            }
        }
    }, [flagsIds, bombArea, isWin, openedBlocks, dispatch])

    return (
        <div className={styles.board}>
            {sizeArea.map((item: number[]) => (
                item.map((elem: number) => (
                    <Block
                        key={elem}
                        id={elem.toString()}
                        firstClick={firstClick}
                        changeFirstClick={(id) => dispatch(handleFirstClick(id))}
                        isOpened={openedBlocks.includes(elem)}
                        onClick={() => handleBlockClick(elem)}
                        values={values}
                    />
                ))
            ))}
        </div>
    )
})

export default Board;