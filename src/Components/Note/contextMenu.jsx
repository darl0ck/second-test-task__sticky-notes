import React from 'react';
import styles from './Notes.module.scss';

export default function ContextMenu({
	isMenuActive,
	x,
	y,
	changeCardColor,
	hideContextMenu,
}) {
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);
	return isMenuActive ? (
		<div
			className={styles['notes-context-menu']}
			style={{
				top: y,
				left: x,
			}}
		>
			<ul className={styles['notes-context-menu__list']}>
				<li
					className={styles['notes-context-menu__list--element']}
					onClick={() => {
						changeCardColor(`#${randomColor}` || '#DA4167');
						hideContextMenu();
					}}
				>
					Change color
				</li>
				<li
					className={styles['notes-context-menu__list--element']}
					onClick={() => hideContextMenu()}
				>
					Close menu
				</li>
			</ul>
		</div>
	) : null;
}
