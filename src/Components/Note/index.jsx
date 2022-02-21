import React, { useRef, useState } from 'react';
import ContextMenu from './contextMenu';
import styles from './Notes.module.scss';

export default function Note(notesCoords) {
	const { id, x, y, text, cardColor } = notesCoords;
	const noteRef = useRef(null);
	const [cardCoord, setCardCoord] = useState({ id, x, y });

	const [cardColorState, changeCardColor] = useState(cardColor || '#2E4057');

	const listOfNotesCoordsFromLocalStorage =
		JSON.parse(localStorage.getItem('listOfNotesCoords')) || [];

	const findNoteAndChangeData = data => {
		let currentCardIndex = listOfNotesCoordsFromLocalStorage.findIndex(
			notes => {
				return notes.id === id;
			},
		);

		if (listOfNotesCoordsFromLocalStorage[currentCardIndex]) {
			listOfNotesCoordsFromLocalStorage[currentCardIndex] = {
				...listOfNotesCoordsFromLocalStorage[currentCardIndex],
				...data,
			};
			localStorage.setItem(
				'listOfNotesCoords',
				JSON.stringify(listOfNotesCoordsFromLocalStorage),
			);
		}
	};

	const changeCardColorWrapper = color => {
		changeCardColor(color);
		findNoteAndChangeData({ cardColor: color });
	};
	const [contextMenuProps, setContextMenuProps] = useState({
		id,
		isMenuActive: false,
	});

	const placeholderLogicForNote = ({ currentCardContent = text }) => {
		if (currentCardContent === 'Note content') {
			noteRef.current.textContent = '';
		} else if (currentCardContent === '') {
			noteRef.current.textContent = 'Note content';
		} else {
			noteRef.current.textContent = currentCardContent;
		}
	};
	const saveNote = () => {
		noteRef.current.contentEditable = false;
		const currentCardContent = noteRef.current.textContent;
		placeholderLogicForNote({ currentCardContent });
		findNoteAndChangeData({ text: currentCardContent });
	};

	const hideContextMenu = () => {
		setContextMenuProps(prevState => ({
			...prevState,
			isMenuActive: false,
		}));
	};

	return (
		<>
			<div
				key={`${cardCoord.x}__${id}`}
				data-noteid={id}
				className={styles['notes']}
				draggable={true}
				style={{
					'--notes-top': `${cardCoord.y}px`,
					'--notes-left': `${cardCoord.x}px`,
					'--notes-background': cardColorState,
				}}
				onClick={e => {
					e.stopPropagation();
					e.preventDefault;
					noteRef.current.contentEditable = true;

					noteRef.current.focus();
					const currentCardContent = noteRef.current.textContent;
					placeholderLogicForNote({ currentCardContent });
					hideContextMenu();
				}}
				onContextMenu={e => {
					e.preventDefault();
					setContextMenuProps({
						id,
						isMenuActive: !contextMenuProps.isMenuActive,
						x: e.clientX,
						y: e.clientY,
					});
				}}
				onDragEnd={({ clientX, clientY }) => {
					setCardCoord({
						id,
						x: clientX,
						y: clientY,
					});
					findNoteAndChangeData({
						id,
						x: clientX,
						y: clientY,
					});
					hideContextMenu();
					return false;
				}}
			>
				<h3>Note {id}</h3>
				<p
					className={styles['notes__content']}
					ref={noteRef}
					onBlur={saveNote}
					onDoubleClick={e => e.stopPropagation()}
				>
					{text || ' Note content'}
				</p>
			</div>
			<ContextMenu
				{...contextMenuProps}
				changeCardColor={changeCardColorWrapper}
				hideContextMenu={hideContextMenu}
			/>
		</>
	);
}
