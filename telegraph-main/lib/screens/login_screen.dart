import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:telegraph_simu/screens/directing_screen.dart';
import 'package:telegraph_simu/screens/home_screen.dart';
import 'package:telegraph_simu/screens/messageScreen.dart';

import '../Networking/form_repsonse.dart';
import '../Networking/networking.dart';
import '../widgets/login_field.dart';
import '../widgets/main_text_button.dart';

class LoginScreen extends StatefulWidget {
  static const String id = "loginScreen";

  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String uName = "";
  String pass = "";
  bool isLoad = false;

  var response;

  bool isError = false;
  Networking networking = Networking();

  void pushScreen(String screenName) {
    context.mounted
        ? Navigator.pushReplacementNamed(context, screenName)
        : null;
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFEAD196),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(20, 45, 20, 10),
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.1,
              ),
              Padding(
                padding: EdgeInsets.symmetric(
                    vertical: MediaQuery.of(context).size.height / 30),
                child: const Column(
                  children: [
                    Text(
                      "Welcome to",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.w700,
                          fontFamily: "RiotSquad"),
                    ),
                    Text(
                      "Telegraph",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 55,
                          fontWeight: FontWeight.w700,
                          fontFamily: "RiotSquad"),
                    ),
                  ],
                ),
              ),
              LoginField(
                title: "User Id",
                onChanged: (value) {
                  uName = value;
                },
                needHiding: false,
                isError: isError,
                errorText: 'UserId',
                isId: false,
              ),
              SizedBox(
                height: MediaQuery.of(context).size.height / 50,
              ),
              LoginField(
                title: "Password",
                onChanged: (value) {
                  pass = value;
                },
                needHiding: true,
                isError: isError,
                errorText: 'Password',
                isId: false,
              ),
              SizedBox(
                height: MediaQuery.of(context).size.height / 25,
              ),
              MainTextButtton(
                isLoad: isLoad,
                onPressed: () async {
                  uName.trim();
                  uName.toLowerCase();
                  if (uName != "" && pass != "") {
                    setState(() {
                      isLoad = true;
                    });
                    var response = await networking.loginReq(uName, pass);
                    if (response == null) {
                      setState(() {
                        isLoad = false;
                        isError = true;
                      });
                    } else {
                      context.mounted
                          ? Provider.of<FormResponse>(context, listen: false)
                              .setData(response)
                          : null;
                      setState(() {
                        isLoad = false;
                        isError = false;
                      });
                      context.mounted
                          ? Navigator.pushReplacementNamed(
                              context,
                              HomeScreen.id,
                            )
                          : null;
                    }
                  }
                },
                title: "Login",
              ),
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.19,
              ),
              const Text(
                "Version : v 3.0.1",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w200),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
