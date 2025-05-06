'use client'

import { useDispatch, useSelector } from 'react-redux';
import styles from './Table.module.scss';
import type { RootState } from '~/store/store';
import { useEffect, useState } from 'react';
import Options from '~/components/Options/Options';
import { resetTable } from '~/store/gameSlice';

export function meta({ }) {
    return [
        { title: 'Таблица рекордов' }
    ]
}

const Table = () => {

    const { tableData } = useSelector((state: RootState) => state.game)
    const [isClient, setIsClient] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsClient(true);
    }, [])

    const handleResetTable = () => {
        if (confirm("Вы уверены, что хотите очистить таблицу?")) {
            dispatch(resetTable())
        }
    }

    if (!isClient) {
        return <div>Загрузка...</div>
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Место</th>
                        <th>Игрок</th>
                        <th>Лучшее время</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row) => (
                        <tr key={row.isPlaceholder ? `placeholder-${row.place}` : row.name}>
                            <td data-label="Место">{row.place}</td>
                            <td data-label="Игрок">{row.name}</td>
                            <td data-label="Лучшее время">{row.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.btns}>
                <Options />
                <button
                    onClick={(handleResetTable)}
                    className={styles.resetButton}
                >
                    Очистить таблицу
                </button>
            </div>
        </div>
    )
}

export default Table;