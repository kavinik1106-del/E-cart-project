const validateContact = (data) => {
  const errors = [];

  if (!data.fullName || data.fullName.trim() === '') {
    errors.push('Full name is required');
  }

  if (!data.email || data.email.trim() === '') {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.mobileNumber || data.mobileNumber.trim() === '') {
    errors.push('Mobile number is required');
  } else if (!isValidPhone(data.mobileNumber)) {
    errors.push('Invalid phone number format');
  }

  if (!data.issueType || data.issueType.trim() === '') {
    errors.push('Issue type is required');
  }

  if (!data.message || data.message.trim() === '') {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
};

export { validateContact, isValidEmail, isValidPhone };
