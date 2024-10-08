import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import sound from "./assets/sounds/Infecticide-11-Pizza-Spinoza.mp3"
import logo from "./assets/img/js-logo.png";
import pizzaBackground from "./assets/img/pizza.jpg";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ backgroundImage: `url(${pizzaBackground})` }}>
      <header>
            <h1 className="animate__animated animate__bounce">We love Pizza</h1>
          </header>

          <main>
            <p>My HomePage</p>
            <p>
              Because we love JS, you can also click on the header to stop / start the
              music ; )
            </p>

            <audio id="audioPlayer" controls autoPlay>
              <source
                src={sound}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </main>

          <footer>
            <h1 className="animate__animated animate__bounce animate__delay-2s">
              But we also love JS
            </h1>
            <img src={logo} alt="" />
          </footer>
	</div>
  );
}

export default App;
