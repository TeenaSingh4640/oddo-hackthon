"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Grid,
  List,
  Zap,
  Star,
  Shirt,
  MapPin
} from 'lucide-react';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  status: string;
  owner: {
    id: number;
    username: string;
    email: string;
  };
  points: number;
}

export default function BrowsePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', 'Clothes', 'Footwear', 'Accessories'];
  const conditions = ['all', 'New', 'Like New', 'Good', 'Fair', 'Poor'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent('http://localhost:8000/api/v1/items/')}`);
      if (response.ok) {
        const data = await response.json();
        const productsWithPoints = data.map((product: any) => ({
          ...product,
          points: calculatePoints(product.condition, product.category)
        }));
        setProducts(productsWithPoints);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePoints = (condition: string, category: string) => {
    const conditionPoints = {
      'New': 100,
      'Like New': 80,
      'Good': 60,
      'Fair': 40,
      'Poor': 20
    };
    
    const categoryMultiplier = {
      'Clothes': 1.0,
      'Footwear': 1.2,
      'Accessories': 0.8
    };

    return Math.round((conditionPoints[condition as keyof typeof conditionPoints] || 50) * 
           (categoryMultiplier[category as keyof typeof categoryMultiplier] || 1.0));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesCondition = selectedCondition === 'all' || product.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Items</h1>
          <p className="text-lg text-gray-600">Discover amazing items available for swap</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>
                    {condition === 'all' ? 'All Conditions' : condition}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 ml-auto">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} items
          </p>
        </div>

        {/* Products Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={viewMode === 'grid' ? '' : 'w-full'}
            >
              <Card 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <CardContent className="p-4">
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div className="space-y-4">
                      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={`/${product.category.toLowerCase()}.png`}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-white/90 text-gray-800">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
                          <div className="flex items-center space-x-2">
                            <Shirt className="h-4 w-4" />
                            <span className="font-medium">{product.size}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4" />
                            <span className="font-medium">{product.condition}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-700 font-medium">{product.owner.username}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-600">{product.points} pts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={`/${product.category.toLowerCase()}.png`}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.title}</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                          </div>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                                                     <div className="flex items-center space-x-4">
                             <div className="flex items-center space-x-1">
                               <Shirt className="h-4 w-4" />
                               <span className="font-medium">{product.size}</span>
                             </div>
                             <div className="flex items-center space-x-1">
                               <Star className="h-4 w-4" />
                               <span className="font-medium">{product.condition}</span>
                             </div>
                             <div className="flex items-center space-x-1">
                               <MapPin className="h-4 w-4" />
                               <span className="font-medium">{product.owner.username}</span>
                             </div>
                           </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-600">{product.points} pts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedCondition('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
