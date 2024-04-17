// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
// import FakeStackOverflow from './components/fakestackoverflow.js'
import WelcomePage from './pages/WelcomePage.jsx'

function App() {
  return (
    <section className="fakeso">
      <WelcomePage />
    </section>
  );
}

export default App;
