import 'package:flutter/material.dart';

class ChatPage extends StatefulWidget {
  @override
  _ChatPageState createState() => _ChatPageState();
}

class ChatMessage {
  final String message;
  final bool isSentByUser;

  ChatMessage({required this.message, required this.isSentByUser});
}

class _ChatPageState extends State<ChatPage> {
  final List<ChatMessage> _chatMessages = [
    ChatMessage(message: 'Hello', isSentByUser: false),
    ChatMessage(message: 'How are you?', isSentByUser: false),
    ChatMessage(
        message: 'I am doing great, thanks for asking!', isSentByUser: true),
  ];
  final TextEditingController _textEditingController = TextEditingController();

  void _sendMessage() {
    setState(() {
      final message = _textEditingController.text;
      _chatMessages.add(ChatMessage(message: message, isSentByUser: true));
      _textEditingController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chat'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: _chatMessages.length,
              itemBuilder: (BuildContext context, int index) {
                return Align(
                  alignment: _chatMessages[index].isSentByUser
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(
                      vertical: 5.0,
                      horizontal: 10.0,
                    ),
                    padding: const EdgeInsets.all(10.0),
                    decoration: BoxDecoration(
                      color: _chatMessages[index].isSentByUser
                          ? Colors.blue[100]
                          : Colors.grey[300],
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: Text(_chatMessages[index].message),
                  ),
                );
              },
            ),
          ),
          Divider(height: 1),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _textEditingController,
                    decoration: InputDecoration(
                      hintText: 'Type a message...',
                      border: InputBorder.none,
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.send),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
