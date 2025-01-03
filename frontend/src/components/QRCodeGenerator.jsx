import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { FiDownload, FiTrash } from 'react-icons/fi';

const QRCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [qrCodeURL, setQRCodeURL] = useState('');
  const [history, setHistory] = useState([]);
  const [size, setSize] = useState(180);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [showCustomization, setShowCustomization] = useState(false);

  const generateQRCode = async () => {
    if (!input.trim()) return;

    try {
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, input, {
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        width: size,
      });

      const url = canvas.toDataURL();

      const isDuplicate = history.some((item) => item.text === input);
      if (!isDuplicate) {
        setQRCodeURL(url);
        setHistory((prev) => [...prev, { url, text: input }]);
      } else {
        setQRCodeURL(url);
      }
    } catch (error) {
      console.error('Error generating QR Code:', error);
    }
  };

  useEffect(() => {
    if (showCustomization && qrCodeURL) {
      generateQRCode();
    }
  }, [size, foregroundColor, backgroundColor]);

  const clearQRCode = () => {
    setInput('');
    setQRCodeURL('');
    setShowCustomization(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        QR Code Generator
      </h1>

      {/* Input Section */}
      <div className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Enter text or URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => {
            generateQRCode();
            setShowCustomization(false);
          }}
          className="w-full bg-blue-500 text-white rounded-lg px-4 py-3 hover:bg-blue-600 shadow-lg transition"
        >
          Generate QR Code
        </button>
      </div>

      {/* QR Code Display */}
      {qrCodeURL && (
        <div className="mt-8 flex flex-col items-center gap-6">
          <img src={qrCodeURL} alt="Generated QR Code" className="w-auto rounded-lg shadow-md" />
          <div className="flex gap-4">
            <a
              href={qrCodeURL}
              download="qrcode.png"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <FiDownload />
              Download
            </a>
            <button
              onClick={clearQRCode}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FiTrash />
              Clear
            </button>
          </div>
        </div>
      )}

      {qrCodeURL && !showCustomization && (
        <button
          onClick={() => setShowCustomization(true)}
          className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-3 hover:bg-gray-300 shadow-md transition mt-4 flex items-center justify-center gap-2"
        >
          Customize QR Code
        </button>
      )}

      {/* Customization Section */}
      {showCustomization && qrCodeURL && (
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center border-b border-gray-300 pb-4">
            Customize QR Code
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Size
              </label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min="100"
                max="500"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Foreground Color
              </label>
              <div
                className="w-14 h-14 rounded-full border-2 border-gray-400 flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg relative"
                style={{ backgroundColor: foregroundColor }}
              >
                <input
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="opacity-0 absolute w-full h-full cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Background Color
              </label>
              <div
                className="w-14 h-14 rounded-full border-2 border-gray-400 flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg relative"
                style={{ backgroundColor: backgroundColor }}
              >
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="opacity-0 absolute w-full h-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code History */}
{history.length > 0 && (
  <div className="mt-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center border-b border-gray-300 pb-4">
      Your QR Code History
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {history.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-4 bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 p-6"
        >
          <div className="w-24 h-24 rounded-lg shadow-md bg-white flex items-center justify-center">
            <img
              src={item.url}
              alt={`QR Code ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center w-full">
            <p className="text-gray-700 text-sm font-medium truncate mb-3">
              {item.text}
            </p>
            <a
              href={item.url}
              download={`qrcode_${index + 1}.png`}
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition"
            >
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
