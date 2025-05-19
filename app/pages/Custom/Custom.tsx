import GameZone from '~/components/GameZone/GameZone';
import styles from './Custom.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '~/store/gameSlice';

export function meta({ }) {
    return [
        { title: 'Свой уровень' }
    ]
}

const Custom = () => {

    const [sizeX, setSizeX] = useState(10);
    const [sizeY, setSizeY] = useState(10);
    const [size, setSize] = useState(100);
    const [bombs, setBombs] = useState(20);
    const [inputX, setInputX] = useState('10');
    const [inputY, setInputY] = useState('10');
    const [inputBombs, setInputBombs] = useState('20');
    const [error, setError] = useState('');
    const [sizeWarning, setSizeWarning] = useState(false);
    const [bombsWarning, setBombsWarning] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetGame());
    }, [dispatch, size, bombs]);

    const validateUpdate = () => {
        try {
            const newX = inputX === '' ? 10 : Math.max(1, Math.min(60, parseInt(inputX) || 10));
            const newY = inputY === '' ? 10 : Math.max(1, Math.min(60, parseInt(inputY) || 10));
            const newBombs = inputBombs === '' ? 20 : Math.max(1, parseInt(inputBombs) || 20);

            const maxBombs = (newX * newY) * 0.8;
            const finalBombs = Math.min(newBombs, maxBombs);

            if (parseInt(inputX) > 60) {
                setInputX('60')
            }

            if (parseInt(inputY) > 60) {
                setInputY('60')
            }

            setSizeX(newX);
            setSizeY(newY);
            setBombs(finalBombs);
            setSize(newX * newY)
            setError('');

            if (newBombs !== finalBombs) {
                setInputBombs(String(finalBombs))
            }
        } catch (e) {
            setError('Некорректные значения. Используются значения по умолчанию.');
            setSizeX(10);
            setSizeY(10);
            setSize(100);
            setBombs(20);
            setInputX('10')
            setInputY('10')
            setInputBombs('20')
        }
    };

    const handleBlur = () => {
        validateUpdate();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            validateUpdate();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value;
        if (value === '' || /^\d*$/.test(value)) {
            const numValue = parseInt(value);
            setter(value);
            if (!numValue || numValue <= 60) {
                setSizeWarning(false);
            }
            if (numValue > 60) {
                setSizeWarning(true);
            }
        }
    };

    const handleInputChangeBomb = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value;
        if (value === '' || /^\d*$/.test(value)) {
            setter(value);
            setBombsWarning(false);

            const maxBombs = sizeX * sizeY * 0.8;
            if (parseInt(value) > maxBombs) {
                setBombsWarning(true);
            }
        }
    };

    return (
        <div className={styles.custom}>
            <div className={styles.inputs}>
                <label>
                    Ширина поля:
                    <input
                        type='text'
                        value={inputX}
                        onChange={(e) => handleInputChange(e, setInputX)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyPress}
                    />
                </label>
                <label>
                    Высота поля:
                    <input
                        type='text'
                        value={inputY}
                        onChange={(e) => handleInputChange(e, setInputY)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyPress}
                    />
                </label>
                {sizeWarning && (
                    <div className={styles.warning}>Максимальный размер поля: 60х60</div>
                )}
                <label>
                    Количество бомб:
                    <input
                        type='text'
                        value={inputBombs}
                        onChange={(e) => handleInputChangeBomb(e, setInputBombs)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyPress}
                    />
                </label>
                {bombsWarning && (
                    <div className={styles.warning}>Максимум бомб: {Math.floor(sizeX * sizeY * 0.8)} (80% от поля) </div>
                )}
                {error && <div className={styles.error}>{error}</div>}
            </div>

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

export default Custom;