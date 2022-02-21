import React from 'react';
import styles from './NotesBoard.module.scss';

export default function deleteZone({ showRemoveZone, onDrop }) {
	return (
		showRemoveZone && (
			<div
				className={styles['notes-board__delete-zone']}
				onDoubleClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
				onDrop={onDrop}
			/>
		)
	);
}
