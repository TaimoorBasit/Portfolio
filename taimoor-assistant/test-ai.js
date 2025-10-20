// Simple test script to verify AI assistant responses
const fetch = require('node-fetch');

async function testAI() {
  try {
    console.log('Testing AI Assistant...\n');
    
    const testMessages = [
      'What websites do you build?',
      'How much does it cost?',
      'What technologies do you use?',
      'How long does it take?',
      'Contact info'
    ];
    
    for (const message of testMessages) {
      console.log(`User: ${message}`);
      
      try {
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`AI: ${data.reply}`);
          console.log(`Length: ${data.reply.length} characters\n`);
        } else {
          console.log(`Error: ${response.status} - ${response.statusText}\n`);
        }
      } catch (error) {
        console.log(`Error: ${error.message}\n`);
      }
      
      // Wait a bit between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAI();
