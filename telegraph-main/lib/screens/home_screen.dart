import 'dart:async';
import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:telegraph_simu/screens/directing_screen.dart';
import 'package:telegraph_simu/screens/messageScreen.dart';
import '../Networking/form_repsonse.dart';
import '../Networking/sockets.dart';

class HomeScreen extends StatefulWidget {
  HomeScreen({Key? key}) : super(key: key);
  static const String id = "HomeScreen";

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool isPressed = false;
  String morseCode = "";
  Timer? timer;
  Timer? timerLong;
  bool isLongPressed = false;

  void _startOperation() {
    timerLong = Timer(const Duration(milliseconds: 250), () {
      print('LongPress Event');
      isLongPressed = true;
    });
  }

  void addZeroes(int count) {
    if (count > 15) {
      setState(() {
        morseCode = "";
      });
      socket.emit('message', {
        "message": morseCode,
        "userId": formResponse?.uid,
        "receiverId": formResponse?.receiverId,
      });
      return;
    }
    timer = Timer(const Duration(milliseconds: 250), () {
      if (!isPressed && count < 16) {
        setState(() {
          morseCode += '0';
          socket.emit('message', {
            "message": morseCode,
            "userId": formResponse?.uid,
            "receiverId": formResponse?.receiverId,
          });
          addZeroes(
              count + 1); // Add zero after delay if button is still pressed
        });
      }
    });
  }

  AudioPlayer player = AudioPlayer();

  Future<void> setSound() async {
    await player.setSourceAsset("beep.wav");
    await player.resume();
    await player.pause();
  }

  String decodedTxt = "";

  FormResponse? formResponse;
  @override
  void initState() {
    formResponse = Provider.of<FormResponse>(context, listen: false);
    setSound();
    socket.connect();
    socket.on('start', (data) {
      print('Message from server: $data');
    });
    socket.on('message', (data) {
      setState(() {
        decodedTxt = data["message"];
      });
    });
    socket.emit('start', {
      'userName': formResponse?.userName,
      'userId': formResponse?.uid,
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.max,
          children: [
            // TextButton(
            //   onPressed: () {
            //     setState(() {
            //       morseCode = "";
            //       timer?.cancel(); // Clear Morse code
            //     });
            //   },
            //   child: const Text("Clear"),
            // ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.3,
            ),
            Column(
              children: [
                Container(
                  height: 75,
                  width: 200,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      color: Colors.brown.shade500, // Border color
                      width: 2.0,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      decodedTxt,
                      style: TextStyle(
                          color: Colors.black,
                          fontFamily: "SpecialElite",
                          fontSize: 20),
                    ),
                  ),
                ),
                SizedBox(
                  height: 70,
                ),
                Center(
                  child: GestureDetector(
                    onTapDown: (_) async {
                      await player.resume();
                      setState(() {
                        isPressed = true;
                        timer?.cancel(); // Button is pressed
                        // Add one when pressed
                      });
                      timerLong?.cancel();
                      _startOperation();
                      if (!isLongPressed) {
                        print("Is a onTap event");
                      } else {
                        isLongPressed = false;
                      }
                    },
                    onTap: () {
                      setState(() {
                        if (!isLongPressed) {
                          morseCode += '10';
                        } else {
                          morseCode += "1110";
                        }
                      });
                      socket.emit('message', {
                        "message": morseCode,
                        "userId": formResponse?.uid,
                        "receiverId": formResponse?.receiverId,
                      });
                      print(formResponse?.receiverId);
                      print(formResponse?.uid);
                    },
                    onTapUp: (_) async {
                      await player.pause();
                      if (await player.getCurrentPosition() ==
                          await player.getDuration()) {
                        await setSound();
                      }
                      await player.seek(const Duration(milliseconds: 50));
                      setState(() {
                        isPressed = false; // Button is released
                        // Start adding zeroes after delay
                      });
                      addZeroes(0);
                    },
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                        minWidth: 145,
                        minHeight: 145,
                        maxWidth: 150,
                        maxHeight: 150,
                      ),
                      child: Container(
                        height: isPressed ? 145 : 150,
                        decoration: BoxDecoration(
                          gradient: RadialGradient(
                            center: Alignment.center,
                            radius: 1,
                            colors: [
                              isPressed
                                  ? const Color.fromRGBO(230, 70, 50, 10)
                                  : const Color.fromRGBO(
                                      251, 63, 63, 1), // rgba(251,63,63,1)
                              isPressed
                                  ? const Color.fromRGBO(80, 25, 15, 7)
                                  : const Color.fromRGBO(
                                      58, 14, 5, 1), // rgba(58,14,5,1)
                            ],
                            stops: const [
                              0.0,
                              1.0
                            ], // Optional, defines where each color begins and ends
                          ),
                          shape: BoxShape.circle,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.15,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Expanded(
                    child: TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      onPressed: () {
                        Navigator.pushNamed(context, MessageScreen.id);
                      },
                      child: const Padding(
                        padding: EdgeInsets.symmetric(vertical: 30),
                        child: Text(
                          "Received Messages",
                          style: TextStyle(
                              color: Colors.black, fontFamily: "SpecialElite"),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Expanded(
                    child: TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      onPressed: () {
                        Navigator.pushNamed(context, DirectingScreen.id);
                      },
                      child: const Padding(
                        padding: EdgeInsets.symmetric(vertical: 30),
                        child: Text(
                          "Channel Select",
                          style: TextStyle(
                              color: Colors.black, fontFamily: "SpecialElite"),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // const SizedBox(height: 20),
            // Text(
            //   "Morse Code: $morseCode",
            //   style: TextStyle(fontSize: 18),
            // ),
            // SizedBox(height: 20),
            //
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    socket.disconnect();
    super.dispose();
  }
}
