import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:telegraph_simu/widgets/directingButton.dart';
import 'package:telegraph_simu/widgets/twoRowButton.dart';
import '../Networking/form_repsonse.dart';
import '../Networking/sockets.dart';
import 'home_screen.dart';

class DirectingScreen extends StatefulWidget {
  static const String id = "DirectingScreen";
  const DirectingScreen({super.key});

  @override
  State<DirectingScreen> createState() => _DirectingScreenState();
}

class _DirectingScreenState extends State<DirectingScreen> {
  FormResponse? formResponse;
  void sentData() {
    formResponse = Provider.of<FormResponse>(context, listen: false);
    // socket.emit('start', {
    //   'userName': formResponse?.userName,
    //   'userId': formResponse?.uid,
    // });
  }

  List<Widget> channels = [];
  int flag = 0;

  @override
  void initState() {
    sentData();
    socket.emit("channels", "hello");
    socket.on('channels', (data) {
      print(data);
      if (data.length % 2 == 1) {
        flag = 1;
      } else {
        flag = 0;
      }
      for (int i = 0; i < data.length; i += 2) {
        if (flag == 1 && i == data.length - 1) {
          channels.add(
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 18),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  DirectingButton(
                    firstName: formResponse?.uid == data[i]["userId"]
                        ? "All"
                        : data[i]['userName'],
                    userId: data[i]["userId"],
                    onPressed: () {
                      formResponse?.setId(data[i]["userId"]);
                      Navigator.pushReplacementNamed(context, HomeScreen.id);
                    },
                  ),
                  const SizedBox(
                    width: 30,
                  ),
                  const SizedBox(),
                ],
              ),
            ),
          );
        } else {
          channels.add(TwoRowButton(
            firstName: formResponse?.uid == data[i]["userId"]
                ? "All"
                : data[i]['userName'],
            secondName: formResponse?.uid == data[i + 1]["userId"]
                ? "All"
                : data[i + 1]["userName"],
            firstId: data[i]["userId"],
            firstPressed: () {
              formResponse?.setId(data[i]["userId"]);
              Navigator.pushReplacementNamed(context, HomeScreen.id);
            },
            secondId: data[i + 1]["userId"],
            secondPressed: () {
              formResponse?.setId(data[i + 1]["userId"]);
              Navigator.pushReplacementNamed(context, HomeScreen.id);
            },
          ));
        }
      }
      if (mounted) {
        setState(() {
          channels;
        });
      }
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Center(
            child: Padding(
          padding: EdgeInsets.only(top: 15),
          child: Text(
            "Available channels",
            style: TextStyle(fontFamily: "RiotSquad"),
          ),
        )),
        backgroundColor: const Color(0xFFEAD196),
        automaticallyImplyLeading: false,
      ),
      body: Padding(
        padding: EdgeInsets.fromLTRB(20, 20, 20, 10),
        child: SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          child: Column(
            children: channels,
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
