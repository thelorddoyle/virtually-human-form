import Form from './components/Form';
import './styles/general.css';
import './styles/form.css';
import './styles/imageUpload.css';
import './styles/successBanner.css';
import './styles/datePicker.css'
import './styles/buttons.css'

function App({ callback }) {
  // Callback will be called when the div is first created.
  return (
    <div data-testid="app-container" className='app' ref={callback}>
        <Form />;
    </div>
  );
}

export default App;