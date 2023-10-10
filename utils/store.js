import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  favorites: Cookies.get('favorites')
    ? JSON.parse(Cookies.get('favorites'))
    : { favoritesItems: [], paymentMethod: '' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FAVORITES_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.favorites.favoritesItems.find(
        (item) => item.slug === newItem.slug
      );
      const favoritesItems = existItem
        ? state.favorites.favoritesItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.favorites.favoritesItems, newItem];
      Cookies.set(
        'favorites',
        JSON.stringify({ ...state.favorites, favoritesItems })
      );
      return { ...state, favorites: { ...state.favorites, favoritesItems } };
    }
    case 'FAVORITES_REMOVE_ITEM': {
      const favoritesItems = state.favorites.favoritesItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set(
        'favorites',
        JSON.stringify({ ...state.favorites, favoritesItems })
      );
      return { ...state, favorites: { ...state.favorites, favoritesItems } };
    }

    case 'FAVORITES_RESET':
      return {
        ...state,
        favorites: {
          favoritesItems: [],
          paymentMethod: '',
        },
      };
    case 'FAVORITES_CLEAR_ITEMS':
      return {
        ...state,
        favorites: { ...state.favorites, favoritesItems: [] },
      };

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        favorites: {
          ...state.favorites,
          paymentMethod: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
