import axios from 'axios';

async function testContactAPI() {
  try {
    console.log('🧪 Testing Contact API...\n');

    const contactData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      mobileNumber: '9876543210',
      orderId: 'ORD-123456',
      issueType: 'Order Related Issue',
      message: 'I have an issue with my recent order. The product quality is not as expected and I would like to return it.'
    };

    console.log('📤 Sending contact form data:');
    console.log(JSON.stringify(contactData, null, 2));
    console.log('\n');

    const response = await axios.post('http://localhost:5000/api/contact', contactData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ API Response Status:', response.status);
    console.log('✅ Response Data:', JSON.stringify(response.data, null, 2));
    console.log('\n✨ Contact form submitted successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

testContactAPI();
