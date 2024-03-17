import 'package:flutter/material.dart';

class DirectingButton extends StatelessWidget {
  const DirectingButton(
      {super.key,
      required this.firstName,
      required this.userId,
      required this.onPressed});
  final String firstName;
  final String userId;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 4,
      color: const Color(0xFFF3EDC8),
      borderRadius: BorderRadius.circular(10.0),
      child: TextButton(
        onPressed: onPressed,
        style: TextButton.styleFrom(
          minimumSize: const Size.square(100),
          backgroundColor: const Color(0xFFF3EDC8),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
        ),
        child: Text(
          firstName,
          style:
              const TextStyle(color: Colors.black, fontFamily: 'SpecialElite'),
        ),
      ),
    );
  }
}
