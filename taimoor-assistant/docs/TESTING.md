# Testing Guide - Taimoor Assistant

This document provides comprehensive testing instructions for the Taimoor Assistant chat widget.

## 🧪 Test Categories

### 1. UI Smoke Test

**Objective**: Verify basic UI functionality and appearance

**Steps**:
1. Load the website in a browser
2. Look for the purple floating chat button in bottom-right corner
3. Click the chat button
4. Verify the chat modal opens with smooth animation
5. Check that welcome message appears: "Hi — I'm Taimoor's assistant 👋"
6. Verify quick reply buttons are visible: "Show Projects", "About Muhammad", "Contact", "Book a call"
7. Click the X button to close the modal
8. Verify modal closes with animation

**Expected Results**:
- ✅ Chat button visible and clickable
- ✅ Modal opens with smooth animation
- ✅ Welcome message displays correctly
- ✅ Quick reply buttons are functional
- ✅ Modal closes properly

### 2. Chat Reply Test

**Objective**: Test AI conversation functionality

**Steps**:
1. Open the chat widget
2. Click "Show Projects" quick reply
3. Wait for AI response
4. Verify AI lists 3 sample projects with descriptions
5. Check that project links are clickable
6. Send a custom message: "What technologies do you use?"
7. Verify AI responds with technology list
8. Test with another message: "Tell me about your experience"

**Expected Results**:
- ✅ AI responds to quick replies
- ✅ Project information is accurate and detailed
- ✅ Custom messages receive appropriate responses
- ✅ Responses are relevant and helpful

### 3. Contact Safe-Share Test

**Objective**: Verify contact sharing follows security rules

**Steps**:
1. Open chat widget
2. Ask: "How can I contact Muhammad?"
3. Verify AI asks for confirmation: "You asked for contact. Would you like me to share Muhammad's email, phone, or booking link? (Yes / No)"
4. Type "Yes" to confirm
5. Verify contact snippet appears with:
   - Email: hello@muhammadtaimoor.com
   - Phone: +92-XXX-XXXXXXX
   - Booking link: https://calendly.com/muhammadtaimoor
6. Test without explicit request: Ask "What's your phone number?"
7. Verify AI does NOT share contact without explicit request

**Expected Results**:
- ✅ Contact sharing requires explicit request
- ✅ Confirmation prompt appears
- ✅ Contact information is properly formatted
- ✅ No contact sharing without explicit request

### 4. Handoff Test

**Objective**: Test lead capture and handoff functionality

**Steps**:
1. Open chat widget
2. Say: "I want a quote for my website"
3. Verify handoff form appears
4. Fill out the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "+1234567890" (optional)
   - Message: "I need a portfolio website"
   - Check consent checkbox
5. Click "Send Message"
6. Verify success message appears
7. Check email inbox for lead notification
8. Test form validation:
   - Submit without name (should show error)
   - Submit with invalid email (should show error)
   - Submit without consent (should show error)

**Expected Results**:
- ✅ Handoff form appears when requested
- ✅ Form validation works correctly
- ✅ Success message displays
- ✅ Email notification is sent
- ✅ Lead data is properly formatted

### 5. Rate Limiting Test

**Objective**: Verify rate limiting prevents abuse

**Steps**:
1. Open browser developer tools
2. Go to Network tab
3. Send 15 rapid messages in quick succession
4. Verify all requests succeed (200 status)
5. Send 5 more rapid messages
6. Verify some requests return 429 (Too Many Requests)
7. Wait 1 minute
8. Send another message
9. Verify request succeeds again

**Expected Results**:
- ✅ First 10 requests succeed
- ✅ Requests after limit return 429
- ✅ Rate limit resets after 1 minute
- ✅ Normal operation resumes after reset

### 6. Security Test

**Objective**: Verify no sensitive data is exposed

**Steps**:
1. Open browser developer tools
2. Go to Sources tab
3. Search for "OPENAI_API_KEY" in all files
4. Verify no API keys are present in frontend code
5. Check Network tab for API requests
6. Verify requests go to backend API only
7. Check that no sensitive data is logged in console

**Expected Results**:
- ✅ No API keys in frontend code
- ✅ All AI requests go through backend
- ✅ No sensitive data in browser console
- ✅ CORS properly configured

### 7. Mobile Responsiveness Test

**Objective**: Verify widget works on mobile devices

**Steps**:
1. Open browser developer tools
2. Switch to mobile view (iPhone/Android)
3. Load the website
4. Verify chat button is visible and accessible
5. Tap the chat button
6. Verify modal opens and fits screen properly
7. Test typing and sending messages
8. Test quick reply buttons
9. Test handoff form on mobile
10. Verify all interactions work with touch

**Expected Results**:
- ✅ Chat button visible on mobile
- ✅ Modal fits mobile screen
- ✅ Touch interactions work properly
- ✅ Text input is accessible
- ✅ All features work on mobile

### 8. Session Persistence Test

**Objective**: Verify chat history persists across page reloads

**Steps**:
1. Open chat widget
2. Send 3-4 messages
3. Close the browser tab
4. Reopen the website
5. Open chat widget again
6. Verify previous messages are still there
7. Send a new message
8. Verify conversation continues properly

**Expected Results**:
- ✅ Messages persist across page reloads
- ✅ Session continues properly
- ✅ No data loss on refresh

## 🐛 Common Issues & Solutions

### Issue: AI not responding
**Solution**: Check OpenAI API key in backend .env file

### Issue: Email notifications not working
**Solution**: Verify SMTP credentials and test email sending

### Issue: Rate limiting too strict
**Solution**: Adjust RATE_LIMIT_PER_MIN in environment variables

### Issue: CORS errors
**Solution**: Check CORS_ORIGIN setting matches frontend URL

### Issue: Mobile layout broken
**Solution**: Verify responsive CSS classes and viewport meta tag

## 📊 Performance Testing

### Load Testing
1. Open multiple browser tabs
2. Send messages simultaneously from each tab
3. Monitor response times
4. Check for any errors or timeouts

### Memory Testing
1. Open chat widget
2. Send 50+ messages
3. Monitor browser memory usage
4. Verify no memory leaks

## 🔍 Debugging Tips

1. **Check Browser Console**: Look for JavaScript errors
2. **Check Network Tab**: Verify API requests are successful
3. **Check Backend Logs**: Look for server-side errors
4. **Test API Directly**: Use Postman/curl to test endpoints
5. **Check Environment Variables**: Ensure all required vars are set

## 📝 Test Checklist

- [ ] UI loads correctly
- [ ] Chat widget opens/closes
- [ ] AI responds to messages
- [ ] Quick replies work
- [ ] Contact sharing requires confirmation
- [ ] Handoff form works
- [ ] Email notifications sent
- [ ] Rate limiting works
- [ ] Mobile responsive
- [ ] Session persistence
- [ ] No security vulnerabilities
- [ ] Performance acceptable

## 🚀 Automated Testing

To run automated tests:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📞 Support

If you encounter issues during testing:
1. Check the logs in `backend/logs/`
2. Verify environment variables
3. Test API endpoints directly
4. Create an issue in the repository
