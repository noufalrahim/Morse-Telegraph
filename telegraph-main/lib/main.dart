import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:telegraph_simu/screens/directing_screen.dart';
import 'package:telegraph_simu/screens/home_screen.dart';
import 'package:telegraph_simu/screens/login_screen.dart';
import 'package:telegraph_simu/screens/messageScreen.dart';

import 'Networking/form_repsonse.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<FormResponse>(
      create: (context) => FormResponse(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        initialRoute: LoginScreen.id,
        theme: ThemeData(scaffoldBackgroundColor: const Color(0xFFEAD196)),
        routes: {
          HomeScreen.id: (context) => HomeScreen(),
          DirectingScreen.id: (context) => DirectingScreen(),
          MessageScreen.id: (context) => MessageScreen(),
          LoginScreen.id: (context) => LoginScreen(),
        },
      ),
    );
  }
}
