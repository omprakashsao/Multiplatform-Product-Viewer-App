import React, { createContext, useState, useEffect } from 'react';
import { FetchProducts } from '../api/products';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const PRODUCTS_PER_PAGE = 6;

  const loadProducts = async (pageNumber = 1) => {
    setLoading(true);
    setError('');
    try {
      const newProducts = await FetchProducts(pageNumber);
      setProducts(newProducts);
      setPage(pageNumber);
      if (newProducts.length < PRODUCTS_PER_PAGE) {
        setTotalPages(pageNumber);
      } else {
        setTotalPages(pageNumber + 1); // crude estimate
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, []);

  const goToNextPage = () => {
    if (page < totalPages) loadProducts(page + 1);
  };

  const goToPreviousPage = () => {
    if (page > 1) loadProducts(page - 1);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        page,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        reload: () => loadProducts(page),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
