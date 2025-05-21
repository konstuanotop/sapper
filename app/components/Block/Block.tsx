import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import styles from './Block.module.scss';
import { middleClickDown, middleClickUp, rightClick } from '~/store/gameSlice';

export interface Values {
    bomb: string;
    empty: string;
    number: Record<string, number>;
}

interface BlockProps {
    id: string;
    firstClick: boolean;
    changeFirstClick: (id: number) => void;
    isOpened: boolean;
    onClick: () => void;
    values: Values;
}

const Block: React.FC<BlockProps> = ({ id, firstClick, changeFirstClick, isOpened, onClick, values }) => {

    const dispatch = useDispatch();

    const { isBomb, flagsIds, query, viewSector } = useSelector((state: RootState) => ({
        isBomb: state.game.bombArea.includes(+id),
        flagsIds: state.game.flagsIds,
        query: state.game.query,
        viewSector: state.game.viewSector,
    }));

    const colorNumber = (id: number) => {
        if (id === 1) {
            return <span className={styles.one}>{id}</span>
        } if (id === 2) {
            return <span className={styles.two}>{id}</span>
        } if (id === 3) {
            return <span className={styles.three}>{id}</span>
        } if (id === 4) {
            return <span className={styles.four}>{id}</span>
        } if (id === 5) {
            return <span className={styles.five}>{id}</span>
        } if (id === 6) {
            return <span className={styles.six}>{id}</span>
        } if (id === 7) {
            return <span className={styles.seven}>{id}</span>
        } if (id === 8) {
            return <span className={styles.eight}>{id}</span>
        } else {
            return <span>{id}</span>
        }
    }

    const getText = () => {
        if (flagsIds.includes(+id)) return '🚩';
        if (query.includes(+id)) return '?';
        if (!isOpened) return '';
        if (isBomb) return values.bomb;
        if (values.number[id]) return colorNumber(values.number[id]);
        return values.empty;
    };

    const isEmpty = isOpened && !isBomb && !values.number[id];
    const isNumber = isOpened && values.number[id];

    const handleClick = () => {
        if (firstClick) {
            changeFirstClick(Number(id));
            return;
        }
        onClick();
    };

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatch(rightClick(+id))
    };

    const handleMiddleDown = (e: React.MouseEvent) => {
        if (e.button === 1) {
            e.preventDefault();

            dispatch(middleClickDown(+id))
        }
    }

    const handleMiddleUp = (e: React.MouseEvent) => {
        if (e.button === 1) {
            e.preventDefault();

            dispatch(middleClickUp());
        }
    }

    const isViewSector = viewSector.includes(+id);

    return (
        <span
            className={styles.block}
            id={id}
            onClick={handleClick}
            onContextMenu={handleRightClick}
            onMouseDown={handleMiddleDown}
            onMouseUp={handleMiddleUp}
            data-opened={isOpened}
            data-bomb={isOpened && isBomb}
            data-empty={isEmpty}
            data-number={isNumber}
            data-viewSector={isViewSector}
        >
            {getText()}
        </span>
    )
}

export default Block;