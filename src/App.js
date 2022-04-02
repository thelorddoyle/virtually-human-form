import Form from './components/Form'
import './styles/general.css'

function App({ callback }) {
  // Callback will be called when the div is first created.
  return (
    <div className='app' ref={callback}>
      <Form />
    </div>
  );
}

export default App;