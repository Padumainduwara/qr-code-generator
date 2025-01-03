import QRCodeGenerator from './components/QRCodeGenerator';

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url(/stacked-waves-haikei.svg)' }}
    >
      <QRCodeGenerator />
    </div>
  );
}

export default App;
