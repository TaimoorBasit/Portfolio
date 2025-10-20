// Test script to verify API endpoints
const testAPIs = async () => {
  console.log('Testing API endpoints...')
  
  try {
    // Test projects API
    const projectsResponse = await fetch('/api/projects')
    const projectsData = await projectsResponse.json()
    console.log('Projects API Response:', projectsData)
    
    // Test reviews API
    const reviewsResponse = await fetch('/api/reviews')
    const reviewsData = await reviewsResponse.json()
    console.log('Reviews API Response:', reviewsData)
    
    // Test about API
    const aboutResponse = await fetch('/api/about')
    const aboutData = await aboutResponse.json()
    console.log('About API Response:', aboutData)
    
  } catch (error) {
    console.error('API Test Error:', error)
  }
}

// Run test when page loads
if (typeof window !== 'undefined') {
  testAPIs()
}
