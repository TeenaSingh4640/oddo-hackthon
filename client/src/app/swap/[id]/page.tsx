"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Zap,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  Shirt,
  ArrowRight,
  X,
  Heart
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

interface SwapItem {
  id: number;
  title: string;
  category: string;
  size: string;
  condition: string;
  points: number;
  image: string;
  selected: boolean;
}

export default function SwapPage() {
  const params = useParams();
  const router = useRouter();
  const [targetProduct, setTargetProduct] = useState<Product | null>(null);
  const [availableItems, setAvailableItems] = useState<SwapItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<SwapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [swapInProgress, setSwapInProgress] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchTargetProduct();
      fetchAvailableItems();
    }
  }, [params.id]);

  const fetchTargetProduct = async () => {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(`http://localhost:8000/api/v1/items/${params.id}`)}`);
      if (response.ok) {
        const data = await response.json();
        setTargetProduct({
          ...data,
          points: calculatePoints(data.condition, data.category)
        });
      }
    } catch (error) {
      console.error('Error fetching target product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableItems = async () => {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent('http://localhost:8000/api/v1/items/')}`);
      if (response.ok) {
        const data = await response.json();
        // Filter items that belong to the current user (mock data for demo)
        const userItems = data.slice(0, 6).map((item: any) => ({
          ...item,
          image: `/${item.category.toLowerCase()}.png`,
          points: calculatePoints(item.condition, item.category),
          selected: false
        }));
        setAvailableItems(userItems);
      }
    } catch (error) {
      console.error('Error fetching available items:', error);
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

  const handleItemSelect = (item: SwapItem) => {
    const updatedItems = availableItems.map(availableItem =>
      availableItem.id === item.id
        ? { ...availableItem, selected: !availableItem.selected }
        : availableItem
    );
    setAvailableItems(updatedItems);

    const selected = updatedItems.filter(item => item.selected);
    setSelectedItems(selected);
  };

  const handleSwap = async () => {
    if (selectedItems.length === 0) return;

    setSwapInProgress(true);

    // Simulate swap process
    setTimeout(() => {
      setSwapInProgress(false);
      router.push('/swap-success');
    }, 2000);
  };

  const totalSelectedPoints = selectedItems.reduce((sum, item) => sum + item.points, 0);
  const targetPoints = targetProduct?.points || 0;
  const pointsDifference = totalSelectedPoints - targetPoints;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!targetProduct) {
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push(`/product/${params.id}`)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Product</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Initiate Swap</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Target Product */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span>Target Item</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
                    <Image
                      src={`/${targetProduct.category.toLowerCase()}.png`}
                      alt={targetProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{targetProduct.title}</h3>
                    <p className="text-gray-600 mb-3">{targetProduct.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Shirt className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-700 font-medium">{targetProduct.size}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-700 font-medium">{targetProduct.condition}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700 font-medium">Listed by {targetProduct.owner.username}</span>
                    </div>
                  </div>

                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Points Value:</span>
                      <span className="font-bold text-blue-600">{targetProduct.points} pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Items */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-gray-800">Your Items</span>
                </CardTitle>
                <p className="text-sm text-gray-600">Select items to swap with</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer transition-all ${item.selected
                          ? 'border-2 border-green-500 bg-green-50'
                          : 'hover:border-gray-300'
                        }`}
                      onClick={() => handleItemSelect(item)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-700">
                              <span className="font-medium">{item.size}</span>
                              <span className="font-medium">{item.condition}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <Zap className="h-4 w-4 text-green-600" />
                              <span className="font-semibold text-green-600">{item.points} pts</span>
                            </div>
                            {item.selected && (
                              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Swap Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle>Swap Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Your Items</p>
                  <p className="text-2xl font-bold text-green-600">{selectedItems.length}</p>
                  <p className="text-sm text-gray-600">{totalSelectedPoints} pts</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Target Item</p>
                  <p className="text-2xl font-bold text-blue-600">1</p>
                  <p className="text-sm text-gray-600">{targetPoints} pts</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Difference</p>
                  <p className={`text-2xl font-bold ${pointsDifference >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {pointsDifference >= 0 ? '+' : ''}{pointsDifference} pts
                  </p>
                  <p className="text-sm text-gray-600">
                    {pointsDifference >= 0 ? 'You gain' : 'You need'} {Math.abs(pointsDifference)} pts
                  </p>
                </div>
              </div>

              {pointsDifference < 0 && (
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      You need {Math.abs(pointsDifference)} more points to complete this swap
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl"
                  onClick={handleSwap}
                  disabled={selectedItems.length === 0 || swapInProgress}
                >
                  {swapInProgress ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing Swap...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Complete Swap</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 
