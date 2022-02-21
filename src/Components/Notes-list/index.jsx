import React from 'react';
import Note from '../Note';

import styles from './NotesList.module.scss';

export default function NotesList({ listOfNotesCoords }) {
	return (
		<div className={styles['notes-list']}>
			{listOfNotesCoords.map(({ x, y }, index) => {
				return <Note key={`${x}__${index}`} id={index} x={x} y={y} />;
			})}
		</div>
	);
}
