import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TouchableOpacity, 
  SafeAreaView, Modal, ScrollView, TextInput, Alert 
} from 'react-native';

// 1. Menu List with Prices in Indian Rupees (₹)
const MENU_ITEMS = [
  // Hot Coffee
  { id: '1', name: 'Espresso', category: 'Hot Coffee', price: '₹140', numericPrice: 140, desc: 'Strong and bold single shot' },
  { id: '2', name: 'Americano', category: 'Hot Coffee', price: '₹180', numericPrice: 180, desc: 'Espresso with hot water' },
  { id: '3', name: 'Cappuccino', category: 'Hot Coffee', price: '₹220', numericPrice: 220, desc: 'Equal parts espresso, steamed milk, and foam' },
  { id: '4', name: 'Café Latte', category: 'Hot Coffee', price: '₹240', numericPrice: 240, desc: 'Smooth espresso with lots of steamed milk' },
  { id: '5', name: 'Mocha', category: 'Hot Coffee', price: '₹260', numericPrice: 260, desc: 'Espresso with chocolate and steamed milk' },
  { id: '6', name: 'Macchiato', category: 'Hot Coffee', price: '₹200', numericPrice: 200, desc: 'Espresso marked with a dollop of foam' },
  { id: '7', name: 'Flat White', category: 'Hot Coffee', price: '₹230', numericPrice: 230, desc: 'Microfoam poured over a double shot of espresso' },
  
  // Iced Coffee
  { id: '8', name: 'Iced Americano', category: 'Iced Coffee', price: '₹200', numericPrice: 200, desc: 'Chilled espresso over refreshing ice and water' },
  { id: '9', name: 'Iced Latte', category: 'Iced Coffee', price: '₹250', numericPrice: 250, desc: 'Chilled espresso with cold milk and ice' },
  { id: '10', name: 'Cold Brew', category: 'Iced Coffee', price: '₹230', numericPrice: 230, desc: 'Steeped for 18 hours for a smooth flavor' },
  { id: '11', name: 'Iced Caramel Macchiato', category: 'Iced Coffee', price: '₹280', numericPrice: 280, desc: 'Vanilla syrup, milk, ice, espresso, and caramel drizzle' },
  { id: '12', name: 'Frappé', category: 'Iced Coffee', price: '₹290', numericPrice: 290, desc: 'Blended iced coffee with whipped cream' },

  // Tea & Infusions
  { id: '13', name: 'Masala Chai', category: 'Tea', price: '₹120', numericPrice: 120, desc: 'Traditional spiced Indian tea with milk' },
  { id: '14', name: 'Matcha Latte', category: 'Tea', price: '₹270', numericPrice: 270, desc: 'Premium Japanese green tea powder with steamed milk' },
  { id: '15', name: 'Earl Grey Tea', category: 'Tea', price: '₹160', numericPrice: 160, desc: 'Black tea infused with bergamot oil' },
  { id: '16', name: 'Jasmine Green Tea', category: 'Tea', price: '₹160', numericPrice: 160, desc: 'Fragrant green tea with jasmine blossoms' },
  { id: '17', name: 'Lemon Honey Ginger Tea', category: 'Tea', price: '₹190', numericPrice: 190, desc: 'Soothing blend with fresh ginger and honey' },

  // Snacks & Pastries
  { id: '18', name: 'Butter Croissant', category: 'Snacks', price: '₹180', numericPrice: 180, desc: 'Flaky, buttery French pastry' },
  { id: '19', name: 'Chocolate Muffin', category: 'Snacks', price: '₹190', numericPrice: 190, desc: 'Rich chocolate muffin with choc-chips' },
  { id: '20', name: 'Blueberry Cheesecake', category: 'Snacks', price: '₹260', numericPrice: 260, desc: 'Creamy cheesecake topped with fresh blueberries' },
  { id: '21', name: 'Avocado Toast', category: 'Snacks', price: '₹310', numericPrice: 310, desc: 'Sourdough toast with smashed avocado and seeds' },
  { id: '22', name: 'Almond Biscotti', category: 'Snacks', price: '₹130', numericPrice: 130, desc: 'Crunchy Italian almond biscuit' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const categories = ['All', 'Hot Coffee', 'Iced Coffee', 'Tea', 'Snacks'];

  const filteredItems = selectedCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.numericPrice, 0);
  };

  const handlePaymentComplete = () => {
    if (!customerName || !tableNumber) {
      Alert.alert('Details Required', 'Please enter your name and table/pickup number.');
      return;
    }
    Alert.alert('Success!', `Order placed for ${customerName}! PhonePe payment verified.`);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>☕ sipNGo</Text>
          <Text style={styles.subtitle}>Fresh Coffee, Tea & Snacks</Text>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={() => setIsCartOpen(true)}>
          <Text style={styles.cartButtonText}>🛒 Cart ({cart.length})</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.catChip, selectedCategory === cat && styles.activeChip]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catText, selectedCategory === cat && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Cart Modal */}
      <Modal visible={isCartOpen} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Your Order Summary</Text>
          <ScrollView style={{ flex: 1, marginVertical: 10 }}>
            {cart.map((item, idx) => (
              <View key={idx} style={styles.cartItemRow}>
                <Text style={styles.cartItemText}>{item.name}</Text>
                <Text style={styles.cartItemText}>{item.price}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total Amount:</Text>
            <Text style={styles.totalAmount}>₹{calculateTotal()}</Text>
          </View>

          <TouchableOpacity 
            style={styles.checkoutButton} 
            onPress={() => {
              if(cart.length === 0) { Alert.alert('Cart is empty'); return; }
              setIsCheckoutOpen(true);
            }}
          >
            <Text style={styles.checkoutButtonText}>Proceed to PhonePe Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={() => setIsCartOpen(false)}>
            <Text style={styles.closeButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* PhonePe QR Payment Modal */}
      <Modal visible={isCheckoutOpen} animationType="fade">
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pay via PhonePe QR</Text>
          <Text style={styles.instructions}>Scan this QR code using your PhonePe app to complete the payment of ₹{calculateTotal()}</Text>
          
          {/* Mock PhonePe QR Code Box */}
          <View style={styles.qrBox}>
            <Text style={styles.qrBrand}>PhonePe Merchant QR</Text>
            <View style={styles.qrMockPlaceholder}>
              <Text style={styles.qrPlaceholderText}>[ SCAN QR ]</Text>
            </View>
            <Text style={styles.upiId}>UPI ID: sipngo@ybl</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#888"
            value={customerName}
            onChangeText={setCustomerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Table Number or Pickup Room"
            placeholderTextColor="#888"
            value={tableNumber}
            onChangeText={setTableNumber}
          />

          <TouchableOpacity style={styles.payButton} onPress={handlePaymentComplete}>
            <Text style={styles.payButtonText}>I Have Paid (Confirm Order)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={() => setIsCheckoutOpen(false)}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: { padding: 20, backgroundColor: '#5b21b6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 13, color: '#ddd', marginTop: 2 },
  cartButton: { backgroundColor: '#7c3aed', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  cartButtonText: { color: '#fff', fontWeight: 'bold' },
  categoryContainer: { paddingVertical: 12, paddingHorizontal: 10, backgroundColor: '#fff' },
  catChip: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#e2e8f0', borderRadius: 20, marginRight: 8, height: 36 },
  activeChip: { backgroundColor: '#5b21b6' },
  catText: { color: '#475569', fontWeight: '600' },
  activeCatText: { color: '#fff' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 14, marginHorizontal: 12, marginVertical: 6, borderRadius: 10, elevation: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  itemDesc: { fontSize: 12, color: '#64748b', marginTop: 2 },
  itemPrice: { fontSize: 14, fontWeight: '600', color: '#5b21b6', marginTop: 4 },
  addButton: { backgroundColor: '#5b21b6', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  modalContainer: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#1e293b' },
  instructions: { textAlign: 'center', color: '#64748b', marginBottom: 15, fontSize: 14 },
  qrBox: { width: 220, height: 230, backgroundColor: '#f8fafc', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#cbd5e1', borderRadius: 12, marginBottom: 20, padding: 10 },
  qrBrand: { fontSize: 12, fontWeight: 'bold', color: '#5b21b6', marginBottom: 6 },
  qrMockPlaceholder: { width: 130, height: 130, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center', borderRadius: 6 },
  qrPlaceholderText: { fontWeight: 'bold', color: '#475569', fontSize: 12 },
  upiId: { marginTop: 8, fontSize: 13, fontWeight: 'bold', color: '#1e293b' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 15 },
  cartItemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  cartItemText: { fontSize: 15, color: '#334155' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderTopWidth: 2, borderTopColor: '#e2e8f0', marginTop: 10 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#5b21b6' },
  checkoutButton: { backgroundColor: '#10b981', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  payButton: { backgroundColor: '#5b21b6', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  payButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  closeButton: { padding: 10, alignItems: 'center' },
  closeButtonText: { color: '#64748b', fontWeight: '600' }
});
