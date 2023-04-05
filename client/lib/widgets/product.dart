import 'package:flutter/material.dart';

class ProductItem extends StatelessWidget {
  final Map<String, String> product;
  const ProductItem({
    Key? key,
    required this.product,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Row(
      children: [
        Container(
            child: Image.network(
          product["image"]!,
          fit: BoxFit.cover,
        )),
        Column(
          children: [
            Container(
                alignment: Alignment.center,
                decoration: BoxDecoration(
                    color: Colors.amber,
                    borderRadius: BorderRadius.circular(15)),
                child: Text(product["name"]!)),
            Container(
                alignment: Alignment.center,
                decoration: BoxDecoration(
                    color: Colors.amber,
                    borderRadius: BorderRadius.circular(15)),
                child: Text(product["volume"]!)),
            Container(
                alignment: Alignment.center,
                decoration: BoxDecoration(
                    color: Colors.amber,
                    borderRadius: BorderRadius.circular(15)),
                child: Text(product["price"]!)),
            Container(
                alignment: Alignment.center,
                decoration: BoxDecoration(
                    color: Colors.amber,
                    borderRadius: BorderRadius.circular(15)),
                child: Text(product["rating"]!)),
          ],
        ),
      ],
    ));
  }
}
