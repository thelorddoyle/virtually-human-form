import Form from './components/form'

function App({ callback }) {
  // Callback will be called when the div is first created.
  return (
    <div ref={callback}>
      <Form />
    </div>
  );
}

export default App;