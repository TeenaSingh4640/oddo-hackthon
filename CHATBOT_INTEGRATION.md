# ReWearBot Integration Guide

This guide explains how to use and update the ReWearBot chatbot integration.

## 🚀 Features

- **Text Chat**: Send text messages to the chatbot
- **Voice Chat**: Record and send voice messages
- **Audio Response**: Bot responds with both text and audio
- **Conversation History**: Maintains context across messages
- **Floating UI**: Accessible from any page via floating button

## 📁 File Structure

```
Backend/
├── app/api/endpoints/chatbot.py    # Chatbot API endpoints
├── update_chatbot.py               # Script to update from notebook
└── odoo_bot_.ipynb                # Original chatbot notebook

client/
├── src/components/ChatBot.tsx      # Frontend chat component
└── src/app/layout.tsx              # Layout with chatbot integration
```

## 🔧 Setup Instructions

### Backend Setup

1. **Install Dependencies**:
   ```bash
   cd Backend
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Start the Backend Server**:
   ```bash
   cd Backend
   source venv/bin/activate
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Install Dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Start the Frontend Server**:
   ```bash
   cd client
   npm run dev
   ```

## 🎯 API Endpoints

### Text Chat
- **POST** `/api/v1/chatbot/chat`
- **Body**: `{ "message": "string", "conversation_history": [] }`
- **Response**: `{ "response": "string", "audio_base64": "string", "sentiment": "string" }`

### Voice Chat
- **POST** `/api/v1/chatbot/voice-chat`
- **Body**: Form data with `audio_file`
- **Response**: `{ "response": "string", "audio_base64": "string", "sentiment": "string", "user_message": "string" }`

### Health Check
- **GET** `/api/v1/chatbot/health`
- **Response**: `{ "status": "healthy", "service": "ReWearBot" }`

## 🔄 Updating the Chatbot

When you modify the `odoo_bot_.ipynb` file, you can update the API endpoints using the provided script:

### Automatic Update
```bash
cd Backend
source venv/bin/activate
python update_chatbot.py
```

This script will:
1. Extract the latest code from your notebook
2. Update the system prompt
3. Update the API key
4. Preserve the existing API structure

### Manual Update Steps

If you need to make more complex changes:

1. **Update System Prompt**: Modify the `SYSTEM_PROMPT` in `Backend/app/api/endpoints/chatbot.py`

2. **Update API Key**: Change the `api_key` in the same file

3. **Add New Features**: 
   - Add new functions to the `ReWearBot` class
   - Create new endpoints in `chatbot.py`
   - Update the frontend component if needed

4. **Restart the Server**: After any changes, restart your FastAPI server

## 🎨 Frontend Customization

### ChatBot Component Features

- **Floating Button**: Always accessible chat button
- **Voice Recording**: Click microphone to record voice messages
- **Audio Toggle**: Enable/disable audio responses
- **Conversation History**: Maintains context across sessions
- **Responsive Design**: Works on mobile and desktop

### Customization Options

1. **Styling**: Modify the CSS classes in `ChatBot.tsx`
2. **Position**: Change the floating button position
3. **Size**: Adjust the chat window dimensions
4. **Animations**: Customize Framer Motion animations

## 🐛 Troubleshooting

### Common Issues

1. **Audio Not Working**:
   - Check browser permissions for microphone
   - Ensure HTTPS is used (required for microphone access)
   - Verify audio is enabled in the chat interface

2. **API Errors**:
   - Check if backend server is running
   - Verify API key is valid
   - Check network connectivity

3. **Voice Recognition Issues**:
   - Ensure clear audio input
   - Check microphone permissions
   - Try different browsers

### Debug Steps

1. **Check Backend Logs**:
   ```bash
   cd Backend
   source venv/bin/activate
   uvicorn app.main:app --reload --log-level debug
   ```

2. **Check Frontend Console**:
   - Open browser developer tools
   - Look for errors in the console
   - Check network tab for API calls

3. **Test API Directly**:
   ```bash
   curl -X POST http://localhost:8000/api/v1/chatbot/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello", "conversation_history": []}'
   ```

## 🔮 Future Enhancements

### Potential Improvements

1. **File Upload**: Allow users to upload images of clothing
2. **Voice Cloning**: Use user's voice for responses
3. **Multi-language**: Support multiple languages
4. **Offline Mode**: Cache responses for offline use
5. **Analytics**: Track conversation patterns
6. **Integration**: Connect with inventory system

### Adding New Features

1. **Backend**: Add new endpoints in `chatbot.py`
2. **Frontend**: Update `ChatBot.tsx` component
3. **Testing**: Test thoroughly before deployment
4. **Documentation**: Update this guide

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the API documentation
3. Test with the provided examples
4. Check server logs for detailed error messages

## 🎉 Success!

Your ReWearBot is now integrated and ready to help users with clothing swaps! The chatbot will appear as a floating button on all pages and can handle both text and voice interactions. 