"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Star, 
  Users, 
  MapPin, 
  Calendar,
  Shirt,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle
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
  points?: number;
  images?: string[];
}

interface SimilarProduct {
  id: number;
  title: string;
  category: string;
  size: string;
  condition: string;
  points: number;
  image: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [swapPoints, setSwapPoints] = useState(0);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  useEffect(() => {
    if (params.id) {
      fetchProduct();
      fetchSimilarProducts();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(`http://localhost:8000/api/v1/items/${params.id}`)}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setSelectedSize(data.size);
        calculateSwapPoints(data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent('http://localhost:8000/api/v1/items/')}`);
      if (response.ok) {
        const data = await response.json();
        // Filter similar products (same category, different items)
        const similar = data
          .filter((item: any) => item.id !== parseInt(params.id as string) && item.category === product?.category)
          .slice(0, 4)
          .map((item: any) => ({
            ...item,
            image: `/${item.category.toLowerCase()}.png`,
            points: calculatePoints(item.condition, item.category)
          }));
        setSimilarProducts(similar);
      }
    } catch (error) {
      console.error('Error fetching similar products:', error);
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

  const calculateSwapPoints = (product: Product) => {
    if (product) {
      setSwapPoints(calculatePoints(product.condition, product.category));
    }
  };

  const handleSwap = () => {
    // Navigate to swap page with product details
    router.push(`/swap/${product?.id}`);
  };

  const handleWishlist = () => {
    // Add to wishlist functionality
    console.log('Added to wishlist');
  };

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Button onClick={() => router.push('/browse')}>
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><button onClick={() => router.push('/')} className="hover:text-blue-500">Home</button></li>
            <li>/</li>
            <li><button onClick={() => router.push('/browse')} className="hover:text-blue-500">Browse</button></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={`/${product.category.toLowerCase()}.png`}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 hover:bg-white"
                  onClick={handleWishlist}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 hover:bg-white"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Shirt className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Size</p>
                      <p className="font-semibold text-gray-800">{product.size}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Condition</p>
                      <p className="font-semibold text-gray-800">{product.condition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Owner Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Listed by</p>
                    <p className="font-semibold text-gray-800">{product.owner.username}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Swap Points */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Swap Points</p>
                    <p className="text-2xl font-bold text-green-600">{swapPoints} pts</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You'll earn {swapPoints} points when someone swaps this item
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl"
                onClick={handleSwap}
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Swap
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-2 border-gray-300 hover:border-gray-400 font-semibold py-4 rounded-xl text-gray-800 hover:text-gray-900"
              >
                Contact Owner
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <Card 
                key={item.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/product/${item.id}`)}
              >
                <CardContent className="p-4">
                  <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
                    <span className="font-medium">{item.size}</span>
                    <span className="font-medium">{item.condition}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">{item.points} pts</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Product Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-800">Description</h4>
                  <p className="text-gray-700">{product.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Category</p>
                    <p className="font-semibold text-gray-800">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Size</p>
                    <p className="font-semibold text-gray-800">{product.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Condition</p>
                    <p className="font-semibold text-gray-800">{product.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Status</p>
                    <p className="font-semibold text-gray-800 capitalize">{product.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Swap Benefits */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Swap Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Earn Points</h4>
                    <p className="text-sm text-gray-600">Get {swapPoints} points when someone swaps this item</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sustainable Fashion</h4>
                    <p className="text-sm text-gray-600">Reduce waste and promote circular fashion</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Community Building</h4>
                    <p className="text-sm text-gray-600">Connect with fashion-conscious individuals</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 