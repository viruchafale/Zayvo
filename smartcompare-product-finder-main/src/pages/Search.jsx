import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search as SearchIcon, Star, ShoppingCart, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max 128GB',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    price: 999,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 1247,
    site: 'Apple Store',
    availability: 'In Stock',
    features: ['A16 Bionic chip', 'Pro camera system', 'Dynamic Island']
  },
  {
    id: '2',
    name: 'iPhone 14 Pro Max 128GB',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    price: 1049,
    rating: 4.7,
    reviews: 892,
    site: 'Amazon',
    availability: 'Limited Stock',
    features: ['A16 Bionic chip', 'Pro camera system', 'Dynamic Island']
  },
  {
    id: '3',
    name: 'iPhone 14 Pro Max 128GB',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    price: 1089,
    rating: 4.6,
    reviews: 634,
    site: 'Best Buy',
    availability: 'In Stock',
    features: ['A16 Bionic chip', 'Pro camera system', 'Dynamic Island']
  },
  {
    id: '4',
    name: 'iPhone 14 Pro Max 128GB',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    price: 1129,
    rating: 4.5,
    reviews: 456,
    site: 'Target',
    availability: 'Out of Stock',
    features: ['A16 Bionic chip', 'Pro camera system', 'Dynamic Island']
  }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Type a product name to search for comparisons.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
      toast({
        title: "Search completed",
        description: `Found ${mockProducts.length} products for "${searchQuery}"`
      });
    }, 1000);
  };

  const handleProductSelect = (productId, checked) => {
    const newSelected = new Set(selectedProducts);
    if (checked) {
      if (newSelected.size >= 4) {
        toast({
          title: "Maximum products reached",
          description: "You can compare up to 4 products at once.",
          variant: "destructive"
        });
        return;
      }
      newSelected.add(productId);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleCompare = () => {
    if (selectedProducts.size < 2) {
      toast({
        title: "Select more products",
        description: "Please select at least 2 products to compare.",
        variant: "destructive"
      });
      return;
    }
    
    // Store selected products in localStorage for comparison page
    const selectedProductData = products.filter(p => selectedProducts.has(p.id));
    localStorage.setItem('compareProducts', JSON.stringify(selectedProductData));
    
    toast({
      title: "Products added to comparison",
      description: `${selectedProducts.size} products ready for comparison.`
    });
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'In Stock': return 'bg-success text-success-foreground';
      case 'Limited Stock': return 'bg-yellow-500 text-white';
      case 'Out of Stock': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-poppins">
            Search Products
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Enter a product name to find and compare prices across multiple platforms
          </p>
          
          <div className="max-w-2xl mx-auto flex gap-4">
            <Input
              placeholder="Search for products (e.g., iPhone 14, MacBook Pro, Samsung TV)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              <SearchIcon className="h-4 w-4 mr-2" />
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>

        {/* Compare Button */}
        {selectedProducts.size > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={handleCompare}
              size="lg"
              className="shadow-elegant"
            >
              <Plus className="h-5 w-5 mr-2" />
              Compare {selectedProducts.size} Products
            </Button>
          </div>
        )}

        {/* Search Results */}
        {products.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Search Results ({products.length})
              </h2>
              <p className="text-sm text-muted-foreground">
                Select products to compare (max 4)
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Checkbox
                        checked={selectedProducts.has(product.id)}
                        onCheckedChange={(checked) => 
                          handleProductSelect(product.id, checked)
                        }
                        className="mt-1"
                      />
                      <Badge className={getAvailabilityColor(product.availability)}>
                        {product.availability}
                      </Badge>
                    </div>
                    
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-foreground">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Badge variant="outline">{product.site}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="text-xs text-muted-foreground">
                          • {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled={product.availability === 'Out of Stock'}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Product
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="text-center py-20">
            <SearchIcon className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Start Your Search
            </h3>
            <p className="text-muted-foreground">
              Enter a product name above to find the best deals across multiple platforms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}