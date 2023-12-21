import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const MyAlert = () => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {showAlert && (
        <Alert className='mt-4' variant="dark" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Libreria Nyarlathotep </Alert.Heading>
          <p>
           Benvenuti nel Caos Strisciante
          </p>
        </Alert>
      )}
    </div>
  );
};

export default MyAlert;
