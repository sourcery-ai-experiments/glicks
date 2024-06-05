import { ref } from 'vue'

const items = ref([
    {
    id: 1,
    name: 'Classic Chocolate Cake',
    color: 'Classic and good!',
    price: '$25',
    href: '#',
    imageSrc: '/images/perfect_chocolate_cake_crop.jpg',
    imageAlt: 'Perfect crop of classic chocolate cake.',
    description: {
      text: 'Placeholder for descriptive text for the item',
      allergens: 'Contains: eggs, wheat',
      category: ['Cake', 'Chocolate'],
    },
    milk: false,
},
{
    id: 2,
    name: 'Marble Cake',
    color: 'Better than it looks!',
    price: '$25',
    href: '#',
    imageSrc: '/images/perfect_chocolate_cake_crop.jpg',
    imageAlt: 'Perfect crop of classic chocolate cake.',
    description: {
      text: 'Placeholder for descriptive text for the item',
      allergens: 'Contains: eggs, wheat',
      category: ['Cake',],
    },
    milk: false,
},
{
    id: 3,
    name: 'Chocolate Babke',
    color: "You'll love it!",
    price: '$25',
    href: '#',
    imageSrc: '/images/perfect_chocolate_cake_crop.jpg',
    imageAlt: 'Perfect crop of classic chocolate cake.',
    description: {
      text: 'Placeholder for descriptive text for the item',
      allergens: 'Contains: eggs, wheat',
      category: ['Cake',],
    },
    milk: false,
}
  ])

export default items