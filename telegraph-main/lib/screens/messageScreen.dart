import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../Networking/form_repsonse.dart';
import '../Networking/sockets.dart';
import '../widgets/message_box.dart';

class MessageScreen extends StatefulWidget {
  static const String id = "MessagingScreen";
  const MessageScreen({super.key});

  @override
  State<MessageScreen> createState() => _MessageScreenState();
}

class _MessageScreenState extends State<MessageScreen> {
  String msg = "";
  List<MsgBox> messages = [];
  void setSocket() {
    int flag = 0;
    String receiverid =
        Provider.of<FormResponse>(context, listen: false).receiverId;
    if (receiverid != "all") flag = 1;
    socket.on('message', (data) {
      if (messages.isEmpty || data['method'] == "create") {
        messages.add(MsgBox(
          msg: data["message"],
          name: data['userName'] ?? "null",
        ));
      } else if (data["method"] == 'update') {
        messages[messages.length - 1] = MsgBox(
          msg: data['message'],
          name: data['userName'] ?? "null",
        );
      }
      if (mounted) {
        setState(() {
          messages;
        });
      }
    });
  }

  @override
  void initState() {
    setSocket();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 20),
        child: Center(
          child: SingleChildScrollView(
            physics: ScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: messages,
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }
}
