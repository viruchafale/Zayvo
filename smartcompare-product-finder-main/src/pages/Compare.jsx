import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Compare() {
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('compareProducts');
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored products:', error);
      }
    }
  }, []);

  const removeProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('compareProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "Product removed",
      description: "Product has been removed from comparison."
    });
  };

  const clearComparison = () => {
    setProducts([]);
    localStorage.removeItem('compareProducts');
    
    toast({
      title: "Comparison cleared",
      description: "All products have been removed from comparison."
    });
  };

  const getLowestPrice = () => {
    if (products.length === 0) return null;
    return Math.min(...products.map(p => p.price));
  };

  const getHighestRating = () => {
    if (products.length === 0) return null;
    return Math.max(...products.map(p => p.rating));
  };

  const getBestValue = (product) => {
    const lowestPrice = getLowestPrice();
    const highestRating = getHighestRating();
    
    return {
      bestPrice: product.price === lowestPrice,
      bestRating: product.rating === highestRating
    };
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'In Stock': return 'bg-success text-success-foreground';
      case 'Limited Stock': return 'bg-yellow-500 text-white';
      case 'Out of Stock': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-4 font-poppins">
              No Products to Compare
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Search for products and select them to start comparing.
            </p>
            <Link to="/search">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go to Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-poppins">
              Product Comparison
            </h1>
            <p className="text-lg text-muted-foreground">
              Compare {products.length} products side by side
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link to="/search">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </Link>
            <Button variant="destructive" onClick={clearComparison}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Mobile Comparison (Cards) */}
        <div className="md:hidden space-y-6">
          {products.map((product) => {
            const { bestPrice, bestRating } = getBestValue(product);
            
            return (
              <Card key={product.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProduct(product.id)}
                  className="absolute top-2 right-2 z-10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <CardContent className="p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  
                  <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className={`font-bold ${bestPrice ? 'text-success' : 'text-foreground'}`}>
                        ${product.price}
                        {bestPrice && <Badge className="ml-2 bg-success text-success-foreground">Best Price</Badge>}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className={`font-medium ${bestRating ? 'text-success' : 'text-foreground'}`}>
                          {product.rating}
                        </span>
                        {bestRating && <Badge className="ml-2 bg-success text-success-foreground">Highest Rating</Badge>}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Store:</span>
                      <Badge variant="outline">{product.site}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Availability:</span>
                      <Badge className={getAvailabilityColor(product.availability)}>
                        {product.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" disabled={product.availability === 'Out of Stock'}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Product
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Desktop Comparison (Table) */}
        <div className="hidden md:block">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-6 font-medium text-muted-foreground w-48">Product</th>
                      {products.map((product) => (
                        <th key={product.id} className="text-center p-6 relative min-w-64">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProduct(product.id)}
                            className="absolute top-2 right-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-md mx-auto mb-3"
                          />
                          <h3 className="font-semibold text-sm">{product.name}</h3>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  <tbody>
                    {/* Price Row */}
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium text-foreground">Price</td>
                      {products.map((product) => {
                        const { bestPrice } = getBestValue(product);
                        return (
                          <td key={product.id} className="p-6 text-center">
                            <div className={`text-xl font-bold ${bestPrice ? 'text-success' : 'text-foreground'}`}>
                              ${product.price}
                            </div>
                            {product.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </div>
                            )}
                            {bestPrice && (
                              <Badge className="mt-2 bg-success text-success-foreground">Best Price</Badge>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                    
                    {/* Rating Row */}
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium text-foreground">Rating</td>
                      {products.map((product) => {
                        const { bestRating } = getBestValue(product);
                        return (
                          <td key={product.id} className="p-6 text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                              <span className={`text-lg font-semibold ${bestRating ? 'text-success' : 'text-foreground'}`}>
                                {product.rating}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ({product.reviews} reviews)
                            </div>
                            {bestRating && (
                              <Badge className="mt-2 bg-success text-success-foreground">Highest Rating</Badge>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                    
                    {/* Store Row */}
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium text-foreground">Store</td>
                      {products.map((product) => (
                        <td key={product.id} className="p-6 text-center">
                          <Badge variant="outline">{product.site}</Badge>
                        </td>
                      ))}
                    </tr>
                    
                    {/* Availability Row */}
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium text-foreground">Availability</td>
                      {products.map((product) => (
                        <td key={product.id} className="p-6 text-center">
                          <Badge className={getAvailabilityColor(product.availability)}>
                            {product.availability}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    
                    {/* Features Row */}
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium text-foreground">Key Features</td>
                      {products.map((product) => (
                        <td key={product.id} className="p-6">
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {product.features.map((feature, index) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    
                    {/* Action Row */}
                    <tr>
                      <td className="p-6 font-medium text-foreground">Action</td>
                      {products.map((product) => (
                        <td key={product.id} className="p-6 text-center">
                          <Button 
                            className="w-full"
                            disabled={product.availability === 'Out of Stock'}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            View Product
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}