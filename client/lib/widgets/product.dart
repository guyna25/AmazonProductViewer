import 'package:flutter/material.dart';

class ProductItem extends StatelessWidget {
  final Map<String, String> product;
  const ProductItem({
    Key? key,
    required this.product,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10.0),
      // height: 150.0,
      // width: 200.0,
      child: Column(
        children: [
          SizedBox(
            height: 100,
            width: 100,
            child: Image.network(
              product["image"]!,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          SizedBox(
            height: 30,
            width: 100,
            child: Text(
              product["name"]!,
              maxLines: 1,
              overflow: TextOverflow.clip,
            ),
          ),
          Text(product["volume"]!),
          Text(product["price"]!),
          Text(product["rating"]!),
        ],
      ),
    );
  }
}
