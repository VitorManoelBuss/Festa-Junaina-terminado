import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Quentão Pequeno', value: '1', price: 5.00  },
  { label: 'Quentão Médio',   value: '2', price: 10.00 },
  { label: 'Quentão Grande',  value: '3', price: 15.00 },
  { label: 'Pipoca Pequena',  value: '4', price: 3.00  },
  { label: 'Pipoca Média',    value: '5', price: 6.00  },
  { label: 'Pipoca Grande',   value: '6', price: 9.00  },
  { label: 'Bolo',            value: '7', price: 4.00  },
  { label: 'Pé de Moleque',   value: '8', price: 3.50  },
  { label: 'Cachorro-Quente', value: '9', price: 6.50  },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const getTotalItems = () => {
  const totalValue = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);
  return { totalValue, totalQuantity };
  };

  const handleOnChange = (item) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.value === item.value);
  
    if (existingItem) {
      // Se o item já estiver na lista, atualize a quantidade
    const updatedItems = selectedItems.map((selectedItem) => {
    if (selectedItem.value === item.value) {
    return {
   ...selectedItem,
    quantity: selectedItem.quantity + 1,
    };
    }
    return selectedItem;
    });
  
    setSelectedItems(updatedItems);
    } else {
    // Se o item ainda não estiver na lista, adicione-o
    setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  
    setValue(item.value);
    setIsFocus(false);
  };

  const handleRemoveItem = (item) => {
    const updatedItems = selectedItems.map((selectedItem) => {
    if (selectedItem.value === item.value) {
    return {
    ...selectedItem,
    quantity: selectedItem.quantity - 1,
    };
    }
    return selectedItem;
    });
  
    // Remova os itens com quantidade 0 da lista
    const filteredItems = updatedItems.filter((selectedItem) => selectedItem.quantity > 0);
  
    setSelectedItems(filteredItems);
  };


  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#850ef5' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Selecione Seus Produtos' : ''}
        searchPlaceholder="Busque seu produto..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleOnChange}
        renderLeftIcon={() => (
          <AntDesign
          style={styles.icon}
          color={isFocus ? '#fff' : '#fff'}
          name="Safety"
          size={18}
          />
        )}
      />
   
  <View style={styles.selectedItemsContainer}>
  <Text style={styles.ItemColoridos}>Lista de Produtos:</Text>
  {selectedItems.map((item) => (
  <View key={item.value} style={styles.selectedItem}>
  <Text style={styles.selectedItemLabel}>{item.label}</Text>
  <Text style={styles.selectedItemPrice}>${item.price.toFixed(2)}</Text>
  <Text style={styles.selectedItemUnit}>{item.quantity} UN</Text>
  <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.removeButton}>
  <AntDesign name="delete" size={20} color="#ffffff" />
  </TouchableOpacity>
  </View>
  ))}
  </View>
  <View style={styles.footerContainer}>
  <Text style={styles.ItemColoridos2}>Total itens: {getTotalItems().totalQuantity}</Text>
  <Text style={styles.ItemColoridos2}>Valor total: R${getTotalItems().totalValue.toFixed(2)}</Text>
  </View> 
  </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    padding:10,
    display: 'flex',
    width: 350,
    height: 620,
  },

  dropdown: { 
    height: 40,
    borderColor: '#850ef5',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  icon: {
    marginRight: 8,
  },

  label: {
    position: 'relative',
    backgroundColor: '#131016',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  placeholderStyle: {
    fontSize: 16,
    color:'#fff',
  },

  selectedTextStyle: {
    fontSize: 16,
    color:'#fff'
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  selectedItemsContainer: {
    marginTop: 16,
    color:'#fff'
  },

  ItemColoridos:{
    fontSize:18,    
    color:'#850ef5',    
    fontWeight:"bold", 
  },
  
  ItemColoridos2:{   
    color:'#850ef5',
    fontSize:18,          
    fontWeight:"bold",
  }, 

  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    marginBottom: 7,
    marginTop: 15,
    width: 325
  },

  selectedItemLabel: {
    color: '#fff',
    fontSize: 18,
    
  },
  
  selectedItemPrice: {
    color: '#fff',
    fontSize: 18,
  },

  selectedItemUnit: {
    color: '#850ef5',
    fontSize: 12,
  },

  removeButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  footerContainer: {
  position: 'absolute',
  bottom: 0,
  left: 10,
  padding:0,
  }

});
