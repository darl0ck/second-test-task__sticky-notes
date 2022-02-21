import React, { useRef, useState, useEffect } from 'react';
import Note from '../Note';
import DeleteZone from './deleteZone';
import styles from './NotesBoard.module.scss';

export default function NotesBoard() {
	const listOfNotesCoordsFromLocalStorage =
		JSON.parse(localStorage.getItem('listOfNotesCoords')) || [];
	const [listOfNotesCoords, setCoords] = useState(
		listOfNotesCoordsFromLocalStorage,
	);
	useEffect(() => {
		localStorage.setItem(
			'listOfNotesCoords',
			JSON.stringify(listOfNotesCoords),
		);
	}, [listOfNotesCoords]);
	const setCoordsForNotesHof = ({ clientX, clientY, filteredNotesArray }) => {
		if (filteredNotesArray) {
			setCoords(filteredNotesArray);
		} else {
			setCoords(oldArray => [
				...oldArray,
				{ id: Date.now(), x: clientX, y: clientY },
			]);
		}
	};
	const [showRemoveZone, setShowabilityOfRemoveZone] = useState(false);
	let currentElementId = useRef(null);
	const createNoteOnDoubleClick = ({ clientX, clientY }) => {
		setCoordsForNotesHof({ clientX, clientY });
	};
	return (
		<div
			className={styles['notes-board']}
			onDoubleClick={createNoteOnDoubleClick}
			onDragStart={({ target }) => {
				target.style.opacity = 0.009;
				currentElementId.current = target?.dataset?.noteid;
				setShowabilityOfRemoveZone(true);
			}}
			onDragEnd={() => {
				setShowabilityOfRemoveZone(false);
			}}
			onDragOver={e => e.preventDefault()}
		>
			{listOfNotesCoords.map(({ id, x, y, text, cardColor }) => {
				return (
					<Note
						key={`${x}__${id}`}
						id={id}
						x={x}
						y={y}
						text={text}
						cardColor={cardColor}
					/>
				);
			})}

			<DeleteZone
				showRemoveZone={showRemoveZone}
				onDrop={() => {
					const filteredNotesArray = listOfNotesCoords.filter(({ id }) => {
						return id !== +currentElementId.current;
					});
					setCoordsForNotesHof({ filteredNotesArray });
					setShowabilityOfRemoveZone(false);
				}}
			/>
		</div>
	);
}
