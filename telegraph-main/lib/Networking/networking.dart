import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;

class Networking {
  final String url = "http://192.168.11.199:3001";
  http.Response? response;

  Future<dynamic> loginReq(String uName, String pass) async {
    try {
      response = await http.post(
        Uri.parse("$url/users/auth"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'username': uName,
          'password': pass,
        }),
      );
      if (response!.body != "failed") return jsonDecode(response!.body);
    } catch (e) {
      debugPrint("login request failed : $e");
    }
  }
}
