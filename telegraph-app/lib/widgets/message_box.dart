import 'package:flutter/material.dart';

class MsgBox extends StatelessWidget {
  const MsgBox({super.key, required this.msg, required this.name});
  final String msg;
  final String name;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(4.0),
      child: Material(
        color: msg.isEmpty ? Colors.transparent : const Color(0xFFF3EDC8),
        borderRadius: BorderRadius.circular(10),
        elevation: msg.isEmpty ? 0 : 3,
        child: Container(
          decoration: BoxDecoration(
            color: msg.isEmpty ? Colors.transparent : const Color(0xFFF3EDC8),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(15.0),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text(
                        name,
                        style: TextStyle(
                            color:
                                msg.isEmpty ? Colors.transparent : Colors.black,
                            fontFamily: "SpecialElite",
                            fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 5,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text(
                        msg,
                        style: TextStyle(fontFamily: "SpecialElite"),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
