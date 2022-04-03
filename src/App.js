import Form from './components/Form'
import './styles/general.css'
import './styles/form.css'
import './styles/imageUpload.css'

function App({ callback }) {
  // Callback will be called when the div is first created.
  return (
    <div className='app' ref={callback}>
        <Form />
    </div>
  );
}

export default App;