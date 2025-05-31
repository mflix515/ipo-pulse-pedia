
import React from 'react';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePAN = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

export const validateMobile = (mobile: string): boolean => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

export const formatPAN = (value: string): string => {
  // Remove any non-alphanumeric characters
  let cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  
  // Limit to 10 characters
  cleaned = cleaned.slice(0, 10);
  
  // Format as ABCDE1234F
  if (cleaned.length <= 5) {
    return cleaned.replace(/[^A-Z]/g, '');
  } else if (cleaned.length <= 9) {
    const letters = cleaned.slice(0, 5).replace(/[^A-Z]/g, '');
    const numbers = cleaned.slice(5, 9).replace(/[^0-9]/g, '');
    return letters + numbers;
  } else {
    const letters1 = cleaned.slice(0, 5).replace(/[^A-Z]/g, '');
    const numbers = cleaned.slice(5, 9).replace(/[^0-9]/g, '');
    const letters2 = cleaned.slice(9, 10).replace(/[^A-Z]/g, '');
    return letters1 + numbers + letters2;
  }
};

interface ValidationMessageProps {
  message: string;
  type: 'error' | 'success';
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ message, type }) => {
  return (
    <p className={`text-sm mt-1 ${type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
      {message}
    </p>
  );
};
