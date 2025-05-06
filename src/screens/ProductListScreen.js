import React, { useContext, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { ProductContext } from '../context/ProductContext';
import ProductItem from '../components/ProductItem';
import { SafeAreaView } from 'react-native';

const ProductListScreen = ({ navigation }) => {
  const {
    products,
    loading,
    error,
    page,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    reload,
  } = useContext(ProductContext);

  const renderPaginationControls = () => (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={[styles.pageBtn, page === 1 && styles.disabledBtn]}
        disabled={page === 1}
        onPress={goToPreviousPage}
      >
        <Text style={styles.pageText}>← Prev</Text>
      </TouchableOpacity>

      <Text style={styles.pageNumber}>{`Page ${page} of ${totalPages}`}</Text>

      <TouchableOpacity
        style={[styles.pageBtn, page === totalPages && styles.disabledBtn]}
        disabled={page === totalPages}
        onPress={goToNextPage}
      >
        <Text style={styles.pageText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.center}>
          <Text style={styles.error}>⚠️ {error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={reload}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ProductItem
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              />
            )}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={renderPaginationControls}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={reload} tintColor="#007AFF" />
            }
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listContent: {
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#D32F2F',
    fontSize: 16,
    marginBottom: 10,
  },
  retryBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  }, pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  pageBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  pageText: {
    color: '#fff',
    fontWeight: '600',
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  end: {
    textAlign: 'center',
    padding: 16,
    fontSize: 14,
    color: '#888',
  },
});

export default ProductListScreen;
