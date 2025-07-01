import React, { useEffect, useRef, useState } from 'react';
import ChatApp from './ChatApp';
import socket from './Socket';
import ScribbleGame from './scribble';
import Testy from './test';
import Scoreboard from './Scoreboard';




function App() {
  //variable to manage the selected game
  const [selectedGame, setSelectedGame] = useState('Scribble');
  const [players, setPlayers] = useState([]);
  // rendering function to switch between games
  const renderGameComponent = () => {
    switch (selectedGame) {
      case 'Scribble':
        return <ScribbleGame />;


      case 'Testy':
        return <Testy />;  

      default:
        return <ScribbleGame />;
    }
  };

  const handlePlayerList = (playerList) => {
    console.log("👥 Player list received at app:", playerList);
    setPlayers(playerList);
  }


  socket.on('request-player-list',handlePlayerList);

  return (
    <div className="app-container" style ={{width: '100vw'}}> 
      {/* Top Navbar */}
      <nav className="game-navbar">
        <button
          onClick={() => setSelectedGame('Scribble')}
          className={selectedGame === 'Scribble' ? 'active' : ''}
        >
          Scribble
        </button>
        <button
          onClick={() => setSelectedGame('Testy')}
          className={selectedGame === 'Testy' ? 'active' : ''}
        >
          Testing
        </button>
      </nav>

      {/* Main Content */}
      <div className="content-area">
        <div className="chat-pane">
          {/* scoreboard */}
          <Scoreboard />
          {/* Chat Application */}
          
          <ChatApp />
        </div>

        <main className="game-pane">
          <div className="game-content-area">
            {renderGameComponent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;