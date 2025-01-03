import React from "react";

const QRCodeDisplay = ({ qrCodeUrl }) => {
  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-md">
      {qrCodeUrl ? (
        <div className="text-center">
          <h2 className="text-lg font-bold">Your QR Code:</h2>
          <img src={qrCodeUrl} alt="QR Code" className="mx-auto my-4" />
          <a
            href={qrCodeUrl}
            download="qrcode.png"
            className="text-blue-500 underline"
          >
            Download QR Code
          </a>
        </div>
      ) : (
        <p className="text-center text-gray-500">No QR Code generated yet.</p>
      )}
    </div>
  );
};

export default QRCodeDisplay;
