import React from 'react';

const Notification = ({ data }) => {
  if (!data) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-xl text-white font-bold animate-bounce ${data.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
      {data.msg}
    </div>
  );
};

export default Notification;