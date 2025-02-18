import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TotalSummary = ({ total }) => (
    <Text style={styles.total}>รวมราคาสินค้ายังไม่ได้ซื้อ: {total} บาท</Text>
);

const styles = StyleSheet.create({
    total: { 
        fontSize: 18, 
        marginTop: 10, 
        fontWeight: 'bold' 
    }
});

export default TotalSummary;
