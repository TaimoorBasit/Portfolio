// Test script to check API endpoints on Netlify
// Run this in your browser console on the live Netlify site

const testAPIs = async () => {
  console.log('🔍 Testing API endpoints on Netlify...')
  
  const endpoints = [
    '/api/projects',
    '/api/reviews', 
    '/api/about',
    '/api/contact',
    '/api/media',
    '/api/analytics'
  ]
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\n📡 Testing ${endpoint}...`)
      const response = await fetch(endpoint)
      const data = await response.json()
      
      console.log(`✅ ${endpoint} Status: ${response.status}`)
      console.log(`📊 Response:`, data)
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`📈 Data length: ${data.data.length}`)
        if (data.data.length > 0) {
          console.log(`📝 Sample item:`, data.data[0])
        }
      } else if (Array.isArray(data)) {
        console.log(`📈 Direct array length: ${data.length}`)
        if (data.length > 0) {
          console.log(`📝 Sample item:`, data[0])
        }
      } else {
        console.log(`⚠️ Unexpected response format`)
      }
      
    } catch (error) {
      console.error(`❌ ${endpoint} Error:`, error)
    }
  }
  
  console.log('\n🎯 API Test Complete!')
}

// Run the test
testAPIs()
