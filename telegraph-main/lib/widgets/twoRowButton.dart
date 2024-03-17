import 'package:flutter/material.dart';
import 'package:telegraph_simu/widgets/directingButton.dart';

class TwoRowButton extends StatelessWidget {
  final String firstName;
  final String firstId;
  final VoidCallback firstPressed;
  final String secondId;
  final String secondName;
  final VoidCallback secondPressed;
  const TwoRowButton(
      {super.key,
      required this.firstName,
      required this.secondName,
      required this.firstId,
      required this.firstPressed,
      required this.secondId,
      required this.secondPressed});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 15),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          DirectingButton(
              firstName: firstName, userId: firstId, onPressed: firstPressed),
          const SizedBox(
            width: 30,
          ),
          DirectingButton(
              firstName: secondName, userId: secondId, onPressed: secondPressed)
        ],
      ),
    );
  }
}
