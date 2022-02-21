import './App.scss';
import NotesBoard from './Components/Notes-board';

function App() {
	return (
		<div className="app">
			<header className="app__header"></header>
			<NotesBoard />
			<footer></footer>
		</div>
	);
}

export default App;
