import { useState } from "react";
import { Search, Grid3X3, List, Star, TrendingUp, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppCard } from "@/components/AppCard";
import { Link } from "react-router-dom";

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  status: "Available" | "Request Access";
  featured: boolean;
  popular: boolean;
  icon: string;
}

// Sample app data
const apps: App[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Team communication and collaboration platform",
    category: "Communication",
    rating: 4.8,
    reviews: 2547,
    status: "Available" as const,
    featured: true,
    popular: true,
    icon: "/src/assets/slack-icon.png"
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Video conferencing and team collaboration",
    category: "Communication",
    rating: 4.6,
    reviews: 1832,
    status: "Request Access" as const,
    featured: false,
    popular: true,
    icon: "/src/assets/teams-icon.png"
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Customer relationship management platform",
    category: "Sales",
    rating: 4.7,
    reviews: 3241,
    status: "Available" as const,
    featured: true,
    popular: false,
    icon: "/src/assets/salesforce-icon.png"
  },
  {
    id: "jira",
    name: "Jira",
    description: "Project management and issue tracking",
    category: "Project Management",
    rating: 4.5,
    reviews: 1956,
    status: "Request Access" as const,
    featured: false,
    popular: true,
    icon: "/src/assets/jira-icon.png"
  }
];

const CatalogHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredApps = apps.filter(app => app.featured);
  const popularApps = apps.filter(app => app.popular).slice(0, 6);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
            <div className="h-full px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-semibold text-foreground">App Catalog</h1>
                  <p className="text-sm text-muted-foreground">Discover and request access to enterprise applications</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    My Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Search Section */}
          <section className="p-6 bg-gradient-subtle">
            <div className="max-w-4xl mx-auto">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base shadow-soft"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="secondary">All Categories</Badge>
                  <Badge variant="outline">Communication</Badge>
                  <Badge variant="outline">Sales</Badge>
                  <Badge variant="outline">Project Management</Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <div className="flex-1 p-6 space-y-8">
            {!searchTerm && (
              <>
                {/* Editor's Choice */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Editor's Choice</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredApps.map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                </section>

                <Separator />

                {/* Most Popular */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    <h2 className="text-lg font-semibold">Most Popular</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {popularApps.map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                </section>

                <Separator />
              </>
            )}

            {/* All Apps / Search Results */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">
                  {searchTerm ? `Search Results (${filteredApps.length})` : "All Applications"}
                </h2>
              </div>
              
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredApps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredApps.map((app) => (
                    <AppCard key={app.id} app={app} layout="list" />
                  ))}
                </div>
              )}
              
              {filteredApps.length === 0 && (
                <Card className="p-8 text-center">
                  <CardContent className="space-y-2">
                    <p className="text-muted-foreground">No applications found matching your search.</p>
                    <Button variant="outline" onClick={() => setSearchTerm("")}>
                      Clear Search
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CatalogHome;