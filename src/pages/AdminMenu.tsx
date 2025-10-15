
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Image as ImageIcon 
} from "lucide-react";

const AdminMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);

  const categories = ["All", "Appetizers", "Main Courses", "Desserts", "Beverages"];
  
  const menuItems = [
    {
      id: 1,
      name: "Crispy Calamari",
      description: "Golden rings with tangy marinara sauce",
      price: 12.99,
      category: "Appetizers",
      status: "active",
      image: "photo-1618160702438-9b02ab6515c9"
    },
    {
      id: 2,
      name: "Truffle Arancini",
      description: "Creamy risotto balls with black truffle",
      price: 14.99,
      category: "Appetizers",
      status: "active",
      image: "photo-1618160702438-9b02ab6515c9"
    },
    {
      id: 3,
      name: "Grilled Salmon",
      description: "Atlantic salmon with herb butter and seasonal vegetables",
      price: 24.99,
      category: "Main Courses",
      status: "active",
      image: "photo-1618160702438-9b02ab6515c9"
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Menu Management</h1>
              <p className="text-sm text-gray-600">Add, edit, and organize your menu items</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddItem(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 rounded-full ${
                  selectedCategory === category 
                    ? "bg-orange-500 hover:bg-orange-600 text-white" 
                    : "hover:bg-orange-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-orange-200 focus:border-orange-400"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={`https://images.unsplash.com/${item.image}?w=400&h=200&fit=crop`}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    item.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  } text-white`}
                >
                  {item.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <span className="font-bold text-orange-600">${item.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <Badge variant="outline" className="mb-4">
                  {item.category}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                    <Edit className="w-3 h-3 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 rounded-lg">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Item Modal */}
        {showAddItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Add New Menu Item</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name
                  </label>
                  <Input placeholder="Enter item name" className="rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea 
                    placeholder="Describe the dish..." 
                    className="rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <Input type="number" step="0.01" placeholder="0.00" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Appetizers</option>
                      <option>Main Courses</option>
                      <option>Desserts</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to upload image or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    onClick={() => setShowAddItem(false)}
                    variant="outline" 
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setShowAddItem(false)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                  >
                    Add Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
