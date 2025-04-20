import { Product } from '../types';

export const defaultProducts: Product[] = [
  {
    id: '1',
    name: '500 Credits Package',
    description: 'Basic credit package for small businesses',
    price: 499000,
    credits: 500,
    validityDays: 30,
    image: 'https://images.pexels.com/photos/7621138/pexels-photo-7621138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: '1000 Credits Package',
    description: 'Standard credit package with better value',
    price: 899000,
    credits: 1000,
    validityDays: 60,
    image: 'https://images.pexels.com/photos/7621140/pexels-photo-7621140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: '2500 Credits Package',
    description: 'Premium credit package for growing businesses',
    price: 1999000,
    credits: 2500,
    validityDays: 90,
    image: 'https://images.pexels.com/photos/7621141/pexels-photo-7621141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: '5000 Credits Package',
    description: 'Enterprise credit package with maximum value',
    price: 3499000,
    credits: 5000,
    validityDays: 180,
    image: 'https://images.pexels.com/photos/7621143/pexels-photo-7621143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];