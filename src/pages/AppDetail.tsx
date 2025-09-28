import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Shield, Users, ExternalLink, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import slackIcon from "@/assets/slack-icon.png";
import teamsIcon from "@/assets/teams-icon.png";
import salesforceIcon from "@/assets/salesforce-icon.png";
import jiraIcon from "@/assets/jira-icon.png";

const iconMap: { [key: string]: string } = {
  slack: slackIcon,
  teams: teamsIcon,
  salesforce: salesforceIcon,
  jira: jiraIcon,
};

// Sample detailed app data
const appDetails = {
  slack: {
    id: "slack",
    name: "Slack",
    description: "Slack is a collaboration platform that connects your team with the apps, services, and resources you need to get work done.",
    longDescription: "Slack brings team communication and collaboration into one place so you can get more work done, whether you belong to a large enterprise or a small business. Check off your to-do list and move your projects forward by bringing the right people, conversations, tools, and information you need together.",
    category: "Communication",
    rating: 4.8,
    reviews: 2547,
    status: "Available",
    publisher: "Slack Technologies",
    version: "4.28.0",
    lastUpdated: "2024-03-15",
    employees: 1247,
    features: [
      "Real-time messaging",
      "File sharing and collaboration",
      "Video and voice calls",
      "App integrations",
      "Custom workflows",
      "Security and compliance"
    ],
    permissions: [
      "Access to team messages and files",
      "Ability to send notifications",
      "Integration with calendar apps",
      "File upload and download"
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
    ]
  }
};

const AppDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  const app = appDetails[id as keyof typeof appDetails];
  
  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h1 className="text-2xl font-bold mb-2">App Not Found</h1>
            <p className="text-muted-foreground mb-4">The requested application could not be found.</p>
            <Link to="/">
              <Button>Back to Catalog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRequestAccess = () => {
    // Navigate to request access page
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Catalog
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={iconMap[app.id]} alt={app.name} />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-sm">
                  {app.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{app.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* App Hero Section */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <div className="bg-gradient-subtle p-8">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20 rounded-2xl shadow-large">
                  <AvatarImage src={iconMap[app.id]} alt={app.name} />
                  <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground text-2xl">
                    {app.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{app.name}</h1>
                      <Badge variant="outline">{app.category}</Badge>
                      <Badge variant={app.status === "Available" ? "success" : "secondary"}>
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground">{app.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="font-medium">{app.rating}</span>
                      <span className="text-muted-foreground">({app.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{app.employees} employees using</span>
                    </div>
                    <div className="text-muted-foreground">
                      by {app.publisher}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {app.status === "Available" ? (
                    <Button size="lg" className="w-32">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open App
                    </Button>
                  ) : (
                    <Link to={`/request-access/${app.id}`}>
                      <Button variant="enterprise" size="lg" className="w-32">
                        Request Access
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="lg" className="w-32">
                    <Star className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="similar">Similar Apps</TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            <TabsContent value="overview" className="space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About {app.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{app.longDescription}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {app.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* App Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">App Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Version:</span>
                      <span className="ml-2 font-medium">{app.version}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="ml-2 font-medium">{app.lastUpdated}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <span className="ml-2 font-medium">{app.category}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Usage Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Active Users:</span>
                      <span className="ml-2 font-medium">{app.employees}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Adoption Rate:</span>
                      <span className="ml-2 font-medium">78%</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Department Usage:</span>
                      <Progress value={78} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span>SOC 2 Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span>GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span>Enterprise SSO</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Reviews</CardTitle>
                  <CardDescription>
                    What your colleagues are saying about {app.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Sample reviews */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">Anonymous User</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star key={j} className="h-3 w-3 fill-current text-yellow-500" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              12
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Great tool for team communication. Really improved our workflow and collaboration.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions">
              <Card>
                <CardHeader>
                  <CardTitle>Permissions & Privacy</CardTitle>
                  <CardDescription>
                    What {app.name} can access when you use it
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {app.permissions.map((permission, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{permission}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="similar">
              <Card>
                <CardHeader>
                  <CardTitle>Similar Applications</CardTitle>
                  <CardDescription>
                    Other apps you might find useful
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Similar apps will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AppDetail;