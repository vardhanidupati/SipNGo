import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const MENU_ITEMS = [
  { id: '1', name: 'Espresso', category: 'Coffee', price: '$3.50' },
  { id: '2', name: 'Cappuccino', category: 'Coffee', price: '$4.50' },
  { id: '3', name: 'Matcha Latte', category: 'Tea', price: '$5.00' },
  { id: '4', name: 'Iced Green Tea', category: 'Tea', price: '$4.00' },
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>☕ sipNGo</Text>
        <Text style={styles.subtitle}>Order your fresh Coffee & Tea</Text>
      </View>

      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category} • {item.price}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.cartText}>Cart Items: {cart.length}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: 40 },
  header: { padding: 20, backgroundColor: '#6f4e37' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#e0e0e0', marginTop: 4 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemName: { fontSize: 18, fontWeight: '600' },
  itemCategory: { fontSize: 14, color: '#666', marginTop: 4 },
  button: { backgroundColor: '#6f4e37', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee', alignItems: 'center' },
  cartText: { fontSize: 16, fontWeight: 'bold', color: '#333' }
});
