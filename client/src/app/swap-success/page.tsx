"use client"

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { 
  CheckCircle,
  Zap,
  Users,
  ArrowRight,
  Home,
  ShoppingBag,
  MessageCircle
} from 'lucide-react';

export default function SwapSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Swap Successful!</h1>
            <p className="text-lg text-gray-600">
              Your swap has been completed successfully. Both parties have been notified.
            </p>
          </motion.div>

          {/* Swap Details */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  <span>Swap Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">You Received</h3>
                    <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="font-semibold text-blue-600">Blue Denim Jacket</p>
                    <p className="text-sm text-gray-600">Size: M | Condition: Good</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">80 pts</Badge>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">You Swapped</h3>
                    <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="font-semibold text-green-600">Vintage T-Shirt</p>
                    <p className="text-sm text-gray-600">Size: L | Condition: Like New</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">75 pts</Badge>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Points Difference:</span>
                    <span className="font-bold text-green-600">+5 pts gained</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Arrange Exchange</h4>
                      <p className="text-sm text-gray-600">
                        Contact the other user to arrange a safe meeting place for the exchange
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Complete Exchange</h4>
                      <p className="text-sm text-gray-600">
                        Meet in person and complete the item exchange
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Confirm Swap</h4>
                      <p className="text-sm text-gray-600">
                        Both parties confirm the swap completion in the app
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl"
              onClick={() => router.push('/browse')}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Browsing
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-2 border-gray-300 hover:border-gray-400 font-semibold py-4 rounded-xl text-gray-800 hover:text-gray-900"
                onClick={() => router.push('/')}
              >
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-2 border-gray-300 hover:border-gray-400 font-semibold py-4 rounded-xl text-gray-800 hover:text-gray-900"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact User
              </Button>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">💡 Safety Tips</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Meet in a public, well-lit location</li>
                  <li>• Bring a friend if possible</li>
                  <li>• Inspect items before completing the exchange</li>
                  <li>• Trust your instincts - if something feels off, don't proceed</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 